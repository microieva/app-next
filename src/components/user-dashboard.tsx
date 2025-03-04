interface Props {
  me:any
}

export const UserDashboard = ({me}:Props) => { 
  return (
    <>
      {me && <div>User Dashboard: {me.role.name}</div> }
    </>
  )
}