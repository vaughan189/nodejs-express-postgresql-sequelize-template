/* eslint-disable no-console */
import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000; // when a random route is imputed

app.use('/api/v1', Routes);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to this API.'
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
