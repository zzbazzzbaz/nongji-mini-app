import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";

export default defineConfig({
  plugins: [
    uni(),
    uvwt({
      disabled: false,
      tailwindcssBasedir: __dirname,
    }),
  ],
});
