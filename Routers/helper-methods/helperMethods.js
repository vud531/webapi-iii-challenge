export const sendError500Message = (res, message) => {
  res.status(500).json({
    message: message
  })
}

export const sendError404Message = (res, message) => {
  res.status(404).json({
    message: message
  })
}