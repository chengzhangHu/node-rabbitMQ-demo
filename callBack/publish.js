const amqplib = require("amqplib/callback_api");
amqplib.connect('amqp://localhost:5672',(err,conn) => {
    if(err){
        console.error(err);
        return;
    }
    sendMsg(conn);
});

const topic = 'message';

function sendMsg(conn){
    conn.createChannel((err,ch) => {
        if(err){return;}
        ch.assertQueue(topic);
        ch.sendToQueue(topic,Buffer.from('hello world ,this is from rabbitmq'));
    })
}

