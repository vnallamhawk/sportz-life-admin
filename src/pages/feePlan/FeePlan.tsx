import {api} from '~/utils/api'

export const FeePlan = () => {
  const {data: feePlansData} = api.feePlan.getAllFeePlans.useQuery()
  return <div></div>
}

export default FeePlan
