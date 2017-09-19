<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menu">
				<ul>
					<li class="menu-item menu-list-hook" :class="{'current': currentIndex === key}" v-for="(item, key) in goods" :key="key" @click="selectMenu(key)">
						<support :size="12" :solid="true" :icon="item.type" :description="item.name"></support>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foods">
				<ul>
					<li v-for="(item, key) in goods" :key="key" class="food-list food-list-hook">
						<h1 class="title">{{ item.name }}</h1>
						<ul>
							<li v-for="food in item.foods" @click="selectFood(food, $event)" class="food-item">
								<div class="icon">
									<img :src="food.icon" width="57" height="57" alt="">
								</div>
								<div class="content">
									<h2 class="name">{{ food.name }}</h2>
									<p class="desc">{{ food.description }}</p>
									<div class="extra">
										<span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{ food.price }}</span><span v-show="food.oldPrice" class="old">¥{{ food.oldPrice }}</span>
									</div>
									<div class="cart-control-wrapper">
										<cart-control :food="food" @drop="dropBall"></cart-control>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods" ref="shopcart"></shopcart>
		</div>
		<food :food="selectedFood" ref="food" @drop="dropBall"></food>
	</div>
</template>

<script>
	import support from 'components/support/support';
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartControl from 'components/cartControl/cartControl';
	import food from 'components/food/food';

	let ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		components: { support, shopcart, cartControl, food },
		created() {
			this.$http.get('/api/goods').then(response => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			}, response => {
        console.log('error');
      });
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { return i; }
				}
				return this.listHeight.length;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		methods: {
			selectMenu(index) {
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			dropBall(el) {
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.dropBall(el);
				});
			},
			selectFood(food, event) {
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menu, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foods, {
					click: true,
					probeType: 3
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.ceil(Math.abs(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				this.wrapperHeight = this.$refs.foods.clientHeight;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	
	.goods
		display: flex
		position: absolute
		overflow: hidden
		top: 174px
		bottom: 48px
		width: 100%
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background-color: #f3f5f7
			.menu-item
				display: table
				margin: 0;
				padding: 0 12px
				width: 56px
				height: 54px
				line-height 14px
				border-1px(rgba(7, 17, 27, .1))
				.support
					display: table-cell
					vertical-align: middle
					line-height: 14px
				&.current
					position: relative
					z-idnex: 10
					margin-top: -1px
					font-weight: 700
					background-color: #fff
					.text
						border-none()
		.foods-wrapper
			flex: 1
			.food-list
				.title
					padding-left: 14px
					height: 26px
					line-height 26px
					font-size: 12px
					color: rgb(147, 153, 159)
					border-left: 2px solid #d9ddee
					background-color: #f3f5f7
				.food-item
					display: flex
					margin: 0 18px
					padding: 18px 0
					border-1px(rgba(7, 17, 27, .1))
					&:last-child
						border-none()
						margin-bottom: 0
					.icon
						flex: 0 0 57px
						margin-right: 10px
					.content
						flex: 1
						.name
							margin: 2px 0 8px
							height: 14px
							line-height: 14px
							font-size: 14px
							color: rgb(7, 17, 27)
						.desc, .extra
							line-height: 10px
							font-size: 10px
							color: rgb(147, 153, 159)
						.desc
							margin-bottom: 8px
							line-height: 12px
						.extra
							.count
								margin-right: 12px
						.price
							line-height 24px
							.now
								font-size: 14px
								font-weight: 700
								color: rgb(240, 20, 20)
							.old
								margin-left: 8px
								font-size: 10px
								font-weight: 700
								color: rgb(147, 153, 159)
								text-decoration: line-through
						.cart-control-wrapper
							position: absolute
							right: 0
							bottom: 12px
</style>