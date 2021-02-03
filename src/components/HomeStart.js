import React from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//import cover from "../images/food_upscaled.png";
import cover from "../images/fooddelivery.jpg";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "100%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    // eslint-disable-next-line
    ["@media (max-width:1024px)"]: {
      flexDirection: "column",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 60,
    height: "340px",
  },
  safeFood: {
    fontSize: 60,
    fontWeight: 400,
  },
  delivery: {
    color: "#157a21",
    fontSize: 60,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
  paragraph: {
   // width: 400,
    fontSize: 14.5,
  },
  cover: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "53vh",
  },
  coverImg: {
    height: "100%",
  },
  ctaOrder: {
    fontSize: 18,
    backgroundColor: "#f7a692",
    marginTop: 30,
  },

   mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(cover)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    alignItems:"center",
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const HomeStart = () => {
  const classes = useStyles();
  return (
    <>
    
    {/*<section className={classes.presentation}>
      <div className={classes.introduction}>
        <Typography className={classes.safeFood} noWrap>
          Homely Food
        </Typography>
        <Typography className={classes.delivery} noWrap>
          DELIVERY
        </Typography>
        <Typography variant="body2" className={classes.paragraph}>
          Get highly quality home made food from these tiffin service provider near you.Order on weekly basis with wide varieties of options.
        </Typography>
       
      </div>
      <div className={classes.cover}>
        <img src={cover} alt="safe-delivery" className={classes.coverImg} />
      </div>
    </section>*/}
     <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${cover})` , height:"550px" }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={cover} alt="hb" />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
             HOMELY FOOD DELIVERY
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
             Get highly quality home made food from these tiffin service provider near you.Order on weekly basis with wide varieties of options.
            </Typography>
            <Link variant="subtitle1"  color="inherit">
               
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
    </>
  );
};

export default React.memo(HomeStart);
