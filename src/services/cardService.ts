import { Card } from "@prisma/client";

import cardsRepository from "../repositories/cardRepository.js";
import { InputCard, InsertCard } from "../schemas/recordsSchemas.js";
import { decryptString, encryptString } from "../utils/suportFunctions.js";

async function getCard(userEmail: string, card?: Card) {
  if (card) {
    const decryptPassword = decryptString(card.password);
    const decryptCvv = decryptString(card.cvv);
    return { ...card, password: decryptPassword, cvv: decryptCvv };
  }
  const cards = await cardsRepository.getByEmail(userEmail);
  cards.map((card) => {
    card.password = decryptString(card.password);
    card.cvv = decryptString(card.cvv);
  });
  return cards;
}

async function postCard(userEmail: string, inputData: InputCard) {
  const encryptedPassword = encryptString(inputData.password);
  const encryptedCvv = encryptString(inputData.cvv);

  const cardData: InsertCard = {
    password: encryptedPassword,
    cvv: encryptedCvv,
    userEmail,
    cardName: inputData.cardName,
    cardNumber: inputData.cardNumber,
    expirationDate: inputData.expirationDate,
    type: inputData.type,
  };

  await cardsRepository.postCard(cardData);
}

async function deleteCard(Card: Card) {
  await cardsRepository.deleteCard(Card.id);
}

const CardsService = { getCard, postCard, deleteCard };
export default CardsService;
