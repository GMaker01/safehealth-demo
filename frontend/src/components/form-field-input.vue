<script>
import FormLabel from './form-label'
import Multiselect from 'vue-multiselect'
import { humanize } from 'underscore.string'

export default {
    name: 'FormFieldInput',
    components: {
        FormLabel,
        Multiselect,
    },
    props: {
        inputType: {
            type: String,
            required: false,
            default: 'text',
        },
        inputClass: {
            type: String,
            required: false,
            default: 'form-control',
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
        contextualStyle: {
            type: String,
            required: false,
            default: 'light',
        },
        items: {
            type: Array,
            required: false,
            default: () => [],
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
        clearable: {
            type: Boolean,
            required: false,
            default: true,
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
        maxHeight: {
            type: Number,
            required: false,
            default: 300,
        },
        showErrors: {
            type: Boolean,
            required: false,
            default: false,
        },
        radioButtonValue: {},
        // search-select
        customLabel: {
            type: Function,
        },
        trackBy: {
            type: String,
            default: '',
            required: false,
        },
    },
    data() {
        return {
            // If no label is set, just humanize the attribute name for convenience
            labelText: this.label || null, // humanize(this.attribute),
            placeholderText: this.placeholder || this.label || humanize(this.attribute),
            inputValueText: '',
            errors: [],
        }
    },
    computed: {
        inputValue: {
            get() {
                return this.value || null
            },
            set() {},
        },
        selectedValue() {
            const item = this.items.find(({ id }) => id === this.value)
            // Select the current item if found in the list of options
            if (item) {
                this.selectItem(item)
                return item.name
            }
            return humanize(this.value)
        },
    },
    mounted() {
        // Watch for the changes to the childs error bag and pass back to the parent
        this.$watch(
            () => (this.errors ? this.errors.items : []),
            errors => {
                // Emit the errors for this attribute
                this.$emit('errors', {
                    [this.attribute]: errors,
                })
            }
        )
    },
    methods: {
        humanize(value) {
            return humanize(value)
        },
        // Removes an item from an array
        removeItem(item) {
            const inputV = this.inputValue
            const index = inputV.indexOf(item)
            inputV.splice(index, 1)
            this.$emit('input', inputV)
        },
        pushItem() {
            // Add the item to the parent array
            this.selectItem({
                id: this.inputValueText,
                name: this.inputValueText,
            })
            // Reset the value to push
            this.inputValueText = ''
        },
        // Adds an item to an array
        selectItem({ id, name }) {
            let inputV = this.inputValue
            if (this.array) {
                if (!inputV) {
                    inputV = []
                }
                // Only add the item if it does not already exist
                if (!inputV.includes(name)) {
                    inputV.unshift(name)
                }
            } else {
                // Set the new item aghainst the attribute and local selected attribute.
                inputV = id
                // Emit the value change to the parent
                this.$emit('updated', {
                    id,
                    name,
                })
            }
            this.$emit('input', inputV)
            this.inputValue = inputV
        },
    },
}
</script>

<template lang="pug">
span
    //- List the currently selected items
    ul.list-unstyled(v-if="array && inputValue")
        li(v-for="item of inputValue")
            //- Removes the item from the array
            button.btn.btn-default.btn-sm(
                v-on:click="removeItem(item)",
                v-if="!disabled",
            )
                i.btl.bt-trash
            span(v-if="disabled") - &nbsp;
            span {{ item }}
    //- Plain text input - vue does not allow dynamic input types
    input(
        :class="inputClass",
        :name="attribute",
        v-model="inputValue",
        @input="$emit('input', $event.target.value)",
        type="text",
        :placeholder="placeholderText",
        v-validate="validation",
        v-if="inputType === 'text' && !array",
        :data-vv-as="labelText",
        :disabled="disabled",
        :required="required",
    )
    //- Text input for pushing items on to an array
    div(v-if="inputType === 'text' && array")
        .input-group.mb-3
            input(
                :class="inputClass",
                :name="attribute",
                v-model="inputValueText",
                type="text",
                :placeholder="placeholderText",
                v-validate="validation",
                :data-vv-as="labelText",
                :disabled="disabled",
            )
            .input-group-append(
                v-if="!disabled",
            )
                button.btn.btn-primary.btn-sm(v-on:click="pushItem()")
                    i.btm.bt-plus
    //- Email input
    input(
        :class="inputClass",
        :name="attribute",
        v-model="inputValue",
        @input="$emit('input', $event.target.value)",
        type="email",
        :placeholder="placeholderText",
        v-validate="validation",
        v-if="inputType === 'email'",
        :data-vv-as="labelText",
        :disabled="disabled",
        :required="required",
    )
    //- Number input
    input(
        :class="inputClass",
        :name="attribute",
        v-model="inputValue",
        @input="$emit('input', $event.target.value)",
        type="number",
        :placeholder="placeholderText",
        v-validate="validation",
        v-if="inputType === 'number'",
        step="any",
        :data-vv-as="labelText",
        :disabled="disabled",
        :required="required",
    )
    //- Password input
    input(
        :class="inputClass",
        :name="attribute",
        v-model="inputValue",
        @input="$emit('input', $event.target.value)",
        type="password",
        :placeholder="placeholderText",
        v-validate="validation",
        v-if="inputType === 'password'",
        :data-vv-as="labelText",
        :disabled="disabled",
        :required="required",
    )

    textarea.fix-height(
        v-if="inputType === 'textarea'",
        :class="inputClass",
        :name="attribute",
        v-model="inputValue",
        @input="$emit('input', $event.target.value)",
        :placeholder="placeholderText",
        v-validate="validation",
        :data-vv-as="labelText",
        :disabled="disabled",
        :required="required",
    )
    //- Select
    multiselect(
        v-if="inputType === 'select'",
        :name="attribute",
        v-model='inputValue',
        @input="$emit('input', $event)",
        v-validate="validation",
        :disabled="disabled",
        :required="required",
        :track-by="trackBy",
        :label="labelText",
        :placeholder="placeholderText",
        :options="items",
        :searchable="false",
        :allow-empty="false",
        deselect-label="",
        select-label="",
        selected-label="",
        :hide-selected="false"
    )
    select.form-control(
        v-if="inputType === 'select-option'",
        :name="attribute",
        v-model='inputValue',
        @input="$emit('input', $event.target.value)",
        v-validate="validation",
        :disabled="disabled",
        :required="required",
    )
        option(value="") Select an option
        option(v-for='{ name, value} in items', :value='value') {{name}}
    //- Radio button
    el-radio(
        v-if="inputType === 'radio'",
        v-for="item in items",
        v-model="inputValue",
        :key="item.value",
        @input="$emit('input', $event)",
        v-validate="validation",
        :disabled="disabled",
        :required="required",
        :label="item.value",
        ) {{item.label}}
    //- Search Select
    multiselect(
        v-if="inputType === 'search-select'",
        v-model='inputValue',
        :options='items',
        :multiple="false",
        :hide-selected="false"
        :searchable="true"
        :placeholder="placeholderText",
        deselect-label="",
        select-label="",
        selected-label="",
        :disabled="disabled"
        :label='labelText',
        :track-by="trackBy",
        :custom-label="customLabel",
        @input="$emit('input', $event)",
        :max-height="maxHeight",
    )
    //- Search Multiple Select
    multiselect(
        v-if="inputType === 'search-multiple-select'",
        v-model='inputValue',
        :options='items',
        :multiple="true",
        :hide-selected="true",
        deselect-label="",
        select-label="",
        :searchable="true",
        :close-on-select="false",
        :clear-on-select="false",
        :placeholder="placeholderText",
        :label='labelText',
        :track-by="trackBy",
        :custom-label="customLabel",
        @input="$emit('input', $event)",
        :max-height="maxHeight",
    )
    p.error-block(v-if="validation && showErrors", v-for="error of errors.items")
        span(v-if="error.field === attribute") {{ error.msg }}
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.error-block {
    color: red;
    margin: 0.5em 0 0;
}

label {
    font-weight: bold;
}

.fix-height {
    height: 100px !important;
    overflow-x: auto !important;
}
</style>
