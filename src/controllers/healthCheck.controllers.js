import { ApiResponce } from "../utils/api-responce.js";

const healthCheck = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponce(200, { message: "Server is Running" }));
  } catch (error) {}
};

export { healthCheck };
