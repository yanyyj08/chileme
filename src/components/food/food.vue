<template>
	<transition name="moveright">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="close">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{ food.name }}</h1>
					<div class="detail">
						<span class="sell-count">月售{{ food.sellCount }}</span>
						<span class="rating">好评率{{ food.rating }}</span>
					</div>
					<div class="price">
						<span class="now">¥{{ food.price }}</span>
						<span v-show="food.oldPrice" class="old">¥{{ food.oldPrice }}</span>
					</div>
					<div class="cart-control-wrapper">
						<cart-control :food="food" @drop="addCart"></cart-control>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count === 0" @click="addFirst($event)">加入购物车</div>
					</transition>
				</div>
				<split></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{ food.info }}</p>
				</div>
				<split v-show="food.info"></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<rating-select 
						:select-type="selectType"
						:desc="desc"
						:only-content="onlyContent"
						:ratings="food.ratings"
						@selectrating="selectRating"
						@contentrating="contentRating"
						></rating-select>
						<div class="rating-wrapper">
							<ul v-show="food.ratings && food.ratings.length">
								<li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, key) in food.ratings" @key="key" class="rating-item border-1px">
									<div class="user">
										<span class="name">{{ rating.username }}</span>
										<img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
									</div>
									<div class="time">{{ rating.rateTime | formatDate }}</div>
									<p class="text">
										<span :class="{ 'icon-thumb_up': rating.rateType ===0, 'icon-thumb_down': rating.rateType ===1 }"></span>
										<span>{{ rating.text }}</span>
									</p>
								</li>
							</ul>
							<div class="no-rating" v-show="!(food.ratings && food.ratings.length)">暂无评价</div>
						</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date';
	import cartControl from 'components/cartControl/cartControl';
	import split from 'components/split/split';
	import ratingSelect from 'components/ratingSelect/ratingSelect';
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		components: { cartControl, split, ratingSelect },
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh(true);
					}
				});
			},
			close() {
				this.showFlag = false;
			},
			addFirst(e) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('drop', [e.target]);
			},
			addCart(el) {
				this.$emit('drop', el);
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			selectRating(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			contentRating(b) {
				this.onlyContent = b;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylue">
	@import '../../common/stylus/mixin.styl';
	.food
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		z-index: 40
		width: 100%
		background-color: #fff
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 0
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #fff
		.content
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.detail
				margin-bottom: 18px
				height: 10px
				line-height: 10px
				font-size: 0
				.sell-count, .rating
					font-size: 10px
					color: rgb(147, 153, 159)
				.sell-count
					margin-right: 12px
			.price
				height: 24px
				line-height 24px
				font-size: 0
				.now
					vertical-align: middle
					font-size: 14px
					font-weight: 700
					color: rgb(240, 20, 20)
				.old
					vertical-align: middle
					margin-left: 8px
					font-size: 10px
					font-weight: 700
					color: rgb(147, 153, 159)
					text-decoration: line-through
			.cart-control-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				height: 24px
				line-height: 24px
				padding: 0 12px
				font-size: 10px
				color: #fff
				border-radius: 12px
				background-color: rgb(0, 160, 220)
		.info
			padding: 18px
			.title
				margin-bottom: 16px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.text
				padding: 0 8px
				line-height: 24px
				font-size: 12px
				color: rgb(77, 85, 93)
		.rating
			padding-top: 18px
			.title
				padding-left: 18px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.rating-wrapper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(rgba(7, 17, 27, .1))
					.user
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						font-size: 0
						.name
							display: inline-block
							vertical-align: top
							margin-right: 6px
							font-size: 10px
							color: rgb(147, 153, 159)
						.avatar
							display: inline-block
							vertical-align: top
							border-radius: 50%
					.time
						margin-bottom: 6px
						line-height: 12px
						font-size: 10px
						color: rgb(147, 153, 159)
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7, 17, 27)
						.icon-thumb_up, .icon-thumb_down
							margin-right: 4px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.icon-thumb_down
							color: rgba(7, 17, 27, .2)
				.no-rating
					padding: 16px 0
					font-size: 12px
					color: rgb(147, 153, 159)
</style>