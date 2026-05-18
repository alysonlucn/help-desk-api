import { ticketRepository } from "../repositories/ticket-repository";

interface ListTicketsDTO {
  userId: string;
  role: string;
}

export class ListTicketsService {
  async execute({
    userId,
    role,
  }: ListTicketsDTO) {
    if (role === "admin") {
      const tickets = await ticketRepository.find({
        relations: {
          user: true,
        },

        order: {
          createdAt: "DESC",
        },
      });

      return tickets;
    }

    const tickets = await ticketRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      relations: {
        user: true,
      },

      order: {
        createdAt: "DESC",
      },
    });

    return tickets;
  }
}