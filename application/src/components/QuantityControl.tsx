type QuantityControlProps = {
  value: number
  onChange: (next: number) => void
  label: string
  min?: number
  max?: number
}

export function QuantityControl({
  value,
  onChange,
  label,
  min = 1,
  max = 8,
}: QuantityControlProps) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity for ${label}`}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity for ${label}`}
      >
        +
      </button>
    </div>
  )
}
