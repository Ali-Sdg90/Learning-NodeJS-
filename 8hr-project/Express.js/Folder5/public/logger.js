const middleware = (req, res, next) => {
    console.log(req.method, req.url, "HI :)");

    next();
};

module.exports = middleware;
