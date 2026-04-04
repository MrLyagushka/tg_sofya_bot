import {text} from '../data'
import Info from "./Info"

export default function VozmoznoctiBota () {
    return (
        <section>
            <h3>Возможности нашего бота</h3>

            <ul>
            {text.map(way => <Info key={way.title} {...way} />)}
            
            </ul>
        </section>
    )
}