import React, { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Pagination, Select, Input, Checkbox } from "components/ui";
import { TableRowSkeleton } from "components/shared";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
} from "react-table";
import { matchSorter } from "match-sorter";

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, onChange, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox ref={resolvedRef} onChange={(_, e) => onChange(e)} {...rest} />
    );
  }
);

function FilterInput({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex justify-end">
      <div className="flex items-center mb-4">
        <span className="mr-2">Search:</span>
        <Input
          size="sm"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          style={{ maxWidth: 180 }}
          placeholder={`${count} records...`}
        />
      </div>
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const pageSizeOption = [
  { value: 10, label: "10 / page" },
  { value: 20, label: "20 / page" },
  { value: 30, label: "30 / page" },
  { value: 40, label: "40 / page" },
  { value: 50, label: "50 / page" },
];

const ReactTable = (props) => {
  const { data, columns, loading, select, selectable } = props;

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns,
    state: { pageIndex, pageSize },
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: false,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (selectable) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  select(selectedFlatRows);

  const firstPageRows = rows.slice(0, 10);

  const onPaginationChange = (page) => {
    gotoPage(page - 1);
  };

  const onSelectChange = (value) => {
    setPageSize(Number(value));
  };

  return (
    <div>
      <FilterInput
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()}>
        {loading && data.length === 0 ? (
          <TableRowSkeleton columns={columns.length} />
        ) : (
          <>
            <THead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="w-full"
                    >
                      {typeof column.render("Header") === "object" ? (
                        <div>{column.render("Header")}</div>
                      ) : (
                        <span>
                          {column.render("Header")}
                          <Sorter sort={column.isSortedDesc} />
                        </span>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </THead>
            <TBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
              {firstPageRows.length === 0 && (
                <Tr>
                  <Td className="text-center" colSpan={allColumns.length}>
                    No data found!
                  </Td>
                </Tr>
              )}
            </TBody>
          </>
        )}
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={pageSize}
          currentPage={pageIndex + 1}
          total={rows ? rows.length : 0}
          onChange={onPaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <Select
            size="sm"
            isSearchable={false}
            value={pageSizeOption.filter((option) => option.value === pageSize)}
            options={pageSizeOption}
            onChange={(option) => onSelectChange(option.value)}
          />
        </div>
      </div>
    </div>
  );
};

const DataTableNew = ({ data, loading, columns, select, selectable }) => {
  return (
    <>
      <ReactTable
        columns={columns}
        data={data}
        loading={loading}
        select={(value) => (selectable ? select(value) : selectable)}
        selectable={selectable}
      />
    </>
  );
};

DataTableNew.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  selectable: PropTypes.bool,
  select: PropTypes.func,
};

DataTableNew.defaultProps = {
  data: [],
  columns: [],
  loading: false,
  selectable: false,
};
export default DataTableNew;
