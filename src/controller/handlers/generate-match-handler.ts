import { RouterHandler } from "@tsndr/cloudflare-worker-router";
import { generateMatch } from "../../logic/generate-match";

const generateMatchHandler: RouterHandler<any> = async ({ res }) => {
  const response = await generateMatch()
  res.status = 200
  res.body = {
    match: response
  }
}

export default generateMatchHandler
