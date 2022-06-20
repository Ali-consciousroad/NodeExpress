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

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);

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

// Create operation not allowed from this specific endpoint URL
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
})

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});



const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});