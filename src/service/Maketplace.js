import { Like } from "typeorm";
import { SendEvent } from "../config/index.js";
import SupplierCatalog from "../models/SupplierCatalog.js";
import SupplierCatalogPhoto from "../models/SupplierCatalogPhoto.js";

export async function getMarketPlace(req, res, next){
    try {
        SendEvent("Pegando produtos dos catalogos...");
        const { limit, offset, total, search } = req.query;

        let catalog = [];

        const relations = {
            photo: true
        };

        const select = { id:true, name: true, price: true };

        if(total == ""){
            res.status(200).send({total: await SupplierCatalog.count()});
            return;
        }

        if(search){
            const searchProducts = await SupplierCatalog.findAndCount({
                take: limit,
                skip: offset,
                select: select,
                order: {
                    name: 'ABC'
                },
                where: {
                    name: Like(`%${search.trim()}%`),
                },
                relations: relations
            });
            

            res.status(200).send(searchProducts);
            return;
        }
        
        catalog = await SupplierCatalog.find({select: select, relations: relations});

        SendEvent(`Pegou todos os catalogos com sucesso!`);
        res.status(200).send(catalog);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = "Erro com body da requisão!";
            SendEvent(message, supplierCatalog, 'warn');
            res.status(400).send({message: message, error: error.message});
        } else {
            SendEvent("Erro ao pegar catalogos", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }
    } finally { next() }
}

export async function getProductFromMarketPlace(req, res, next){
    try {
        SendEvent("Pegando produtos dos catalogos...");

        let catalog = await SupplierCatalog.findOne({select: { id:true, supplierId:true, name: true, description: true },
            where: {id: req.params.id},
            relations: { product: true}
        });

        catalog.photos = await SupplierCatalogPhoto.find({select:{ title: true, path: true}, where: { supplierCatalog: catalog}});

        SendEvent(`Pegou o catalogo ${catalog.id} com sucesso!`);

        res.status(200).send(catalog);
    } catch (error) {
        SendEvent("Erro ao pegar catalogo " + req.params.id, error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado!", error: error.message});
    } finally { next() }
}