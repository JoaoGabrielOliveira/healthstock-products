import { Enviroment } from "../../config/index.js";
import SavePhotoSrategy from "./SavePhotoStrategy.js";

export default class LocalSaveStrategy extends SavePhotoSrategy {

    save(fileName, photo){
        let photoFile = fileName + "." + this.getExtensionOfFile(photo);
        let uploadPath = Enviroment.PHOTO_PATH + photoFile;
        
        photo.mv(uploadPath, (error) => {});
        
        return  `${Enviroment.HOST}:${Enviroment.PORT}/static/${photoFile}`;

    }

    getExtensionOfFile(photo){
        return photo.name?.split('.')[1];
    }

} 