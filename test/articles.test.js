let articles = require('../controller/articles.controller.js')
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('express')
let should = chai.should

chai.use(chaiHttp)

/* test get article */
describe('articles', () => {
    describe('get articles', () => {
        it('should get articles', () => {
            chai.request(app)
                .get('/articles')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
            })
        })
    })
})

/* test post article */
describe('articles', () => {
    describe('post articles', () => {
        it('should post new article', () => {
            const article = {
                judul: 'python data science',
                author: 'ikhwan',
                published: 0
            }
            chai.request(app)
                .post('/article')
                .send(article)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('create new article')
                    res.body.should.have.property('data')
                    res.body.should.have.nested.property('data.judul')
                    res.body.should.have.nested.property('data.penulis')
                    res.body.should.have.nested.property('data.published')
                    done()
            })
        })
    })
})

