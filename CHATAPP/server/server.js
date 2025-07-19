const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const httpServer = require("node:http").createServer(app);
const {Server} = require("socket.io");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Message = require("./models/message.model")


app.use(express.json());
app.use(cors());
const saltRound = 10;


const io = new Server(httpServer, (socket)=>{
    console.log(socket.id);

    // create a user
})

app.get("/", (req,res)=>{
    res.send("<h1>Listening on port 5000</h1>")
})

app.post("/register", async (req, res)=>{ // working successfully
    // console.log(req.body)working successfully
    try
    {
        const {username, password} = req.body;
        // try and find User in the model
        const result = await User.find({username: username});
        if (result.length == 0)
        {
            const userPassHash = await bcrypt.hash(password, saltRound) // working=successfully
            const user_created = await User.create({username:username, password:userPassHash});
            return res.status(200).json({success:true, data:user_created})
        }
        return res.status(200).json({success:false, msg:"User already found!"})

    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(409).json({success:false, msg:'Server Error'})
    }
})

app.post("/login",async (req, res)=>{ // working successfully
    try
    {
        const {username, password} = req.body;
        const userFound = await User.findOne({username:username})
        console.log(userFound); //testing:working==successfully
        console.log(typeof(userFound)) // testing:object
        if (userFound)
        {
            console.log('checkign password match');
            const result =  await bcrypt.compare(password,userFound.password);
            console.log(result);
            return res.status(200).json({success:true, msg:'Success'});

        }
        else
        {
            return res.status(400).json({success:false, msg:'Invalid credentials'})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:'Server Error'})
    }
})

// messages
app.post("/message", async (req,res)=>{ // working successfully
    const {message, user_id} = req.body;
    try
    {
        const msg = await Message.create({message:message, user_id:user_id});
        console.log(msg)
        if (msg)
        {
            return res.status(200).json({success:true, msg:msg});
        }
        else
        {
            return res.status(400).json({success:false, msg:'Client Error'});
        }
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return res.status(500).json({success:false, msg:"Sever Error"})
    }

});
app.get("/messages", async (req, res)=>{
    try
    {
        const messages = await Message.find(); // get all messages
        if (messages)
        {
            return res.status(200).json({success:true, data:messages})
        }   
        return res.status(500).json({success:false, msg:'Server Error'})
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
    }
});


const user=process.env.MONGO_USR;
const pass=process.env.MONGO_SCRT;


mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.glhr3fw.mongodb.net/MessageAPP?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((error)=>{
        {
            console.log(`Error : ${error}`);
            process.exit(1)
        }
    })
    

// console.log(process.env.PORT_NUMBER) testing:working successfully

app.listen(process.env.PORT_NUMBER, ()=>{console.log("listening on http://localhost:5000")})