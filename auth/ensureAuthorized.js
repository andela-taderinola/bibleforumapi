
module.exports = function ensureAuthorized(request, response, next) {
    var bearerToken;
    var bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    } else {
        response.sendStatus(403);
    }
};