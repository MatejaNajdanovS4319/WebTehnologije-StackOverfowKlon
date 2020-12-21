const express = require('express');
const app = express();
const cors = require('cors');

// database connection
const connectDB = require('./config/dataBase');
connectDB();

// routes
const authRoute = require('./api/auth');
const profileRoute = require('./api/profile');
const postsRoute = require('./api/posts');
const messagesRoute = require('./api/messages');
const commentsRoute = require('./api/comments');

// middleware body-parser
app.use(express.json({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));

// App
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/messages', messagesRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentsRoute);

// server setup
app.listen(5000, () => console.log('server started'));
