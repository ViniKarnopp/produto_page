import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const query = req.query;
      let { eventId } = query;

      const response = await api.get("/api/product");

      return res.send(response.data);
    } catch (err: any) {
      if (err.response.status === 404) {
        return res.send({});
      }

      return res.status(Number(err.response.status)).json(err.response.data);
    }
  } else {
    return res.status(400).json("Invalid Request Type");
  }
};

export default handler;
