import Link from "next/link";
import PayFariLogo from "./PayFariLogo";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container flex items-center justify-between">
                <Link href="/" className="navbar-logo">
                    <PayFariLogo size={50} />
                </Link>
                <div className="launch-badge">
                    Launching in June 2026
                </div>
            </div>
        </nav>
    );
}
