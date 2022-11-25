import { edgeDB } from '@/server/utils/edgeDB'
import e, { $infer } from '@/dbschema/edgeql-js'

import { basePost } from '../hello'

export default defineEventHandler(async () => {
	try {
		const query = e.select(e.User, user => ({
			id: true,
			name: true,
			handle: true,
			_count_followingUsers: e.count(user.followingUsers),
			_count_isFollowedByUsers: e.count(user.isFollowedByUsers),
			posts: post => ({
				...basePost(post),
			}),
			filter_single: { handle: 'madebyfabian' },
		}))

		type QueryType = $infer<typeof query>

		return await query.run(edgeDB)
	} catch (error) {
		console.error(error)
	}
})
