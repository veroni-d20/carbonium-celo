import { db } from "@/utilities/mongo";
require("dotenv").config();

export default async function write(req: any, res: any) {
  try {
    if (req.method == "GET") {
      const details = await db
        .collection("carbonCerts")
        .find({
          attested: false,
        })
        .toArray();

      res.status(200).json({
        success: true,
        details,
      });
    }
  } catch (error: any) {
    res.status(200).json({ success: false, data: error.message });
  }
}
