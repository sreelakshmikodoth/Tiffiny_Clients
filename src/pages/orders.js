import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { getOrders, socketStatusUpdate } from "../redux/actions/dataActions";
//import OrderCard from "../components/OrderCard";
import Order from "../components/Order";
//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "10px 0px 10px 130px",
    display: "inline-block",
    marginRight: "40%",
  },
  tablecontainer:{
    marginRight: "5%",
    marginLeft: "5%"
  }
}));

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.data);
  const {
    account: { role },
    _id,
  } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrders());
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id });
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order));
      }
      if (data.action === "create") {
        dispatch(getOrders());
        dispatch(getOrders());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Order History
      </Typography>
      <div className={classes.tablecontainer}>
       <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Id</TableCell>
            <TableCell align="center">{role === "ROLE_USER" && 'Ordered From'}{role === "ROLE_SELLER" && 'Ordered By'}</TableCell>
            <TableCell align="center">Total </TableCell>
            <TableCell align="center">Status</TableCell>

              <TableCell align="center">Action</TableCell>
            <TableCell align="center">Date(MM/DD/YY)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {orders ? (
              orders.length > 0 ? (
                orders.map((order,i) => (
                 <Order key={i}  order={order} role={role} />
                ))
              ) : (
                <p className={classes.para}>No Orders present.</p>
              )
            ) : null}
         
        </TableBody>
      </Table>
    </TableContainer>
    </div>


   
    </>
  );
};

export default Orders;
