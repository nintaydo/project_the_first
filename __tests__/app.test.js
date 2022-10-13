const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("invalid endpoint", () => {
  test("status 400 responds with bad request", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid Path");
      });
  });
});

describe("GET /api/topics", () => {
  test("status 200 responsed with a n array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/", () => {
  test("status 200 responds with articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
  test("status 200 responds with articles with article_id only", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 4,
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: "2020-05-06T01:14:00.000Z",
          votes: 0,
        });
      });
  });
  // test("status 200 responds with articles and new comment_count with number of comments made by article_id", () => {
  //   return request(app)
  //   .get()
  // })
// });

describe("GET /api/users", () => {
  test("status 200 responds with users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe.only('PATCH /api/articles/:article_id', () => {
  test("status 200 responds with updated article", () => {
    return request(app)
    .patch('/api/articles/4')
    .expect(200)
    .then(({ body}) => {
      expect(body.article).toEqual({
        article_id: 4,
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: "2020-05-06T01:14:00.000Z",
        votes: 100,
      })
    })
})
})
})