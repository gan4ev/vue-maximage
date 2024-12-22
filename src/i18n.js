import { createI18n } from 'vue-i18n'
import en from './locales/en'
import bg from './locales/bg'
import ru from './locales/ru'

export default createI18n({
  legacy: false,
  locale: 'bg', // set Bulgarian as default
  fallbackLocale: 'en',
  messages: {
    en,
    bg,
    ru
  }
})
