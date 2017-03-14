// Create addresses route file that will create an instance of the router and direct requests to /api/addresses to correct addresses controller functions
const router = require('express').Router() // node is providing the router library
const addressesController = require('../controllers/addresses.controller')() // we require addressesController and invoke it.we get the object that gives us access to all of the function inside of our closure
const addressesValidation = require('../middleware/addresses.validation')
const cache = require('../../config/apicache').cache.middleware
module.exports = router

// api routes ===========================================================
// hook in middleware function in both the post and put api routes

router.get('/', addressesController.getAll)
router.get('/', cache(), addressesController.getAll)
router.get('/:id', addressesController.getOneById)
router.put('/:id', addressesValidation.validateAddressesParams, addressesController.updateById) // By doing this, we are telling express that the request needs to pass through these functions before continuing on to the controllers.
router.delete('/:id', addressesController.removeById)
router.post('/', addressesValidation.validateAddressesParams, addressesController.insert) // By doing this, we are telling express that the request needs to pass through these functions before continuing on to the controllers.
router.get('/get/:id', addressesController.getAddressesByUser)
router.post('/create', addressesValidation.validateAddressesParams, addressesController.createUserAddress)
// router.delete('/:id', addressesController.removeAddress) addressesValidation.validateAddressesParams - updateById, insert, create
