// the commented items in side nav are for second phase release
import AssessmentsIcon from "~/components/Icons/AssessmentsIcon";
import AtheleteIcon from "~/components/Icons/AtheleteIcon";
import CentersIcon from "~/components/Icons/CentersIcon";
import CoachIcon from "~/components/Icons/CoachIcon";
// import CompetitionsIcon from "~/components/Icons/CompetitionsIcon";
import DashboardIcon from "~/components/Icons/DashboardIcon";
import PlanAndPricingIcon from "~/components/Icons/PlanAndPricingIcon";
import PostIcon from "~/components/Icons/PostIcon";
import ReportsIcon from "~/components/Icons/ReportsIcon";
// import StaffIcon from "~/components/Icons/StaffIcon";
import SupportIcon from "~/components/Icons/SupportIcon";
// import TrainingDrillsIcon from "~/components/Icons/TrainingDrillsIcon";
// import TrainingPlanIcon from "~/components/Icons/TrainingPlanIcon";
import InjuryLogsIcon from "~/components/Icons/InjuryLogsIcon";
// import StaffPayrollIcon from "~/components/Icons/StaffPayrollIcon";
// import FinancialAnalyticIcon from "~/components/Icons/FinancialAnalyticIcon";
// import InventoryIcon from "~/components/Icons/InventoryIcon";
import SettingsIcon from "~/components/Icons/SettingsIcon";

export const SIDE_NAV_ITEMS = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Centers",
    route: "/centers",
    icon: <CentersIcon />,
  },
  // {
  //   label: "Staffs",
  //   route: "/staff",
  //   icon: <StaffIcon />,
  // },
  {
    label: "Coach",
    route: "/coach",
    icon: <CoachIcon />,
  },
  {
    label: "Athlete",
    route: "/athlete",
    icon: <AtheleteIcon />,
  },
  {
    label: "Injury Logs",
    route: "/injury",
    icon: <InjuryLogsIcon />,
  },
  {
    label: "Assessments",
    route: "/assessments",
    icon: <AssessmentsIcon />,
  },
  // {
  //   label: "Training Drills",
  //   route: "/drills",
  //   icon: <TrainingDrillsIcon />,
  // },
  // {
  //   label: "Training Plan",
  //   route: "/plans",
  //   icon: <TrainingPlanIcon />,
  // },
  // {
  //   label: "Competitions",
  //   route: "/competitions",
  //   icon: <CompetitionsIcon />,
  // },
  {
    label: "Support",
    route: "/support",
    icon: <SupportIcon />,
  },
  {
    label: "Plan and Pricing",
    route: "/pricing",
    icon: <PlanAndPricingIcon />,
  },
  // {
  //   label: "Staff Payroll",
  //   route: "/payroll",
  //   icon: <StaffPayrollIcon />,
  // },
  // {
  //   label: "Financial Analytic",
  //   route: "/financial",
  //   icon: <FinancialAnalyticIcon />,
  // },
  // {
  //   label: "Inventory",
  //   route: "/inventory",
  //   icon: <InventoryIcon />,
  // },
  {
    label: "Post",
    route: "/post",
    icon: <PostIcon />,
  },
  {
    label: "Reports",
    route: "/reports",
    icon: <ReportsIcon />,
  },
  {
    label: "Settings",
    route: "/settings",
    icon: <SettingsIcon />,
  },
];
