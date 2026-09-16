/** 
 * Copyright (c) 2026 Nakoya Software 
 * https://nakoyasoftware.com/
 */

const webconf = (() => {
    "use strict";

    class APIResponse {
        /**
         * Create a new APIResponse
         * 
         * @param {boolean} success
         * @param {message} message
         */
        constructor(success, message = "") {
            this.success = success;
            this.message = message;
        }
    }

    class API {
        /**
         * Get raw JSON response from server
         * 
         * @param {string} path
         * @param {string} method
         * @param {object} input
         * @returns {Promise<APIResponse>}
         */
        async getRaw(path, method, input) {
            try {
                const result = await fetch(path, {
                    method: method,
                    body: JSON.stringify(input)
                });

                if (!result) {
                    throw new Error("Fetch result was invalid.");
                }
            } catch (err) {
                return new APIResponse(false, err.stack);
            }
        }
    }
})();