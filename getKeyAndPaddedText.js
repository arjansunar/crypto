const prompt = require("prompt-sync")();
const defaultKey = [
    ['p', 'l', 'a', 'y', 'f'],
    ['i', 'r', 'b', 'c', 'd'],
    ['e', 'g', 'h', 'k', 'm'],
    ['n', 'o', 'q', 's', 't'],
    ['u', 'v', 'w', 'x', 'z']
];
let skippedChar = 'j';


const createKey = (keyWord) => {
    const requiredCharacters = []
    const keys = [];
    let letters = 'abcdefghiklmnopqrstuvwxyz'
    for (let character of keyWord) {
        if (!requiredCharacters.includes(character)) {
            requiredCharacters.push(character)
        }
    }
    if (keyWord.includes('j')) {
        letters = letters.replace('i', '')
        skippedChar = 'i'
    }

    for (let character of letters) {
        if (!requiredCharacters.includes(character)) {
            requiredCharacters.push(character)
        }
    }

    for (let i = 0; i < requiredCharacters.length; i += 5) {
        keys.push(requiredCharacters.join('').substring(i, i + 5).split(''))
    }
    return keys;
}
const getPlayFairKey = () => {
    const promptKeyWord = prompt('Provide a keyword (y/n)? ')
    const newKeyword = promptKeyWord.charAt(0).toLowerCase()
    if (newKeyword === 'y') {
        const keyWord = prompt('keyword: ')
        return createKey(keyWord)
    } else if (newKeyword === 'n') {
        console.log("Default key: ", defaultKey)
        return defaultKey;
    } else {
        console.log("Enter y or n ")
    }
}

const getPaddedText = (plainText) => {
    const paddedText = [];
    for (let i = 0; i < plainText.length; i++) {
        if (i < plainText.length - 1 && plainText[i] === ' ') {
            paddedText.push(' ')
        }
        else if (plainText[i] === skippedChar) {
            paddedText.push(skippedChar)
        }
        else if (i < plainText.length - 1 && plainText[i] === plainText[i + 1]) {
            paddedText.push(plainText[i] + 'x')
        }
        else if (plainText[plainText.length - 1] === ' ' && plainText.length - 1 === i) {
            continue
        }
        else {
            if (plainText[i + 1] !== undefined) {
                if (plainText[i + 1] === ' ') {
                    paddedText.push(plainText[i] + 'x')
                    paddedText.push(' ')
                }
                else {
                    paddedText.push(plainText[i] + plainText[i + 1])
                }
            } else {
                paddedText.push(plainText[i] + 'x')
            }
            i++
        }
    }
    return paddedText
}
const key = getPlayFairKey();
// gets the index of the given character in the key 
const getIndexInKey = (character) => {
    const [index] = key.map((innerArr, row) => {
        if (innerArr.includes(character)) return [row, innerArr.indexOf(character)]
        else return null
    }).filter(arr => arr !== null)
    return index
}
module.exports = {
    key,
    getPaddedText,
    getIndexInKey,
    skippedChar

}
