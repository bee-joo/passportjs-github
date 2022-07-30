import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

import path from 'path';

import passport from 'passport'
import GitHubStrategy from 'passport-github2';

const app = express();
const __dirname = path.resolve();

mongoose.connect(`mongodb+srv://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}`) // configure your MongoDB connection

const Schema = mongoose.Schema;
const UserSchema = new Schema({ githubId: Number});
UserSchema.plugin(findOrCreate);
let User = mongoose.model('User', UserSchema);

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://githubpassportjs.danilabukin.repl.co/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(err, user);
        });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(session({ secret: "supersecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const isAuth = (req, res, next)=> {
    if (req.isAuthenticated()) return next();
    res.redirect('/sorry');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sorry', (req, res) => {
    res.sendFile(path.join(__dirname, 'sorry.html'));
});

app.get('/private', isAuth, (req, res) => {
    res.send(`Hello! Your GitHub ID is ${req.user.githubId}!`);
});

app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/sorry' }),
    function(req, res) {
        res.redirect('/private');
    });

app.listen(process.env.PORT || 3000);