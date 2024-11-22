import closeWithGrace from "close-with-grace";

import app from "./app.js";


await app.listen({ port: 3000, host: '0.0.0.0'})

closeWithGrace(async ({ err }) => {
    if (err) {
        app.log.error({ err }, 'server closing due to error')
    }
    app.log.info('shutting down gracefully')
    await app.close()
})

