const express = require('express');
const restful = require('node-restful');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
const mongoose = restful.mongoose;

const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
});

// Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({ new: true, runValidators: true });

// Routes
Client.register(server, '/clients');

server.listen(port, () => console.log(`server is running on ${port}`));