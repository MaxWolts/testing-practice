const { sum, multiply, divide } = require('./02-math');

describe('Math', () => {
  test('adds 1 + 3 should be 4', () => {
    const rta = sum(1, 3);
    expect(rta).toBe(4);
  });
  test('adds 1 * 3 should be 3', () => {
    const rta = multiply(1, 3);
    expect(rta).toBe(3);
  });
  describe('Division', () => {
    test('should divide', () => {
      const rta = divide(4, 2);
      expect(rta).toBe(2);
      const rta2 = divide(5, 2);
      expect(rta2).toBe(2.5);
    });
    test('divide 0', () => {
      const rta3 = divide(5, 0);
      expect(rta3).toBe(null);
    });
  });
});
