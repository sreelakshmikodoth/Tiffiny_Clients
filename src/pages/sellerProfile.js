import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//custom-hook
import useForm from "../hooks/forms";

import ItemDialog from "../components/ItemDialog";
import RestaurantInfo from "../components/RestaurantInfo";

import { addItem } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

export default function SellerDashboard() {
  const classes = useStyles();
  const sellerData = useSelector((state) => state.auth);
  const { items } = sellerData;
  const dispatch = useDispatch();


  return (
    <>
      <RestaurantInfo {...sellerData} />
     
    </>
  );
}
