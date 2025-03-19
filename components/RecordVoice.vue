<template>
  <div>
    <div>
      <div ref="containerRef"></div>
    </div>
    <p>{{ currentTime }}</p>
    <button v-if="showAudioRecordButton" @click="startAudioRecordHandler">
      Start Recording
    </button>
    <div v-else>
      <button @click="pauseRecording" class="block">
        {{ isPauseResume ? 'pause' : 'resume' }}
      </button>
      <button @click="stopHandler">Stop</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useWaveSurferRecorder } from '@meersagor/wavesurfer-vue'

export default {
  setup () {
    const showAudioRecordButton = ref(true)
    const containerRef = ref(null)

    const options = computed(() => ({
      height: 48,
      waveColor: '#66667D',
      progressColor: '#6A24FF',
      barGap: 5,
      barWidth: 5,
      barRadius: 8,
      cursorWidth: 0
    }))

    const {
      pauseRecording,
      startRecording,
      stopRecording,
      currentTime,
      isPauseResume
    } = useWaveSurferRecorder({
      containerRef,
      options: options.value,
      recordPluginOptions: {
        continuousWaveform: true
      }
    })

    const startAudioRecordHandler = () => {
      startRecording()
      showAudioRecordButton.value = false
    }

    const stopHandler = async () => {
      // دریافت blob (فایل صوتی)
      const blob = await stopRecording()

      const file = new File([blob], 'recording.wav', { type: 'audio/wav' })

      // ایجاد فرم دیتا برای ارسال فایل به سرور
      const formData = new FormData()
      formData.append('file', file)

      // ارسال به سرور با استفاده از fetch
      const response = await $fetch('/api/voice/uploadVoice', {
        method: 'POST',
        body: formData
      })

      console.log(response)
    }

    return {
      showAudioRecordButton,
      containerRef,
      currentTime,
      startAudioRecordHandler,
      pauseRecording,
      stopHandler,
      isPauseResume
    }
  }
}
</script>
