const logApi = (req, res, next) => {
    console.log("URL >> ", req.url);
    next();
};

module.exports = logApi;
