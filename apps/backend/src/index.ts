import express from "express";
import { prisma } from "./db";
import { CreateAvatarSchema } from "./types";
import { GoogleGenAI } from "@google/genai";

const app = express();
const ai=new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
})


app.post("/api/v1/signup", async (req, res) => {
  const user= await prisma.user.create({
    data:{
      username: req.body.username,
      password: req.body.password
    }
  })
  res.json({
    message: "User created successfully",
    id: user.id
  })
});

app.post("/api/v1/signin", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }
  if (user.password !== req.body.password) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }
  res.json({
    message: "Signin successful",
    id: user.id
  });
});


app.post("/api/v1/avatar", (req, res) => {
  const {success, error} = CreateAvatarSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid request body"
    });
  }
});

app.post("/api/v1/video", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});


app.get("/api/v1/video/:videoId", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});


app.get("/api/v1/me", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});

app.get("/api/v1/models", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});

app.get("/api/v1/avatars", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});

app.get("/api/v1/avatar/:avatarId", (req, res) => {
  console.log(req.body);
  res.send("hii there");
});

app.listen(3000);
