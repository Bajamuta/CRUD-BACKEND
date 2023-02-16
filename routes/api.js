const express = require('express');
const router = express.Router();

const cityController = require('../controllers/api/cityController');
const citySizeController = require('../controllers/api/citySizeController');
const countryController = require('../controllers/api/countryController');
const actionController = require('../controllers/api/actionController');
const actionTypeController = require('../controllers/api/actionTypeController');
const clientController = require('../controllers/api/clientController');
const clientPersonController = require('../controllers/api/clientPersonController');
const clientBusinessController = require('../controllers/api/clientBusinessController');
const userController = require('../controllers/api/userController');
const authController = require('../controllers/api/authController');

module.exports = router;

/*TODO how to auth for api access?*/

/*
* CITIES
* */
const API_CITY_URL = '/cities/';
router.get(`${API_CITY_URL}/all`, cityController.index);
router.get(`${API_CITY_URL}/:id`, cityController.city);
router.post(`${API_CITY_URL}/add`, cityController.create);
router.post(`${API_CITY_URL}/update/:id`, cityController.update);
router.delete(`${API_CITY_URL}/delete/:id`, cityController.delete);

/*
* CITY SIZES CONTROLLER
* */
const API_CITY_SIZE_URL = '/citySizes/';
router.get(`${API_CITY_SIZE_URL}/all`, citySizeController.index);
router.get(`${API_CITY_SIZE_URL}/:id`, citySizeController.size);
router.post(`${API_CITY_SIZE_URL}/add`, citySizeController.create);
router.post(`${API_CITY_SIZE_URL}/update/:id`, citySizeController.update);
router.delete(`${API_CITY_SIZE_URL}/delete/:id`, citySizeController.delete);

/*
* COUNTRIES
* */
const API_COUNTRY_URL = '/countries/';
router.get(`${API_COUNTRY_URL}/all`, countryController.index);
router.get(`${API_COUNTRY_URL}/:id`, countryController.country);
router.post(`${API_COUNTRY_URL}/add`, countryController.create);
router.post(`${API_COUNTRY_URL}/update/:id`, countryController.update);
router.delete(`${API_COUNTRY_URL}/delete/:id`, countryController.delete);

/*
* CLIENTS
* */
const API_CLIENT_URL = '/clients/';
router.get(`${API_CLIENT_URL}/all`, clientController.index);
router.get(`${API_CLIENT_URL}/:id`, clientController.client);
router.post(`${API_CLIENT_URL}/add`, clientController.create);
router.post(`${API_CLIENT_URL}/update/:id`, clientController.update);
router.delete(`${API_CLIENT_URL}/delete/:id`, clientController.delete);

/*
* CLIENTS BUSINESS
* */
const API_CLIENT_BUSINESS_URL = '/businessClients/';
router.get(`${API_CLIENT_BUSINESS_URL}/all`, clientBusinessController.index);
router.get(`${API_CLIENT_BUSINESS_URL}/:id`, clientBusinessController.client);
router.post(`${API_CLIENT_BUSINESS_URL}/add`, clientBusinessController.create);
router.post(`${API_CLIENT_BUSINESS_URL}/update/:id`, clientBusinessController.update);
router.delete(`${API_CLIENT_BUSINESS_URL}/delete/:id`, clientBusinessController.delete);

/*
* CLIENTS PEOPLE
* */
const API_CLIENT_PERSON_URL = '/personClients/';
router.get(`${API_CLIENT_PERSON_URL}/all`, clientPersonController.index);
router.get(`${API_CLIENT_PERSON_URL}/:id`, clientPersonController.client);
router.post(`${API_CLIENT_PERSON_URL}/add`, clientPersonController.create);
router.post(`${API_CLIENT_PERSON_URL}/update/:id`, clientPersonController.update);
router.delete(`${API_CLIENT_PERSON_URL}/delete/:id`, clientPersonController.delete);

/*
* ACTIONS
* */
const API_ACTION_URL = '/actions/';
router.get(`${API_ACTION_URL}/all`, actionController.index);
router.get(`${API_ACTION_URL}/:id`, actionController.action);
router.post(`${API_ACTION_URL}/add`, actionController.create);
router.post(`${API_ACTION_URL}/update/:id`, actionController.update);
router.delete(`${API_ACTION_URL}/delete/:id`, actionController.delete);

/*
* ACTIONS TYPES
* */
const API_ACTION_TYPE_URL = '/actionTypes/';
router.get(`${API_ACTION_TYPE_URL}/all`, actionTypeController.index);
router.get(`${API_ACTION_TYPE_URL}/:id`, actionTypeController.type);
router.post(`${API_ACTION_TYPE_URL}/add`, actionTypeController.create);
router.post(`${API_ACTION_TYPE_URL}/update/:id`, actionTypeController.update);
router.delete(`${API_ACTION_TYPE_URL}/delete/:id`, actionTypeController.delete);

/*
* USERS
* */
const API_USER_URL = '/users/';
router.get(`${API_USER_URL}/all`, userController.index);
router.get(`${API_USER_URL}/:id`, userController.user);
router.post(`${API_USER_URL}/add`, userController.create);
router.post(`${API_USER_URL}/update/:id`, userController.update);
router.delete(`${API_USER_URL}/delete/:id`, userController.delete);

/*
* AUTH
* */
router.post('/auth/login', authController.getToken);


module.exports = router;
