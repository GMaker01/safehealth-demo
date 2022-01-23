<script>
import SlotMixin from '@mixins/slot'

export default {
    name: 'FormLayout',
    mixins: [SlotMixin],
}
</script>

<template lang="pug">
div
    section
        .container
            .row.justify-content-md-center
                .card-wrapper
                    .card.mt-4
                        .card-body
                            h4.card-title(v-if="hasSlot('title')")
                                slot(name='title')
                            slot(name='body',v-if="hasSlot('body')")
</template>

<style lang="scss">
@import '@design/common.scss';
@import '@design/pages/login/_login.scss';
</style>
