const express = require("express");
const bodyParser = require("body-parser");
const createProducer = require('./producer');
const app = express();

app.use(bodyParser.json());

app.post("/sendLog", async (req, res, next) => {

    const producer = await createProducer();

    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
})

app.listen(3000, () => {
    console.log("listening on port 3000");
});
