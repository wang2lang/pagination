// useful functions
export function createLi (item) {
  const _li = document.createElement('li')
  const _txt = document.createTextNode(item.value)
  _li.appendChild(_txt)
  item.liClass && _li.classList.add(item.liClass)
  item.title && _li.setAttribute('title', item.title)
  _li.addEventListener('click', function () {
    item.action(item.value)
  })
  return _li
}

export function createLists (arry, config) {
  const _ul = document.createElement('ul')
  _ul.classList.add(config.ulClass)
  for (let i = 0; i < arry.length; i++) {
    _ul.appendChild(createLi(arry[i]))
  }
  return _ul
}

export function replaceElement (newEl, el) {
  el.parentNode.replaceChild(newEl, el)
}

export function scrollToTop (selector) {
  var speed = 10
  window.scrollTo(0, 0)
  Array.prototype.slice.call(document.querySelectorAll(selector))
    .forEach(item => {
      var _interval = setInterval(() => {
        if (item.scrollTop <= 0) {
          clearInterval(_interval)
        } else {
          item.scrollTop -= speed
          speed += 1
        }
      }, 10)
    })
}

export function noop () {}
