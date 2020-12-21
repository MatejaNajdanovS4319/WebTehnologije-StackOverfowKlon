const registerValidator = (firstName, lastName, email, password, job) => {
  return (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !job ||
    firstName.length < 3 ||
    firstName.length > 20 ||
    lastName.length < 3 ||
    lastName.length > 20 ||
    password.length < 6 ||
    password.length > 20 ||
    job.length < 3 ||
    job.length > 30 ||
    email.length < 6 ||
    email.length > 30 ||
    !email.includes('@') ||
    !email.includes('.')
  );
};
module.exports = registerValidator;
