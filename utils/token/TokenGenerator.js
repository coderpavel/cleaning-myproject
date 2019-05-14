const jwt = require("jsonwebtoken");
const jwtSettings = require("../../configs/config.json").jwt;
const { UserAuthManager } = require("./UserAuthManager");

// TODO: Почему не назвать module TokenManager и не запихнуть сюда getTokenFromHeader() ?

class TokenGenerator {
  static sign(user) {
    const payloadCommon = UserAuthManager.getAccessPayloadForUser(user);
    const payloadRefresh = UserAuthManager.getRefreshPayloadForUser(user);

    const options = {
      expiresIn: jwtSettings.expiresIn,
      algorithm: jwtSettings.algorithm
    };

    const refreshOptions = {
      expiresIn: jwtSettings.refreshExpiresIn,
      algorithm: jwtSettings.algorithm
    };

    return {
      token:
        "Bearer " + jwt.sign(payloadCommon, jwtSettings.jwtSecret, options),
      refreshToken:
        "Bearer " +
        jwt.sign(payloadRefresh, jwtSettings.jwtSecret, refreshOptions)
    };
  }

  static verify(token, secret) {
    const userPayload = jwt.verify(token, secret);
    return userPayload;
  }
}

module.exports = TokenGenerator;
