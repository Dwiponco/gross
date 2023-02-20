var express = require("express");
// var serveStatic = require("serve-static");
var path = require("path");
app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

var port = process.env.PORT || 8268;
app.listen(port);
console.log("server started " + port);
