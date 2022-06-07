const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
Joi.objectId = require('joi-objectid')(Joi);
const pagination = require("mongoose-paginate-v2")

const UserSchema = mongoose.Schema({
   firstName: {
       type: String,
       required: [true, 'First Name is required'],
       minlength: 3,
   },
   lastName: {
       type: String,
   },
   username: {
       type: String
   },
   email: {
       type: String,
       required: [true, 'Email address is required'],
       trim: true,
       unique: true,
   },
   phone: {
    type: String,
   },
   password: {
       type: String,
       required: true,
       minlength: 5,
   },
   isAdmin:{
       type: Boolean,
       default: false,
   }
},{
    timestamps: true,
});

UserSchema.plugin(pagination)
exports.User = mongoose.model("User", UserSchema);

exports.validateUser = function (user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        isAdmin: Joi.boolean(),
        username: Joi.string(),
        phone: Joi.string(),
    })
    return schema.validate(user);
}

exports.validateLogin = function (user) {
    const schema = Joi.object({
        email: Joi.string().email(),
        username: Joi.string(),
        phone: Joi.string(),
        password: Joi.string().min(3),
    })
    return schema.validate(user);
}


exports.generateToken = async (user) => {
    const token = jwt.sign({
        userId: user._id,
        firstName: user.fname,
        lastName: user.lname,
        email: user.email,
        isAdmin: user.isAdmin,
        username: user.username,
        phone: user.phone,
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '12h' }
    )
    return token;

}