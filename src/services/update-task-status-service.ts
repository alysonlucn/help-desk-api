import {
  TicketStatus,
} from "../entities/Ticket";

import { ticketRepository } from "../repositories/ticket-repository";

interface UpdateTicketStatusDTO {
  ticketId: string;
  status: TicketStatus;
}

export class UpdateTicketStatusService {
  async execute({
    ticketId,
    status,
  }: UpdateTicketStatusDTO) {
    if (!ticketId) {
      throw new Error("Ticket not found");
    }

    const ticket = await ticketRepository.findOne({
      where: {
        id: ticketId,
      },
    });

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const allowedStatus = [
      TicketStatus.OPEN,
      TicketStatus.IN_PROGRESS,
      TicketStatus.CLOSED,
    ];

    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status");
    }

    ticket.status = status;

    await ticketRepository.save(ticket);

    return ticket;
  }
}