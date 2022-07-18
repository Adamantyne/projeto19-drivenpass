import { Credential } from "@prisma/client";

import credentialsRepository from "../repositories/credentialsRepository.js";
import { throwErr } from "../utils/suportFunctions.js";
import { InputCredential } from "../schemas/recordsSchemas.js";
import {decryptString,encryptString} from "../utils/suportFunctions.js";


async function getCredentials(userEmail: string, credential?: Credential) {
  if (credential) {
    const decryptPassword = decryptString(credential.password);
    return { ...credential, password: decryptPassword };
  }
  const credentials = await credentialsRepository.getByEmail(userEmail);
  credentials.map(credential=>{
    credential.password = decryptString(credential.password);
  });
  return credentials;
}

async function postCredential(userEmail: string, inputData: InputCredential) {
  const encryptedPassword = encryptString(inputData.password);
  const credentialData = {
    password: encryptedPassword,
    userEmail,
    userName: inputData.userName,
    title: inputData.title,
    url: inputData.url,
  };
  await credentialsRepository.postCredeltial(credentialData);
}

async function deleteCredential(credential:Credential) {
  await credentialsRepository.deleteCredential(credential.id);
}


const credentialsService = { getCredentials, postCredential,deleteCredential };
export default credentialsService;
