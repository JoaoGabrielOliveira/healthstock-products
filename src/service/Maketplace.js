import { SendEvent } from "../config/index.js";
import SupplierCatalogPhoto from "../models/SupplierCatalogPhoto.js";
import SupplierCatalog from "../models/SupplierCatalog.js";

export async function getMarketPlace(req, res, next){
    try {
        SendEvent("Pegando produtos dos catalogos...");
        const catalog = await SupplierCatalog.find({select: { id:true, supplierId:true, name: true, description: true }, relations: {supplierCatalogPhotos: true}});
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

        const catalog = await SupplierCatalog.findOne({select: { id:true, supplierId:true, name: true, description: true }, where: {id: req.params.id}});
        catalog.photos = await S.find({ select:{urlData:true, blobData:true, title:true}, loadRelationIds:true, where: {supplierCatalog : catalog.id}});

        SendEvent(`Pegou o catalogo ${catalog.id} com sucesso!`);

        res.status(200).send(catalog);
    } catch (error) {
        SendEvent("Erro ao pegar catalogo " + req.params.id, error, 'error');
        res.status(500).send(error);
    } finally { next() }
}