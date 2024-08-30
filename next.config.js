module.exports = {
    images: {
        domains: [
            "via.placeholder.com",
            "cdn.dummyjson.com",
            "dummyimage.com",
            "octagon.test",
            "back-office.bulky.id",
            "localhost",
            "192.168.1.11",
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
            {
                protocol: "https",
                hostname: "back-office.bulky.id",
            },
            {
                protocol: "https",
                hostname: "localhost",
            },
        ],
    },
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}
