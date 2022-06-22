const express = require('express');
const morgan = require('morgan');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();
// Body parsing middleware
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

// Allow parameters to be used in child routes 
// dishRouter = express.Router({ mergeParams: true });


// Load the router modules 
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
// /dishes/:dishId
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.get('/promotions/:promoId', (req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
});

app.get('/leaders/:leaderId', (req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
});

// Create operation not allowed from this specific endpoint URL
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.post('/promotions/:promoId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
});

app.post('/leaders/:leaderId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
});


app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.put('/promotions/:promoId', (req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.put('/leaders/:leaderId', (req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name +
        ' with details: ' + req.body.description);
});



app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.delete('/promotions/:promoId', (req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

app.delete('/leaders/:leaderId', (req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});