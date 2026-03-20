import styles from "./page.module.css";

export default function MarketingOpsHomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Internal App</p>
        <h1 className={styles.title}>Marketing ops starts here.</h1>
        <p className={styles.body}>
          This app is the future home for internal marketing workflows like
          funnel management, segmentation, campaign tooling, and reporting. Keep
          public website work in `apps/web`, and build private team workflows
          here.
        </p>
      </div>
    </main>
  );
}
