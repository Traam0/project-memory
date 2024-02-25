import type { NextApiRequest, NextApiResponse } from "next";

export type EndpointHandler = (
    Request: NextApiRequest,
    Response: NextApiResponse,
  ) => Promise<void>;