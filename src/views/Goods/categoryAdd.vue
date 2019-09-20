<template>
    <category-detail :is-edit="false"></category-detail>
</template>
<script>
import categoryDetail from './components/categoryDetail'
export default {
    name:'categoryAdd',
    components:{categoryDetail}
}
</script>
