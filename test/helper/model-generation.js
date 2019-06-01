const {generateUserProps, generateDogProps, generateDogPropsWithImage} = require("./prop-generation")
const userModel = require("../../src/models/user-model")
const dogsModel = require("../../src/models/dogs-model")

const createUser = (options={}) => {
    const props = generateUserProps()
    const merged = Object.assign(props, options)
    return userModel.upsert(merged)
}

const createDog = async (user_id) => {
    if (!user_id) user_id = (await createUser()).id
    const props = generateDogProps(user_id)
    return dogsModel.create(props)
}

const createDogWithImage = async (user_id) =>{
    if (!user_id) {
        const user = await createUser()
        user_id = user.id
    }
    const props = generateDogPropsWithImage(user_id, false)
    return dogsModel.create(props)
}

const createDogLoadImage = async (user_id, image) => {
    const props = {
        ...generateDogProps(user_id),
        image: {
            image: image
        }
    }
    return dogsModel.create(props)

}

module.exports = {
    createUser,
    createDog,
    createDogWithImage,
    createDogLoadImage
}
