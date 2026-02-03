<script setup lang="ts">
import type { News } from '~/types/news';
defineProps<{
newsList: News[];
}>();
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center">
        <div 
        v-for="news in newsList" :key="news.id" 
            class="border border-slate-200 rounded-xl hover:shadow-lg hover:shadow-blue-400 hover:scale-105 transition-all p-3 flex flex-col" 
        >
            <a :href="news.link" target="_blank" rel="noopener noreferrer" class="flex flex-col h-full">
                <img
                :src="news.image" :alt="news.alt" 
                    class="w-full h-48 object-cover rounded-xl shrink-0 mb-4">
                
                <div class="flex flex-col flex-1">
                    <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{{ news.title }}</h3>
                    <p class="text-sm text-slate-600 mb-2 line-clamp-2 flex-1">{{ news.description }}</p>
                    <span class="text-xs text-slate-400 mt-auto">{{ news.date }}</span>
                </div>
            </a>
        </div>
    </div>
</template>