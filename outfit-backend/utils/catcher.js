const catcher = (fn) => {
  const to_return = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  return to_return;
};

module.exports = catcher;
