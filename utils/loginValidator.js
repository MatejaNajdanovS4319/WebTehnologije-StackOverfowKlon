const loginValidator = (email, password) => {
    return (
      !email ||
      !password ||
      password.length < 6 ||
      password.length > 20 ||
      email.length < 6 ||
      email.length > 30 ||
      !email.includes('@') ||
      !email.includes('.')
    );
  };
  module.exports = loginValidator;
  