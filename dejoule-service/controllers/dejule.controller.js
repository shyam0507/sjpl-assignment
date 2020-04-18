exports.safeToAdd = async (req, res) => {
    try {
        res.send(Math.random() >= 0.5);
    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please try after some time' })
    }
};

exports.safeToUpdate = async (req, res) => {
    try {
        res.send(Math.random() >= 0.5);
    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please try after some time' })
    }
};

exports.safeToDelete = async (req, res) => {
    try {
        res.send(Math.random() >= 0.5);
    } catch (error) {
        console.log(error)
        res.status(400).send({ 'error': 'Something bad happened please try after some time' })
    }
};