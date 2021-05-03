const express = require("express");

const app = express();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", `warn`, `error`],
});

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hello from my API!");
});

app.get("/cars", async (request, response) => {
  try {
    const cars = await prisma.car.findMany();
    return response.status(200).json({ data: cars, total: cars.length });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.get("/cars/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    });
    return response.status(200).json({
      data: {
        car,
      },
    });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.post("/cars", async (request, response) => {
  try {
    const { year, color, manufacturer, model } = request.body;
    const car = await prisma.car.create({
      data: {
        year,
        color,
        model,
        manufacturer,
      },
    });

    return response.status(201).json({
      data: {
        car,
      },
    });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.put("/cars/:id", async (request, response) => {
  try {
    const { model, year, color, manufacturer } = request.body;
    const { id } = request.params;

    const car = await prisma.car.update({
      where: {
        id,
      },
      data: {
        model,
        color,
        year,
        manufacturer,
      },
    });
    return response.status(200).json({ data: { car } });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.patch("/cars/:id", async (request, response) => {
  try {
    const { model, year, color, manufacturer } = request.body;
    const { id } = request.params;

    const car = await prisma.car.update({
      where: {
        id,
      },
      data: {
        model,
        color,
        year,
        manufacturer,
      },
    });
    return response.status(200).json({ data: { car } });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.delete("/cars/:id", async (request, response) => {
  try {
    const { id } = request.params;
    await prisma.car.delete({
      where: {
        id,
      },
    });
    return response.status(200).json({
      data: {
        message: "Car deleted successfully",
      },
    });
  } catch (error) {
    return response.status(500).json({
      data: {
        status: 500,
        title: "Server error: This error occurred on the server",
        details: error.message,
      },
    });
  }
});

app.listen(3005, () =>
  console.log("Express server running at: http://localhost:3005")
);
