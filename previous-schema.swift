generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Account {
  id                       String  @id @default(cuid())
  userId                   String
  type                     String
  provider                 String
  providerAccountId        String
  refresh_token            String? @db.Text
  refresh_token_expires_in Int?
  access_token             String? @db.Text
  expires_at               Int?
  token_type               String?
  scope                    String?
  id_token                 String? @db.Text
  session_state            String?
  oauth_token_secret       String? @db.Text
  oauth_token              String? @db.Text
  user                     User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model AssessmentAssignedAthletes {
  id           Int         @id @default(autoincrement())
  athleteId    Int?
  createdAt    DateTime    @db.DateTime(0)
  updatedAt    DateTime    @db.DateTime(0)
  assessmentId Int
  Athletes     Athletes?   @relation(fields: [athleteId], references: [id], onDelete: Cascade, map: "AssessmentAssignedAthletes_ibfk_609")
  Assessments  Assessments @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentAssignedAthletes_ibfk_610")

  @@index([assessmentId], map: "assessmentId")
  @@index([athleteId], map: "athleteId")
}

model AssessmentAssignedCoaches {
  id           Int         @id @default(autoincrement())
  coachId      Int?
  createdAt    DateTime    @db.DateTime(0)
  updatedAt    DateTime    @db.DateTime(0)
  assessmentId Int
  Coaches      Coaches?    @relation(fields: [coachId], references: [id], onDelete: Cascade, map: "AssessmentAssignedCoaches_ibfk_607")
  Assessments  Assessments @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentAssignedCoaches_ibfk_608")

  @@index([assessmentId], map: "assessmentId")
  @@index([coachId], map: "coachId")
}

model AssessmentBatches {
  id           Int         @id @default(autoincrement())
  assessmentId Int
  batchId      Int
  createdAt    DateTime    @db.DateTime(0)
  updatedAt    DateTime    @db.DateTime(0)
  Assessments  Assessments @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentBatches_ibfk_629")
  Batches      Batches     @relation(fields: [batchId], references: [id], onDelete: Cascade, map: "AssessmentBatches_ibfk_630")

  @@index([assessmentId], map: "assessmentId")
  @@index([batchId], map: "batchId")
}

model AssessmentCenterBatches {
  id                 Int               @id @default(autoincrement())
  assessmentCenterId Int
  batchId            Int
  createdAt          DateTime          @db.DateTime(0)
  updatedAt          DateTime          @db.DateTime(0)
  AssessmentCenters  AssessmentCenters @relation(fields: [assessmentCenterId], references: [id], onDelete: NoAction, map: "AssessmentCenterBatches_ibfk_51")
  Batches            Batches           @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "AssessmentCenterBatches_ibfk_52")

  @@index([assessmentCenterId], map: "assessmentCenterId")
  @@index([batchId], map: "batchId")
}

model AssessmentCenterSports {
  id                 Int               @id @default(autoincrement())
  assessmentCenterId Int
  sportId            Int
  createdAt          DateTime          @db.DateTime(0)
  updatedAt          DateTime          @db.DateTime(0)
  AssessmentCenters  AssessmentCenters @relation(fields: [assessmentCenterId], references: [id], onDelete: NoAction, map: "AssessmentCenterSports_ibfk_55")
  Sports             Sports            @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "AssessmentCenterSports_ibfk_56")

  @@index([assessmentCenterId], map: "assessmentCenterId")
  @@index([sportId], map: "sportId")
}

model AssessmentCenters {
  id                      Int                       @id @default(autoincrement())
  assessmentId            Int
  centerId                Int
  createdAt               DateTime                  @db.DateTime(0)
  updatedAt               DateTime                  @db.DateTime(0)
  AssessmentCenterBatches AssessmentCenterBatches[]
  AssessmentCenterSports  AssessmentCenterSports[]
  Assessments             Assessments               @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentCenters_ibfk_703")
  Centers                 Centers                   @relation(fields: [centerId], references: [id], onDelete: Cascade, map: "AssessmentCenters_ibfk_704")

  @@index([assessmentId], map: "assessmentId")
  @@index([centerId], map: "centerId")
}

model AssessmentResults {
  id             Int           @id @default(autoincrement())
  athleteId      Int
  assessmentId   Int
  assignedTestId Int
  score          Float?        @default(0) @db.Float
  status         Int?          @default(1) @db.TinyInt
  createdAt      DateTime      @db.DateTime(0)
  updatedAt      DateTime      @db.DateTime(0)
  date           DateTime?     @db.DateTime(0)
  strength       String?       @db.VarChar(255)
  weakness       String?       @db.VarChar(255)
  comment        String?       @db.VarChar(255)
  coachId        Int
  isSubmitted    Boolean?      @default(false)
  isPresent      Boolean?      @default(true)
  Athletes       Athletes      @relation(fields: [athleteId], references: [id], onDelete: Cascade, map: "AssessmentResults_ibfk_1247")
  Assessments    Assessments   @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentResults_ibfk_1248")
  AssignedTests  AssignedTests @relation(fields: [assignedTestId], references: [id], onDelete: Cascade, map: "AssessmentResults_ibfk_1249")
  Coaches        Coaches       @relation(fields: [coachId], references: [id], onDelete: Cascade, map: "AssessmentResults_ibfk_1250")

  @@index([assessmentId], map: "assessmentId")
  @@index([assignedTestId], map: "assignedTestId")
  @@index([athleteId], map: "athleteId")
  @@index([coachId], map: "coachId")
}

model AssessmentSports {
  id           Int         @id @default(autoincrement())
  assessmentId Int
  sportId      Int
  createdAt    DateTime    @db.DateTime(0)
  updatedAt    DateTime    @db.DateTime(0)
  Assessments  Assessments @relation(fields: [assessmentId], references: [id], onDelete: Cascade, map: "AssessmentSports_ibfk_587")
  Sports       Sports      @relation(fields: [sportId], references: [id], onDelete: Cascade, map: "AssessmentSports_ibfk_588")

  @@index([assessmentId], map: "assessmentId")
  @@index([sportId], map: "sportId")
}

model Assessments {
  id                         Int                          @id @default(autoincrement())
  name                       String                       @db.VarChar(255)
  description                String?                      @db.VarChar(255)
  academyId                  Int
  centerId                   Int
  sportId                    Int
  startDate                  DateTime                     @db.Date
  endDate                    DateTime                     @db.Date
  level                      Assessments_level
  mode                       Assessments_mode
  interval                   Assessments_interval
  isAthleteAssess            Boolean?
  isCoachAssess              Boolean?
  isStrengthAdded            Boolean?
  isWeaknessAdded            Boolean?
  isCommentsAdded            Boolean?
  assessmentStatus           Assessments_assessmentStatus
  status                     Boolean
  createdAt                  DateTime                     @db.DateTime(0)
  updatedAt                  DateTime                     @db.DateTime(0)
  AssessmentAssignedAthletes AssessmentAssignedAthletes[]
  AssessmentAssignedCoaches  AssessmentAssignedCoaches[]
  AssessmentBatches          AssessmentBatches[]
  AssessmentCenters          AssessmentCenters[]
  AssessmentResults          AssessmentResults[]
  AssessmentSports           AssessmentSports[]
  Centers                    Centers                      @relation(fields: [centerId], references: [id], onDelete: Cascade, map: "Assessments_ibfk_207")
  Sports                     Sports                       @relation(fields: [sportId], references: [id], onDelete: Cascade, map: "Assessments_ibfk_208")
  Academies                  Academies                    @relation(fields: [academyId], references: [id], onDelete: Cascade, map: "Assessments_ibfk_917")
  AssignedTestBanks          AssignedTestBanks[]

  @@index([sportId], map: "sportId")
  @@index([academyId], map: "academyId")
  @@index([centerId], map: "centerId")
}

model AssignedTestBanks {
  id            Int             @id @default(autoincrement())
  assessmentId  Int
  testBankId    Int
  createdAt     DateTime        @db.DateTime(0)
  updatedAt     DateTime        @db.DateTime(0)
  Assessments   Assessments     @relation(fields: [assessmentId], references: [id], onDelete: NoAction, map: "AssignedTestBanks_ibfk_553")
  TestBanks     TestBanks       @relation(fields: [testBankId], references: [id], onDelete: NoAction, map: "AssignedTestBanks_ibfk_554")
  AssignedTests AssignedTests[]

  @@index([assessmentId], map: "assessmentId")
  @@index([testBankId], map: "testBankId")
}

model AssignedTests {
  id                 Int                 @id @default(autoincrement())
  assignedTestBankId Int
  testId             Int
  createdAt          DateTime            @db.DateTime(0)
  updatedAt          DateTime            @db.DateTime(0)
  AssessmentResults  AssessmentResults[]
  AssignedTestBanks  AssignedTestBanks   @relation(fields: [assignedTestBankId], references: [id], onDelete: NoAction, map: "AssignedTests_ibfk_713")
  Tests              Tests               @relation(fields: [testId], references: [id], onDelete: NoAction, map: "AssignedTests_ibfk_714")

  @@index([assignedTestBankId], map: "assignedTestBankId")
  @@index([testId], map: "testId")
}

model AthleteAttendances {
  id         Int                            @id @default(autoincrement())
  athleteId  Int
  sportId    Int
  attendance AthleteAttendances_attendance? @default(present)
  date       DateTime                       @db.Date
  time       DateTime?                      @db.Time(0)
  status     Boolean?                       @default(true)
  createdAt  DateTime                       @db.DateTime(0)
  updatedAt  DateTime                       @db.DateTime(0)
  Athletes   Athletes                       @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "AthleteAttendances_ibfk_785")
  Sports     Sports                         @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "AthleteAttendances_ibfk_786")

  @@index([athleteId], map: "athleteId")
  @@index([sportId], map: "sportId")
}

model AthleteBatchesMaps {
  id        Int      @id @default(autoincrement())
  athleteId Int
  sportId   Int
  batchId   Int
  status    Boolean? @default(true)
  createdAt DateTime @db.DateTime(0)
  updatedAt DateTime @db.DateTime(0)
  Athletes  Athletes @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "AthleteBatchesMaps_ibfk_813")
  Sports    Sports   @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "AthleteBatchesMaps_ibfk_814")
  Batches   Batches  @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "AthleteBatchesMaps_ibfk_815")

  @@index([athleteId], map: "athleteId")
  @@index([batchId], map: "batchId")
  @@index([sportId], map: "sportId")
}

model AthleteSportsMaps {
  id            Int                             @id @unique(map: "id") @default(autoincrement())
  athleteId     Int
  sportsId      Int
  trainingLevel AthleteSportsMaps_trainingLevel
  centerId      Int
  batchId       Int
  status        Int?                            @default(1) @db.TinyInt
  createdAt     DateTime                        @db.DateTime(0)
  updatedAt     DateTime                        @db.DateTime(0)
  Athletes      Athletes                        @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "AthleteSportsMaps_ibfk_1730")
  Sports        Sports                          @relation(fields: [sportsId], references: [id], onDelete: NoAction, map: "AthleteSportsMaps_ibfk_1731")
  Centers       Centers                         @relation(fields: [centerId], references: [id], onDelete: NoAction, map: "AthleteSportsMaps_ibfk_1732")
  Batches       Batches                         @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "AthleteSportsMaps_ibfk_1733")

  @@index([athleteId], map: "athleteId")
  @@index([batchId], map: "batchId")
  @@index([centerId], map: "centerId")
  @@index([sportsId], map: "sportsId")
}

model Athletes {
  id                         Int                          @id @default(autoincrement())
  image                      String?                      @db.VarChar(255)
  name                       String                       @db.VarChar(255)
  dob                        DateTime                     @db.Date
  gender                     Athletes_gender
  bloodGroup                 Athletes_bloodGroup
  height                     Float                        @db.Float
  heightUnit                 Athletes_heightUnit
  weight                     Float                        @db.Float
  weightUnit                 Athletes_weightUnit
  fatherName                 String                       @db.VarChar(255)
  countryCode                String?                      @default("+91") @db.VarChar(255)
  phone                      String?                      @unique(map: "phone") @db.VarChar(255)
  email                      String?                      @unique(map: "email") @db.VarChar(255)
  address                    String?                      @db.VarChar(255)
  centerId                   Int
  academyCode                Int
  medicalHistory             Json?
  joiningDate                DateTime?                    @db.Date
  status                     Int?                         @default(1) @db.TinyInt
  createdAt                  DateTime                     @db.DateTime(0)
  updatedAt                  DateTime                     @db.DateTime(0)
  deletedAt                  DateTime?                    @db.DateTime(0)
  AssessmentAssignedAthletes AssessmentAssignedAthletes[]
  AssessmentResults          AssessmentResults[]
  AthleteAttendances         AthleteAttendances[]
  AthleteBatchesMaps         AthleteBatchesMaps[]
  AthleteSportsMaps          AthleteSportsMaps[]
  Centers                    Centers                      @relation(fields: [centerId], references: [id], onDelete: Cascade, map: "AthletesCenters_ibfk_1")
  Academies                  Academies                    @relation(fields: [academyCode], references: [id], onDelete: Cascade, map: "Athletes_ibfk_1")
  HideFeeds                  HideFeeds[]
  InjuryLogs                 InjuryLogs[]
  Payments                   Payments[]
  Ratings                    Ratings[]
  TicketMessages             TicketMessages[]
  Tickets                    Tickets[]

  @@index([centerId], map: "centerId")
  @@index([academyCode], map: "academyCode")
}

model CenterSports {
  id        Int        @id @unique(map: "id") @default(autoincrement())
  sportId   Int?
  centerId  Int?
  academyId Int?
  status    Int?       @default(1) @db.TinyInt
  createdAt DateTime   @default(now())
  updatedAt DateTime   @default(now())
  Academies Academies? @relation(fields: [academyId], references: [id], map: "AcademyCenterSportsMaps_ibfk_796")
  Sports    Sports?    @relation(fields: [sportId], references: [id], map: "CenterSportsMaps_ibfk_795")
  Centers   Centers?   @relation(fields: [centerId], references: [id], map: "CenterSportsMaps_ibfk_796")

  @@index([centerId], map: "centerId")
  @@index([sportId], map: "sportId")
  @@index([academyId], map: "academyId")
}

model BatchSchedules {
  id        Int                @id @unique(map: "id") @default(autoincrement())
  batchId   Int
  day       BatchSchedules_day
  startTime String
  endTime   String
  status    Boolean?           @default(true)
  createdAt DateTime           @db.DateTime(0)
  updatedAt DateTime           @db.DateTime(0)
  Batches   Batches            @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "BatchSchedules_ibfk_1")

  @@index([batchId], map: "batchId")
}

model Batches {
  id                      Int                       @id @unique(map: "id") @default(autoincrement())
  name                    String                    @db.VarChar(255)
  capacity                Int
  remainingSeat           Int
  occupiedSeat            Int
  price                   Int
  academyId               Int
  sportId                 Int
  coachId                 Int?
  centerId                Int
  status                  Int?                      @default(1) @db.TinyInt
  createdAt               DateTime                  @db.DateTime(0)
  updatedAt               DateTime                  @db.DateTime(0)
  AssessmentBatches       AssessmentBatches[]
  AssessmentCenterBatches AssessmentCenterBatches[]
  AthleteBatchesMaps      AthleteBatchesMaps[]
  AthleteSportsMaps       AthleteSportsMaps[]
  BatchSchedules          BatchSchedules[]
  Sports                  Sports                    @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "Batches_ibfk_1342")
  Coaches                 Coaches?                  @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "Batches_ibfk_1343")
  Centers                 Centers                   @relation(fields: [centerId], references: [id], onDelete: NoAction, map: "Batches_ibfk_1344")
  Academies               Academies                 @relation(fields: [academyId], references: [id], onDelete: NoAction, map: "Batches_ibfk_2793")
  Payments                Payments[]
  ScheduledCenterBatches  ScheduledCenterBatches[]
  CoachCentersBatches       CoachCentersBatches[]
  @@index([coachId], map: "coachId")
  @@index([sportId], map: "sportId")
  @@index([academyId], map: "academyId")
  @@index([centerId], map: "centerId")
}

model Categories {
  id        Int       @id @default(autoincrement())
  title     String?   @db.VarChar(255)
  status    Int?      @default(1) @db.TinyInt
  createdAt DateTime  @db.DateTime(0)
  updatedAt DateTime  @db.DateTime(0)
  Tickets   Tickets[]
}

model Centers {
  id                     Int                      @id @unique(map: "id") @default(autoincrement())
  name                   String                   @db.VarChar(255)
  email                  String                   @db.VarChar(255)
  createdBy              Int
  image                  String?
  address                String                   @db.Text
  mobile                 String                   @db.VarChar(255)
  academyId              Int?
  status                 Int?                     @default(1) @db.TinyInt
  createdAt              DateTime                 @db.DateTime(0)
  updatedAt              DateTime                 @db.DateTime(0)
  deletedAt              DateTime?                @db.DateTime(0)
  AssessmentCenters      AssessmentCenters[]
  Assessments            Assessments[]
  AthleteSportsMaps      AthleteSportsMaps[]
  Athletes               Athletes[]
  Batches                Batches[]
  CenterInventories      CenterInventories[]
  CenterSports           CenterSports[]
  Admin                  Admin                    @relation(fields: [createdBy], references: [id], map: "CenterAdmin_ibfk_1")
  Academies              Academies?               @relation(fields: [academyId], references: [id], map: "Centers_ibfk_1")
  CoachCentersBatches    CoachCentersBatches[]
  CoachOnCenters         CoachOnCenters[]
  Coaches                Coaches[]
  ScheduledCenterBatches ScheduledCenterBatches[]
  Staffs                 Staffs[]
  Tests                  Tests[]

  @@index([createdBy], map: "createdBy")
  @@index([academyId], map: "academyId")
}

model Inventories {
  id                Int                 @id @unique(map: "id") @default(autoincrement())
  name              String              @db.VarChar(255)
  category          String              @db.VarChar(255)
  status            Int?                @default(1) @db.TinyInt
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @default(now())
  deletedAt         DateTime?           @db.DateTime(0)
  createdBy         Int
  CenterInventories CenterInventories[]
  Admin             Admin               @relation(fields: [createdBy], references: [id], map: "InventoryAdmin_ibfk_1")

  @@index([createdBy], map: "createdBy")
}

model Admin {
  id               Int                @id @default(autoincrement())
  email            String             @unique
  password         String
  academyId        Int
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @default(now())
  deletedAt        DateTime?          @db.DateTime(0)
  Academies        Academies          @relation(fields: [academyId], references: [id], map: "AcademyAdmin_ibfk_1")
  Centers          Centers[]
  Inventories      Inventories[]
  Sports           Sports[]
  StaffDesignation StaffDesignation[]
  StaffPayroll     StaffPayroll[]
  Staffs           Staffs[]
  TaxSlabs         TaxSlabs[]

  @@index([academyId], map: "academyId")
}

model CenterInventories {
  id          Int         @id @unique(map: "id") @default(autoincrement())
  quantity    Int
  centerId    Int
  inventoryId Int
  status      Int?        @default(1) @db.TinyInt
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @default(now())
  deletedAt   DateTime?   @db.DateTime(0)
  Centers     Centers     @relation(fields: [centerId], references: [id], map: "CenterInventories_ibfk_1")
  Inventories Inventories @relation(fields: [inventoryId], references: [id], map: "CenterInventories_ibfk_2")

  @@index([centerId], map: "centerId")
  @@index([inventoryId], map: "inventoryId")
}

model CoachSportsMaps {
  id        Int       @id @unique(map: "id") @default(autoincrement())
  coachId   Int
  sportId   Int
  status    Int?      @default(1) @db.TinyInt
  createdAt DateTime  @db.DateTime(0)
  updatedAt DateTime  @db.DateTime(0)
  deletedAt DateTime? @db.DateTime(0)
  Coaches   Coaches   @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "CoachSportsMaps_ibfk_777")
  Sports    Sports    @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "CoachSportsMaps_ibfk_778")

  @@index([coachId], map: "coachId")
  @@index([sportId], map: "sportId")
}

model Coaches {
  id                        Int                         @id @unique(map: "id") @default(autoincrement())
  name                      String                      @db.VarChar(255)
  academyId                 Int
  image                     String?                     @db.VarChar(255)
  designation               String                      @db.VarChar(255)
  experience                String?                     @db.VarChar(255)
  trainingLevel             Coaches_trainingLevel
  gender                    Coaches_gender
  dateOfBirth               DateTime                    @db.Date
  countryCode               String                      @default("+91") @db.VarChar(255)
  phone                     String?                     @unique(map: "phone") @db.VarChar(255)
  email                     String?                     @unique(map: "email") @db.VarChar(255)
  about                     String?                     @db.Text
  payrollId                 Int?
  experienceLevel           Coaches_experienceLevel?
  centerId                  Int?
  status                    Int?                        @default(1) @db.TinyInt
  createdAt                 DateTime                    @db.DateTime(0)
  updatedAt                 DateTime                    @db.DateTime(0)
  deletedAt                 DateTime?                   @db.DateTime(0)
  AssessmentAssignedCoaches AssessmentAssignedCoaches[]
  AssessmentResults         AssessmentResults[]
  Batches                   Batches[]
  CoachCentersBatches       CoachCentersBatches[]
  CoachOnCenters            CoachOnCenters[]
  CoachQualifications       CoachQualifications[]
  CoachSportsMaps           CoachSportsMaps[]
  Academies                 Academies                   @relation(fields: [academyId], references: [id], onDelete: NoAction, map: "Coaches_ibfk_399")
  Centers                   Centers?                    @relation(fields: [centerId], references: [id], onDelete: NoAction, map: "Coaches_ibfk_400")
  InjuryLogs                InjuryLogs[]
  Ratings                   Ratings[]
  ScheduledCenterBatches    ScheduledCenterBatches[]
  ScheduledPlans            ScheduledPlans[]
  TrainingDrills            TrainingDrills[]
  TrainingPlans             TrainingPlans[]
  StaffPayroll              StaffPayroll?              @relation(fields: [payrollId], references: [id], onDelete: NoAction, map: "Coaches_ibfk_401")

  @@index([academyId], map: "academyId")
  @@index([centerId], map: "centerId")
}

model Colors {
  id              Int               @id @default(autoincrement())
  name            String            @unique(map: "name") @db.VarChar(255)
  code            String            @unique(map: "code") @db.VarChar(255)
  status          Boolean?          @default(true)
  createdAt       DateTime          @db.DateTime(0)
  updatedAt       DateTime          @db.DateTime(0)
  SportsColorMaps SportsColorMaps[]
}

model Feeds {
  id          Int      @id @default(autoincrement())
  image       String   @db.VarChar(255)
  title       String   @db.VarChar(255)
  description String   @db.VarChar(255)
  staffId     Int?
  status      Int?     @default(1) @db.TinyInt
  createdAt   DateTime @db.DateTime(0)
  updatedAt   DateTime @db.DateTime(0)
  Staffs      Staffs?  @relation(fields: [staffId], references: [id], onDelete: Cascade, map: "Feeds_ibfk_1")

  @@index([staffId], map: "staffId")
}

model HideFeeds {
  id        Int                @id @default(autoincrement())
  feedId    Int
  userId    Int
  userType  HideFeeds_userType
  status    Int?               @default(1) @db.TinyInt
  createdAt DateTime           @db.DateTime(0)
  updatedAt DateTime           @db.DateTime(0)
  Athletes  Athletes           @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "HideFeeds_ibfk_1")

  @@index([userId], map: "userId")
}

model InjuryImages {
  id         Int        @id @default(autoincrement())
  injuryId   Int
  image      String     @db.VarChar(255)
  createdAt  DateTime   @db.DateTime(0)
  updatedAt  DateTime   @db.DateTime(0)
  InjuryLogs InjuryLogs @relation(fields: [injuryId], references: [id], onDelete: NoAction, map: "InjuryImages_ibfk_1")

  @@index([injuryId], map: "injuryId")
}

model InjuryLogs {
  id            Int                     @id @default(autoincrement())
  athleteId     Int?
  description   String?                 @db.VarChar(255)
  bodyPart      InjuryLogs_bodyPart
  bodyPartName  InjuryLogs_bodyPartName
  injuryDate    DateTime                @db.Date
  injuryTime    DateTime                @db.Time(0)
  activityType  InjuryLogs_activityType
  injuryType    InjuryLogs_injuryType
  recoveryTime  InjuryLogs_recoveryTime
  isAidDone     Boolean                 @default(true)
  medicalReport String?                 @db.VarChar(255)
  status        Boolean                 @default(true)
  createdAt     DateTime                @db.DateTime(0)
  updatedAt     DateTime                @db.DateTime(0)
  coachId       Int?
  InjuryImages  InjuryImages[]
  Athletes      Athletes?                @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "InjuryLogs_ibfk_55")
  Coaches       Coaches?                @relation(fields: [coachId], references: [id], map: "InjuryLogs_ibfk_56")

  @@index([athleteId], map: "athleteId")
  @@index([coachId], map: "coachId")
}

model Otps {
  id          Int            @id @default(autoincrement())
  countryCode String         @default("+91") @db.VarChar(255)
  mobile      String         @db.VarChar(255)
  otp         String         @db.VarChar(4)
  expiryTime  DateTime       @default(now()) @db.DateTime(0)
  verified    Int?           @default(0) @db.TinyInt
  userType    Otps_userType?
  status      Int?           @default(1) @db.TinyInt
  createdAt   DateTime       @db.DateTime(0)
  updatedAt   DateTime       @db.DateTime(0)
}

model Payments {
  id             Int                     @id @default(autoincrement())
  athleteId      Int
  sportId        Int
  batchId        Int
  price          Float                   @db.Float
  amountToBePaid Float                   @db.Float
  paidAmount     Float?                  @default(0) @db.Float
  planType       Payments_planType
  paymentType    Payments_paymentType
  paymentStatus  Payments_paymentStatus? @default(pending)
  status         Boolean?                @default(true)
  createdAt      DateTime                @db.DateTime(0)
  updatedAt      DateTime                @db.DateTime(0)
  Athletes       Athletes                @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "Payments_ibfk_808")
  Sports         Sports                  @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "Payments_ibfk_809")
  Batches        Batches                 @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "Payments_ibfk_810")

  @@index([athleteId], map: "athleteId")
  @@index([batchId], map: "batchId")
  @@index([sportId], map: "sportId")
}

model Ratings {
  id        Int      @id @default(autoincrement())
  athleteId Int
  coachId   Int
  sportId   Int
  rating    Int      @db.TinyInt
  comment   String?  @db.VarChar(255)
  status    Int?     @default(1) @db.TinyInt
  createdAt DateTime @db.DateTime(0)
  updatedAt DateTime @db.DateTime(0)
  Athletes  Athletes @relation(fields: [athleteId], references: [id], onDelete: NoAction, map: "Ratings_ibfk_953")
  Coaches   Coaches  @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "Ratings_ibfk_954")
  Sports    Sports   @relation(fields: [sportId], references: [id], onDelete: NoAction, map: "Ratings_ibfk_955")

  @@index([athleteId], map: "athleteId")
  @@index([coachId], map: "coachId")
  @@index([sportId], map: "sportId")
}

model Resources {
  id             Int             @id @default(autoincrement())
  drillId        Int?
  planId         Int?
  url            String          @db.VarChar(255)
  type           Resources_type
  createdAt      DateTime        @db.DateTime(0)
  updatedAt      DateTime        @db.DateTime(0)
  deletedAt      DateTime?       @db.DateTime(0)
  TrainingDrills TrainingDrills? @relation(fields: [drillId], references: [id], map: "Resources_ibfk_565")
  TrainingPlans  TrainingPlans?  @relation(fields: [planId], references: [id], map: "Resources_ibfk_566")

  @@index([drillId], map: "drillId")
  @@index([planId], map: "planId")
}

model ScheduledCenterBatches {
  id             Int            @id @default(autoincrement())
  schedulePlanId Int
  createdAt      DateTime       @db.DateTime(0)
  updatedAt      DateTime       @db.DateTime(0)
  deletedAt      DateTime?      @db.DateTime(0)
  centerId       Int?
  coachId        Int?
  batchId        Int?
  allCenters     Boolean        @default(false)
  allBatches     Boolean        @default(false)
  ScheduledPlans ScheduledPlans @relation(fields: [schedulePlanId], references: [id], onDelete: NoAction, map: "ScheduledCenterBatches_ibfk_318")
  Batches        Batches?       @relation(fields: [batchId], references: [id], map: "ScheduledCenterBatches_ibfk_320")
  Centers        Centers?       @relation(fields: [centerId], references: [id], map: "ScheduledCenterBatches_ibfk_321")
  Coaches        Coaches?       @relation(fields: [coachId], references: [id], map: "ScheduledCoachBatches_ibfk_321")

  @@index([batchId], map: "batchId")
  @@index([coachId], map: "coachId")
  @@index([centerId], map: "centerId")
  @@index([schedulePlanId], map: "schedulePlanId")
}

model ScheduledPlans {
  id                     Int                      @id @default(autoincrement())
  planId                 Int
  fromDate               DateTime                 @db.Date
  toDate                 DateTime                 @db.Date
  coachId                Int
  createdAt              DateTime                 @db.DateTime(0)
  updatedAt              DateTime                 @db.DateTime(0)
  deletedAt              DateTime?                @db.DateTime(0)
  ScheduledCenterBatches ScheduledCenterBatches[]
  TrainingPlans          TrainingPlans            @relation(fields: [planId], references: [id], onDelete: NoAction, map: "ScheduledPlans_ibfk_557")
  Coaches                Coaches                  @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "ScheduledPlans_ibfk_558")

  @@index([coachId], map: "coachId")
  @@index([planId], map: "planId")
}

model Sports {
  id                     Int                      @id @unique(map: "id") @default(autoincrement())
  name                   String                   @db.VarChar(255)
  subTitle               String                   @db.VarChar(255)
  about                  String                   @db.Text
  icon                   String?                  @db.VarChar(255)
  image                  String?                  @db.VarChar(255)
  status                 Int?                     @default(1) @db.TinyInt
  createdAt              DateTime                 @db.DateTime(0)
  updatedAt              DateTime                 @db.DateTime(0)
  deletedAt              DateTime?                @db.DateTime(0)
  createdBy              Int
  AcademySportsMaps      AcademySportsMaps[]
  AssessmentCenterSports AssessmentCenterSports[]
  AssessmentSports       AssessmentSports[]
  Assessments            Assessments[]
  AthleteAttendances     AthleteAttendances[]
  AthleteBatchesMaps     AthleteBatchesMaps[]
  AthleteSportsMaps      AthleteSportsMaps[]
  Batches                Batches[]
  CenterSports           CenterSports[]
  CoachSportsMaps        CoachSportsMaps[]
  Payments               Payments[]
  Ratings                Ratings[]
  Admin                  Admin                    @relation(fields: [createdBy], references: [id], map: "SportsAdmin_ibfk_1")
  SportsColorMaps        SportsColorMaps[]
  Tests                  Tests[]
  TrainingDrills         TrainingDrills[]
  TrainingPlans          TrainingPlans[]

  @@index([createdBy], map: "createdBy")
}

model SportsColorMaps {
  id        Int      @id @default(autoincrement())
  sportId   Int
  colorId   Int
  status    Boolean? @default(true)
  createdAt DateTime @db.DateTime(0)
  updatedAt DateTime @db.DateTime(0)
  Sports    Sports   @relation(fields: [sportId], references: [id], onDelete: Cascade, map: "SportsColorMaps_ibfk_517")
  Colors    Colors   @relation(fields: [colorId], references: [id], onDelete: Cascade, map: "SportsColorMaps_ibfk_518")

  @@index([colorId], map: "colorId")
  @@index([sportId], map: "sportId")
}

model Staffs {
  id               Int              @id @default(autoincrement())
  image            String?          @db.VarChar(255)
  dateOfBirth      DateTime         @db.Date
  designationId    Int
  centerId         Int
  payrollId        Int
  gender           Coaches_gender
  name             String           @db.VarChar(255)
  phone            String?          @unique(map: "phone") @db.VarChar(255)
  email            String?          @unique(map: "email") @db.VarChar(255)
  status           Int?             @default(1) @db.TinyInt
  createdAt        DateTime         @db.DateTime(0)
  updatedAt        DateTime         @db.DateTime(0)
  deletedAt        DateTime?        @db.DateTime(0)
  createdBy        Int
  Feeds            Feeds[]
  StaffShifts      StaffShifts[]
  Centers          Centers          @relation(fields: [centerId], references: [id], onDelete: Cascade, map: "StaffCenterMap_ibfk_517")
  StaffDesignation StaffDesignation @relation(fields: [designationId], references: [id], onDelete: Cascade, map: "StaffDesignationMaps_ibfk_517")
  StaffPayroll     StaffPayroll     @relation(fields: [payrollId], references: [id], onDelete: Cascade, map: "StaffPayrollMaps_ibfk_517")
  Admin            Admin            @relation(fields: [createdBy], references: [id], map: "StaffsAdmin_ibfk_1")

  @@index([createdBy], map: "createdBy")
  @@index([designationId], map: "designationId")
  @@index([payrollId], map: "payrollId")
  @@index([centerId], map: "StaffCenterMap_ibfk_517")
}

model StaffShifts {
  id        Int       @id @default(autoincrement())
  staffId   Int
  day       String    @db.VarChar(255)
  startTime String
  endTime   String
  shift     String    @db.VarChar(255)
  status    Int?      @default(1) @db.TinyInt
  createdAt DateTime  @default(now())
  updatedAt DateTime  @default(now())
  deletedAt DateTime? @db.DateTime(0)
  Staffs    Staffs    @relation(fields: [staffId], references: [id], onDelete: Cascade, map: "StaffShidtsMaps_ibfk_517")

  @@index([staffId], map: "staffId")
}

model StaffDesignation {
  id           Int            @id @default(autoincrement())
  designation  String         @db.VarChar(255)
  status       Int?           @default(1) @db.TinyInt
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @default(now())
  deletedAt    DateTime?      @db.DateTime(0)
  createdBy    Int
  Admin        Admin          @relation(fields: [createdBy], references: [id], map: "StaffDesignationAdmin_ibfk_1")
  StaffPayroll StaffPayroll[]
  Staffs       Staffs[]

  @@index([createdBy], map: "createdBy")
}

model StaffPayroll {
  id               Int              @id @default(autoincrement())
  taxable          Boolean          @default(false)
  grossSalary      Float
  slabId           Int?
  designationId    Int
  tax_percent      Int
  netSalary        Float
  status           Int?             @default(1) @db.TinyInt
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @default(now())
  deletedAt        DateTime?        @db.DateTime(0)
  createdBy        Int
  TaxSlabs         TaxSlabs?        @relation(fields: [slabId], references: [id], map: "PayrollSlabMaps_ibfk_517")
  StaffDesignation StaffDesignation @relation(fields: [designationId], references: [id], map: "StaffDesignationPayrol_ibfk_1")
  Admin            Admin            @relation(fields: [createdBy], references: [id], map: "StaffPayrollAdmin_ibfk_1")
  Staffs           Staffs[]
  Coaches          Coaches[]
  @@index([createdBy], map: "createdBy")
  @@index([designationId], map: "designationId")
  @@index([slabId], map: "slabId")
}

model TaxSlabs {
  id           Int            @id @default(autoincrement())
  fromAmount   Int
  toAmount     Int
  percentage   Int
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @default(now())
  deletedAt    DateTime?      @db.DateTime(0)
  createdBy    Int
  StaffPayroll StaffPayroll[]
  Admin        Admin          @relation(fields: [createdBy], references: [id], map: "TaxSlabAdmin_ibfk_1")

  @@index([createdBy], map: "createdBy")
}

model TestBanks {
  id                Int                 @id @default(autoincrement())
  title             String?             @db.VarChar(255)
  status            Int?                @default(1) @db.TinyInt
  createdAt         DateTime            @db.DateTime(0)
  updatedAt         DateTime            @db.DateTime(0)
  AssignedTestBanks AssignedTestBanks[]
  Tests             Tests[]
}

model Tests {
  id               Int                     @id @default(autoincrement())
  name             String                  @db.VarChar(255)
  testBankId       Int
  trainingLevel    Tests_trainingLevel
  objective        String                  @db.VarChar(255)
  description      String                  @db.VarChar(255)
  fitnessType      Tests_fitnessType?
  fitnessComponent Tests_fitnessComponent?
  sportId          Int?
  academyId        Int
  centerId         Int
  measureType      Tests_measureType
  unitType         Tests_unitType?
  units            Tests_units?
  minValue         Int?
  maxValue         Int?
  testGoal         Tests_testGoal?
  status           Int?                    @default(1) @db.TinyInt
  createdAt        DateTime                @db.DateTime(0)
  updatedAt        DateTime                @db.DateTime(0)
  AssignedTests    AssignedTests[]
  Centers          Centers                 @relation(fields: [centerId], references: [id], onDelete: NoAction, map: "TestsCenter_ibfk_2258")
  TestBanks        TestBanks               @relation(fields: [testBankId], references: [id], onDelete: NoAction, map: "Tests_ibfk_1146")
  Sports           Sports?                 @relation(fields: [sportId], references: [id], map: "Tests_ibfk_1147")
  Academies        Academies               @relation(fields: [academyId], references: [id], onDelete: NoAction, map: "Tests_ibfk_2258")

  @@index([sportId], map: "sportId")
  @@index([centerId], map: "centerId")
  @@index([testBankId], map: "testBankId")
  @@index([academyId], map: "academyId")
}

model TicketMessages {
  id        Int                     @id @default(autoincrement())
  ticketId  Int
  message   String?                 @db.VarChar(255)
  staffId   Int?
  createdAt DateTime                @db.DateTime(0)
  updatedAt DateTime                @db.DateTime(0)
  userId    Int
  userType  TicketMessages_userType
  Tickets   Tickets                 @relation(fields: [ticketId], references: [id], onDelete: Cascade, map: "TicketMessages_ibfk_371")
  Athletes  Athletes                @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "TicketMessages_ibfk_372")

  @@index([ticketId], map: "ticketId")
  @@index([userId], map: "userId")
}

model Tickets {
  id             Int                   @id @default(autoincrement())
  title          String                @db.VarChar(255)
  categoryId     Int
  description    String?               @db.VarChar(255)
  ticketStatus   Tickets_ticketStatus? @default(open)
  status         Int?                  @default(1) @db.TinyInt
  createdAt      DateTime              @db.DateTime(0)
  updatedAt      DateTime              @db.DateTime(0)
  userId         Int
  userType       Tickets_userType
  TicketMessages TicketMessages[]
  Categories     Categories            @relation(fields: [categoryId], references: [id], onDelete: Cascade, map: "Tickets_ibfk_387")
  Athletes       Athletes              @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "Tickets_ibfk_388")

  @@index([categoryId], map: "categoryId")
  @@index([userId], map: "userId")
}

model Tokens {
  id          Int             @id @default(autoincrement())
  userId      Int?
  countryCode String          @db.VarChar(255)
  phone       String          @unique(map: "phone") @db.VarChar(255)
  expiryDate  DateTime?       @db.DateTime(0)
  token       String?         @db.VarChar(255)
  userType    Tokens_userType
  status      Boolean?        @default(true)
  createdAt   DateTime        @db.DateTime(0)
  updatedAt   DateTime        @db.DateTime(0)
  deletedAt   DateTime?       @db.DateTime(0)
}

model TrainingDrills {
  id                 Int                              @id @default(autoincrement())
  name               String                           @db.VarChar(255)
  objective          String                           @db.VarChar(255)
  description        String                           @db.VarChar(255)
  coachingPoint      String                           @db.VarChar(255)
  level              TrainingDrills_level
  fitnessComponent   TrainingDrills_fitnessComponent?
  sportId            Int?
  coachId            Int
  status             Boolean                          @default(true)
  createdAt          DateTime                         @db.DateTime(0)
  updatedAt          DateTime                         @db.DateTime(0)
  deletedAt          DateTime?                        @db.DateTime(0)
  AssignedDrills     AssignedDrills[]
  AssignedEquipments AssignedEquipments[]
  Resources          Resources[]
  Sports             Sports?                          @relation(fields: [sportId], references: [id], map: "TrainingDrills_ibfk_597")
  Coaches            Coaches                          @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "TrainingDrills_ibfk_598")

  @@index([coachId], map: "coachId")
  @@index([sportId], map: "sportId")
}

model TrainingPlans {
  id               Int                    @id @default(autoincrement())
  name             String                 @db.VarChar(255)
  objective        String?                @db.VarChar(255)
  description      String?                @db.VarChar(255)
  coachingPoint    String?                @db.VarChar(255)
  duration         TrainingPlans_duration
  level            TrainingPlans_level
  fitnessComponent Json?
  sportId          Int?
  coachId          Int
  isScheduled      Boolean?
  status           Boolean?
  createdAt        DateTime               @db.DateTime(0)
  updatedAt        DateTime               @db.DateTime(0)
  deletedAt        DateTime?              @db.DateTime(0)
  Resources        Resources[]
  ScheduledPlans   ScheduledPlans[]
  Sports           Sports?                @relation(fields: [sportId], references: [id], map: "TrainingPlans_ibfk_581")
  Coaches          Coaches                @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "TrainingPlans_ibfk_582")

  @@index([coachId], map: "coachId")
  @@index([sportId], map: "sportId")
}

model AssignedDrillFitnessComponents {
  id               Int                                              @id @default(autoincrement())
  fitnessComponent AssignedDrillFitnessComponents_fitnessComponent?
  planId           Int
  createdAt        DateTime                                         @db.DateTime(0)
  updatedAt        DateTime                                         @db.DateTime(0)
  deletedAt        DateTime?                                        @db.DateTime(0)
  AssignedDrills   AssignedDrills[]
}

model AssignedDrills {
  id                             Int                            @id @default(autoincrement())
  drillFitnessComponentId        Int
  drillId                        Int
  createdAt                      DateTime                       @db.DateTime(0)
  updatedAt                      DateTime                       @db.DateTime(0)
  deletedAt                      DateTime?                      @db.DateTime(0)
  AssignedDrillFitnessComponents AssignedDrillFitnessComponents @relation(fields: [drillFitnessComponentId], references: [id], onDelete: NoAction, map: "AssignedDrills_ibfk_319")
  TrainingDrills                 TrainingDrills                 @relation(fields: [drillId], references: [id], onDelete: NoAction, map: "AssignedDrills_ibfk_320")

  @@index([drillFitnessComponentId], map: "drillFitnessComponentId")
  @@index([drillId], map: "drillId")
}

model AssignedEquipments {
  id             Int                          @id @default(autoincrement())
  drillId        Int
  equipment      AssignedEquipments_equipment
  quantity       Int
  createdAt      DateTime                     @db.DateTime(0)
  updatedAt      DateTime                     @db.DateTime(0)
  deletedAt      DateTime?                    @db.DateTime(0)
  TrainingDrills TrainingDrills               @relation(fields: [drillId], references: [id], onDelete: NoAction, map: "AssignedEquipments_ibfk_1")

  @@index([drillId], map: "drillId")
}

model CoachCentersBatches {
  id        Int       @id @unique(map: "id") @default(autoincrement())
  batchId   Int
  centerId  Int
  coachId   Int
  status    Int?      @default(1) @db.TinyInt
  createdAt DateTime  @db.DateTime(0)
  updatedAt DateTime  @db.DateTime(0)
  deletedAt DateTime? @db.DateTime(0)
  Centers   Centers   @relation(fields: [centerId], references: [id], onDelete: NoAction, map: "CoachCentersBatches_ibfk_253")
  Coaches   Coaches   @relation(fields: [coachId], references: [id], onDelete: NoAction, map: "CoachCentersBatches_ibfk_254")
  Batches   Batches    @relation(fields: [batchId], references: [id], onDelete: NoAction, map: "CoachCentersBatches_ibfk_255")

  @@unique([centerId, coachId], map: "CoachCentersBatches_centerId_coachId_unique")
    @@unique([centerId, coachId,batchId], map: "CoachCentersBatches_centerId_coachId_batchId_unique")

  @@index([coachId], map: "coachId")
}

model CoachQualifications {
  id              Int                                 @id @unique(map: "id") @default(autoincrement())
  certificateType CoachQualifications_certificateType
  startDate       DateTime                            @db.Date
  endDate         DateTime                            @db.Date
  coachId         Int
  createdAt       DateTime                            @db.DateTime(0)
  updatedAt       DateTime                            @db.DateTime(0)
  instituteName   String                              @db.VarChar(255)
  fileUrl         String?                             @db.VarChar(255)
  fileName        String?                             @db.VarChar(255)
  fileType        CoachQualifications_fileType?
  Coaches         Coaches                             @relation(fields: [coachId], references: [id], onDelete: Cascade, map: "CoachQualifications_ibfk_1")

  @@index([coachId], map: "coachId")
}

model Academies {
  id                Int                 @id @default(autoincrement())
  name              String              @db.VarChar(255)
  code              String              @unique(map: "code") @db.VarChar(255)
  status            Int?                @default(1) @db.TinyInt
  createdAt         DateTime            @db.DateTime(0)
  updatedAt         DateTime            @db.DateTime(0)
  deletedAt         DateTime?           @db.DateTime(0)
  AcademySportsMaps AcademySportsMaps[]
  Admin             Admin[]
  Assessments       Assessments[]
  Athletes          Athletes[]
  Batches           Batches[]
  CenterSports      CenterSports[]
  Centers           Centers[]
  Coaches           Coaches[]
  Tests             Tests[]
}

model AcademySportsMaps {
  id        Int        @id @unique(map: "id") @default(autoincrement())
  sportId   Int?
  academyId Int?
  status    Int?       @default(1) @db.TinyInt
  createdAt DateTime   @db.DateTime(0)
  updatedAt DateTime   @db.DateTime(0)
  Sports    Sports?    @relation(fields: [sportId], references: [id], map: "AcademySportsMaps_ibfk_283")
  Academies Academies? @relation(fields: [academyId], references: [id], map: "AcademySportsMaps_ibfk_284")

  @@index([academyId], map: "academyId")
  @@index([sportId], map: "sportId")
}

model CoachOnCenters {
  id             Int              @id @unique(map: "id") @default(autoincrement())
  coachId        Int
  centerId       Int
  status         Int?             @default(1) @db.TinyInt
  createdAt      DateTime         @db.DateTime(0)
  updatedAt      DateTime         @db.DateTime(0)
  deletedAt      DateTime?        @db.DateTime(0)
  Coaches        Coaches   @relation(fields: [coachId], references: [id], onDelete: Cascade, map: "CoachOnCenters_ibfk_21")
  Centers        Centers   @relation(fields: [centerId], references: [id], onDelete: Cascade, map: "CoachOnCenters_ibfk_22")

  @@unique([coachId, centerId], map: "CoachOnCenters_coachId_centerId_unique")
  @@index([centerId], map: "centerId")
}

model FeePlans {
  id                Int              @id @unique(map: "id") @default(autoincrement())
  name              String           @db.VarChar(255)
  amount            Float            @db.Float
  feeType           FeePlans_feeType
  isProrata         Boolean?
  recurringType     FeePlans_recurringType?
  isLate            Boolean?
  lateFeeType       FeePlans_isLateType?
  lateFee           Float?           @db.Float
  createdBy         Int
  currency          String?
  createdAt         DateTime    @db.DateTime(0)
  updatedAt         DateTime    @db.DateTime(0)
  status            Int        @default(1) @db.TinyInt
}

enum FeePlans_feeType {
  free
  one_time  @map("one time")
  recurring   
}

enum FeePlans_recurringType {
  bi_monthly  @map("bi monthly")
  quarterly
  half_yearly @map("half yearly")
  annually
}

enum FeePlans_isLateType {
  amount
  percentage
}

enum BatchSchedules_day {
  mon
  tue
  wed
  thu
  fri
  sat
  sun
}

enum AthleteAttendances_attendance {
  present
  absent
  rest_day   @map("rest day")
  cancelled
  not_marked @map("not marked")
}

enum AthleteSportsMaps_trainingLevel {
  beginner
  intermediate
  advanced
  developer
}

enum HideFeeds_userType {
  athlete
  coach
  both_exist
}

enum InjuryLogs_bodyPart {
  upper_body  @map("upper body")
  middle_body @map("middle body")
  lower_body  @map("lower body")
}

enum Tests_trainingLevel {
  beginner
  intermediate
  advanced
  developer
}

enum Athletes_gender {
  male
  female
}

enum InjuryLogs_bodyPartName {
  head
  neck
  left_shoulder     @map("left shoulder")
  right_shoulder    @map("right shoulder")
  chest
  upper_back        @map("upper back")
  left_elbow        @map("left elbow")
  right_elbow       @map("right elbow")
  left_wrist        @map("left wrist")
  right_wrist       @map("right wrist")
  left_hand         @map("left hand")
  right_hand        @map("right hand")
  left_finger       @map("left finger")
  right_finger      @map("right finger")
  groin
  glutes
  left_thigh        @map("left thigh")
  right_thigh       @map("right thigh")
  left_hamstring    @map("left hamstring")
  right_hamstring   @map("right hamstring")
  left_knee         @map("left knee")
  right_knee        @map("right knee")
  left_calf_muscle  @map("left calf muscle")
  right_calf_muscle @map("right calf muscle")
  left_ankle        @map("left ankle")
  right_ankle       @map("right ankle")
  left_achillis     @map("left achillis")
  right_achillis    @map("right achillis")
  left_heel         @map("left heel")
  right_heel        @map("right heel")
  left_toe_finger   @map("left toe finger")
  right_toe_finger  @map("right toe finger")
  abdomen
  lower_back        @map("lower back")
}

enum Resources_type {
  link
  image
  pdf
  video
}

enum Tickets_ticketStatus {
  open
  closed
}

enum Athletes_bloodGroup {
  APos  @map("A+")
  ANeg  @map("A-")
  BPos  @map("B+")
  BNeg  @map("B-")
  ABPos @map("AB+")
  ABNeg @map("AB-")
  OPos  @map("O+")
  ONeg  @map("O-")
}

enum TrainingDrills_level {
  beginner
  intermediate
  advanced
  developer
}

enum TrainingPlans_duration {
  daily
  weekly
  monthly
  quarterly
  half_yearly @map("half yearly")
  annual
}

enum Coaches_trainingLevel {
  beginner
  intermediate
  advanced
  developer
}

enum Otps_userType {
  athlete
  coach
  both_exist
}

enum Tests_fitnessType {
  general_fitness @map("general fitness")
  sport_specific  @map("sport specific")
}

enum Tokens_userType {
  athlete
  coach
  both_exist
}

enum TrainingDrills_fitnessComponent {
  endurance
  speed
  strength
  agility
  movement_coordination @map("movement coordination")
  balance
  flexibility
  reaction_time         @map("reaction time")
}

enum TrainingPlans_level {
  beginner
  intermediate
  advanced
  developer
}

enum Assessments_level {
  beginner
  intermediate
  advanced
  developer
}

enum Athletes_heightUnit {
  cm
  feet
}

enum Coaches_gender {
  male
  female
}

enum InjuryLogs_activityType {
  training
  competition
  other
}

enum Payments_planType {
  one_time
}

enum Tests_fitnessComponent {
  endurance
  speed
  strength
  agility
  movement_coordination @map("movement coordination")
  balance
  flexibility
  reaction_time         @map("reaction time")
}

enum TicketMessages_userType {
  athlete
  coach
  both_exist
}

enum Assessments_mode {
  recurring
  one_time  @map("one time")
}

enum InjuryLogs_injuryType {
  severe
  moderate
  mild
}

enum Payments_paymentType {
  monthly
}

enum Assessments_interval {
  weekly
  monthly
}

enum Athletes_weightUnit {
  kg
  pounds
}

enum InjuryLogs_recoveryTime {
  Days               @map("3 - 5 Days")
  weeks              @map("1 - 2 weeks")
  Less_than_a_month  @map("Less than a month")
  Months             @map("1 - 3 Months")
  More_than_3_months @map("More than 3 months")
}

enum Payments_paymentStatus {
  failed
  paid
  pending
}

enum Tickets_userType {
  athlete
  coach
  both_exist
}

enum Tests_measureType {
  numeric_value     @map("numeric value")
  star_rating_index @map("star rating index")
}

enum Tests_unitType {
  metric_units @map("metric units")
  time_units   @map("time units")
  heart_rate   @map("heart rate")
  reps
}

enum Tests_units {
  mm
  cm
  m
  km
  sec
  min
  hour
}

enum Assessments_assessmentStatus {
  ongoing
  completed
  upcoming
}

enum Tests_testGoal {
  lowest_value_is_high  @map("lowest value is high")
  highest_value_is_high @map("highest value is high")
}

enum AssignedDrillFitnessComponents_fitnessComponent {
  endurance
  speed
  strength
  agility
  movement_coordination @map("movement coordination")
  balance
  flexibility
  reaction_time         @map("reaction time")
}

enum CoachQualifications_certificateType {
  masters_degree_in_sports_or_fitness_training         @map("masters degree in sports or fitness training")
  bachelor_degree_in_sports_or_fitness_training        @map("bachelor degree in sports or fitness training")
  diploma_in_sports_coaching_or_fitness_training       @map("diploma in sports coaching or fitness training")
  coaching_license                                     @map("coaching license")
  certification_in_sports_coaching_or_fitness_training @map("certification in sports coaching or fitness training")
}

enum AssignedEquipments_equipment {
  dumbells
  barbells
  resistance_band      @map("resistance band")
  jump_rope            @map("jump rope")
  agility_ladder       @map("agility ladder")
  hurdles
  medicine_kettle_ball @map("medicine kettle ball")
  cones
  markers
  balls
  racket_or_bat        @map("racket or bat")
  net
  whistle
  stop_watch           @map("stop watch")
}

enum CoachQualifications_fileType {
  link
  image
  pdf
  video
}

enum Coaches_experienceLevel {
  zero_one
  two_five
  six_ten
  ten_over
}
