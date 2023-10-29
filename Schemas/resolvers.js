const { UserList } = require("../FakeData");
const lodas = require("lodash");

const resolvers = {
  Query: {
    AllTheUsers() {
      return UserList;
    },
    user: (_, args) => {
      const givenID = args.id;
      const user = lodas.find(UserList, { id: Number(givenID) });
      return user;
    },
  },
  Mutation: {
    createUser: (_, args) => {
      args.input.id = UserList[UserList.length - 1].id + 1;
      UserList.push(args.input);
      return args.input;
    },
    updateUsername: (_, args) => {
      const { id, newUsername } = args.input;
      const userIndex = UserList.findIndex((user) => user.id === Number(id));

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      UserList[userIndex].username = newUsername;
      return UserList[userIndex];
    },
    deleteUser: (_, args) => {
      lodas.remove(UserList, (user) => user.id === Number(args.id));
      return null;
    },
  },
};

module.exports = { resolvers };
