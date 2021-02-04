const Course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({
            slug: req.params.slug, //slug là attribute ở trong mongodb
            // _id: req.params.slug: _id là attribute ở trong mongodb
        })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //[GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] courses/store
    store(req, res, next) {
        const formData = req.body;

        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {});
        // res.send('Success');
    }
}
module.exports = new CourseController();