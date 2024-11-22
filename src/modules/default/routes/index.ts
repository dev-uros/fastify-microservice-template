import {FastifyPluginAsync} from "fastify";

const defaultRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> =>
{
    fastify.get('/', (request, reply)=>{
        return reply.send('HI')
    })
}
export default defaultRoutes;