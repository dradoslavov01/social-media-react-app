const express = require('express');
const db = require('./dbConnection');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

db.on('err', () => console.log('connection error'));
db.once('open', () => {
    console.log('Database connected!');
});

const port = 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));