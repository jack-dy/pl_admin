<template>
    <div :style="{height:height+'px',zIndex:zIndex}">
        <div
        :class="className"
        :style="{top:(isSticky?stickyTop+'px':''),zIndex:zIndex,position:position,width:width,height:height+'px'}"
        >
            <slot>
        <div>sticky</div>
      </slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 65
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
    data(){
        return {
            avtive:false,
            position:'',
            width:undefined,
            height:undefined,
            isSticky:false
        }
    },
    mounted(){
        this.height = this.$el.getBoundingClientRect().height
        document.getElementById("el-main").addEventListener('scroll',this.handleScroll)
        document.getElementById("el-main").addEventListener('scroll',this.handleResize)
    },
    activated() {
    this.handleScroll()
    },
    destroyed() {
        document.getElementById("el-main").removeEventListener('scroll', this.handleScroll)
        document.getElementById("el-main").removeEventListener('resize', this.handleResize)
    },
    methods:{
        sticky(){
            if(this.avtive){
                return
            }
            this.position = 'fixed'
            this.active = true
            this.width =this.width + 'px'
            this.isSticky = true
        },
        handleReset(){
            if(!this.active){
                return
            }
            this.reset()
        },
        reset(){
            this.position= ''
            this.width = 'auto'
            this.active = false
            this.isSticky = false
        },
        handleScroll(){
            const width = this.$el.getBoundingClientRect().width
            this.width = width || 'auto'
            const offsetTop = this.$el.getBoundingClientRect().top
            if(offsetTop< this.stickyTop){
                this.sticky()
                return
            }
            this.handleReset()
        },
        handleResize(){
            if(this.isSticky){
                this.width = this.$el.getBoundingClientRect().width+'px'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.sub-navbar{
    text-align: right;
}
.sub-navbar.draft{
    background:#bfcbd9;
}
</style>
