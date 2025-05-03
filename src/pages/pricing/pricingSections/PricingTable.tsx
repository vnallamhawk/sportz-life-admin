// import Image from "next/image";
// import { Radio } from "flowbite-react";
// import { Switch } from "@material-tailwind/react";
// import Download from "../../../images/download-white.svg";
// import DownloadPink from "../../../images/download-pink.svg";
// import Visa from "../../../images/visa.svg";
import AcadameicPlanningSection from './acadamicPlanningSection'
import PaymentMethods from './paymentMethods'
import BillingHistory from './billingHistory'

export default function PricingTable() {
  return (
    <div className=''>
      <div className='mb-5 font-heading text-3xl font-medium uppercase'>Academy Pricing</div>
      <div className='grid w-full grid-cols-12  grid-rows-1 gap-4'>
        <div className='col-span-8'>{<AcadameicPlanningSection />}</div>
        <div className='col-span-4'>{<PaymentMethods />}</div>
      </div>
      <div className='mt-8 rounded-lg border border-gray-300 p-4'>
        <BillingHistory />
      </div>
    </div>
  )
}
