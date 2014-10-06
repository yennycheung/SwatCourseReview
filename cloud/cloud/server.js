// PARSE Configuration
var Parse = require('Parse').Parse
,   appID= "lxt3Onk4IfZUqJr4CfpvS35lWxj9Q8fhsZuCJjRO"
,   javascriptKey= "7hrpll8o1nWYU1MTEwbSIZkekkZgs2qx4ab9zhZp";
Parse.initialize(appID, javascriptKey);


var campus = Parse.Object.extend("Campus");
var query = new Parse.Query(campus);

var campusData;

query.find({
        success: function(campus){
                // for(var i=0; i<campus.length; ++i){
                //   console.log(campus[i].attributes.name + " | rating: " + campus[i].attributes.avgRating)
                // }
                campusData = campus;
        }
});

// EXPRESSJS Configuration
var express = require("express")
,   bodyParser = require("body-Parser")
,   app = express()
,   port = 3000
,   currentUser;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
        extended: false
}));

app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/index.html')
})

app.get('/campus', function(req, res){
        res.json(campusData);
});

app.get('/user', function(req, res){
        res.sendFile(__dirname + '/public/user.html')
})

app.post('/user', function(req, res){
        Parse.Cloud.run("createUser", {info: req.body},{
                success: function(results){
                        res.end(JSON.stringify(results));
                },
                error: function(error){
                        res.end(JSON.stringify(error));
                }
        });
});


app.get('/user/login', function(req, res){
        res.sendFile(__dirname + '/public/login.html');
})
app.post('/user/login', function(req, res){
        Parse.Cloud.run("userLogin",{info: req.body}, {
                success: function(user){
                        res.end("Logged In as " + user.forename);
                },
                error: function(error){
                        res.end(JSON.stringify(error));
                }
        });
});

app.get('/user/info', function(req, res){
        currentUser = Parse.User.current();
        if(currentUser){
                res.send(currentUser);
        }else{
                res.send({
                        loggedIn: false
                })
        }
})

app.get('/user/logout', function(req, res){
        Parse.Cloud.run('userLogout'),{},{
                success: function(){
                        res.success("Logged Out");
                },
                error: function(){
                        res.error(error);
                }
        }
});

app.get('/search', function(req, res){
        res.sendFile(__dirname + '/public/search.html');
});

app.post('/search', function(req, res){
        Parse.Cloud.run("roomSearch", {info: req.body}, {
                success: function(results){
                        res.end(JSON.stringify(results));
                },
                error: function(error){
                        res.end(JSON.stringify(error));
                }
        });
});




app.listen(port);
