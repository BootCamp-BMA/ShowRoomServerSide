//mdoule.exports uploadfile by id  async 
const {uploadFiles,getFileById}=require('../config/gridFS')

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

module.exports.getFileById=async(req,res,next)=>{
  try {
    const fileId = req.params.id;
    console.log('Retrieving file with ID:', fileId);

    const downloadStream = await getFileById(fileId);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment');

    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
        console.error('Error while streaming file:', err);
        if (err.code === 'ENOENT') {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(500).json({ message: 'Error retrieving file', error: err.message });
    });

    downloadStream.on('end', () => {
        console.log('File retrieved successfully');
    });
    
  } catch (error) {
    next(error)
  }
}