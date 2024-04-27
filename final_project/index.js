const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if(req.session.authorization){
        token = req.session.authorization['accessToken'];
        jwt.verify(token, "access", (err, user) => { //Use JWT to verify token
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
         });
     } else {
         return res.status(403).json({message: "User not logged in"})
     }
 
//Write the authenication mechanism here
});
 
const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use('/static', express.static('public'));

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));