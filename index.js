import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

const tweets = [];
const usuarios = [];


app.post("/sign-up", (req, res) => {
    const usuario = req.body;
    usuarios.push(usuario);
    res.send("OK");
    // console.log(usuarios);
})


app.get("/tweets", (req, res) => {
    const ultimosTweets = [];
    let img;
    if (tweets.length > 10) {
        for (let i = tweets.length - 11; i < tweets.length; i++) {
            img = usuarios.find(usuario => usuario.username === tweets[i].username);
            ultimosTweets.push({ username: tweets[i].username, avatar: img.avatar, tweet: tweets[i].tweet });
        }
        res.send(ultimosTweets);
        console.log(ultimosTweets);
    } else {
        for (let i = 0; i < tweets.length; i++) {
            img = usuarios.find(usuario => usuario.username === tweets[i].username);
            ultimosTweets.push({ username: tweets[i].username, avatar: img.avatar, tweet: tweets[i].tweet });
            console.log(ultimosTweets);
        }
        res.send(ultimosTweets);
    }
});

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    tweets.push(tweet);
    res.send("OK");
});


app.listen(5000);