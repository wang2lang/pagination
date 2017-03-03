# js-pagination
pagination implemented in pure JavaScript

## Install & run example
```
// install
npm i -S 'js-pagination'

// run example
git clone https://github.com/rainjay/pagination.git
cd pagination
npm install
npm run dev
```

## Example demo
<a href="https://jsfiddle.net/rainjay/ktyptn74/" target="_blank">DEMO</a>

## Usage
```
require('js-pagination/dist/styles.css')
var Pagination = require('js-pagination')

// config
Pagination.config({
  ulClass: 'pagination',
  activeClass: 'active',
  ...
})

// use
var myPager = new Pagination(100, 15, function(page) {}, '.field')

myPager.getCurrentPage()
myPager.goToPage(num)

// html
<div class="field"></div>
```

## API

###  config attributes (optional)
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| ulClass | String | class name for page lists, default 'pagination'      |
| activeClass | String | class name for active page item, default 'active'|
| disableClass | String | disable class name for disabled item, default 'disabled'|
| dots | String | default '...'                                           |
| hideIfEmpty | Boolean | whether to hide paging if only have one page, default true|
|showPreNext| Bollean|whether show pre and next button, default true      |
| scrollTop   | Bollean | whether scroll to top after you select one page, default false            |
| scrollContainer| String | which container to scroll                     |
| adjacent | Number|the page amount before and after the current page, default 2|
| lang | 'cn' or 'en' | default 'cn'                                      |


### var pager = new Pagination(total, size, callback, fieldSelector)
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| total | Number | the total size of what you are displaying              |
| size | Number | size of each page, default 1                            |
| size | Number | size of each page, default 1                            |
|callback| Function | call back for page select operation                 |
|fieldSelector| String | the field u want to mount, exp: '.field'         |

### pager.goToPage(num)
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| num | Number |  the page num will go to                                 |

### pager.getCurrentPage()
