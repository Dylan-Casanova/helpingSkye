
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);


const region = "us-east-1";
const bucketName = "amtil-cms";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRETACCESSKEY_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

module.exports = async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};
