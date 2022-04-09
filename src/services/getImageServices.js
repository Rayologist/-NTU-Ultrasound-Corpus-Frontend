import { SERVER_URL } from "../configs/config";

const getImage = async (credentials) => {
  const url = SERVER_URL + "/getImage";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export default getImage;
