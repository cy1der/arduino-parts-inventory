import { useEffect } from 'react'

import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'
import Icon from '@mdi/react'
import { themeChange } from 'theme-change'

const ThemeToggle = () => {
  let isDark = false

  if (typeof window !== 'undefined')
    isDark = localStorage.getItem('theme') === 'dark'

  useEffect(() => {
    themeChange(false)
    return () => {
      themeChange(true)
    }
  }, [])

  return (
    <label className="swap-rotate btn btn-ghost swap w-12 hover:shadow-lg">
      <input
        type="checkbox"
        defaultChecked={isDark}
        data-toggle-theme="light,dark"
      />
      <Icon
        path={mdiWeatherSunny}
        className="swap-off h-8 w-8  text-yellow-500"
      />
      <Icon path={mdiWeatherNight} className="swap-on h-8 w-8 text-blue-500" />
    </label>
  )
}

export default ThemeToggle
