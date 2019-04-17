const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../../../models/user");

describe("User", () => {
  describe(".denerateAuthToken()", () => {
    it("should return valid JWT", () => {
      const userObject = {
        _id: mongoose.Types.ObjectId().toHexString(),
        isAdmin: true
      };
      const user = new User(userObject);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      expect(decoded).toMatchObject(userObject);
    });
  });
});
