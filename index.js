import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())

const tweets = [];
const usuarios = [];


app.post("/sign-up", (req, res) => {
    const usuario = req.body;
    if (usuario.username && usuario.avatar) {
        usuarios.push(usuario);
        // res.send("OK");
        res.status(201).send("CREATED");
    } else {
        res.sendStatus(400);
    }
});


app.get("/tweets", (req, res) => {
    const ultimosTweets = [];
    let img;
    if (tweets.length > 10) {
        for (let i = tweets.length - 10; i < tweets.length; i++) {
            img = usuarios.find(usuario => usuario.username === tweets[i].username);
            ultimosTweets.push({ username: tweets[i].username, avatar: img.avatar, tweet: tweets[i].tweet });
        }
        res.send(ultimosTweets);
    } else {
        for (let i = 0; i < tweets.length; i++) {
            img = usuarios.find(usuario => usuario.username === tweets[i].username);
            ultimosTweets.push({ username: tweets[i].username, avatar: img.avatar, tweet: tweets[i].tweet });
        }
        res.send(ultimosTweets);
    }
});

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    if ((tweet.tweet !== "") && tweet.username) {
        tweets.push(tweet);
        // res.send("OK");
        res.status(201).send("CREATED");
    } else {
        res.send("Todos os campos são obrigatórios!");
        res.sendStatus(400);
    }
});

app.get("/tweets/:USERNAME", (req, res) => {
    const usuario = req.params.USERNAME;
    let tweetsDoUsuario = tweets.filter(tweet => usuario === tweet.username);
    res.send(tweetsDoUsuario);
});

app.listen(5000);