require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Configurer AWS S3
const s3 = new S3Client({
  region: 'eu-west-3',
  endpoint: 'https://s3.eu-west-3.amazonaws.com', // Assurez-vous que cette variable est définie
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
});

console.log("aled");

// Middleware multer pour stocker les fichiers directement dans S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'e-calendar', // Remplacez par votre bucket S3
    key: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, `competitions/${fileName}`); // Nom du fichier stocké sur S3
    },
  }),
});

module.exports = upload;

