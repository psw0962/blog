import express from 'express';
import brcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import config from '../../config/index';

const {JWT_SECRET} = config;

// Model
import User from '../../models/user';
import { isMatch } from 'lodash';

const router = express.Router();

// @route POST api/auth
// @desc Auth user
// @access Pubilc
router.post('/', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({msg: '모든 필드를 입력하세요'})
    }

    User.findOne({email}).then((user) => {
        if(!user) return res.status(400).json({msg: '유저가 존재하지 않습니다.'})

        brcypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch) return res.status(400).json({msg: '비밀번호가 일치하지 않습니다.'})

            jwt.sign({id:user.id}, JWT_SECRET, {expiresIn: '2 days'}, (err, token) => {
                if(err) throw err

                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                })
            })
        })
    })
})

// 로그아웃은 프론트에서 상태처리
router.post('/logout', (req, res) => {
    res.json('로그아웃 성공')
})

router.get('/user', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if(!user) throw Error('유저가 존재하지 않습니다.');

        res.json(user);
    } catch(e) {
        console.log(e)
        res.status(400).json({msg:e.message})
    }
})

export default router