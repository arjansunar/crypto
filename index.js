const engletters = require("./getCharactersEng")
const devLetters = require("./getCharacters")
const letters = engletters + devLetters
const { map, reverseMap } = require("./getMapTable")
const { getPaddedText, key, getIndexInKey, skippedChar } = require("./getKeyAndPaddedText");

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
const playFair_encrypt = (plainText) => {
    console.log("key:", key)
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
            const [currentRow, currentColumn] = getIndexInKey(digram[0])
            const [nextRow, nextColumn] = getIndexInKey(digram[1])
            // same row
            if (currentRow === nextRow)
                cipher.push(key[currentRow][(currentColumn + 1) % 5] + key[nextRow][(nextColumn + 1) % 5])
            // same column
            else if (currentColumn === nextColumn)
                cipher.push(key[(currentRow + 1) % 5][currentColumn] + key[(nextRow + 1) % 5][nextColumn])
            // different places
            else
                cipher.push(key[currentRow][nextColumn] + key[nextRow][currentColumn])
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
            const [currentRow, currentColumn] = getIndexInKey(digram[0])
            const [nextRow, nextColumn] = getIndexInKey(digram[1])
            // same row
            if (currentRow === nextRow) {
                const secondCharacter = key[nextRow][(nextColumn - 1 + 5) % 5];
                if (secondCharacter !== "x")
                    plainText.push(key[currentRow][(currentColumn - 1 + 5) % 5] + key[nextRow][(nextColumn - 1 + 5) % 5])
                else
                    plainText.push(key[currentRow][currentColumn + 1])
            }
            // same column
            else if (currentColumn === nextColumn) {
                const secondCharacter = key[(nextRow - 1 + 5) % 5][nextColumn];
                if (secondCharacter !== "x")
                    plainText.push(key[(currentRow - 1 + 5) % 5][currentColumn] + key[(nextRow - 1 + 5) % 5][nextColumn])
                else
                    plainText.push(key[(currentRow - 1)][currentColumn])
            }
            // different places
            else {

                const secondCharacter = key[nextRow][currentColumn];
                if (secondCharacter !== "x")
                    plainText.push(key[currentRow][nextColumn] + key[nextRow][currentColumn])
                else
                    plainText.push(key[currentRow][nextColumn])
            }
        }
    }
    return plainText.join("")
}

module.exports = {
    caesar_encrypt,
    caesar_decrypt,
    mono_encrypt,
    mono_decrypt,
    map,
    reverseMap,
    playFair_encrypt,
    playFair_decrypt
}