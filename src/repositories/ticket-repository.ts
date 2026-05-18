import { AppDataSource } from "../config/database";
import { Ticket } from "../entities/Ticket";

export const ticketRepository = AppDataSource.getRepository(Ticket);
