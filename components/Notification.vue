<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', payload: { email: string; phone: string }): void
}>();

const email = ref('');
const phone = ref('');
const accepted = ref(false);

const close = () => {
  emit('update:modelValue', false);
};

const submit = () => {
  emit('submit', {
    email: email.value,
    phone: phone.value
  });
  close();
};
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-start justify-center pt-20"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-[540px] max-w-[95vw] bg-white rounded-2xl shadow-xl px-8 py-6"
      @click.stop
    >
      <!-- Close -->
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        @click="close"
      >
        ✕
      </button>

      <!-- Image -->
      <div class="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/260x180"
          alt="notification"
          class="max-h-44 object-contain"
        />
      </div>

      <!-- Title -->
      <h2 class="text-xl font-semibold text-center text-gray-900 mb-2">
        แจ้งเตือนให้ทันทีเมื่อสินค้านี้พร้อมจำหน่าย
      </h2>

      <!-- Subtitle -->
      <p class="text-sm text-center text-gray-500 mb-6">
        กรอกอีเมลหรือเบอร์โทรของคุณ
        ระบบจะแจ้งเตือนให้ทันทีเมื่อสินค้านี้พร้อมจำหน่าย
      </p>

      <!-- Form -->
      <div class="space-y-4">
        <div>
          <label class="text-sm text-gray-600">อีเมล</label>
          <input
            v-model="email"
            type="email"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">เบอร์โทรศัพท์มือถือ</label>
          <input
            v-model="phone"
            type="tel"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="081-xxx-xxxx"
          />
        </div>

        <!-- Consent -->
        <label class="flex items-center gap-2 text-sm text-[#0D95DA]">
          <input type="checkbox" v-model="accepted" class="accent-[#0D95DA]" />
          ยอมรับการรับการแจ้งเตือน
        </label>
      </div>

      <!-- CTA -->
      <button
        class="w-full mt-6 py-3 rounded-full bg-[#0D95DA] hover:bg-[#0b86c4] text-white font-semibold disabled:opacity-50"
        :disabled="!accepted || (!email && !phone)"
        @click="submit"
      >
        ลงทะเบียนรับการแจ้งเตือน
      </button>
    </div>
  </div>
</template>
