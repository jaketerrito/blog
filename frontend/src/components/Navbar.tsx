import { Link } from "@tanstack/react-router";
import { UserInfo } from "@/features/auth/components/UserInfo";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <aside>
      <nav style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #FF4500",
        fontFamily: "'Press Start 2P'",
        color: "#FF4500"
      }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit"}}>
          <Logo />
        </Link>
      </nav>
    </aside>
  );
}
