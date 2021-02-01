import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SwipeableImages from "./SwipeableImages";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


//dialoge box

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//custom-hook
import useForm from "../hooks/forms";

import MyButton from "../util/MyButton";
import { deleteItem, editItem } from "../redux/actions/dataActions";
import ItemDialog from "../components/ItemDialog";
import { addToCart } from "../redux/actions/dataActions";

import "../style/slide.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection:"column",
     justifyContent:"center",

  },
  details: {
   
    width: "100%"
  },
  // content: {
  //  flexshrink: 3,
  // },
  cover: {
   
    width: 100
  },

  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ItemCard(props) {
  const classes = useStyles();
  const { title, imageUrl, description, price, _id, fooditems } = props;
  //  const imageUrlSplit = imageUrl.split("\\");
  //    console.log("imageUrlSplit",imageUrlSplit[0]);

  // const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}/${imageUrlSplit[1]}`; //3002 - server port
  const dispatch = useDispatch();

  const { authenticated, account: { role } } = useSelector(state => state.auth);
  const { addCartSuccess } = useSelector(state => state.data);

  const [open, setOpen] = useState(false);
  const [confirmopen, setConfirmOpen] = useState(false);
  const [openSnackBar, setSnackBar] = useState(false);
  const [image, setImage] = useState([]);
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
    fooditems: ""
  });

 const handleConfirmDialogeOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDialogeClose = () => {
    setConfirmOpen(false);
  };
  const handleFileSelect = event => {
    //setImage(event.target.files[0]);
    setImage([...(image !== null?  image :[]),event.target.files[0]]);
  };

  const handleClose = () => {
    inputs.title = "";
    inputs.description = "";
    inputs.price = "";
    inputs.fooditems = "";
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    const itemData = new FormData();
    // if (image !== null) itemData.append("image", image);
    // else itemData.append("image", imageUrl);
     if (image !== null){
      for (let pic of image) {
          itemData.append("image", pic);

    }

    }  
    itemData.append("title", inputs.title);
    itemData.append("fooditems", inputs.fooditems);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
 
    dispatch(editItem(itemData, _id)); // eslint-disable-next-line
    handleClose();
  };

  const openEdit = () => {
    inputs.title = title;
    inputs.fooditems = fooditems;
    inputs.price = price;
    inputs.description = description;
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteItem(_id));
  };

  const handleCart = () => {
    const itemData = {
      itemId: _id
    };
    dispatch(addToCart(itemData));
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      setSnackBar(false);
      return;
    }

    setSnackBar(false);
  };

  const handleSnackBar = (event, reason) => {
    if (addCartSuccess || addCartSuccess == null) setSnackBar(true);
  };

  return (
    <>
      <Card className={classes.root}>
        <SwipeableImages
          className={classes.cover}
          stylename="carousel-wrapper"
          images={imageUrl}
          type="home"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Ideal for Students
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Rs.{price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <br/>
            <Typography variant="subtitle1" component="h5">
              {fooditems.map((fooditem, index) => (
               
                  <li key={index}> <b>{fooditem}</b></li>
                
              ))}
            </Typography>
          </CardContent>
          <CardActions disableSpacing className={classes.actionbar}>
            {role === "ROLE_SELLER" ? (
              <div style={{ width: "100%" }}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={openEdit}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  style={{ marginLeft: "10px",backgroundColor:"#e04747" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmDialogeOpen}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
            ) : authenticated ? (
              <Button
                color="secondary"
                style={{
                  color: "#000",
                  width: "80%",
                  marginLeft: "10%",

                  marginRight: "10%"
                  // marginBottom: "10%",
                }}
                onClick={() => {
                  handleCart();
                  handleSnackBar();
                }}
                variant="contained"
              >
                Add to Cart
              </Button>
            ) : (
            
                <Button
                  color="secondary"
                  style={{
                    color: "#000",
                    width: "60%",
                    marginLeft: "20%",
                    marginBottom: "10%"
                  }}
                  variant="contained"
                >  <Link to="/login"   style={{
                    color: "black"}}>
                  Add to Cart
                  </Link>
                </Button>
              
            )}
          </CardActions>
        </div>
      </Card>

      <Dialog
        open={confirmopen}
        onClose={handleConfirmDialogeClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">CONFIRM TO DELETE?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you really want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogeClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
      />

      <div className={classes.snackbar}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3600}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            style={{ backgroundColor: "#157a21" }}
          >
            Item added to cart!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
