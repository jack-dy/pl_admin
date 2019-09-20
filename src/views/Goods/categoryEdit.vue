<template>
    <category-detail :is-edit="true"></category-detail>
</template>
<script>
import categoryDetail from './components/categoryDetail'
export default {
    name:'categoryEdit',
    components:{categoryDetail}
}
</script>
