const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        // validate
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        // validate
    },
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({id: this._is.toString()}, process.env.JWT_SECRET);
    this.tokens = user.tokens.concat({token});
    return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({email});
    const genericError = 'Unable to login.'

    if (!user) throw new Error(genericError);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error(genericError);

    return user;
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;