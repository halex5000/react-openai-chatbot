import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  TextField,
  Chip,
  Button,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import { nanoid } from "nanoid";
import BotIcon from "@mui/icons-material/SmartToyRounded";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedRounded";

const url = import.meta.env.VITE_CHATBOT_API_URL;

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [enteredQuestion, setEnteredQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [] = useState();

  useEffect(() => {
    if (messages && messages.length > 0) {
      console.log("message added:", messages[messages.length - 1]);
    }
  }, [messages]);

  const requestAnswer = async (askedQuestion) => {
    const response = await axios.get(url, {
      params: {
        question: askedQuestion,
      },
    });

    console.log("Answer returned: ", response.data.message.content);

    setAnswer(response.data.message.content);
  };

  useEffect(() => {
    if (enteredQuestion) {
      requestAnswer(enteredQuestion);
      setEnteredQuestion("");
    }
  }, [enteredQuestion]);

  useEffect(() => {
    if (answer) {
      setMessages([
        {
          id: nanoid(),
          from: "assistant",
          content: answer,
        },
        ...messages,
      ]);
      setAnswer("");
    }
  }, [answer]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            label="Ask me a question"
            fullWidth
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
            value={question}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Button
            size="large"
            sx={{ ml: 2, height: "100%" }}
            fullWidth
            variant="contained"
            onClick={() => {
              setMessages([
                {
                  id: nanoid(),
                  from: "user",
                  content: question,
                },
                ...messages,
              ]);
              setEnteredQuestion(question);
              setQuestion("");
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List>
          {messages.map((message) => {
            const label = message.content;
            const isUser = message.from === "user";
            const variant = isUser ? "outlined" : "";
            const color = isUser ? "primary" : "success";
            return (
              <ListItem
                key={message.id}
                sx={{
                  ml: isUser ? 0 : "50%",
                  mr: 5,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={label}
                      icon={
                        message.from === "user" ? (
                          <SentimentSatisfiedAltIcon sx={{ m: 1 }} />
                        ) : (
                          <BotIcon sx={{ m: 1 }} />
                        )
                      }
                      sx={{
                        height: "auto",
                        "& .MuiChip-label": {
                          display: "block",
                          whiteSpace: "normal",
                        },
                      }}
                      color={color}
                    />
                  </Stack>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
