import { useState } from "react"

import Button from "./Button/Button"

import { differences } from "../data"

export default function InFuture () {
    const [contentType, setContentType] = useState(null)

    function handleClick(text) {
        setContentType(text)
    }

    return (
        <section>
          <h3>В разработке</h3>

          <Button isActive={contentType === 'way'} onClick={() => handleClick('way')}>Цена</Button>
          <Button isActive={contentType === 'easy'} onClick={() => handleClick('easy')}>Функционал</Button>
          <Button isActive={contentType === 'program'} onClick={() => handleClick('program')}>Будущее</Button>

          {!contentType && <p>Нажми на кнопку</p>}
          {contentType && <p>{differences[contentType]}</p>}

        </section>
    )
}