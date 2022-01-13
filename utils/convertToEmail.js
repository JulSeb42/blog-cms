const convertToEmail = str => {
    return `${str.toString().toLowerCase().replace(" ", "-")}@email.com`
}

module.exports = convertToEmail
