import { NextApiRequest, NextApiResponse } from "next";
import { revalidateSecret } from "../../../../../../utils/consts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.body.secret;
  if (!secret || secret !== revalidateSecret) return res.status(401).end();

  const productId = req.query.productId;
  const questionId = req.query.questionId;

  if (!productId) return res.status(400).json({ error: "Missing productId" });
  if (!questionId) return res.status(400).json({ error: "Missing questionId" });

  try {
    await res.unstable_revalidate(`/products/${productId}/questions/${questionId}/answer`);

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
}
