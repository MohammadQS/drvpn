import { Link, useLocation } from "react-router-dom";
import {
    ShoppingBasket,
    ListAlt,
    AccountCircle,
    AccountBalanceWallet,
    SupervisorAccount
} from "@mui/icons-material";
import styles from "./BottomNavigation.module.css";

const BottomNavigation = () => {
    const location = useLocation();

    return (
        <nav className={styles.nav}>
            {/* خرید سرویس */}
            <Link
                to="/shop"
                className={`${styles.navItem} ${location.pathname === "/" ? styles.active : ""}`}
            >
                <ShoppingBasket className={styles.icon} />

            </Link>

            {/* سرویس های من */}
            <Link
                to="/services"
                className={`${styles.navItem} ${location.pathname === "/services" ? styles.active : ""}`}
            >
                <ListAlt className={styles.icon} />

            </Link>

            {/* پروفایل (وسط) */}
            <Link
                to="/profile"
                className={`${styles.navItem} ${styles.profileItem} ${
                    location.pathname === "/profile" ? styles.active : ""
                }`}
            >
                <AccountCircle
                    className={`${styles.icon} ${styles.profileIcon} ${
                        location.pathname === "/profile" ? styles.activeIcon : ""
                    }`}
                />
            </Link>

            {/* کیف پول */}
            <Link
                to="/wallet"
                className={`${styles.navItem} ${location.pathname === "/wallet" ? styles.active : ""}`}
            >
                <AccountBalanceWallet className={styles.icon} />

            </Link>

            {/* زیرمجموعه */}
            <Link
                to="/affiliates"
                className={`${styles.navItem} ${location.pathname === "/affiliates" ? styles.active : ""}`}
            >
                <SupervisorAccount className={styles.icon} />

            </Link>
        </nav>
    );
};

export default BottomNavigation;