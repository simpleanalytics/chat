const request = require('request');
// const compression = require('compression');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist', {index: 'demo.html', maxage: '4h'}));
app.use(bodyParser.json());

// handle admin Telegram messages
app.post('/hook', function(req, res){
    try {
        const message = req.body.message || req.body.channel_post;
        const chatId = message.chat.id;
        const name = message.chat.first_name || 'Adriaan';
        const text = message.text || '';
        const reply = message.reply_to_message;

        if (text.startsWith('/start')) {
            // console.log('/start chatId ' + chatId);
            sendTelegramMessage(chatId,
                '*Welcome to Intergram* \n' +
                'Your unique chat id is `' + chatId + '`\n' +
                'Use it to link between the embedded chat and this telegram chat',
                'Markdown');
        } else if (reply) {
            let replyText = reply.text || '';
            let userId = replyText.split(':')[0];
            io.emit(chatId + '-' + userId, {name, text, from: 'admin'});
        } else if (text){
            io.emit(chatId, {name, text, from: 'admin'});
        }

    } catch (e) {
        console.error('hook error', e, req.body);
    }
    res.statusCode = 200;
    res.end();
});

// handle chat visitors websocket messages
io.on('connection', function(client){
    // console.log('on connection')

    client.on('register', function(registerMsg){
        console.log('on register')
        let userId = registerMsg.userId;
        let chatId = registerMsg.chatId;
        let messageReceived = false;
        // console.log('useId ' + userId + ': connected to chatId ' + chatId);
        sendTelegramMessage(chatId, userId + ': connected');

        client.on('message', function(msg) {
            // console.log('on message', msg)
            messageReceived = true;
            io.emit(chatId + '-' + userId, msg);
            sendTelegramMessage(chatId, userId + ':' + msg.text);
        });

        client.on('disconnect', function(){
            // console.log('on disconnect')
            if (messageReceived) {
                sendTelegramMessage(chatId, userId + ' has left', null, true);
            }
        });
    });

});

function sendTelegramMessage(chatId, text, parseMode, disableNotification = false) {
    const data = {
        disable_notification: disableNotification,
        chat_id: chatId,
        text
    }
    if (parseMode) data.parse_mode = parseMode

    request
        .post('https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage')
        .form(data);
}

app.post('/usage-start', cors(), function(req, res) {
    console.log('usage from', req.query.host);
    res.statusCode = 200;
    res.end();
});

// left here until the cache expires
app.post('/usage-end', cors(), function(req, res) {
    res.statusCode = 200;
    res.end();
});

http.listen(process.env.PORT || 3001, function(){
    console.log('listening on port:' + (process.env.PORT || 3001));
});

// app.get('/.well-known/acme-challenge/:content', (req, res) => {
//     res.send(process.env.CERTBOT_RESPONSE);
// });
