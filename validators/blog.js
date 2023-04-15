const validator = require('../helpers/validate');
const blog = async (req, res, next) => {
    const validationRule = {
        "title": ["required", "min:5", 'max:50',"regex:/^[a-zA-Z ]*$/"],
        "description": ["required", 'max:500'],  
        "main_image": ["required", 'max:1024'],
        "additional_images.*": ['max:5' ,'size:1024'],
        "date_time": ["required", 'numeric']

    };
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.send({
                success: true,
                message: "validation error",
                data: err.errors
            });
           
        } else {
            next();
        }   
    }).catch(err => console.log(err))
}
module.exports = blog;