const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const Product = require('../models/product')

let product1 = {
  name: 'Hand'
}
let product2 = {
  name: 'Arm'
}
let product3 = {
  name: 'Eye'
}


describe('Products', () => {
  beforeEach(async function() {
    let p = new Product(product1)
    await p.save()
  });
  afterEach(async function() {
    await Product.deleteOne({_id: product1._id})
	});

  describe('Getting products', () => {
    beforeEach(async function() {
      let p1 = new Product(product1)
      let p2 = new Product(product2)
      let p3 = new Product(product3)
      await p1.save()
      await p2.save()
      await p3.save()
    });
    afterEach(async function() {
      await Product.deleteOne({_id: product1._id})
      await Product.deleteOne({_id: product2._id})
      await Product.deleteOne({_id: product3._id})
    });

    it('should return all products', async () => {
        const res = await request(app)
            .get(`/api/${product1._id}/products`)
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name', 'Hand')
        expect(res.body).to.have.nested.property('data[1].name', 'Arm')
        expect(res.body).to.have.nested.property('data[2].name', 'Eye')
    })
  })

  describe('Creating products', () => {
    afterEach(async function() {
      await Product.deleteOne({_id: product1._id})
    });

      it('should create correctly and return id and message', async () => {
          var res = await request(app)
            .post(`/api/${product1._id}/products`)
            .send(product1)
          expect(res.statusCode).equals(201)
          expect(res.body).to.have.property('data').to.have.property('message','Created ok')
          expect(res.body).to.have.property('data').to.have.property('id')
          const id = res.body.data.id
          res = await request(app)
            .get(`/api/${product1._id}/products/${id}`)
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