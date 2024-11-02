//https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import type { NextRequest } from 'next/server'
import { respErr, respJson } from "@/utils/resp";
import { getRequestContext } from '@cloudflare/next-on-pages';
import { post } from './action';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { config } = await req.json() as { config: any };
  const serverUrl = getRequestContext().env.BOT_SERVICE_URL;
  const serverAuth = getRequestContext().env.BOT_SERVICE_AUTH;

  try {
    const result = await post(
      serverUrl, serverAuth,
      { "config": config }
    );

    return respJson(result["error_code"], result["error_detail"], result["data"]);
  } catch (e) {
    console.error("start bot failed:", e);
    return respErr("start bot failed");
  }

}
