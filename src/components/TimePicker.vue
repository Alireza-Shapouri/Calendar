<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none flex items-center justify-between transition-all"
      type="button"
    >
      <span class="font-mono text-lg">{{ modelValue || '00:00' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 animate-scale-in"
    >
      <div class="flex gap-2 h-48">
        <!-- Hours -->
        <div class="flex-1 overflow-y-auto scrollbar-hide">
          <div class="text-center text-xs text-gray-500 mb-1">ساعت</div>
          <div class="space-y-1">
            <button
              v-for="h in hours"
              :key="h"
              @click="selectHour(h)"
              :class="[
                'w-full py-1 rounded-md text-sm font-medium transition-colors',
                selectedHour === h
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              {{ h }}
            </button>
          </div>
        </div>

        <!-- Separator -->
        <div class="flex items-center justify-center text-gray-400 font-bold">:</div>

        <!-- Minutes -->
        <div class="flex-1 overflow-y-auto scrollbar-hide">
          <div class="text-center text-xs text-gray-500 mb-1">دقیقه</div>
          <div class="space-y-1">
            <button
              v-for="m in minutes"
              :key="m"
              @click="selectMinute(m)"
              :class="[
                'w-full py-1 rounded-md text-sm font-medium transition-colors',
                selectedMinute === m
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              {{ m }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop to close -->
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40 bg-transparent"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '12:00'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')) // All minutes

const selectedHour = computed(() => props.modelValue?.split(':')[0] || '12')
const selectedMinute = computed(() => props.modelValue?.split(':')[1] || '00')

const selectHour = (h) => {
  emit('update:modelValue', `${h}:${selectedMinute.value}`)
}

const selectMinute = (m) => {
  emit('update:modelValue', `${selectedHour.value}:${m}`)
  isOpen.value = false
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
