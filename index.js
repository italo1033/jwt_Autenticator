require('dotenv').config();
const express = require('express');
const db = require('./connection/connectMysql');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express();
const secretKey = process.env.TOKEN_KEY;
const expiresIn = {expiresIn: '1h'}
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Olá mundo")
})
app.post("/login", (req,res, next) => {
    const {email, password} = req.body.userData;
    db.query(`SELECT * FROM usuario where apelido = '${email}' and senha = md5('${password}') `, function(error, results) {
        if (error) throw error;
        if(results.length === 0 || results.ativo === "N"){
            res.status(401).json({
                sucess: false,
                code: 'DD011_API_ERROR_01',
                message: 'E-mail e /or passswor inválid.'
            })
        }else{  
            // res.send({'result':results})
            const tokenData = {
                "codusur": results.codusur,
                "nome": results.nome,
                "apelido": results.apelido,
                "senha": results.senha,
                "email": results.email,
                "permission": ['login','HomeUser']
            }
            let generatedToken = jwt.sign( tokenData, secretKey, expiresIn)
            res.json({
                sucess:true,
                token: generatedToken
            }) 
        }
      });

    // const options = {method: 'GET', url: `http://172.16.70.37/users/${email}&${password}`};
    // axios.request(options).then(function (response) {
    //     if(email === undefined || password === undefined){
    //         res.status(401).json({
    //             sucess: false,
    //             code: 'DD011_API_ERROR_01',
    //             message: 'E-mail e /or passswor inválid.'
    //         })
    //     }else{
    //         if(response.data.access === "enabled"){
    //             let tokenData={id:101,}
    //             let generatedToken = jwt.sign( tokenData, secretKey,expiresIn)
    //             res.json({
    //                 sucess:true,
    //                 token: generatedToken
    //             }) 
    //         }else{
    //             res.json({sucess:false,}) 
    //         }
    //     }
    // }).catch(function (error) {
    //     console.error(error);
    // });
})

app.post("/validation" , (req,res)=>{
    const {token, page} = req.body.userData;
    jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
            res.json({
                sucess:false,
                menssage:'tokem Inválido'
            }) 
        } else {
           if(decoded.permission.includes(page)){
                res.json({
                    sucess:true,
                    menssage:'tokem válido'
                }) 
           }
           else{
                res.json({
                    sucess:false,
                    menssage:'tokem inválido'
                }) 
           }
        }
    });
})

app.listen(5001, () => {
    console.log(`Server Started at ${5001}`)
})
