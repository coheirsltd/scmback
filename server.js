import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
import { createUser } from "./user.controller.js";
import { SendIp } from "./ip.controller.js";
import { GetMessages } from "./messages.controller.js";
import bodyParser from "body-parser";
import { Ban } from "./ban.controller.js";
import { CheckBan } from "./checkBan.controller.js";


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

app.post('/create/user', createUser);
app.post('/send/ip', SendIp);
app.get('/getMessages', GetMessages)
app.get('/ban/:id', Ban)
app.get('/checkBan/:id', CheckBan)

app.listen(port, () => {
    console.log(`The Server is runing on port http://localhost:${port}`);
});