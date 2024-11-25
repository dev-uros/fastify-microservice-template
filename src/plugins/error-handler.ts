import { FastifyError } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.info('TU SAM')
    this.log.info(error.statusCode)
    this.log.info(error.message)
    this.log.info(error)
    let errorObject
    switch (error.statusCode) {
      case 400:
        errorObject = handleBadRequestError(error)
        return reply.code(400).send(errorObject)
      case 404:
        errorObject = handleEntityNotFoundError(error)
        return reply.code(404).send(errorObject)
      default:
        errorObject = handleServerError()
        return reply.code(500).send(errorObject)
    }
  })

  function handleBadRequestError(error: FastifyError): {
    path: string
    requestPart: string
    message: string
  } {
    // Split the input string into two parts: the part before the space and the part after
    const [path, ...messageParts] = error.message.split(' ')

    // Further split the `path` into `requestPart` and `requestData`
    const [requestPart] = path.split('/')

    // Join the rest of the parts to form the message
    const message = messageParts.join(' ')

    return {
      path,
      requestPart,
      message
    }
  }

  function handleEntityNotFoundError(error: FastifyError): { message: string } {
    return {
      message: error.message
    }
  }

  function handleServerError(): { message: string } {
    return {
      message: 'Server Error'
    }
  }
})
