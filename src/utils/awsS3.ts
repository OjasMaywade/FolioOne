import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import fs from "fs";

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
});

const uploadFile = async (data, filename)=>{
  
    const command = new PutObjectCommand({
            Body: data,
            Bucket: "bucket.portfolio-app",
            Key: filename,
            ContentType: "image/jpg"
        });

        return await s3Client.send(command);

}

const deleteFile = async (key)=>{
    const command = new DeleteObjectCommand({
        Bucket: "bucket.portfolio-app",
        Key: key
    });
    return await s3Client.send(command)
}

const getObjectUrl = async (filename)=>{
    const command = new GetObjectCommand({
        Bucket: "bucket.portfolio-app",
        Key: filename,
    })

    return await getSignedUrl(s3Client, command)
}

export default {uploadFile, getObjectUrl, deleteFile}