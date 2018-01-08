<template lang="html">
  <el-form status-icon :model="song" :rules="rules" ref="song" label-width="120px">
    <el-form-item prop="title" label="Title">
      <el-input placeholder=":Title" v-model="song.title"></el-input>
    </el-form-item>
    <el-form-item prop="artist" label="Artist">
      <el-input placeholder=":Artist" v-model="song.artist"></el-input>
    </el-form-item>
    <el-form-item prop="album" label="Album">
      <el-input placeholder=":Album" v-model="song.album"></el-input>
    </el-form-item>
    <el-form-item prop="genre" label="Genre">
      <el-input placeholder=":Genre" v-model="song.genre"></el-input>
    </el-form-item>
    <el-form-item prop="albumImageUrl" label="Album Art">
      <el-input placeholder=":Album Art URL" v-model="song.albumImageUrl"></el-input>
    </el-form-item>
    <el-form-item prop="youtubeId" label="Youtube ID">
      <el-input placeholder=":YouTube ID" v-model="song.youtubeId"></el-input>
    </el-form-item>
    <el-form-item prop="lyrics" label="Lyrics">
      <el-input placeholder=":Lyrics" type="textarea" v-model="song.lyrics"></el-input>
    </el-form-item>
    <el-form-item prop="tabs" label="Tabs">
      <el-input placeholder=":Tabs" type="textarea" v-model="song.tabs"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button @click="edit" type="primary">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SongsServices from '@/services/SongsServices'

export default {
  data () {
    return {
      rules: {
        title: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        artist: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        genre: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        album: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        albumImageUrl: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        youtubeId: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        lyrics: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ],
        tabs: [
          { required: true, message: 'This field is required.', trigger: 'blur' }
        ]
      }
    }
  },
  asyncData: {
    song () {
      return SongsServices.get(this.$store.state.route.params.id)
        .then(res => {
          document.title = `Edit: ${res.data.title}`
          return res.data
        })
    },
    songDefault: {}
  },
  methods: {
    edit () {
      this.$refs.song.validate()
        .then(() => {
          SongsServices.put(this.song)
            .then(() =>
              this.$router.go(-1))
        })
        .catch(console.error)
    }
  }
}
</script>

<style lang="css" scoped>
  .el-input, .el-textarea {
    /* margin-bottom: 10px !important; */
  }
</style>
