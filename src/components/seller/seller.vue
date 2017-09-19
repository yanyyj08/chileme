<template>
	<div class="seller">
		<div class="seller-content">
			<div class="btn">
				<button @click="toggleFavorite">点击一下喽{{ favorite }}</button>
			</div>
			<div class="pics">
				<div class="pic-wrapper" ref="picwrapper">
					<ul class="pic-list" ref="piclist">
						<li v-for="(item, key) in seller.pics" @key="key" class="pic-item">
							<img :src="item" width="120" height="90" alt="">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from 'common/js/store';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: loadFromLocal(this.seller.id, 'favorite', 'false')
			};
		},
		watch: {
			seller(newQuestion) {
				if (this.seller.pics.length) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.piclist.style.width = width + 'px';
					this.$nextTick(() => {
						this.scroll.refresh();
					});
				}
			}
		},
		created() {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.picwrapper, {
					click: true,
					scrollX: true,
					eventPassThrough: 'vertical'
				});
			});
		},
		methods: {
			toggleFavorite() {
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			}
		}
	};
</script>

<style lang="stylus" rel="sheetstyle/stylus">
	.seller
		position: absolute
		overflow: hidden
		top: 174px
		bottom: 48px
		width: 100%
		.seller-content
			.pics
				padding: 18px
				.pic-wrapper
					overflow: hidden
					width: 100%
					white-space: nowrap
					.pic-list
						font-size: 0
						.pic-item
							display: inline-block
							margin-right: 6px
							width: 120px
							height: 90px
							&:last-child
								margin: 0
				
</style>