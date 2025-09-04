import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/Layout/Layout.tsx", [
    index("routes/Main/MainContainer.tsx"),
    route("instruction", "routes/Instruction/InstructionContainer.tsx"),
    route("notification", "routes/Notification/NotificationContainer.tsx"),
    route("support", "routes/Support/SupportContainer.tsx"),
  ]),
] satisfies RouteConfig;
