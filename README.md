# proxy-evaluator

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

> WIP

CLI utility that evaluates one or multiple proxy sources, either as plain text
files or JSON arrays. Each proxy is verified for latency, security, location,
and various other characteristics.

If desired, an `http` or `https` server is spawned acting as an intelligent
proxy pool for incoming requests on a single endpoint.

### [Installation](#installation)
![npm badge](https://nodei.co/npm/proxy-evaluator.png?downloads=true&downloadRank=true&stars=true)

```bash
npm i -g proxy-evaluator
```

### [Developing](#developing)

```bash
npm run gen-readme // update README.md
npm run docs // update DOCUMENTATION.md
npm run test // lint & mocha
npm run update-deps // bump all deps

npm run start
```

#### Updating the GeoIP Lite DB

If desired, the included GeoIP lite database may e updated via:

```bash
npm run update-geoip-db
```

### [Release History](#release_history)

See *[CHANGELOG.md](CHANGELOG.md)* for more information.

### [License](#license)

Distributed under the **MIT** license. See [LICENSE.md](LICENSE.md) for more information.

### [Contributing](#contributing)

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

---

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/proxy-evaluator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/proxy-evaluator
[npm-downloads]: https://img.shields.io/npm/dm/proxy-evaluator.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/mf3rnol/proxy-evaluator/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mf3rnol/proxy-evaluator

---

## [API Reference](#api_reference)

> The standalone JSDoc reference can be found in [DOCUMENTATION.md](DOCUMENTATION.md)

<a name="parse"></a>

## parse(proxyString, protocol) ⇒ <code>object</code>
**Kind**: global function  
**Todo**

- [ ] add typedef for returned proxy [info] object


| Param | Type | Description |
| --- | --- | --- |
| proxyString | <code>string</code> | may include protocol as prefix |
| protocol | <code>string</code> | http, https, socks4, socks5 |


