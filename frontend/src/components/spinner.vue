<script>
export default {
    name: 'Spinner',
    props: {
        show: {
            type: Boolean,
            default: () => true,
        },
        size: {
            type: String, // From 2 to 10
            required: false,
            default: () => '3',
        },
        styleIcon: {
            type: Object,
            required: false,
            default: () => ({
                top: '40%',
                left: '50%',
                position: 'absolute',
                transform: 'translateY(-50%)',
            }),
        },
    },
    computed: {
        sizeClass () {
            const prop = `fa-${this.size}x`
            const classObject = {}
            classObject[prop] = true

            return classObject
        },
    },
}
</script>

<template lang="pug">
.loader-box(v-if="show")
    .loader
        div Loading...
</template>

<style lang="scss">
@import '@design/component/_loader.scss';
</style>
