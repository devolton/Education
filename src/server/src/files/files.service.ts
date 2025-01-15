import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import process from "process";

@Injectable()
export class FilesService {
    async createFile(file: Express.Multer.File, fileName: string,pathToFolder:string): Promise<string> {
        try {
            let seperatorIndex = file.mimetype.indexOf('/')
            let extension = file.mimetype.substring(seperatorIndex + 1)
            const fileNameWithExtension = fileName + '.' + extension;
            const filePath = path.resolve(__dirname, '..','..','src',  ...pathToFolder.split('/').filter(Boolean)); // взять с переменных окружения путь

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            console.log(filePath);

            await fs.writeFile(path.join(filePath, fileNameWithExtension), file.buffer, () => {

            });
            console.warn(pathToFolder+fileName);
            return pathToFolder+fileNameWithExtension;

        } catch (e) {
            console.log(e);
            throw new HttpException('Writing file error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async removeFile(pathToFile:string){
        try{
            pathToFile= pathToFile.substring(1);
             const filePath = path.resolve(__dirname, '..','..','src',pathToFile );
             fs.unlink(filePath,(err)=>{
                 if(err)
                     throw new HttpException('Removing avatar operation error!', HttpStatus.INTERNAL_SERVER_ERROR);
             })

        }
        catch(err){
            throw new HttpException('Removing file error',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
