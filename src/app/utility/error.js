'use strict'

function sanitizeErrorMessage (message) {
  return message.toString().replace(/"/g, "'").replace(/\n/g, ' ')
}

/**
 * Error class for invalid inputs from server
 * @class ServerConfigError
 *
 */
class ServerConfigError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    message = message ? sanitizeErrorMessage(message.toString()) : 'Invalid or incomplete app configuration in Aquera admin console.'

    this.name = 'InvalidInput'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '500',
      errorType: 'invalidValue',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for invalid inputs from client
 * @class ValidationError
 *
 */
class ValidationError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    message = message ? sanitizeErrorMessage(message.toString()) : 'Invalid inputs.'

    this.name = 'InvalidInput'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '400',
      errorType: 'invalidValue',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for invalid inputs from client
 * @class UnsupportedFilterError
 *
 */
class UnsupportedFilterError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    message = message ? sanitizeErrorMessage(message.toString()) : 'Invalid/Unsupported filter.'

    this.name = 'InvalidFilter'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '400',
      errorType: 'invalidFilter',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for ResourceNotFoundError
 * @class ResourceNotFoundError
 *
 */
class ResourceNotFoundError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      // message is supposed to the be the id that could not be found.
      // if it includes " ", then it is assumed that the message contains different message
      if (message.includes(' ')) {
        message = sanitizeErrorMessage(message)
      } else {
        message = `Resource ${message} is not found`
      }
    } else {
      message = 'Resource does not exist.'
    }

    this.name = 'ResourceNotFound'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '404',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for sending too many request from client
 * @class TooManyRequestError
 *
 */
class TooManyRequestsError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    message = message ? sanitizeErrorMessage(message.toString()) : 'Too Many Requests.'

    this.name = 'RateLimit'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '429',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for ResourceConflictError
 * @class ResourceConflictError
 *
 */
class ResourceConflictError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      // message is supposed to the be the userName that caused the conflict.
      // if it includes " ", then it is assumed that the message contains different message
      if (message.includes(' ')) {
        message = sanitizeErrorMessage(message)
      } else {
        message = `Resource ${message} already exists`
      }
    } else {
      message = '[Resource] already exists.'
    }

    this.name = 'ResourceConflict'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '409',
      errorType: 'uniqueness',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for authorized access
 * @class UnauthorizedError
 *
 */
class UnauthorizedError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
      if (!message.toLowerCase().startsWith('invalid')) {
        message = 'Invalid Credentials. ' + message
      }
    } else {
      message = 'Invalid Credentials'
    }

    this.name = 'Unauthorized'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '401',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for Forbidden
 * @class Forbidden
 *
 */
class ForbiddenError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'Service account configured does not have sufficient permissions to perform this operation'
    }

    this.name = 'Forbidden'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '403',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for InternalServerError
 * @class InternalServerError
 *
 */
class InternalServerError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'Internal Server Error'
    }

    this.name = 'InternalServerError'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '500',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for NotImplementedError
 * @class NotImplementedError
 *
 */
class NotImplementedError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'This application does not support the functionality required to fulfill the request.'
    }

    this.name = 'NotImplemented'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '501',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for BadGatewayError
 * @class BadGatewayError
 *
 */
class BadGatewayError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'Upstream application did not respond due to temporary breakdown or maintenance schedule. Retry after few hours.'
    }

    this.name = 'BadGateway'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '502',
      detail: message
    }
  }

  // the current node utils version reads error from statusCode and value.
  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for GatewayTimeout
 * @class GatewayTimeoutError
 *
 */
class GatewayTimeoutError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'Request made to the upstream application timed out. Retry after sometime.'
    }

    this.name = 'GatewayTimeout'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '504',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

/**
 * Error class for Rate Limit
 * @class RateLimitError
 *
 */
class RateLimitError extends Error {
  constructor (message, ...params) {
    super(...params)

    Error.captureStackTrace(this, this.constructor.name)

    if (message) {
      message = message.toString()
      message = sanitizeErrorMessage(message)
    } else {
      message = 'Rate limit exceeded. Retry the operation after sometime.'
    }

    this.name = 'GatewayTimeout'
    this.date = new Date().getTime()

    this.errorObject = {
      status: '429',
      detail: message
    }
  }

  getErrorObject () {
    return {
      statusCode: this.errorObject.status,
      value: this.errorObject,
      status: this.errorObject.status,
      response: this.errorObject
    }
  }
}

const errorHandler = (res, error) => {
  if (error.errorObject?.status) { // meaning it is a custom error defined here
    res.status(error.errorObject?.status).send(error)
    return
  }
  res.status(500).send(new InternalServerError(error))
}

module.exports = {
  ServerConfigError,
  ValidationError,
  UnsupportedFilterError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
  ResourceNotFoundError,
  ResourceConflictError,
  NotImplementedError,
  BadGatewayError,
  GatewayTimeoutError,
  RateLimitError,
  TooManyRequestsError,
  errorHandler
}
