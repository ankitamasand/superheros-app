import config from '../../config/local';
import request from '../../utils/request';
import { SUPERHERO_CHARACTER_IDS } from '../../constants/characters';

const getCharacters = async (params) => {
  const apiPromises = SUPERHERO_CHARACTER_IDS.map((characterId) => request(`${config.BASE_API_URL}${characterId}`))
  const response = await Promise.allSettled(apiPromises);
  return response;
};

const charactersService = {
  getCharacters,
};

export default charactersService;