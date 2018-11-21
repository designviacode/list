const mongoose = require('mongoose');
const User = mongoose.model('User');
const {
    promisify
} = require("es6-promisify");
const async = require("async");

exports.createAccountForm = async (req, res, next) => {
    console.log(req.body);
    res.render('createAccount', {

    });
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);

        res.render('register', {
            body: req.body
        });
        return;
    }
    next();
};

exports.registerForm = (req, res) => {
    res.render('register', {});
}


exports.register = async (req, res, next) => {
    const user = new User({
        name: req.body.name,

        email: req.body.email
    });

    // await user.setPassword(req.body.password);
    console.log(user);
    // const register = promisify(User.register, User);
    await User.register(user, req.body.password);
    // await user.save();

    next();
}



// const { user } = await DefaultUser.authenticate()('user', 'password');

// exports.register = async (req, res, next) => {



//     const user = new User.register({
//         name: req.body.name,
//         id: req.body.id,
//         email: req.body.email
//     });

//     // const user = await User.register('username', 'password');
//     await user.save();

//     // user.save();
//     // this method.register is coming from passport - local - mongoose
//     // const register = promisify(User.register, User);
//     // await register(user, req.body.password);
//     // await User.register(newUser, req.body.password)
//     next();

// }


exports.loginForm = (req, res) => {
    res.render('login');
}