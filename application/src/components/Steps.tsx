const steps = [
  { id: 'cart', label: 'Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'confirmation', label: 'Confirmation' },
] as const

export function Steps({ current }: { current: (typeof steps)[number]['id'] }) {
  const currentIndex = steps.findIndex((step) => step.id === current)
  return (
    <ol className="steps">
      {steps.map((step, index) => {
        const state = index < currentIndex ? 'is-done' : index === currentIndex ? 'is-current' : ''
        return (
          <li key={step.id} className={state} aria-current={index === currentIndex ? 'step' : undefined}>
            <span>{index + 1}</span>
            {step.label}
          </li>
        )
      })}
    </ol>
  )
}
