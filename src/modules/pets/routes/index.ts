import {FastifyPluginAsync} from "fastify";
import {indexResponseSchema} from "../schemas/indexSchema.js";
import {petShowParamSchema, petShowResponseSchema} from "../schemas/showSchema.js";
import {entityNotFoundResponseSchema} from "../../../schemas/entityNotFoundSchema.js";
import {badRequestResponseSchema} from "../../../schemas/badRequestSchema.js";

const petRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.route({
        url: '',
        method: 'GET',
        handler: async function (request, reply) {
            // try {

            const pets = await fastify.petRepository.index();
            return reply.send({
                message: 'Successfully retrieved pet lets',
                data: pets
            })
            // }catch (e) {s
            //     throw new Error(e);
            // }
        },
        schema: {
            tags: ['pets'],
            summary: 'Pet List',
            description: 'Returns list of all pets',
            response: {
                200: indexResponseSchema
            }
        }
    });

    fastify.route<{ Params: { id: number } }>({
        url: '/:id',

        method: 'GET',
        handler: async (request, reply) => {

            const pet = await fastify.petRepository.find(request.params.id);

            if (!pet) {
                return reply.code(404).send({message: 'Pet not found'})
            }

            return reply.send({
                message: 'Successfully shown pet',
                data: pet
            })
        },
        schema: {
            tags: ['pets'],
            summary: 'Show pet',
            description: 'Show pet details',
            consumes: ['application/json'],
            params: petShowParamSchema,
            response: {
                200: petShowResponseSchema,
                400: badRequestResponseSchema,
                404: entityNotFoundResponseSchema
                // 401: unauthenticatedSchema,
                // 422: failedValidationSchema,
                // 500: serverErrorSchema
            }
        }
    })

}
export default petRoutes;