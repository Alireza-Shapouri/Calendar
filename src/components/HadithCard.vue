<template>
  <div class="glass-card p-6 animate-scale-in">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        حدیث روز
      </h3>
      <button
        @click="refreshHadith"
        class="text-primary-600 dark:text-primary-400 hover:rotate-180 transition-transform duration-500"
        title="حدیث دیگر"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <div v-if="currentHadith" class="space-y-4">
      <!-- Arabic Text -->
      <div class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-2xl border-2 border-primary-200 dark:border-primary-800">
        <p class="text-right text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-4" dir="rtl">
          {{ currentHadith.text }}
        </p>
        
        <!-- Translation -->
        <div class="border-t-2 border-primary-200 dark:border-primary-700 pt-4">
          <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300" dir="rtl">
            {{ currentHadith.translation }}
          </p>
        </div>
      </div>

      <!-- Source -->
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="font-semibold">{{ currentHadith.narrator }}</span>
        </div>
        <div class="text-gray-500 dark:text-gray-400">
          {{ currentHadith.source }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHadith } from '../composables/useHadith'

const { currentHadith, getHadithOfDay, getRandomHadith } = useHadith()

onMounted(() => {
  getHadithOfDay()
})

const refreshHadith = () => {
  getRandomHadith()
}
</script>

<style scoped>
.font-arabic {
  font-family: 'Traditional Arabic', 'Amiri', 'Scheherazade', serif;
  font-size: 1.1rem;
  line-height: 2;
}
</style>
