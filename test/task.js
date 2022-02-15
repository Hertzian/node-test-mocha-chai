const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app.js')

//assertion style
chai.should()
chai.use(chaiHttp)

describe('Tasks API', () => {
  //get route
  describe('get /api/tasks', () => {
    it('should get all the tasks', (done) => {
      chai
        .request(server)
        .get('/api/tasks')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eq(3)
          done()
        })
    })

    it('should NOT get all the tasks', (done) => {
      chai
        .request(server)
        .get('/api/task')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  //get by id route
  describe('get /api/tasks/:taskId', () => {
    it('should get a task by id', (done) => {
      const taskId = 1
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.should.have.property('name')
          res.body.should.have.property('completed')
          res.body.should.have.property('id').eq(1)
          done()
        })
    })
  })

  //post route
  //put route
  //patch route
  //delete route
})
