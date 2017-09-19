<template>
	<div class="support" :class="supportType">
		<i v-if="icon > -1" class="icon" :class="classMap[icon]"></i>{{ description }}
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			icon: {
				type: Number
			},
			size: {
				type: Number
			},
			description: {
				type: String
			},
			solid: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			};
		},
		computed: {
			supportType() {
				if (this.solid) {
					return 'support-solid support-' + this.size;
				} else {
					return 'support-' + this.size;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylue">
	@import '../../common/stylus/mixin.styl';
	
	.support
		font-size: 0
		.icon
			display: inline-block
			vertical-align: top
			background-repeat: no-repeat
		&.support-16
			font-size: 14px
			.icon
				margin-right: 6px
				width: 16px
				height: 16px
				background-size: 16px 16px
				&.decrease
					bg-image('decrease_2')
				&.discount
					bg-image('discount_2')
				&.guarantee
					bg-image('guarantee_2')
				&.invoice
					bg-image('invoice_2')
				&.special
					bg-image('special_2')
		&.support-12
			font-size: 10px
			.icon
				margin-right: 4px
				width: 12px
				height: 12px
				background-size: 12px 12px
				&.decrease
					bg-image('decrease_1')
				&.discount
					bg-image('discount_1')
				&.guarantee
					bg-image('guarantee_1')
				&.invoice
					bg-image('invoice_1')
				&.special
					bg-image('special_1')
			&.support-solid
				font-size: 12px
				.icon
					margin-right: 2px
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
</style>