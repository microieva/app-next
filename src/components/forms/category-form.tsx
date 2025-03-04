"use client";

import { Category } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Dialog } from "../dialog";
import { Loading } from "../loading";

interface Props {
  handleClose: () => void
}

export const CategoryForm = ({ handleClose }:Props) => { 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<Partial<Category>>({name:"", description:""}); // CategoryInput?

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/dashboard/settings/update", {input});
      console.log('response: ', response)
      if (response.status === 200) { 
        handleClose();  

      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {loading && <Loading/>}
    <form>
      <div className="my-2 w-96 mx-32">
        <label>Name</label>
        <input 
          placeholder="Add category name..."
          type="text" 
          name="name"
          className="form-input" 
          onChange={(e)=>handleChange(e)}/>
      </div>
      <div className="my-2 w-96 mx-32">

        <label>Description</label>
        <textarea 
          id="description" 
          name="description"
          rows={4} 
          className="form-input" 
          placeholder="Category description..."
          onChange={(e)=>handleChange(e)}
        >
        </textarea>

      </div>
      <div className="my-8">

        <div className="flex items-center justify-center w-full">
          <label className="form-input w-full cursor-pointer h-64 flex flex-col items-center justify-center group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt fontSize={"4rem"} className="dark:text-[#1c212b] text-gray-900 mr-6 dark:group-hover:text-white mb-4"/>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div> 

      </div>
      <Dialog isOpen={Boolean(error)} onClose={()=>{setError(null)}}><p>{error}</p></Dialog>
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