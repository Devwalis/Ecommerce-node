const pool = require('../config/dbConfig');

//Função para obter todos os produtos
async function getAllProducts(){
    try{
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    } catch (error){
        console.error('Erro ao buscar produtos no banco de dados: ', error);
        throw new Error('Erro ao buscar produtos');

    }


    module.exports ={
        getAllProducts
    }
}