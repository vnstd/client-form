<template>
    <div class="custom-form-element" :class="error ? 'custom-form-element__error-border' : ''">
        <label class="custom-form-element__label" >
            {{ label }}
        </label>
        <select
                class="custom-form-element__select"
                @change="change"
        >
            <option :value="null" disabled selected hidden >Выберите</option>
            <option
                    v-for="(value, i) in options"
                    v-bind:value="value"
                    :key="i"
            >
                {{ value }}
            </option>
        </select>
        <p v-if="error" class="custom-form-element__error-msg">Выберите один из вариантов</p>
    </div>
</template>

<script>
    export default {
        name: "CustomSelect",
        props: {
            label: String,
            options: Array,
            error: Boolean,
        },
        data() {
            return {
                selected: null
            }
        },
        methods: {
            change(e) {
                const selectedCode = e.target.value;
                const option = this.options.find((option) => {
                    return selectedCode === option;
                });
                this.$emit("input", option);
            }
        }
    }
</script>