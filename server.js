// Express is intalled during container build
const express = require('express'); // eslint-disable-line
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/health', (req, res) => {
  res.send('Keepclone: OK');
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Keepclone started: listening on port ${PORT}`);
});
