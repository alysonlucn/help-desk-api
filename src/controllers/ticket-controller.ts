import { Request, Response } from "express";

import { CreateTicketService } from "../services/create-ticket-service";

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
}
