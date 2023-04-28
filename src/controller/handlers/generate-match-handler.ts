import { RouterHandler } from "@tsndr/cloudflare-worker-router";
import { generateMatch } from "../../logic/generate-match";
import { Env } from "../../env";

const generateMatchHandler: RouterHandler<Env> = async ({ res, req, env }) => {
  const queryParams = req.query
  const response = await generateMatch(env, parseInt(queryParams.amount))
  res.status = 200
  res.body = {
    match: response
  }
}

export default generateMatchHandler
