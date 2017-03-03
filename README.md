# js-pagination
pagination implemented in pure JavaScript

## Install
```
npm i -S 'js-pagination'
```

## Example
```
npm install
npm run dev
```

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

###  config attributes
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| ulClass | String | class name for page lists                            |
| activeClass | String | class name for active page item                  |
| disableClass | String | disable class name for disabled item            |
| dots | String | default '...'                                           |
| hideIfEmpty | Boolean | whether to hide paging if only have one page, default true                                    |
|showPreNext| Bollean|whether show pre and next button, default true      |
| scrollTop   | Bollean | whether scroll to top after you select one page, default false            |
| scrollContainer| String | which container to scroll                     |
| adjacent | Number|the page amount before and after the current page, default 2|
| lang | 'cn' or 'en' | default 'cn'                                      |


### var pager = new Pagination(total, size, callback, fieldSelector)
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| total | Number | the total size of what you are displaying              |
| size | Number | size of each page                                       |
| size | Number | size of each page                                       |
|callback| Function | call back for page select operation                 |
|fieldSelector| String | the field u want to mount, exp: '.field'         |

### pager.goToPage(num)
| key | Type | Details                                                    |
| :----- | :----: | :-------:                                             |
| num | Number |  the page num will go to                                 |

### pager.getCurrentPage()
