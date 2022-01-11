// Generate random avatar
const randomAvatar = gender => {
    const random = Math.floor(Math.random() * 114)
    const randomMf = Math.floor(Math.random() + 0.5)
    const mf = ["male", "female"]

    const genderPicture =
        gender === "male"
            ? "male"
            : gender === "female"
            ? "female"
            : mf[randomMf]

    return `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/${genderPicture}/${random}.png`
}

module.exports = randomAvatar
