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
  
      res.status(201).send("User successfully created");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    const data = req.body
    try{
        const user = await User.getOneByUsername(data.username);
        if(!user){
            throw new Error('No user with this username')
        }
        const match = await bcrypt.compare(data.password_hash, user.password_hash)

        if (match) {
            const payload = { username: user.username}
            const sendToken = (err, token) => {
                if(err){
                    throw new Error('Error when generating token')
                }
                res.status(200).json({
                    success: true,
                    token: token
                });
            }

            jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

        } else{
            throw new Error('User could not be authenticated')
        }
    } catch (err){
        res.status(404).json({error: err.message})
    }
}

module.exports = { register, login }