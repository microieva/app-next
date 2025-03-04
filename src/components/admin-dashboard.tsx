import { Category, TableColumn, User } from "@/types/types";
import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { Dialog } from "./dialog";
import { CategoryForm } from "./forms/category-form";
import { AppTable } from "./table";

interface Props {
  me: Partial<User>
}

export const AdminDashboard = ({ me }:Props) => { 
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<TableColumn[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setData(data.categories);
            const cols = Object.keys(data.categories[0]).map((key) => 
              ({
              label: key, 
              key: key as keyof Category
            })
          );
          setColumns(cols as TableColumn[]); 
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("An unexpected error occurred");
      })
      .finally(()=> {setLoading(false)});;
  }, [!isUpdating]);

  return (
    <>
      {me && 
        <div className="w-full mx-auto">
          <h1 className="h1">Application settings</h1>
           <div className="flex flex-col self-center w-full mt-8 mb-32 space-y-8">
              <button className="title-button group" onClick={()=> setIsUpdating(true)}>
                <TbCategoryPlus fontSize={"4rem"} className="dark:text-[#1c212b] text-gray-900 mr-6 dark:group-hover:text-white"/>
                Add new category
              </button>
            </div>
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {data && data.length>0 && <AppTable columns={columns} data={data} rowClick={()=>{}}/>}
            </div>
            {isUpdating && 
                <Dialog 
                  isOpen={isUpdating} 
                  onClose={() => setIsUpdating(false)}
                >
                  <CategoryForm handleClose={() => setIsUpdating(false)}/>
                </Dialog>
            }   
        </div> 
      }
    </>
  )
}