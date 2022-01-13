const friends = []

const addFriend = ({ id, username, level, coins, img, wins, lose }) => {
    // const numberOfUsersInRoom = friends.filter(user => user.room === room).length
    // if (username === null)
    //     return { error: 'User Does not Exist' }
    // if (numberOfUsersInRoom === 2)
    //     return { error: 'Room full' }

    const newFriend = { id, username, level, coins, img, wins, lose }
    friends.push(newFriend)
    return { newFriend }
}

// const removeUser = id => {
//     const removeIndex = friends.findIndex(user => user.id === id)

//     if (removeIndex !== -1)
//         return friends.splice(removeIndex, 1)[0]
// }

const getFriendByName = username => {
    return friends.find(user => user.username === username)
    // }

    // const getUsersInRoom = room => {
    //     return friends.filter(user => user.room === room)
    // }
}
const getAllFriends = () => friends
const doesFriendExist = (name) => friends?.some(friend => friend.username === name)
const removeFriend = (username) => {
    const removeIndex = friends.findIndex(user => user.username === username)

    if (removeIndex !== -1)
        return friends.splice(removeIndex, 1)[0]
}
module.exports = { addFriend, getFriendByName, getAllFriends, doesFriendExist, removeFriend }