<template>
	<div>
		<pre>data: {{ data }}</pre>
		<pre>userDetails: {{ userDetails }}</pre>

		<button @click="update">update</button>
	</div>
</template>

<script setup lang="ts">
	const { data } = await useFetch('/api/hello')
	const { data: userDetails } = await useFetch('/api/user/details')

	const update = async () => {
		const res = await useFetch('/api/update', {
			method: 'POST',
		})
		console.log({ res })
	}
</script>
