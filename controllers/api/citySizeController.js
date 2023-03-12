const CitySize = require('../../models/CitySizeModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        CitySize.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newCitySize = new CitySize({...req.body});
        newCitySize.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
   size: (req, res) => {
        CitySize.findById(req.params.id)
            .then((size) => {
                const citySizeDTO = size;
                /*TODO ctySizeDTO*/
                res.json(citySizeDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        CitySize.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        CitySize.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO cities*/
}
