import database from '../models';

class UserService {
  static async getAllUsers() {
    const allUsers = await database.User.findAll();
    return allUsers;
  }

  static async addUser(newUser) {
    const addUser = await database.User.create(newUser);
    return addUser;
  }

  static async updateUser(id, updateUser) {
    const UserToUpdate = await database.User.findOne({
      where: { id: Number(id) }
    });
    if (UserToUpdate) {
      await database.User.update(updateUser, { where: { id: Number(id) } });
      return updateUser;
    }
    return null;
  }

  static async getAUser(id) {
    const theUser = await database.User.findOne({
      where: { id: Number(id) }
    });
    return theUser;
  }

  static async deleteUser(id) {
    const UserToDelete = await database.User.findOne({
      where: { id: Number(id) }
    });

    if (UserToDelete) {
      const deletedUser = await database.User.destroy({
        where: { id: Number(id) }
      });
      return deletedUser;
    }
    return null;
  }
}

export default UserService;
