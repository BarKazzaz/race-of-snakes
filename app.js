const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// app.set('views', path.join(__dirname, "views"));
// app.set('view iengine', 'html');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));