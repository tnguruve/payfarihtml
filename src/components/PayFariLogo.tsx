import Image from "next/image";

export default function PayFariLogo({ size = 50 }: { size?: number }) {
    return (
        <Image
            src="/Logo.svg"
            alt="PayFari"
            width={size * 2.42}
            height={size}
            style={{ height: `${size}px`, width: "auto", objectFit: "contain" }}
            priority
        />
    );
}
