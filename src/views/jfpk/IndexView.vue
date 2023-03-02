<template>
    <v-toolbar density="compact" color="transparent">
      <v-toolbar-title>Data Penilai External</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu transition="scale-transition" :close-on-content-click="false" :nudge-width="200">
        <template v-slot:activator="{ props }">
            <v-icon class="mr-3" v-bind="props">mdi-filter-outline</v-icon>
        </template>
        <v-list density="compact">
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="filters.onlyProgress" @change="changeProgress" color="purple"></v-switch> 
              <v-list-item-title> Tampilkan hanya di proses</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-action>
              <v-switch v-model="periodeSort" color="purple"></v-switch> 
              <v-list-item-title>Periode</v-list-item-title>
            </v-list-item-action>
          </v-list-item> -->
        </v-list>
      </v-menu>
  
    </v-toolbar>
    
    <section v-if="errored">
      <v-alert type="error">We're sorry, we're not able to retrieve this information at the moment, please try back later</v-alert>
    </section>
    
    <section v-else>
      <v-card
      :loading="loading"
      >
        <v-card-item v-if="!isMobile()">
          <!-- <v-divider></v-divider> -->
          <v-table class="mt-3">
            <thead>
              <tr>
                <th class="text-left"> Periode</th> 
                <th class="text-left"> Pegawai</th>
                <th class="text-left"> Satker</th>
                <th class="text-center"> Jum JFPK</th>
                <th class="text-center"> Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td class="text-center" colspan="5">Loading...</td>
              </tr>
              <tr v-else-if="dataJfpk.length == 0">
                <td class="text-center" colspan="5">Data tidak tersedia</td>
              </tr>
              <tr v-else
                v-for="jfpk in dataJfpk" :key="jfpk.id"
              >
                <td class="text-center">{{ jfpk.periode.tahun }}</td>
                <td>
                  <v-list-item :prepend-avatar="'https://sisdm.bpk.go.id/photo/' + jfpk.pegawai.nip + '.jpg'"
                    :title="jfpk.pegawai.nama"
                    :subtitle="jfpk.pegawai.nip"
                    class="px-0"
                    style="min-height: unset;"
                    >
                  </v-list-item>
                </td>
                <td>
                  {{ jfpk.pegawai.unit_org }}
                  <v-card-subtitle>{{ jfpk.pegawai.unit_org_induk }}</v-card-subtitle>
                </td>
                <td class="text-center">
                  <v-badge color="info" :content="jfpk.jfpk_total" inline></v-badge>
                </td>
                <td class="text-center">
                  <v-chip class="ma-2" color="secondary" size="small"><small>{{ (jfpk.status) ? jfpk.status.Nama : 'Pengisian' }}</small></v-chip>
                </td>
                <td>
                <router-link :to="'/data/' + jfpk.id" class="custom-link">
                    <v-btn size="x-small" color="info" icon="mdi-check-all"> </v-btn>
                    <v-tooltip activator="parent" location="top">Klik untuk Nilai</v-tooltip>
                </router-link>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>
        <v-card-item v-else>
          <v-list lines="three" v-for="jfpk in dataJfpk" :key="jfpk.id">
            <v-chip size="small" color="info" class="mb-1">Tahun {{ jfpk.periode.tahun }}</v-chip>
            <v-list-item :prepend-avatar="'https://sisdm.bpk.go.id/photo/' + jfpk.pegawai.nip + '.jpg'"
              :title="jfpk.pegawai.nip + '/' + jfpk.pegawai.nama"
              :subtitle="jfpk.pegawai.unit_org_induk"
              style="font-size: 14px !important; min-height: unset;"
              >
            </v-list-item>
            <v-card-text class="py-0">
              <v-chip-group
                v-model="selection"
                selected-class="text-deep-purple-accent-4"
                mandatory
              >
                <v-chip size="small" color="info">{{ jfpk.jfpk_total }} Jumlah Aktivitas</v-chip>
                <v-chip size="small" color="secondary">{{ (jfpk.status) ? jfpk.status.Nama : 'Pengisian' }}</v-chip>
              </v-chip-group>
            </v-card-text>
  
            <v-card-actions class="mb-4">
              <v-btn block size="small" variant="outlined" color="info" prepend-icon="mdi-message-text">
                Detail
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-list>
  
        </v-card-item>        
      </v-card>
  
    </section>
  
  </template>
  
  <script>
  
    export default {
      name: 'App',
      data() {
        return {
          index: [],
          dataJfpk: [],
          loading: true,
          errored: false,
          dataIndex: [],
          filters:{
            onlyProgress : true,
          },
          q: null,
          config : {
            headers:{
              Authorization: 'Bearer ' + this.$store.state.auth.user.accessToken,
            }
          },
        }
      },
      computed: {
        // currentUser() {
        //   return this.$store.state.auth.user.user;
        // }
      },
      mounted() {
        this.getIndex();
      },
      // computed: {
      //   console.log('a');
      // },
      methods: {
        changeProgress: function() {
          if(!this.filters.onlyProgress)
            this.filters.onlyProgress = ''
          this.getIndex()
        },
        getIndex: function() {
          this.loading = true
          this.axios.get('jfpk/penilai-data?progress=' + this.filters.onlyProgress, this.config)
          .then((response) => {
            this.dataJfpk = response.data.data;
          })
          .catch(error => {
            this.loading = true
            this.errorNotif(error)
          })
          .finally(
            () => this.loading = false
          )
        },
      }
    }
  </script>
  
  <style>
    .v-list-item-title {
      font-size: 14px !important;
    }
  </style>
  