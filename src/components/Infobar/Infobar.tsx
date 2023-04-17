import styles from '@/styles/Infobar/infobar.module.css';

export default function Info() {
  return (
    <div className={styles.infobar}>
      <p>
        Firstcontribution curates "good first issues" from popular open-source
        and community projects, to help you make your first contribution
      </p>
    </div>
  );
}
