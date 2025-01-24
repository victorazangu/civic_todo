const crypto = require("crypto");
const fs = require("fs");
function genKeyPair() {
    try {
        if (fs.existsSync(__dirname + '/public.pem') && fs.existsSync(__dirname + '/private.pem')) {
            console.log("Keys already exist. Skipping key generation.");
            return;
        }
        const keyPair = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        });
        fs.writeFileSync(__dirname + "/public.pem", keyPair.publicKey);
        fs.writeFileSync(__dirname + "/private.pem", keyPair.privateKey);
        console.log("Key pair generated successfully.");
    } catch (error) {
        console.error("Error generating private and pubic keys", error.message);
    }
}

genKeyPair();




