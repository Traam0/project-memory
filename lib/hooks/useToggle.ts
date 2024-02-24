import { useState } from "react";

export default function(initial: boolean = false): [boolean, ()=>void]{
    const [state, setState] = useState<boolean>(initial);
    return [state, ()=> setState(ps=> !ps)]
}