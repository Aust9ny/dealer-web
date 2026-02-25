<script setup lang="ts">
import type { News } from '~/types/news';
defineProps<{
newsList: News[];
}>();
</script>
<template>
    <div class="flex justify-between items-center mx-14 mb-4">
        
        <h1 class="text-2xl font-bold text-slate-800">
            ข่าวสารและกิจกรรม
        </h1>
        <NuxtLink to="https://www.advice.co.th/article/activity-promotion" external target="_blank">
            <button 
            class="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl  border border-slate-400 hover:border-[#2196F3] active:scale-95 transition-all" 
            href='https://www.advice.co.th/article/activity-promotion'>
                <span class="inline-block duration-200 text-lg origin-center" >ดูบทความทั้งหมด</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </NuxtLink>
        
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center mx-10">
        <div 
        v-for="news in newsList" :key="news.id" 
            class="border border-slate-300 rounded-xl hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all p-2 flex flex-col " 
        >
            <a :href="news.link" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full">
                <NuxtImg
                    :src="news.image" :alt="news.alt" 
                    class="w-full h-48 object-cover rounded-xl shrink-0 mb-4"
                />
                
                <div class="flex flex-col flex-1">
                    <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{{ news.title }}</h3>
                    <p class="text-sm text-slate-600 mb-2 line-clamp-2 flex-1">{{ news.description }}</p>
                    <span class="text-xs text-slate-400 mt-auto">{{ news.date }}</span>
                </div>
            </a>
        </div>
    </div>
</template>