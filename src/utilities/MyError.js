class MyError extends Error {
  constructor(err, type) {
    super(err);
    switch (typeof (err)) {
      case 'object': {
        this.errors = err.errors;
        this.message = err.message;
        this.name = err.name;
        this.stack = err.stack;
        break
      }
      case 'string': {
        this.message = err;
      }
    }
    this.type = type;


    //this.err = err;
  }
}

module.exports = MyError;
