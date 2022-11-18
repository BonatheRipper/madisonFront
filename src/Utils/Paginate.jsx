import React from "react";
import { TbGridDots } from "react-icons/tb";

export function paginatePager(setCurrentTable, pageNumber) {
  setCurrentTable(pageNumber);
}

export function paginateNumbersLength(items, itemsPerTable) {
  let arr = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerTable); i++) {
    arr.push(i);
  }
  return arr;
}
export function paginatePageToDisplay(
  items,
  indexOfFirstTable,
  indexOfLastTable
) {
  return items.slice(indexOfFirstTable, indexOfLastTable);
}
export function PaginateOrder({ SetToggleSort, toggleSort, setItemsPerPage }) {
  return (
    <div className="flex flex-col items-end justify-end ">
      <button
        onClick={() => SetToggleSort(!toggleSort)}
        type="button"
        className="hover:text-white hover:bg-black hover:p-1"
      >
        <TbGridDots />
      </button>
      <div
        className={`p-2 mr-3 shadow-xl rounded-md text-gray-600 justify-between bg-white flex flex-col items-start  ${
          toggleSort ? "relative" : "scale-y-0 static"
        }  `}
      >
        <button
          onClick={() => setItemsPerPage(10)}
          className="p-1 hover:text-red-500"
        >
          10
        </button>
        <button
          onClick={() => setItemsPerPage(50)}
          className="p-1 hover:text-red-500"
        >
          50
        </button>
        <button
          onClick={() => setItemsPerPage(100)}
          className="p-1  hover:text-red-500"
        >
          100
        </button>
      </div>
    </div>
  );
}
