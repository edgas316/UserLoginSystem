var express = require('express'),
    router = express.Router();
    

var User = require('../models/user');

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
            errors:errors,
            name:name,
            email:email,
            username:username,
            password:password,
            password2:password2
        })
    }else{
        var newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password,
            profileimage:profileImageName
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


module.exports = router
