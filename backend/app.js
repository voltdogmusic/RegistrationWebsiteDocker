const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();

const cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Any URL with the first param is redirected to the second params folder, then the remaining URL sent in is used to find the final endpoint
//api/user/register = api/user redirects to Routes/auth then register is used to located the enpoint in that js file


//route not used
app.use('/posts', require('./Routes/posts'));

//this route is being used for api/user/login and api/user/register
app.use('/api/user', require('./Routes/auth'));

let {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

const dburl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

const localUrl = 'mongodb+srv://root:GigaBooter@cluster0.pjflhq0.mongodb.net/?retryWrites=true&w=majority'

console.log(dburl);

mongoose.connect(localUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('connected to db');
    })
    .catch((error) => {
        console.log('error connecting to db:', error);
    });

// const router = express.Router();
// app.use('/', router);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });


