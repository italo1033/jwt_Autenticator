const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors')
const app = express();
const secretKey = "mySecretKey123";
const expiresIn = {expiresIn: '1h'};
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/login", (req,res, next) => {
    const {email, password} = req.body.userData;
    const options = {method: 'GET', url: `http://172.16.70.37/users/${email}&${password}`};
    axios.request(options).then(function (response) {
        if(email === undefined || password === undefined){
            res.status(401).json({
                sucess: false,
                code: 'DD011_API_ERROR_01',
                message: 'E-mail e /or passswor inválid.'
            })
        }else{
            if(response.data.access === "enabled"){
                let tokenData={id:101,}
                let generatedToken = jwt.sign( tokenData, secretKey,expiresIn)
                res.json({
                    sucess:true,
                    token: generatedToken
                }) 
            }else{
                res.json({sucess:false,}) 
            }
        }
    }).catch(function (error) {
        console.error(error);
    });
})

app.post("/validation" , (req,res)=>{
    const {token} = req.body.userData;
    jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
            res.json({
                sucess:false,
                menssage:'tokem Inválido'
            }) 
        } else {
            res.json({
                sucess:true,
                menssage:'tokem valido'
            }) 
        }
    });
})

app.listen(5001, () => {
    console.log(`Server Started at ${5001}`)
})
