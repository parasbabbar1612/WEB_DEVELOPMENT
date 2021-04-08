const JOI = require('joi');
module.exports.CampgroundSchema=JOI.object({
    title:JOI.string().required(),
    image:JOI.string().required(),
    price:JOI.number().required().min(0),
    description:JOI.string().required(),
    location:JOI.string().required(),
})
