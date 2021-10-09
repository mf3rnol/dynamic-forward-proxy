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

## Members

<dl>
<dt><a href="#SERVER_PROTOCOLS">SERVER_PROTOCOLS</a> : <code><a href="#Enum">Enum</a></code></dt>
<dd><p>Valid server types for the proxy pool endpoint.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parse">parse(proxyString, protocol)</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#createServer">createServer(listenCB, config)</a> ⇒ <code>net.HTTP</code> | <code>net.HTTPS</code></dt>
<dd><p>Creates a new HTTP or HTTPS server instance, binding common listeners to
server events.</p>
</dd>
<dt><a href="#onClose">onClose(l, config)</a></dt>
<dd><p>Handler called when all server responses are completed and the socket is
closed.</p>
</dd>
<dt><a href="#onConnection">onConnection(l, socket)</a></dt>
<dd><p>Handler called for each new client connection.</p>
</dd>
<dt><a href="#onError">onError(err)</a></dt>
<dd><p>Server error event handler. Logs the error with verbosity as per the
<code>ServerConfig</code>.</p>
</dd>
<dt><a href="#onListening">onListening(l, config)</a></dt>
<dd><p>Handler called when the server is open on the specified host/port
and ready to receive connections. Any backlog&#39;ed requests are handled
prior to this event being fired.</p>
</dd>
<dt><a href="#createEnum">createEnum(values)</a> ⇒ <code><a href="#Enum">Enum</a></code></dt>
<dd><p>Returns a <strong>frozen</strong> object with the provided string values set as uppercase
keys mapped to unique numeric IDs. Entries are trimmed for whitespace.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ServerConfig">ServerConfig</a></dt>
<dd><p>Configuration for an HTTP or HTTPS server to serve the proxy pool endpoint.</p>
</dd>
<dt><a href="#Enum">Enum</a></dt>
<dd><p>Enum implementation; a frozen object with uppercase keys mapping to unique
numeric IDs.</p>
</dd>
</dl>

<a name="SERVER_PROTOCOLS"></a>

## SERVER\_PROTOCOLS : [<code>Enum</code>](#Enum)
Valid server types for the proxy pool endpoint.

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| HTTP | <code>string</code> | http server |
| HTTPS | <code>string</code> | https server |

<a name="parse"></a>

## parse(proxyString, protocol) ⇒ <code>object</code>
**Kind**: global function  
**Todo**

- [ ] add typedef for returned proxy [info] object


| Param | Type | Description |
| --- | --- | --- |
| proxyString | <code>string</code> | may include protocol as prefix |
| protocol | <code>string</code> | http, https, socks4, socks5 |

<a name="createServer"></a>

## createServer(listenCB, config) ⇒ <code>net.HTTP</code> \| <code>net.HTTPS</code>
Creates a new HTTP or HTTPS server instance, binding common listeners to
server events.

**Kind**: global function  
**Returns**: <code>net.HTTP</code> \| <code>net.HTTPS</code> - server  

| Param | Type | Description |
| --- | --- | --- |
| listenCB | <code>function</code> | passed to createServer() |
| config | [<code>ServerConfig</code>](#ServerConfig) | config |

<a name="onClose"></a>

## onClose(l, config)
Handler called when all server responses are completed and the socket is
closed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| l | <code>Signale</code> | logger instance |
| config | [<code>ServerConfig</code>](#ServerConfig) | server config |

<a name="onConnection"></a>

## onConnection(l, socket)
Handler called for each new client connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| l | <code>Signale</code> | logger instance |
| socket | <code>net.Socket</code> | client socket |

<a name="onError"></a>

## onError(err)
Server error event handler. Logs the error with verbosity as per the
`ServerConfig`.

**Kind**: global function  
**See**: {ServerConfig}  
**Todo**

- [ ] create `ServerConfig` typedef


| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | error |

<a name="onListening"></a>

## onListening(l, config)
Handler called when the server is open on the specified host/port
and ready to receive connections. Any backlog'ed requests are handled
prior to this event being fired.

**Kind**: global function  
**Todo**

- [ ] create Signale typedef


| Param | Type | Description |
| --- | --- | --- |
| l | <code>Signale</code> | loggger instance |
| config | [<code>ServerConfig</code>](#ServerConfig) | server config |

<a name="createEnum"></a>

## createEnum(values) ⇒ [<code>Enum</code>](#Enum)
Returns a **frozen** object with the provided string values set as uppercase
keys mapped to unique numeric IDs. Entries are trimmed for whitespace.

**Kind**: global function  
**Returns**: [<code>Enum</code>](#Enum) - e  
**Throws**:

- Error if passed a non-array or no values

**Todo**

- [ ] use custom error objects


| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;string&gt;</code> | e values, converted to uppercase keys on the   rseulting object |

<a name="ServerConfig"></a>

## ServerConfig
Configuration for an HTTP or HTTPS server to serve the proxy pool endpoint.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| protocol | <code>ServerProtocol</code> |  | server protocol |
| host | <code>string</code> |  | server hostname |
| port | <code>number</code> |  | server port |
| [backlog] | <code>number</code> | <code>1024</code> | number of requests the server   will store in a backlog prior to opening |
| [exclusive] | <code>boolean</code> | <code>true</code> | server port bind exclusivity |

<a name="Enum"></a>

## Enum
Enum implementation; a frozen object with uppercase keys mapping to unique
numeric IDs.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [size] | <code>number</code> | <code>2</code> | number of entries |
| toString | <code>function</code> |  | returns a string with all e keys |
| includes | <code>function</code> |  | takes a value and returns true if the e   contains it as an entry. |


