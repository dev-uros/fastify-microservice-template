import {FastifyPluginAsync} from "fastify";
import {join} from "desm";
import AutoLoad from "@fastify/autoload";


const defaultDomain: FastifyPluginAsync = async (fastify, opts)=> {

    await fastify.register(AutoLoad, {
        dir: join(import.meta.url, 'routes'),
        options: {
            prefix: opts.prefix,
        },
        indexPattern: /index\.(js|ts)$/,
        ignorePattern: /.*\.js/,
        autoHooks: true,
        autoHooksPattern: /autohooks\.(js|ts)$/,
        cascadeHooks: true,
        forceESM: true,
        encapsulate: true
    })
}

export default defaultDomain;