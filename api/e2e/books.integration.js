const mockGetAll = jest.fn();
const request = require('supertest');
const createApp = require('../src/app');
const { generatorManyBook } = require('../src/fakes/book.fake');

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('test for books', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });
  afterAll(async () => {
    await server.close();
  });
  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', () => {
      // Arrage
      const fakeBooks = generatorManyBook(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          // Assert
          expect(body.length).toEqual(3);
        });
    });
  });
});
