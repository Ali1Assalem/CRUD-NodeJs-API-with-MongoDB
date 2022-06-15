const Joi = require("joi");


const RegisterValidation = (data) => {

    const JoiSchema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().min(5).max(50).optional(),
        password: Joi.string().min(5).max(25).required(),
        account_status: Joi.string().valid("activated").valid("unactivated").optional(),
        // date_of_birth: Joi.date() .optional(),
    });
    return JoiSchema.validate(data);
};


const LoginValidation = (data) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(5).max(50).optional(),
        password: Joi.string().min(5).max(25).required()
    });
    return JoiSchema.validate(data);
};

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;