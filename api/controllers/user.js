const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

async function register(req, res) {
    try {
      const data = req.body;
  
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  
      data["password_hash"] = await bcrypt.hash(data.password_hash, salt);
      console.log(data)
      const result = await User.create(data);
  
      res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try{

    } catch (err){
        res.status(404).json({error: err.message})
    }
}

module.exports = { register }