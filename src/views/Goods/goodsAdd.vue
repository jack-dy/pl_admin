<template>
    <goods-detail :is-edit="false"></goods-detail>
</template>
<script>
import goodsDetail from './components/goodsDetail'
export default {
    name:'goodsAdd',
    components:{goodsDetail}
}
</script>
