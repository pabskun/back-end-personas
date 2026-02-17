const express = require("express");
const router = express.Router();
const Persona = require("../models/Persona");

/**
 * 1️⃣ Listar todas las personas
 */
router.get("/", async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

/**
 * 2️⃣ Buscar persona por cédula o correo
 */
router.get("/buscar", async (req, res) => {
  try {
    const { cedula, correo } = req.query;

    if (!cedula && !correo) {
      return res.status(400).json({
        mensaje: "Debe enviar cedula o correo como parámetro",
      });
    }

    const persona = await Persona.findOne({
      $or: [
        { cedula: cedula },
        { correoElectronico: correo },
      ],
    });

    if (!persona) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json(persona);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

/**
 * 3️⃣ Registrar nueva persona
 */
router.post("/", async (req, res) => {
  try {
    const { nombre, cedula, fechaNacimiento, correoElectronico } = req.body;

    const nuevaPersona = new Persona({
      nombre,
      cedula,
      fechaNacimiento,
      correoElectronico,
    });

    const personaGuardada = await nuevaPersona.save();

    res.status(201).json(personaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

module.exports = router;
