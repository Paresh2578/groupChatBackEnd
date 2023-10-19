const express = require('express');
const cors = require('cors')

const UserRouter = express.Router();
UserRouter.use(cors());
UserRouter.use(express.json());



//model
const User = require('../db/model/userModel');



UserRouter.post('/register' , async(req , resp)=>{
     try{
        let data =  new User(req.body);
        let result = await data.save();
        resp.send(result);
     }catch(error){
        resp.send({status : "error"});
     }
})

UserRouter.get('/user', async(req, resp) => {
   try{
    let result =await User.find();
     resp.send(result);
   }catch(error){
    resp.send({status : "error"});
   }
});

UserRouter.get('/loggedInUser', async(req, resp) => {
   try{
      const email = req.query.email;
    let result =(await User.findOne({email : email}));
   //  let result =await User.find({email : email})
    resp.send(result);
   }catch(error){
    resp.send({status : "error"});
   }
});


UserRouter.patch('/profileEdit/:email', async(req, resp) => {
   try{
       let result = await User.updateOne(
         {email : req.params.email},
         {$set : req.body}
         )
    resp.send(result);
   }catch(error){
    resp.send({status : "error"});
   }
});

UserRouter.get('/userFind/:email' , async(req , resp)=>{
   try{
      let result = await User.find({email : req.params.email});
      resp.send(result);
   }catch(error){
      resp.send({status:"error"});
   }
})

UserRouter.get('/checkUser/:email/:password' , async(req , resp)=>{
   try{
      let result = await User.find({email : req.params.email , password : req.params.password});
      resp.send(result);
   }catch(error){
      resp.send({status:"error"});
   }
})



module.exports = UserRouter;

