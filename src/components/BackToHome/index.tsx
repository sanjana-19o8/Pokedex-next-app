import Link from "next/link";
import { FaStepBackward } from "react-icons/fa";
import styles from './BackToHome.module.css'


export default function BackToHome() {
    return (
        <div className={styles.wrapper}>
            <Link href='/'>
                <div>
                    <FaStepBackward />
                    Back
                </div>
            </Link>
        </div>
    )
}