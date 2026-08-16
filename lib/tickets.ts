// lib/tickets.ts

export const TICKETS = {
    
  
  KINGDOM_ALIVE: {
    name: "Kingdom Alive Pass",
    price: 249,
  },

  SIGNATURE: {
    name: "Event Support Pass",
    price: 999,
  },

  DONOR: {
    name: "Donor Pass",
    price: 2999,
  },

  SPONSORSHIP: {
    name: "Sponsorship Pass",
    price: 9999,
  },
} as const;

export type TicketType = keyof typeof TICKETS;

export function getTicket(ticketType: string) {
  if (!(ticketType in TICKETS)) {
    return null;
  }

  return TICKETS[ticketType as TicketType];
}