<template>
  <header class="glass-card p-6 mb-8 animate-fade-in">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gradient mb-2">تقویم من</h1>
<!--          <p class="text-xl text-gray-600 dark:text-gray-400">{{ currentDateString }}</p>-->
        </div>
      </div>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import moment from 'moment-jalaali'
import ThemeToggle from './ThemeToggle.vue'
import { JALALI_MONTHS } from '../utils/constants'

const currentDateString = computed(() => {
  const now = moment()
  return `${now.jDate()} ${JALALI_MONTHS[now.jMonth()]} ${now.jYear()}`
})
</script>
