const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res, next) => {
  let language = req.headers['accept-language'].split(';')[0].split('-')[0];
  let ip_address = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : 'localhost';
  let system = req.headers['user-agent'].split(' ')[2];
  let architecture = req.headers['user-agent'].split(' ')[3].replace(')','');
  res.json({
    language, 
    system, 
    architecture,
    ip_address});
});

app.use('*', (req, res, next) => {
  res.redirect('/');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}.`);
});