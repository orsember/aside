const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render("../app/index.ejs", {});
  // only serving this file and not anything esle
  // app.use below to fix that
});
app.listen("7777", () => {
  console.log("big bada booom server, bada boom, http://localhost:7777/");
});
// serve up a static directory whith express.static so we can see main.jsx file
// log __dirname to see what the string will look like
app.use(express.static(`${__dirname}/../tmp`));
console.log('dirname log', __dirname)
