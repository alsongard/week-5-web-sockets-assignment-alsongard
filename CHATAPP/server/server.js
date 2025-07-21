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
const jwt = require("jsonwebtoken");

app.use(express.json());
const corOptions = {
    origin: "*"
}
app.use(cors(corOptions));
const saltRound = 10;


const io = new Server(httpServer,{
    cors:
    {
        origin:"*",
        methods: ["POST", "GET"]
    }
});
const msgArray=[]
io.on("connection",  (socket)=>{
    console.log(`SocketId ${socket.id}`);
    // first messages : welcoming messages to the user:
    const socketIdAbbrev = socket.id.slice(0,5)
    socket.emit('welcomeMsg',socketIdAbbrev  )


    // notify other users of logging in
    io.emit('userEntered',socket.id.slice(0,5));





    // get all messages
    
    socket.on("receiveMsg",  (data)=>{ //listening for receiveMsg event from front-end
        console.log(`socket.id for msg blw: ${socket.id}`)
        console.log(data);
        const msgDetails = {user_id: socket.id.slice(0, 5), msg:data.userMsg}
        msgArray.push(msgDetails);
        setInterval(()=>{
            io.emit('allMsgs',msgArray);
        }, 10000)
    }
    )
    
    // console.log(`On receiveMsg event: ${data}`);
    socket.on("disconnect", (socket)=>{
        console.log(`User ${socket.id} has been disconnected! `);
    });

    socket.on("connect_error", (err)=>{
        console.log(`Error : ${err}`)
    })
})

app.get("/", (req,res)=>{
    res.send("<h1>Listening on port 5000</h1>")
})

app.post("/register", async (req, res)=>{ // working successfully
    console.log(req.body) //working successfully
    try
    {
        const {username, password} = req.body;
        // try and find User in the model
        const result = await User.find({username: username});
        if (result.length == 0)
        {
            const userPassHash = await bcrypt.hash(password, saltRound) // working=successfully
            const user_created = await User.create({username:username, password:userPassHash});
            return res.status(200).json({success:true, msg:"User created successfully"})
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
        // console.log(userFound); //testing:working==successfully
        // console.log(typeof(userFound)) // testing:object
        if (userFound)
        {
            // console.log('checkign password match');
            const result =  await bcrypt.compare(password,userFound.password);
            const userObject = {id:userFound._id}
            const token = jwt.sign(userObject, process.env.JWT_SECRET)
            console.log(result);
            return res.status(200).json({success:true, tokenGen:token, id:userFound._id});
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

httpServer.listen(process.env.PORT_NUMBER, ()=>{console.log("listening on http://localhost:5000")})