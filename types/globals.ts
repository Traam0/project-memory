import type { NextApiRequest, NextApiResponse } from "next";

export type EndpointHandler = (
    Request: NextApiRequest,
    Response: NextApiResponse,
  ) => Promise<void>;

export type ValidationError =  Array<{path: string, message: string}>;