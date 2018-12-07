const gulp = require("gulp");
const LiveServer = require("gulp-live-server");
const browserSync = require("browser-sync");
const browserify = require("browserify");
const reactify = require("reactify");
const source = require("vinyl-source-stream");

// gulp is often used as a convenience tool to manage tasks
// here it will convert the .jsx to browser readable .js
// this function will run whenever we run gulp live-server from the cli
gulp.task("live-server", () => {
  const server = new LiveServer("server/main.js"); // new instance of LiveServer and pass the path of our server
  server.start();
  // this "task" is a script you can run with gulp command to benefit from a hot reloading live server
  // it also allows to automate the server somehow later on...
});
// live-server has to run before "serve" runs
// initialize browserSync where the 1st arg is null, which means live-server is already running
// pass it the proxy which is where we were going to see our server
// and pass it the port to specify the new connection
// what this does is automatically run our server and open it up in the browser
// also you now have browsersync: https://www.browsersync.io/
// NOTE that its also dependent on bundle now
gulp.task("serve", ["bundle", "live-server"], () => {
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    port: 9001
  });
});

// browserify to compile .jsx into .js with reactify helper tool
gulp.task("bundle", () => {
  return (
    browserify({
      // add starting point to config object
      entries: "app/main.jsx", // before transformation
      // improve console output
      debug: true
      // browserify will grab main.jsx and all files required in it and transform it .js by reactify transform
    })
      .transform(reactify)
      // bundles the soup with browserify.bundle() ==> output
      .bundle()
      // vinyl-source-stream will take gulp understandable information and transform it so a static server can understand it
      .pipe(source("app.js")) // after transformation
      .pipe(gulp.dest("./tmp")) // send compiled stuff to temp dir
  );
});
