const engletters = require("./getCharactersEng")
const devLetters = require("./getCharacters")
const letters = engletters + devLetters
const { map, reverseMap } = require("./getMapTable")
const { getPaddedText, getPlayFairKey, getIndexInKey, skippedChar } = require("./getKeyAndPaddedText");
const { generateRandomString, letters_otp } = require("./getKey_one_time_pad")

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
const playfairKey = getPlayFairKey();
const playFair_encrypt = (plainText) => {
    console.log("playfairKey:", playfairKey)
    console.log("escapes character:", skippedChar)
    plainText = plainText.toLowerCase()
    const cipher = []
    const paddedText = getPaddedText(plainText)
    for (let digram of paddedText) {
        if (digram === ' ') cipher.push(' ')
        else if (digram.includes(skippedChar)) {
            cipher.push(skippedChar)
        }
        else {
            const [currentRow, currentColumn] = getIndexInKey(digram[0], playfairKey)
            const [nextRow, nextColumn] = getIndexInKey(digram[1], playfairKey)
            // same row
            if (currentRow === nextRow)
                cipher.push(playfairKey[currentRow][(currentColumn + 1) % 5] + playfairKey[nextRow][(nextColumn + 1) % 5])
            // same column
            else if (currentColumn === nextColumn)
                cipher.push(playfairKey[(currentRow + 1) % 5][currentColumn] + playfairKey[(nextRow + 1) % 5][nextColumn])
            // different places
            else
                cipher.push(playfairKey[currentRow][nextColumn] + playfairKey[nextRow][currentColumn])
        }
    }
    return cipher.join("")
}
const playFair_decrypt = (cipherText) => {
    const plainText = []
    const paddedText = getPaddedText(cipherText)
    console.log("padded text:", paddedText)
    for (let digram of paddedText) {
        if (digram === ' ') plainText.push(' ')
        else if (digram.includes(skippedChar)) {
            plainText.push(skippedChar)
        }
        else {
            const [currentRow, currentColumn] = getIndexInKey(digram[0], playfairKey)
            const [nextRow, nextColumn] = getIndexInKey(digram[1], playfairKey)
            // same row
            if (currentRow === nextRow) {
                const secondCharacter = playfairKey[nextRow][(nextColumn - 1 + 5) % 5];
                if (secondCharacter !== "x")
                    plainText.push(playfairKey[currentRow][(currentColumn - 1 + 5) % 5] + playfairKey[nextRow][(nextColumn - 1 + 5) % 5])
                else
                    plainText.push(playfairKey[currentRow][currentColumn + 1])
            }
            // same column
            else if (currentColumn === nextColumn) {
                const secondCharacter = playfairKey[(nextRow - 1 + 5) % 5][nextColumn];
                if (secondCharacter !== "x")
                    plainText.push(playfairKey[(currentRow - 1 + 5) % 5][currentColumn] + playfairKey[(nextRow - 1 + 5) % 5][nextColumn])
                else
                    plainText.push(playfairKey[(currentRow - 1)][currentColumn])
            }
            // different places
            else {

                const secondCharacter = playfairKey[nextRow][currentColumn];
                if (secondCharacter !== "x")
                    plainText.push(playfairKey[currentRow][nextColumn] + playfairKey[nextRow][currentColumn])
                else
                    plainText.push(playfairKey[currentRow][nextColumn])
            }
        }
    }
    return plainText.join("")
}
let one_time_pad_key;
const one_time_pad_encrypt = (plainText) => {
    let cipher = []
    one_time_pad_key = generateRandomString(plainText.length)
    for (let index in plainText) {
        if (plainText[index] === ' ' || plainText[index] === '.' || plainText[index] === ',') {
            cipher.push(plainText[index])
            continue
        }
        cipher.push(letters_otp[(letters_otp.indexOf(plainText[index]) + letters_otp.indexOf(one_time_pad_key[index])) % 26])
    }
    return cipher.join('')
}
const one_time_pad_decrypt = (cipherText) => {
    let plainText = []
    for (let index in cipherText) {
        if (cipherText[index] === ' ' || cipherText[index] === '.' || cipherText[index] === ',') {
            plainText.push(cipherText[index])
            continue
        }
        plainText.push(letters_otp[(letters_otp.indexOf(cipherText[index]) - letters_otp.indexOf(one_time_pad_key[index]) + 26) % 26])
    }
    return plainText.join('')
}


module.exports = {
    caesar_encrypt,
    caesar_decrypt,
    mono_encrypt,
    mono_decrypt,
    map,
    reverseMap,
    playFair_encrypt,
    playFair_decrypt,
    one_time_pad_encrypt,
    one_time_pad_decrypt

}