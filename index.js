const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());

// Import routes
const postRoutes = require('./routes/posts');
const authRoute = require('./routes/auth');

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('connected to DB!')
);

// Middlewares
app.use(cors());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoutes);

// Tienes la habilidad de crear //ROUTES
app.get('/', (req, res) => {
    res.send('HEllo word');
});

// Como comenxar a ecuchar el servidor
app.listen(3000);