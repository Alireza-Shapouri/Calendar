import { ref, computed } from 'vue'
import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'
import { CALENDAR_TYPES } from '../utils/constants'
import PersianDate from 'persian-date'

export function useCalendar() {
    const selectedDate = ref(new Date())
    const calendarType = ref(CALENDAR_TYPES.JALALI)
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())

    // Generate Jalali calendar grid
    const generateJalaliCalendar = (year, month) => {
        const firstDay = new PersianDate([year, month + 1, 1])
        const daysInMonth = firstDay.daysInMonth()

        // Get day of week (0=Saturday in persian-date)
        const firstDayOfWeek = firstDay.day()

        const days = []

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ day: null, isCurrentMonth: false })
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new PersianDate([year, month + 1, day]).toDate()
            days.push({
                day,
                date,
                isCurrentMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, selectedDate.value)
            })
        }

        return days
    }

    // Generate Hijri calendar grid
    const generateHijriCalendar = (year, month) => {
        const m = momentHijri(`${year}/${month + 1}/1`, 'iYYYY/iMM/iDD')
        const daysInMonth = m.iDaysInMonth()
        const firstDayOfWeek = m.day()

        const days = []

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ day: null, isCurrentMonth: false })
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = momentHijri(`${year}/${month + 1}/${day}`, 'iYYYY/iMM/iDD').toDate()
            days.push({
                day,
                date,
                isCurrentMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, selectedDate.value)
            })
        }

        return days
    }

    // Generate Gregorian calendar grid
    const generateGregorianCalendar = (year, month) => {
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const firstDayOfWeek = (firstDay.getDay() + 1) % 7 // Convert to Saturday = 0

        const days = []

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ day: null, isCurrentMonth: false })
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            days.push({
                day,
                date,
                isCurrentMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, selectedDate.value)
            })
        }

        return days
    }

    // Get current calendar grid
    const calendarDays = computed(() => {
        if (calendarType.value === CALENDAR_TYPES.JALALI) {
            const m = moment(selectedDate.value)
            return generateJalaliCalendar(m.jYear(), m.jMonth())
        } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
            const m = momentHijri(selectedDate.value)
            return generateHijriCalendar(m.iYear(), m.iMonth())
        } else {
            return generateGregorianCalendar(selectedDate.value.getFullYear(), selectedDate.value.getMonth())
        }
    })

    // Navigate to previous month
    const previousMonth = () => {
        if (calendarType.value === CALENDAR_TYPES.JALALI) {
            const m = moment(selectedDate.value).subtract(1, 'jMonth')
            selectedDate.value = m.toDate()
        } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
            const m = momentHijri(selectedDate.value).subtract(1, 'iMonth')
            selectedDate.value = m.toDate()
        } else {
            const newDate = new Date(selectedDate.value)
            newDate.setMonth(newDate.getMonth() - 1)
            selectedDate.value = newDate
        }
    }

    // Navigate to next month
    const nextMonth = () => {
        if (calendarType.value === CALENDAR_TYPES.JALALI) {
            const m = moment(selectedDate.value).add(1, 'jMonth')
            selectedDate.value = m.toDate()
        } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
            const m = momentHijri(selectedDate.value).add(1, 'iMonth')
            selectedDate.value = m.toDate()
        } else {
            const newDate = new Date(selectedDate.value)
            newDate.setMonth(newDate.getMonth() + 1)
            selectedDate.value = newDate
        }
    }

    // Select a date
    const selectDate = (date) => {
        selectedDate.value = date
    }

    // Go to today
    const goToToday = () => {
        selectedDate.value = new Date()
    }

    // Set specific year
    const setYear = (year) => {
        if (calendarType.value === CALENDAR_TYPES.JALALI) {
            const m = moment(selectedDate.value)
            m.jYear(year)
            selectedDate.value = m.toDate()
        } else if (calendarType.value === CALENDAR_TYPES.HIJRI) {
            const m = momentHijri(selectedDate.value)
            m.iYear(year)
            selectedDate.value = m.toDate()
        } else {
            const newDate = new Date(selectedDate.value)
            newDate.setFullYear(year)
            selectedDate.value = newDate
        }
    }

    // Helper functions
    function isSameDay(date1, date2) {
        if (!date1 || !date2) return false
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
    }

    function isToday(date) {
        return isSameDay(date, new Date())
    }

    return {
        selectedDate,
        calendarType,
        calendarDays,
        previousMonth,
        nextMonth,
        selectDate,
        goToToday,
        setYear
    }
}
