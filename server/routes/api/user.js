import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index';
const {JWT_SECRET} = config;

// Model
import User from '../../models/user';
import { async } from 'regenerator-runtime';

const router = express.Router()

// @routes GET api/user
// @dec GET all user
// @access public
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        if(!users) throw Error('No users')
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(400).json({msg: e.message})
    }
});

// @routes POST api/user
// @dec Register user
// @access public
router.post('/', async(req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({msg: "모든 필드를 입력하지 않았습니다."})
    }

    // Check for exising user
    User.findOne({email}).then((user) => {
        if (user) return res.status(400).json({msg: '이미 가입한 유저입니다.'});
        const newUser = new User({
            name, email, password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign(
                        {id: user.id},
                        JWT_SECRET,
                        {expiresIn: 3600}, // 10h 10d
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})

export default router