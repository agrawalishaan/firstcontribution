import Heading from '@/components/CardContainer/Card/Heading';
import Issues from '@/components/CardContainer/Card/Issues';
import Languages from '@/components/CardContainer/Card/Languages';
import Stats from '@/components/CardContainer/Card/Stats';

import roundCount from '@/lib/util/roundCount';

import styles from '@/styles/CardContainer/card.module.css';

export default function Card({ repoData }) {
  return (
    <div className={styles['card-boundary']}>
      <div className={styles.card}>
        <Heading
          name={repoData.name}
          avatarUrl={repoData.avatarUrl}
          description={repoData.description}
        />
        <Languages languages={repoData.languages} />
        <Issues />
      </div>
      <Stats
        stars={roundCount(repoData.stars)}
        forks={roundCount(repoData.forks)}
      />
    </div>
  );
}
