import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function RegistrationForm() {
  return (
    <form>
      <Input type="text" placeholder="Username" />
      <Button type="submit">Register</Button>
    </form>
  );
}
