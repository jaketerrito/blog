import { Link } from "@tanstack/react-router";
import { UserInfo } from "@/features/auth/components/UserInfo";

export function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <UserInfo />
      </div>
    </nav>
  );
}
