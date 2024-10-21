const productModel= require('../models/productModel');

//Controlador para obter todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    }catch(error){
        console.error('Erro ao buscar produtos: ', error);
        res.status(500).json({message: 'Erro ao buscar produtos'});
    }
    };


