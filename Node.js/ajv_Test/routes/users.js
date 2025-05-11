var express = require('express');
const ajv = require("../schemas")
var router = express.Router();

router.post('/', function (req, res, next) {
  const validate = ajv.getSchema("user");
  if (validate(req.body)) {
    res.status(200).send('Todo bien');
  } else {
    res.status(200).send(validate.errors);
  }
});

module.exports = router;
