'use strict'

module.exports = {
  stringToHex: function (str) {
    const bufStr = Buffer.from(str, 'utf8')
    return bufStr.toString('hex')
  },
  hexToString: function (hex) {
    const bufHex = Buffer.from(hex, 'hex')
    return bufHex.toString('utf8')
  }
}