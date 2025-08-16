import type { Route } from "./+types/MainContainer";
import Main from "./Main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joint purchases" },
    { name: "description", content: "Welcome to joint purchases!" },
  ];
}

export default function MainContainer() {
  
  return <Main />
}
