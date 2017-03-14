module.exports = addressesService
// function begins here. addressesService is exported in the above line.
function addressesService(options) {
    let Addresses

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Addresses = options.modelService

    return {
        getAll,
        getOne,
        insert,
        updateOne,
        removeOne,
        getByUser
    }

    function getAll() {
        return Addresses.find() // returns a method of Promise. Same as calling db.addresses.find() in mongo shell
    }

    function getByUser(queryCondition) {
        return Addresses.find(queryCondition)
    }

    function getOne(queryCondition) {
        return Addresses.findOne(queryCondition)
    }

    function insert(document) {
        let addresses = new Addresses(document)
        return addresses.save()
    }

    function updateOne(queryCondition, doc) {
        return Addresses.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Addresses.findOneAndRemove(queryCondition)
    }
}
