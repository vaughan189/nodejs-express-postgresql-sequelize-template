/* eslint-disable sort-imports */
/* eslint-disable no-console */
import bodyParser from 'body-parser';
import config from 'dotenv';
import express from 'express';
import { HTTP_CODES, PORT } from './constants';
import Routes from './routes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || PORT; // when a random route is imputed

app.use('/api/v1', Routes);

app.get('*', (req, res) =>
  res.status(HTTP_CODES.OK).send({
    message: 'Welcome to this API.'
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
