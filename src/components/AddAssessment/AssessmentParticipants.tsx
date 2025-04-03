import React, { useContext, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";

import { useRouter } from "next/router";
import { ASSIGN_PARTICIPANT_TABLE_HEADERS } from "~/constants/assessment";
import { FormContext } from "~/pages/assessments/AddAssessment/AddAssessmentForm";

interface Options {
  label: string | undefined;
  value: string | number | undefined;
}

interface CenterOptions {
  label: string | undefined;
  value: string | number | undefined;
}

const AssessmentParticipants = (props: { finalFormSubmissionHandler: any; }) => {
  const router = useRouter()
  const [participants, setParticipants] = useState<{ [key: string]: any }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { data: sessionData } = useSession();

  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token ? sessionData?.token?.academyId : sessionData?.user?.academyId


  const { data: allCenters } = api.center.getAllCenters.useQuery();
  const { data: allSports } = api.sports.getAllSports.useQuery();
  const { data: allBatches } = api.batches.getAllBatches.useQuery();
  const { data: allAthletesBatchMaps } = api.athleteBatches.getAthletesByBatchId.useQuery();

  const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null);
  const [selectedSportId, setSelectedSportId] = useState<number | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);

  const [centerOptions, setCenterOptions] = useState<Options[]>([]);
  const [sportOptions, setSportOptions] = useState<Options[]>([]);
  const [batchOptions, setBatchOptions] = useState<Options[]>([]);
  const [athleteOptions, setAthleteOptions] = useState<Options[]>([]);

  // Populate Center options
  useEffect(() => {
    if (Array.isArray(allCenters) && allCenters.length > 0) {
      const options = allCenters.map((center) => ({
        label: center.name ?? "",
        value: center.id,
      }));
      setCenterOptions(options);
    }
  }, [allCenters]);

  // Populate Sport options based on selected Center
  useEffect(() => {
    if (selectedCenterId !== null && Array.isArray(allSports)) {
      const filteredSports = allSports
        .filter((sport) => sport.centerId === selectedCenterId)
        .map((sport) => ({
          label: sport.name ?? "",
          value: sport.id,
        }));

      setSportOptions(filteredSports);
      setSelectedSportId(null); // Reset selected sport
      setBatchOptions([]); // Clear batch options
      setAthleteOptions([]); // Clear athlete options
    }
  }, [selectedCenterId, allSports]);

  // Populate Batch options based on selected Sport and Center
  useEffect(() => {
    if (selectedCenterId !== null && selectedSportId !== null && Array.isArray(allBatches)) {
      const filteredBatches = allBatches
        .filter((batch) => batch.centerId === selectedCenterId && batch.sportId === selectedSportId)
        .map((batch) => ({
          label: batch.name ?? "",
          value: batch.id,
        }));

      setBatchOptions(filteredBatches);
      setSelectedBatchId(null); // Reset selected batch
      setAthleteOptions([]); // Clear athlete options
    }
  }, [selectedCenterId, selectedSportId, allBatches]);

  // Populate Athlete options based on selected Batch
  useEffect(() => {
    if (selectedBatchId !== null && Array.isArray(allAthletesBatchMaps)) {
      const filteredAthletes = allAthletesBatchMaps
        .filter((athlete) => athlete.batchId === selectedBatchId)
        .map((athlete) => ({
          label: athlete.name ?? "",
          value: athlete.id,
        }));

      setAthleteOptions(filteredAthletes);
    }
  }, [selectedBatchId, allAthletesBatchMaps]);

  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const onSaveParticipants = (currentParticipantsData: { name: string; value: number }) => {
    setParticipants((prevTestBanks) => [
      ...prevTestBanks,
      { centerId: selectedCenterId ?? 0, sportId: selectedSportId ?? 0, batchId: selectedBatchId ?? 0, athleteId: currentParticipantsData.value ?? 0, name: currentParticipantsData.name },
    ]);
  };

  const removeParticipants = (index: number) => {
    const arr = [...participants];
    arr.splice(index, 1);
    setParticipants(arr);
  };



  return (
    <>

      <AddForm
        cardTitle="CREATE ASSESSMENT"
        tableTitle="SCHEDULE PARTICIPANTS"
        tableFields={[
          {
            type: "select",
            name: "center",
            placeholder: "Select Center",
            options: centerOptions,
          },
          {
            type: "select",
            name: "sport",
            placeholder: "Select Sport",
            options: sportOptions,
          },
          {
            type: "select",
            name: "batch",
            placeholder: "Select Batch",
            options: batchOptions,
          },
          {
            type: "select",
            name: "athlete",
            placeholder: "Select Athlete",
            options: athleteOptions,
          },
        ]}
        TableHeadings={ASSIGN_PARTICIPANT_TABLE_HEADERS}
        tablekey="participants"
        tableData={participants}
        addTableData={onSaveParticipants}
        buttonItems={{ finish: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButton={() => {
          setShowModal(!showModal);
        }}
        onRemoveTableButton={removeParticipants}
        setDependentKey={(value: number) => setSelectedCenterId(value)}
        setDependentKey1={(value: number) => setSelectedSportId(value)}
        setDependentKey2={(value: number) => setSelectedBatchId(value)}

        finalFormSubmissionHandler={props?.finalFormSubmissionHandler}
      />
    </>
  );
};

export default AssessmentParticipants;
