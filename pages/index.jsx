import Head from "next/head";
import React from "react";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EmoticonIcons from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { ref, onValue } from "firebase/database";
import { database } from "@/database/firebase";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState(null);
  React.useEffect(() => {
    const db = database;
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  });
  return (
    <>
      <Head>
        <title>Telegrom | Chatting App</title>
        <meta name="description" content="Telegrom chatting app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          container
          sx={{
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <Grid
            item
            xs={4}
            xl={2.5}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              borderRight: "1px solid rgba(225, 225, 225, 1)",
              height: "100%",
            }}
          >
            <div className="pt-3 px-3 d-flex align-items-center justify-content-between">
              <Typography
                variant="h6"
                sx={{
                  color: "#7E98DF",
                  float: "left",
                }}
              >
                <b>Telegrom</b>
              </Typography>

              <IconButton
                size="large"
                edge="start"
                color="#7E98DF"
                aria-label="open drawer"
                sx={{ mr: 2, float: "right" }}
              >
                <MenuIcon
                  sx={{
                    color: "#7E98DF",
                  }}
                />
              </IconButton>
            </div>

            <div className="px-3 d-flex align-items-center gap-2 mt-5">
              <TextField
                label=""
                id=""
                size="small"
                placeholder="Type your message..."
                className=""
                sx={{ width: "85%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button>
                <AddIcon
                  className="w-100"
                  sx={{
                    fontSize: "35px",
                    color: "#7E98DF",
                  }}
                />
              </Button>
            </div>

            <div className="p-3">
              <Stack
                spacing={2}
                direction="row"
                className="justify-content-left"
              >
                <Button variant="text">
                  <b>All</b>
                </Button>
                <Button variant="text">
                  <b>Important</b>
                </Button>
                <Button variant="text">
                  <b>Unread</b>
                </Button>
              </Stack>
            </div>

            <div className="">
              <List
                sx={{
                  height: "80vh",
                  overflowY: "auto",
                  width: "100%",
                  bgcolor: "background.paper",
                  paddingBottom: "80px",
                }}
              >
                {[...new Array(15)].map((item, key) => {
                  return (
                    <React.Fragment>
                      <ListItem
                        key={key}
                        alignItems="flex-start"
                        button
                        selected={selectedChat === key}
                        onClick={() => {
                          setIsClicked(true);
                          setSelectedChat(key);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Brunch this weekend?"
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {key} -Ali Connors
                              </Typography>
                              {
                                " — I'll be in your neighborhood doing errands this…"
                              }
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </React.Fragment>
                  );
                })}
              </List>
            </div>
          </Grid>
          <Grid
            item
            xs={8}
            xl={9.5}
            sx={{
              backgroundColor: "rgba(250, 250, 250, 1)",
              height: "100vh",
            }}
          >
            {!isClicked && (
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "15px",
                  lineHeight: "28px",
                  color: "#848484",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100vh",
                }}
              >
                Please select a chat to start messaging
              </Typography>
            )}

            {isClicked && (
              <React.Fragment>
                {/* App Bar */}
                <Box
                  className="shadow-sm"
                  sx={{
                    backgroundColor: "#fff",
                    px: 4,
                    py: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      alt="Alviando"
                      src="/static/images/avatar/1.jpg"
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <div>
                      <Typography>Alviando Dev</Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        color="rgba(126, 152, 223, 1)"
                        sx={{
                          display: "inline",
                        }}
                      >
                        Online
                      </Typography>
                    </div>
                  </Box>
                </Box>

                {/* Box Chat */}
                <Box
                  className="p-4"
                  sx={{
                    height: "78vh",
                    overflowY: "auto",
                    borderBottom: "1px solid rgba(35, 35, 35, 0.1)",
                  }}
                >
                  {/* left chat - sender */}
                  {[...new Array(8)].map((item, key) => {
                    return (
                      <React.Fragment>
                        <Box key={key} className="mb-2">
                          <Grid
                            container
                            gap={2}
                            sx={{ alignItems: "flex-end" }}
                          >
                            <Grid item>
                              <Avatar
                                alt="Alviando"
                                src="/static/images/avatar/1.jpg"
                              />
                            </Grid>
                            <Grid item md={3}>
                              <Box
                                sx={{
                                  background: "#7E98DF",
                                  borderRadius: "35px 35px 35px 10px",
                                  padding: "20px",
                                }}
                              >
                                <Typography sx={{ color: "#fff" }}>
                                  Hi, son, how are you doing? Today, my father
                                  and I went to buy a car, bought a cool car.
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </React.Fragment>
                    );
                  })}

                  {/* right chat - receiver */}
                  <Box className="mb-2">
                    <Grid
                      container
                      gap={2}
                      sx={{ alignItems: "flex-end" }}
                      direction={"row-reverse"}
                    >
                      <Grid item>
                        <Avatar
                          alt="Alviando"
                          src="/static/images/avatar/1.jpg"
                        />
                      </Grid>
                      <Grid item md={3}>
                        <Box
                          sx={{
                            background: "#fff",
                            borderRadius: "35px 35px 10px 35px",
                            padding: "20px",
                          }}
                        >
                          <Typography sx={{ color: "#000" }}>
                            Hi, son, how are you doing? Today, my father and I
                            went to buy a car, bought a cool car.
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#fff",
                    px: 4,
                    py: 3,
                  }}
                >
                  <TextField
                    label=""
                    id=""
                    size="medium"
                    placeholder="Type your message..."
                    multiline
                    maxRows={2}
                    sx={{ width: "100%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddIcon
                            sx={{
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                          <AttachFileIcon
                            sx={{
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                          <EmoticonIcons
                            sx={{
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <MicIcon
                            sx={{
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                          <SendIcon
                            sx={{
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </React.Fragment>
            )}

            {/* <Box className="bg-white p-3 w-100">
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Type your message..."
                multiline
                fullWidth
                maxRows={2}
                sx={{
                  backgroundColor: "#FAFAFA",
                }}
              />
            </Box> */}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
