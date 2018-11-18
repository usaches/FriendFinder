var friends = require("../data/friends");
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);
        var match = req.body;
        for (var i = 0; i < 11; i++) {
            match.scores[i] = parseInt(match.scores[i]);
        }
        var o = 0;
        var finalD = 50;
        for (var i = 0; i < friends.length; i++) {
            var starter = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(match.scores[j] - friends[i].scores[j]);
                starter += difference;
            }
            if (starter < finalD) {
                o = i;
                finalD = starter;
            }
        }
        friends.push(match);
        res.json(friends[o]);
    });
};