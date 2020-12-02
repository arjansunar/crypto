const engletters = require("./getCharactersEng")
const devLetters = require("./getCharacters")
const letters = engletters + devLetters;
const Letters = letters.split('')
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
const shuffledLetters = shuffleArray(letters.split(''))
const map = new Map()
const reverseMap = new Map()
for (let i in Letters) {
    map.set(Letters[i], shuffledLetters[i])
    reverseMap.set(shuffledLetters[i], Letters[i])
}

module.exports = {
    map,
    reverseMap
}
