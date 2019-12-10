var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
//회원가입
router.post('/signup', function(req, res, next){
  var body = req.body;
  var username = body.username;
  var password = body.password;
  var email = body.email;
  var name = body.name;
  var database = req.app.get("database");
  
  if(database == undefined)
  {
    res.json({message:'503 Server error'});
    return;
  }
  var validate = userValidation(username, password);
  if(validate == false)
  {
    res.json({message:'400 Bad Request'});
  }
  var users = database.collection("users");
  //유저네임이 존재 하는지 미리 확인해야함, 존재 하지 않아야만 자료를 넣을 수 있다. 
  users.count({ 'username': username }, function (err, result) {
    if (err) throw err;
    if (result > 0) {
      res.json({ message: '400 Bad Request' });
      return;
    }
    else {
      users.insertOne({ "username": username, "password": password, "email": email, "name": name }, function (err, result) {
        if (err) throw err;
        if (result.ops.length > 0)
          res.json(result.ops[0]);
        else
          res.json({ message: "503 Server error" });
      });
    }
  });
});
/*로그인*/
router.post('/signin', function(req, res, next){

 var userinfo = req.body;
 var username = userinfo.username;
 var password = userinfo.password;
 var database = req.app.get("database");
 var users = database.collection("users");

 users.findOne({"username": username, "password": password},{projection: {_id:1, email:1, name:1}}, function(err, user){

  if(err) res.status(500).json({error:err});
  else if(user==null) res.send("아이디와 비밀번호를 확인하세요.");
  else res.json(user);
  //res.send("환영합니다. "+ username +"님" + user); //

 });
});

var userValidation = function (username, password) {
  if (username == "" || password == "") {
    return false;
  }
  if (username.length < 4 || username.length > 12) {
    return false;
  }
  if (password.length < 4 || password.length > 12) {
    return false;
  }
  return true;
}
module.exports = router;
