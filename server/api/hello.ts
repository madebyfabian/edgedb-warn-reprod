import { edgeDB } from '@/server/utils/edgeDB'
import e, { $infer } from '@/dbschema/edgeql-js'

export const basePost = e.shape(e.Post, post => ({
	id: true,
	content: true,
	createdAt: true,
	updatedAt: true,
	isDeleted: true,
	_count_postReactions: e.count(post.postReactions),
	authorUser: {
		id: true,
		name: true,
		handle: true,
	},
	order_by: post.createdAt,
}))

export default defineEventHandler(async () => {
	try {
		const query = e.select(e.Post, post => ({
			...basePost(post),
			replyToPost: basePost,

			// ---
			limit: 10,
			offset: 0,
			filter: e.op(
				post['authorUser']['isFollowedByUsers']['handle'],
				'=',
				'madebyfabian'
			),
		}))

		/*const query = e.select(e.User, user => ({
			id: true,
			name: true,
			handle: true,
			followingUsers: {
				id: true,
			},
			isFollowedBy: {
				...e.User['*'],
			},
			posts: {
				...e.Post['*'],
				authorUser: {
					...e.User['*'],
				},
			},
			filter_single: { handle: 'madebyfabian' },
		}))*/

		type QueryType = $infer<typeof query>

		return await query.run(edgeDB)
	} catch (error) {
		console.error(error)
	}
})
