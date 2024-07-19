import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { coachRouter } from "./routers/coach";
import { sportRouter } from "./routers/sports";
import { centerRouter } from "./routers/center";
import { batchRouter } from "./routers/batches";
import { staffRouter } from "./routers/staff";
import { centerInventoryRouter } from "./routers/centerInventory";
import { inventoryRouter } from "./routers/inventory";

import {centerSportsRouter} from "./routers/centerSports"
import { adminUserRouter } from "./routers/adminUser";
import { batchTimingRouter } from "./routers/batchTimings";
import { staffPayrollRouter } from "./routers/staffPayroll";
import { staffDesignationRouter } from "./routers/staffdesignation";
import { taxSlabRouter } from "./routers/taxSlabs";
import { staffTimingRouter } from "./routers/staffTimings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  center: centerRouter,
  coach: coachRouter,
  sports: sportRouter,
  batches: batchRouter,
  batchTimings: batchTimingRouter,
  staff: staffRouter,
  inventory:inventoryRouter,
  centerInventory:centerInventoryRouter,
  centerSports:centerSportsRouter,
  adminUser:adminUserRouter,
  staffPayroll:staffPayrollRouter,
  staffDesignation:staffDesignationRouter,
  tabSlab:taxSlabRouter,
  staffTimings:staffTimingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
