let request = require('supertest')
let app = require('../app')
let expect = require('chai').expect
describe('Getting users', () => {
    it('should return the name and ids of all users', async () => {
        const res = await request(app)
            .get('/api/users')
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.property('data')
            .to.deep.include({id: 1, name: "Sarah"})
        expect(res.body).to.have.property('data')
            .to.deep.include({id: 2, name: "David"})
    })
    it('should return the name and id of a certain user', async () => {
        const res = await request(app)
            .get('/api/users/1')
        expect(res.statusCode).equals(200)
        expect(res.body).to.have.property('data').to.deep.equal({id: 1, name: "Sarah"})
    })
})

