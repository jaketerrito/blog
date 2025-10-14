import { Link } from "@tanstack/react-router";
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
