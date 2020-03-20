const amqplib = require('amqplib');


const queue = 'promise-message';

async function consume(){
    
    //1.建立连接
    const conn = await amqplib.connect('amqp://localhost:5672');

    //2.创建通道
    const ch = await conn.createChannel();

    //3.声明channel
    await ch.assertQueue(queue);

    await ch.consume(queue,(msg) => {
        if(!msg){
            console.error('consumer msg err...')
            return;
        }
        console.log(msg.content.toString());
        //确认消费应答，queue删除消息
        ch.ack(msg);
    });


}

consume();