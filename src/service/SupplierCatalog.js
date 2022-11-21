
import { SendEvent } from "../config/index.js";
import SupplierCatalog from "../models/SupplierCatalog.js";
import SupplierCatalogPhoto from "../models/SupplierCatalogPhoto.js";

export async function saveSupplierCatalog(req, res, next){
    const supplierCatalog = new SupplierCatalog(req.body);
    try {
        await SendEvent("Salvando um novo supplierCatalog");
        await supplierCatalog.save();
        SendEvent("SupplierCatalog salvo com sucesso!", supplierCatalog);
        res.status(201).send(supplierCatalog);
    } catch (error) {
        if(error.code == 'SQLITE_CONSTRAINT'){
            let message = "Erro com body da requisão!";
            SendEvent(message, supplierCatalog, 'warn');
            res.status(400).send({message: message, error: error.message});
        } else {
            SendEvent("Erro ao salvar 'Catalogo de Fornecedor'", error, 'error');
            res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
        }

    } finally {
        next();
    }
}

export async function getAllSuppliersCatalog(req, res) {
    try {
        const allSuppliersCatalog = await SupplierCatalog.find({
            relations: { photo: true }
        });
        SendEvent(`Pegou todas as categoria com sucesso!`);
        res.status(200).send(allSuppliersCatalog);
    } catch (error) {
        console.error(error);
        SendEvent("Erro ao pegar 'Catalogo de Fornecedores'", error, 'error');
        res.status(500).send(error);
    }
}

export async function getSupplierCatalog(req, res) {
    try {
        let supplierCatalog = await SupplierCatalog.findOneBy({id: req.params.id});

        const photos = await SupplierCatalogPhoto.find({select:{ title: true, path: true}, where: { supplierCatalog: catalog}});
        supplierCatalog.photos = photos ?? [];

        res.status(200).send(supplierCatalog);
        SendEvent(`Pegou 'Catalogo de Fornecedor' com sucesso!`, supplierCatalog);
    } catch (error) {
        SendEvent("Erro ao pegar 'Catalogo de Fornecedor'", error, 'error');
        res.status(500).send({message: "Aconteceu um erro inesperado", error: error.message});
    }
}   