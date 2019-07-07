const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucketname = 'spot-images-raw'
const image = require('../helper/load-image')

describe("the image client", function() {
  it("Should be able to upload an image", function(done) {
    const params = {Bucket: bucketname, Key: 'test-file.png', Body: image}
    s3.putObject(params, (err, data) => {
      if (err) console.log(err)
      else console.log(data)
      done()
    })
  })
})
