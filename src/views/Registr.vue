<template>
  <v-container fluid class="grey lighten-5 fill-height justify-center"  >
    <v-card
        class="d-flex justify-center align-center d-inline rounded-xl"
        max-width="700px"
        min-width="500px"
        min-height="350px"
    >
      <v-form
          class="pa-10 flex"
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="name"
            :rules="[nameRules.max, nameRules.min, nameRules.required]"
            label="Ваше имя"
            hint="Минимум 2 символа"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Пароль"
            hint="Минимум 6 символов"
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="yellow accent-3"
            class="mr-4 mt-4"
            @click="validate"
        >
          Войти
        </v-btn>

      </v-form>
    </v-card>
  </v-container>




</template>

<script>
export default {
  name: "Registr",
  data: () => ({
    valid: false,
    name: '',
    nameRules: {
      required: value => !!value || 'Необходимо ввести имя',
      min: v => v.length >= 2 || 'Минимум 2 символов',
      max: v => v.length <= 20 || 'Максимум 20 символов'
    },
    password: '',
    showPassword: false,
    passwordRules: {
      required: value => !!value || 'Необходимо ввести пароль',
      min: v => v.length >= 6 || 'Минимум 6 символов'
    },
    email: '',
    emailRules: [
      v => !!v || 'Необходимо ввести вашу почту',
      v => /.+@.+\..+/.test(v) || 'Адресс электронной почты должен быть настоящим',
    ]
  }),

  methods: {
    async validate () {
      this.$refs.form.validate()
      if(this.$refs.form.validate()) {
        await this.$store.dispatch('auth/registration', {email: this.email, password: this.password})
        this.$router.push('/')
      }
    },
  },
}
</script>

<style scoped>

</style>
