<template lang="html">
  <div>
    <h1>{{song.title}}</h1>
    <el-tabs>
      <el-tab-pane label="Song Metadata">
        <h3>{{song.title}} - {{song.album}}</h3>
        <h5>{{song.artist}}</h5>
        <img :src="song.albumImageUrl" :alt="song.album">
        <h6>{{song.genre}}</h6>
        <router-link to="edit" append>
          <el-button to="edit">Edit</el-button>
        </router-link>
        <el-button v-if='$store.state.isLoggedIn' @click="toggleBookmark">{{bookmarkButton}}</el-button>
      </el-tab-pane>
      <el-tab-pane label="Video">
        <youtube
            player-width="100%"
            player-height="500px"
            :video-id="song.youtubeId"/>
      </el-tab-pane>
      <el-tab-pane label="Lyrics">
        <div class="nowrap">
          <pre>{{song.lyrics}}</pre>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Tabs">
        <div class="nowrap">
          <pre>{{song.tabs}}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Vue from 'vue'
  import SongsServices from '@/services/SongsServices'
  import BookmarksServices from '@/services/BookmarksServices'
  import VueYouTubeEmbed from 'vue-youtube-embed'

  Vue.use(VueYouTubeEmbed)

  export default {
    asyncData: {
      song () {
        return SongsServices.get(this.$store.state.route.params.id)
          .then(res => {
            document.title = `View: ${res.data.title}`
            return res.data
          })
          .catch(console.error)
      },
      songDefault: {}
    },
    computed: {
      bookmarkButton () {
        return this.song.bookmarked ? 'Unbookmark' : 'Bookmark'
      }
    },
    methods: {
      toggleBookmark () {
        BookmarksServices[this.song.bookmarked ? 'delete' : 'create'](this.song.id)
        .then(() => {
          this.song.bookmarked = !this.song.bookmarked
        })
        .catch(console.error)
      }
    }
  }
</script>

<style lang="css" scoped>
  .nowrap {
    height: auto;
    overflow: auto;
  }

  img {
    max-width: 50%;
  }
</style>
