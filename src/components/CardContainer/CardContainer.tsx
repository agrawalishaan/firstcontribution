import { Repository } from '@prisma/client';

import Card from '@/components/CardContainer/Card/Card';

import styles from '@/styles/CardContainer/cardContainer.module.css';

type Props = {
  reposData: Repository[];
};

export default function CardContainer({ reposData }: Props) {
  return (
    <div className={styles['card-container']}>
      {reposData.map((repo) => (
        <Card repoData={repo} key={repo.name} />
      ))}
    </div>
  );
}
