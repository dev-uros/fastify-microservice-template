import {FastifyError, FastifyPluginAsync} from "fastify";
import {
    generateTokenRequestSchema,
    GenerateTokenRequestSchemaType,
    generateTokenResponseSchema
} from "../schemas/generateTokenSchema.js";
import {badRequestResponseSchema} from "../../../schemas/badRequestSchema.js";
import {serverErrorResponseSchema} from "../../../schemas/serverErrorSchema.js";
import {entityNotFoundResponseSchema} from "../../../schemas/entityNotFoundSchema.js";

const authRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.route<{ Body: GenerateTokenRequestSchemaType }>({
        method: 'POST',
        url: '/generate-token',
        handler: async (request, reply) => {

            const user = await fastify.authRepository.find(request.body.name)

            if (!user) {
                const error = new Error() as FastifyError
                error.statusCode = 404
                error.message = 'User not found'
                throw error
            }

            const token = fastify.jwt.sign({
                id: user.id,
                name: user.name
            })

            return reply.send({
                message: 'Successfully authenticated',
                data: token
            });

        },
        schema: {
            body: generateTokenRequestSchema,
            tags: ['auth'],
            summary: 'Auth - generate JWT token',
            description: 'Generates token for user',
            consumes: ['application/json'],
            response: {
                200: generateTokenResponseSchema,
                400: badRequestResponseSchema,
                404: entityNotFoundResponseSchema,
                500: serverErrorResponseSchema
            }
        }
    })
}

export default authRoutes
