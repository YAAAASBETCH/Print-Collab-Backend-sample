const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/addresses'
const addressesModel = require('../models/addresses')
const addressesService = require('../services/addresses.service')({
    modelService: addressesModel
})
(function() {
module.exports = addressesController

function addressesController() { // exporting on above line and defining on this line.
    return {
        getAll,
        getOneById,
        insert,
        updateById,
        removeById,
        createUserAddress,
        getAddressesByUser
        // removeAddress
    }

    function getAll(req, res) {
        addressesService.getAll()
            .then((addresses) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = addresses
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        addressesService.getOne(queryCondition)
            .then((addresses) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = addresses
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function getAddressesByUser(req, res) {
        let queryCondition = {
            customer_id: req.user._id // gets the addresses created used the customer_id from schema be associated to user id
        }

        addressesService.getByUser(queryCondition)
            .then((addresses) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = addresses
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function insert(req, res) {
        addressesService.insert(req.body)
            .then((addresses) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = addresses
                res.status(201)
                    .location(path.join(apiPrefix, addresses._id.toString())) // how does this ._id work when it's not defined.
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function createUserAddress(req, res) {
        req.body.customer_id = req.user._id // allows user addresses created be assigned by the User's id
        addressesService.insert(req.body)
            .then((addresses) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = addresses
                res.status(201)
                    .location(path.join(apiPrefix, addresses._id.toString())) // how does this ._id work when it's not defined.
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        addressesService.updateOne(queryCondition, req.body)
            .then((addresses) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel) // dtypically shouldnt be here.
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        addressesService.removeOne(queryCondition)
            .then((addresses) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = addresses
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
})();
