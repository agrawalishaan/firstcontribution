import constants from '@/lib/constants';

// this function only returns true if the languages are not empty and contain at least one valid language (as defined by the invalid languages constant)
// this is needed to ensure we only display repos with at least one real coding language
export default function validateLanguages(languages) {
  // don't allow repos with no languages at all
  if (Object.keys(languages).length === 0) return false;
  // scan for the presence of valid languages
  for (let key in languages) {
    if (!constants.INVALID_PROGRAMMING_LANGUAGES.includes(key)) {
      return true;
    }
  }
  return false;
}
