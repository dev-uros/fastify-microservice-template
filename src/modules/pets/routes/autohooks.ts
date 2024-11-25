import {FastifyPluginAsync} from "fastify";

const defaultRouteAutoHooks: FastifyPluginAsync = async (fastify)=>{
    fastify.log.info('Hello from auto hook')
}

export default defaultRouteAutoHooks;