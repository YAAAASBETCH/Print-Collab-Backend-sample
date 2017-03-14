// we are exporting an object that has the function validateAddressesParams.
const util = require('util')

module.exports = {
    validateAddressesParams // This function takes the request , response and the next function as parameters.  Using functionality that we gain from express-validator, we can then use .checkBody to check name parameter is not empty, i.e. required.
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
// in this file, we have hooked in middleware function in both the post and put api routes. These middleware functions sit as the parameters before the controller functions.  By doing this, we are telling express that the request needs to pass through these functions before continuing on to the controllers.
// Inside the hackerValidation.js, we are exporting an object that has the function validatehackerParams. This function takes the request , response and the next function as parameters.  Using functionality that we gain from express-validator, we can then use .checkBody to check name parameter is not empty, i.e. required.
// After checking the parameters, you need to run .getValidationResult() which will asynchronously get the validation errors. Using the promise syntax, we then check if there are any errrors, and if so return a 400 response with those errors.
// If there are no errors, we call the next() function which will continue the request and pass it to our controllers.
