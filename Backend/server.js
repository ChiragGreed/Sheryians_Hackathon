import app from './src/app..js';
import { Config } from './src/config/config.js';
import ConntectToDb from './src/config/database.js';

ConntectToDb();


app.listen(Config.PORT, () => {
    console.log(`Server running at port ${