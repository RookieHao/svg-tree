const EVENTS = Symbol('EVENTS')
export default class customEvent {
  constructor() {
    this[EVENTS] = {}
  }
  addEventListener (type, callback) {
    if (callback) {
      if (!typeof callback === 'function') {
        throw new Error('事件回调必须是一个函数')
      }
      this[EVENTS][type] = this[EVENTS][type] ? [...this[EVENTS][type], callback] : [callback]
    }
  }
  dispatchEvent (type, ...argument) {
    if (this[EVENTS][type]) {
      this[EVENTS][type].forEach(callback => callback(...argument))
    }
  }
}