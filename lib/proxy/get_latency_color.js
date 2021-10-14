const colors = require('colors')

const {
  LATENCY_RATING_A_MS: latencyAMS,
  LATENCY_RATING_B_MS: latencyBMS,
  LATENCY_RATING_C_MS: latencyCMS,
  LATENCY_RATING_D_MS: latencyDMS
} = process.env

const latencyAColor = colors.green
const latencyBColor = colors.yellow
const latencyCColor = colors.orange
const latencyDColor = colors.red
const latencyCutoffColor = colors.red.strikethrough

const getLatencyColor = (latency) => {
  if (latency <= latencyAMS) {
    return latencyAColor
  } else if (latency <= latencyBMS) {
    return latencyBColor
  } else if (latency <= latencyCMS) {
    return latencyCColor
  } else if (latency <= latencyDMS) {
    return latencyDColor
  }

  return latencyCutoffColor
}

module.exports = getLatencyColor
