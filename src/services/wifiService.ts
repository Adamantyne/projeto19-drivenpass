import { Wifi } from "@prisma/client";

import wifiRepository from "../repositories/wifiRepositories.js";
import { InputWifi, InsertWifi } from "../schemas/recordsSchemas.js";
import { decryptString, encryptString } from "../utils/suportFunctions.js";

async function getWifi(userEmail: string, wifi?: Wifi) {
  if (wifi) {
    const decryptPassword = decryptString(wifi.password);
    return { ...wifi, password: decryptPassword };
  }
  const wifis = await wifiRepository.getByEmail(userEmail);
  wifis.map((wifi) => {
    wifi.password = decryptString(wifi.password);
  });
  return wifis;
}

async function postWifi(userEmail: string, inputData: InputWifi) {
  const encryptedPassword = encryptString(inputData.password);

  const wifiData: InsertWifi = {
    password: encryptedPassword,
    userEmail,
    title: inputData.title,
    label: inputData.label,
  };

  await wifiRepository.postWifi(wifiData);
}

async function deleteWifi(wifi: Wifi) {
  await wifiRepository.deleteWifi(wifi.id);
}

const wifisService = { getWifi, postWifi, deleteWifi };
export default wifisService;
