import "server-only";
import { cache } from "react";
import { makeQueryClient } from "./query-client";

// One QueryClient per request, reused across the tree in that request.
export const getQueryClient = cache(makeQueryClient);
