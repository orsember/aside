// we need to compile .jsx into JavaScript so it won't break if
// anything other than pure js is in here. this has to be done automatically
// use browserify for this http://browserify.org // similar to webpack

// browserify is allowing module style imports with require
var React = require("react/addons");
var Wrapper = require("./components/Wrapper.jsx");
// why React is available here is unknown to me at this point
// in theory anything in JavaScript with an ID gets elevated to the global scope

React.render(<Wrapper />, document.getElementById("app"));

console.log("is there anybody out there???");
