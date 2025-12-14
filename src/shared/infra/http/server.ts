import "reflect-metadata";
import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import { AppDataSource } from "./database/data-source";
import routes from "./routes/index.routes";
import "../../container";


AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(cors());

    /*
    Aqui vai ser onde vou colocar a origem de onde as requisições podem vir
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }));
    */

    app.use(express.json());
    app.use(routes);

    app.use(errors());

    const PORT = process.env.PORT || 3333;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no banco:", err);
  });
