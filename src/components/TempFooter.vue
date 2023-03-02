<template>
  
  <v-footer padless style="flex: unset;">
    <v-col
      class="text-center"
      cols="12"
    >
      &copy;{{ new Date().getFullYear() }} — <strong>SISDM Jfpk</strong>
    </v-col>
  </v-footer>

  <v-bottom-navigation >
    <v-btn value="home">
      <v-icon>mdi-home</v-icon>
      Home
    </v-btn>

    <v-btn value="transaction">
      <v-icon>mdi-receipt-text</v-icon>
      Transaksi
    </v-btn>

    <v-btn value="keranjang">
      <v-icon>mdi-cart</v-icon>
      Keranjang
    </v-btn>
    <v-btn value="profile">
      <v-icon>mdi-account</v-icon>
      Profile
    </v-btn>
    
</v-bottom-navigation>
</template>