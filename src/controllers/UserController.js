import { HTTP_CODES, NUMBERS } from '../constants';
import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > NUMBERS.ZERO) {
        util.setSuccess(HTTP_CODES.OK, 'Users retrieved', allUsers);
      } else {
        util.setSuccess(HTTP_CODES.OK, 'No User found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(HTTP_CODES.BAD_REQUEST, error);
      return util.send(res);
    }
  }

  static async addUser(req, res) {
    // if (!req.body.title || !req.body.price || !req.body.description) {
    //   util.setError(HTTP_CODES.BAD_REQUEST, "Please provide complete details");
    //   return util.send(res);
    // }
    const newUser = req.body;
    try {
      const createdUser = await UserService.addUser(newUser);
      util.setSuccess(HTTP_CODES.CREATED, 'User Added!', createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(HTTP_CODES.BAD_REQUEST, error.message);
      return util.send(res);
    }
  }

  static async updatedUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(
        HTTP_CODES.BAD_REQUEST,
        'Please input a valid numeric value'
      );
      return util.send(res);
    }
    try {
      const updateUser = await UserService.updateUser(id, alteredUser);
      if (!updateUser) {
        util.setError(
          HTTP_CODES.NOT_FOUND,
          `Cannot find User with the id: ${id}`
        );
      } else {
        util.setSuccess(HTTP_CODES.OK, 'User updated', updateUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(HTTP_CODES.NOT_FOUND, error);
      return util.send(res);
    }
  }

  static async getAUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(
        HTTP_CODES.BAD_REQUEST,
        'Please input a valid numeric value'
      );
      return util.send(res);
    }

    try {
      const theUser = await UserService.getAUser(id);

      if (!theUser) {
        util.setError(
          HTTP_CODES.NOT_FOUND,
          `Cannot find User with the id ${id}`
        );
      } else {
        util.setSuccess(HTTP_CODES.OK, 'Found User', theUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(HTTP_CODES.NOT_FOUND, error);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(HTTP_CODES.BAD_REQUEST, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const UserToDelete = await UserService.deleteUser(id);

      if (UserToDelete) {
        util.setSuccess(HTTP_CODES.OK, 'User deleted');
      } else {
        util.setError(
          HTTP_CODES.NOT_FOUND,
          `User with the id ${id} cannot be found`
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(HTTP_CODES.BAD_REQUEST, error);
      return util.send(res);
    }
  }
}

export default UserController;
