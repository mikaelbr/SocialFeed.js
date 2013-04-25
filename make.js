require('shelljs/make');
require('shelljs/global');

var fs      = require('fs')
  , path = require('path')
  , browserify = require('browserify')
  , UglifyJS = require("uglify-js")
  , less = require('less')
  ;

var buildPath = path.join(__dirname, 'socialfeed.js')
  , minifiedPath = path.join(__dirname, 'socialfeed.min.js');

target.all = function () {
  target.bundle(function () {
    target.less(function () {
      target.minify();
      console.log('Bundle complete...')
    });
  });
};

target.bundle = function (cb) {
  console.log('Starting bundling');
  bundleResources('src/moduletemplates/', 'src/resources.js');
  bundle(cb);
};

target.resources = function () {
  bundleResources('src/moduletemplates/', 'src/resources.js');
};

target.less = function (cb) {
  console.log('Compiling LESS');
  var data = cat('src/style.less');

  var parser = new(less.Parser)({
      paths: ['./src']
    , filename: 'style.less' 
  });

  parser.parse(data, function (e, tree) {
    var css = tree.toCSS()
      , minified = tree.toCSS({ compress: true });
    css.to('socialfeed.css');
    console.log('Minifying CSS');
    minified.to('socialfeed.min.css');
    cb();
  });
};

target.minify = function () {
  console.log('Minifying JavaScript...');
  UglifyJS.minify(buildPath).code.to(minifiedPath)
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
  b = browserify();
  b.add('./src/socialfeed.js')
  b.bundle(function (err, src) {
    if (err) return console.error(err);
    src.to(buildPath);
    cb();
  });
}



