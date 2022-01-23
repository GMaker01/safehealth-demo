<script>
import Spinner from '@components/spinner'

export default {
    name: 'app',
    components: {
        Spinner,
    },
    methods: {
        isLoading() {
            return this.$store.getters['loader/getLoader']
        },
    },
}
</script>

<template lang="pug">
#app
    spinner(
        :show="isLoading()"
    )
    router-view(:key="$route.fullPath")
</template>

<style lang="scss">
@import '@design/common.scss';
</style>
