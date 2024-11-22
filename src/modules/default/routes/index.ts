import {FastifyPluginAsync} from "fastify";

const defaultRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> =>
{
    fastify.get('/', (request, reply)=>{
        return reply.send({
            message: 'hi'
        })
    })
}
export default defaultRoutes;