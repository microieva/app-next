"use client"

import { Alert } from "@/components/alert";
import { Dialog } from "@/components/dialog";
import { PasswordForm } from "@/components/forms/password-form";
import { UserForm } from "@/components/forms/user-form";
import { Loading } from "@/components/loading";
import { formatFriendlyDate, formatWithTime } from "@/lib/utils/date";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDelete, MdVpnKey } from "react-icons/md";

export default function Account() {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPsw, setIsChangingPsw] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    fetch('/api/account')
      .then(res => res.json())
      .then(data => {
        setMe(data.me)
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(()=> {setLoading(false)});
  }, [!isUpdating]);

  const handleClose = () => {
    setIsUpdating(false);
    setIsChangingPsw(false);
  }

  const handleConfirm = async () => {
    try {
      const res = await axios.post('/api/account/delete');
      if (res.status === 200) {
        router.push('/');
      }

    } catch (error) {
      console.error(error);
    }

    setIsDeleting(false);
  }

  if (loading) return <Loading/>;

  return (
    <div className="flex flex-col">
      {me ? 
      <>
        <h1 className="h1 py-5">Account data</h1>
        <div className="flex flex-row mt-16 self-center">
          <div className="flex flex-row">
            <div className="flex flex-row">
              <div className="flex items-center justify-center h-full">
                <CgProfile fontSize={"10rem"} className="dark:text-[#1c212b] text-gray-900"/>
              </div>
              <div className="self-center pl-8 pr-32 space-y-2">
                <h2 className="text-2xl font-bold dark:text-[darkgrey] text-gray-900">{me.firstName} {me.lastName}</h2>
                <p className="text-gray-600">{me.email}</p>
                <p className="text-gray-600">{me.role.name}</p>
              </div>
            </div>
            <div className="wrapper-with-border">
              <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                <div className="w-full space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[darkgrey]">Account created</h2>
                    <p className="text-gray-600">{formatFriendlyDate(me.createdAt)}</p>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[darkgrey]">Last updated</h2>
                    <p className="text-gray-600">{formatFriendlyDate(me.updatedAt)}</p>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[darkgrey]">Last logout</h2>
                    <p className="text-gray-600">{formatWithTime(me.lastLogout)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="h2 mt-32 mb-16">Settings</h2>
        <div className="flex flex-col self-center w-full mb-32 space-y-8">
          <button className="title-button group" onClick={()=> setIsChangingPsw(true)}>
            <MdVpnKey fontSize={"4rem"} className="dark:text-[#1c212b] text-gray-900 mr-6 dark:group-hover:text-white"/>
            Change password
          </button>
          <button className="title-button group" onClick={()=> setIsUpdating(true)}>
            <IoSettingsSharp fontSize={"4rem"} className="dark:text-[#1c212b] text-gray-900 mr-6 dark:group-hover:text-white"/>
            Update account details
          </button>
          <button className="title-button group" onClick={()=> setIsDeleting(true)}>
            <MdDelete fontSize={"4rem"} className="dark:text-[#1c212b] text-gray-900 mr-6 dark:group-hover:text-white"/>
            Delete account
          </button>
        </div>
      </> : 
      <>
        <div>error: </div>
      </>}
      <Dialog 
        isOpen={isUpdating} 
        onClose={() => setIsUpdating(false)}
      >
        <UserForm me={me} handleClose={() => handleClose()}/>
      </Dialog>
      <Dialog 
        isOpen={isChangingPsw} 
        onClose={() => setIsChangingPsw(false)}
      >
        <PasswordForm handleClose={() => handleClose()}/>
      </Dialog>
      <Dialog 
        isOpen={isDeleting} 
        onClose={() => setIsDeleting(false)}
      >
        {/* <PasswordForm handleClose={() => handleClose()}/> */}
        <Alert onConfirm={()=>handleConfirm()} type="warning" message="Are you sure you want to delete your account?  All data will be deleted."/>
      </Dialog>
    </div>
  );
};