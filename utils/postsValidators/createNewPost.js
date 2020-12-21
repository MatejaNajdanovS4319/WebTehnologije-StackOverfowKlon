const loginValidator = (subject, text) => {
  return !subject || !text || !subject.length > 2 || !text.length > 4;
};
module.exports = loginValidator;
