<template>
  <div>
    <header :class="submitSuccess ? 'success header' : 'header'">
      <template v-if="submitSuccess">
        <h1 class="title">Клиент успешно добавлен!</h1>
      </template>
      <template v-else>
        <h1 class="title">Добавить клиента</h1>
        <p class="description" >Форма добавления нового клиента</p>
      </template>
    </header>
    <button v-if="submitSuccess" @click="submitSuccess = !submitSuccess" class="success-btn">Назад</button>
    <form v-if="!submitSuccess" class="form" id="new-client-form" @submit.prevent="submit" novalidate>
      <h2>Основные данные</h2>
      <div class="form-grid">
        <CustomInput
                v-model.lazy="$v.surname.$model"
                label="Фамилия*"
                placeholder="Введите фамилию"
                type="text"
                :error="$v.surname.$error"
                :required="!$v.surname.required"

        />
        <CustomInput
                v-model.lazy="$v.name.$model"
                label="Имя*"
                placeholder="Введите имя"
                type="text"
                :error="$v.name.$error"
                :required="!$v.name.required"
        />
        <CustomInput
                v-model="patronomyc"
                label="Отчество"
                placeholder="Введите отчество"
                type="text"
        />
        <CustomInput
                v-model.lazy="$v.birthDate.$model"
                label="Дата рождения*"
                placeholder="Введите дату рождения"
                type="date"
                :error="$v.birthDate.$error"
                :required="!$v.birthDate.required"
                :validDate="!$v.birthDate.validDate"
        />
        <CustomInput
                v-model.lazy="$v.number.$model"
                label="Телефон*"
                placeholder="Введите номер телефона"
                type="number"
                :error="$v.number.$error"
                :required="!$v.number.required"
                :validNumber="!$v.number.validNumber"
                :maxLength="!$v.number.maxLength"
        />
        <CustomSelect :options="genderOptions" v-model="gender" label="Пол"/>
        <CustomSelect
                :options="clientsGroupOptions"
                v-model.lazy="$v.clientsGroup.$model"
                label="Группа клиентов*"
                :error="$v.clientsGroup.$error"
        />
        <CustomSelect :options="doctorOptions" v-model="doctor" label="Лечащий врач"/>

        <div class="checkbox">
          <input class="checkbox__input" id="sms" type="checkbox" name="sms" value="sms" v-model="sendSms"/>
          <label class="checkbox__label" for="sms">Не отправлять СМС</label>
        </div>
      </div>

      <h2>Адрес клиента</h2>

      <div class="form-grid">
        <CustomInput
                v-model="address.index"
                label="Индекс"
                placeholder="Введите индекс"
                type="number"
        />
        <CustomInput
                v-model="address.country"
                label="Страна"
                placeholder="Введите страну"
                type="text"
        />
        <CustomInput
                v-model="address.region"
                label="Область"
                placeholder="Введите область"
                type="text"
        />
        <CustomInput
                v-model.lazy="$v.address.city.$model"
                label="Город*"
                placeholder="Введите город"
                type="text"
                :error="$v.address.city.$error"
                :required="!$v.address.city.required"
        />
        <CustomInput
                v-model="address.street"
                label="Улица"
                placeholder="Введите улицу"
                type="text"
        />
        <CustomInput
                v-model="address.house"
                label="Номер дома"
                placeholder="Введите номер дома"
                type="text"
        />
      </div>

      <h2>Документ</h2>

      <div class="form-grid">
        <CustomSelect
                :options="documentTypeOptions"
                v-model="$v.document.type.$model"
                label="Тип документа*"
                :error="$v.document.type.$error"
        />
        <CustomInput
                v-model="document.series"
                label="Серия"
                placeholder="Введите серию"
                type="number"
        />
        <CustomInput
                v-model="document.number"
                label="Номер"
                placeholder="Введите номер"
                type="number"
        />
        <CustomInput
                v-model="document.issuedBy"
                label="Кем выдан"
                placeholder="Введите кем был выдан документ"
                type="text"
        />
        <CustomInput
                v-model.lazy="$v.document.issuedDate.$model"
                label="Дата выдачи*"
                placeholder="Введите дату выдачи"
                type="date"
                :error="$v.document.issuedDate.$error"
                :validDate="!$v.document.validDate"
                :required="!$v.document.issuedDate"

        />
      </div>
      <button type="submit" >Сохранить</button>
    </form>
  </div>
</template>

<script>
  import CustomInput from "./elements/CustomInput";
  import CustomSelect from "./elements/CustomSelect";
  import CustomButton from "./elements/CustomButton";

  import { required, maxLength } from 'vuelidate/lib/validators';

  export default {
  name: 'HelloWorld',
  components: {CustomButton, CustomSelect, CustomInput},
  data() {
    return {
      submitSuccess: false,

      surname: null,
      name: null,
      patronomyc: null,
      birthDate: null,
      number: null,
      gender: null,
      genderOptions: ['Мужской', 'Женский', 'Другое'],
      clientsGroup: null,
      clientsGroupOptions: ['VIP', 'Проблемные', 'ОМС'],
      doctor: null,
      doctorOptions: ['Иванов', 'Захаров', 'Чернышева'],
      sendSms: false,

      address: {
        index: null,
        country: null,
        region: null,
        city: null,
        street: null,
        house: null
      },
      documentTypeOptions: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
      document: {
        type: null,
        series: null,
        number: null,
        issuedBy: null,
        issuedDate: null,
      }
    }
  },
  validations: {
    surname: {
      required
    },
    name: {
      required
    },
    birthDate: {
      required,
      validDate: val => {
        if(!val) return false
        let arrD = val.split("-")
        arrD[1] -= 1
        const currentDate = new Date()
        const d = new Date(arrD[0], arrD[1], arrD[2])
        if(
                (d.getFullYear() === +arrD[0])
                && (d.getMonth() === +arrD[1])
                && (d.getDate() === +arrD[2])
                && ((currentDate >= d))
        )
        {
          return true
        } else {
          return false
        }
      }
    },

    number: {
      required,
      validNumber: val => /^[7]+[0-9]+$/.test(val),
      maxLength: maxLength(11)
    },
    clientsGroup: {
      required
    },

    address: {
      city: {
        required
      },
    },

    document: {
      type: {
        required
      },
      issuedDate: {
        required,
        validDate: val => {
          if(!val) return false
          let arrD = val.split("-")
          arrD[1] -= 1
          const currentDate = new Date()
          const d = new Date(arrD[0], arrD[1], arrD[2])
          if(
                  (d.getFullYear() === +arrD[0])
                  && (d.getMonth() === +arrD[1])
                  && (d.getDate() === +arrD[2])
                  && ((currentDate >= d))
          ){
            return true
          } else {
            return false
          }
        },
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const clientInfo = {
          surname: this.surname,
          name: this.name,
          patronomyc: this.patronomyc,
          birthDate: this.birthDate,
          number: this.number,
          gender: this.gender,
          clientsGroup: this.clientsGroup,
          doctor: this.doctor,
          sendSms: this.sendSms,
          address: this.address,
          document: this.document
        }
        console.log(clientInfo)
        this.submitSuccess = true
      }
    }
  },
}
</script>

<style scoped lang="sass">
  .header
    padding: 2rem
    margin: 16px
    background-color: #f5f5f5
    border-radius: 16px
  .success
    color: green
  .success-btn
    width: 50%
    margin: 32px auto
  h2
    margin: 0 0 24px 0
    text-align: start
  .title, .description
    text-align: center
  .form
    padding: 2rem
  .form-grid
    display: grid
    grid-gap: 1rem 3rem
    margin: 0 0 42px 0
    @media screen and (min-width: 768px)
      grid-template-columns: 1fr 1fr

</style>
