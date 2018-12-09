import * as userService from '../services/user';

export default {
  Query: {
    me: (parent, args, { models, userId }) => {
      if (userId) {
        return models.User.findOne({ where: { id: userId }})
      } else {
        return null;
      }
    },
    allUsers: (parent, args, { models }) =>
      models.User.findAll(),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: {id} })
  },

  Mutation: {
    registerUser: (parent, { firstName, lastName, email, password }, { models }) =>
      userService.register(firstName, lastName, email, password),
    loginUser: (parent, { email, password }, { models }) =>
      userService.login(email, password),
    updateUser: (parent, { id, firstName, lastName, email, password }, { models }) =>
      models.User.update({ firstName, lastName, email, password }, { where: { id } }),
    deleteUser: (parent, { id }, { models }) =>
      models.User.destroy({ where: { id } })  
  }
}