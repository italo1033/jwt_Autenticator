const jwt = require('jsonwebtoken');
const payload = { 
    user_id: 1234, 
};

const secretKey = "mySecretKey123";

const options = {
expiresIn: '1h'
};

const token = jwt.sign(payload, secretKey, options);

console.log(token)

jwt.verify(token, secretKey, function(err, decoded) {
    if (err) {
        console.log('Token inválido!');
    } else {
      console.log(decoded); // { user_id: 1234, username: 'john_doe', iat: 1635566219, exp: 1635570019 }
    }
});