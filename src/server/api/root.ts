import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { coachRouter } from "./routers/coach";
import { sportRouter } from "./routers/sports";
import { centerRouter } from "./routers/center";
import { batchRouter } from "./routers/batches";
import { staffRouter } from "./routers/staff";
import { centerInventoryRouter } from "./routers/centerInventory";
import { inventoryRouter } from "./routers/inventory";

import { centerSportsRouter } from "./routers/centerSports"
import { adminUserRouter } from "./routers/adminUser";
import { batchTimingRouter } from "./routers/batchTimings";
import { staffPayrollRouter } from "./routers/staffPayroll";
import { staffDesignationRouter } from "./routers/staffdesignation";
import { taxSlabRouter } from "./routers/taxSlabs";
import { staffTimingRouter } from "./routers/staffTimings";
import { athleteRouter } from "./routers/athlete";
import { coachCertificateRouter } from "./routers/coachCertifications";
import { coachBatchesRouter } from "./routers/coachBatches";
import { coachSportsRouter } from "./routers/coachSports";
import { athleteSportsRouter } from "./routers/athleteSports";
import { athleteBatchesRouter } from "./routers/athleteBatches";
import { assessmentRouter } from "./routers/assessment";
import { uploadRouter } from "./routers/upload";
import { injuryLogRouter } from "./routers/injurylog";
import { feePlanRouter } from "./routers/feePlan";
import { testBankRouter } from "./routers/testBanks";
import { testsRouter } from "./routers/tests";
import { assignedTestBankRouter } from "./routers/assignedTestBanks";
import { assignedTestsRouter } from "./routers/assignedTests";
import { assessmentAssignedAthletesRouter } from "./routers/assessmentAssignedAthletes";
import { postRouter } from "./routers/post";

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
  inventory: inventoryRouter,
  centerInventory: centerInventoryRouter,
  centerSports: centerSportsRouter,
  adminUser: adminUserRouter,
  staffPayroll: staffPayrollRouter,
  staffDesignation: staffDesignationRouter,
  tabSlab: taxSlabRouter,
  staffTimings: staffTimingRouter,
  athlete: athleteRouter,
  coachCertificate: coachCertificateRouter,
  coachBatches: coachBatchesRouter,
  coachSports: coachSportsRouter,
  athleteSports: athleteSportsRouter,
  athleteBatches: athleteBatchesRouter,
  assessment: assessmentRouter,
  upload: uploadRouter,
  injuryLog: injuryLogRouter,
  feePlan: feePlanRouter,
  testBank: testBankRouter,
  test: testsRouter,
  assignedTestBank: assignedTestBankRouter,
  assignedTest: assignedTestsRouter,
  assessmentAssignedAthlete: assessmentAssignedAthletesRouter,
  post: postRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
