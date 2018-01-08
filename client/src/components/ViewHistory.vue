<template lang="html">
  <div class="bookmarks">
    <song v-for="song in history" :song="song" :key="song.id"/>
  </div>
</template>

<script>
import HistoryServices from '@/services/HistoryServices'
import Song from './Song'

export default {
  components: {
    Song
  },
  asyncData: {
    history () {
      return HistoryServices.index()
    }
  }
}
</script>

<style lang="css" scoped>
  .el-header {
    line-height: 60px;
  }
</style>
