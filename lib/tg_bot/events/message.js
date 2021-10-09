const onMessage = (data, metadat) => {
  // const { id, fromID, message, post, pinned } = data

  console.log(JSON.stringify(data, null, 2))
  console.log(JSON.stringify(metadata, null, 2))
}

module.exports = onMessage
