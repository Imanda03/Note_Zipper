import React from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);
  React.useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, successCreate, successDelete, successUpdate, userInfo]);
  return (
    <MainScreen
      title={userInfo ? `Welcome back ${userInfo.name} ` : "Welcome back"}
    >
      <Link to="/createNote">
        <Button
          variant="contained"
          color="error"
          size="medium"
          sx={{ marginTop: 3, marginBottom: 6 }}
        >
          Create New Notes
        </Button>
      </Link>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {notes &&
          notes

            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((note) => (
              <Accordion key={note._id} sx={{ background: "#edd8dd" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box display={"flex"} flexDirection={"row"}>
                    <Typography>{note.title}</Typography>
                    <Box display="flex" marginLeft={100} gap="10px">
                      <Link to={`/note/${note._id}`}>
                        <Button
                          variant="contained"
                          endIcon={<EditIcon fontSize="inherit" />}
                          size="small"
                          color="warning"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        endIcon={<EditIcon fontSize="inherit" />}
                        size="small"
                        color="error"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </AccordionSummary>
                <hr />
                <AccordionDetails sx={{ background: "#c9bdc0" }}>
                  <small style={{ fontWeight: "900px" }}>{note.category}</small>
                  <Typography variant="h6" margin={2}>
                    {note.content}
                  </Typography>
                  {/* <Typography variant="p" margin={2}>
                {note.content}
              </Typography> */}
                </AccordionDetails>
                <small> Create At:{note.createdAt.substring(0, 10)}</small>
              </Accordion>
            ))}
      </Box>
    </MainScreen>
  );
};

export default MyNotes;
