import { Router } from "express";

import { TicketController } from "../controllers/ticket-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { adminMiddleware } from "../middlewares/admin-middleware";

const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.post("/", authMiddleware, (req, res) =>
  ticketController.create(req, res)
);

ticketRoutes.get("/", authMiddleware, (req, res) =>
  ticketController.list(req, res)
);

ticketRoutes.patch("/:id/status", authMiddleware, adminMiddleware, (req, res) =>
  ticketController.updateStatus(req, res)
);

export default ticketRoutes;
