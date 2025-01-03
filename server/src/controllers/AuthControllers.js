import AuthServices from "../services/AuthServices.js";
import bcrypt from "bcrypt";

var saltRounds = 10;

const Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let user = await AuthServices.findUser({
      where: { email },
    });

    if (user) {
      return res.error("User Already Exists");
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        throw new Error("Error Hashing Password");
      }

      const userCreated = await AuthServices.createUser({
        email,
        password: hash,
        username,
      });
      return res.success("User Registered Successfully", userCreated);
    });
  } catch (error) {
    return res.error("Error Registering In User", error.message);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await AuthServices.findUser({
      where: { email },
    });

    if (!user) {
      return res.error("User does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.error("Invalid Password");
    }

    const payload = {
      userID: user.userID,
      email: user.email,
      username: user.username,
    };
    const token = await AuthServices.createToken(payload);
    return res.success("User Logged In Successfully", { ...payload, token });
  } catch (error) {
    return res.error("Error Logging In User", error.message);
  }
};

export default { Register, Login };
