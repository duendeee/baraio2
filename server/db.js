//CONEXAO COM O BANCO
const mysql = require('mysql')
const con = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '123',
    database : 'baraio'
})

con.connect((err) => {
    if(err){
        console.log("erro ao conectar no banco",err)
        return
    }
    console.log("conexao com o banco estabelecida")
})

module.exports = {

}