const express = require('express');
const path = require('path');
const app = express();
const shortURL = require('../shortURL');

// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
let data = [];

app.post('/', shortURL, async (req, res) => {
 
  res.shorturl = `${req.protocol}://${req.get('host')}/${res.shortURL}`;
  let newUrl = {
    url: req.body.url,
    shortURL: res.shorturl,
    slug: res.shortURL
  };
  data.push(newUrl);
  res.status(200).json(newUrl)
 // res.redirect('/');
  console.log(req.body);
  //let getfullurl = req.body.url;
  //console.log(res.shortURL);
  //getfullurl = `https://${res.shortURL}`;
 // console.log(req.get('host'));
 // res.shortURL = `${req.protocol}://${req.get('host')}/${res.shortURL}`;
 // console.log(res.shortURL);
});

app.get('/:slug', async (req, res) => {
  let getURL = data.find((link)=>{
    return link?.slug === req.params.slug
  });
  if(getURL){
    return res.redirect(getURL.url);
  }
  console.log(getURL);
  res.status(404).send();
 // let data = await fs.readFile('data.json', 'utf-8');
 // res.status(200).json(JSON.parse(data));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = app;
