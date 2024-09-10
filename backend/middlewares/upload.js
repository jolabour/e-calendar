require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Configurer AWS S3
const s3 = new S3Client({
  region: 'eu-west-3', // Assurez-vous que cette variable est définie
  credentials: {
    accessKeyId: 'images-uplaoder',
    secretAccessKey: 'PWD9MRmD',
  },
});

console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Middleware multer pour stocker les fichiers directement dans S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-s3-bucket-name', // Remplacez par votre bucket S3
    acl: 'public-read', // Définissez les autorisations du fichier
    key: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      const fileName = `${Date.now()}_${file.originalname}`;
      cb(null, `competitions/${fileName}`); // Nom du fichier stocké sur S3
    },
  }),
});

module.exports = upload;

