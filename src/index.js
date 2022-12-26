import path from 'path';
import * as url from 'url';
import express from 'express';
import cors from 'cors';
import establishDbConnection from './database/connection.js';
import { apiRoutes } from './routes/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const host = 'http://localhost';
const port = 3000;

establishDbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.listen(port, () => {
 console.log(`App listening on ${host}:${port}`);
});
