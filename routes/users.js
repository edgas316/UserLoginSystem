var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        'title':'Register'
    })
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        'title':'Login'
    })
});

router.post('/register', function(req, res, next){
    //get form values
    var name = req.body.name,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        password2 = req.body.password2;

    // Check for image field
    if(req.body.profileimage){
        console.log('Uploading File...')

        // file info
        var profileImageOriginalName    = req.files.profileimage.originalname,
            profileImageName            = req.files.profileimage.name,
            profileImageMime            = req.files.profileimage.mimetype,
            profileImagePath            = req.files.profileimage.path,
            profileImageExt             = req.files.profileimage.extension,
            profileImageSize            = req.files.profileimage.size    
    } else {
        // Set a Default image
        var profileImageName = 'noimage.png'
    }

    // form validation
    req.checkBody('name','Name Field is Required').notEmpty()
    req.checkBody('email','Email Field is Required').notEmpty()
    req.checkBody('email','Email not Valid').isEmail()
    req.checkBody('username','Username Field is Required').notEmpty()
    req.checkBody('password','Password Field is Required').notEmpty()
    req.checkBody('password2','Passwords do not match').equals(req.body.password)
    
    // Check for errors
    var errors = req.validationErrors(true)
    
    if(errors){
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        })
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileimage: profileImageName
        })
        
        // Create User
        User.createUser(newUser, function(err, user){
            if(err) throw err
            console.log(user)
        })
        
        // Success Message
        req.flash('success', 'You are noe registered and may log in')
        
        res.location('/')
        res.redirect('/')
    }
})

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
    function(username, password, done){
        User.getUserByUsername(username, function(err, user){
            if(err) throw err
            if(!user) {
                console.log('Unknown User')
                return done(null, false, {message:'Unknown User'})
            }
            
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err
                if(isMatch){
                    return done(null, user)
                } else {
                    console.log('Invalid Password')
                    return done(null, false, {message:'Invalid Password'})
                }
            })
        })
    }
))

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash:'Invalid username or password'}), function(req,res){
    console.log('Authentication Successful')
    req.flash('success', 'You are Logged In')
    res.redirect('/')
})

router.get('/logout',function(req,res){
    req.logout()
    req.flash('success', 'You have logged out')
    res.redirect('/users/login')
})

module.exports = router