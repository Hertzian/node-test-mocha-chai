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

    it('should get a task by id', (done) => {
      const taskId = 123
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.text.should.be.eq('The task with the provided Id does not exists')
          done()
        })
    })
  })

  //post route
  describe('post /api/tasks/', () => {
    it('should post a new task', (done) => {
      const task = {
        name: 'new task test',
        completed: true
      }
      chai
        .request(server)
        .post(`/api/tasks`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('completed')
          res.body.should.have.property('id').eq(4)
          res.body.should.have.property('name').eq('new task test')
          res.body.should.have.property('completed').eq(true)
          done()
        })
    })

    it('should NOT post a new task without name property', (done) => {
      const task = {
        completed: true
      }
      chai
        .request(server)
        .post(`/api/tasks`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.be.eq('The name should be at least 3 chars long')
          done()
        })
    })
  })

  //put route
  describe('put /api/tasks/:taskId', () => {
    it('should put an existing task', (done) => {
      const taskId = 1
      const task = {
        name: 'test task changed',
        completed: true
      }
      chai
        .request(server)
        .put(`/api/tasks/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('id').eq(1)
          res.body.should.have.property('name').eq('test task changed')
          res.body.should.have.property('completed').eq(true)
          done()
        })
    })

    it('should NOT put an existing task with a name less than 3 chars', (done) => {
      const taskId = 1
      const task = {
        name: 'ta',
        completed: true
      }
      chai
        .request(server)
        .put(`/api/tasks/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.be.eq('The name should be at least 3 chars long')
          done()
        })
    })
  })

  //patch route
  describe('patch /api/tasks/:taskId', () => {
    it('should patch an existing task', (done) => {
      const taskId = 1
      const task = {
        name: 'test task changed by put'
      }
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('id').eq(1)
          res.body.should.have.property('name').eq('test task changed by put')
          res.body.should.have.property('completed').eq(true)
          done()
        })
    })

    it('should NOT patch an existing task with a name with a less than 3 chars', (done) => {
      const taskId = 1
      const task = {
        name: 'ta'
      }
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .send(task)
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.be.eq('The name should be at least 3 chars long')
          done()
        })
    })
  })

  //delete route
  describe('delete /api/tasks/:taskId', () => {
    it('should delete an existing task', (done) => {
      const taskId = 1
      chai
        .request(server)
        .delete(`/api/tasks/${taskId}`)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should NOT delete a task that is not in the database', (done) => {
      const taskId = 123
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.text.should.be.eq('The task with the provided Id does not exists')
          done()
        })
    })
  })
})
