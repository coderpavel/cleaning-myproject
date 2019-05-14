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
      //TODO: вынес token type in config
      sub: jwtSettings.tokenType.access,
      id: user._id,
      name: user.name //TODO: payload  { phone, id: (id or null), iat, exp } ?
    };
  }

  static getRefreshPayloadForUser(user) {
    const payload = {
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

    return payload;
  }

  //TODO: не понял зачем это

  // static async createOrUpdateUserFromRefreshToken(payload) {
  //     const userRepository = getManager().getRepository(User);
  //     const user = await User.findOne(payload.id); //TODO: import model

  //     if (!user) {
  //         const newUser = new User(
  //             payload.id,
  //             payload.name,
  //             payload.job,
  //             payload.statusMessage,
  //             undefined, // seat not synced because it is flight-local
  //             payload.email,
  //             payload.language,
  //             payload.auth,
  //             new Date(payload.updated)
  //         );
  //         await userRepository.save(newUser);
  //         return newUser;
  //     }

  //     const tokenUpdated = new Date(payload.updated);

  //     if (user.updated < tokenUpdated) {
  //         user.name = payload.name;
  //         user.job = payload.job;
  //         user.statusMessage = payload.statusMessage;
  //         user.email = payload.email || "";
  //         user.updated = tokenUpdated;
  //         await userRepository.save(user);
  //     }

  //     return user;
  // }
}

module.exports = { UserAuthManager, getTokenFromHeader };
