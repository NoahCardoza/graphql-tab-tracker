<template lang="html">
  <div>
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
        <el-button @click="create" type="primary">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SongsServices from '@/services/SongsServices'

export default {
  data () {
    return {
      song: {
        title: '',
        artist: '',
        genre: '',
        album: '',
        albumImageUrl: '',
        youtubeId: '',
        lyrics: '',
        tabs: ''
      },
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
  methods: {
    create () {
      this.$refs.song.validate()
        .then(() => {
          SongsServices.post(this.song)
            .then(res =>
              this.$router.push(`/songs/${res.data.id}`))
        })
        .catch(console.error)
    }
  }
}
</script>

<style lang="css" scoped>

</style>
