import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";
import { AppThemeContext } from "../../providers/theme";
import { Theme } from "../../common/theme/theme";
import { AuthContext } from "../../providers/auth";
import { Button } from "@mui/material";

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const { currentTheme, setTheme } = useContext(AppThemeContext);
  const location = useLocation();

  const headerText = location.pathname === "/login" ? "LOGIN" : "TODO LIST";
  const setCurrentTheme = () => {
    const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme && setTheme(newTheme);
  };

  const logout = () => {
    signOut?.();
    navigate("/login");
  };

  return (
    <header>
      <Grid container justifyContent={"right"}>
        {user && <Button onClick={logout}>Logout</Button>}
      </Grid>

      <Grid container justifyContent={"space-between"} mt={5} mb={5}>
        <h2>{headerText}</h2>
        <IconButton
          color="primary"
          aria-label="theme switcher"
          onClick={setCurrentTheme}
        >
          {currentTheme === Theme.DARK ? (
            <BrightnessLowIcon />
          ) : (
            <Brightness6Icon />
          )}
        </IconButton>
      </Grid>
    </header>
  );
};
