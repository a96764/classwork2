const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const Program = require('../models/programs')
const User = require('../models/user')

let user = {
  _id: '3ddcfa78e38c7107015f35b6',
  name: 'Daria',
  password: 'Daria',
  email: 'daria@aup.edu'
}
let program1 = {
  _id: '5ddcfa78e38c7107015f35b6',
  name: "Printer",
  user: user
}
let program2 = {
  _id: '4ddcfa78e38c7107015f35b6',
  name: "Screen",
  user: user
}

describe('Programs', () => {
  beforeEach(async function() {
    let u = new User(user)
    await u.save()
  });
  afterEach(async function() {
    await User.deleteOne({_id: user._id})
	});

  describe('Getting programs', () => {
    beforeEach(async function() {
      let p1 = new Program(program1)
      let p2 = new Program(program2)
      await p1.save()
      await p2.save()
    });
    afterEach(async function() {
      await Program.deleteOne({_id: program1._id})
      await Program.deleteOne({_id: program2._id})
    });

    it('should return all programs', async () => {
        const res = await request(app)
            .get(`/api/${user._id}/programs`)
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name', 'Printer')
        expect(res.body).to.have.nested.property('data[1].name', 'Screen')
    })
  })

  describe('Creating programs', () => {
    afterEach(async function() {
      await Program.deleteOne({_id: program1._id})
    });

      it('should create correctly and return id and message', async () => {
          var res = await request(app)
            .post(`/api/${user._id}/programs`)
            .send(program1)
          expect(res.statusCode).equals(201)
          expect(res.body).to.have.property('data').to.have.property('message','Created ok')
          expect(res.body).to.have.property('data').to.have.property('id')
          const id = res.body.data.id
          res = await request(app)
            .get(`/api/${user._id}/programs/${id}`)
          console.log(JSON.stringify(res.body))
          expect(res.statusCode).equals(200)
          expect(res.body).to.have.nested.property('data.name', 'Printer')
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