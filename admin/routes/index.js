const express = require('express');
const router = express.Router();
const parser = require('xml2json');
const fs = require('fs');
const util = require('util');
const keys = fs.readFileSync(__dirname + '/../../lang/template/keys.json', 'UTF-8', function(json) {
  return json;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const globals = fs.readFileSync(__dirname + '/../../lang/template/global/content.xml', 'UTF-8', function(xml) {
  	return xml;
  });
  const dashboard = fs.readFileSync(__dirname + '/../../lang/template/dashboard/content.xml', 'UTF-8', function(xml) {
    return xml;
  });
  res.render('index', { 
  	title: 'Express',
    globals: parser.toJson(globals),
    dashboard: parser.toJson(dashboard)
  });
});

router.get('/api/get/:key', function(req, res, next) {
  let returnObj = {
    key: req.params.key
  };
  res.send(JSON.stringify(returnObj));
});

module.exports = router;
