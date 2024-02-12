const User = require("../models/user-model");
const bcrypt = require('bcrypt');

const home =async(req, res)=> {
    try{
        res.status(200).send("Welcome to controller mern series")
    } catch(error){
        console.log(error)
    }
}

const register =async(req, res)=> {
    try{
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email: email});

        if (userExist) {
            return res.status(400).json({message:"User already exists"});
        }

        const saltRound= 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({ username, email, phone, password:hash_password})

        res.status(201).json({
            msg: userCreated,
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        })
    } catch(error){
        res.status(500).json({msg:"Error Welcome to controller register"})
    }
}

const login = async(req,res) => {
    try{
        const {email, password}= req.body;
        const user =await User.findOne({email:email});
        if(!user) return res.status(400).json({message:'Invalid User'})
        const validPass= await bcrypt.compare(password, user.password)
        if (!validPass) return res.status(400).json({message:'Invalid Password'})
        res.status(200).json({
            token: await user.generateToken(),
            userId: user._id.toString(),
            message: "Login Successful"
        });
    }catch(error){
        console.log(error)
    }
}

//Get user data logic
const user = async(req,res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData})
    } catch(error) {
        console.log("error of user controller", error)
    }
}


module.exports = {home, register, login, user};