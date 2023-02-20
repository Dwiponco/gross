import { DataTable } from "components/shared";
import { Button } from "components/ui";
import React, { useState, useEffect, useMemo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store/index";

injectReducer("dumyUsers", reducer);

const Index = () => {
  const data = useSelector((state) => state.dumyUsers.data.listUsers);
  const loading = useSelector((state) => state.dumyUsers.data.userLoading);

  console.log("loading : ", loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReport());
  }, [dispatch]);

  const filter = {
    pageIndex: "",
    pageSize: data.length,
    sort: "",
    query: "",
    total: "",
  };

  const onPaginationChange = (page) => {
    console.log("page : ", page);
    // const newTableData = cloneDeep(tableData)
    // newTableData.pageIndex =  page
    // dispatch(setTableData(newTableData))
  };

  const onSelectChange = (value) => {
    console.log("value : ", value);
    // const newTableData = cloneDeep(tableData)
    // newTableData.pageSize =  Number(value)
    // newTableData.pageIndex = 1
    // dispatch(setTableData(newTableData))
  };

  const onSort = (sort, sortingColumn) => {
    console.log("sort : ", sort);
    console.log("sortingColumn : ", sortingColumn);
    // const newTableData = cloneDeep(tableData)
    // newTableData.sort = sort
    // dispatch(setTableData(newTableData))
    // dispatch(setSortedColumn(sortingColumn))
  };
  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Action",
        id: "action",
        accessor: (row) => row,
        Cell: (props) => (
          <Button
            // onClick={() => {
            //   setModalConfirm(true);
            //   setDataPopup(props.row.original);
            // }}
            size="xs"
            className="mr-2"
            icon={<HiOutlinePencil />}
          >
            <span>Edit</span>
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={loading}
        pagingData={filter}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
    </div>
  );
};

export default Index;
