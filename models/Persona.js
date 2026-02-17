const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    cedula: {
      type: String,
      required: true,
      unique: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Persona", personaSchema);
