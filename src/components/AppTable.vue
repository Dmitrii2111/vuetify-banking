<template>

    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="phone"
        class="elevation-1"
        :loading="loading"
        :search="search"
        loading-text="Загрузка заявок"
        :footer-props="{
          itemsPerPageAllText: 'Все',
          itemsPerPageOptions: [5, 10, -1],
          itemsPerPageText: 'Показывать по '
        }"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="yellow accent-3"
                  class="mb-2 text--black"
                  v-bind="attrs"
                  v-on="on"
              >
                Новая заявка
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="36"
                        sm="18"
                        md="10"
                    >
                      <v-text-field
                          v-model="editedItem.name"
                          label="ФИО"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                        cols="36"
                        sm="18"
                        md="10"
                    >
                      <v-text-field
                          v-model="editedItem.phone"
                          label="Телефон"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                        cols="18"
                        sm="8"
                        md="6"
                    >
                      <v-text-field
                          v-model="editedItem.amount"
                          label="Сумма"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="18"
                        sm="8"
                        md="6"
                    >
                      <v-select
                          v-model="editedItem.status"
                          label="Статус"
                          :items="statusData"
                          item-text="text"
                          item-value="value"
                          return-object
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Отмена
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="700px">
            <v-card >
              <v-card-title class="text-h6 justify-center">Вы уверены что хотите удалить заявку?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">ДА</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-row >
          <v-col
          cols="3"
          >
            <v-text-field
                class="ml-4 pa-0"
                v-model="search"
                clearable
                label="Поиск"
                single-line
                hide-details
            ></v-text-field>
          </v-col>
          <v-col
          cols="3">
            <v-select
                v-model="enable"
                :items="statusData"
                class="pa-0"
                clearable
                label="Статус"
            ></v-select>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <span>Заявок нет</span> <br>
        <v-btn
            color="yellow accent-3"
            @click="initialize"
            class="ma-2"
        >
          Обновить данные
        </v-btn>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
            :color="getColor(item.status.value)"
        >
          {{item.status.text}}
        </v-chip>
      </template>
      <template v-slot:item.amount="{ item }">
        {{currency(item.amount)}}
      </template>
    </v-data-table>
</template>

<script>
import {currency} from "@/utils/currency";

export default {
  props: ['title'],
  data: () => ({
    currency,
    enable: null,
    search: '',
    loading: false,
    statusData: [
      {value: 'active', text: 'Активна'},
      {value: 'done', text: 'Завершена'},
      {value: 'canceled', text: 'Отменена'},
      {value: 'processing', text: 'В работе'}
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ФИО',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Телефон', value: 'phone' },
      { text: 'Сумма', value: 'amount' },
      { text: 'Статус', value: 'status', sortable: false },
      { text: 'Действия', value: 'actions', sortable: false}
    ],
    users: [],
    filter: {},
    editedIndex: -1,
    editedItem: {
      name: '',
      phone: '',
      amount: null,
      status: {value: '', text: ''},
      id: ''
    },
    defaultItem: {
      name: '',
      phone: '',
      amount: null,
      status: {value: '', text: ''},
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Новая заявка' : 'Редактировать заявку'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    enable(value) {
      if(value) {
        this.initialize(true, value)
      } else {
        this.initialize(false, value)
      }

    }
  },

  created () {
    this.initialize()
    document.title = `${this.title} | Tinkoff`
  },
  methods: {
    getColor(value) {
      switch (value) {
        case 'active': return 'green'
          break
        case 'done': return 'green'
          break
        case 'canceled': return 'red'
        break
        case 'processing': return 'orange'
        break
        default: return 'yellow'
      }
    },
    async initialize (filter, value) {
      this.loading = true
      if(filter) {
        const data = await this.$store.dispatch('request/load')
        this.users = data.filter(user => user.status.value === value)
      } else {
        const data = await this.$store.dispatch('request/load')
        this.users = data
      }
      this.loading = false
    },

    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      await this.$store.dispatch('request/remove', this.editedItem.id)
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      if(!this.editedItem.id) {
        await this.$store.dispatch('request/create', this.editedItem)
        await this.initialize(false)
      } else {
        await this.$store.dispatch('request/update', this.editedItem)
      }
      await this.close()
    },
  },
}
</script>


<style scoped>

</style>
