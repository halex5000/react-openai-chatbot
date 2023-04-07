import * as React from "react";
import PropTypes from "prop-types";
import MaterialAppBar from "@mui/material/AppBar";
import { Box, Typography, Grid, Toolbar, useTheme } from "@mui/material";
import Image from "mui-image";
import ThemeSwitcher from "./theme-switcher";
import darkModeLogo from "../assets/dark-mode-logo.png";
import lightModeLogo from "../assets/light-mode-logo.png";

function AppBar({}) {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MaterialAppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={1}>
                <Box sx={{ m: 2 }}>
                  <Image
                    height={75}
                    fit="contain"
                    src={
                      theme.palette.mode === "dark"
                        ? darkModeLogo
                        : lightModeLogo
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item>
                <Typography variant="h2" sx={{ mt: 3 }} className="heroText">
                  Chatbot Powered by LaunchDarkly
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <ThemeSwitcher />
        </Toolbar>
      </MaterialAppBar>
    </Box>
  );
}

AppBar.propTypes = {
  toggleNavigationDrawer: PropTypes.func,
};

export default AppBar;
