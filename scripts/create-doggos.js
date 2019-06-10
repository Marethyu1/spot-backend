const fs = require('fs')
const path = require('path')
// const logger = require('../src/logger')
const logger = require('../src/logger')('create_doggos_script')

const USER_ID = '10210259641485879'

const { createDogLoadImage, createUser } = require('../test/helper/model-generation')
const userModel = require('../src/models/user-model')

function loadImages() {
  const IMAGE_DIR = path.join(__dirname, 'images')
  const imageLocations = fs.readdirSync(IMAGE_DIR)
  const images = imageLocations.map((x) => {
    const imageLocation = path.join(IMAGE_DIR, x)
    return fs.readFileSync(imageLocation)
  })
  return images
}

async function createDogs(user_id, images) {
  const promises = images.map(image => createDogLoadImage(user_id, image))
  return Promise.all(promises)
}

async function createDoggos() {
  const exampleUser = {
    id: USER_ID,
    name: 'Stefan',
    email: 'stefan-hall@hotmail.com'
  }

  const images = loadImages()
  logger.info('Adding user data...')
  try {
    const user = await userModel.get(USER_ID)
    if (!user) throw new Error('User not found')
    logger.info('User already exists')
  } catch (err) {
    const user = await createUser(exampleUser)
    logger.info('CREATED USER', user.id)
    const createdDogs = await createDogs(USER_ID, images)
    logger.info('CREATED DOGS')
  }
}

module.exports = {
  createDoggos
}
