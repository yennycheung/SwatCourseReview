Parse.Cloud.job("averageRatings", function(request, status){
        var roomQuery = new Parse.Query("Room");
        roomQuery.each(function(room){
                averageRoomRating(room);
        }).then(function(){
                var floorQuery = new Parse.Query("Floor");
                floorQuery.each(function(floor){
                        averageFloorRating(floor);
                });
        }).then(function(){
                var hallQuery = new Parse.Query("Hall");
                hallQuery.each(function(hall){
                        averageHallRating(hall);
                }).then(function(){
                        status.success("Done");
                });
        });
});

/* Function: averageHallRating
Parameters: hall, an object
Produces: Void (ran for side-effect)
Purpose: Given hall, searches for rooms in that hall, averages ratings, and changes the score as it appears in the Hall object.
*/
var averageHallRating = (function(hall){
        var Floor = Parse.Object.extend("Floor");
        var floorQuery = new Parse.Query(Floor);
        floorQuery.equalTo("hall", hall);
        floorQuery.find({
                success: function(floors){
                        console.log("floorQuery.find(success)");
                        var total =0;
                        var count = 0;
                        for (var i= 0; i < floors.length; i++){
                                var roomQuery = new Parse.Query("Room");
                                // floor should be equal to the floors[i].id
                                roomQuery.equalTo("floor", floors[i]);
                                roomQuery.find({
                                        success: function(rooms){
                                                for (var i = 0; i < rooms.length; i++){
                                                        if (rooms[i].get("rating")){
                                                                total += rooms[i].get("rating");
                                                                count++;
                                                        }//  if (rooms[i].get("rating"))
                                                } // for
                                        } // success
                                });// roomQuery.find
                        } // for
                        var average = total / count;
                        console.log(hall.get("name") + " is now rated " + average);
                        hall.set("avgRating", average);
                        hall.save();
                } ,
                error: function(error){
                        console.error(error);
                }
        }); // floorQuery.find
        console.log("after spec");
}); // averageHallRating()

/* Function: averageFloorRating
Parameters: floor, an object
Produces: Void (ran for side-effect)
Purpose: Given floor, searches Room class for ratings about rooms on that floor, averages overall score, and changes the score as it appears in the Floor object.
*/
var averageFloorRating = (function(floor){
        var roomQuery = new Parse.Query("Room");
        roomQuery.equalTo("floor", floor);
        roomQuery.find({
                success: function(rooms){
                        var total =0;
                        var count = 0;
                        for (var i = 0; i < rooms.length; i++){
                                if (rooms[i].get("rating")){
                                        total += rooms[i].get("rating");
                                        count++;
                                }
                        }
                        var average = total / count;
                        floor.set("avgRating", average);
                        floor.save();
                },
                error: function(error){
                        console.error(error);
                }
        })
});

/* Function: averageRoomRating
Parameters: room, an object
Produces: Void (ran for side-effect)
Purpose: Given room, searches Review class for reviews about that room, averages overall score, and changes the score as it appears in the Room object.
*/
var averageRoomRating = (function(room){
        var reviewQuery = new Parse.Query("Review");
        reviewQuery.equalTo("room", room);
        reviewQuery.find({
                success: function(reviews){
                        if (reviews[0]){
                                var total = 0;
                                for (var i = 0; i < reviews.length; i++){
                                        total += reviews[i].get("rating");
                                }
                                var average = total/reviews.length;
                                room.set("rating", average);
                                room.save();
                        }
                }, error:function(error){
                        console.error(error);
                }
        })
});

/* Function: createUser
Parameters: Info, an object with firstName, lastName, email, graduationYear, password, and vpassword
Produces: New entry in User class
Purpose: Creates a new User.
*/
Parse.Cloud.define("createUser", function(call, res){
        var firstName = call.params.info.forename
        ,   lastName = call.params.info.surname
        ,   email = call.params.info.email
        ,   graduationYear = call.params.info.gradyear
        ,   password = call.params.info.password
        ,   vpassword = call.params.info.vpassword

        // Email Validation Regex
        //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(firstName && lastName && email && graduationYear && password == vpassword && re.test(email))){
                res.error("Incomplete");
                return;
        }


        var user = Parse.Object.extend("User")
        ,   newUser = new user();
        newUser.set("username", email);
        newUser.set("password", password);
        newUser.set("email", email);
        newUser.set("forename", firstName);
        newUser.set("surname", lastName);
        newUser.set("gradyear", graduationYear);
        newUser.save(null, {
                success: function(newUser){
                        res.success(newUser);
                },
                error: function(error){
                        res.error(error);
                }
        })
});

Parse.Cloud.define("userLogin", function(call, res){
        Parse.User.logIn(call.params.info.email, call.params.info.password, {
                success: function(user){
                        currentUser = Parse.User.current();
                        res.success(currentUser);
                },
                error: function(user, error){
                        res.error(error);
                }
        });
});

Parse.Cloud.define("userLogout", function(call, res){
        Parse.User.logOut();
        res.success();
});

Parse.Cloud.define("roomSearch", function(call, res){
        var info = call.params.info;

        if (info.room){
                var roomQuery = new Parse.Query("Room");
                roomQuery.equalTo("number", parseInt(info.room));
                roomQuery.find({
                        success :function(rooms){
                                res.success(rooms);
                                return;
                        },
                        error: function(error){
                                res.error(error);
                                return;
                        }
                })
        }
        else {
                var arraysArray = [];
                var roomQuery = new Parse.Query("Room");
                roomQuery.limit(1000);
                if (info.type){
                        roomQuery.equalTo("type", info.type);
                }
                if (info.specialAttributes){
                        roomQuery.containsAll("specialAttributes", info.specialAttributes);
                }
                roomQuery.find({
                        success: function(rooms){
                          var hallList = [];
                          arraysArray.push(rooms);
                          if(info.Ac){
                            hallList.push("AC")
                          }
                          if(info.laundry){
                            hallList.push("Laundry");
                          }
                          if(info.printer){
                            hallList.push("Printer");
                          }
                          if(info.subfree){
                            hallList.push("SubstanceFree");
                          }
                          if (hallList.length>0){
                                  var hallQuery = new Parse.Query("Hall");
                                  hallQuery.containsAll("specialAttributes", hallList);

                                  hallQuery.find({
                                          success: function(halls){
                                                  arraysArray.push(halls);
                                          }, error:function(error){
                                                  res.error(error);
                                          }
                                  })

                          }else{
                            // This means that the user didn't select any checkboxes

                          }
                        },
                        error: function(error){
                                res.error(error);
                        }
                }).then(function(){
                        res.success(arraysArray);
                })
        }
})

// http://www.falsepositives.com/index.php/2009/12/01/javascript-function-to-get-the-intersect-of-2-arrays/
function intersect(arr1, arr2) {
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
                o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
                v = arr1[i];
                if (v in o) {
                        r.push(v);
                }
        }
        return r;
}
