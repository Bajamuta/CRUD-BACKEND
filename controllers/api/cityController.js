const City = require('../../models/CityModel');
const Country = require('../../models/CountryModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        City.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newCity= new City({...req.body});
        newCity.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    city: (req, res) => {
        City.findById(req.params.id)
            .then((city) => {
                const cityDTO = city;
                /*TODO ctyDTO*/
                res.json(cityDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        City.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        City.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    addCountry: (req, res) => {
        let city;
        City.findById(req.params.id)
            .then(
                (cityResult) => {
                    city = cityResult;
                    return Country.findById(req.body.countryId);
                }
            )
            .then(
                (countryResult) => {
                    city.countries.push(countryResult.id);
                    city.save();
                    countryResult.cities.push(city.id);
                    countryResult.save();
                    return res.json('Country added');
                }
            )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO countries && clients*/
}
