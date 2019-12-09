const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const User = require('../models/user')


let user1 = {
    _id:'0ddcfa78e38c7107015f35b6',
  name: 'Daria',
  email: 'daria@aup.edu',
  password: 'Daria'
}
let user2 = {
    _id:'1ddcfa78e38c7107015f35b6',
  name: 'Tomer',
  email: 'tomer@aup.edu',
  password: 'Tomer'
}
let user3 = {
    _id: '2ddcfa78e38c7107015f35b6',
  name: 'Samuel',
  email: 'samuel@aup.edu',
  password: 'Samuel'
}
let user4 = {
    _id: '3ddcfa78e38c7107015f35b6',
  name: 'Kuki',
  email: 'kuki@aup.edu',
  password: 'Kuki'
}
let user5 = {
    _id: '4ddcfa78e38c7107015f35b6',
  name: 'Laura',
  email: 'laura@aup.edu',
  password: 'Laura'
}


describe('Users', () => {
  beforeEach(async function() {
    let u1 = new User(user1)
    let u2 = new User(user2)
    let u3 = new User(user3)
    let u4 = new User(user4)
    let u5 = new User(user5)
    await u1.save()
    await u2.save()
    await u3.save()
    await u4.save()
    await u5.save()
  });
  afterEach(async function() {
    await User.deleteOne({_id: user1._id})
    await User.deleteOne({_id: user2._id})
    await User.deleteOne({_id: user3._id})
    await User.deleteOne({_id: user4._id})
    await User.deleteOne({_id: user5._id})
	});

  describe('Getting users', () => {
    beforeEach(async function() {
      let u1 = new User(user1)
      let u2 = new User(user2)
      let u3 = new User(user3)
      let u4 = new User(user4)
      let u5 = new User(user5)
      await u1.save()
      await u2.save()
      await u3.save()
      await u4.save()
      await u5.save()
    });
    afterEach(async function() {
      await User.deleteOne({_id: user1._id})
      await User.deleteOne({_id: user2._id})
      await User.deleteOne({_id: user3._id})
      await User.deleteOne({_id: user4._id})
      await User.deleteOne({_id: user5._id})
    });

    it('should return all users', async () => {
        const res = await request(app)
            .get(`/api/${user1._id}/users`)
            .get(`/api/${user2._id}/users`)
            .get(`/api/${user3._id}/users`)
            .get(`/api/${user4._id}/users`)
            .get(`/api/${user5._id}/users`)
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name', 'Daria')
        expect(res.body).to.have.nested.property('data[1].name', 'Tomer')
        expect(res.body).to.have.nested.property('data[2].name', 'Samuel')
        expect(res.body).to.have.nested.property('data[3].name', 'Kuki')
        expect(res.body).to.have.nested.property('data[4].name', 'Laura')
    })
  })

  describe('Creating users', () => {
    afterEach(async function() {
      await User.deleteOne({_id: user1._id})
      await User.deleteOne({_id: user2._id})
      await User.deleteOne({_id: user3._id})
      await User.deleteOne({_id: user4._id})
      await User.deleteOne({_id: user5._id})
    });

      it('should create correctly and return id and message', async () => {
          var res = await request(app)
            .post(`/api/${user1._id}/users`)
            .send(user1)
          expect(res.statusCode).equals(201)
          expect(res.body).to.have.property('data').to.have.property('message','Created ok')
          expect(res.body).to.have.property('data').to.have.property('id')
          const id = res.body.data.id
          res = await request(app)
            .get(`/api/${user1._id}/users/${id}`)
          console.log(JSON.stringify(res.body))
          expect(res.statusCode).equals(200)
          expect(res.body).to.have.nested.property('data.name', 'Daria')
      })
  })
})
exports.init = async function() {
    try {
        await mongoose.connect(env.db, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (error) {
        console.log(error)
    }
}