({
    appDir: "../",
    baseUrl: "scripts/",
    dir: "../../dist",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    // optimize: "none",

    paths: {
        "jquery": "empty:",
        'socialfeed': '../../../../socialfeed'
    },
    
    modules: [
        //Optimize the application files. jQuery is not 
        //included since it is already in require-jquery.js
        {
            name: "main"
        }
    ]
})
