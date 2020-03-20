const amqplib = require('amqplib');

const queue = 'promise-message';

async function publish(){
    //1.建立连接
    const conn = await amqplib.connect("amqp://localhost:5672");

    //2. 建立通道
    const ch = await conn.createChannel();

    //3.不指定exchange，走默认的exchange
    //4.声明队列，
    await ch.assertQueue(queue);

    //5.发送信息到queue
    for(let i = 0;i < 1000;i++){
        const msg = `message:${i} from publish `;
        console.log(msg);
        await ch.sendToQueue(queue,Buffer.from(msg));
        // await ch.publish('',queue,Buffer.from(msg));
    }
    await ch.close();
    await conn.close();

}

publish();
