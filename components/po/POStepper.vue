<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { usePOFlow } from '@/composables/po/usePOFlow';
const { currentStep, steps } = usePOFlow();
</script>

<template>
    <nav class="flex items-center justify-center gap-4 py-2 px-4 bg-transparent rounded-xl">
        <template v-for="(step, index) in steps" :key="step.id">
            <div class="flex items-center gap-2 transition-all duration-300">
                <div 
                    class="w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all" 
                    :class="[
                        currentStep >= step.id
                            ? 'border-[#0D95DA] bg-[#0D95DA] text-white'
                            : 'border-slate-200 text-slate-300'
                    ]"
                >
                    <Icon :icon="currentStep > step.id ? 'mdi:check' : step.icon" class="w-3.5 h-3.5" />
                </div>

                <span 
                    class="text-xs  tracking-tighter transition-colors whitespace-nowrap"
                    :class="currentStep >= step.id ? 'text-[#0D95DA]' : 'text-slate-400'"
                >
                    {{ step.label }}
                </span>
            </div>

            <div 
                v-if="index < steps.length - 1" 
                class="h-0.5 w-10 rounded-full transition-colors duration-500"
                :class="currentStep > step.id ? 'bg-[#0D95DA]' : 'bg-slate-300'"
            />
        </template>
    </nav>
</template>