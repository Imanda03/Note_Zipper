import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import { createNoteAction, updateNoteAction } from "../../actions/noteActions";
import { message } from "antd";
import axios from "axios";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

const theme = createTheme();

const SingleNote = ({ match }) => {
  const params = useParams();
  const id = params.noteId;
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title && !content && !category)
      return message.error("Fill all the form");
    dispatch(updateNoteAction(id, title, content, category));

    resetHandler();
    navigate("/myNotes");
  };
  React.useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);
  return (
    <ThemeProvider theme={theme}>
      <MainScreen title={`Update Note`}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              minHeight: "98vh",
            }}
          >
            <Typography component="h1" variant="h5" fontWeight={600}>
              Update note
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="category"
                  label="Category"
                  type="category"
                  id="category"
                  autoComplete="new-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  required
                  fullWidth
                  name="content"
                  label="Content"
                  type="content"
                  id="content"
                  autoComplete="new-content"
                  multiline
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Content
              </Button>
            </Box>
            <small style={{ fontWeight: 600 }}>
              Updated on- {date.substring(0, 10)}
            </small>
          </Box>
        </Container>
      </MainScreen>
    </ThemeProvider>
  );
};

export default SingleNote;
