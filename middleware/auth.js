const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) =>{
    try{
        const token = req.header('Authorization');
        const user = jwt.verify(token, '9031278576kash159');
        const UserId = user.userId;
        // console.log('userid>>>',UserId)
        User.findOne({_id: UserId}).then(user => {
            req.user = user;
            next()
        })
        .catch(err =>{
            throw new Error(err)
        })
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    authenticate
}