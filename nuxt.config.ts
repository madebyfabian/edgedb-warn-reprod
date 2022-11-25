// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	typescript: {
		strict: true,
		tsConfig: {
			compilerOptions: {
				noUnusedLocals: false,
				downlevelIteration: true,
			},
		},
	},
})
