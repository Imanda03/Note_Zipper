import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import "./Profile.css";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Password } from "@mui/icons-material";
import { updateProfile } from "../../actions/userActions";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id: userInfo._id, name, email }));
    handleClose();
  };

  return (
    <MainScreen title={"UserProfile"}>
      <Box>
        <Box className="mainDiv">
          <Box
            height={"80vh"}
            padding={"0px"}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            <Box className="userProfile" width={"35%"}>
              <Paper
                evaluation={44}
                sx={{
                  width: "100%",
                  height: "70vh",
                  background: "rgb(217, 221, 225)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#800000",
                      height: "20vh",
                      width: "30%",
                      marginTop: "80px",
                      fontSize: "50px",
                    }}
                  >
                    {/* {data.username} */}
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Typography variant="h5" marginTop={"20px"}>
                    {userInfo.name}
                  </Typography>
                  <Typography variant="h6">{userInfo.email}</Typography>
                  {/* <Button
                    marginTop="40px"
                    size="small"
                    onClick={handleClickOpen}
                  >
                    Edit Profile
                  </Button> */}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box className="dialogBox">
          <Dialog open={open} aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              Edit Profile
            </DialogTitle>
            <small className="small">Change that are only needed</small>
            <Box
              padding={"50px"}
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <TextField
                variant="outlined"
                name="username"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.email)}
              />
            </Box>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </MainScreen>
  );
};

export default Profile;
