"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
// EJS Middleware
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('/home', (req, res) => {
    res.redirect('/');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.use('/api/', require(path.join(__dirname, 'routes', 'api')));
app.use('/util/', require(path.join(__dirname, 'routes', 'util')));
app.disable('etag');
app.get('/home', (req, res) => res.redirect('/'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
exports.default = app;
