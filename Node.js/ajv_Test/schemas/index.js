const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020();

const schema_index = require("./index.schema.json")
const schema_user = require("./user.schema.json")

ajv.addSchema(schema_index, "index")
ajv.addSchema(schema_user, "user")

module.exports = ajv;