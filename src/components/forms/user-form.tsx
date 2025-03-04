"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "../dialog";
import { Loading } from "../loading";

interface Props {
  me: any;
  handleClose: () => void;
}

export const UserForm = ({ me, handleClose}:Props) => {
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState<any>({firstName:me.firstName, lastName: me.lastName, email: me.email});
  const route = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/account/update", {userInput});
      if (response.status === 200) {
        await update({email: response.data.user.email, name: response.data.user.firstName+" "+response.data.user.lastName});  
        handleClose();  
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {loading && <Loading/>}
      <Dialog isOpen={Boolean(error)} onClose={()=>{}}><p>{error}</p></Dialog>
      <form action="#">
        <div className="grid gap-4 mb-4 sm:grid-cols-2 px-16 py-12">
            <div className="w-80 my-2">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  className="form-input" 
                  placeholder="Add first name" 
                  value={userInput.firstName}
                  onChange={(e)=>handleChange(e)}
                  />
            </div>
            <div className="w-80 my-2">
                <label >Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  className="form-input" 
                  placeholder="Add last name" 
                  value={userInput.lastName}
                  onChange={handleChange}
                  />
            </div>
            <div className="w-80 my-2">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="Add email" 
                  value={userInput.email}
                  onChange={handleChange}
                  />
            </div>
            <div className="w-80 my-2">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="date"
                  className="form-input" />
            </div>
          </div>
                  {/* <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Add new product
                  </button> */}
          <button
              type="submit"
              className="form-button-submit"
              onClick={(e)=>handleSubmit(e)}
          >
              Save
          </button>
        </form>
    </>
  )
}