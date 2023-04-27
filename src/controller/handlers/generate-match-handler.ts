import { RouterHandler } from "@tsndr/cloudflare-worker-router";
import { generateMatch } from "../../logic/generate-match";
import { Env } from "../../env";

const generateMatchHandler: RouterHandler<Env> = async ({ res, env }) => {
  const response = await generateMatch(env)
  res.status = 200
  res.body = {
    match: response
  }
}

export default generateMatchHandler
