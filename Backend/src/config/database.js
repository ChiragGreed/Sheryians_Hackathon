import mongoose from "mongoose"
import { Config } from "./config.js";
import dns from  'dns'

const ConntectToDb = () => {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
    mongoose.connect(Config.MONGO_URI)
        .then((res) => {
            console.log("MongoDb Connected");
        });
}

export default ConntectToDb