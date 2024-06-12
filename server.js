const express = require('express');
const bodyParser = require('body-parser');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const app = express();
const port = 3000;

// Configuración de Cognito
const poolData = {
  UserPoolId: 'us-east-2_gtTxWs64U',
  ClientId: '608inhp7jpo6nubovo3ndo3dcm'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Middleware para manejar datos JSON
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario en Cognito
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email })
  ];

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario en Cognito:', err);
      return res.status(500).json({ error: 'Error al registrar usuario en Cognito' });
    }
    console.log('Usuario registrado en Cognito:', result.user);
    res.status(200).json({ message: 'Usuario registrado en Cognito' });
  });
});

// Ruta para autenticar un usuario en Cognito por email
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,  // Cambiar Username por Email
    Password: password
  });

  const userData = {
    Username: email,  // Cambiar Username por Email
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log('Token de acceso:', result.getAccessToken().getJwtToken());
      console.log('Token ID:', result.getIdToken().getJwtToken());
      console.log('Token de actualización:', result.getRefreshToken().getToken());
      res.status(200).json({ message: 'Inicio de sesión exitoso en Cognito' });
    },
    onFailure: function(err) {
      console.error('Error al autenticar usuario en Cognito:', err);
      res.status(401).json({ error: 'Error al autenticar usuario en Cognito', details: err });
    }
  });
});

// Ruta para confirmar la cuenta de un usuario en Cognito
app.post('/confirm', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      console.error('Error al confirmar usuario en Cognito:', err);
      return res.status(500).json({ error: 'Error al confirmar usuario en Cognito', details: err });
    }
    console.log('Confirmación exitosa:', result);
    res.status(200).json({ message: 'Confirmación exitosa' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API iniciado en http://localhost:${port}`);
});
