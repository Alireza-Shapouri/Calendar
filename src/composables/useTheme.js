import { ref, watch, onMounted } from 'vue'
import { THEME } from '../utils/constants'

export function useTheme() {
    const theme = ref(THEME.DARK)

    // Load theme from localStorage
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            theme.value = savedTheme
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            theme.value = prefersDark ? THEME.DARK : THEME.LIGHT
        }
        applyTheme()
    }

    // Apply theme to document
    const applyTheme = () => {
        if (theme.value === THEME.DARK) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Toggle theme
    const toggleTheme = () => {
        theme.value = theme.value === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    }

    // Watch theme changes and save to localStorage
    watch(theme, (newTheme) => {
        localStorage.setItem('theme', newTheme)
        applyTheme()
    })

    onMounted(() => {
        loadTheme()
    })

    return {
        theme,
        toggleTheme,
        isDark: () => theme.value === THEME.DARK
    }
}
