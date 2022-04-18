import { NextApiRequest, NextApiResponse } from "next";
import { revalidateSecret } from "../../../../../../utils/consts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.body.secret;
  if (!secret || secret !== revalidateSecret) return res.status(401).end();

  const productId = req.query.productId;
  const reviewId = req.query.reviewId;

  if (!productId) return res.status(400).json({ error: "Missing productId" });
  if (!reviewId) return res.status(400).json({ error: "Missing reviewId" });

  try {
    await res.unstable_revalidate(`/products/${productId}/reviews/${reviewId}/comment`);

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
}
