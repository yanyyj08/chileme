<template>
	<div class="ratings" ref="seller">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ seller.score }}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{ seller.rankRate }}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{ seller.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{ seller.foodScore }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{ seller.deliveryTime }}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<rating-select 
				:select-type="selectType"
				:only-content="onlyContent"
				:ratings="ratings"
				@selectrating="selectRating"
				@contentrating="contentRating"
			></rating-select>
			<div class="rating-wrapper">
				<ul v-show="ratings && ratings.length">
					<li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, key) in ratings" @key="key" class="rating-item border-1px">
						<div class="user">
							<span class="name">{{ rating.username }}</span>
							<img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
						</div>
						<div class="time">{{ rating.rateTime | formatDate }}</div>
						<p class="text">
							<span :class="{ 'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType ===1 }"></span>
							<span>{{ rating.text }}</span>
						</p>
					</li>
				</ul>
				<div class="no-rating" v-show="!(ratings && ratings.length)">暂无评价</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date';
	import star from 'components/star/star';
	import split from 'components/split/split';
	import ratingSelect from 'components/ratingSelect/ratingSelect';

	const ALL = 2;
	const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				ratings: []
			};
		},
		components: { star, split, ratingSelect },
		created() {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.ratings = response.data;
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.seller, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
			});
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		methods: {
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
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	
	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex
			padding: 18px 0
			.overview-left
				flex: 0 0 137px
				padding: 6px 0
				width: 137px
				border-right: 1px solid rgba(7, 17, 27, .1)
				text-align: center
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255, 153, 0)
				.title
					margin-bottom: 8px
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
			.overview-right
				flex: 1
				padding: 6px 0 6px 24px
				@media only screen and (max-width: 320px)
					padding: 6px 0 6px 6px
				.score-wrapper, .delivery-wrapper
					font-size: 0
					.title
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
				.score-wrapper
					margin-bottom: 8px
					.star
						display: inline-block
						vertical-align: top
						margin: 0 10px
					.score
						display: inline-block
						vertical-align: top
						line-height: 18px
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-wrapper
					.delivery
						margin-left: 12px
						line-height: 18px
						font-size: 12px
						color: rgb(147, 153, 159)
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