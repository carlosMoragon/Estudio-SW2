/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoose = require('mongoose');

/**
* Delete a driver
*
* idUnderscoredriver Integer 
* returns Message
* */
const driverIdDriverDELETE = ({ id_driver }) => new Promise(
  async (resolve, reject) => {
    try {
      //Supongo que nos referiamos a driverNumber y no a _id
      const result = await mongoose.connection.db.collection('drivers').deleteOne({ driverNumber: parseInt(id_driver) });

      if(result.deletedCount === 0){
        return reject(Service.rejectResponse(
          'Driver not found',
          404
        ));
      }
      return resolve(Service.successResponse({ message: 'Driver deleted successfully' }));  
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get driver by ID
*
* idUnderscoredriver Integer 
* returns Driver
* */
const driverIdDriverGET = ({ id_driver }) => new Promise(
  async (resolve, reject) => {
    try {
      //Supongo que nos referiamos a driverNumber y no a _id
      const driver = await mongoose.connection.db.collection('drivers').findOne({ driverNumber: parseInt(id_driver) }, { projection: { _id: 0 } });

      if(!driver){
        return reject(Service.rejectResponse(
          'Driver not found',
          404
        ));
      }
      return resolve(Service.successResponse(driver));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Add a driver
*
* idUnderscoredriver Integer 
* driver Driver  (optional)
* returns CreatedResponse
* */
const driverIdDriverPOST = ({ idUnderscoredriver, driver }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoredriver,
        driver,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a driver
*
* idUnderscoredriver Integer 
* driver Driver  (optional)
* returns Message
* */
const driverIdDriverPUT = ({ idUnderscoredriver, driver }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscoredriver,
        driver,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all drivers (URIs)
*
* returns _drivers_get_200_response
* */
const driversGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all drivers in a race (with optional filters)
*
* idUnderscorerace Integer 
* driverCode String Filter by driver code (optional)
* team String Filter by team name (optional)
* returns _drivers__id_race__get_200_response
* */
const driversIdRaceGET = ({ idUnderscorerace, driverCode, team }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
        driverCode,
        team,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete a race
*
* idUnderscorerace Integer 
* returns Message
* */
const raceIdRaceDELETE = ({ idUnderscorerace }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a race by ID
*
* idUnderscorerace Integer 
* returns Race
* */
const raceIdRaceGET = ({ idUnderscorerace }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get a lap from a race (with optional filter by driver)
*
* idUnderscorerace Integer 
* lapUnderscorenumber Integer 
* driverCode String Filter by driver code (optional)
* returns _race__id_race__lap__lap_number__get_200_response
* */
const raceIdRaceLapLapNumberGET = ({ idUnderscorerace, lapUnderscorenumber, driverCode }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
        lapUnderscorenumber,
        driverCode,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all laps of a race
*
* idUnderscorerace Integer 
* returns _race__id_race__laps_get_200_response
* */
const raceIdRaceLapsGET = ({ idUnderscorerace }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a race
*
* idUnderscorerace Integer 
* race Race  (optional)
* returns Message
* */
const raceIdRacePUT = ({ idUnderscorerace, race }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idUnderscorerace,
        race,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a race
*
* race Race  (optional)
* returns CreatedResponse
* */
const racePOST = ({ race }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        race,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all races
*
* returns _races_get_200_response
* */
const racesGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

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
