import {FastifyPluginAsync} from "fastify";

const defaultRouteAutoHooks: FastifyPluginAsync = async (fastify)=>{
    fastify.log.info('Hello from auto hook')
    fastify.addHook('onRequest', async (request, reply) => {

        await fastify.authenticate(request, reply);
    })
}

export default defaultRouteAutoHooks;