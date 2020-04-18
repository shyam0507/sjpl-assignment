const axios = require('axios')
const constants = require('./../config/constants')

exports.authenticate = async (req, res, next) => {

    var token = req.header('x-auth');

    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }

        let data = await axios.post(constants.AUTH_SERVICE_URL, {}, {
            headers: headers
        });

        // console.log(data.data.id)

        if (data.status === 200) {
            req.userId = data.data.id;
            req.token = token;
            next();
        } else {
            res.status(401).send();
        }

    } catch (error) {
        //console.log(error);
        res.status(401).send();
    }
}
