import Pagination from '../src/index.js'
Pagination.config({
  hideIfEmpty: false,
  adjacent: 2,
  scrollTop: true,
  scrollContainer: '.scrollTop',
  lang: 'en'
})
var page = new Pagination(
  100,
  23,
  function (value) { console.log(value) },
  '.field'
)

const input = document.querySelector('[type="text"]')
document.querySelector('button')
  .addEventListener('click', () => {
    if (input.value > 0) {
      page.goToPage(input.value)
    }
  })
