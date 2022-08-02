const BoocksService = require('./books.service');

const fakeBooks = [
  { _id: 1, name: 'Harry Potter' },
  { _id: 2, name: 'Harry Potter 2' },
  { _id: 3, name: 'Harry Potter 3' },
];
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
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(3);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a list books', async () => {
      // Arrange
      mockGetAll.mockResolvedValue([...fakeBooks]);
      // Act
      const books = await service.getBooks({});
      // Assert
      expect(books.length).toEqual(3);
      expect(books[1].name).toEqual('Harry Potter 2');
    });
  });
});
