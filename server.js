import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

// Rota de criação de usuário
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;

  await prisma.user.create({
    data: {
      email,
      name,
      age
    }
  })

  res.status(201).json(req.body);
})

// Rota de vizualização de usuários
app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany()

  res.status(200).json(allUsers);
})

// Rota de atualização de dados de usuário
app.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { email, name, age } = req.body;

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      email,
      name,
      age
    }
  })

  res.status(201).json(req.body)
})

// Rota de deleção de usuários
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  await prisma.user.delete({
    where: {
      id: userId
    }
  })

  res.status(200).json({ message: "User deleted with sucessfull!" });
})

// Configuração de portas da aplicação
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server rodando na porta " + port))

// KHksUXZQih10zJ26