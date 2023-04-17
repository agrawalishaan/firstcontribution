import { useCallback } from 'react';

import cx from '@/lib/util/cx';

import styles from '@/styles/CardContainer/card.module.css';

// !
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink'];

export default function LanguagesRow({ languages }) {
  // functions

  // generates the language bar by mapping each language to a div with a specific width
  const createLanguageBar = useCallback((languageData) => {
    const language = Object.keys(languageData)[0];
    const percentage = languageData[language];
    return (
      <div
        key={language}
        style={{
          width: `${percentage}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
      ></div>
    );
  }, []);

  // creates the associated keys with consistent colors and percentages
  const createLanguageKey = useCallback((languageData) => {
    const language = Object.keys(languageData)[0];
    const percentage = languageData[language];
    return (
      <div className={styles['language-key']}>
        <div
          className={styles['language-key-color']}
          style={{
            backgroundColor: 'green',
            borderRadius: '10px',
            height: '10px',
            width: '10px',
          }}
        ></div>
        <div>
          <span
            className={cx(styles['language-key-language'], 'primary-color')}
          >
            {language}
          </span>{' '}
          <span
            className={cx(styles['language-key-percent'], 'secondary-color')}
          >
            {percentage}%
          </span>
        </div>
      </div>
    );
  }, []);

  // !
  languages = [{ JavaScript: 65 }, { TypeScript: 25 }, { Python: 10 }];
  return (
    <div className={styles.languages}>
      <h4 className="primary-color">Languages</h4>
      <div className={styles['language-bar']}>
        {languages.map((languageData) => createLanguageBar(languageData))}
      </div>
      <div className={styles['language-key-container']}>
        {languages.map((languageData) => createLanguageKey(languageData))}
      </div>
    </div>
  );
}
