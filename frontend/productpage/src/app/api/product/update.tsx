import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const response = await api.put(`/api/product/${req.body.id}`, req.body);

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
