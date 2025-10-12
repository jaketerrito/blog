import { Link } from "@tanstack/react-router";
import { UserInfo } from "@/features/auth/components/UserInfo";

export function Navbar() {
  return (
    <nav>
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <UserInfo />
    </nav>
  );
}
