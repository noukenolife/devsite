import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import path from 'path';
import {saveArticleAction} from './article/actions/saveArticleAction';
import {deleteArticleAction} from './article/actions/deleteArticleAction';
import {errorHandler} from './errorHandler';
import {getArticleAction} from './article/actions/getArticleAction';
import {getArticleListAction} from './article/actions/getArticleListAction';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.resolve(__dirname, '../dist')));

const apiRouter = Router();
apiRouter.get('/articles', getArticleListAction);
apiRouter.get('/articles/:id', getArticleAction);
apiRouter.post('/articles', saveArticleAction);
apiRouter.delete('/articles/:id', deleteArticleAction);
apiRouter.use(errorHandler);

app.use('/api', apiRouter);

const server = app.listen(3000, () => {
  console.log('Running API server at http://localhost:3000');
});
