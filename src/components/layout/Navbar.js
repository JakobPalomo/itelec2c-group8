import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { db, auth } from "../../firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import DelayedTooltip from "../ui/DelayedTooltip";
import MenuItem from "@mui/material/MenuItem";

import "../../styles/globalStyles.css";
import "../../styles/Navbar.css";
const logoPath = "/assets/palengkerist-logo-white.png";
const logoTextPath = "/assets/palengkerist-text-white.png";
const profilePath = "/assets/sample-profile.jpg";
const navbarDesignPath = "/assets/navbar-design.svg";

const pages = [];
const accountNavs = [
  { page: "Account", path: "/account" },
  { page: "Logout", path: "" },
];

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function Navbar({ isLoggedIn, setIsLoggedIn, currUser, setCurrUser }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    if (setIsLoggedIn !== undefined) {
      try {
        await signOut(auth);
        if (isLoggedIn === true) {
          setIsLoggedIn(false);
        }
        if (currUser) {
          setCurrUser({});
        }
        navigate("/login");
      } catch (error) {
        console.error("Error signing out:", error);
        throw error;
      }
    }
  };

  const [homeTooltipOpen, setHomeTooltipOpen] = useState(false);
  const [accountTooltipOpen, setAccountTooltipOpen] = useState(false);

  const [profilePic, setProfilePic] = useState({});
  const getProfilePicPath = async () => {
    try {
      const response = await fetch(`/user/profile/${currUser?.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const media = await response.json();
      setProfilePic(media);
    } catch (error) {}
  };

  useEffect(() => {
    getProfilePicPath();
  }, []);

  return (
    <AppBar position="static" className="muiAppBar">
      <Toolbar disableGutters className="muiToolbar">
        {/* Logo and Text */}
        <Box sx={{ flexGrow: 1, minWidth: "220px" }}>
          <DelayedTooltip
            title="Home"
            delay={1000}
            open={homeTooltipOpen}
            setOpen={setHomeTooltipOpen}
          >
            <Link to="/">
              <img src={logoPath} alt="Logo" className="navLogo" />
              <img src={logoTextPath} alt="Logo" className="navLogoText" />
            </Link>
          </DelayedTooltip>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
        {/* Profile */}
        {isLoggedIn === true ? (
          <>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {/* Dropdown */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <DelayedTooltip
                  title="Account"
                  delay={1000}
                  open={accountTooltipOpen}
                  setOpen={setAccountTooltipOpen}
                >
                  <Avatar
                    {...stringAvatar("Ira Rayzel Ji")}
                    className="poppins"
                    src={profilePic ? profilePic.path : ""}
                  />
                  {/* comment src out/empty string for letter to work */}
                </DelayedTooltip>
              </IconButton>

              <Menu
                sx={{ mt: "45px", marginTop: "49px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  style: {
                    padding: 0,
                  },
                }}
              >
                {accountNavs.map((nav) => (
                  <MenuItem
                    key={nav.page}
                    onClick={handleCloseUserMenu}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#FFE6E0",
                        "& .pinkLinkp": {
                          fontWeight: "700 !important",
                        },
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#FFE6E0",
                      },

                      padding: "10px 25px",
                      width: "120px",
                    }}
                  >
                    {nav.page !== "Logout" ? (
                      <Link
                        to={nav.path}
                        style={{ textDecoration: "none" }}
                        className="pinkLink"
                      >
                        <Typography textAlign="center" className="pinkLinkp">
                          {nav.page}
                        </Typography>
                      </Link>
                    ) : (
                      <Typography
                        textAlign="center"
                        className="pinkLinkp"
                        onClick={handleLogout}
                      >
                        {nav.page}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>{" "}
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit" className="muiButton">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
      <div className="navBottomDesign">
        <img src={navbarDesignPath} alt="" className="navDesign" />
      </div>
    </AppBar>
  );
}
export default Navbar;
