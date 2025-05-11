var express = require('express');
var router = express.Router();
const ajv = require("../schemas")

router.post('/', function (req, res, next) {
  const validate = ajv.getSchema("index");
  if (validate(req.body)) {
    res.status(200).send('Todo bien');
  } else {
    res.status(200).send(validate.errors);
  }
});

module.exports = router;
