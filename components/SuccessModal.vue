<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[60] flex items-center justify-center"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-[600px] max-w-[95vw] bg-white rounded-3xl shadow-2xl px-10 py-8 text-center"
      @click.stop
    >
      <!-- Close -->
      <button
        class="absolute top-5 right-6 text-gray-400 hover:text-gray-600 text-2xl"
        @click="close"
      >
        ✕
      </button>

      <!-- Image 
      <div class="flex justify-center mb-6">
        <img
          src="/success-image.png"
          alt="success"
          class="max-h-60 object-contain"
        />
      </div> -->

      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        ลงทะเบียนรับการแจ้งเตือนเรียบร้อย
      </h2>

      <!-- Subtitle -->
      <p class="text-gray-500 mb-8">
        ระบบจะแจ้งเตือนให้ทันทีตามข้อมูลที่ได้ระบุไว้
      </p>

      <!-- Button -->
      <button
        class="w-full py-4 rounded-full bg-[#0D95DA] hover:bg-[#0b86c4] text-white font-semibold text-lg"
        @click="close"
      >
        รับทราบ
      </button>
    </div>
  </div>
</template>
