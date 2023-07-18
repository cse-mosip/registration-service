const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the destination folder where the uploaded files will be stored
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      filePath = filePathGenerator(req,file)
      cb(null, filePath);
    }
  });
const upload = multer({ storage });

const removeFile = (filepath) => {
    filepath = 'uploads/'+filepath
    fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log(filepath,' was deleted');
      });
}

const filePathGenerator = (req,file) => {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = req.body.index;
    const fileExtension = file.originalname.split('.').pop();
    return file.fieldname + '-' + uniqueSuffix + '.' + fileExtension
}

module.exports = {
    multer,storage,upload,removeFile,filePathGenerator
  };