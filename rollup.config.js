import {defineConfig} from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    input:"src/index.ts",
    output:{
        dir: "dist",
        format:"es",
        name:"button-ui-lib",
    },
    external:["react","react-dom"],
    plugins:[typescript({tsconfig: "tsconfig.json"})],
})