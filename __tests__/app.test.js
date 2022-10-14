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
  test("status 200 responds with articles with article_id only and returns comment_count as well", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({title: "Student SUES Mitch!",
        article_id: 4,
        topic: "mitch",
        author: "rogersop",
        body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: expect.any(String),
        votes: 0,
        comment_count: expect.any(String)
        });
      });
  });
  test.only("status 200 responds with articles that match the topic if a topic is sent", ()=> {
    return request(app)
     .get("/api/articles?topic=mitch")
     .expect(200)
     .then(({body}) => {
      expect(body.articles).toEqual({article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: "2020-11-03T09:12:00.000Z",
        votes: 0,
        comment_count: '13'

      })
     })
  })
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

  describe("PATCH /api/articles/:article_id", () => {
    test("status 200 responds with updated article", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 100 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 100,
          });
        });
    });
    test("status 400 Bad Request malformed body/ missing required fields", () => {
      return request(app)
        .patch("/api/articles/notanID")
        .send({ inc_votes: 100 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid input");
        });
    });
  });
  test("status 400 incorrect type bad request", () => {
    return request(app)
      .patch("/api/articles/4")
      .send({ inc_votes: "Banana" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
        expect(body.msg).toBe("Invalid input");
      });
  });

