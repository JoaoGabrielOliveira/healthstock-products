import LocalSaveStrategy from "./savePhoto/LocalSaveStrategy.js";
import SavePhotoSrategy from "./savePhoto/SavePhotoStrategy.js";

export default class SavePhoto {
    /**
     * @type {SavePhotoSrategy}
     */
    static SINGLETON = new LocalSaveStrategy();
}