import { db } from "@/utilities/mongo";
import { ObjectId } from "mongodb";
require("dotenv").config();

export default async function write(req: any, res: any) {
  try {
    if (req.method == "PUT") {
      const { id } = req.body;
      const details = await db.collection("carbonCerts").updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: { attested: true },
        }
      );

      res.status(200).json({
        success: true,
        details,
      });
    }
  } catch (error: any) {
    res.status(200).json({ success: false, data: error.message });
  }
}
