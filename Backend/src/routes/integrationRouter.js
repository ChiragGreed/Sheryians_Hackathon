import express from 'express';
import { setWildCard } from '../controllers/wildCardController.js';

const integrationRouter = express.Router();

integrationRouter.get('*name', setWildCard);


export default integrationRouter;
