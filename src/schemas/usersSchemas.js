const joi = require('joi');

function validateSignUp(data) {

    const SignUpSchema = joi.object({

        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    });

    const validation = SignUpSchema.validate(data);
    return !validation.error;
}

function validateSignIn(data) {

    const SignInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    const validation = SignInSchema.validate(data);
    return !validation.error;
}

module.exports = {validateSignUp, validateSignIn}