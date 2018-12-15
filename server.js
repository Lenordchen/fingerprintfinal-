var express = require('express')
var app = express()
var fs = require("fs");
var Jimp = require('jimp');


app.use(express.static('.'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

// This will return a list of files in the "fingerprints" folder as JSON
app.get('/getfingerprints', function (req, res) {
	fs.readdir('fingerprint_bitmap', function(err, items) {
      items.sort();
      console.log(items);
		res.send(items);
	});
});

app.get('/image', function (req, res) {
  //http://localhost:8080/image?imagefile=1.jpg
  var imagefile = req.query.imagefile;
  Jimp.read(imagefile, (err, out) => {
    if (err) throw err;
    out.write(imagefile + ".jpg"); // save
    //res.sendFile(imagefile + ".jpg", {root: '.'});
    res.redirect(imagefile + ".jpg");
  });
});
