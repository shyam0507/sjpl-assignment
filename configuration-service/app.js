const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate').authenticate;

var cors = require('cors')

const siteRoutes = require('./routes/site.routes');
const deviceRoutes = require('./routes/device.routes');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(authenticate)

//Include the models
var models = require('./models');
models.sequelize.sync().then(success => {
    console.log("DB connected succesfully!");
}).catch(error => {
    console.log("Something went wrong while connection with database ".error);
})

//Define Routes
app.use('/v1.0/site', siteRoutes);
app.use('/v1.0/device', deviceRoutes);


const PORT = process.env.PORT | 3000

app.listen(PORT, () => {
    console.log('Server is up and running on port numner ' + PORT);
});
