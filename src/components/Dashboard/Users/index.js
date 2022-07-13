import React from "react";
import BaseTable from "../../utils/table/BaseTable";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../../api";
import EditUser from "./EditUser";
import InviteUser from "./InviteUser";
import Swal from "sweetalert2";

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Address", accessor: "address" },
  { Header: "Phone", accessor: "phone" },
];

const Index = () => {
  const [q, setQ] = React.useState("");
  const [searchParam] = React.useState(["name"]);
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState();
  const [editOpen, setEditOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const [download, setDownload] = React.useState();
  const [isActive, setActive] = React.useState();

  const search = (items) => {
    return items?.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  const getUsers = (admin_Id) => {
    setActive(true);
    UserAPI.getUsers(admin_Id).then((res) => {
      setData(res?.data?.data);
      setActive(false);
    });
  };

  const deleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserAPI.deleteUser(_id).then((res) => {
          getUsers(res?.data?.admin_Id);
        });
      }
    });
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin !== undefined) {
      console.log(admin);
      getUsers(admin?.response?._id);
      setAdminState(admin);
    } else {
      console.log(user);
      getUsers(user?.response?.admin_Id?._id);
      setUserState(user);
    }
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
        All Users
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box display={"flex"} justifyContent={"space-between"} padding={1.4}>
          <TextField
            variant="standard"
            placeholder="Search"
            value={q}
            size="small"
            onChange={(e) => setQ(e.target.value)}
          />
          {adminState ? (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Invite
            </Button>
          ) : null}
        </Box>

        {adminState ? (
          isActive ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <BaseTable
              columns={columns}
              data={search(data)}
              edit={(values) => {
                setEdit(values);
                setEditOpen(true);
              }}
              remove={deleteUser}
            />
          )
        ) : isActive ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingBottom={2}
          >
            <CircularProgress />
          </Box>
        ) : (
          <BaseTable columns={columns} data={search(data)} />
        )}
        <EditUser
          edit={edit}
          getUsers={getUsers}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
        <InviteUser open={open} getUsers={getUsers} setOpen={setOpen} />
      </Paper>
    </>
  );
};

export default Index;
