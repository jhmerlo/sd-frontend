<template>
  <q-page :class="$q.screen.lt.md ? 'bg-primary' : 'bg-primary'" class="flex flex-center">
    <div class="row full-width justify-center">
      <q-card style="min-height: 80vh" class="col-xs-10 col-md-8">
        <div class="row">
          <div style="background-image: url('login_bg.webp'); min-height: 80vh; background-position: center; background-size: cover;" class="col-md-5 col-sm-4">
          </div>
          <template v-if="mode == 'Login'">
            <div class="col-md-7 col-sm-8 col-xs-12 flex flex-center q-pa-md">
              <div class="row justify-center">
                <div class="col-12 text-center q-pb-md">
                  <q-img src="~assets/marca_ufes.png" width="100px" />
                </div>
                <div class="text-caption q-pb-sm col-12 text-weight-regular text-center text-grey-8">
                  Universidade Federal do Espírito Santo
                </div>
                <div :class="$q.screen.lt.md ? 'text-h5' : 'text-h4'" class="text-h4 col-8 text-center text-weight-bold q-pb-lg text-primary">
                  Solidariedade Digital
                </div>
                <q-form @submit="handleLogin" class="full-width">
                  <div class="row full-width justify-center q-col-gutter-y-md">
                    <div class="col-md-8 col-xs-10">
                      <q-input 
                        v-model="user.email" 
                        :rules="[
                          required, validEmail
                        ]"
                        label="E-mail *"
                        lazy-rules
                        outlined
                        dense
                        hide-bottom-space
                      />
                    </div>
                    <div class="col-md-8 col-xs-10">
                      <q-input
                        v-model="user.password"
                        :rules="[required]"
                        :type="visiblePassword ? 'text' : 'password'"
                        label="Senha *"
                        lazy-rules
                        outlined
                        dense
                        hide-bottom-space
                      >
                        <template v-slot:append>
                          <q-btn
                            @click="visiblePassword = !visiblePassword"
                            :icon="visiblePassword ? 'visibility_off' : 'visibility'"
                            round
                            flat
                          >
                            <q-tooltip>
                              {{ visiblePassword ? 'Esconder senha' : 'Exibir senha'}}
                            </q-tooltip>
                          </q-btn>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-8 col-xs-10">
                      <q-btn type="submit" :disable="loading" label="Login" class="full-width" color="primary">
                        <q-inner-loading :showing="loading" />
                      </q-btn>
                    </div>
                    <div class="col-md-8 col-xs-10">
                      <q-btn
                        @click="mode = 'Register'"
                        label="Cadastro"
                        class="full-width"
                        color="primary"
                        outline
                        dense
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="q-py-md col-md-7 col-xs-12 col-sm-8 text-h6 text-primary">
              <q-btn
                class="q-ml-sm"
                @click="mode = 'Login'"
                icon="arrow_back"
                flat
                color="primary"
                round
              >
                <q-tooltip>Voltar</q-tooltip>
              </q-btn>
              Cadastro
              <div class="text-caption text-grey-8 q-px-md">
                Preencha os dados abaixo para prosseguir com o seu registro no sistema.
              </div>
              <q-form @submit="handleSignUp">
                <div class="row q-px-md q-col-gutter-md q-mt-xs">
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.email" 
                      :rules="[
                        required, validEmail
                      ]"
                      label="E-mail Institucional *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.name" 
                      :rules="[required]"
                      label="Nome *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.institutionalId" 
                      :rules="[required]"
                      label="Matrícula *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.telephone"
                      :rules="[required, validPhone]"
                      :mask="phoneMask(newUser.telephone)"
                      label="Telefone de Contato *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                      unmasked-value
                    />
                  </div>
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.password"
                      type="password"
                      :rules="[
                        required,
                        val => minLength(val, 8)
                      ]"
                      label="Senha *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-12">
                    <q-input 
                      v-model="newUser.password_confirmation"
                      type="password"
                      :rules="[
                        required,
                        val => sameAs(val, newUser.password)
                      ]"
                      label="Confirmação de Senha *"
                      lazy-rules
                      outlined
                      dense
                      hide-bottom-space
                    />
                  </div>
                  <div class="col-12">
                    <q-btn type="submit" :disable="loading" label="Cadastro" class="full-width" color="primary">
                      <q-inner-loading :showing="loading" />
                    </q-btn>
                  </div>
                </div>
              </q-form>
            </div>
          </template>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>

import { required, validEmail, validPhone, minLength, sameAs } from 'src/utils/rules'
import { phoneMask } from 'src/utils/masks'

const defaultUser = {
  email: '',
  name: '',
  institutionalId: '',
  telephone: '',
  password: '',
  password_confirmation: ''
}

export default {
  name: 'Login',
  data: () => ({
    required,
    validEmail,
    validPhone,
    minLength,
    sameAs,
    phoneMask,
    loading: false,
    visiblePassword: false,
    user: {
      email: "",
      password: ""
    },
    newUser: { ...defaultUser },
    mode: 'Login'
  }),
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        await this.$store.dispatch("auth/attemptLogin", this.user)
        this.$q.notify({
            type: "positive",
            message: "Login efetuado com sucesso"
        })
        return this.$router.push({ name: "Home" })
      }
      finally {
          this.loading = false
      }
    },
    async handleSignUp () {
      try {
        this.loading = true
        
        await this.$axios.post('register', this.newUser)
        
        this.$q.notify({
            type: "positive",
            message: "Cadastro realizado com sucesso. Uma mensagem de confirmação foi enviada para a sua caixa de e-mails."
        })

        this.newUser = { ...defaultUser }
        this.mode = 'Login'
      }
      finally {
          this.loading = false
      }
    }
  }
}
</script>
