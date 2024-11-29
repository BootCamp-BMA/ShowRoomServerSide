//mdoule.exports uploadfile by id  async 
const {uploadFiles}=require('../config/gridFS')

module.exports.uploadModel=async(req,res,next)=>{
    try {
      // Check if a file is provided in the request
      if (!req.file) {
          return res.status(400).json({ message: 'No file provided for upload' });
      }

      const file = req.file; 
      const fileStream = file.buffer;  
      const filename = file.originalname; 
      const metadata = {};  

      // Call upload function for the single file
      const fileId = await uploadFiles(fileStream, filename, metadata);

      console.log('File uploaded with ID:', fileId);
      res.status(200).json({ message: 'File uploaded successfully', fileId });
  } catch (error) {
      next(error)
  }
}