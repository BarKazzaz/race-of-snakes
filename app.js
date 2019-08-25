const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

let leaderboard;
app.use((req, res, next) => {
    fs.readFile('./public/scripts/DB.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        let db = JSON.parse(data);
        leaderboard = db.leaderboard;
        next();
    });
})

app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
app.get('/dual', (req, res) => res.sendFile('dual.html', { root: __dirname }));
app.get('/co-op', (req, res) => res.sendFile('co-op.html', { root: __dirname }));
app.get('/board', (req, res) => {
    res.render('board', { title: "Race-of-Snakes: Leaderboard", leaderboard: leaderboard });
})

function updateLeaderBoard(new_leaderboard) {
    new_leaderboard = { "leaderboard": leaderboard };
    console.log(new_leaderboard);
    fs.writeFile(path.join(__dirname, '/public/scripts/DB.json'), JSON.stringify(new_leaderboard), (err) => {
        if (err) console.log(err);
        else console.log("saved!");
    });
}

app.post('/board-add', (req, res) => {
    //save the data to db.json
    //req.body should be {"name":"NAME", "score":int_score}
    let data = req.body;
    console.log(data);
    if (leaderboard.hasOwnProperty(data.name)) {
        if (leaderboard[data.name] < data.score) {
            leaderboard[data.name] = data.score;
            updateLeaderBoard(leaderboard);
            res.send("added to leaderboard!");
        }
        res.send("invalid name");
        return
    }
    for (let name in leaderboard) {
        if (data.score >= leaderboard[name]) {
            delete(leaderboard[name]);
            leaderboard[data.name] = data.score;
            updateLeaderBoard(leaderboard);
            res.send("added to leaderboard!");
            break;
        }
    }
    res.send("not high enough of a score");
})

app.post('/board-delete', (req, res) => {
    //delete from leaderboard according to key
    //req.body should be {"key":"KEY"}
    let data = req.body;
    if (leaderboard.hasOwnProperty(data.key)) {
        delete(leaderboard[data.key]);
        updateLeaderBoard(leaderboard);
        res.send("removed " + data.key + " from leaderboard");
    } else
        res.send("no such record: " + data.key);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));