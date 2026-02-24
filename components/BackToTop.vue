<template>
    <Transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-10 opacity-0 scale-90" enter-to-class="translate-y-0 opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in" leave-from-class="translate-y-0 opacity-100 scale-100"
        leave-to-class="translate-y-10 opacity-0 scale-90">
        <div v-show="isVisible" class="fixed bottom-35 right-6 z-100 group">
            <svg class="absolute -top-1 -left-1 w-14.5 h-14.5 -rotate-90 pointer-events-none">
                <circle 
                    cx="29" cy="29" r="26" stroke="currentColor" stroke-width="3" fill="transparent"
                    class="text-slate-100" />
                <circle 
                    cx="29" cy="29" r="26" stroke="currentColor" stroke-width="3" fill="transparent"
                    class="text-[#0D95DA] transition-all duration-150 ease-out" :style="{
                        strokeDasharray: '163.36',
                        strokeDashoffset: strokeDashoffset,
                    }" />
            </svg>

            <button
                class="relative w-12.5 h-12.5 bg-white border border-slate-200 shadow-xl rounded-full flex items-center justify-center text-[#0D95DA] hover:bg-blue-50 active:scale-90 transition-all duration-300 overflow-hidden"
                aria-label="Back to top" @click="scrollToTop">
                <Icon 
                    icon="heroicons:arrow-up-20-solid"
                    class="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300 text-primary font-black" />
            </button>
        </div>
    </Transition>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const isVisible = ref(false);
const strokeDashoffset = ref(163.36); // เส้นรอบวง (2 * PI * r) โดย r=26

const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // แสดงปุ่มเมื่อเลื่อนเกิน 300px
    isVisible.value = scrollTop > 300;

    // คำนวณ Progress (0 - 163.36)
    if (docHeight > 0) {
        const progress = scrollTop / docHeight;
        const offset = 163.36 - progress * 163.36;
        strokeDashoffset.value = offset;
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ทำให้ SVG สมูทเวลาเปลี่ยนค่า offset */
circle {
    transition: stroke-dashoffset 0.1s linear;
}
</style>
