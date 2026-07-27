export function Anchor({ text, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-slate-300 transition decoration-dotted decoration-slate-400 decoration-2 underline-offset-8"
    >
      {text}
    </a>
  )
}
