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
  const theme = useTheme();
  const user = useAppStore((state) => state.user);

  return (
    <Grid container spacing={2} sx={{ textAlign: "center", mx: "auto" }}>
      <Image
        sx={{
          mt: 25,
        }}
        height={isMobile ? 100 : 250}
        fit="contain"
        src={theme.palette.mode === "dark" ? darkModeLogo : lightModeLogo}
      />
      <Grid item xs={2} />
      <Grid item xs={8}>
        <br />

        <Typography variant="h2" sx={{ mt: 8 }} className="heroText">
          Chatbot Powered by LaunchDarkly
        </Typography>
        <ChatBot />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default HomeBase;
