var express = require('express');
var router = express.Router();
var parser = require('xml2json');
var fs = require('fs');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  const keys = fs.readFileSync(__dirname + '/../../lang/template/keys.json', 'UTF-8', function(json) {
  	return json;
  });
  const globals = fs.readFileSync(__dirname + '/../../lang/template/global/content.xml', 'UTF-8', function(xml) {
  	return xml;
  });
  // const globalsConsole = util.inspect(JSON.parse(parser.toJson(globals)), true, 7, true);
  // console.log(globalsConsole);
  res.render('index', { 
  	title: 'Express'
  });
});

module.exports = router;
