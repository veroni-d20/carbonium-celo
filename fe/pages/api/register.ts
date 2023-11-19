import { db } from "@/utilities/mongo";
require("dotenv").config();

export default async function write(req: any, res: any) {
  try {
    if (req.method == "POST") {
      const {
        name,
        country,
        vintage,
        standard,
        methodology,
        creditsAmount,
        issuerName,
        issuerCountry,
        address,
      } = req.body;

      const amount = parseInt(creditsAmount);
      const method = parseInt(methodology);

      const details = await db.collection("carbonCerts").insertOne({
        name,
        country,
        vintage,
        standard,
        methodology: method,
        creditAmount: amount,
        issuerName,
        issuerCountry,
        address,
        attested: false,
      });

      res.status(200).json({
        success: true,
        msg: "data inserted",
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, data: error.message });
  }
}
