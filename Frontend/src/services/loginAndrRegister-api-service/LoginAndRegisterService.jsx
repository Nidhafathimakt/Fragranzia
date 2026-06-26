import axios from "../../axios";

const LoginAndRegisterService = () => {
  const postRegister = async (data) => {
    const response = await axios.post("/api/user/singup", data);
    return response.data;
  };

  const postLogin = async (data) => {
    const response = await axios.post("/api/user/login", data);
    return response.data;
  };

  return {
    postRegister,
    postLogin,
  };
};

export default LoginAndRegisterService;
