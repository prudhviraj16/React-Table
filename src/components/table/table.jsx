import React, { useState, useEffect, useMemo } from "react";
import { columns, GROUPED_COLUMNS } from "../columns";
import data from "../data.json";
import {
  useSortBy,
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import "./table.css";
import GlobalFilter from "../Globalfilter";
import Checkbox from "../Checkbox";

const Table = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    state,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect, 
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id : 'selection',
            Header : ({getToggleAllRowsSelectedProps}) => (
              <Checkbox {...getToggleAllRowsSelectedProps()}/>
            ),
            Cell : ({row}) => (
              <Checkbox {...row.getToggleRowSelectedProps()}/>
            )
          },
          ...columns
        ]
      })
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps}>
        <thead>
          {headerGroups?.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers?.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page?.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row?.cells?.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          {footerGroups?.map((footerGroup, i) => (
            <tr {...footerGroup.getFooterGroupProps()} key={i}>
              {footerGroup?.headers?.map((column, index) => (
                <td key={index} {...column.getFooterProps}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
        <pre>
          <code>
            {JSON.stringify({
              selectedFlatRows : selectedFlatRows.map((row) => row.original)
            }, null,2)}
          </code>
        </pre>
      </table>
      <div>
        <span>
          Page {' '}
          <strong>
            {pageIndex+1} of {pageOptions?.length}
          </strong>
        </span>

        <span>
          Go to page : {' '}
          <input type="number" style={{width : '50px'}} defaultValue={pageIndex+1} onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value)-1 : 0
            gotoPage(pageNumber)
          }}/>
        </span>

        <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
          {[10,25,50].map((pageSize,index) => (
            <option value={pageSize} key={index}>Show {pageSize}</option>
          ))}
        </select>

        <button onClick={() => gotoPage(0)}>{"<<"}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount-1)}>{">>"}</button>
      </div>
    </>
  );
};

export default Table;
