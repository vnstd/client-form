<template>
    <div class="custom-form-element" :class="error ? 'custom-form-element__error-border' : ''">
        <label
                class="custom-form-element__label"
        >
            {{ label }}
        </label>
        <input
                class="custom-form-element__input"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                :type="type"
                :placeholder="placeholder"
        />
        <template v-if="error">
            <p v-if="required" class="custom-form-element__error-msg">Обязательное поле</p>
            <p v-if="maxLength" class="custom-form-element__error-msg">Максимальная длина поля 11 символов</p>
            <p v-if="validDate" class="custom-form-element__error-msg">Проверьте правильность введенной даты!</p>
            <p v-if="validNumber" class="custom-form-element__error-msg">Номер должен начинаться с "7"</p>
            <p v-if="validOnlyNumber" class="custom-form-element__error-msg">Данное поле может состоять только из цифр!</p>
        </template>
    </div>
</template>

<script>
    export default {
        name: "CustomInput",
        props: {
            value: String,
            label: String,
            placeholder: String,
            type: String,
            error: Boolean,

            required: Boolean,
            maxLength: Boolean,
            validDate: Boolean,
            validNumber: Boolean,
            validOnlyNumber: Boolean,
        },

    }
</script>