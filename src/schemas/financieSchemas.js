const joi = require('joi');

function validatePostFinancie(data) {

    const financieSchema = joi.object({

        value: joi.number().required(),
        description: joi.string().required(),
        type: joi.valid('in', 'out').required()
    });

    const validation = financieSchema.validate(data);
    return !validation.error;
}

module.exports = {validatePostFinancie}
