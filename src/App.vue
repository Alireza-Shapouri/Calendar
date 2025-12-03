<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <Header />
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendar View (2 columns on large screens) -->
        <div class="lg:col-span-2">
          <CalendarView />
        </div>

        <!-- Side Panel (1 column on large screens) -->
        <div class="space-y-6">
          <DateConverter :selected-date="selectedDate" />
          <ReminderPanel :selected-date="selectedDate" />
        </div>
      </div>

      <!-- Notifications -->
      <NotificationToast
        :notifications="notifications"
        @dismiss="dismissNotification"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Header from './components/Header.vue'
import CalendarView from './components/CalendarView.vue'
import DateConverter from './components/DateConverter.vue'
import ReminderPanel from './components/ReminderPanel.vue'
import NotificationToast from './components/NotificationToast.vue'
import { useCalendar } from './composables/useCalendar'
import { useReminders } from './composables/useReminders'
import { useTheme } from './composables/useTheme'

// Initialize composables
const { selectedDate } = useCalendar()
const { notifications, dismissNotification, startReminderCheck, stopReminderCheck } = useReminders()
useTheme()

onMounted(() => {
  startReminderCheck()
})

onUnmounted(() => {
  stopReminderCheck()
})
</script>

