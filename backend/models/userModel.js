const db = require ('.../config/dbConfig');
const mysql = require('mysql2/promise');
const pool = require('../config/dbConfig');

async function createUser({name, email, password}){
    try{
        //verifica se algun dos parâmetros está indefinido
        if(!name || !email || !password)
{
    throw new Error('Todos os campos são obrigatórios');
} 

const query = 'INSERT INTO users(name, email, password) VALUES (?, ? , ?)';
const [result] = await pool.execute(query, [name, email, password]);


return result;
} catch(error){
    console.error('Erro ao criar usuário no banco de dados:', error);
    throw new Error('Erro ao criar usuário');

}
}

// Função para buscar um usuário pelo email
async function findUserByEmail(email){
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return user;
}

module.exports = {
    createUser,
    findUserByEmail,
};