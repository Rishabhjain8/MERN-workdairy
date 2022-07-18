const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongo();
app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

__dirname = path.resolve();
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,'/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`);
})