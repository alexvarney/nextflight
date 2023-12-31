/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import {
  BBoxSchema,
  getAirportByCode,
  getAirportRunways,
  getAirportsByBbox,
} from "~/server/db/airport";
import { getWaypoint } from "~/server/db/waypoint";
import { publicProcedure, router } from "~/server/trpc";
import { createContext } from "~/server/trpc/trpc-context";

const appRouter = router({
  getAirport: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(({ input, ctx }) => getAirportByCode(input.code, ctx.db)),
  getAiportsInBBox: publicProcedure
    .input(
      z.object({
        bbox: BBoxSchema,
      })
    )
    .query(({ input, ctx }) => {
      return getAirportsByBbox(input.bbox, ctx.db);
    }),
  getRunways: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(({ input, ctx }) => getAirportRunways(input.code, ctx.db)),
  getWaypoint: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(({ input, ctx }) => getWaypoint(input.code, ctx.db)),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
