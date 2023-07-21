const {Schema, model} = require("mongoose");
const Joi = require("joi");


const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: subscriptionTypes,
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
      }, {versionKey: false, timestamps: true}
);


const registerSchema = Joi.object({
 
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .equal(...subscriptionTypes)
    .required(),
    
});


const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
}


const User = model("user", userSchema);

module.exports = {
    User,
    schemas
}