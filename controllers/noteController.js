import Notes from "../model/noteModel.js";
import asyncHandler from "express-async-handler";
import { createError } from "../utils/error.js";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find();
  res.json(notes);
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

export const CreateNote = asyncHandler(async (req, res, next) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category)
    return next(createError(401, "Please fill all the fields"));
  const note = new Notes({ title, content, category });

  const createdNote = await note.save();

  res.status(201).json(createdNote);
});

export const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json("Note has been deleted");
  } else {
    return next(createError(404, "Note not found"));
  }
});

export const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Notes.findById(req.params.id);

  if (note) {
    const updateNotes = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateNotes);
  } else {
    return next(createError(404, "Note not found"));
  }
});
