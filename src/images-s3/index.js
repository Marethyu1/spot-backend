const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketname = 'spot-images-raw'
const uuid = require('uuid/v4')
const util = require('util')
const putObject = util.promisify(s3.putObject).bind(s3)



const saveImage = async function(id, image) {
  const generatedId = uuid()
  const bucketPath = `${id}/${generatedId}`
  const params = {Bucket: bucketname, Key: bucketPath, Body: image}
  return putObject(params)
    .then(() => generatedId)
}

module.exports = {
  saveImage,
}


