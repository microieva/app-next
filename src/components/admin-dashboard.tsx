import { Category, TableColumn, User } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import { Alert } from "./alert";
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const columnLabels: Record<string, string> = {
    name: "Category name",
    createdAt: "Created at",
    updatedAt: "Updated at",
    image: "Icon"
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories && data.categories.length > 0) {
          setData(data.categories);
          const cols: TableColumn[] = Object.keys(data.categories[0])
          .filter((key) => key !== "id") 
          .map((key) => ({
            label: columnLabels[key] || key.replace(/([A-Z])/g, " $1").trim(), 
            key: key as keyof Category,
          }));
        
        setColumns(cols);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(()=> {setLoading(false)});;
  }, [!isUpdating]);

  const handleDeleteCategory = async (id: string) => {
    setIsDeleting(true);
    setDeleteCategoryId(id);
  };
  const handleEditCategory = async (id: string) => {
    setIsUpdating(true);
    const category = data.find((category) => category.id === id);
    if (category) setCategory(category); else setCategory(undefined);

  };
  const handleConfirm = async () => {
    setLoading(true);
    if (deleteCategoryId) {
      const request = axios.delete(`/api/categories/${deleteCategoryId}`);

      request
      .then(async (response) => {
        if (response.status === 200) {
          setIsDeleting(false);
          setData((prev) => prev.filter((category) => category.id !== deleteCategoryId));
          setLoading(false);
        } 
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });  
    }
  }
    

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
              <Dialog isOpen={Boolean(error)} onClose={()=>{setError(null)}}><p>{error}</p></Dialog>
              {data && data.length>0 && 
                <AppTable 
                  columns={columns} 
                  data={data} 
                  rowClick={()=>{}} 
                  onDeleteCategory={handleDeleteCategory}
                  onEditCategory={handleEditCategory}
                  />}
            </div>
            {isUpdating && 
              <Dialog 
                isOpen={isUpdating} 
                onClose={() => setIsUpdating(false)}
              >
                <CategoryForm 
                  handleClose={() => setIsUpdating(false)} 
                  category={category}/>
              </Dialog>
            }  
             <Dialog 
              isOpen={isDeleting} 
              onClose={() => setIsDeleting(false)}
            >
              <Alert 
                onConfirm={()=>handleConfirm()} 
                type="warning" message="Delete category ?"/>
            </Dialog> 
        </div> 
      }
    </>
  )
}