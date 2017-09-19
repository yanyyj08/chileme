<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="description">
					{{ seller.description }} / {{ seller.deliveryTime }}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<support class="support-item" :icon="seller.supports[0].type" :size="12" :description="seller.supports[0].description"></support>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count" @click="showDetail">{{ seller.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" alt="">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
					  <h1 class="name">{{ seller.name }}</h1>
					  <div class="star-wrapper">
					    <star :size="48" :score="seller.score"></star>
					  </div>
					  <div class="title">
					  	<div class="line"></div>
					  	<div class="text">优惠信息</div>
					  	<div class="line"></div>
					  </div>
					  <ul v-if="seller.supports" class="supports">
					  	<support class="support-item" v-for="(item, key) in seller.supports" :key="key" :icon="item.type" :size="16" :description="item.description"></support>
					  </ul>
					  <div class="title">
					  	<div class="line"></div>
					  	<div class="text">商家公告</div>
					  	<div class="line"></div>
					  </div>
					  <div class="bulletin">
					  	<p class="content">{{ seller.bulletin }}</p>
					  </div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from 'components/star/star';
	import support from 'components/support/support';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			}
		},
		components: {
			star,
			support
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  @import '../../common/stylus/animation'
	.header
		position: relative
		color: #fff
		background-color: rgba(7, 17, 27, .5)
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				font-size: 14px
				.title
					margin: 2px 0 8px
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						margin-left: 6px
						line-height: 18px
						font-size: 16px
						font-weight: bold
				.description
					margin-bottom: 10px
					line-height 12px
					font-size: 12px
				.supports
					line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background-color: rgba(0, 0, 0, .2)
				text-align: center
				.count
					font-size: 10px
					vertical-align: top
				.icon-keyboard_arrow_right
					margin-left: 2px
					line-height 24px
					font-size: 10px
		.bulletin-wrapper
			position: relative
			padding: 0 22px 0 12px;
			height: 28px
			line-height: 28px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background-color: rgba(7, 17, 27, .2)
			.bulletin-title
				
				display: inline-block
				vertical-align: top
				margin-top: 8px
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				vertical-align: top
				margin: 0 4px
				font-size: 10px
			.icon-keyboard_arrow_right
				position: absolute
				right: 12px
				line-height: 28px
		.background
			position: absolute
			top: 0
			left: 0
			z-index: -1
			overflow: hidden
			width: 100%
			height: 100%
			filter: blur(10px)
		.detail
			position: fixed
			top: 0
			left: 0
			z-index: 100
			overflow: auto
			width: 100%
			height: 100%
			background-color: rgba(7, 17, 27, 0.8)
			backdrop-filter: blur(10px)
			.detail-wrapper
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700px
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						margin: 28px auto 24px
						width: 80%
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255, 255, 255, .2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: 700
					.supports
						width: 80%
						margin: 0 auto
						line-height: 12px
						.support-item
							padding: 0 12px
							margin-bottom: 12px
							line-height: 16px
							&:last-child
							 margin-bottom: 0
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px
			.detail-close
				position: relative 
				width: 32px
				height: 32px
				margin: -64px auto 0
				clear: both
				font-size: 32px
				.icon-close
					color: #fff
			
</style>