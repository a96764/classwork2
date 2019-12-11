const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const Program = require('../models/programs')

let program1 = {
    _id: '1deafa78e38c7107015f35b6',
  name: 'Fitness',
  //user: 'Tomer'
}
let program2 = {
    _id: '2decfa78e38c7107015f35b6',
  name: 'Relaxation',
  //user: 'Daria'
}
let program3 = {
    _id: '3decfa78e38c7107015f35b6',
  name: 'Weight Loss',
  //user: 'Kuki'
}

describe('Programs', () => {
  beforeEach(async function() {
    let p1 = new Program(program1)
    let p2 = new Program(program2)
    let p3 = new Program(program3)

    await p1.save()
    await p2.save()
    await p3.save()

  });
  afterEach(async function() {
    /*await Program.deleteOne({_id: program1._id})
    await Program.deleteOne({_id: program2._id})
    await Program.deleteOne({_id: program3._id})*/
	});

  describe('Getting products', () => {
    beforeEach(async function() {
      let p1 = new Program(program1)
      let p2 = new Program(program2)
      let p3 = new Program(program3)
      await p1.save()
      await p2.save()
      await p3.save()
    });
    afterEach(async function() {
      await Program.deleteOne({_id: program1._id})
      await Program.deleteOne({_id: program2._id})
      await Program.deleteOne({_id: program3._id})
    });

    it('should return all programs', async () => {
        const res = await request(app)
            .get(`/api/${program._id}/programs`)
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name', 'Fitness')
        expect(res.body).to.have.nested.property('data[1].name', 'Relaxation')
        expect(res.body).to.have.nested.property('data[2].name', 'Weight Loss')
    })
  })

  describe('Creating programs', () => {
    afterEach(async function() {
      await Program.deleteOne({_id: program1._id})
      await Program.deleteOne({_id: program2._id})
      await Program.deleteOne({_id: program3._id})
    });

      it('should create correctly and return id and message', async () => {
          var res = await request(app)
            .post(`/api/${program1._id}/programs`)
            .send(program1)
          expect(res.statusCode).equals(201)
          expect(res.body).to.have.property('data').to.have.property('message','Created ok')
          expect(res.body).to.have.property('data').to.have.property('id')
          const id = res.body.data.id
          res = await request(app)
            .get(`/api/${program1._id}/programs/${id}`)
          console.log(JSON.stringify(res.body))
          expect(res.statusCode).equals(200)
          expect(res.body).to.have.nested.property('data.name', 'Fitness')
      })
  })
})

 exports.init = async function() {
    try {
        await mongoose.connect(env.db, {useNewUrlParser: true});
    } catch (error) {
        console.log(error)
    }
}