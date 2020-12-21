const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://mateja:uzYewQc4@devhelp.nsodi.mongodb.net/<dbname>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log('mongo connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connect;
