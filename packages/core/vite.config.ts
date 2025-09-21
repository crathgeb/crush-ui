import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { glob } from "glob";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.stories.ts",
        "**/*.stories.tsx",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@providers": resolve(__dirname, "./src/providers"),
    },
  },
  build: {
    lib: {
      entry: {
        // Main entry point
        index: resolve(__dirname, "src/index.ts"),
        // Individual component entries for tree-shaking
        ...Object.fromEntries(
          glob
            .sync("src/components/**/*.{ts,tsx}", {
              ignore: ["**/*.test.*", "**/*.stories.*", "**/*.types.ts"],
            })
            .map((file) => [
              file.replace(/^src\//, "").replace(/\.(ts|tsx)$/, ""),
              resolve(__dirname, file),
            ])
        ),
        // Utils entries
        ...Object.fromEntries(
          glob
            .sync("src/utils/**/*.{ts,tsx}")
            .map((file) => [
              file.replace(/^src\//, "").replace(/\.(ts|tsx)$/, ""),
              resolve(__dirname, file),
            ])
        ),
        // Types entry
        types: resolve(__dirname, "src/types/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        return `${entryName}.${format === "es" ? "esm" : format}.js`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        // External all peer dependencies
        /@radix-ui\/.*/,
        "tailwind-merge",
        "lucide-react",
        "next-themes",
        "react-hook-form",
        "@headless-tree/core",
        "@headless-tree/react",
        "sonner",
        "usehooks-ts",
        "zod",
        "@hookform/resolvers",
        "@tailwindcss/vite",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
  },
});
