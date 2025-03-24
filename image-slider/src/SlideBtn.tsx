export default function Slidebtn ({ faceTo, className, onClick }: {
  faceTo: 'left' | 'right',
  className?: string,
  onClick?: () => void
}) {
  const svgClases = className + (faceTo === 'left' ? '' : ' rotate-180')

  return (
    <button onClick={onClick} className={`h-8 w-8 rounded-4xl opacity-70 bg-zinc-700 text-white hover:scale-110 hover:opacity-100 cursor-pointer flex items-center justify-center transition-transform ${svgClases}`}>
      <svg role="img" className="h-5/6" viewBox="0 0 16 16" fill="currentColor"><path fill="currentColor" fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path></svg>
    </button>
  )
}