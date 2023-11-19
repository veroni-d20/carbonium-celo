import { db } from "@/utilities/mongo";
require("dotenv").config();

export default async function getTokens(req: any, res: any) {
  try {
    if (req.method == "GET") {
      const details = await db
        .collection("carbonCerts")
        .find({
          attestationUID: { $exists: true },
          tokenId: { $exists: true },
        })
        .toArray();

      res.status(200).json({
        success: true,
        details,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: error.message });
  }
}
