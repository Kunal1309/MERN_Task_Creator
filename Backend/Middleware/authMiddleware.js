import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import {User} from '../Models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error ('You are not authorised');
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorised, no token')
    }
});

export default protect;