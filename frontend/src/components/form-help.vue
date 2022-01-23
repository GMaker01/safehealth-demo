<script>
export default {
    name: 'FormHelp',
    props: {
        help: {
            type: String,
            required: false,
        },
    },
}
</script>

<template lang="pug">
    p.help-text(v-if="help") {{ help }}
</template>
