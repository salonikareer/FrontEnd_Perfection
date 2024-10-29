"use client"

import React, { useState, useEffect } from 'react'
import { HexColorPicker } from "react-colorful"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Copy, RotateCcw } from "lucide-react"
import { toast } from 'sonner'

export default function EnhancedGradientGenerator() {
  const [color1, setColor1] = useState("#ff0000")
  const [color2, setColor2] = useState("#0000ff")
  const [angle, setAngle] = useState(90)
  const [isRadial, setIsRadial] = useState(false)
  const [gradientCSS, setGradientCSS] = useState("")

  useEffect(() => {
    const gradientType = isRadial ? "radial-gradient(circle" : `linear-gradient(${angle}deg`
    const newGradientCSS = `${gradientType}, ${color1}, ${color2})`
    setGradientCSS(newGradientCSS)
  }, [color1, color2, angle, isRadial])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`).then(() => {
      toast.success("CSS copied to clipboard!")
    }, (err) => {
      toast.error("Failed to copy CSS")
      console.error('Could not copy text: ', err)
    })
  }

  const resetGradient = () => {
    setColor1("#ff0000")
    setColor2("#0000ff")
    setAngle(90)
    setIsRadial(false)
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Gradient Background Generator
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full sm:w-1/2">
              <Label htmlFor="color1" className="block mb-2 text-lg font-medium">Color 1</Label>
              <HexColorPicker color={color1} onChange={setColor1} id="color1" className="w-full" />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="mt-2 w-full p-2 border rounded text-center"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Label htmlFor="color2" className="block mb-2 text-lg font-medium">Color 2</Label>
              <HexColorPicker color={color2} onChange={setColor2} id="color2" className="w-full" />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="mt-2 w-full p-2 border rounded text-center"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="angle-slider" className="block mb-2 text-lg font-medium">
              Angle: {angle}°
            </Label>
            <Slider
              id="angle-slider"
              min={0}
              max={360}
              step={1}
              value={[angle]}
              onValueChange={(value) => setAngle(value[0])}
              disabled={isRadial}
              className="w-full"
            />
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <Switch
                id="gradient-type"
                checked={isRadial}
                onCheckedChange={setIsRadial}
              />
              <Label htmlFor="gradient-type" className="text-lg font-medium">Radial Gradient</Label>
            </div>
            <Button onClick={resetGradient} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </motion.div>
        </div>
        
        <div className="space-y-8">
          <motion.div
            className="w-full h-64 rounded-xl shadow-lg overflow-hidden"
            style={{ background: gradientCSS }}
            aria-label="Gradient preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="css-output" className="block mb-2 text-lg font-medium">CSS Output</Label>
            <div className="relative">
              <textarea
                id="css-output"
                value={`background: ${gradientCSS};`}
                readOnly
                className="w-full h-24 p-4 pr-12 border rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={copyToClipboard}
                aria-label="Copy CSS"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
