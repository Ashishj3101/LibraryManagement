const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'library_management_secret',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Mock authentication
    if (username === 'admin' && password === 'admin') {
        req.session.user = 'admin';
        res.redirect('/admin-dashboard');
    } else if (username === 'user' && password === 'user') {
        req.session.user = 'user';
        res.redirect('/user-dashboard');
    } else {
        res.redirect('/login');
    }
});

app.get('/admin-dashboard', (req, res) => {
    if (req.session.user !== 'admin') {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

app.get('/user-dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'views', 'user-dashboard.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.get('/chart', (req, res) => {
    // Send the flow chart or redirect to the chart
    res.sendFile(path.join(__dirname, 'public', 'flowchart.png'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  
