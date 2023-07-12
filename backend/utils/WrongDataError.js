class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongDataError';
    this.statusCode = 401;
  }
}

module.exports = WrongDataError;
