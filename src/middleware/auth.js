const jwt = require('jsonwebtoken');
const User = require('../mongo/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('token');
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded');
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log('user');
        console.log(user);

        if (!user) throw new Error('Could not verify jwt token');

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({error: 'Could not autheticate user'});
    }
}

module.exports = auth;