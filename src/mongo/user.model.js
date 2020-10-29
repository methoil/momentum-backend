const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
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
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
});

userSchema.virtual('habits', {
    ref: 'Habit',
    localField: '_id',
    foreignField: 'owner',
});

// automatically gets called when returning the user object as it's converted to JSON
userSchema.methods.toJSON = function() {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({token});
    await this.save();
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