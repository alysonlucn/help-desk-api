import { Router } from "express";

import { TicketController } from "../controllers/ticket-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.post("/", authMiddleware, (req, res) =>
  ticketController.create(req, res)
);

ticketRoutes.get("/", authMiddleware, (req, res) =>
  ticketController.list(req, res)
);

export default ticketRoutes;
