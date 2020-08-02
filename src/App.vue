<template>
  <div id="app" class="wrapper">
    <NewClientForm/>
  </div>
</template>

<script>
import NewClientForm from './components/NewClientForm.vue'

export default {
  name: 'app',
  components: {
    NewClientForm
  }
}
</script>

<style lang="sass">
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif

  .wrapper
    border: 1px solid #ccc
    border-radius: 24px
    margin: 32px auto
    max-width: 768px
    background-color: white
    box-shadow: 2px 5px 10px #e4e4e4
    @media screen and (max-width: 768px)
      border: none
      border-radius: 0
      margin: 0
      box-shadow: none

  .checkbox
    height: 2.5rem
    display: flex
    align-items: center
    justify-self: start
    margin: 20px 0

  .checkbox__label
    cursor: pointer
    margin: 0
    padding: 0 0 0 8px

  .checkbox__input
    cursor: pointer
    height: 1.2rem
    width: 1.2rem


  .custom-form-element__error-msg
    margin: 4px
    text-align: start
    color: darkred
    font-size: 0.8rem
  .custom-form-element__error-border
    .custom-form-element__label,
    .custom-form-element__input,
    .custom-form-element__select
      border-color: darkred!important
      color: darkred

  .custom-form-element__label
    display: inline-block
    margin: 4px
    color: #626262

  .custom-form-element__select
    cursor: pointer
  .custom-form-element__input,
  .custom-form-element__select
    display: block
    height: 2.5rem
    width: 100%
    padding: 0.25rem 0.5rem
    font-size: 1rem
    line-height: 1.5
    font-family: inherit
    border: 1px solid #ccc
    border-radius: 5px
    &:focus
      outline: none
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button
    -webkit-appearance: none
    -moz-appearance: textfield
  *
    box-sizing: border-box
  button
    display: flex
    overflow: hidden
    width: 100%
    padding: 12px
    cursor: pointer
    user-select: none
    transition: all 150ms linear
    text-align: center
    white-space: nowrap
    color: #202129
    border: 0 none
    border-radius: 8px
    font-weight: bold
    font-size: 1rem
    line-height: 1.5
    font-family: inherit
    justify-content: center
    align-items: center
    flex: 0 0 160px
    box-shadow: 2px 5px 10px #e4e4e4
    &:hover
      color: #202129
      background-color: #e1e2e2
      transition: all 150ms linear
      opacity: .85
    &:active
      background-color: #d5d6d6
      transition: all 150ms linear
      opacity: .75
    &:focus
      outline: none
    &:disabled
      cursor: default
      opacity: 1
      transition: none
      box-shadow: none
      color: #d5d6d6
      background-color: #f1f1f1
</style>
