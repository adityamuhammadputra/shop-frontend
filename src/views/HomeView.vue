<template>
  <section>
    <v-slide-group v-model="slideGroup" selected-class="bg-success" show-arrows center-active>
      <v-slide-group-item v-for="n in 5" :key="n" >
        <v-img :src="'/img/slide/'+n+'.jpg'" cover width="720" class="mr-2"></v-img>
      </v-slide-group-item>
    </v-slide-group>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      slideGroup: 0,
      user: {
        name: '',
        email: '',
        password: '',
        comfirmPassword: '',
      },
      penilaian: '',
    }
  },
  created() {
    this.interval = setInterval(
      () => {
        this.slideGroup++
        if (this.slideGroup == 5) {
          this.slideGroup = 0
        }
      }, 4000
    )
  },
  mounted() {
    // this.user = this.userLogin();
    // this.getIndex();
  },
  methods: {
    // getIndex: function() {
    //     this.loading = true
    //     this.axios.get('jfpk/penilai', this.config)
    //     .then((response) => {
    //       this.penilaian = response.data.statistik
    //     })
    //     .catch(error => {
    //         this.errorNotif(error)
    //     })
    //     .finally(
    //         () => this.loading = false
    //     )
    // },
  }
}
</script>
