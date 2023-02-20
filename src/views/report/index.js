import { DataTableNew, ConfirmDialog, DataTable } from "components/shared";
import { Button } from "components/ui";
import React, { useState, useEffect, useMemo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store/index";

injectReducer("dumyUsers", reducer);

const Index = () => {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [dataPopup, setDataPopup] = useState({});
  const data = useSelector((state) => state.dumyUsers.data.listUsers);
  const loading = useSelector((state) => state.dumyUsers.data.userLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReport());
  }, [dispatch]);

  const columns = useMemo(() => [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Maid Name", accessor: "maidenName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: (props) => {
        console.log("props.row.original : ", props.row.original);
        return <span>{props.row.original.phone}</span>;
      },
    },
    { Header: "Birth Date", accessor: "birthDate" },
    { Header: "Height", accessor: "height" },
    { Header: "Weight", accessor: "weight" },
    { Header: "Domain", accessor: "domain" },
    {
      Header: "Action",
      id: "action",
      accessor: (row) => row,
      Cell: (props) => (
        <Button
          onClick={() => {
            setModalConfirm(true);
            setDataPopup(props.row.original);
          }}
          size="xs"
          className="mr-2"
          icon={<HiOutlinePencil />}
        >
          <span>Edit</span>
        </Button>
      ),
    },
  ]);

  return (
    <div>
      <DataTable data={data} loading={loading} columns={columns} />
      {/* <DataTableNew
        data={data}
        loading={loading}
        columns={columns}
        // selectable={true}
        // select={(value) => console.log("value select : ", value)}
      /> */}
      <ConfirmDialog
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
        // onRequestClose={onDialogClose}
        type="danger"
        title="Delete product"
        onCancel={() => setModalConfirm(false)}
        // onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete{" "}
          <b>{dataPopup.firstName + " " + dataPopup.lastName}</b>? All record
          related to this product will be deleted as well. This action cannot be
          undone.
        </p>
      </ConfirmDialog>
    </div>
  );
};

export default Index;
