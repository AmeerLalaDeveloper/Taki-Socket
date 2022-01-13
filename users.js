const users = []

const addUser = ({ id, username, name, room, level, points, img, numberOfPlayers }) => {
    const numberOfUsersInRoom = users.filter(user => user.room === room).length
    if (name === null)
        return { error: 'User Does not Exist' }
    if (numberOfUsersInRoom === numberOfPlayers)
        return { error: 'Room full' }

    const newUser = { id, username, name, room, level, points, img }
    users.push(newUser)
    return { newUser }
}

const removeUser = id => {
    const removeIndex = users.findIndex(user => user.id === id)

    if (removeIndex !== -1)
        return users.splice(removeIndex, 1)[0]
}

const getUser = id => {
    return users.find(user => user.id === id)
}

const getUsersInRoom = room => {
    return users.filter(user => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }