const { Sequelize, DataTypes } = require("sequelize");
const constants = require("../utilities/constants");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,
    logging: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log(constants.CONNECTION_SUCCESS);
  })
  .catch((err) => {
    console.error(constants.CONNECTION_ERROR, err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//NOTE: Connect with database Table
db.otp = require("./otp")(db.sequelize, DataTypes);
db.token = require("./token")(db.sequelize, DataTypes);

// SECTION - ACADEMY
db.academy = require("./academy")(db.sequelize, DataTypes);
db.academySportsMap = require("./academy-sports-map")(db.sequelize, DataTypes);

// SECTION - CENTER
db.centers = require("./centers")(db.sequelize, DataTypes);

//SECTION - Color And Sport
db.colors = require("./colors")(db.sequelize, DataTypes);
db.sports = require("./sports")(db.sequelize, DataTypes);
db.sportsColorMap = require("./sports-color-map")(db.sequelize, DataTypes);
db.sports.belongsTo(db.academy, {
  foreignKey: "academyId",
});
db.sports.belongsTo(db.centers, {
  foreignKey: "centerId",
});
//NOTE - A sport can have a single color
db.sports.hasOne(db.sportsColorMap, {
  foreignKey: "sportId",
});

//NOTE -  Each entry in sportsColorMap belongs to one sport
db.sportsColorMap.belongsTo(db.sports, {
  foreignKey: "sportId",
});

//NOTE -  A single color can have multiple sports
db.colors.hasMany(db.sportsColorMap, {
  foreignKey: "colorId",
});

//NOTE - Each entry in sportsColorMap belongs to one color
db.sportsColorMap.belongsTo(db.colors, {
  foreignKey: "colorId",
});

db.academySportsMap.belongsTo(db.academy, {
  foreignKey: "academyId",
  otherKey: "id",
});
db.academySportsMap.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

//NOTE -  academy will have multiple centers
db.academy.hasMany(db.centers, {
  foreignKey: "academyId",
});

db.centers.belongsTo(db.academy, {
  foreignKey: "academyId",
});

// SECTION - Coaches
db.coaches = require("./coach")(db.sequelize, DataTypes);

// SECTION - coaches on center
db.coachOnCenters = require("./coaches-on-centers")(db.sequelize, DataTypes);
db.coachOnCenters.belongsTo(db.coaches, {
  foreignKey: "coachId",
});
db.coachOnCenters.belongsTo(db.centers, {
  foreignKey: "centerId",
});

// SECTION - Batches
db.batches = require("./batches")(db.sequelize, DataTypes);
db.batches.belongsTo(db.academy, {
  foreignKey: "academyId",
});
db.batches.belongsTo(db.centers, {
  foreignKey: "centerId",
});
db.batches.belongsTo(db.sports, {
  foreignKey: "sportId",
});
db.batches.belongsTo(db.coaches, {
  foreignKey: "coachId",
});
// SECTION - batch scheduled
db.batchSchedule = require("./batch-schedule")(db.sequelize, DataTypes);

db.batchSchedule.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

// SECTION - STAFF
db.staff = require("./staff")(db.sequelize, DataTypes);

//SECTION - ATHLETE
db.athlete = require("./athelete")(db.sequelize, DataTypes);

//NOTE - athlete will be belongs to only single academy
db.athlete.belongsTo(db.academy, { foreignKey: "academyCode", otherKey: "id" });
db.athleteSportsMap = require("./athlete-sports-map")(db.sequelize, DataTypes);

// // NOTE - athlete can have into multiple sports
// db.athlete.belongsToMany(db.sports, {
//   through: db.athleteSportsMap,
//   foreignKey: "athleteId",
//   otherKey: "sportsId",
// });

// // NOTE - each sports can be associate with multiple atheltes
// db.sports.belongsToMany(db.athlete, {
//   through : db.athleteSportsMap,
//   foreignKey : "sportsId",
//   otherKey : "athleteId"
// })

db.athleteSportsMap.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.athleteSportsMap.belongsTo(db.sports, {
  foreignKey: "sportsId",
  otherKey: "id",
});

db.athleteSportsMap.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.athleteSportsMap.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

// SECTION - Coach

db.coachQualifications = require("./coach-qualifications")(
  db.sequelize,
  DataTypes
);

//NOTE - coach can have many qualifications
db.coaches.hasMany(db.coachQualifications, {
  foreignKey: "coachId",
});

//NOTE -  each qualification belongs to one coach
db.coachQualifications.belongsTo(db.coaches, {
  foreignKey: "coachId",
});

db.coachOnCenters = require("./coach-centers-batches")(db.sequelize, DataTypes);
db.coachSportsMap = require("./coach-sports-map")(db.sequelize, DataTypes);
db.coachCentersBatches = require("./coach-centers-batches")(
  db.sequelize,
  DataTypes
);

db.coachCentersBatches.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});
db.coachCentersBatches.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.coachCentersBatches.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});

// SECTION - INJURY LOG
db.injuryLog = require("./injury-log")(db.sequelize, DataTypes);
db.injuryImage = require("./injury-images")(db.sequelize, DataTypes);

db.injuryImage.belongsTo(db.injuryLog, {
  foreignKey: "injuryId",
  otherKey: "id",
});

//NOTE -  An injury log belongs to an athlete
db.injuryLog.belongsTo(db.athlete, {
  foreignKey: "athleteId",
});

//NOTE - An athlete can have many injury logs
db.athlete.hasMany(db.injuryLog, {
  foreignKey: "athleteId",
});

db.injuryLog.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});

db.athleteAttendance = require("./athlete-attendance")(db.sequelize, DataTypes);
db.testBank = require("./test-bank")(db.sequelize, DataTypes);
db.tests = require("./tests")(db.sequelize, DataTypes);
db.assessment = require("./assessment")(db.sequelize, DataTypes);
db.assignedTests = require("./assigned-tests")(db.sequelize, DataTypes);

db.assignedTestBanks = require("./assigned-test-banks")(
  db.sequelize,
  DataTypes
);
db.assessmentCenters = require("./assessment-centers")(db.sequelize, DataTypes);
db.assessmentSports = require("./assessment-sports")(db.sequelize, DataTypes);
db.assessmentBatches = require("./assessment-batches")(db.sequelize, DataTypes);
db.assessmentAssignedAthletes = require("./assessment-assigned-athletes")(
  db.sequelize,
  DataTypes
);
db.assessmentAssignedCoaches = require("./assessment-assigned-coaches")(
  db.sequelize,
  DataTypes
);
db.assessmentResults = require("./assessment-results")(db.sequelize, DataTypes);
db.rating = require("./rating")(db.sequelize, DataTypes);
db.category = require("./category")(db.sequelize, DataTypes);
db.tickets = require("./ticket")(db.sequelize, DataTypes);
db.ticketMessages = require("./ticket-messages")(db.sequelize, DataTypes);

// NOTE - Coach Modals
db.assignedDrill = require("./assigned-drills")(db.sequelize, DataTypes);
db.assignedDrillFitnessComponent =
  require("./assigned-drill-fitness-component")(db.sequelize, DataTypes);
db.assignedEquipment = require("./assigned-equipments")(
  db.sequelize,
  DataTypes
);
db.trainingDrill = require("./training-drills")(db.sequelize, DataTypes);
db.trainingPlan = require("./training-plans")(db.sequelize, DataTypes);
db.resouces = require("./resources")(db.sequelize, DataTypes);
db.scheduledPlans = require("./scheduled-plans")(db.sequelize, DataTypes);
db.scheduledCenterBatch = require("./scheduled-center-batch")(
  db.sequelize,
  DataTypes
);
db.feed = require("./feed")(db.sequelize, DataTypes);
db.hideFeed = require("./hide-feed")(db.sequelize, DataTypes);
db.trainingDrill.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.trainingDrill.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.trainingPlan.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});

db.trainingPlan.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

db.assignedEquipment.belongsTo(db.trainingDrill, {
  foreignKey: "drillId",
  otherKey: "id",
});

db.assignedDrill.belongsTo(db.trainingDrill, {
  foreignKey: "drillId",
  otherKey: "id",
});
db.assignedDrill.belongsTo(db.assignedDrillFitnessComponent, {
  foreignKey: "drillFitnessComponentId",
  otherKey: "id",
});
db.resouces.belongsTo(db.trainingDrill, {
  foreignKey: "drillId",
  otherKey: "id",
});
db.resouces.belongsTo(db.trainingPlan, {
  foreignKey: "planId",
  otherKey: "id",
});
db.scheduledPlans.belongsTo(db.trainingPlan, {
  foreignKey: "planId",
  otherKey: "id",
});
db.scheduledPlans.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.scheduledCenterBatch.belongsTo(db.scheduledPlans, {
  foreignKey: "schedulePlanId",
  otherKey: "id",
});
db.scheduledCenterBatch.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.scheduledCenterBatch.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

// feePlan section
db.feePlan = require("./fee-plan")(db.sequelize, DataTypes);
// db.feePlan.belongsTo(db.batches, { foreignKey: "id", otherKey: "id" });
db.batches.belongsTo(db.feePlan, { foreignKey: "feePlanId", otherKey: "id" });

// order section
db.athleteOrder = require("./athlete-order")(db.sequelize, DataTypes);
db.athleteOrder.belongsTo(db.athlete, { foreignKey: "athleteId" });
db.athleteOrder.belongsTo(db.batches, { foreignKey: "batchId" });
db.athleteOrder.belongsTo(db.feePlan, { foreignKey: "feePlanId" });



db.events = require("./events")(db.sequelize, DataTypes);
db.eventSports = require("./eventSports")(db.sequelize, DataTypes);
db.eventSports.belongsTo(db.events, { foreignKey: "eventId" });
db.eventSports.belongsTo(db.sports, { foreignKey: "sportId" });

db.athleteBatchesMap = require("./athlete-batches-map")(
  db.sequelize,
  DataTypes
);

db.payments = require("./payment")(db.sequelize, DataTypes);

//SECTION- add all retaion

db.coaches.belongsTo(db.academy, { foreignKey: "academyId", otherKey: "id" });
db.coaches.belongsTo(db.centers, { foreignKey: "centerId", otherKey: "id" });
db.centers.belongsTo(db.academy, { foreignKey: "academyId", otherKey: "id" });

db.coachSportsMap.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});

db.coachSportsMap.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

db.coachOnCenters.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
// Set up associations
// db.coaches.belongsToMany(db.centers, {
//   through: db.coachOnCenters,
//   foreignKey: 'coachId',
//   otherKey: 'centerId',
// });

// db.centers.belongsToMany(db.coaches, {
//   through: db.coachOnCenters,
//   foreignKey: 'centerId',
//   otherKey: 'coachId',
// });
db.coachOnCenters.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});

db.coachOnCenters.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

db.coachSportsMap.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});

db.coachSportsMap.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

db.athleteBatchesMap.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.athleteBatchesMap.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});
db.athleteBatchesMap.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

db.payments.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.payments.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.payments.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});
db.athleteAttendance.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});

db.athleteAttendance.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.rating.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.rating.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.rating.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.tickets.belongsTo(db.athlete, { foreignKey: "userId", constraints: false });
db.tickets.belongsTo(db.coaches, { foreignKey: "userId", constraints: false });

db.tickets.belongsTo(db.category, {
  foreignKey: "categoryId",
  otherKey: "id",
});
db.ticketMessages.belongsTo(db.tickets, {
  foreignKey: "ticketId",
  otherKey: "id",
});

db.ticketMessages.belongsTo(db.athlete, {
  foreignKey: "userId",
  constraints: false,
});
db.ticketMessages.belongsTo(db.coaches, {
  foreignKey: "userId",
  constraints: false,
});

db.tests.belongsTo(db.testBank, {
  foreignKey: "testBankId",
  otherKey: "id",
});
db.tests.belongsTo(db.academy, {
  foreignKey: "academyId",
  otherKey: "id",
});
db.tests.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});

db.assessment.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.assessment.belongsTo(db.academy, {
  foreignKey: "academyId",
  otherKey: "id",
});
db.assessmentCenters.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentCenters.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.assessmentSports.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentSports.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.assessmentBatches.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentBatches.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});
db.assessmentAssignedAthletes.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentAssignedAthletes.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.assessmentAssignedCoaches.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentAssignedCoaches.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.assignedTestBanks.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assignedTestBanks.belongsTo(db.testBank, {
  foreignKey: "testBankId",
  otherKey: "id",
});
db.assignedTests.belongsTo(db.assignedTestBanks, {
  foreignKey: "assignedTestBankId",
  otherKey: "id",
});
db.assignedTests.belongsTo(db.tests, {
  foreignKey: "testId",
  otherKey: "id",
});

db.assessmentResults.belongsTo(db.athlete, {
  foreignKey: "athleteId",
  otherKey: "id",
});
db.assessmentResults.belongsTo(db.assessment, {
  foreignKey: "assessmentId",
  otherKey: "id",
});
db.assessmentResults.belongsTo(db.assignedTests, {
  foreignKey: "assignedTestId",
  otherKey: "id",
});
db.assessmentResults.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.feed.belongsTo(db.staff, {
  foreignKey: "staffId",
  otherKey: "id",
});

db.athleteAttendance.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});

db.athleteAttendance.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

db.coachAttendance = require("./coach-attendance")(db.sequelize, DataTypes);
db.coachAttendance.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.coachAttendance.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.coachAttendance.belongsTo(db.sports, {
  foreignKey: "sportId",
  otherKey: "id",
});
db.coachAttendance.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

db.events.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
// db.sportsMaster = require("./sports-master");
// db.sportsMaster.belongsTo(db.sports, {
//   foreignKey: "sportName",
// });

db.unScheduledPlan = require("./unschedule-plan")(db.sequelize, DataTypes);
db.unScheduledCenterBatch = require("./unscheduleCenterBatch")(
  db.sequelize,
  DataTypes
);
db.unScheduledPlan.belongsTo(db.trainingPlan, {
  foreignKey: "planId",
  otherKey: "id",
});
db.unScheduledPlan.belongsTo(db.coaches, {
  foreignKey: "coachId",
  otherKey: "id",
});
db.unScheduledCenterBatch.belongsTo(db.unScheduledPlan, {
  foreignKey: "unSchedulePlanId",
  otherKey: "id",
});
db.unScheduledCenterBatch.belongsTo(db.centers, {
  foreignKey: "centerId",
  otherKey: "id",
});
db.unScheduledCenterBatch.belongsTo(db.batches, {
  foreignKey: "batchId",
  otherKey: "id",
});

// db.centers.belongsTo(db.admin)

db.oneSignal = require("./one-signal")(db.sequelize, DataTypes);

db.hideFeed.belongsTo(db.athlete, { foreignKey: "userId", constraints: false });
db.hideFeed.belongsTo(db.coaches, { foreignKey: "userId", constraints: false });

// db.admin = require("./admin")(db.sequelize, DataTypes);
// db.admin.belongsTo(db.academy, {
//   foreignKey: "academyId",
//   otherKey: "id"
// });
// db.centers.belongsTo(db.admin, {
//   foreignKey: "createdBy",
//   otherKey : "id"
// })

db.sequelize.sync({ alter: true }).then(() => {
  console.log("sync again");
});

module.exports = db;
