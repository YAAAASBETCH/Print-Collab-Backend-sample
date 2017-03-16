module.exports = addressesService
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
        return Addresses.find() 
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
