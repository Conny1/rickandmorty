import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    residentid: {
      type: String,
      required: true,
      unique: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.models.notes || mongoose.model("notes", NotesSchema);

export default Notes;
