"use client"

import { useState, useEffect } from "react"

interface PasswordStrengthProps {
  password: string
  onStrengthChange?: (strength: number) => void
}

export function PasswordStrength({ password, onStrengthChange }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const calculateStrength = () => {
      if (!password) {
        setStrength(0)
        setMessage("")
        onStrengthChange?.(0)
        return
      }

      let score = 0

      // Length check
      if (password.length >= 8) score += 1
      if (password.length >= 12) score += 1

      // Character variety checks
      if (/[A-Z]/.test(password)) score += 1 // Has uppercase
      if (/[a-z]/.test(password)) score += 1 // Has lowercase
      if (/[0-9]/.test(password)) score += 1 // Has number
      if (/[^A-Za-z0-9]/.test(password)) score += 1 // Has special char

      // Normalize to 0-4 scale
      const normalizedScore = Math.min(4, Math.floor(score / 1.5))

      setStrength(normalizedScore)
      onStrengthChange?.(normalizedScore)

      // Set appropriate message
      switch (normalizedScore) {
        case 0:
          setMessage("Very weak")
          break
        case 1:
          setMessage("Weak")
          break
        case 2:
          setMessage("Fair")
          break
        case 3:
          setMessage("Good")
          break
        case 4:
          setMessage("Strong")
          break
        default:
          setMessage("")
      }
    }

    calculateStrength()
  }, [password, onStrengthChange])

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-emerald-500"
      default:
        return "bg-gray-200"
    }
  }

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div className={`transition-all duration-300 ${getColor()}`} style={{ width: `${(strength / 4) * 100}%` }} />
      </div>
      <p className={`text-xs ${strength < 2 ? "text-red-500" : strength < 3 ? "text-yellow-500" : "text-green-500"}`}>
        {message}
      </p>
    </div>
  )
}
