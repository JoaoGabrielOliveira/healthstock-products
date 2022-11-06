import Product from "../models/Product.js";
import { SendEvent } from '../config/index.js';
import Category from "../models/Category.js";
import { Like } from "typeorm";

export async function saveProduct(req, res, next){
    const product = new Product(req.body);
    try {
        await SendEvent("Salvando um novo catalgo");
        await product.save();
        SendEvent("Catalgo salvo com sucesso!", product);
        res.status(201).send(product);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = `Produto '${product.name}' já existe no Banco de dados e não pode ser cadastrado novamente!`;
            SendEvent(message, product, 'warn');
            res.status(400).send({message: message});
        } else {
            SendEvent("Erro ao salvar Produto", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllProducts(req, res) {
    try {
        const { limit, offset, total, search } = req.query;
        const relations = {
            productPhoto: true
        };

        if(total == ""){
            res.status(200).send({total: await Product.count()});
            return;
        }

        if(search){
            const searchProducts = await Product.findAndCount({
                take: limit,
                skip: offset,
                order: {
                    name: 'ABC'
                },
                where: {
                    name: Like(`%${search}%`),
                },
                relations: relations
            });
            

            res.status(200).send(searchProducts);
            return;
        }

        const allProducts = await Product.find({
            take: limit,
            skip: offset,
            relations: relations
        });

        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allProducts);
    } catch (error) {
        SendEvent("Erro ao pegar Produtos", error, 'error');
        res.status(500).send({error: error.message});
    }
}

export async function getProduct(req, res) {
    try {
        const product = await Product.findOneBy({id: req.params.id});
        res.status(200).send(product);
        SendEvent(`Pegou Produto com sucesso!`, product);
    } catch (error) {
        SendEvent("Erro ao pegar Produto", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}
