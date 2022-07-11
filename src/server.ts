import express from 'express';
import { router } from './routes';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(router);

app.listen(4000, () => {
  console.log('listening in port 4000');
})
