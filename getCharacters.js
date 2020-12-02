const devLetters = () => {
    const devStringArr = [];
    for (let i = 0; i < 128; i++) {
        devStringArr.push(String.fromCharCode(2304 + i))
    }
    devStringArr.push(' ')
    return devStringArr.join('')
}
module.exports = devLetters();