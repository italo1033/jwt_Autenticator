const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config/index')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
app.post("/login", (req,res, next) => {
    let statusAutenticator;
    const {email, password} = req.body.userData;
    fetch(`http://172.16.70.37/users/${email}&${password}`)
    
    .then(result => {
        if(result.access === "enabled"){
            statusAutenticator = true
        }else{
            statusAutenticator = false
        }}) 
    .catch(console.error);


    if(email === undefined || password === undefined){
        res.status(401).json({
            sucess: false,
            code: 'DD011_API_ERROR_01',
            message: 'E-mail e /or passswor inválid.'
        })
    }else{
        if(statusAutenticator){
            let tokenData={
                id:101,
            }
            let generatedToken = jwt.sign( tokenData, config.JWT_KEY,{expiresIn:'10m'})
            
            res.json({
                sucess:true,
                token: generatedToken
            }) 
        }else{
            res.json({
                sucess:false,
            }) 
        }
    }
})

app.listen(5000, () => {
    console.log(`Server Started at ${3001}`)
})
