import FeePlanTable from '~/components/FeePlan/FeePlanTable'
import {api} from '~/utils/api'

export const FeePlan = () => {
  const {data} = api?.feePlan.getAllFeePlans.useQuery({limit: 10})
  const feePlans = data?.data

  return (
    <div>
      <FeePlanTable tableData={feePlans} />
    </div>
  )
}

export default FeePlan
