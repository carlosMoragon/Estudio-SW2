const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const mongoose = require('mongoose');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
  
  mongoose.connect('mongodb://localhost:27017/f1-data-db')
  .then(() => {
    console.log('Establecida la conexión con la bbdd');
  });
  
};

launchServer().catch(e => logger.error(e));
