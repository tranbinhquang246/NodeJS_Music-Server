var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var UserModel = require('../model/userSchema');
const md5 = require('md5');


router.post('/signin', async function(req, res) {
    if(!req.body.email){
        res.status(200).send("Failed because the email is already registered");
    }else{
        var newUser = new UserModel();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.password = md5(req.body.password);
        newUser.favorite = req.body.favorite[0];
        const saveuser = await newUser.save();
        res.status(200).send("Added sucessfully");
    }
});

router.get('/login', async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var datauser = await UserModel.findOne({ email: email});
    if(datauser.password === md5(password)) {
        res.status(200).send("Succesfully");
    }else{
        res.status(200).send("Failled");
    }
 });

router.get('/getall', async function(req, res) {
    var dataAll = await UserModel.find();
    res.send(dataAll)
 });

router.get('/getuser', async function(req, res) {
    var email = req.body.email;
    var datauser = await UserModel.findOne({ email: email});
    res.send(datauser);
 })

router.delete('/deleteuser', async function(req, res) {
    var email = req.body.email;
    var datauser = await UserModel.remove({ email: email});
    res.send("Delete Susscess")
 })

router.post('/addfavmusic', async function(req, res) {
    var favorite = req.body.favorite[0];
    var email = req.body.email;
    await UserModel.findOne({ email: email}, function(err, user) {
        user.favorite.push(favorite);
        user.save(function(err, user) {
            if(err) throw err;
            res.send('Insert Successfully')
        })
    }).clone().catch(function(err) {console.log(err)})
 })

module.exports = router;
