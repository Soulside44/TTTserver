# TTTserver
Server for Tictactoe mobile multiplay game 
 
# How to use 

## sign up

### req

> [POST] /users/signup

Body
<pre>
{
  'username':'yourID',
  'password':'yourPassword',
  'name':'yourname'
  'email':'yourEmail'
}
</pre>
### res
#### success
<pre>
{
 '_id':'1123sdf2123s',
 'username':'yourID',
 'name':'yourName'
}
</pre>
#### fail
<pre>
{
 'message':'400 Bad Request'
}
</pre>
## sign in 

### req

### res
