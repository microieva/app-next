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
}

export const AppTable = ({ columns, data, rowClick, onDeleteCategory, onEditCategory }: AppTableProps)=> {
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
  
  return (
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4 table-header bg-gray-50 dark:bg-[#101116] border-b dark:border-[darkgray]">
              <Checkbox />
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
                  <Checkbox />
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