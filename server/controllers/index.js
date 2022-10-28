export function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home Page - MidTerm for Tarik Obeidi - 301252585', page: 'home' });
}