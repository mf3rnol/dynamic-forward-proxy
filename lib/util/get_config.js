require('dotenv').config()

const path = require('path')

const rootPath = path.join(__dirname, '../../')

// TODO: Provide sane defaults
// TODO: Auto camel case
const {
  PROXY_LIST_PATH: proxyListPath,
  PROXY_LIST_DEFAULT_PROTOCOL: proxyListDefaultProtocol,

  LOG_LEVEL: logLevel,
  ERROR_TRACES: errorTraces,

  MAX_CONCURRENCY: maxConcurrency,
  REQ_BATCH_DELAY_MS: reqBatchDelayMS,
  REQ_TIMEOUT_MS: reqTimeoutMS,
  REQ_BATCH_SIZE: reqBatchSize,
  REQ_DELAY_MS: reqDelayMS,

  LATENCY_RATING_A_MS: latencyRatingAMS,
  LATENCY_RATING_B_MS: latencyRatingBMS,
  LATENCY_RATING_C_MS: latencyRatingCMS,
  LATENCY_RATING_D_MS: latencyRatingDMS,

  SERVER_PROXY_LIST_PATH: serverProxyListPath,
  SERVER_HOST: serverHost,
  SERVER_PORT: serverPort,

  TELEGRAM_BOT_TOKEN: telegramBotToken,

  DB_JSON_STORE_PATH: dbJSONStorePath,

  VSERVER_PROXY_SEED_LIST: vServerProxySeedList,
  VSERVER_PORT: vServerPort
} = process.env

const config = {
  proxyListPath,
  proxyListDefaultProtocol,
  logLevel,
  errorTraces,
  maxConcurrency,
  reqBatchDelayMS,
  reqTimeoutMS,
  reqBatchSize,
  reqDelayMS,
  latencyRatingAMS,
  latencyRatingBMS,
  latencyRatingCMS,
  latencyRatingDMS,
  serverProxyListPath,
  serverHost,
  serverPort,
  telegramBotToken,
  dbJSONStorePath,
  rootPath,
  vServerProxySeedList,
  vServerPort
}

const getConfig = (customConfig = {}) => ({
  ...config,
  ...customConfig
})

module.exports = getConfig
