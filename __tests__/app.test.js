const request = require("supertest");
const app = require("../app")
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(()=> seed(testData))
afterAll(()=> db.end())

describe('invalid endpoint', () => {

test("status 400 responds with bad request", () => {
  return request(app)
  .get('/api/topic')
  .expect(404)
  .then(({body}) => {
    expect(body.msg).toEqual('Invalid Path');
  })
})
})

describe("GET /api/topics", () => {
    test("status 200 responsed with a n array of topics", () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body}) => {
        expect(body.topics).toHaveLength(3)
        body.topics.forEach(topic => {
            expect(topic).toEqual(
            expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String)
            }))
        })
      });
    });
  });