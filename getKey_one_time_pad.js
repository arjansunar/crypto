const letters_otp = 'abcdefghijklmnopqrstuvwxyz'.split('')

const generateRandomString = (length) => {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = {
    generateRandomString,
    letters_otp
}