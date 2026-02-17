# 🚀 API Personas — Node.js + Express + MongoDB + Heroku

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Heroku](https://img.shields.io/badge/Deploy-Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com/)
[![REST API](https://img.shields.io/badge/API-REST-blue?style=for-the-badge)]
[![JSON](https://img.shields.io/badge/Data-JSON-orange?style=for-the-badge)]

---

## 📌 Descripción

API REST desarrollada con **Node.js, Express y MongoDB (Mongoose)** para la gestión de personas.

Permite:

- ✅ Listar todas las personas
- 🔎 Buscar persona por cédula o correo
- 📝 Registrar nueva persona

---

## 🌍 URL de Producción (Heroku)

```
https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas
```

---

# 🧠 Modelo de Datos — Persona

Colección: `personas`

| Campo | Tipo | Requerido | Único | Detalle |
|--------|--------|------------|--------|----------|
| nombre | String | ✅ | ❌ | trim |
| cedula | String | ✅ | ✅ | identificador único |
| fechaNacimiento | Date | ✅ | ❌ | formato ISO |
| correoElectronico | String | ✅ | ✅ | lowercase + trim |

---

# 🗓️ Formato Correcto de Fecha

MongoDB espera formato ISO:

✅ Correcto:
```json
"1999-06-25"
```

También válido:
```json
"1999-06-25T00:00:00.000Z"
```

❌ Incorrecto:
```json
"25/06/1999"
```

---

# 🔌 ENDPOINTS DISPONIBLES

---

## 1️⃣ Listar todas las personas

### Método:
```
GET
```

### URL:
```
https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas
```

### Respuesta exitosa (200):
```json
[
  {
    "_id": "65f2a1c0d1...",
    "nombre": "Juan Pérez",
    "cedula": "123456789",
    "fechaNacimiento": "1999-06-25T00:00:00.000Z",
    "correoElectronico": "juan@mail.com",
    "createdAt": "2026-02-17T00:00:00.000Z",
    "updatedAt": "2026-02-17T00:00:00.000Z"
  }
]
```

---

## 2️⃣ Buscar persona por cédula o correo

### Método:
```
GET
```

### URL por cédula:
```
https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas/buscar?cedula=123456789
```

### URL por correo:
```
https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas/buscar?correo=juan@mail.com
```

### Parámetros Query:

| Parámetro | Obligatorio |
|-----------|-------------|
| cedula | ⚠️ (uno de los dos) |
| correo | ⚠️ (uno de los dos) |

### Errores posibles:

400
```json
{ "mensaje": "Debe enviar cedula o correo como parámetro" }
```

404
```json
{ "mensaje": "Persona no encontrada" }
```

---

## 3️⃣ Registrar nueva persona

### Método:
```
POST
```

### URL:
```
https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas
```

### Headers requeridos:
```
Content-Type: application/json
```

### Body JSON:
```json
{
  "nombre": "Juan Pérez",
  "cedula": "123456789",
  "fechaNacimiento": "1999-06-25",
  "correoElectronico": "juan@mail.com"
}
```

### Respuesta exitosa (201):
```json
{
  "_id": "65f2a1c0d1...",
  "nombre": "Juan Pérez",
  "cedula": "123456789",
  "fechaNacimiento": "1999-06-25T00:00:00.000Z",
  "correoElectronico": "juan@mail.com",
  "createdAt": "2026-02-17T00:00:00.000Z",
  "updatedAt": "2026-02-17T00:00:00.000Z"
}
```

### Errores comunes:

Duplicado de cédula o correo:
```json
{ "mensaje": "E11000 duplicate key error" }
```

Validaciones faltantes:
```json
{ "mensaje": "Persona validation failed" }
```

---

# 💻 Cómo Consumir la API desde Front-End (JavaScript + Fetch)

---

## 📌 Base URL

```javascript
const API = "https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas";
```

---

## 📄 Listar Personas

```javascript
async function listarPersonas() {
  try {
    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error:", error.message);
  }
}
```

---

## 🔎 Buscar por Cédula

```javascript
async function buscarPorCedula(cedula) {
  try {
    const response = await fetch(`${API}/buscar?cedula=${cedula}`);

    if (response.status === 404) {
      console.log("No encontrada");
      return null;
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error(error);
  }
}
```

---

## 🔎 Buscar por Correo

```javascript
async function buscarPorCorreo(correo) {
  try {
    const response = await fetch(`${API}/buscar?correo=${correo}`);

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}
```

---

## 📝 Crear Persona

```javascript
async function crearPersona() {
  try {
    const nuevaPersona = {
      nombre: "Maria Lopez",
      cedula: "987654321",
      fechaNacimiento: "1995-10-12",
      correoElectronico: "maria@mail.com"
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevaPersona)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje);
    }

    console.log("Persona creada:", data);
    return data;

  } catch (error) {
    console.error("Error:", error.message);
  }
}
```

---

# 🧪 Pruebas con cURL

Listar:
```bash
curl -X GET https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas
```

Buscar:
```bash
curl -X GET "https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas/buscar?cedula=123456789"
```

Crear:
```bash
curl -X POST https://back-end-personas-b431cf0f4a15.herokuapp.com/api/personas \
-H "Content-Type: application/json" \
-d '{"nombre":"Juan","cedula":"111","fechaNacimiento":"1999-01-01","correoElectronico":"juan@mail.com"}'
```

---

# ⚙️ Variables de Entorno

Archivo `.env`:

```
MONGO_URI=tu_cadena_de_conexion
PORT=3000
```

---

# 📂 Estructura del Proyecto

```
server.js
config/db.js
models/Persona.js
routes/personaRoutes.js
```

---

# 🚀 Flujo Interno

1. Express inicia servidor
2. Se conecta a MongoDB con Mongoose
3. Se habilita CORS y BodyParser
4. Se montan rutas en `/api/personas`
5. Se gestionan respuestas JSON

---

# 🔥 Errores Comunes

- ❌ No enviar Content-Type application/json
- ❌ Enviar fecha en formato incorrecto
- ❌ Repetir cédula o correo
- ❌ No enviar parámetros en /buscar

---

# 📜 Licencia

MIT

---

# 👨‍💻 Autor

Proyecto Backend API Personas — Deploy en Heroku  
Node.js + Express + MongoDB

---
