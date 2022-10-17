import { SendEvent } from "../config/index.js";
import Photo from "../models/Photo.js";
import SupplierCatalog from "../models/SupplierCatalog.js";

export async function getMarketPlace(req, res, next){
    try {
        SendEvent("Pegando produtos dos catalogos...");
        const catalog = await SupplierCatalog.find({select: { id:true, supplierId:true, name: true, description: true }});
        SendEvent(`Pegou todos os catalogos com sucesso!`);
        res.status(200).send(catalog);
    } catch (error) {
        SendEvent("Erro ao pegar catalogos", error, 'error');
        res.status(500).send(error);
    } finally { next() }
}

export async function getProductFromMarketPlace(req, res, next){
    try {
        SendEvent("Pegando produtos dos catalogos...");

        const catalog = await SupplierCatalog.findOne({select: { id:true, supplierId:true, name: true, description: true }, where: {id: req.params.id}});
        catalog.photos = await Photo.find({ select:{urlData:true, blobData:true, title:true}, loadRelationIds:true, where: {supplierCatalog : catalog.id}});

        SendEvent(`Pegou o catalogo ${catalog.id} com sucesso!`);

        res.status(200).send(catalog);
    } catch (error) {
        SendEvent("Erro ao pegar catalogo " + req.params.id, error, 'error');
        res.status(500).send(error);
    } finally { next() }
}