// src/config/gridFS.js



const { getGridFSBucket } = require('../config/db');
const { Readable } = require('stream');
const { ObjectId } = require('mongodb');

module.exports.uploadFiles = async (fileStream, filename, metadata) => {
    const bucket = await getGridFSBucket();

    return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename, { metadata });

        const bufferStream = new Readable();
        bufferStream.push(fileStream); 
        bufferStream.push(null); 

        bufferStream.pipe(uploadStream); 

        uploadStream.on('finish', () => {
            resolve(uploadStream.id); 
        });

        uploadStream.on('error', (err) => {
            reject(err); 
        });
    });
};

module.exports.getFileById = async (fileId) => {
    const bucket = await getGridFSBucket();

    return new Promise((resolve, reject) => {
        try {
            const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
            resolve(downloadStream);
        } catch (err) {
            reject(err);
        }
    });
};
