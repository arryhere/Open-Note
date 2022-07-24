import Joi from 'joi';

const notesSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export default { notesSchema };