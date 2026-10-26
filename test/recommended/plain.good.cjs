const path = require('node:path')

/**
 * Join a file name onto a directory.
 * @param {string} dir - the directory to join onto
 * @param {string} name - the file name to join
 * @returns {string} the joined path
 */
const joinPath = (dir, name) => path.join(dir, name)

module.exports = { joinPath }
