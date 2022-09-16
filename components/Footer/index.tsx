import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/components/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.documentationDesc}>
          <h4>Documentation</h4>
          <Link href="/">
            <Image src={"/footer/rightArrow.svg"} width="13" height="13" />
          </Link>
        </div>
        <div className={styles.socialMediaIconContainer}>
          <Link href="/">
            <button>
              <Image src={"/footer/websiteIcon.svg"} width="24" height="24" />
            </button>
          </Link>
          <Link href="/">
            <button>
              <Image src={"/footer/discordIcon.svg"} width="24" height="18" />
            </button>
          </Link>
          <Link href="/">
            <button>
              <Image src={"/footer/twitterIcon.svg"} width="24" height="19" />
            </button>
          </Link>
        </div>
        <p>©Copyright All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
