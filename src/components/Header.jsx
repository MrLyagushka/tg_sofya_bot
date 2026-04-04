import logo from '../assets/image.png'
import { useState, useEffect } from "react"


export default function Header() {
  const [now, setNow] = useState(new Date())

  setInterval(() => setNow(new Date()), 1000)

  return(
    <header>
      <img src={logo} alt={'Logo'} />
      <h1 style={{ marginRight: 'auto' }}>Дзшка бот</h1>
      {/* <h3>Привет, это заголовок</h3> */}

      <span>Время сейчас {now.toLocaleTimeString()}</span>
    </header>
  )
}