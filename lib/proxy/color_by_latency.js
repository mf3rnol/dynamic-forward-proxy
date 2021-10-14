const getLatencyColor = require('./get_latency_color')

const colorByLatency = (latency, str) => {
  const colorFunc = getLatencyColor(latency)

  return colorFunc(str)
}

module.exports = colorByLatency
