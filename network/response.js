/*

In this file we form all the answers from the same file, in this way all the answers will be
coherent and have the same meaning

The states are numbers that indicate the status of the request:

[2XX Everything went well]
  200 ok
  201 created

[3XX The request has been redirected]
  301 moved permanently
  304 not modified

[4XX Customer errors]
  400 bad request
  401 unauthorized
  403 forbidden
  404 not found

[5XX There was an error processing the request]
  500 internal server error

*/

exports.success = (req, res, message, status) => {
  res.status(status || 200).send({
    data: message
  })
}

exports.error = (req, res, error, status, details) => {
  res.status(status || 500).send({
    error: error
  })
}