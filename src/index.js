import './styles.css'
import { createLists, replaceElement, scrollToTop, noop } from './util'

/**
 * validate page number that will go
 * @param  {Number} pageCount - page nums that will generate
 * @param  {[type]} pager - the object instantiated by Pagination
 */
function validateCurrent (pageCount, pager) {
  if (pager.current > pageCount) {
    pager.current = pageCount
  }
  if (pager.current <= 0) {
    pager.current = 1
  }
  if (pageCount <= 1) {
    pager.hide = _config.hideIfEmpty
  }
}

/**
 * callback when you click one item of the page
 * @param  {Number} page - the page number of the clicked item
 * @param  {[type]} pager - the object instantiated by Pagination
 */
function internalAction (page, pager) {
  if (pager.current === page) {
    return
  }
  pager.current = page
  pager.action({
    current: pager.current,
    size: pager.size,
    total: pager.total
  })
  build(pager)
  if (_config.scrollTop) {
    scrollToTop(_config.scrollContainer)
  }
}

/**
 * Create pageRange
 * @param  {Number} start - the start of the page range
 * @param  {Number} finish - the end of the page range
 * @param  {[type]} pager - the object instantiated by Pagination
 * @return {Array } page range array
 */
function createRange (start, finish, pager) {
  // Create the range item Function
  const createItem = function (i) {
    return {
      value: i,
      title: _config.lang === 'cn' ? `第${i}页` : `Page ${i}`,
      liClass: pager.current === i ? _config.activeClass : '',
      action (value) {
        internalAction(value, pager)
      }
    }
  }
  const range = []

  // i is the page number
  for (let i = start; i <= finish; i++) {
    var item = createItem(i)
    range.push(item)
  }
  return range
}

/**
 * create Dots exp: 1 2 3 4 [...] 10
 * @return {Array}
 */
function createDots () {
  return [{
    value: _config.dots,
    action: function () {}
  }]
}

/**
 * create 1 [...]
 * @param  {Number} current - page num will go
 * @param  {Object} pager - the object instantiated by Pagination
 * @return {Array}
 */
function createFirst (current, pager) {
  return createRange(1, 1, pager).concat(createDots())
}

/**
 * create [...] lastPage, exp  [...] 10
 * @param  {Number} pageCount
 * @param  {Object} pager - the object instantiated by Pagination
 * @return {Array}
 */
function createLast (pageCount, pager) {
  return createDots().concat(createRange(pageCount, pageCount, pager))
}

/**
 * create < and >
 * @param  {Number} pageCount
 * @param  {Object} pager - the object instantiated by Pagination
 * @param  {String} mode  - pre or next
 * @return {Array}
 */
function createPreNext (pageCount, pager, mode) {
  if (!_config.showPreNext || pageCount < 1) {
    return []
  }

  var disabled, item

  if (mode === 'pre') {
    disabled = pager.current - 1 <= 0
    var prevPage = pager.current - 1 <= 0 ? 1 : pager.current - 1
    item = {
      value: '⟨',
      title: _config.lang === 'cn' ? '上一页' : 'Pre page',
      page: prevPage
    }
  } else {
    disabled = pager.current + 1 > pageCount
    var nextPage = pager.current + 1 >= pageCount ? pageCount : pager.current + 1

    item = {
      value: '⟩',
      title: _config.lang === 'cn' ? '下一页' : 'Next page',
      page: nextPage
    }
  }

  var buildItem = function (item, disabled) {
    return {
      value: item.value,
      title: item.title,
      liClass: disabled ? _config.disableClass : '',
      action: function (value) {
        if (!disabled) {
          internalAction(item.page, pager)
        }
      }
    }
  }
  return [buildItem(item, disabled)]
}

/**
 * render pagination
 * @param  {Object} pager - the object instantiated by Pagination
 */
function build (pager) {
  pager.lists = []
  const pageCount = Math.ceil(pager.total / pager.size)
  // fullpageCount contains start, finish, and adjacents of current page
  const fullPageCount = _config.adjacent * 2 + 3
  validateCurrent(pageCount, pager)
  pager.lists = pager.lists.concat(createPreNext(pageCount, pager, 'pre'))
  // If the page count is less than the fullPageCount
  // Just display all pages
  if (pageCount <= fullPageCount) {
    pager.lists = pager.lists.concat(createRange(1, pageCount, pager))
  } else if (pager.current - _config.adjacent <= 2) {
    pager.lists = pager.lists.concat(createRange(1, fullPageCount, pager))
    pager.lists = pager.lists.concat(createLast(pageCount, pager))
  } else if (pager.current < pageCount - (_config.adjacent + 2)) {
    let start = pager.current - _config.adjacent
    let finish = pager.current + _config.adjacent
    pager.lists = pager.lists.concat(createFirst(pageCount, pager))
    pager.lists = pager.lists.concat(createRange(start, finish, pager))
    pager.lists = pager.lists.concat(createLast(pageCount, pager))
  } else {
    let start = pageCount - fullPageCount + 1
    let finish = pageCount
    pager.lists = pager.lists.concat(createFirst(pageCount, pager))
    pager.lists = pager.lists.concat(createRange(start, finish, pager))
  }
  pager.lists = pager.lists.concat(createPreNext(pageCount, pager, 'next'))
  const lists = createLists(pager.lists, _config)
  replaceElement(lists, pager.field)
  pager.field = lists
  if (pager.hide) {
    pager.field.style.display = 'none'
  }
}

const _config = {
  ulClass: 'pagination',
  dots: '...',
  activeClass: 'active',
  disableClass: 'disabled',
  hideIfEmpty: true,
  showPreNext: true,
  scrollTop: false,
  scrollContainer: 'body',
  adjacent: 2,
  lang: 'cn'
}

class Pagination {
  constructor (total, size, action, field) {
    this.total = total || 1
    this.size = size || 1
    this.action = action || noop
    this.field = document.querySelector(field)
    this.lists = []
    this.current = 1
    build(this)
  }

  static config (config) {
    Object.keys(config).forEach(key => {
      if (!_config.hasOwnProperty(key)) {
        throw new Error(`cannot set config key ${key}, not exists!`)
      }
      _config[key] = config[key]
    })
  }

  goToPage (num) {
    num = Number(num)
    internalAction(num, this)
  }

  getCurrentPage () {
    return this.current
  }
}

export default Pagination
