import { AppDataSource } from "../../ormconfig";
import { Media } from "../entity/media";


export async function addMedia(medias : Media[]){
    const mediaRepository = AppDataSource.getRepository(Media);
    return await mediaRepository.save(medias);
}

