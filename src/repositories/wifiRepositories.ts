import db from "../config/database.js";
import { InsertWifi } from "../schemas/recordsSchemas.js";

async function getByEmail(userEmail: string) {
  return await db.wifi.findMany({
    where: {
      userEmail,
      deleteAt: null,
    },
  });
}

async function getByEmailAndId(userEmail: string, id: number) {
  return await db.wifi.findFirst({
    where: {
      userEmail,
      id,
      deleteAt: null,
    },
  });
}

async function getByEmailAndTitle(userEmail: string, title: string) {
  return await db.wifi.findFirst({
    where: {
      userEmail,
      title,
      deleteAt: null,
    },
  });
}

async function deleteWifi(id: number) {
  return await db.wifi.update({
    where: { id },
    data: { deleteAt: new Date() },
  });
}

async function postWifi(wifiData: InsertWifi) {
  return await db.wifi.create({ data: wifiData });
}

const wifiRepository = {
  getByEmailAndId,
  getByEmail,
  getByEmailAndTitle,
  postWifi,
  deleteWifi,
};
export default wifiRepository;
