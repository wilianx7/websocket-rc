const express = require('express');

const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server);
const googleTTS = require('google-tts-api');

socketIO.on('connection', socket => {
    socket.on('sendText', data => {
        googleTTS(data, 'pt', 1).then(function (url) {
            socket.emit('convertedText', url);
        }).catch(function (err) {
            socket.emit('error', err);
        });
    });
});

server.listen(7777, () => {
    console.log('Server started!');
});
