class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectError';
    this.statusCode = 400;
  }
}

module.exports = IncorrectError;
