<script>
import FormLabel from './form-label'
import FormHelp from './form-help'
import FormFieldInput from './form-field-input'

export default {
    name: 'FormField',
    components: {
        FormLabel,
        FormHelp,
        FormFieldInput,
    },
    props: {
        inputType: {
            type: String,
            required: false,
            default: 'text',
        },
        attribute: {
            type: String,
            required: false,
        },
        value: {},
        label: {
            type: String,
            required: false,
        },
        validation: {
            type: String,
            required: false,
            default: '',
        },
        placeholder: {
            type: String,
            required: false,
        },
        showLabel: {
            type: Boolean,
            required: false,
            default: true,
        },
        help: {
            type: String,
            required: false,
        },
        contextualStyle: {
            type: String,
            required: false,
            default: 'light',
        },
        items: {
            type: Array,
            required: false,
        },
        array: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        falseCheckboxText: {
            type: String,
            required: false,
        },
        trueCheckboxText: {
            type: String,
            required: false,
        },
        removeNullOption: {
            type: Boolean,
            required: false,
            default: () => false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: () => false,
        },
        buttonLabel: {
            type: String,
            required: false,
        },
        showErrors: {
            type: Boolean,
            required: false,
            default: () => true,
        },
        maxHeight: {
            type: Number,
            required: false,
            default: 300,
        },
        // search-select
        customLabel: {
            type: Function,
        },
        trackBy: {
            type: String,
            default: '',
            required: false,
        },
        radioButtonValue: {},
        clearable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        inputValue: {
            get () {
                return this.value
            },
            set () { },
        },
    },
}
</script>

<template lang="pug">
    .form-group(:class="contextualStyle")
        slot(name="input")
            //- Label (off by default)
            form-label(
                :name="attribute",
                :showLabel="showLabel",
                :label="attribute",
                :attribute="attribute",
                :required="required",
            )
            sup(v-if="required") *
            form-help(:help="help")
            br(v-if="['date','time','date-time'].includes(inputType)")
            form-field-input(
                v-model="inputValue",
                @input="$emit('input', $event)",
                :inputType="inputType",
                :attribute="attribute",
                :value="value",
                :label="label",
                :validation="validation",
                :placeholder="placeholder",
                :showLabel="showLabel",
                :contextualStyle="contextualStyle",
                :items="items",
                :array="array",
                :required="required",
                :falseCheckboxText="falseCheckboxText",
                :trueCheckboxText="trueCheckboxText",
                :removeNullOption="removeNullOption",
                :disabled="disabled",
                :buttonLabel="buttonLabel",
                :showErrors="showErrors",
                :maxHeight="maxHeight",
                :clearable='clearable',
                :customLabel="customLabel",
                :trackBy="trackBy",
                :radioButtonValue="radioButtonValue",
            )
                slot
</template>

<style lang="scss">
.error-block {
    color: red;
    margin: 1em 0;
}

label {
    font-weight: bold;
}
</style>
