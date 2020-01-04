module.exports = (req, res, next) => {
    if (req.user.permission == 2) {
        return next();
    }
    res.send('You are not admin')
}