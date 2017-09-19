<template>
	<div class="cart-control">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			addCart(e) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('drop', [e.target]);
			},
			decreaseCart() {
				if (this.food.count >= 0) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cart-control
		font-size: 0
		.cart-decrease, .cart-count, .cart-add
			display: inline-block
			vertical-align: middle
		.cart-decrease, .cart-add
			padding: 6px
			height: 24px
			line-height 24px
			color: rgb(0, 160, 220)
		.cart-decrease
			font-size: 0
			transition: all .4s linear
			.inner
				font-size: 24px
				line-height 24px
		.cart-count
			font-size: 12px
			width: 12px
			text-align: center
			color: rgb(147, 153, 159)
		.cart-add
			font-size: 24px
</style>