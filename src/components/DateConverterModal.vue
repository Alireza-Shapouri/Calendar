<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scale-in">
      <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          مبدل تاریخ
        </h3>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Input Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاریخ شمسی را وارد کنید:</label>
          <div class="flex gap-2">
            <input
              v-model="jalaliYear"
              type="number"
              min="1"
              placeholder="سال"
              class="w-1/3 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white text-center focus:ring-2 focus:ring-primary-500 outline-none"
            />
            <select
              v-model="jalaliMonth"
              class="w-1/3 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white text-center focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option v-for="(month, index) in JALALI_MONTHS" :key="index" :value="index + 1">
                {{ month }}
              </option>
            </select>
            <input
              v-model="jalaliDay"
              type="number"
              min="1"
              placeholder="روز"
              class="w-1/3 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white text-center focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <!-- Result Section -->
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">میلادی</div>
            <div class="text-lg font-bold text-gray-900 dark:text-white font-mono" dir="ltr">
              {{ gregorianDate }}
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">قمری</div>
            <div class="text-lg font-bold text-gray-900 dark:text-white font-mono" dir="ltr">
              {{ hijriDate }}
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
        <button
          @click="setToday"
          class="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm"
        >
          استفاده از تاریخ امروز
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'
import { JALALI_MONTHS } from '../utils/constants'

defineProps({
  isOpen: Boolean
})

defineEmits(['close'])

const jalaliYear = ref(moment().jYear())
const jalaliMonth = ref(moment().jMonth() + 1)
const jalaliDay = ref(moment().jDate())

const setToday = () => {
  const now = moment()
  jalaliYear.value = now.jYear()
  jalaliMonth.value = now.jMonth() + 1
  jalaliDay.value = now.jDate()
}

const currentDate = computed(() => {
  try {
    // Validate inputs
    if (!jalaliYear.value || !jalaliMonth.value || !jalaliDay.value) return null

    // Create moment object
    const m = moment(`${jalaliYear.value}/${jalaliMonth.value}/${jalaliDay.value}`, 'jYYYY/jM/jD')

    if (!m.isValid()) return null
    return m
  } catch (e) {
    return null
  }
})

const gregorianDate = computed(() => {
  if (!currentDate.value) return '---'
  return currentDate.value.format('YYYY-MM-DD')
})

const hijriDate = computed(() => {
  if (!currentDate.value) return '---'
  // Convert to Hijri
  // Note: We need to convert the moment object to a native Date first, then use moment-hijri
  const nativeDate = currentDate.value.toDate()
  return momentHijri(nativeDate).format('iYYYY/iM/iD')
})
</script>
