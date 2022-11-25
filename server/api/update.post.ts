import { edgeDB } from '@/server/utils/edgeDB'
import e, { $infer } from '@/dbschema/edgeql-js'

export default defineEventHandler(async () => {
	try {
		/*const replyToPost = e.select(e.Post, post => ({
			filter_single: { id: e.uuid('e7bcbb68-6c22-11ed-8cc8-97bb7cc37118') },
		}))

		const query = e.update(e.Post, post => ({
			filter_single: { id: e.uuid('8b43f1fe-6c3a-11ed-87d2-4bad34160b01') },
			set: {
				replyToPost,
			},
		}))*/

		const followingUser = e.select(e.User, user => ({
			filter_single: e.op(user.handle, '=', 'madebyfabian'),
		}))

		const query = e.update(e.User, user => ({
			filter_single: { handle: 'lari' },
			set: {
				followingUsers: { '+=': followingUser },
			},
		}))

		type QueryType = $infer<typeof query>

		return await query.run(edgeDB)
	} catch (error) {
		console.error(error)
	}
})
