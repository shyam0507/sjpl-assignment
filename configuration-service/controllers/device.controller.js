const Device = require('../models').Device;


const confirmationService = require('./../services/confirmation-service')

exports.createDevice = async (req, res) => {
    try {
        const { name, siteId, isOnline } = req.body;
        let device = await Device.create({ name, siteId, isOnline });
        res.send(device);
    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};

exports.updateDevice = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, isOnline } = req.body;
        const isSafeToUpdate = await confirmationService.safeToUpdate(req.token)

        if (!isSafeToUpdate) {
            return res.status(400).send({ message: "Not safe to update" });
        }

        let device = await Device.update({ name, isOnline }, {
            where: {
                id
            }
        });

        return res.send({ message: "Device updated successfully" });

    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};

exports.deleteDevice = async (req, res) => {
    try {
        const id = req.params.id;

        const isSafeToDelete = await confirmationService.sa(req.token)

        if (!isSafeToDelete) {
            return res.status(400).send({ message: "Not safe to delete" });
        }

        let device = await Device.destroy({
            where: {
                id
            }
        });

        if (device === 1) {
            return res.send({ message: "Device deleted successfully" });
        } else {
            throw new Error("Device not found")
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};

exports.findDevices = async (req, res) => {
    const siteId = req.params.siteId;
    const isOnline = req.params.isOnline === 'true';

    let provinces = await Device.findAll({ where: { siteId, isOnline } });
    res.send(provinces);
};



exports.deleteDevices = async (siteId) => {
    try {
        let devices = await Device.destroy({
            where: {
                siteId
            }
        });
        return devices;
    } catch (error) {
        console.log(error)
        throw new Error('Something bad happened please check the data')
    }
};