import Joi from 'joi';

const notesSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().required(),
})

export default { notesSchema };