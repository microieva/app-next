import { User } from "@/types/types"

interface Props {
  me: User
}

export const UserDashboard = ({me}:Props) => { 
  return (
    <>
      {me && <div>User Dashboard: {me.role.name}</div> }
    </>
  )
}