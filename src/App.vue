<template>
  <v-app>
    <router-view />

    <v-dialog v-model="$store.state.ui.loading" max-width="250px" persistent>
      <v-card>
        <v-card-text>
          <v-layout>
            <v-flex xs3 class="loading-icon">
              <v-progress-circular indeterminate color="primary" :size="50"></v-progress-circular>
            </v-flex>
            <v-flex
              xs9
              class="loading-text"
              v-text="$t('common.nowLoading')"
            ></v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="$store.state.ui.dialog" max-width="350px" persistent>
      <v-card>
        <v-card-title class="headline">{{ $t($store.state.ui.dialogTitle) }}</v-card-title>
        <v-card-text>
          <div
            v-html="$t($store.state.ui.dialogText)"
          ></div>
          <div
            v-html="$store.state.ui.dialogMore"
          ></div>
        </v-card-text>
        <v-card-actions
          v-if="$store.state.ui.dialogMode === 'info'"
        >
          <v-spacer />
          <v-btn
            @click="$store.commit('ui/CLOSE_DIALOG')"
            flat
            v-text="$t('dialog.OK')"
          ></v-btn>
        </v-card-actions>
        <v-card-actions
          v-if="$store.state.ui.dialogMode === 'request'"
        >
          <v-spacer />
          <v-btn
            @click="$bus.$emit('dialog-return', 'No'), $store.commit('ui/CLOSE_DIALOG')"
            flat
            v-text="$t('dialog.No')"
          ></v-btn>
          <v-btn
            @click="$bus.$emit('dialog-return', 'Yes'), $store.commit('ui/CLOSE_DIALOG')"
            flat
            v-text="$t('dialog.Yes')"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      :timeout="6000"
      bottom
      :value="$store.state.ui.snackbar"
    >
      {{ $store.state.ui.snackbarText }}
      <v-btn flat dark @click.native="$store.commit('ui/CLOSE_SNACKBAR')">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);

* {
  font-family: -apple-system, 'Microsoft JhengHei', BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
}

.headline {
  width: 100%;
}

.home .logo {
  margin-top: 16px;
  background-image: url('/static/img/logo.svg');
  width: 100%;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.choose .layout {
  margin-left: 0;
  margin-right: 0;
}

.choose .list {
  width: 100%;
}

.choose .card__text {
  padding-right: 0;
  padding-left: 0;
}

.choose h5 {
  padding: 14px;
  padding-bottom: 2px;
  margin-bottom: 5px;
  font-size: 20px;
}

.choose .subheader {
  padding: 14px;
  padding-top: 2px;
}

.round .bg-box {
  height: 140px;
}

.round .tabs__bar {
  height: 45px;
}

.round .tabs__items {
  margin-bottom: 80px;
}

.round .layout {
  margin-left: 0;
  margin-right: 0;
}

.dialog .btn--floating {
  position: fixed !important;
}

.dialog .floating-right-bottom {
  position: fixed;
  right: 8px;
  bottom: 8px;
}

.dialog .floating-right-bottom-secondary {
  position: fixed;
  right: 16px;
  bottom: 78px;
}

.inline-dialog .activator {
  margin: 0;
}

label {
  left: 0 !important;
}

.wrap-info .title {
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px !important;
  margin-bottom: 0;
}

.wrap-info .result {
  font-size: 20px;
}
</style>
