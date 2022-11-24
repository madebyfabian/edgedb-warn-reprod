import { edgeDB } from '@/server/utils/edgeDB'

export default defineEventHandler(() => {
	const query = `select "Hello world!";`

	async function run() {
		const result = await edgeDB.query(query)
		console.log(result) // "Hello world!"
	}

	run()
})
