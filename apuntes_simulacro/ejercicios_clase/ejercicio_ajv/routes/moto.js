var express = require('express');
var router = express.Router();
const ajv = require('../schemas');

function validateSchema(json, schema_name) {
  const validate = ajv.getSchema(schema_name);
  if (validate(json)) {
      return null;
  } else {
      return validate.errors;
  }
}


router.post("/", (req, res, next) => {
  const errors = validateSchema(req.body, 'moto');
  if (errors) {
    return res.status(400).json({ error: "JSON no válido", details: errors });
  }
  res.status(200).json({ message: "JSON válido" });
});


module.exports = router;
