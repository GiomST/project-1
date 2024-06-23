import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './server/router/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'oeffentlich')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'oeffentlich', 'index.html'));
});

mongoose.connect('mongodb://127.0.0.1:27017/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB-Verbindung erfolgreich');
  app.listen(PORT, () => {
    console.log(`Der Server läuft auf ${PORT}`);
  });
}).catch((error) => {
  console.error('MongoDB-Verbindungsfehler:', error);
});