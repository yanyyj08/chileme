<template>
	<div class="rating-select">
		<div class="rating-type border-1px">
			<span @click="select(2)" class="block positive" :class="{'active': selectedType === 2}">{{ desc.all }}<span class="count"></span>{{ ratings.length }}</span>
			<span @click="select(0)" class="block positive" :class="{'active': selectedType === 0}">{{ desc.positive }}<span class="count">{{ positives }}</span></span>
			<span @click="select(1)" class="block negative" :class="{'active': selectedType === 1}">{{ desc.negative }}<span class="count">{{ negatives }}</span></span>
		</div>
		<div @click="toggleContent" class="switch border-1px" :class="{'on': ifContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: true
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		data() {
			return {
				selectedType: this.selectType,
				ifContent: this.onlyContent
			};
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				}).length;
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				}).length;
			}
		},
		methods: {
			select(type) {
				this.selectedType = type;
				this.$emit('selectrating', type);
			},
			toggleContent() {
				this.ifContent = !this.ifContent;
				this.$emit('contentrating', this.ifContent);
			}
		}
	};
</script>

<style lang="stylus" rel="sheetstyle/stylus">
	@import '../../common/stylus/mixin.styl';
	.rating-select
		.rating-type
			margin: 0 18px
			padding: 18px 0
			font-size: 0
			border-1px(rgba(7, 17, 27, .1))
			.block
				display: inline-block
				margin-right: 8px
				padding: 8px 12px
				line-height: 14px
				font-size: 12px
				color: rgb(77, 85, 93)
				border-radius: 2px
				&.active
					color: #fff
				.count
					margin-left: 2px
					font-size: 8px
				&.positive
					background-color: rgba(0, 160, 220, .2)
					&.active
						background-color: rgb(0, 160, 220)
				&.negative
					background-color: rgba(77, 85, 93, .2)
					&.active
						background-color: rgb(77, 85, 93)
		.switch
			padding: 12px 18px
			line-height: 24px
			font-size: 0
			color: rgb(147, 153, 159)
			border-1px(rgba(7, 17, 27, .1))
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				display: inline-block
				vertical-align: top
				margin-right: 4px
				font-size: 24px
			.text
				display: inline-block
				vertical-align: top
				font-size: 12px
</style>