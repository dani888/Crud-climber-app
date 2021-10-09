module.exports = function (req, res, next) {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/sessions/new');
    } 
    next(); // user is authenticated, keep moving on to the next step
}