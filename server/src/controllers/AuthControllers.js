const Login = async (req, res) => {
  try {
    res.success("Login successful", { some: "datat" });
  } catch (error) {
    throw new Error(error);
  }
};

export default { Login };
