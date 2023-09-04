const {S3Client,PutObjectCommand,DeleteObjectCommand} = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

module.exports = {
  async addImage(file) {
    const params = { // create param object
      Bucket: process.env.BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    const image = await s3.send(command);
    return image;
  },

  async deleteImage(imagename) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: imagename,
    };
    const command = new DeleteObjectCommand(params);
    const deleteImage = await s3.send(command);
    return deleteImage;
  },
};
