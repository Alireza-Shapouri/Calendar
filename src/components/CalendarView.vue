<template>
  <div class="glass-card p-6 animate-scale-in relative">
    <!-- Top Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-50 dark:bg-gray-700/30 p-2 rounded-2xl">
      <!-- Calendar Type Tabs -->
      <div class="flex gap-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-xl">
        <button
          v-for="type in calendarTypes"
          :key="type.value"
          @click="calendarType = type.value"
          :class="[
            'py-2 px-4 rounded-lg text-sm font-bold transition-all duration-200',
            calendarType === type.value
              ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          ]"
        >
          {{ type.label }}
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button
          @click="toggleYearSelector"
          class="glass-button px-3 py-2 text-sm font-medium flex items-center gap-1 text-gray-700 dark:text-gray-200"
          title="تغییر سال"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ currentYear }}
        </button>

        <button
          @click="showDateConverter = true"
          class="glass-button px-3 py-2 text-sm font-medium flex items-center gap-1 text-gray-700 dark:text-gray-200"
          title="مبدل تاریخ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          مبدل
        </button>

        <button
          @click="goToToday"
          class="glass-button px-3 py-2 text-sm font-bold text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200"
          title="برو به امروز"
        >
          امروز
        </button>
      </div>
    </div>

    <!-- Month Navigation & Title -->
    <div class="flex items-center justify-between mb-8 px-4">
      <button
        @click="previousMonth"
        class="glass-button p-3 rounded-xl hover:scale-110 transition-transform text-gray-700 dark:text-white hover:bg-white dark:hover:bg-gray-600 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
          {{ currentMonthName }} {{ currentYear }}
        </h2>
      </div>

      <button
        @click="nextMonth"
        class="glass-button p-3 rounded-xl hover:scale-110 transition-transform text-gray-700 dark:text-white hover:bg-white dark:hover:bg-gray-600 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Year Selector Modal -->
    <div
      v-if="showYearSelector"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      @click.self="toggleYearSelector"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scale-in flex flex-col max-h-[80vh]">
        <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">انتخاب سال</h3>
          <button @click="toggleYearSelector" class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-4 overflow-y-auto custom-scrollbar flex-1" ref="yearListRef">
          <div class="grid grid-cols-4 gap-3">
            <button
              v-for="year in availableYears"
              :key="year"
              @click="selectYear(year)"
              :ref="el => { if (year === currentYear) selectedYearRef = el }"
              :class="[
                'py-3 rounded-xl text-lg font-semibold transition-all duration-200 border-2',
                year === currentYear
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-md scale-105'
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-600'
              ]"
            >
              {{ year }}
            </button>
          </div>
        </div>

        <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            @click="selectYear(currentDateYear)"
            class="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            برو به سال جاری
          </button>
        </div>
      </div>
    </div>

    <!-- Date Converter Modal -->
    <DateConverterModal :is-open="showDateConverter" @close="showDateConverter = false" />

    <!-- Weekday Headers -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in weekdays"
        :key="day"
        class="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-2 items-center">
      <div
        v-for="(dayObj, index) in calendarDays"
        :key="index"
        @click="dayObj.isCurrentMonth && selectDate(dayObj.date)"
        :class="[
          'calendar-day',
          {
            'calendar-day-selected': dayObj.isSelected,
            'calendar-day-today': dayObj.isToday && !dayObj.isSelected,
            'calendar-day-other-month': !dayObj.isCurrentMonth,
            'cursor-not-allowed': !dayObj.isCurrentMonth
          }
        ]"
      >
        <span v-if="dayObj.day">{{ dayObj.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'
import { useCalendar } from '../composables/useCalendar'
import { CALENDAR_TYPES, JALALI_MONTHS, HIJRI_MONTHS, GREGORIAN_MONTHS, WEEKDAY_SHORT } from '../utils/constants'
import DateConverterModal from './DateConverterModal.vue'

const {
  selectedDate,
  calendarType,
  calendarDays,
  previousMonth,
  nextMonth,
  selectDate,
  goToToday,
  setYear
} = useCalendar()

const showYearSelector = ref(false)
const showDateConverter = ref(false)

const calendarTypes = [
  { value: CALENDAR_TYPES.JALALI, label: 'شمسی' },
  { value: CALENDAR_TYPES.HIJRI, label: 'قمری' },
  { value: CALENDAR_TYPES.GREGORIAN, label: 'میلادی' }
]

const currentMonthName = computed(() => {
  if (calendarType.value === CALENDAR_TYPES.JALALI) {
    const m = moment(selectedDate.value)
    return JALALI_MONTHS[m.jMonth()]
  } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
    const m = momentHijri(selectedDate.value)
    return HIJRI_MONTHS[m.iMonth()]
  } else {
    return GREGORIAN_MONTHS[selectedDate.value.getMonth()]
  }
})

const currentYear = computed(() => {
  if (calendarType.value === CALENDAR_TYPES.JALALI) {
    return moment(selectedDate.value).jYear()
  } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
    return momentHijri(selectedDate.value).iYear()
  } else {
    return selectedDate.value.getFullYear()
  }
})

const availableYears = computed(() => {
  const current = currentYear.value
  const years = []
  for (let i = current - 50; i <= current + 50; i++) {
    years.push(i)
  }
  return years
})

const yearListRef = ref(null)
const selectedYearRef = ref(null)

const currentDateYear = computed(() => {
  const now = new Date()
  if (calendarType.value === CALENDAR_TYPES.JALALI) {
    return moment(now).jYear()
  } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
    return momentHijri(now).iYear()
  } else {
    return now.getFullYear()
  }
})

const toggleYearSelector = async () => {
  showYearSelector.value = !showYearSelector.value
  if (showYearSelector.value) {
    // Wait for DOM update then scroll to selected year
    setTimeout(() => {
      if (selectedYearRef.value && yearListRef.value) {
        selectedYearRef.value.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }, 100)
  }
}

const selectYear = (year) => {
  setYear(year)
  showYearSelector.value = false
}

const weekdays = computed(() => {
  return WEEKDAY_SHORT[calendarType.value]
})
</script>
