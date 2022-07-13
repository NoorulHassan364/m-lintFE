import React, { useMemo } from "react";
import { useTable } from "react-table";
import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

function BaseTable({
  columns: Columns,
  data: Data,
  edit,
  remove,
  view,
  download,
}) {
  const columns = useMemo(() => Columns, [Columns]);
  const data = useMemo(() => Data, [Data]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  console.log(data, "datatatata");

  return (
    <TableContainer sx={{ mt: 3 }}>
      <MUITable {...getTableProps()} stickyHeader>
        <TableHead>
          {headerGroups?.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup?.headers.map((column) => (
                <TableCell
                  variant="head"
                  {...column.getHeaderProps()}
                  sx={{
                    bgcolor: "#728FCE",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
              {/* actions */}
              {(edit || remove || view || download) && (
                <TableCell
                  sx={{
                    bgcolor: "#728FCE",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} hover>
                  {row?.cells.map((cell) => (
                    <TableCell
                      {...cell.getCellProps()}
                      size="small"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                  {/* actions */}
                  {(edit || remove || view || download) && (
                    <TableCell align="center" size="small">
                      {view && (
                        <IconButton
                          color="primary"
                          onClick={() => view(row.values)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}
                      {edit && (
                        <IconButton
                          color="info"
                          onClick={() => edit(row.original)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      {remove && (
                        <IconButton
                          color="error"
                          onClick={() => remove(row.original._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                      {download && (
                        <IconButton onClick={() => download(row.original)}>
                          <DownloadForOfflineIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          {data?.length < 1 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (remove || edit ? 1 : 0)}
                align="center"
              >
                <Typography color="GrayText">No records found!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MUITable>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default BaseTable;
