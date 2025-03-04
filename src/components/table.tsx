"use client";

import { Category, TableColumn } from "@/types/types";
import { Checkbox, Table } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

interface AppTableProps {
  columns: TableColumn[];
  data: Category[]; 
  rowClick?: (row: Record<string, any>) => void; 
}

export const AppTable = ({ columns, data, rowClick }: AppTableProps)=> {
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
                  <Table.Cell key={col.key} className="p-4">{row[col.key]}</Table.Cell>
                ))}
              <Table.Cell>
                  <a href="#" className="font-medium text-gray-700 dark:text-[darkgray]">
                  <FaEdit fontSize={"1.2rem"}/>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
  )
}