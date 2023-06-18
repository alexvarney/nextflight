import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { connectNavigationDatabase } from "../db/connect-nav";

const db = connectNavigationDatabase();

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  return {
    db,
  };
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>;
