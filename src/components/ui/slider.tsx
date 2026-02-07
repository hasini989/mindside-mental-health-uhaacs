"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "./utils";

interface EnhancedSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  label?: string;
  reality?: 'rift' | 'horizon';
}

function Slider({
  className,
  defaultValue = [5],
  value,
  min = 1,
  max = 10,
  step = 1,
  label,
  reality = 'horizon',
  ...props
}: EnhancedSliderProps) {
  
  // Track current value for the AI to read
  const currentVal = value ? (Array.isArray(value) ? value[0] : value) : (defaultValue ? defaultValue[0] : 5);
  const isRift = reality === 'rift';

  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex justify-between items-center px-1">
        <label className={cn(
          "font-mono text-sm tracking-widest uppercase",
          isRift ? "text-[#ff0000]" : "text-[#FFD700]"
        )}>
          {label}
        </label>
        <span className={cn(
          "font-mono text-lg font-bold",
          isRift ? "text-white" : "text-[#e0f2fe]"
        )}>
          {currentVal}
        </span>
      </div>

      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full h-2 w-full",
            isRift ? "bg-[#330000]" : "bg-[#1e3a5f]"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "absolute h-full",
              isRift ? "bg-[#ff0000]" : "bg-[#FFD700]"
            )}
          />
        </SliderPrimitive.Track>
        
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          className={cn(
            "block size-6 shrink-0 rounded-full border-2 transition-all hover:scale-110 focus:outline-none disabled:pointer-events-none",
            isRift 
              ? "bg-[#ff0000] border-white shadow-[0_0_15px_rgba(255,0,0,0.8)]" 
              : "bg-[#FFD700] border-[#0a1929] shadow-[0_0_15px_rgba(255,215,0,0.6)]"
          )}
        />
      </SliderPrimitive.Root>
      
      <div className="flex justify-between text-[10px] font-mono opacity-50 uppercase tracking-tighter">
        <span>Low Intensity</span>
        <span>High Intensity</span>
      </div>
    </div>
  );
}

export { Slider };