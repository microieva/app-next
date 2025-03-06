"use client";

import { Category, TableColumn } from "@/types/types";
import { Checkbox, Table } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface AppTableProps {
  columns: TableColumn[];
  data: Category[]; 
  rowClick?: (row: Record<string, any>) => void; 
  onDeleteCategory?: (id: string) => void;
  onEditCategory?: (id: string) => void;
  onBulkDelete?: (ids: string[]) => void;
  onSelectAll: () => void;
  onCheckboxChange: (id: string) => void;
  selectedCategories: string[];
}

export const AppTable = ({ 
    columns, 
    data, 
    selectedCategories,
    rowClick, 
    onDeleteCategory, 
    onEditCategory,
    onBulkDelete,
    onSelectAll,
    onCheckboxChange
     }: AppTableProps)=> {
  
  const handleDelete = (id: string) => {
    if (onDeleteCategory) {
      onDeleteCategory(id);
    }
  };

  const handleEdit = (id: string) => {
    if (onEditCategory) {
      onEditCategory(id);
    }
  };

  const handleBulkDelete = () => {
    if (onBulkDelete) {
      onBulkDelete(selectedCategories);
    }
  };
  
  return (
      <div>
        <div className="flex gap-2 mb-4">
          <button 
            style={{visibility: selectedCategories.length === 0 ? "hidden" : "visible"}}
            onClick={handleBulkDelete} 
            disabled={selectedCategories.length === 0}
            type="button" 
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Delete</button>
        </div>

        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4 table-header bg-gray-50 dark:bg-[#101116] border-b dark:border-[darkgray]">
              <Checkbox  onChange={onSelectAll} checked={selectedCategories.length === data.length && data.length > 0}/>
            </Table.HeadCell>
            {columns.map((col) => (
              <Table.HeadCell key={col.key} className="p-4 table-header bg-gray-50 dark:bg-[#101116] border-b dark:border-[darkgray]">{col.label}</Table.HeadCell>
            ))}
            <Table.HeadCell className="table-header bg-gray-50 dark:bg-[#101116] border-b dark:border-[darkgray]">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell className="table-header bg-gray-50 dark:bg-[#101116] border-b dark:border-[darkgray]">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((row, rowIndex) => (
              <Table.Row
                key={rowIndex}
                className="cursor-pointer table-row dark:hover:bg-[#111317]"
                onClick={() => rowClick && rowClick(row)}
              >
                <Table.Cell className="p-4">
                  <Checkbox onChange={() => onCheckboxChange(row.id)} checked={selectedCategories.includes(row.id)}/>
                </Table.Cell>
                {columns.map((col) => (
                  <Table.Cell 
                    key={col.key} 
                    className={`p-4 ${col.label === "description" ? "max-w-[20rem] truncate" : ""}`}
                  >
                    {row[col.key] || "N/A"}
                  </Table.Cell>
                ))}
              <Table.Cell>
                  <a href="#" className="font-medium text-gray-700 dark:text-[darkgray]">
                  <FaEdit fontSize={"1.2rem"}  onClick={()=>handleEdit(row.id)}/>
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a href="#" className="font-medium text-gray-700 dark:text-[darkgray]">
                  <MdDelete fontSize={"1.2rem"} onClick={()=>handleDelete(row.id)}/>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
  )
}