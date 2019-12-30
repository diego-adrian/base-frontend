const express = require('express');
const AuthService = require('./auth/authService');

const auth = AuthService();
const app = express();

const PORT = process.env.PORT || 4000;

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));
app.get('/authorization', async (req, res) => {
  try {
    const response = await auth.authorizate(req);
    console.log('-----------RESPUESTA AUTHORIZATION-------------------------');
    console.log(response);
    console.log('------------------------------------');
    res.json(response);
  } catch (error) {
    throw new Error(error.message);
  }
});

app.get('/auth', async (req, res) => {
  try {
    const response = await auth.getCode();
    if (response && response.url) {
      res.json({
        finalizado: true,
        mensaje: '',
        datos: {
          url: response.url
        }
      });
    } else {
      throw new Error('Error al tratar de conectarse con ciudadanía digital');
    }
  } catch (err) {
    res.json({
      finalizado: false,
      mensaje: err.message,
      datos: {}
    });
  }
});

app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
  console.log('------------------------------------');
});
