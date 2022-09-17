const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const fs = require('fs/promises');
const shortURL = require('./shortURL');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/', shortURL, async (req, res) => {
  let data;
  try {
    data = await fs.readFile(path.resolve('data.json'), 'utf-8');
    data = JSON.parse(data);
  } catch (error) {
    data = [];
  }
  res.shorturl = `${req.protocol}://${req.get('host')}/${res.shortURL}`;
  let newUrl = {
    url: req.body.url,
    shortURL: res.shortURL,
  };
  data.push(newUrl);
  await fs.writeFile(path.resolve('data.json'), JSON.stringify(data));
  res.redirect('/');

  //console.log(req.body);
  //let getfullurl = req.body.url;
  //console.log(res.shortURL);
  getfullurl = `https://${res.shortURL}`;
  console.log(req.get('host'));
  res.shortURL = `${req.protocol}://${req.get('host')}/${res.shortURL}`;
  console.log(res.shortURL);
});

app.get('/:shortURL', async (req, res) => {
  let data = await fs.readFile('data.json', 'utf-8');
  res.status(200).json(JSON.parse(data));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
module.exports = app;
