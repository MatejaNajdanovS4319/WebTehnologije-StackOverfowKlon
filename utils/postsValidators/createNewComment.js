const commentValidator = (text) => {
  return !text || !text.length > 4;
};
module.exports = commentValidator;
