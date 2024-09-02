import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
import { PRICING_TABLE_HEADER } from "~/constants/pricingConstant";

export default function Pricing() {
  const [filterByName, setFilterByName] = useState("");
  const [activeKey,setActiveKey]=useState("0")
  const [filters, setFilters] = useState<{ [key: string]: any }>([]);



  const handleFilters = (appliedFilters: { [key: string]: any }) => {
    setFilters(appliedFilters);
  };


  const router = useRouter();
  return (
    <>
      {/* <Checkout /> */}
      <MultiTabComp
        tab1label="Fee Plan"
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
        filters={[]}
        applyFilters={(appliedFilters: { [key: string]: any }) =>
          handleFilters(appliedFilters)
        }
        filterByName={filterByName} 
        activeKey={activeKey} 
        setActiveKey={(value:string)=>setActiveKey(value)}        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />
    </>
  );
}
