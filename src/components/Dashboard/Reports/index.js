import React from "react";
import BaseTable from "../../utils/table/BaseTable";
import Paper from "@mui/material/Paper";
import {
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReportAPI } from "../../../api";
import EditReport from "./EditReport";
import AddReport from "./AddReport";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import base64Img from "base64-img";
import imageToBase64 from "image-to-base64";

let user, admin;

const columns = [
  {
    Header: "#",
    accessor: (prop) =>
      prop.viewImage ? prop?.viewImage : prop?.dashboardId?.image,
    Cell: ({ value }) => (
      <Avatar
        alt="image"
        variant="square"
        sx={{
          width: 66,
          height: 56,
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: 2,
        }}
        src={value}
      />
    ),
  },
  { Header: "Title", accessor: "title" },
  { Header: "Description", accessor: "description" },
];

const Index = () => {
  const [q, setQ] = React.useState("");
  const [searchParam] = React.useState(["title"]);
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState();
  const [editOpen, setEditOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [userState, setUserState] = React.useState();
  const [adminState, setAdminState] = React.useState();
  const [download, setDownload] = React.useState();
  const [isActive, setActive] = React.useState(false);

  const search = (items) => {
    return items?.filter((item) => {
      return searchParam?.some((newItem) => {
        return (
          item[newItem]?.toString()?.toLowerCase()?.indexOf(q?.toLowerCase()) >
          -1
        );
      });
    });
  };

  const getReports = (admin_Id) => {
    setActive(true);
    ReportAPI.getReports(admin_Id).then((res) => {
      console.log(res);
      setData(res?.data?.data);
      setActive(false);
    });
  };

  const deleteReport = (_id) => {
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
        ReportAPI.deleteReport(_id).then((res) => {
          getReports(res?.data?.admin_Id);
        });
      }
    });
  };

  const makePDF = (values) => {
    console.log(values);
    let doc = new jsPDF();
    doc.setFontSize(30);
    doc.setFont(undefined, "bold");
    doc.text(60, 20, `${values?.title}`);
    doc.setFontSize(19);
    doc.setTextColor("gray");
    doc.setFont(undefined, "italic");
    doc.text(20, 30, `${values?.description}`, {
      maxWidth: 170,
    });

    if (values?.viewImage) {
      doc.addImage(values?.viewBase64, "PNG", 5, 70, 200, 160);
    } else {
      doc.addImage(values?.dashboardId?.imageBase64, "PNG", 5, 70, 200, 160);
    }

    doc.save(`${values?.title}.pdf`);
    if (user) {
      const data = { userId: user?.response?._id, adminId: values?.admin_Id };
      ReportAPI.downloadReport(values._id, data).then((res) =>
        console.log(res)
      );
    }
  };

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin !== undefined) {
      console.log(admin);
      getReports(admin?.response?._id);
      setAdminState(admin);
    } else {
      console.log(user);
      getReports(user?.response?.admin_Id?._id);
      setUserState(user);
    }
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: "bolder", fontSize: 25, pb: 2 }}>
        All Reports
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box display={"flex"} justifyContent={"space-between"} padding={1.4}>
          <TextField
            variant="standard"
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create
          </Button>
        </Box>

        {adminState ? (
          isActive ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
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
              remove={deleteReport}
              download={makePDF}
            />
          )
        ) : isActive ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <CircularProgress />
          </Box>
        ) : (
          <BaseTable columns={columns} data={search(data)} download={makePDF} />
        )}
        <EditReport
          edit={edit}
          getReports={getReports}
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
        <AddReport open={open} getReports={getReports} setOpen={setOpen} />
      </Paper>
    </>
  );
};

export default Index;
