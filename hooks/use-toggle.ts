import { useState } from "react";

export function useToggle(initial: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initial);
  return [state, () => setState((p) => !p)];
}
