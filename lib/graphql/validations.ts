const Joi = require('joi');

export const profileSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(12)
        .required(),
    name: Joi.string()
        .min(3)
        .max(12),
    bio: Joi.string()
        .max(50)
}).unknown()

export const postSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required(),
    tags: Joi.Array().items(Joi.string()),
    description: Joi.string()
        .max(250)
}).unknown()

export const commentSchema = Joi.object({
    body: Joi.string()
    .min(10)
    .max(250)
}).unknown()