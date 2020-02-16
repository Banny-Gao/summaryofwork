<template>
  <div v-transfer-dom
       :data-transfer="tansfer"
       @touchmove.prevent>
    <transition @enter="maskEnter"
                @leave="maskLeave">
      <div class="magic-modal-mask"
           v-show="visible"
           v-if="showMask"
           @click="handleMask"></div>
    </transition>
    <div class="magic-modal-wrap"
         v-show="wrapShow"
         @click="handleWrapClick">
      <transition :enter-active-class="`animated magictime ${animateIn}`"
                  :leave-active-class="`animated magictime ${animateOut}`"
                  :duration="duration">
        <div class="magic-modal"
             :style="mainStyles"
             v-show="visible">
          <div class="magic-modal-content"
               :style="contentStyles">
               <span class="magic-close" @click="close">
                 <slot name="close">
                  <i class="magic-i-close"></i>
                </slot>
               </span>
                <p class="magic-header">
                  <slot name="header">Header</slot>
                </p>
                <p class="magic-content">
                  <slot name="content">Content</slot>
                </p>
                <p class="magic-footer">
                  <slot name="footer">Footer</slot>
                </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import TransferDom from 'view-design/src/directives/transfer-dom'
  import 'magic.css/dist/magic.min.css'
  import 'animate.css/animate.min.css'

  export default {
  	name: 'magicModal',
  	props: {
  		value: {
  			type: Boolean,
  			default: false,
  		},
  		mask: {
  			type: Boolean,
  			default: true,
  		},
  		maskClosable: {
  			type: Boolean,
  			default: true,
  		},
  		draggable: {
  			type: Boolean,
  			default: false,
  		},
  		tansfer: {
  			type: Boolean,
  			default: true,
  		},
  		styles: {
  			type: Object,
  			default() {
  				return {}
  			},
  		},
  		width: {
  			type: [Number, String],
  			default: 520,
  		},
  		height: {
  			type: [Number, String],
  			default: 200,
  		},
  		draggable: {
  			type: Boolean,
  			default: false,
  		},
  		animateIn: {
  			type: String,
  			default: 'vanishIn',
  		},
  		animateOut: {
  			type: String,
  			default: 'vanishOut',
  		},
  		duration: {
  			type: Number,
  			default: 500,
  		},
  	},
  	directives: {
  		TransferDom,
  	},
  	data() {
  		return {
  			visible: this.value,
  			isContentAnimateDone: false,
  			dragData: {
  				x: null,
  				y: null,
  				dragX: null,
  				dragY: null,
  				dragging: false,
  			},
  			isMouseTriggerIn: false, // #5800
  			wrapShow: false,
  			timer: null,
  			$body: '',
  		}
  	},
  	computed: {
  		showMask() {
  			return this.draggable ? false : this.mask
  		},
  		mainStyles() {
  			let style = {}
  			const width = parseInt(this.width)
  			const styleWidth =
  				this.dragData.x !== null
  					? { top: 0 }
  					: { width: width <= 100 ? `${width}%` : `${width}px` }
  			const customStyle = this.styles ? this.styles : {}
  			Object.assign(style, styleWidth, customStyle)
  			return style
  		},
  		contentStyles() {
  			const height = parseInt(this.height)
  			const styleHeight = {
  				height: height <= 100 ? `${height}%` : `${height}px`,
  			}
  			let style = { ...styleHeight }
  			if (this.draggable) {
  				let customTop = this.styles.top ? parseFloat(this.styles.top) : 0
  				let customLeft = this.styles.left ? parseFloat(this.styles.left) : 0
  				if (this.dragData.x !== null)
  					style.left = `${this.dragData.x - customLeft}px`
  				if (this.dragData.y !== null)
  					style.top = `${this.dragData.y - customTop}px`
  				const width = parseInt(this.width)
  				const styleWidth = {
  					width: width <= 100 ? `${width}%` : `${width}px`,
  				}
  				Object.assign(style, styleWidth)
  			}
  			return style
  		},
  	},
  	methods: {
  		maskEnter(el, done) {
  			this.$velocity(el, 'fadeIn', { duration: 400 })
  		},
  		maskLeave(el, done) {
  			const timer = setTimeout(() => {
  				clearTimeout(timer)
  				this.$velocity(el, 'fadeOut', { duration: 400, delay: 200 })
  			}, this.duration - 200 || 0)
  		},
  		contentEnter(el, done) {
  			el.classList.add('animated', 'magictime')
  			el.classList.toggle(this.animateIn)
  		},
  		contentLeave(el, done) {
  			el.classList.add('animated', 'magictime')
  			el.classList.toggle(this.animateOut)
  		},
  		handleMask() {
  			if (this.maskClosable && this.showMask) {
  				this.close()
  			}
  		},
  		handleWrapClick(event) {
  			if (this.isMouseTriggerIn) {
  				this.isMouseTriggerIn = false
  				return
  			}
  			// use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
  			const className = event.target.getAttribute('class')
  			if (className && className.indexOf(`magic-modal-wrap`) > -1)
  				this.handleMask()
  		},
  		close() {
  			this.visible = false
  			this.$emit('input', false)
  		},
  		toggleOverflow(flag = false) {
        const scrollbarWidth = window.innerWidth - document.body.clientWidth
        const scrollbarHeight = window.innerHeight - document.body.clientHeight
  			if (!flag)
  				Object.entries(this.bodyStyle).forEach(
  					([key, value]) => (document.body.style[key] = value)
  				)
  			else {
  				const cStyle = { ...this.bodyStyle }
  				cStyle.boxSizing = 'border-box'
  				cStyle.paddingRight = ~~cStyle.paddingRight.split('px')[0] + scrollbarWidth + 'px'
  				cStyle.paddingBottom = ~~cStyle.paddingRight.split('px')[0] + scrollbarHeight + 'px'
  				cStyle.overflow = 'hidden'
  				Object.entries(cStyle).forEach(([key, value]) => {
  					document.body.style[key] = value
  				})
  			}
  		},
  	},
  	mounted() {
  		if (this.visible) this.wrapShow = true
  		const $bodyStyle = document.body.style
  		this.bodyStyle = {
  			boxSizing: $bodyStyle.boxSizing,
        paddingRight: $bodyStyle.paddingRight,
        paddingBottom: $bodyStyle.paddingBottom,
  			overflow: $bodyStyle.overflow,
      }
  	},
  	watch: {
  		value(val) {
  			this.visible = val
  		},
  		visible(val) {
  			if (!val) {
  				this.toggleOverflow()
  				this.timer = setTimeout(() => {
  					this.wrapShow = false
  				}, this.duration)
  			} else {
  				this.toggleOverflow(true)
  				if (this.timer) clearTimeout(this.timer)
  				this.wrapShow = true
  			}
  		},
  	},
  }
</script>
<style scoped lang='scss'>
  p{margin: 0; padding: 0};
  .magic-modal-mask,
  .magic-modal-wrap {
  	position: fixed;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	background-color: rgba(55, 55, 55, 0.6);
  	z-index: 1000;
  	height: 100%;
  }
  .magic-modal-wrap {
  	outline: 0;
  	overflow: auto;
  	background: none;
  	.magic-modal {
  		margin: 0 auto;
  		position: relative;
  		top: 200px;
  		.magic-modal-content {
  			position: relative;
        box-sizing: border-box;
  			background-color: #fff;
  			border: 0;
  			border-radius: 6px;
  			background-clip: padding-box;
        padding: 0 14px;
  			box-shadow: 0 4px 12px rgba($color: #000000, $alpha: 0.15);
        .magic-close{
          position: absolute;
          right: 10px;
          top: 10px;
          width: 20px;
          cursor: pointer;
          transition: all .2s linear;
          height: 20px;
          .magic-i-close{
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
          }
          &::after, &::before {
            position: absolute;
            left: 0;
            top: 0;
            content: '';
            width: 100%;
            height: 1.5px;
            background: #aaa;
            border-radius: 1px;
            transition: all .2s linear;
            transform-origin: 0 0;
            transform: rotate(45deg) translateX(4px);
          }
          &::after {
            transform-origin: 20px 0;
            transform: rotate(-45deg) translateX(-6px);
          }
          &:hover{
            transform: rotate(90deg);
            &::after, &::before {
              background: #000;
              width: 110%;
            }
          }
        }
        .magic-header{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          height: 42px;
          line-height: 42px;
          border-bottom: 0.5px solid #ececec;
        }
        .magic-content{
          height: calc(100% - 84px);
        }
        .magic-footer{
          height: 42px;
          line-height: 42px;
          text-align: center;
          border-top: 0.5px solid #ececec;
        }
  		}
  	}
  }
</style>