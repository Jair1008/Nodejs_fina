const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const user = require('./routes/user');
const employed = require('./routes/employed');
const notFoundHandler = require('./middleware/notFoundHandler');
const corsHandler = require('./middleware/corsHandler');
const auth = require('./middleware/auth');
const app = express();

app.use(corsHandler);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/employed", user);
app.use(auth);
app.use("/employed", employed);
app.use(notFoundHandler);

// Run server
app.listen(3000, () => {
  console.log("Server is running...");
});

