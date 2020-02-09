# Appolo Decorators
[![Build Status](https://travis-ci.org/shmoop207/appolo-decorators.svg?branch=master)](https://travis-ci.org/shmoop207/appolo-decorators) [![Dependencies status](https://david-dm.org/shmoop207/appolo-decorators.svg)](https://david-dm.org/shmoop207/appolo-decorators) [![NPM version](https://badge.fury.io/js/appolo-decorators.svg)](https://badge.fury.io/js/appolo-decorators)  [![npm Downloads](https://img.shields.io/npm/dm/appolo-decorators.svg?style=flat)](https://www.npmjs.com/package/appolo-decorators)
[![Known Vulnerabilities](https://snyk.io/test/github/shmoop207/appolo-decorators/badge.svg)](https://snyk.io/test/github/shmoop207/appolo-decorators)

useful decorators
The cache will remove the oldest used item when reached max capacity 
## Installation:

```javascript
npm install appolo-decorators --save
```

### Delay
delay call method by given time in milliseconds
```javascript
import { delay } from 'appolo-decorators';

class SomeClass {
    @delay(1000)
    method() {
    // ...
    }
}
```

### Cache
cache method results using [`appolo-cache`](https://github.com/shmoop207/appolo-cache)

options:

- `maxSize` - max cache size default `1000`
- `maxAge` - optional set maximum age in ms of all cache items default unlimited
- `clone` - clone the cache result default `false`
- `interval` - set cache refresh interval
- `resolver` - function to get the cache key by default the fist argument will be used as the cache key
- `multi` - boolean if no resolver defined use all the arguments as key else use the first argument as key default `false`

- `peek` - boolean use `peek` method instead of get default `false`
- `refresh` - boolean refresh cache on half `maxAge` expire default `false`

```javascript
import { cache } from 'appolo-decorators';

class SomeClass {
    private counter = 0;

    @cache()
    method() {
       return ++this.counter
    }
}

let someClass = new SomeClass();
someClass.method() // 1
someClass.method()// 1

```

### Bind
bind method to class instance
```javascript
import { bind } from 'appolo-decorators';

class SomeClass {
    @bind
    method() {
    // ...
    }
}

document.body.addEventListener('click', new SomeClass().method);
```

### Debounce
debounce method using lodash [debounce](https://lodash.com/docs/4.17.10#debounce)
```javascript
import { debounce } from 'appolo-decorators';

class SomeClass {
    @debounce(1000,{trailing:true})
    method() {
    // ...
    }
}
```

### Throttle
throttle method using lodash [debounce](https://lodash.com/docs/4.17.10#throttle)
```javascript
import { throttle } from 'appolo-decorators';

class SomeClass {
    @throttle(1000,{trailing:true})
    method() {
    // ...
    }
}
```

### Memoize
memoize method using lodash [debounce](https://lodash.com/docs/4.17.10#memoize)
```javascript
import { memoize } from 'appolo-decorators';

class SomeClass {
    @memoize()
    method() {
    // ...
    }
}
```

### Once
method will be called max n times and return last call result
```javascript
import { once } from 'appolo-decorators';

class SomeClass {
    @once(2)
    method() {
    // ...
    }
}
```



### Interval
set interval to method once called
```javascript
import { interval } from 'appolo-decorators';

class SomeClass {
    @interval(100)
    method() {
    // ...
    }
}
//start the interval
new SomeClass().method()
```

### Mixins
add prototype to class
```javascript
import { mixins } from 'appolo-decorators';

@mixins(EventDispacher)
class SomeClass {

    method() {
    // ...
    }
}
new SomeClass().on("some event")
```
## License
MIT
