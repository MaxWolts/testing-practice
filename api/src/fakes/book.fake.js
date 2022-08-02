const { faker } = require('@faker-js/faker');

const generatorOneBook = () => ({
  _id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
});

const generatorManyBook = (size) => {
  const limit = size ?? 10;
  const fakeBooks = [];
  for (let index = 0; index < limit; index += 1) {
    fakeBooks.push(generatorOneBook());
  }
  return [...fakeBooks];
};

module.exports = { generatorOneBook, generatorManyBook };
