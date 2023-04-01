import styles from '@/styles/CardContainer/card.module.css';

export default function Card({ repoData }) {
  return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        {/* <Image src={repoData.avatar_url} alt="avatar" width={50} height={50} /> */}
        {repoData.name}
      </div>
      <div className={styles['card-body']}>
        <p>description: {repoData.description}</p>
        <p>url: {repoData.url}</p>
        <p>stars: {repoData.stars}</p>
        <p>languages: {JSON.stringify(repoData.languages)}</p>
        <p>full name: {repoData.full_name}</p>
        <p>homepage url: {repoData.homepage_url}</p>
      </div>
    </div>
  );
}
