import PayFariLogo from "./PayFariLogo";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container flex flex-col items-center gap-2">
                <div className="footer-logo">
                    <PayFariLogo size={50} />
                </div>
                <p>Multi-currency accounts for global spending &amp; local payments</p>
            </div>
        </footer>
    );
}
