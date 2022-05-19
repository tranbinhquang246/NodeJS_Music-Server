const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

// const addUser = require('./modules/addUser');
const userRoute = require('./api/user_api')

dotenv.config();
app.use(bodyParser.json());

mongoose.connect((process.env.MONGO_URL), () => {
    console.log("Connected to MongoDB")
});

app.use('/user',userRoute);

// app.post('/user', async function(req, res) {
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var email = req.body.email;
//     var password = req.body.password;
//     try{
//         await addUser(firstName, lastName, email, password, client);
//         res.status(200).json(req.body);
//     }catch(err){
//         res.status(200).json(err);
//     }
// })


const PORT = 3000;
app.listen(PORT, () => console.log(`Server starting in ${PORT}`));