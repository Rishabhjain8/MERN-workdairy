const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a User using: POST "/api/auth/signup". No login required
router.post('/signup', [
    body('name','Enter a valid name of length 3').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a strong password of minimum 8 length').isLength({min: 8})
    ],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Sorry! a user with email-id already exists"});
        }
        try{
            let success = false;
            const salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({errors: errors.array()})
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // .then(user => res.json(user))
            // .catch(err => console.log(err),
            // res.json({error: 'Please enter an unique value for email', message: err.msg}))
            success = true;
            res.json({success, authToken});
        }
        catch(err){
            console.log(err.msg);
            res.status(500).send("Some error occured");
        }
        
    }
)

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let success = false;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Please try to login with correct credentials'});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken});
    }
    catch(err){
        console.log(err.msg);
        res.status(500).send("Some error occured");
    }
})

router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      let userEmail = req.user.email;
      const user = await User.findOne(userEmail).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;