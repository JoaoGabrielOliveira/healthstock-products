import SupplierCatalog from "../models/SupplierCatalog.js";

export async function getMarketPlace(req, res, next){
    const catalog = await SupplierCatalog.find({select: { name: true, description: true, product: true }, relations: { product: true}});

    /*res.status(200).send([
        { name:"Siringa", description: "Se", photo: "https://http2.mlstatic.com/D_NQ_NP_856031-MLB47273532229_082021-O.webp" },
        { name:"Siringa", description: "Se", photo: "https://http2.mlstatic.com/D_NQ_NP_856031-MLB47273532229_082021-O.webp" }
    ]);*/

    res.status(200).send(catalog)
}