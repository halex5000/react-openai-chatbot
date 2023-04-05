import React from "react";
import SimpleChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// all available props
const theme = {
  background: "#282828",
  fontFamily: "Audimat",
  headerBgColor: "#282828",
  headerFontColor: "#fff",
  headerFontSize: "25px",
  botBubbleColor: "#A34FDE",
  botFontColor: "#fff",
  userBubbleColor: "#405BFF",
  userFontColor: "#fff",
};

const steps = [
  {
    id: "1",
    message: "Do you have a question?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
  },
];

export default function ChatBot() {
  return (
    <ThemeProvider theme={theme}>
      <SimpleChatBot steps={steps} />;
    </ThemeProvider>
  );
}
