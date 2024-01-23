
const amqp = require('amqplib');
const config = require("./config");

//step 1 : connect to the rabbitmq server
//step 2 : create new channel on the connection
//step 3 : create the exchange
//step 4 : publish the message to the exchange with a routing key


const createProducer = async () => {
    //step 1 : connect to the rabbitmq server
    const connection = await amqp.connect(config.rabbitMQ.url);

    //step 2 : create new channel on the connection
    const channel = await connection.createChannel();

    //step 3 : create the exchange
    const exchangeName = config.rabbitMQ.exchangeName;
    await channel.assertExchange(exchangeName, 'direct', { durable: false });


    // Return an object with a method to publish messages
    return {
        publishMessage: async (routingKey, message) => {
            // Step 4: Publish the message to the exchange with a routing key
            const options = { contentType: 'text/plain' };
            channel.publish(exchangeName, routingKey, Buffer.from(message), options);
            console.log(`[x] Sent message: "${message}" with routing key: ${routingKey}`);
        },
        close: () => {
            // Close the connection when needed
            connection.close();
        },
    };
}
module.exports = createProducer;


