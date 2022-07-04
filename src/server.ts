import express from 'express';
import { router } from './routes';
import * as dotenv from 'dotenv';




const app = express();

app.use(express.json());
app.use(router);

app.listen(4000, () => {
  console.log('listening in port 4000');
})
dotenv.config();
