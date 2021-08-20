class AsyncError extends Error {
  constructor(message, stack) {
    super(message);

    this.name = 'AsyncError';
    this.stack = stack;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AsyncError;
