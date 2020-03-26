const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.listAllOngs);
routes.post('/ongs', ongController.createOng);

routes.get('/profile', profileController.listIncidentsByOng);

routes.get('/incidents', incidentController.listAllIncidents);
routes.post('/incidents', incidentController.createIncident);
routes.delete('/incidents/:id', incidentController.deleteIncident);

module.exports = routes;