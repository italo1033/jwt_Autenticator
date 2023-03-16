const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/login", (req,res, next) => {
    const {email, password} = req.body.userData;

    if(email === undefined || password === undefined){
        res.status(401).json({
            sucess: false,
            code: 'DD011_API_ERROR_01',
            message: 'E-mail e /or passswor inválid.'
        })
    }else{
        let tokenData={
            id:101,
        }
        let generatedToken = jwt.sign( tokenData, 'somepass',{expiresIn:'1m'})
        
        res.json({
            sucess:true,
            token: generatedToken
        })  
    }
})

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})