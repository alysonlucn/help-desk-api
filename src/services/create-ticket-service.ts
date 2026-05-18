import { Ticket, TicketStatus } from "../entities/Ticket";
import { ticketRepository } from "../repositories/ticket-repository";

interface CreateTicketDTO {
  title: string;
  description?: string;
  userId: string;
}

export class CreateTicketService {
  async execute({
    title,
    description,
    userId,
  }: CreateTicketDTO): Promise<Ticket> {
    if (!title || !userId) {
      throw new Error("Title and user are required");
    }

    const ticket = ticketRepository.create({
      title,
      description,
      status: TicketStatus.OPEN,
      user: {
        id: userId,
      },
    });

    await ticketRepository.save(ticket);

    return ticket;
  }
}
