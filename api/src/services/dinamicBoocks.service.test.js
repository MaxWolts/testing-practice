const BoocksService = require('./books.service');
const { generatorManyBook } = require('../fakes/book.fake');

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('test for BooksService', () => {
  let service;
  beforeEach(() => {
    service = new BoocksService();
    jest.clearAllMocks();
  });
  describe('test for getBooks', () => {
    test('should return a list books', async () => {
      // Arrange
      const fakeBooks = generatorManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a list books', async () => {
      // Arrange
      const fakeBooks = generatorManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(books[1].name).toEqual(fakeBooks[1].name);
    });
  });
});
