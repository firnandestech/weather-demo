import Link from 'next/link'

import styles from "styles/components/header.module.scss";

const header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div>
         <Link href="/">
          <img src={"http://cdn.weatherapi.com/weather/64x64/night/353.png"} className="cursor-pointer"  width="50" height="50" />
          </Link>
        </div>
        <Link href="/line-chart">
          <button className={styles.btnWallet}>
            chart
          </button>
        </Link>
      </div>
    </header>
  );
};

export default header;
