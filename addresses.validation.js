const util = require('util')

module.exports = {
    validateAddressesParams 
}

function validateAddressesParams(req, res, next) {
    req.checkBody('lastName', 'TYPE IN YOUR LAST NAME PLEASE').notEmpty()
    req.checkBody('firstName', 'TYPE IN YOUR FIRST NAME PLEASE').notEmpty()
    req.checkBody('line_1', 'TYPE IN YOUR ADDRESS PLEASE').notEmpty()
    req.checkBody('city', 'TYPE IN YOUR CITY PLEASE').notEmpty()
    req.checkBody('state.full_name', 'TYPE IN YOUR STATE PLEASE').notEmpty()
    req.checkBody('zipcode', 'TYPE IN YOUR 5 digit ZIP CODE PLEASE').isLength({
        min: 5,
        max: 5
    })
    req.checkBody('state.abv', 'STATE Required').isLength({
        min: 2,
        max: 2
    })
    req.getValidationResult().then(function(errors) {
        if (!errors.isEmpty()) {
            return res.status(400).send('There have been validation errors: ' + util.inspect(errors.array()))
        }
        next()
    })
}
