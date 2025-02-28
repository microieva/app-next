import { Spinner } from "flowbite-react";

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Spinner size="xl" className="animate-spin" color="gray"/>
    </div>
  )
}