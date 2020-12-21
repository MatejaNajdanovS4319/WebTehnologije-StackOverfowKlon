const loginValidator = (text) => {
    return (
      !text ||
      text.length < 2
    );
  };
  module.exports = loginValidator;
  