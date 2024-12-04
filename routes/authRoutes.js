const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();


// render index.ejs / Dashboard
router.get('/', checkAuth, async (req,res) => {

    try { 
        res.render('index.ejs', {
            name: req.user.name,
            
        })
    }catch (err) {
        console.error('Error loading dashboard', err)
        res.status(500).send('Error 500');
    }
})


// Render login page
router.get('/login', checkNotAuth, (req, res) => {
    res.render('login.ejs');
});

// Handle login form submission
router.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

// Render register page
router.get('/register', checkNotAuth, (req, res) => {
    res.render('register.ejs');
});

// Handle register form submission
router.post('/register', checkNotAuth, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/login');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Logout failed! Please try again...');
        }
        res.redirect('/login');
    });
});

// Check authentication
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Check if already authenticated (to prevent logged-in users from visiting login/register)
function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = router;
