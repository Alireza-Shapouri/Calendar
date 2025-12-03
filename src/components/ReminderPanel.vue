<template>
  <div class="glass-card p-6 animate-scale-in">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        یادآورها
      </h3>
      <button
        @click="testNotification"
        class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="تست اعلان"
      >
        تست هشدار
      </button>
    </div>

    <!-- Reminders List -->
    <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
      <div
        v-if="dateReminders.length === 0"
        class="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-sm">یادآوری برای این تاریخ وجود ندارد</p>
      </div>

      <div
        v-for="reminder in dateReminders"
        :key="reminder.id"
        class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              {{ reminder.title }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {{ reminder.description }}
            </p>
            <p class="text-xs text-primary-600 dark:text-primary-400 font-medium">
              ⏰ {{ reminder.time }}
            </p>
          </div>
          <div class="flex gap-1">
            <button
              @click="editReminder(reminder)"
              class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="deleteReminder(reminder.id)"
              class="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Reminder Form -->
    <div v-if="showForm" class="border-t border-gray-200 dark:border-gray-700 pt-4" ref="formRef">
      <div class="space-y-3">
        <input
          v-model="newReminder.title"
          type="text"
          placeholder="عنوان یادآور"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <textarea
          v-model="newReminder.description"
          placeholder="توضیحات"
          rows="2"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
        ></textarea>
        <TimePicker v-model="newReminder.time" />
        <div class="flex gap-2">
          <button
            @click="handleSaveReminder"
            class="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {{ isEditing ? 'بروزرسانی' : 'ذخیره' }}
          </button>
          <button
            @click="cancelEdit"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            لغو
          </button>
        </div>
      </div>
    </div>

    <!-- Add Button -->
    <button
      v-else
      @click="openAddForm"
      class="w-full glass-button py-3 font-semibold flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      افزودن یادآور جدید
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useReminders } from '../composables/useReminders'
import TimePicker from './TimePicker.vue'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true
  }
})

const { addReminder, updateReminder, deleteReminder, getRemindersForDate, showNotification } = useReminders()

const testNotification = () => {
  showNotification({
    title: 'تست یادآور',
    description: 'این یک پیام تست برای بررسی عملکرد اعلان‌ها است.',
    time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  })
}

const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const formRef = ref(null)

const newReminder = ref({
  title: '',
  description: '',
  time: '12:00'
})

const dateReminders = computed(() => {
  return getRemindersForDate(props.selectedDate)
})

const openAddForm = () => {
  isEditing.value = false
  editingId.value = null
  newReminder.value = {
    title: '',
    description: '',
    time: '12:00'
  }
  showForm.value = true
  nextTick(() => {
    formRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

const editReminder = (reminder) => {
  isEditing.value = true
  editingId.value = reminder.id
  newReminder.value = {
    title: reminder.title,
    description: reminder.description,
    time: reminder.time
  }
  showForm.value = true
  nextTick(() => {
    formRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

const cancelEdit = () => {
  showForm.value = false
  isEditing.value = false
  editingId.value = null
}

const handleSaveReminder = () => {
  if (!newReminder.value.title.trim()) return

  if (isEditing.value && editingId.value) {
    updateReminder(editingId.value, {
      title: newReminder.value.title,
      description: newReminder.value.description,
      time: newReminder.value.time
    })
  } else {
    addReminder({
      date: props.selectedDate.toISOString(),
      title: newReminder.value.title,
      description: newReminder.value.description,
      time: newReminder.value.time
    })
  }

  cancelEdit()
}

// Reset form when date changes
watch(() => props.selectedDate, () => {
  cancelEdit()
})
</script>
