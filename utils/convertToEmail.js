const convertToEmail = str => {
    const convertedStr = str.toLowerCase().split(" ").join("-")
    return `${convertedStr}@email.com`
}

module.exports = convertToEmail
