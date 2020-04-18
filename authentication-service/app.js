const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const userRoutes = require('./routes/user.routes');
const accessTokenRoutes = require('./routes/access-token.routes');

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(cors())

//Include the models
var models = require('./models');
models.sequelize.sync().then(success => {
    console.log("DB connected succesfully!");
}).catch(error => {
    console.log("Something went wrong while connection with database ".error);
})

//Define Routes
app.use('/v1.0/user', userRoutes);
app.use('/v1.0/accessToken', accessTokenRoutes);

const PORT = process.env.PORT | 3001

app.listen(PORT, () => {
    console.log('Server is up and running on port numner ' + PORT);
});
