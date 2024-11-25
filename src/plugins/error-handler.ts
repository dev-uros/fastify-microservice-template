import fp from 'fastify-plugin'

export default fp(async (fastify, opts) => {
    fastify.setErrorHandler(function (error, request, reply) {
        // Log error
        this.log.info('TU SAM')
        this.log.info(error.statusCode)
        this.log.info(error.message);
        if(error.statusCode === 400){
            // Split the input string into two parts: the part before the space and the part after
            const [path, ...messageParts] = error.message.split(' ');

            // Further split the `path` into `requestPart` and `requestData`
            const [requestPart, requestData] = path.split('/');

            // Join the rest of the parts to form the message
            const message = messageParts.join(' ');

            return reply.code(400)
                .send({
                    path,
                    requestPart,
                    message
                })
        }
        // this.log.info('NE RADIM')
        return reply.send({
            message: 'ne radi',
            data: request.id
        });
    })
})
