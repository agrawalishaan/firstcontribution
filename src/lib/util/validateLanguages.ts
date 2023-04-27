import constants from '@/lib/constants';

export default function checkLanguage(language: string) {
  // if our language is not an invalid language, the repo contains at least one good language
  if (!constants.INVALID_PROGRAMMING_LANGUAGES.includes(language)) {
    return true;
  }
  return false;
}
