const Site = require('../models').Site;
const confirmationService = require('./../services/confirmation-service')
const siteController = require('./device.controller')


exports.createSite = async (req, res) => {
    try {
        const { name, location, industry } = req.body;
        let site = await Site.create({ name, location, industry });
        res.send(site);
    } catch (error) {
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }

};


exports.findAllSites = async (req, res) => {
    let id;
    if (req.params.id) {
        id = req.params.id;
    }

    let condition = {};
    if (id) {
        condition.where = {
            id
        }
    }

    let sites = await Site.findAll(condition);
    res.send(sites);
};


exports.updateSite = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        let site = await Site.update({ name }, {
            where: {
                id
            }
        });

        return res.send({ message: "Site updated successfully" });

    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};

exports.deleteSite = async (req, res) => {
    try {
        const id = req.params.id;

        const isSafeToUpdate = await confirmationService.safeToUpdate(req.token)

        if (!isSafeToUpdate) {
            return res.status(400).send({ message: "Not safe to delete" });
        }

        await siteController.deleteDevices(id);

        let device = await Site.destroy({
            where: {
                id
            }
        });

        if (device === 1) {
            return res.send({ message: "Site deleted successfully" });
        } else {
            throw new Error("Site not found")
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please check the data' })
    }
};