import cx from '@/lib/util/cx';

import styles from '@/styles/CardContainer/card.module.css';

type Props = {
  name: string;
  avatarUrl: string;
  description: string;
};

export default function CardHeader({ name, avatarUrl, description }: Props) {
  return (
    <div className={styles.heading}>
      <div className={styles['heading-top']}>
        <img src={avatarUrl} className={styles.picture} />
        <h3 className={cx(styles['repo-title'], 'primary-color')}>{name}</h3>
      </div>
      <h6 className={styles['repo-description']}>{description}</h6>
    </div>
  );
}
