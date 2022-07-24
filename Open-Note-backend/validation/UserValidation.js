import Joi from 'joi';

const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).max(100).required(),
    confirmPassword: Joi.ref('password')
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export default { signupSchema, loginSchema };