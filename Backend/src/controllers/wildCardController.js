import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setWildCard = async (req, res) => {

    const index = path.join(__dirname, "../", "../", "public/dist/index.html");

    res.sendFile(index);

}