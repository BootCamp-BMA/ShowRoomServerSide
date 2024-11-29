//mdoule.exports uploadfile by id  async 
const {uploadFiles,getFileById}=require('../config/gridFS')
const Car = require('../models/carModel')

module.exports.uploadModel=async(req,res,next)=>{

    try {
      const carId = req.params.id;

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).json({ message: 'Car not found' }); // Return error if car does not exist
      }
  

      if (!req.file) {
          return res.status(400).json({ message: 'No file provided for upload' });
      }

      const file = req.file; 
      const fileStream = file.buffer;  
      const filename = file.originalname; 
      const metadata = {};  

      // Call upload function for the single file
      const fileId = await uploadFiles(fileStream, filename, metadata);

      car.model3D=fileId;
      await car.save();

      console.log('File uploaded with ID:', fileId);
      res.status(200).json({ message: 'File uploaded successfully', fileId });
  } catch (error) {
      next(error)
  }
}

module.exports.uploadImages = async (req, res, next) => {
  try {
    const carId = req.params.id; 

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' }); // Return error if car does not exist
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files provided for upload' });
    }

    const fileIds = [];

    // Iterate over each file and upload it
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const fileStream = file.buffer;
      const filename = file.originalname;
      const metadata = {};

      // Call upload function for each file
      const fileId = await uploadFiles(fileStream, filename, metadata);
      fileIds.push(fileId);
      console.log(`File ${i + 1} uploaded with ID:`, fileId);
    }
    car.images.push(...fileIds);
    await car.save(); 


    res.status(200).json({
      message: 'Files uploaded successfully',
      fileIds, // Return the array of file IDs
    });
  } catch (error) {
    next(error);
  }
};

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

module.exports.deleteFileById=async(req,res,next)=>{
  try {

    
  } catch (error) {
    next(error)
  }
}