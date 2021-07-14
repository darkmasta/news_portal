require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3

const uploadFile = file => {
  const path = './images/' + file + '.jpeg'
  const fileStream = fs.createReadStream(path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file + '.jpeg'
  }

  return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile

// downloads a file from s3

const getFileStream = fileName => {
  const downloadParams = {
    Key: fileName,
    Bucket: bucketName
  }

  s3.getObject(params)
    .createReadStream()
    .on('error', e => {
      // handle aws s3 error from createReadStream
      console.log(e)
    })
    .pipe(unzip)
    .on('data', data => {
      // retrieve data
    })
    .on('end', () => {
      // stream has ended
    })
    .on('error', e => {
      // handle error from unzip
    })

  // s3.headObject(downloadParams)
  //   .promise()
  //   .then(() => {
  //     return s3.getObject(downloadParams).createReadStream()
  //   })
  //   .catch(error => {
  //     if (error.statusCode == 404) {
  //       console.log(error)
  //       return error
  //     }
  //   })
}

exports.getFileStream = getFileStream
