import { Link } from "@tanstack/react-router";
import { UserInfo } from "@/features/auth/components/UserInfo";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <aside>
      <nav>
        <Link to="/">
          <Logo />
        </Link>
      </nav>
    </aside>
  );
}
