import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Main/MainContainer.tsx"),
    // route("routes/root.tsx", {
    //     id: "routes/root",
    //     children: [
    //         route("routes/Main.tsx", {
    //             id: "routes/Main",
    //             children: [],
    //         }),
    //     ],
    // }),
] satisfies RouteConfig;
