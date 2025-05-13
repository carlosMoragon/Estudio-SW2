const Ajv2020 = require("ajv/dist/2020"); 
const ajv = new Ajv2020();

//Declaramos las rutas donde están nuestros schemas
const schema_coche = require("./coche.schema.json")
const schema_moto = require("./moto.schema.json")

// Asignamos un nombre a cada schema. Este nombre es el que se utiliza en el validateSchema
ajv.addSchema(schema_coche, "coche") 
ajv.addSchema(schema_moto, "moto")

module.exports = ajv;