const amqplib = require("amqplib/callback_api");
amqplib.connect('amqp://localhost:5672',(err,conn) => {
    if(err){
        console.error(err);
        return;
    }
    receiveMsg(conn);
});

const topic = 'message';
function receiveMsg(conn){
    conn.createChannel((err,ch) => {
        if(err){
            console.error("receive msg error",err);
            return;
        }
        ch.assertQueue(topic);
        ch.consume(topic,(msg) => {
            if(!msg){
                console.log('receive nothing....');
                return;
            }
            console.log('receive msg....',msg.content.toString());
            // ch.ack(msg);
        });
    });
}
