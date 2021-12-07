<template>
  <b-container class="mt-5">
    <div class="posts m10">
      <b-container class="bv-example-row">
        <b-row class="mt-5">
          <b-col>
            <b-card title="Pengguna">
              <b-table striped hover :items="users"></b-table>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
import UsersService from '../services/UsersServices'
export default {
  data () {
    return {
      users: []
    }
  },
  beforeCreate: function () {
  },
  filters: {
  },
  methods: {
    getUsers: async function () {
      try {
        const response = await UsersService.getUsers()
        this.users = response.data.data
      } catch (error) {
        this.users = []
      }
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
