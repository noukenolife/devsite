import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {Request, Response} from 'express-serve-static-core';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

const apiRouter = express.Router();
apiRouter.post('/articles', (req: Request, res: Response) => {
  res.status(200).send({});
});

app.use('/api', apiRouter);

const server = app.listen(3000, () => {
  console.log('Running API server at http://localhost:3000');
});
