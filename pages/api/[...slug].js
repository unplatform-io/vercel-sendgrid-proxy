import { createProxyMiddleware } from 'http-proxy-middleware';

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
    //logLevel: 'debug',
    target: 'https://sendgrid.net',
    changeOrigin: true,
    pathRewrite: { [`^/api`]: '' },
    xfwd: true,
});

export default function (req, res) {
    apiProxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }

        throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
    });
};

export const config = {
    api: {
        // - https://nextjs.org/docs/api-routes/api-middlewares#custom-config
        externalResolver: true,
        bodyParser: false, // not to use url encoded form like streaming POST request
    },
}
