import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
import { PRICING_TABLE_HEADER } from "~/constants/pricingConstant";

export default function Pricing() {
  const [filterByName, setFilterByName] = useState("");
  const router = useRouter();
  return (
    <>
      {/* <Checkout /> */}
      <MultiTabComp
        tab1label="Free Plan"
        tab2label="Pricing"
        addButtonText="Add Fee Plan"
        addButtonUrl="/pricing/AddPlans"
        dropdownItems={{}}
        table1show={true}
        table2show={false}
        TABLE1_HEAD={PRICING_TABLE_HEADER}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={[]}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        onViewClick={(id: number) => {}}
        onEditClick={(id: number) => {}}
        onDeleteClick={(id: number) => {}}
      />
    </>
  );
}
