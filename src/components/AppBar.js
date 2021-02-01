import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//material-ui

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { logoutAction } from "../redux/actions/authActions";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#e8ede1",
    marginBottom: 10
  },
  buttonStyles: {
    color: "white",
    margin: "0 6px 0",
    display: "inline-block"
  },
  buttons: {
    marginRight: 60
  },
  mobilebuttons: {
    color: "white"
  },
  mobilebuttonStyles: {
    color: "white",
    margin: "0 6px 0",
    display: "inline-block"
  },
  name: {
    fontStyle: "bold",
    fontSize: 32
  },

  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  title: {
    display: "none",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function AppBarPrimary() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    account: { role },
    authenticated,
    firstName,
    lastName,
    address
  } = useSelector(state => state.auth);

  const handleLogout = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
    dispatch(logoutAction(history));
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [useranchorEl, setuserAnchorEl] = React.useState(null);

  //const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  //const isUserMenuOpen = Boolean(useranchorEl);

  //const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  // const handleUserMenuOpen = event =>{

  //   setuserAnchorEl(event.currentTarget);
  // };
  // const handleUserMenuClose = () => {
  //     setuserAnchorEl(null);
  //   };
  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    //  handleUserMenuClose();
  };

  // const handleMobileMenuOpen = event => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";

  const StyledMenuItem = withStyles(theme => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {authenticated ? role === "ROLE_SELLER" ? (
        <div>
          <StyledMenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/">Dashboard</Link>
            </MenuItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/seller/orders">Orders</Link>
            </MenuItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/seller/profile">Profile</Link>
            </MenuItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          </StyledMenuItem>
          <StyledMenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </StyledMenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <Link to={{ pathname: "/orders" }}>Orders</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to={{ pathname: "/cart", state: { address: address } }}>
              Cart
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/seller/orders">Orders</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to={{ pathname: "/cart", state: { address: address } }}>
              Cart
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </div>
      )}
    </Menu>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <FastfoodTwoToneIcon />
            </IconButton>
          </Link>
          <Link to="/">
            <Typography className={classes.title} variant="h4" noWrap>
              Tiffiny
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {authenticated ? role === "ROLE_SELLER" ? (
              <div className={classes.buttons}>
                <Link to="/">
                  <Typography className={classes.buttonStyles}>
                    Seller Dashboard
                  </Typography>
                </Link>
                <Link to="/seller/orders">
                  <Button className={classes.buttonStyles}>Orders</Button>
                </Link>
                <Link to="/seller/profile">
                  <Button className={classes.buttonStyles}>Profile</Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className={classes.buttonStyles}
                  variant="outlined"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className={classes.buttons}>
                <Typography className={classes.buttonStyles}>
                  Hello, {firstName} {lastName}
                </Typography>
                <Link to="/orders">
                  <Button className={classes.buttonStyles}>Orders</Button>
                </Link>
                <Link to={{ pathname: "/cart", state: { address: address } }}>
                  <Button className={classes.buttonStyles}>Cart</Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className={classes.buttonStyles}
                  variant="outlined"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className={classes.buttons}>
                <Link to="/login">
                  <Button className={classes.buttonStyles}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button className={classes.buttonStyles} variant="outlined">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className={classes.sectionMobile}>
            {authenticated ? role === "ROLE_SELLER" ? (
              <div className={classes.buttons}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            ) : (
              <div className={classes.mobilebuttons}>
                <Typography className={classes.mobilebuttonStyles}>
                  Hello, {firstName} {lastName}
                </Typography>
                {/*<Link to="/orders">
                  <Button className={classes.buttonStyles}>Orders</Button>
                </Link>
                <Link to={{ pathname: "/cart", state: { address: address } }}>
                  <Button className={classes.buttonStyles}>Cart</Button>
                </Link>*/}
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            ) : (
              <div className={classes.mobilebuttons}>
                <Link to="/login">
                  <Button className={classes.mobilebuttonStyles}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button
                    className={classes.mobilebuttonStyles}
                    variant="outlined"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </div>
  );
}
