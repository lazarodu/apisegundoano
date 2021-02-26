"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.create(data);
    return user;
  }
  async authenticate({ request, auth }) {
    try {
      const { email, password } = request.all();
      const { token } = await auth.attempt(email, password);
      const user = await User.findBy({ email });
      return { token, user };
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthController;
