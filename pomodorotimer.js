"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TimerSettings {
  workDuration: number
  breakDuration: number
}

export default function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [time, setTime] = useState(25 * 60)
  const [settings, setSettings] = useState<TimerSettings>({
    workDuration: 25,
    breakDuration: 5,
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      if (audioRef.current) {
        audioRef.current.play()
      }
      setIsWork((prevIsWork) => !prevIsWork)
      setTime(isWork ? settings.breakDuration * 60 : settings.workDuration * 60)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, isWork, settings])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsWork(true)
    setTime(settings.workDuration * 60)
  }

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings)
    setTime(newSettings.workDuration * 60)
    setIsWork(true)
    setIsActive(false)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const progress = isWork
    ? (1 - time / (settings.workDuration * 60)) * 100
    : (1 - time / (settings.breakDuration * 60)) * 100

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          {isWork ? 'Work Time' : 'Break Time'}
        </h1>
        <div className="relative w-64 h-64">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="5"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            />
            <motion.circle
              className="text-blue-500 stroke-current"
              strokeWidth="5"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl font-bold text-gray-800 dark:text-white">
              {formatTime(time)}
            </span>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer} aria-label={isActive ? 'Pause timer' : 'Start timer'}>
            {isActive ? <Pause /> : <Play />}
          </Button>
          <Button onClick={resetTimer} aria-label="Reset timer">
            <RotateCcw />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" aria-label="Open settings">
                <Settings />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
              </DialogHeader>
              <SettingsForm settings={settings} updateSettings={updateSettings} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <audio ref={audioRef} src="/notification.mp3" />
    </div>
  )
}

interface SettingsFormProps {
  settings: TimerSettings
  updateSettings: (newSettings: TimerSettings) => void
}

function SettingsForm({ settings, updateSettings }: SettingsFormProps) {
  const [workDuration, setWorkDuration] = useState(settings.workDuration.toString())
  const [breakDuration, setBreakDuration] = useState(settings.breakDuration.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings({
      workDuration: parseInt(workDuration),
      breakDuration: parseInt(breakDuration),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="workDuration">Work Duration (minutes)</Label>
        <Input
          id="workDuration"
          type="number"
          min="1"
          max="60"
          value={workDuration}
          onChange={(e) => setWorkDuration(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
        <Input
          id="breakDuration"
          type="number"
          min="1"
          max="30"
          value={breakDuration}
          onChange={(e) => setBreakDuration(e.target.value)}
        />
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  )
}
