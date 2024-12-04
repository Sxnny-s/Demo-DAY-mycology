if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();  
}

const User = require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const app = express();
const initPassport = require('./config/passport');

const authRoutes = require('./routes/authRoutes');  // Import the authRoutes
const inventoryRoutes = require('./routes/inventoryRoutes');


// Authentication Check Middleware
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

// Initialize Passport
initPassport(
    passport,
    email => User.findOne({ email }),
    id => User.findById(id)
);

// Middleware
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));  
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// MongoDB connection
mongoose.connect(process.env.url, { useUnifiedTopology: true })
    .then(() => console.log('Database Connected...'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use authentication routes
app.use(authRoutes);  

// Inventory routes 
app.use('/inventory',checkAuth, inventoryRoutes)


// Start the server
const PORT = 8888;
app.listen(PORT, () => {
    console.log(`BIG MUSHROOM SERVER LIVE! http://localhost:${PORT}`);
});
