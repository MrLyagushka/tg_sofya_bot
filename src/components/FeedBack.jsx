import Button from "./Button/Button";
import { useState } from "react";

export default function FeedBack () {
    const [name, setName] = useState('')
    const [reason, setReason] = useState('help')
    const [error, setError] = useState(true)


    return (
        <section style={{marginBottom: '1rem'}}>
            <h3>Обратная связь</h3>

            <form>
                <label htmlFor="name">Ваше имя</label>
                <input type='text' id="name" className="control" value={name} style={{
                    border: name.trim().length || error ? null : '1px solid red'
                }} onChange={(event) => {return (setName(event.target.value, setError(false)))}}/>

                <label htmlFor="reason">Причина обращения</label>
                <select id="reason" className="control" value={reason} onChange={(event) => setReason(event.target.value)}>
                    <option value="error">Ошибка</option>
                    <option value="help">Нужна помощь</option>
                    <option value="suggest">Предложение</option>
                </select>

                <pre>
                    Name: {name}
                    <br />
                    Reason: {reason}
                </pre>

                <Button disabled={!(name.trim().length)} isActive={name.trim().length}>Отправить</Button>
            </form>

        </section>

    )
}