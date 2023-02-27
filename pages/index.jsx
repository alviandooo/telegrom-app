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
  Menu,
  MenuItem,
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
import * as useDb from "@/utils/database";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as authReducer from "@/store/reducers/authSlice";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isClicked, setIsClicked] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const [userListKey, setUserListKey] = React.useState([]);
  const [userList, setUserList] = React.useState({});

  const [privateMessages, setPrivateMessages] = React.useState([]);

  const userAuth = useSelector((state) => state.auth);
  const router = useRouter();
  const uidProfile = userAuth?.user?.uid;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userAuth.accessToken || userAuth.accessToken === null) {
      router.replace("/auth/login");
    } else {
      useDb.getData("users", (snapshot) => {
        const users = snapshot.val();
        if (users) {
          setUserList(users);
          setUserListKey(
            Object.keys(users)?.filter((item) => item !== uidProfile)
          );
        }
      });

      useDb.getData(`messages`, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessageList(data["private"]);
          setPrivateMessages(
            Object.values(data["private"])?.filter((item) => {
              if (
                item.sender_id === selectedChat ||
                item.sender_id === uidProfile
              ) {
                return item;
              }
            })
          );
        }
      });
    }
  }, [selectedChat]);

  const sendMessages = () => {
    const date = `${new Date().getFullYear()} ${
      new Date().getMonth() + 1
    } ${new Date().getDate()}`;

    useDb.postData(`messages`, {
      ["private"]: {
        ...messageList,
        [new Date().getTime()]: {
          target_id: selectedChat,
          sender_id: uidProfile,
          text: message,
          timestamp: {
            date: date,
            time: new Date().getTime(),
          },
        },
      },
    });

    useDb.getData(`messages/private`, (snapshot) => {
      const data = snapshot.val();
      setMessageList(data);
    });

    setMessage("");
  };

  const logout = () => {
    dispatch(
      authReducer.setAuth({
        user: null,
        accessToken: null,
      })
    );

    router.replace("/auth/login");
  };

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
                onClick={handleClick}
              >
                <MenuIcon
                  sx={{
                    color: "#7E98DF",
                  }}
                />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>

            <Box
              sx={{
                paddingX: 3,
                marginTop: "15px",
                marginBottom: "-20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={userAuth?.user?.fullname}
                src={userAuth?.user?.photoURL}
                sx={{ width: "50px", height: "50px" }}
              />
              <Typography sx={{ marginLeft: "20px" }}>
                <b>{userAuth?.user?.fullname}</b>
              </Typography>
            </Box>

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
                {userListKey.map((item, keyItem) => {
                  return (
                    <>
                      <ListItem
                        key={item}
                        alignItems="flex-start"
                        button
                        selected={selectedChat === item}
                        onClick={() => {
                          setIsClicked(true);
                          setSelectedChat(() => item);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={userList[item].fullname}
                            src={userList[item].photoURL}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={userList[item].fullname}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Online
                              </Typography>
                              {/* {
                                " — I'll be in your neighborhood doing errands this…"
                              } */}
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </>
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
              <>
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
                      alt={userList[selectedChat].fullname}
                      src={userList[selectedChat].photoURL}
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <div>
                      <Typography>{userList[selectedChat].fullname}</Typography>
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
                  {privateMessages.map((item, keyItem) => {
                    if (
                      item.sender_id === selectedChat &&
                      item.target_id === uidProfile
                    ) {
                      return (
                        <>
                          <Box key={keyItem} className="mb-2">
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
                                    {item.text}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      );
                    } else if (
                      item.sender_id === uidProfile &&
                      item.target_id === selectedChat
                    ) {
                      return (
                        <>
                          <Box key={keyItem} className="mb-2">
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
                                    {item.text}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </>
                      );
                    }
                  })}

                  {/* right chat - receiver */}
                  {/* {privateMessages
                    ?.filter((item) => {
                      if (
                        item.sender_id === uidProfile &&
                        item.target_id === selectedChat
                      ) {
                        return item;
                      }
                    })
                    .map((item, keyItem) => {})} */}
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
                    value={message}
                    maxRows={2}
                    fullWidth
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
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
                            onClick={sendMessages}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter") {
                            //     sendMessages();
                            //   }
                            // }}
                            sx={{
                              cursor: "pointer",
                              color: "#7E98DF",
                              mx: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
