const jwtSettings = require("../../configs/config.json").jwt;

const getTokenFromHeader = authHeader => {
  console.log("**********************", authHeader);
  if (authHeader) {
    const authParts = authHeader.split(" ");
    if (authParts.length === 1) {
      // TODO deprecated
      return authHeader;
    } else if (
      authParts.length === 2 &&
      authParts[0].toLowerCase() === "bearer"
    ) {
      return authParts[1];
    }
  }
  return undefined;
};

class UserAuthManager {
  static getAccessPayloadForUser(user) {
    return {
      sub: jwtSettings.tokenType.access,
      id: user._id,
      name: user.name //TODO: payload  { phone, id: (id or null), iat, exp } ?
    };
  }

  static getRefreshPayloadForUser(user) {
    return {
      sub: jwtSettings.tokenType.refresh,
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      imageUrl: user.imageUrl,
      address: user.address,
      phone: user.phone,
      password: user.password // xz
    };
  }
}

module.exports = { UserAuthManager, getTokenFromHeader };
