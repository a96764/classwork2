let request = require('supertest')
let app = require('../app')
let expect = require('chai').expect
describe('Getting products', () => {
    it('should return the name and ids of all products', async () => {
        const res = await request(app)
            .get('/api/products')
              expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name','Printer')
        expect(res.body).to.have.nested.property('data[1].name','Laptop')
    })
    it('should return the name and id of a certain product', async () => {
        const res = await request(app)
            .get('/api/products/1')
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.nested.property('data[0].name','Printer')
    })
})
describe('Creating products', () => {
    it('should create correctly', async () => {
        let newProduct = {
            name: "Eraser"
    }
    var res = await request(app)
    .post('/api/products')
    .send(newProduct)
    expect(res.statusCode).equals(201)
    expect(res.body).to.have.property('data').
    to.have.property('message','Created ok')
    expect(res.body).to.have.property('data')
    .to.have.property('id')
const id = res.body.data.id
res = await request(app)
.get(`/api/products/${id}`)
expect(res.statusCode).equals(200)
expect(res.body).
to.have.nested.property('data[2].name','Eraser')
        })
})