import db from "../config/database.js";
import { InsertCard } from "../schemas/recordsSchemas.js";

async function getByEmail(userEmail: string) {
  return await db.card.findMany({
    where: {
      userEmail,
      deleteAt: null,
    },
  });
}

async function getByEmailAndId(userEmail: string, id: number) {
  return await db.card.findFirst({
    where: {
      userEmail,
      id,
      deleteAt: null,
    },
  });
}

async function getByEmailAndTitle(userEmail: string, cardNumber: string) {
  return await db.card.findFirst({
    where: {
      userEmail,
      cardNumber,
      deleteAt: null,
    },
  });
}

async function deleteCard(id: number) {
  return await db.card.update({
    where: { id },
    data: { deleteAt: new Date() },
  });
}

async function postCard(cardData: InsertCard) {
  return await db.card.create({ data: cardData });
}

const cardRepository = {
  getByEmailAndId,
  getByEmail,
  getByEmailAndTitle,
  postCard,
  deleteCard,
};
export default cardRepository;
