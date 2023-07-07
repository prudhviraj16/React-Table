import React, { useState, useEffect, useMemo } from "react";
import data from "./data.json";
import { useTable, useSortBy } from "react-table";

import { columns } from './columns';

const Sorttable = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups?.map((headerGroup,i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers?.map((column,index) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                {column.render("Header")}
                <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
              </th>
            ))} 
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows?.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row?.cells?.map((cell,index) => {
                return <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        {footerGroups?.map((footerGroup,i) => (
          <tr {...footerGroup.getFooterGroupProps()} key={i}>
            {footerGroup?.headers?.map((column,index) => (
              <td {...column.getFooterProps} key={index}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default Sorttable;
