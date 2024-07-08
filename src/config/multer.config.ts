import { S3Client } from "@aws-sdk/client-s3";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { basename, extname } from "path";
import "dotenv/config.js";
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const MulterConfig = (): MulterOptions => {

    return {
        storage: multerS3({
            s3: new S3Client({
                region: process.env.AWS_S3_REGION,
                credentials: {
                    accessKeyId:  process.env.AWS_ACCESS_KEY_ID,    
                    secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY
                }
            }),
            bucket:  process.env.S3_BUCKET_NAME,
          	//acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,   
            metadata(req, file, callback) {
                callback(null, {owner: 'it'})
            },
            key(req, file: any, callback) {
                const uniqueFileName = `${uuidv4()}`;
                const ext = extname(file.originalname); // 확장자
                const baseName = basename(uniqueFileName, ext); // 확장자 제외
                // 파일이름-날짜.확장자
                const fileName = `quiz/${baseName}-${Date.now()}${ext}`// images/이거쓰면 폴더안에생성됨 ㅇㅇ
                callback(null, fileName)
            }
            
        }),
        fileFilter : (req,file,cb)=>{
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(null, false);
            }
            return cb(null,true)
        },
      // 파일 크기 제한
        limits: {
            fileSize: 10 * 1024 * 1024//바이트 1kb == 1024
        }
    }
}