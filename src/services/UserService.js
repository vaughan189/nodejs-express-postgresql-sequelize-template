import database from "../models";

class UserService {
  static async getAllUsers() {
    try {
      return await database.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const UserToUpdate = await database.User.findOne({
        where: { id: Number(id) },
      });

      if (UserToUpdate) {
        await database.User.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const UserToDelete = await database.User.findOne({
        where: { id: Number(id) },
      });

      if (UserToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) },
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
