<template>
    <v-app-bar 
      app
      color="white"
      style="box-shadow: none !important;"
    >
      <div class="v-toolbar__prepend" v-if="!isMobile()">
        <v-img src="@/assets/img/logo1.png" cover class="text-white img-left-login" style="width: 180px;"></v-img>
      </div>
      <div v-else>
        <v-container class="mr-0 pl-1">
          <v-text-field
            dense="compact"
            append-inner-icon="mdi-magnify"
            variant="outlined"
            style="min-width: 180px; height: 45px;"
            height="15"
            placeholder="Cari Office 2019"
            color="grey"
          ></v-text-field>
        </v-container>
      </div>

      <v-container class="mr-0" v-if="!isMobile()">
        <v-text-field
          dense="compact"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          style="min-width: 500px; height: 45px;"
          height="10"
          placeholder="Cari Office 2019"
          color="grey"
        ></v-text-field>
      </v-container>
      <div class="v-toolbar__append" v-if="this.user">
          
          <div v-if="!isMobile()">
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-btn icon class="mr-4">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon class=""> 
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </div>

          <v-divider vertical class="mr-4"></v-divider>
          <v-menu
              transition="scale-transition"
            >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                size="small" @click.stop="drawer = !drawer"
              >
                <v-avatar color="white" size="small" v-if="this.user">
                  <span class="text-h7">{{ (this.user) ? this.user.name.charAt(0).toUpperCase() : '' }}</span>
                </v-avatar>
                <v-avatar color="" v-else>
                  <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="pa-2">
                <v-list>
                  <v-list-item
                    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
                    :title="(this.user) ? this.user.name : ''"
                    :subtitle="(this.user) ? this.user.email : ''"
                  >
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list :lines="false" density="compact" nav>
                  <router-link to="/profile" class="decoration-none">
                    <v-list-item active-color="primary" class="v-list-item-hover">
                      <template v-slot:prepend>
                        <v-icon icon="mdi-account"></v-icon>
                      </template>
                      <v-list-item-title v-text="'Profile'"></v-list-item-title>
                    </v-list-item>
                  </router-link>
                  <v-list-item active-color="primary" class="cursor-pointer v-list-item-hover" @click.prevent="logOut">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-lock"></v-icon>
                    </template>
                    <v-list-item-title v-text="'Logout'"></v-list-item-title>
                  </v-list-item>
                </v-list>

              </v-card-text>
            </v-card>
          </v-menu>
        </div>
        <div class="v-toolbar__append" v-else>
          <v-btn icon class="mr-1">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn variant="outlined" color="error" size="small" class="mr-2 ml-4 mt-2">Masuk</v-btn>
          <v-btn variant="flat" color="error" size="small" class="mt-2"> Daftar</v-btn>
        </div>
    </v-app-bar>

    <v-system-bar height="25" v-if="!isMobile()">
      <v-container class="text-left mb-2 pl-1">
        <v-btn variant="flat" size="small" class="mr-1">Office 2019</v-btn>
        <v-btn variant="flat" size="small" class="mr-1">Windows 10</v-btn>
        <v-btn variant="flat" size="small" class="mr-1">Adobe Photoshop</v-btn>
        <v-btn variant="flat" size="small" class="mr-1">Canva Premium</v-btn>
        <v-btn variant="flat" size="small" class="mr-1">Chip Domino</v-btn>
        <v-btn variant="flat" size="small" class="mr-1">Office 365</v-btn>
      </v-container>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="bottom"
      style="height: 100vh; z-index: 1111;"
    >
      <v-app-bar density="compact" :elevation="0" style="top:0 !important">
        <template v-slot:prepend>
          <v-btn icon="mdi-close"></v-btn>
        </template>
        <v-app-bar-title class="text-left">Menu Utama</v-app-bar-title>
      </v-app-bar>

      <v-list-item class="mt-5" prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider" subtitle="tttt"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav class="text-left">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>
      
    </v-navigation-drawer>
</template>


<script>

export default {
    data() {
        return {
            qg: '',
            drawer: null,
            user: {
              name : 'jajang',
              email : 'tt'

            },
        }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {
      this.isMobile();
      if (this.$store.state.auth.user) 
        this.user = this.$store.state.auth.user.user;
    },
    computed: {
      // currentUser() {
      //   return this.$store.state.auth.user;
      // }
    }
    
}
</script>
