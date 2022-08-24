<template>
	<span class="fitted"><slot></slot></span>
</template>

<script>
import fitty from 'fitty';

export default {
	name: 'FitText',
	props: {
		options: {
			type: Object,
			required: false,
			default() {
				return {
					minSize: 12,
					maxSize: 70,
					multiLine: true,
				};
			},
		},
	},
	data() {
		return {
			$_fitty: undefined,
		};
	},
	destroy() {
		this.$_fitty.unsubscribe();
	},
	mounted() {
		this.$_fitty = fitty(this.$el, this.options);
	},
};
</script>

<style scoped>
.fitted {
	display: inline-block;
	white-space: nowrap;
}
</style>
