const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./model')
const errorHandler = require('./middleware/error-handler')
const router = require('./router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', router)
app.use(errorHandler());

app.listen(PORT, () => {
    console.log('Server is runing at http://localhost')
})
