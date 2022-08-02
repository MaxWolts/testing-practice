const { MongoClient } = require('mongodb');
const request = require('supertest');
const { config } = require('../src/config/index');
const createApp = require('../src/app');

const DB_NAME = config.dbName;
const MONGO_URL = config.dbUrl;

describe('test for books', () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });
  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  });
  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', async () => {
      // Arrage
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Books1',
          year: 1998,
          author: 'nicolas',
        },
        {
          name: 'Books2',
          year: 1998,
          author: 'nicolas',
        },
      ]);
      console.log(seedData);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          // Assert
          console.log('holis', body);
          expect(body.length).toEqual(2);
        });
    });
  });
});
