const AccessToken = require('../models').AccessToken;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('./../config/constants')
const User = require('../models').User;

exports.encryptPassword = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)
        return hash;
    } catch (error) {
        console.log(error)
    }

};

exports.findByEmailPassword = async function (username, password) {

    userFound = await User.findOne({
        where: {
            username
        },
    });

    if (!userFound) {
        throw new Error("User not found");
    }

    const passwordValid = await bcrypt.compare(password, userFound.password)

    if (!passwordValid) {
        throw new Error('Password does not match')
    }

    return userFound;
};

exports.generateAuthToken = async function (user) {

    var access = 'auth';

    var signOptions = {
        expiresIn: constants.TOKEN_EXPIRY
    };

    var token = jwt.sign({
        id: user.id
    }, constants.JWT_SECRET, signOptions);

    // console.log(token)

    await AccessToken.create({ userId: user.id, access, token })
    return token;

};


exports.findByToken = async function (token) {
    var decoded;

    var verifyOptions = {
        expiresIn: constants.TOKEN_EXPIRY
    };

    try {
        decoded = jwt.verify(token, constants.JWT_SECRET, verifyOptions);
    } catch (e) {
        console.log(e)
        throw new Error("Invalid/Expired token")
    }

    // console.log(decoded)

    userData = await AccessToken.findOne({
        where: {
            'userId': decoded.id,
            'token': token,
            'access': 'auth'
        }
    });

    if (!userData) {
        throw new Error("Invalid/Expired token")
    }

    return userData

};