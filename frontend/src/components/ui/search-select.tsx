'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Check, ChevronsUpDown } from 'lucide-react'

export type Option = {
  label: string
  value: string
  icon?: React.ReactNode
}

type SearchSelectProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxHeight?: number
  searchPlaceholder?: string
  icon?: React.ReactNode
  emptyMessage?: string
  isLoading?: boolean
}

export const SearchSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className = '',
  disabled = false,
  maxHeight = 300,
  searchPlaceholder = 'Search...',
  icon,
  emptyMessage = 'No options found',
  isLoading = false
}: SearchSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  // Initialize activeIndex to -1 so no item is highlighted by default
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  // Track if keyboard navigation is being used
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false)

  // Get the selected option based on value
  const selectedOption = options.find(option => option.value === value)

  // Filter and sort options:
  // 1. First filter options based on search query
  // 2. Then sort to prioritize the selected option at the top
  const filteredOptions = React.useMemo(() => {
    // First filter by search query
    const filtered = options.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    // Then sort to put selected option at the top
    return filtered.sort((a, b) => {
      if (a.value === value) return -1
      if (b.value === value) return 1
      return 0
    })
  }, [options, searchQuery, value])

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        // Reset keyboard navigation state when dropdown closes
        setIsKeyboardNavigation(false)
        setActiveIndex(-1)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus on search input when dropdown is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset active index when filtered options change
  useEffect(() => {
    setActiveIndex(-1)
  }, [searchQuery])

  // Scroll active option into view
  useEffect(() => {
    if (isOpen && dropdownRef.current && filteredOptions.length > 0 && activeIndex >= 0) {
      const activeElement = dropdownRef.current.children[activeIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex, isOpen, filteredOptions.length])

  // Find the index of the selected option in the filtered list
  const selectedIndex = filteredOptions.findIndex(option => option.value === value)

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    // Enable keyboard navigation mode
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      setIsKeyboardNavigation(true)
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        setActiveIndex(-1)
        setIsKeyboardNavigation(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => {
          if (prev >= filteredOptions.length - 1) return prev
          return prev + 1
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => prev > 0 ? prev - 1 : 0)
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex].value)
          setIsKeyboardNavigation(false)
        }
        break
      case 'Tab':
        setIsOpen(false)
        setSearchQuery('')
        setIsKeyboardNavigation(false)
        break
      default:
        break
    }
  }

  // Handle mouse enter on option
  const handleMouseEnter = (index: number) => {
    // Only update activeIndex if not in keyboard navigation mode
    if (!isKeyboardNavigation) {
      setActiveIndex(index)
    }
  }

  // Handle mouse move to switch from keyboard to mouse navigation
  const handleMouseMove = () => {
    setIsKeyboardNavigation(false)
  }

  // Clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
  }

  // Select an option
  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchQuery('')
    setActiveIndex(-1)
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) setSearchQuery('')
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
    >
      {/* Selected value display / trigger button */}
      <div
        onClick={toggleDropdown}
        className={`flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg py-2 px-3 cursor-pointer transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <div className="flex items-center gap-2 text-white/70 overflow-hidden">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {selectedOption ? (
            <span className="truncate">{selectedOption.label}</span>
          ) : (
            <span className="text-white/50 truncate">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center">
          {value && (
            <button
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-white/10 mr-1"
              aria-label="Clear selection"
            >
              <X className="w-3 h-3 text-white/60" />
            </button>
          )}
          <ChevronsUpDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-1 bg-[#150C28] border border-white/10 rounded-lg shadow-xl z-50"
          >
            {/* Search input */}
            <div className="p-2 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-white/5 rounded py-1.5 pl-9 pr-3 text-sm text-white/80 placeholder-white/50 outline-none focus:ring-1 focus:ring-[#7209B7]"
                  aria-autocomplete="list"
                />
              </div>
            </div>

            {/* Options list */}
            <div 
              ref={dropdownRef}
              className="overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
              role="listbox"
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-[#7209B7] border-t-transparent rounded-full"
                  />
                  <span className="ml-2 text-white/70">Loading...</span>
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="py-3 px-2 text-center text-white/50 text-sm">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  // Determine styles based on selection and active states
                  const isSelected = option.value === value;
                  const isActive = activeIndex === index;
                  
                  // Create className based on different states
                  let itemClassName = "px-3 py-2 cursor-pointer flex items-center transition-colors";
                  
                  if (isSelected && isActive) {
                    // Both selected and active (keyboard navigation on selected item)
                    itemClassName += " bg-[#7209B7]/50 text-white";
                  } else if (isSelected) {
                    // Selected but not active
                    itemClassName += " bg-[#7209B7]/20 text-white";
                  } else if (isActive) {
                    // Active but not selected (keyboard navigation)
                    itemClassName += " bg-[#7209B7]/30 text-white/90";
                  } else {
                    // Neither active nor selected
                    itemClassName += " hover:bg-[#7209B7]/10 text-white/80";
                  }

                  // Add a visual divider if this is the selected option and not the last item
                  const showDivider = isSelected && index === 0 && filteredOptions.length > 1;
                  
                  return (
                    <React.Fragment key={option.value}>
                      <div
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        className={itemClassName}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {option.icon && <span className="mr-2">{option.icon}</span>}
                        <span className="flex-grow truncate">{option.label}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#F72585] ml-2 flex-shrink-0" />
                        )}
                      </div>
                      {showDivider && (
                        <div className="border-t border-white/5 mx-2"></div>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
