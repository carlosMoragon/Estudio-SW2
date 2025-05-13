/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DefaultService');
const driverIdDriverDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.driverIdDriverDELETE);
};

const driverIdDriverGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.driverIdDriverGET);
};

const driverIdDriverPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.driverIdDriverPOST);
};

const driverIdDriverPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.driverIdDriverPUT);
};

const driversGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.driversGET);
};

const driversIdRaceGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.driversIdRaceGET);
};

const raceIdRaceDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.raceIdRaceDELETE);
};

const raceIdRaceGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.raceIdRaceGET);
};

const raceIdRaceLapLapNumberGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.raceIdRaceLapLapNumberGET);
};

const raceIdRaceLapsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.raceIdRaceLapsGET);
};

const raceIdRacePUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.raceIdRacePUT);
};

const racePOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.racePOST);
};

const racesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.racesGET);
};


module.exports = {
  driverIdDriverDELETE,
  driverIdDriverGET,
  driverIdDriverPOST,
  driverIdDriverPUT,
  driversGET,
  driversIdRaceGET,
  raceIdRaceDELETE,
  raceIdRaceGET,
  raceIdRaceLapLapNumberGET,
  raceIdRaceLapsGET,
  raceIdRacePUT,
  racePOST,
  racesGET,
};
