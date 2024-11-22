import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
    fastify.setErrorHandler(function (error, request, reply) {
        // Log error
        this.log.error(error)
        this.log.info('NE RADIM')
        return reply.send({
            message: 'ne radi',
            requestId: request.id,
        });
    })
})
