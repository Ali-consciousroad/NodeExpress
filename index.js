const express = require('express');
const morgan = require('morgan');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();
// Body parsing middleware
// Require the multiple modules needed
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

// Allow parameters to be used in child routes 
// dishRouter = express.Router({ mergeParams: true });


// Mount the routers on the required endpoints
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(morgan('dev'));
app.use(express.static(__dirname+ '/public'));
// next() look for additional functions that could match our endpoint
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});