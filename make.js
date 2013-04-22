require('shelljs/make');
require('shelljs/global');

var fs      = require('fs')
  , path = require('path')
  , browserify = require('browserify')
  , UglifyJS = require("uglify-js")
  , less = require('less')
  ;

var buildPath = path.join(__dirname, 'build/socialfeed.js')
  , minifiedPath = path.join(__dirname, 'build/socialfeed.min.js');

target.all = function () {
  target.bundle(function () {
    target.less(function () {
      target.minify();
    });
  });
};

target.bundle = function (cb) {
  console.log('Bundle');
  bundleResources('src/moduletemplates/', 'src/resources.js');
  bundle(cb);
};

target.less = function (cb) {
  console.log('Compiling LESS');
  var data = fs.readFileSync('src/style.less');
  data = data.toString();

  var parser = new(less.Parser)({
    paths: ['./src'], // Specify search paths for @import directives
    filename: 'style.less' // Specify a filename, for better error messages
  });

  parser.parse(data, function (e, tree) {
    var css = tree.toCSS()
      , minified = tree.toCSS({ compress: true });
    fs.writeFile('build/socialfeed.css', css);
    console.log('Minifing CSS');
    fs.writeFile('build/socialfeed.min.css', minified, cb);
  });
};

target.minify = function () {
  console.log('Minifying...');
  var result = UglifyJS.minify(buildPath);
  fs.writeFileSync(minifiedPath, result.code);
  console.log('Minfying succeeded.');
};

function getResourcesList (templateFolder) {
  var filenames = fs.readdirSync(path.join(__dirname, templateFolder));
  return filenames.map(function (file) {
    return file.replace('.html', '');
  });
}

function bundleResources (source, target) {
  var templates = getResourcesList(source);

  var resourceString = "";
  templates.forEach(function (template) {
    resourceString += '\t"'+template+'": ' + JSON.stringify(cat(source + template + '.html')) + ",\n";
  });

  cat('src/resources.js.template').replace(/%BODY%/g, resourceString).to(path.join(__dirname, target));
}


function bundle(cb) {
  cb = cb || function () {};
  // This is function is the important part and should be similar to what you would use for your project
  browserify()
  .require(require.resolve('./src/socialfeed.js'), { entry: true })
  .bundle(function (err, src) {
    if (err) return console.error(err);

    fs.writeFileSync(buildPath, src);
    console.log('Build succeeded, open index.html to see the result.');
    cb();
  });
}



