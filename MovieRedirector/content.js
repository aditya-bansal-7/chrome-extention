// Function to generate the link
function zdiskLink(botid, chat, uid_type, uid) {
    let chat_type;
    if (chat === "b") {
        chat = botid;
        chat_type = "b";
    } else {
        chat_type = "g";
    }
    return `https://zdisk.xyz/m?=${chat_type}${chat}/${uid_type}/${decryptUid(uid)}`;
}

// Function to shift each letter in uid down by 2
function decryptUid(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-zA-Z]/.test(char)) { // Check if character is a letter
            let shift = -2;
            let start = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);

            // Shift the character and wrap around if necessary
            result += String.fromCharCode((char.charCodeAt(0) - start + shift + 26) % 26 + start);
        } else {
            // Non-alphabet characters are added without decryption
            result += char;
        }
    }
    return result;
}

// Function to parse parameters from the current page URL
function parseParams(url) {
    const urlParts = url.split("/").slice(-7);
    const botid = parseInt(urlParts[0]);
    const chat = urlParts[1];
    const user = urlParts[2];
    const sdom = urlParts[3];
    const sapi = urlParts[4];
    const uid_type = urlParts[5];
    const uid = urlParts[6];

    return { botid, chat, user, sdom, sapi, uid_type, uid };
}

// Main function to run in content.js
function main() {
    // Get the current page URL
    const currentUrl = window.location.href;

    // Parse URL parameters
    const params = parseParams(currentUrl);

    // Generate the link
    const generatedLink = zdiskLink(params.botid, params.chat, params.uid_type, params.uid);

    // Open the link in a new tab
    window.location.href = generatedLink;
}

// Check if we're on the correct domain and not already on the generated link path
if (window.location.hostname === "zdisk.xyz" && !window.location.pathname.startsWith("/m")) {
    main();
}
