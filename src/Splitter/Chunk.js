const ObjUtils = require('../ObjUtils')

class Chunk {

  constructor(maxSize) {
    this.obj = {}
    this.maxSize = maxSize
  }

  getSpaceUsed() {
    return ObjUtils.getSize(this.obj)
  }

  getSpaceRemaining() {
    return this.maxSize - this.getSpaceUsed()
  }

  canFit(key, value) {
    const additionSize = ObjUtils.getKeyValueSize(key, value)
    return this.getSpaceRemaining() >= additionSize
  }

  canNotFit(key, value) {
    return !this.canFit(key, value)
  }

  assertCanFit(key, value) {
    if (!this.canFit(key, value)) {
      throw new Error(`can not fit ${key}, ${value} into ${JSON.stringify(this.obj)}.\nPayload size: ${ObjUtils.getKeyValueSize(key, value)}.\nSpace used: ${this.getSpaceUsed()}/${this.maxSize}`)
    }
  }

  addKeyValue(key, value) {
    this.assertCanFit(key, value)
    ObjUtils.addKeyValue(this.obj, key, value)
  }

  assignHeader(key, value) {
    ObjUtils.addKeyValue(this.obj, key, value)
  }

  nestExistingDataUnderKey(key) {
    this.obj = { [key]: this.obj }
  }

}

module.exports = Chunk
