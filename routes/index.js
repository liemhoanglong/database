var express = require('express');
var router = express.Router();

//1.require mongoose
var mongoose = require('mongoose');

//2.connect
mongoose.connect('mongodb://localhost/demo-express');

//3.tạo Schema
var userDataSchema = new  mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  pass: String
}, {collection: 'user-data'});

//4.tạo model
var UserData = mongoose.model('UserData', userDataSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    age: req.body.age,
    pass: req.body.pass
  };

  var data = new UserData(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.age = req.body.age;
    doc.pass = req.body.pass;
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;