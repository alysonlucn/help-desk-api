import { Request, Response } from "express";

import { CreateTicketService } from "../services/create-ticket-service";
import { ListTicketsService } from "../services/list-ticket-service";
import { UpdateTicketStatusService } from "../services/update-task-status-service";

export class TicketController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;

      const service = new CreateTicketService();

      const ticket = await service.execute({
        title,
        description,
        userId,
      });

      return res.status(201).json({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        userId,
      });
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user.id;
      const role = req.user.role;

      const service = new ListTicketsService();

      const tickets = await service.execute({
        userId,
        role,
      });

      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { status } = req.body;
      const routeId = req.params.id;
      const ticketId = Array.isArray(routeId) ? routeId[0] : routeId;

      const service = new UpdateTicketStatusService();

      const ticket = await service.execute({
        ticketId,
        status,
      });

      return res.status(200).json(ticket);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
