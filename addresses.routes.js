const router = require('express').Router() 
const addressesController = require('../controllers/addresses.controller')() 
const addressesValidation = require('../middleware/addresses.validation')
const cache = require('../../config/apicache').cache.middleware
module.exports = router

// api routes ===========================================================
// hook in middleware function in both the post and put api routes

router.get('/', addressesController.getAll)
router.get('/', cache(), addressesController.getAll)
router.get('/:id', addressesController.getOneById)
router.put('/:id', addressesValidation.validateAddressesParams, addressesController.updateById) 
router.delete('/:id', addressesController.removeById)
router.post('/', addressesValidation.validateAddressesParams, addressesController.insert) 
router.get('/get/:id', addressesController.getAddressesByUser)
router.post('/create', addressesValidation.validateAddressesParams, addressesController.createUserAddress)
