import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import Image from "mui-image";
import { isMobile } from "react-device-detect";
import darkModeLogo from "../assets/dark-mode-logo.png";
import lightModeLogo from "../assets/light-mode-logo.png";
import { useAppStore } from "../store/app";
import LinkCarousel from "../components/link-carousel";
import ChatBot from "../components/chatbot";

function HomeBase() {
  const user = useAppStore((state) => state.user);

  return (
    <Grid
      container
      spacing={2}
      sx={{ textAlign: "center", mx: "auto", mt: 15 }}
    >
      <Grid item xs={1} />
      <Grid item xs={8}>
        <ChatBot />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default HomeBase;
