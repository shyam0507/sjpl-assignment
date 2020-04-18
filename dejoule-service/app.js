const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var authenticate = require('./middleware/authenticate').authenticate

const dejuleRoutes = require('./routes/dejule.routes');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(authenticate)


//Define Routes
app.use('/v1.0/dejule', dejuleRoutes);


const PORT = process.env.PORT | 3002

app.listen(PORT, () => {
    console.log('Server is up and running on port numner ' + PORT);
});
