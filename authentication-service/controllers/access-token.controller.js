const AccessToken = require('../models').AccessToken;


exports.createAccessToken = async (req, res) => {
    try {
        const { name, userId, isOnline } = req.body;
        let accessToken = await AccessToken.create({ name, userId, isOnline });
        res.send(accessToken);
    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};

exports.findAllAccessTokens = async (req, res) => {
    let provinces = await AccessToken.findAll();
    res.send(provinces);
};