/* eslint-disable */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Card from "~/components/Card";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import { useSession } from "next-auth/react";
import AddAssessment from "~/components/AddAssessment/AddAsessment";
import AssignTestBank from "~/components/AddAssessment/AssignTestBank";
import AddAssessmentScoring from "~/components/AddAssessment/AddAssessmentScoring";
import AddAssessmentSchedule from "~/components/AddAssessment/AddAsessmentSchedule";
import AssessmentParticipants from "../../../components/AddAssessment/AssessmentParticipants";
const multiFormData = {
  name: "",
  image: "",
  phoneNumber: "",
  email: "",
  address: "",
  sports: [],
  isEditMode: false,
  description: "",
  level: "",
  sportId: ""
};

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
  multiFormData: {
    formData: multiFormData,
  },
};
export interface FormContextTypes {
  stepData: {
    currentStep: number;
    setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  };
  multiFormData: {
    formData: any;
    setFormData?: React.Dispatch<React.SetStateAction<any>>;
  };
}

interface TestBank {
  testBankId: number;
}

interface AssignedAthlete {
  athleteId: number;
}

interface Tests {
  testBankId: number;
  testId: number;
}

export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddAssessmentForm() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId;

  const hasRun = useRef(false); // Track if useEffect has already run

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const [assessmentId, setAssessmentId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);



  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };

  const { mutate: createMutate } = api.assessment.createAssessment.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      setAssessmentId(response?.id)

      return response
    },
  });

  const finalFormSubmissionHandler = async (finalForm: any) => {

    if (academyId) {
      if (formData.isEditMode) {
      } else {
        // eslint-disable-next-line no-console
        createMutate({
          name: finalForm.name,
          academyId: parseInt(academyId as string),
          sportId: parseInt(finalForm.sportId as string),
          description: finalForm.description,
          startDate: new Date(finalForm.startDate),
          endDate: new Date(finalForm.endDate),
          level: finalForm.level,
          mode: finalForm.duration,
          interval: finalForm.type,
          assessmentStatus: 'ongoing',
        });

        setFormData(finalForm);
      }
    }
  };

  const { mutateAsync: createMutateAssignedTestBanks } =
    api.assignedTestBank.createMany.useMutation({
      onSuccess: (response) => {
        console.log("response data in assigned test banks created", response);
        // router.push("/athlete").then(() => window.location.reload());
        return response;
      },
    });

  const { mutate: createMutateAssignedTests } =
    api.assignedTest.createMany.useMutation({
      onSuccess: (response) => {
        console.log("response data in assigned tests created", response);
        // router.push("/athlete").then(() => window.location.reload());
        return response;
      },
    });

  const { mutate: createMutateAssignedAthletes } =
    api.assessmentAssignedAthlete.createMany.useMutation({
      onSuccess: (response) => {
        console.log("response data in assigned tests created", response);
        router.push("/assessments").then(() => window.location.reload());
        return response;
      },
    });


  useEffect(() => {
    if (!hasRun.current && formData && assessmentId) {
      if (formData.testBanks && formData.testBanks.length > 0) {
        const testBanks = formData.testBanks.map(({ testBankId }: TestBank) => ({
          testBankId,
          assessmentId,
          createdAt: new Date(),
          updatedAt: new Date()
        }));

        // ✅ Wait for mutation to complete
        createMutateAssignedTestBanks(testBanks)
        hasRun.current = true;
      }

      if (formData.participants && formData.participants.length > 0) {
        const assignedAthlete = formData.participants.map(({ athleteId }: AssignedAthlete) => ({
          athleteId,
          assessmentId,
          createdAt: new Date(),
          updatedAt: new Date()
        }));

        createMutateAssignedAthletes(assignedAthlete)

      }
    }
  }, [assessmentId, JSON.stringify(formData)]);


  const { data: assignedTestBanks } = api.assignedTestBank.getAssignedTestBanksByAssessmentId.useQuery(
    {
      id: assessmentId ?? 0,
    }
  );

  useEffect(() => {
    if (assignedTestBanks && assignedTestBanks.length > 0) {
      console.log("Fetched Assigned Test Banks:", assignedTestBanks);
      // 🔹 Map testBankId to assignedTestBankId
      const testBankMap = assignedTestBanks.reduce((acc, item) => {
        acc[item.testBankId] = item.id;
        return acc;
      }, {} as Record<number, number>);

      // 🔹 Prepare assigned tests
      const assignedTests = formData.testBanks.map(({ testBankId, testId }: Tests) => ({
        assignedTestBankId: testBankMap[testBankId],
        testId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // 🔹 Call mutation to create assigned tests
      createMutateAssignedTests(assignedTests);
    }
  }, [assignedTestBanks]);






  return (
    <FormContext.Provider value={formProviderData}>
      <div className="bg-s-gray lg:px-6 lg:pb-7">
        <div className="grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full min-h-[535px] !rounded-r-none rounded-l-xl p-0 pb-0 pt-10 lg:col-span-4 lg:bg-white lg:pb-6 ">
            {currentStep === 1 && <AddAssessment />}
            {currentStep === 2 && <AssignTestBank />}
            {currentStep === 3 && <AddAssessmentScoring />}
            {currentStep === 4 && <AddAssessmentSchedule />}
            {currentStep === 5 && (
              <AssessmentParticipants
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>
        </div>
      </div>
    </FormContext.Provider>
  );
}
