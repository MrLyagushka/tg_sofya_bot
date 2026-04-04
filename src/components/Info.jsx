export default function Info({title, description}) {
  return(
    <li>
      <p>
        <strong>{title}</strong>
         {description}
      </p>
    </li>
  )
}