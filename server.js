const request = require('request');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist', {index: 'demo.html', maxage: '4h'}));
app.use(bodyParser.json());

const sessions = {}

// handle admin Telegram messages
app.post('/hook', function(req, res){
    try {
        const message = req.body.message || req.body.channel_post;
        const chatId = message.chat.id;
        let name = message.from.first_name || message.chat.first_name || 'Support';
        const text = message.text || '';
        const reply = message.reply_to_message;

        console.log(JSON.stringify(req.body))

        if (/adriaan/gi.test(name)) name = 'Adriaan'

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
            const socketId = sessions[userId]
            io.to(socketId).emit(chatId + '-' + userId, { name, text, from: 'admin' });
        } else if (text) {
            // io.emit(chatId, {name, text, from: 'admin'});
        }
    } catch (e) {
        console.error('hook error', e, req.body);
    }
    res.statusCode = 200;
    res.end();
});

console.log('0=> hi')

// handle chat visitors websocket messages
io.on('connection', function(socket){
    // console.log('on connection')

    socket.on('register', function(registerMsg){
        console.log('on register')
        let userId = registerMsg.userId;
        let chatId = registerMsg.chatId;
        let messageReceived = false;
        // console.log('useId ' + userId + ': connected to chatId ' + chatId);
        // sendTelegramMessage(chatId, `${userId}: connected`);

        sessions[userId] = socket.id

        socket.on('message', function(msg) {
            // console.log('on message', msg)
            messageReceived = true;
            // if (msg.from !== 'bot') io.emit(chatId + '-' + userId, msg);
            if (msg.from !== 'bot') io.to(socket.id).emit(chatId + '-' + userId, msg);
            sendTelegramMessage(chatId, `${userId}: ${msg.text}`);
        });

        socket.on('disconnect', function(){
            // console.log('on disconnect')
            if (messageReceived) {
                sendTelegramMessage(chatId, `${userId} has left`, null, true);
            }
            delete sessions[userId]
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

    console.log(data)

    request
        .post('https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage')
        .form(data)
        .on('error', function(err) {
            console.error(err)
        })
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
