/** 
 * Copyright (c) 2026 Nakoya Software 
 * https://nakoyasoftware.com/
 */

const mainlib = (() => {
    "use strict";

    const API = (() => {
        "use strict";

        class Client {
            /**
             * Create a new API client instance.
             * 
             * @param {string} [host='https://api.nakoyasoftware.com/v1/']
             * @throws {TypeError}
             * @throws {Error}
             */
            constructor(host = "https://api.nakoyasoftware.com/v1/") {
                if (typeof host !== 'string') {
                    throw new TypeError(`host must be a string, but got ${typeof host}`);
                }

                let parsedUrl;
                try {
                    parsedUrl = new URL(host);
                } catch (err) {
                    throw new TypeError(`host must be a valid URL, but received: "${host}"`);
                }

                if (parsedUrl.protocol !== 'https:') {
                    throw new Error(`Security Violation: host must use the HTTPS protocol, but got "${parsedUrl.protocol}"`);
                }

                this.host = host.replace(/\/+$/, "") + "/";
            }

            /**
             * Appends a relative path to the base host URL cleanly.
             * 
             * @param {string} [path=''] 
             * @returns {string}
             * @throws {TypeError}
             */
            url(path = '') {
                if (typeof path !== 'string') {
                    throw new TypeError(`path must be a string, but got ${typeof path}`);
                }

                const cleanPath = path.replace(/^\/+/, "");

                return this.host + cleanPath;
            }

            /**
             * A helper method to perform GET requests easily using your custom wrapper.
             * 
             * @param {string} endpoint
             * @param {Object} [options={}]
             * @returns {Promise<Object>}
             */
            async get(endpoint, options = {}) {
                const targetUrl = this.url(endpoint);

                try {
                    const response = await fetch(targetUrl, {
                        method: 'GET',
                        ...options,
                        headers: {
                            "Content-Type": "application/json",
                            ...(options.headers || {})
                        }
                    });

                    return await response.json();
                } catch (err) {
                    console.error(`Nakoya API Fetch Failed for ${targetUrl}:`, err);
                    throw err;
                }
            }
        }

        return {
            Client
        };
    })();

    return {
        API
    };
})();