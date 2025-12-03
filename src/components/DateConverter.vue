<template>
  <div class="glass-card p-6 animate-scale-in">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
      تاریخ امروز
    </h3>

    <div class="space-y-4">
      <!-- Jalali Date -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">ش</span>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">تقویم شمسی</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ jalaliDate }}
            </p>
          </div>
        </div>
      </div>

      <!-- Hijri Date -->
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">ق</span>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">تقویم قمری</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ hijriDate }}
            </p>
          </div>
        </div>
      </div>

      <!-- Gregorian Date -->
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">تقویم میلادی</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white text-left" dir="ltr">
              {{ gregorianDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'
import { JALALI_MONTHS, HIJRI_MONTHS, GREGORIAN_MONTHS } from '../utils/constants'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true
  }
})

const jalaliDate = computed(() => {
  const m = moment(props.selectedDate)
  return `${m.jDate()}  ${JALALI_MONTHS[m.jMonth()]}  ${m.jYear()}`
})

const hijriDate = computed(() => {
  const m = momentHijri(props.selectedDate)
  return `${m.iDate()}  ${HIJRI_MONTHS[m.iMonth()]}  ${m.iYear()}`
})

const gregorianDate = computed(() => {
  const date = props.selectedDate
  return ` ${date.getFullYear()}  ${GREGORIAN_MONTHS[date.getMonth()]}  ${date.getDate()}`
})
</script>
