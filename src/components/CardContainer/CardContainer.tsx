import Card from '@/components/CardContainer/Card/Card';

import styles from '@/styles/CardContainer/cardContainer.module.css';

export default function CardContainer({ reposData }) {
  return (
    <div className={styles['card-container']}>
      {reposData.map((repo) => (
        <Card repoData={repo} key={repo.name} />
      ))}
    </div>
  );
}
