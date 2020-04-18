const axios = require('axios')
const constants = require('./../config/constants')

exports.safeToUpdate = async (token) => {

    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }

        let data = await axios.get(`${constants.DEJULE_SERVICE_URL}${constants.DEJULE_SERVICE_OPERATIONS_UPDATE}`, {
            headers: headers
        });

        return data.data;

    } catch (error) {
        throw new Error("Something bad happened please try after some time")
    }
} 

exports.safeToDelete = async (token) => {

    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }

        let data = await axios.get(`${constants.DEJULE_SERVICE_URL}${constants.DEJULE_SERVICE_OPERATIONS_UPDATE}`, {
            headers: headers
        });

        return data.data;

    } catch (error) {
        throw new Error("Something bad happened please try after some time")
    }
} 


