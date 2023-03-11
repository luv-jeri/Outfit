function promisify(callbackBasedFunction) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackBasedFunction(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}


module.exports = promisify;