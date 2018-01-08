<template lang="html">
  <div class="bookmarks">
    <song v-for="song in bookmarks" :song="song" :key="song.id"/>
  </div>
</template>

<script>
import BookmarksServices from '@/services/BookmarksServices'
import Song from './Song'

export default {
  components: {
    Song
  },
  asyncData: {
    bookmarks () {
      return BookmarksServices.index()
    }
  }
}
</script>

<style lang="css" scoped>
  .el-header {
    line-height: 60px;
  }
</style>
