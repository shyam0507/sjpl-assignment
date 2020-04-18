const User = require('../models').User;
const authService = require('./../service/auth-service')

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const encryptedPassword = await authService.encryptPassword(password);

        let user = await User.create({ username, password: encryptedPassword });
        res.send(user);
    } catch (error) {
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }

};

exports.loginUser = async function (req, res) {

    try {
        const { username, password } = req.body;

        user = await authService.findByEmailPassword(username, password);
        let token = await authService.generateAuthToken(user);

        res.header('x-auth', token);
        res.send(user);

    } catch (error) {
        console.log(error)
        res.status(401).send(error);
    }

};

exports.verifyToken = async function (req, res) {

    try {
        const token = req.header('x-auth');
        user = await authService.findByToken(token);
        res.send({ 'id': user.id });

    } catch (error) {
        console.log(error)
        res.status(401).send(error);
    }

};



