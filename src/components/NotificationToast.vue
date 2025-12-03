<template>
  <div
    v-if="notifications.length > 0"
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] space-y-4 w-full max-w-md px-4"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="glass-card p-0 overflow-hidden animate-slide-down shadow-2xl border-l-4 border-primary-500"
    >
      <div class="p-4 flex items-start gap-4">
        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start">
            <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
              {{ notification.reminder.title }}
            </h4>
            <span class="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
              {{ formatTime(notification.reminder.time) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
            {{ notification.reminder.description || 'زمان یادآوری فرا رسیده است' }}
          </p>
        </div>
        <button
          @click="$emit('dismiss', notification.id)"
          class="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Progress bar for auto dismiss -->
      <div class="h-1 bg-gray-100 dark:bg-gray-700 w-full">
        <div class="h-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-progress origin-left"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  notifications: {
    type: Array,
    required: true
  }
})

defineEmits(['dismiss'])

const formatTime = (time) => {
  if (!time) return ''
  return time
}
</script>
