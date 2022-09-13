require('dotenv').config()

if (!process.env[`RESOURCES_URL`]) {
  throw new Error("RESOURCES_URL have to be defined and confingured")
}

module.exports = {
  resourcersUrl: process.env[`RESOURCES_URL`]
}
