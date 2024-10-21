const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try{
        const{ name, email, password} = req.body;

        if (!name || !email ||!password){
            return res.status(400).json({ message: 'É obrigatorio preencher todos os campos'})
        }

        // Criptografia a senha antes de salvar 
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.createUser({name, email, password: hashedPassword});

        //Gera um token com base no ID do usuário criado 
        //const token = jwt.sign({userId: result.insertId}, process.env.JWT_SECRET, { expiresIn: '1h'});

        //Retorna o token e uma mensagem de sucesso para o front end
        res.status(201).json({message: 'Usuário criado com sucesso'});

    } catch (error){
        console.error('Erro ao cadastrar usuário: ', error);
        res.status(500).json({message: 'Erro ao cadastrar usuário'});

    }
};

//função de login
exports.login = async(req, res) => {
    const {email, password} = req.body;
    try{
        //Busca o usuário pelo email
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(404).json({erro:'Usuario não encontrado'})
        }

        //pega o primeiro usuário
        const foundUser = user[0];

        //Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password,foundUser.password);
        if (!isPasswordValid){
            return res.status(401).json({error: 'Senha incorreta'});

        }

        //Retorna sucesso com informações do usuário
        res.status(200).json({
            message: 'Login realizado com sucesso',
            user: {id: foundUser.id, name: foundUser.name, email: foundUser.email}
        });
    } catch (error){
        console.error('Erro ao fazer login: ', error);
        res.status(500).json({error: 'Erro ao fazer login'})
    }
};
