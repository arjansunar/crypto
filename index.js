const engletters = require("./getCharactersEng")
const devLetters = require("./getCharacters")
const letters = engletters + devLetters
const { map, reverseMap } = require("./getMapTable")

const caesar_encrypt = (plainText, key) => {
    const cipher = [];
    for (let l of plainText) {
        const cipherChar = (letters.indexOf(l) + key) % letters.length;
        cipher.push(letters.charAt(cipherChar))
    }
    return cipher.join('')
}
const caesar_decrypt = (cipherText, key) => {
    const plainText = [];
    for (let c of cipherText) {
        const plainChar = (letters.indexOf(c) - key) % letters.length;
        plainText.push(letters.charAt(plainChar))
    }
    return plainText.join('')
}
const mono_encrypt = (plainText, map) => {
    const cipher = [];
    for (let l of plainText) {
        const cipherChar = map.get(l);
        cipher.push(cipherChar)
    }
    return cipher.join('')
}
const mono_decrypt = (cipherText, reverseMap) => {
    const plainText = [];
    for (let c of cipherText) {
        const plainChar = reverseMap.get(c);
        plainText.push(plainChar)
    }
    return plainText.join('')
}
module.exports = {
    caesar_encrypt,
    caesar_decrypt,
    mono_encrypt,
    mono_decrypt,
    map,
    reverseMap
}