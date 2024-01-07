import axios from "axios";

export const useAxios = async (
  url: string,
  method: string = "get",
  requestData: any = null
) => {
  try {
    const config = {
      method,
      url,
      data: requestData,
    };

    const response = await axios(config);

    return response.data;
  } catch (error: any) {
    return {
      code: 500,
      message: error.message,
    };
  }
};
