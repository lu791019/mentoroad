// Import environment configuration if not skipping validation
!process.env.SKIP_ENV_VALIDATION && (await
    import ("./src/env.mjs"));

/** @type {import('next').NextConfig} */
const config = {
    // Enable strict mode for React
    reactStrictMode: true,

    // Minification using SWC
    swcMinify: true,

    // Internationalization settings
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    /* If trying out the experimental appDir, you can comment out i18n
     * @see https://github.com/vercel/next.js/issues/41980 */
};

// Correct export statement
export default config;