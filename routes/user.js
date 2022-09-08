const express = require('express');
const userRoutes = express.Router();
const  { 
    form,
    usersearch,
    userlogin,
    userregister,
    loginprocess,
    userprofile,
    userlist,
    userlogout,
    userdelete,
    useredit,
    userupdate,
    searchuser
   
} = require('../controllers/userController.js');

userRoutes.get('/form', form);
userRoutes.get('/usersearch', usersearch);
userRoutes.get('/userlogin', userlogin);
userRoutes.get('/userregister', userregister);
userRoutes.post('/loginprocess', loginprocess);
userRoutes.get('/userprofile', userprofile);
userRoutes.get('/userlist', userlist);
userRoutes.get('/userlogout', userlogout);
userRoutes.get('/userdelete', userdelete);
userRoutes.get('/useredit',useredit);
userRoutes.post('/userupdate', userupdate);
userRoutes.get('/searchuser',searchuser);

module.exports = userRoutes;