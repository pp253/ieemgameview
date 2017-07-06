
export class StorageItem {
  constructor () {
    this.position
    this.day = 0
    this.product = 0
    this.amount = 0
  }
}

export class Storage {
  constructor (position) {
    this.position = position
    this.storageItemList = []
    reload()
  }

  reload () {
    // axios
  }

  get () {
    return this.storageItemList
  }

  add (storageItem) {
    // axios
  }

  remove (storageItem) {
    // axios
  }

  clear () {
    // axios
  }
}
