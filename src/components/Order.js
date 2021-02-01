import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { changeOrderStatus } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    backgroundColor: "red",
    borderRadius:"4px",
    color:"white"
  },
   orange: {
    backgroundColor: "orange",
    borderRadius:"4px",
    color:"white"
  },
  green: {
    backgroundColor: "green",
    borderRadius:"4px",
    color:"white"
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
   // marginBottom: 20,
   // marginTop: 10,
   // marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
   // marginBottom: 20,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});






const Order = (props) => {
   
    
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const order = props.order;
     
  const role = props.role;
     
  const style_classes = useStyles();
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();

  const handleCancel = () => {
    const body = {
      status: "Cancelled",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleAccept = () => {
    const body = {
      status: "Accepted",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleDelivery = () => {
    const body = {
      status: "Out For Delivery",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleCompleted = () => {
    const body = {
      status: "Completed",
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  
function createData(OrderId, Total, Status, Date, Item,Action,User_Name,Seller_Name) {
  return {
    OrderId,
    Total,
    Status,
    Date,
    Action,
    Seller_Name,
    User_Name,
    Item
  };
}
const {_id:OrderId,status:Status,createdAt:date,items:Item,status:Action}=order;


const {name:User_Name}=order.user;
const {name:Seller_Name}=order.seller;

var new_date = new Date(date);
  let totalPrice = 0;
  
    Item.forEach((item) => {
      totalPrice = totalPrice + item.quantity * item.item.price;
    });

const row = createData(OrderId,totalPrice,Status,new_date.toLocaleDateString(),Item,Action,User_Name,Seller_Name);
  return (
    <>


 <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.OrderId}
        </TableCell>
        <TableCell align="center">{role === "ROLE_USER" && `${row.Seller_Name}`}{role === "ROLE_SELLER" && `${row.User_Name}`}</TableCell>
        <TableCell align="center">${row.Total}</TableCell>
        <TableCell align="center">
        <div  className={(order.status === "Placed" ||order.status === "Accepted" || order.status === "Out For Delivery"  ) && style_classes.orange || order.status === "Completed" && style_classes.green ||  order.status === "Cancelled" && style_classes.red}>
        {row.Status}
        </div>
        </TableCell>
         <TableCell align="center">
             {role === "ROLE_USER" && order.status === "Placed" && (
          <Button
            className={style_classes.buttonCancel}
            onClick={handleCancel}
            disabled={order.status !== "Placed"}
          >
            Cancel Order
          </Button>
        )}
          {role === "ROLE_SELLER" && order.status === "Placed" && (
          <>
            
              <Button size="small" className={style_classes.buttonCancel} onClick={handleCancel}>
                Cancel Order
              </Button><br/>
              <Button size="small" className={style_classes.buttonAccept} onClick={handleAccept}>
                Accept Order
              </Button>
            
          </>
        )}
        {role === "ROLE_SELLER" && order.status === "Accepted" && (
          <Button className={style_classes.buttonAccept} onClick={handleDelivery}>
            Out For Delivery
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "Out For Delivery" && (
          <Button className={style_classes.buttonAccept} onClick={handleCompleted}>
            Order Completed
          </Button>
        )}
         </TableCell>
        <TableCell align="center">{row.Date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Item.map((item,i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.item.title}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell align="right">{item.item.price}</TableCell>
                      <TableCell align="right">
                        {Math.round(item.quantity * item.item.price )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>





    </>
  );
};
export default Order;



