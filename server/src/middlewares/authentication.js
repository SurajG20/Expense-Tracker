import JWT from "jsonwebtoken";

import config from "../config/config.js";
import AuthServices from "../services/AuthServices.js";

const PUBLIC_KEY = config.PUBLIC_KEY;

const authenticate = async (req, res, next) => {
  var token = req.header("Authorization")?.split(" ")[1];

  if (token == null) {
    return res.unauthorize("Token not found", null);
  }

  const result = JWT.verify(
    token,
    PUBLIC_KEY,
    { algorithms: ["RS256"] },
    function (err, user) {
      if (err) {
        return 0;
      }

      return user;
    }
  );

  if (result == 0) {
    return res.unauthorize("Invalid Token", null);
  }

  var is_token = await AuthServices.findToken({
    where: {
      jti: result.jti,
    },
  });
  if (is_token == null) {
    return res.unauthorize("Invalid Token", null);
  }

  var user = await AuthServices.findUser({ user_id: is_token.user_id });
  if (user == null) {
    return res.unauthorize("Invalid User", null);
  }

  req.user = user;
  next();
};

export default { authenticate };
