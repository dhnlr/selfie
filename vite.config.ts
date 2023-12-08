import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions  } from "vite-plugin-pwa";

const manifest: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Telpon - DHNLR",
		short_name: "Telpon",
		description: "Telpon app for goto",
		icons: [
			{
				src: "/favicon.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/favicon.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/favicon.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/favicon.png",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#fff",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		loader: "tsx",
		include: [
		  // Business as usual for .jsx and .tsx files
		  "src/**/*.jsx",
		  "src/**/*.tsx",
		  "node_modules/**/*.jsx",
		  "node_modules/**/*.tsx",
		],
	  },
  plugins: [
    react({ plugins: [["@swc/plugin-styled-components", {}]] }),
    VitePWA(manifest),
  ],
});
