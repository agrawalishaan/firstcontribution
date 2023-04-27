import Card from '@/components/CardContainer/Card/Card';

import styles from '@/styles/CardContainer/cardContainer.module.css';

import { RepositoryExtended } from '@/lib/typings';

type Props = {
  repos: RepositoryExtended[];
};

export default function CardContainer({ repos }: Props) {
  return (
    <div className={styles['card-container']}>
      {repos.map((repo) => (
        <Card repoData={repo} key={repo.name} />
      ))}
    </div>
  );
}
