"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Languages, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  { "value": "abkhaz", "label": "Abkhaz" },
  { "value": "acehnese", "label": "Acehnese" },
  { "value": "acholi", "label": "Acholi" },
  { "value": "afar", "label": "Afar" },
  { "value": "afrikaans", "label": "Afrikaans" },
  { "value": "albanian", "label": "Albanian" },
  { "value": "alur", "label": "Alur" },
  { "value": "amharic", "label": "Amharic" },
  { "value": "arabic", "label": "Arabic" },
  { "value": "armenian", "label": "Armenian" },
  { "value": "assamese", "label": "Assamese" },
  { "value": "avar", "label": "Avar" },
  { "value": "awadhi", "label": "Awadhi" },
  { "value": "aymara", "label": "Aymara" },
  { "value": "azerbaijani", "label": "Azerbaijani" },
  { "value": "balinese", "label": "Balinese" },
  { "value": "baluchi", "label": "Baluchi" },
  { "value": "bambara", "label": "Bambara" },
  { "value": "baoule", "label": "Baoulé" },
  { "value": "bashkir", "label": "Bashkir" },
  { "value": "basque", "label": "Basque" },
  { "value": "batak_karo", "label": "Batak Karo" },
  { "value": "batak_simalungun", "label": "Batak Simalungun" },
  { "value": "batak_toba", "label": "Batak Toba" },
  { "value": "belarusian", "label": "Belarusian" },
  { "value": "bemba", "label": "Bemba" },
  { "value": "bengali", "label": "Bengali" },
  { "value": "betawi", "label": "Betawi" },
  { "value": "bhojpuri", "label": "Bhojpuri" },
  { "value": "bikol", "label": "Bikol" },
  { "value": "bosnian", "label": "Bosnian" },
  { "value": "breton", "label": "Breton" },
  { "value": "bulgarian", "label": "Bulgarian" },
  { "value": "buryat", "label": "Buryat" },
  { "value": "cantonese", "label": "Cantonese" },
  { "value": "catalan", "label": "Catalan" },
  { "value": "cebuano", "label": "Cebuano" },
  { "value": "chamorro", "label": "Chamorro" },
  { "value": "chechen", "label": "Chechen" },
  { "value": "chichewa", "label": "Chichewa" },
  { "value": "chinese_simplified", "label": "Chinese (Simplified)" },
  { "value": "chinese_traditional", "label": "Chinese (Traditional)" },
  { "value": "chuukese", "label": "Chuukese" },
  { "value": "chuvash", "label": "Chuvash" },
  { "value": "corsican", "label": "Corsican" },
  { "value": "crimean_tatar_cyrillic", "label": "Crimean Tatar (Cyrillic)" },
  { "value": "crimean_tatar_latin", "label": "Crimean Tatar (Latin)" },
  { "value": "croatian", "label": "Croatian" },
  { "value": "czech", "label": "Czech" },
  { "value": "danish", "label": "Danish" },
  { "value": "dari", "label": "Dari" },
  { "value": "dhivehi", "label": "Dhivehi" },
  { "value": "dinka", "label": "Dinka" },
  { "value": "dogri", "label": "Dogri" },
  { "value": "dombe", "label": "Dombe" },
  { "value": "dutch", "label": "Dutch" },
  { "value": "dyula", "label": "Dyula" },
  { "value": "dzongkha", "label": "Dzongkha" },
  { "value": "english", "label": "English" },
  { "value": "esperanto", "label": "Esperanto" },
  { "value": "estonian", "label": "Estonian" },
  { "value": "ewe", "label": "Ewe" },
  { "value": "faroese", "label": "Faroese" },
  { "value": "fijian", "label": "Fijian" },
  { "value": "filipino", "label": "Filipino" },
  { "value": "finnish", "label": "Finnish" },
  { "value": "fon", "label": "Fon" },
  { "value": "french", "label": "French" },
  { "value": "french_canada", "label": "French (Canada)" },
  { "value": "frisian", "label": "Frisian" },
  { "value": "friulian", "label": "Friulian" },
  { "value": "fulani", "label": "Fulani" },
  { "value": "ga", "label": "Ga" },
  { "value": "galician", "label": "Galician" },
  { "value": "georgian", "label": "Georgian" },
  { "value": "german", "label": "German" },
  { "value": "greek", "label": "Greek" },
  { "value": "guarani", "label": "Guarani" },
  { "value": "gujarati", "label": "Gujarati" },
  { "value": "haitian_creole", "label": "Haitian Creole" },
  { "value": "hakha_chin", "label": "Hakha Chin" },
  { "value": "hausa", "label": "Hausa" },
  { "value": "hawaiian", "label": "Hawaiian" },
  { "value": "hebrew", "label": "Hebrew" },
  { "value": "hiligaynon", "label": "Hiligaynon" },
  { "value": "hindi", "label": "Hindi" },
  { "value": "hmong", "label": "Hmong" },
  { "value": "hungarian", "label": "Hungarian" },
  { "value": "hunsrik", "label": "Hunsrik" },
  { "value": "iban", "label": "Iban" },
  { "value": "icelandic", "label": "Icelandic" },
  { "value": "igbo", "label": "Igbo" },
  { "value": "ilocano", "label": "Ilocano" },
  { "value": "indonesian", "label": "Indonesian" },
  { "value": "inuktut_latin", "label": "Inuktut (Latin)" },
  { "value": "inuktut_syllabics", "label": "Inuktut (Syllabics)" },
  { "value": "irish", "label": "Irish" },
  { "value": "italian", "label": "Italian" },
  { "value": "japanese", "label": "Japanese" },
  { "value": "javanese", "label": "Javanese" },
  { "value": "jingpo", "label": "Jingpo" },
  { "value": "kalaallisut", "label": "Kalaallisut" },
  { "value": "kannada", "label": "Kannada" },
  { "value": "kanuri", "label": "Kanuri" },
  { "value": "kapampangan", "label": "Kapampangan" },
  { "value": "kazakh", "label": "Kazakh" },
  { "value": "khasi", "label": "Khasi" },
  { "value": "khmer", "label": "Khmer" },
  { "value": "kiga", "label": "Kiga" },
  { "value": "kikongo", "label": "Kikongo" },
  { "value": "kinyarwanda", "label": "Kinyarwanda" },
  { "value": "kituba", "label": "Kituba" },
  { "value": "kokborok", "label": "Kokborok" },
  { "value": "komi", "label": "Komi" },
  { "value": "konkani", "label": "Konkani" },
  { "value": "korean", "label": "Korean" },
  { "value": "krio", "label": "Krio" },
  { "value": "kurdish_kurmanji", "label": "Kurdish (Kurmanji)" },
  { "value": "kurdish_sorani", "label": "Kurdish (Sorani)" },
  { "value": "kyrgyz", "label": "Kyrgyz" },
  { "value": "lao", "label": "Lao" },
  { "value": "latgalian", "label": "Latgalian" },
  { "value": "latin", "label": "Latin" },
  { "value": "latvian", "label": "Latvian" },
  { "value": "ligurian", "label": "Ligurian" },
  { "value": "limburgish", "label": "Limburgish" },
  { "value": "lingala", "label": "Lingala" },
  { "value": "lithuanian", "label": "Lithuanian" },
  { "value": "lombard", "label": "Lombard" },
  { "value": "luganda", "label": "Luganda" },
  { "value": "luo", "label": "Luo" },
  { "value": "luxembourgish", "label": "Luxembourgish" },
  { "value": "macedonian", "label": "Macedonian" },
  { "value": "madurese", "label": "Madurese" },
  { "value": "maithili", "label": "Maithili" },
  { "value": "makassar", "label": "Makassar" },
  { "value": "malagasy", "label": "Malagasy" },
  { "value": "malay", "label": "Malay" },
  { "value": "malay_jawi", "label": "Malay (Jawi)" },
  { "value": "malayalam", "label": "Malayalam" },
  { "value": "maltese", "label": "Maltese" },
  { "value": "mam", "label": "Mam" },
  { "value": "manx", "label": "Manx" },
  { "value": "maori", "label": "Maori" },
  { "value": "marathi", "label": "Marathi" },
  { "value": "marshallese", "label": "Marshallese" },
  { "value": "marwadi", "label": "Marwadi" },
  { "value": "mauritian_creole", "label": "Mauritian Creole" },
  { "value": "meadow_mari", "label": "Meadow Mari" },
  { "value": "meiteilon_manipuri", "label": "Meiteilon (Manipuri)" },
  { "value": "minang", "label": "Minang" },
  { "value": "mizo", "label": "Mizo" },
  { "value": "mongolian", "label": "Mongolian" },
  { "value": "myanmar_burmese", "label": "Myanmar (Burmese)" },
  { "value": "nahuatl_eastern_huasteca", "label": "Nahuatl (Eastern Huasteca)" },
  { "value": "ndau", "label": "Ndau" },
  { "value": "ndebele_south", "label": "Ndebele (South)" },
  { "value": "nepalbhasa_newari", "label": "Nepalbhasa (Newari)" },
  { "value": "nepali", "label": "Nepali" },
  { "value": "nko", "label": "NKo" },
  { "value": "norwegian", "label": "Norwegian" },
  { "value": "nuer", "label": "Nuer" },
  { "value": "occitan", "label": "Occitan" },
  { "value": "odia_oriya", "label": "Odia (Oriya)" },
  { "value": "oromo", "label": "Oromo" },
  { "value": "ossetian", "label": "Ossetian" },
  { "value": "pangasinan", "label": "Pangasinan" },
  { "value": "papiamento", "label": "Papiamento" },
  { "value": "pashto", "label": "Pashto" },
  { "value": "persian", "label": "Persian" },
  { "value": "polish", "label": "Polish" },
  { "value": "portuguese_brazil", "label": "Portuguese (Brazil)" },
  { "value": "portuguese_portugal", "label": "Portuguese (Portugal)" },
  { "value": "punjabi_gurmukhi", "label": "Punjabi (Gurmukhi)" },
  { "value": "punjabi_shahmukhi", "label": "Punjabi (Shahmukhi)" },
  { "value": "quechua", "label": "Quechua" },
  { "value": "qeqchi", "label": "Q'eqchi'" },
  { "value": "romani", "label": "Romani" },
  { "value": "romanian", "label": "Romanian" },
  { "value": "rundi", "label": "Rundi" },
  { "value": "russian", "label": "Russian" },
  { "value": "samoan", "label": "Samoan" },
  { "value": "sango", "label": "Sango" },
  { "value": "sanskrit", "label": "Sanskrit" },
  { "value": "santali_latin", "label": "Santali (Latin)" },
  { "value": "santali_olchiki", "label": "Santali (Ol Chiki)" },
  { "value": "scots_gaelic", "label": "Scots Gaelic" },
  { "value": "sepedi", "label": "Sepedi" },
  { "value": "serbian_cyrillic", "label": "Serbian (Cyrillic)" },
  { "value": "serbian_latin", "label": "Serbian (Latin)" },
  { "value": "sesotho", "label": "Sesotho" },
  { "value": "seychellois_creole", "label": "Seychellois Creole" },
  { "value": "shan", "label": "Shan" },
  { "value": "shona", "label": "Shona" },
  { "value": "sicilian", "label": "Sicilian" },
  { "value": "silesian", "label": "Silesian" },
  { "value": "sindhi", "label": "Sindhi" },
  { "value": "sinhala", "label": "Sinhala" },
  { "value": "slovak", "label": "Slovak" },
  { "value": "slovenian", "label": "Slovenian" },
  { "value": "somali", "label": "Somali" },
  { "value": "spanish", "label": "Spanish" },
  { "value": "sundanese", "label": "Sundanese" },
  { "value": "susu", "label": "Susu" },
  { "value": "swahili", "label": "Swahili" },
  { "value": "swati", "label": "Swati" },
  { "value": "swedish", "label": "Swedish" },
  { "value": "tahitian", "label": "Tahitian" },
  { "value": "tajik", "label": "Tajik" },
  { "value": "tamazight", "label": "Tamazight" },
  { "value": "tamazight_tifinagh", "label": "Tamazight (Tifinagh)" },
  { "value": "tamil", "label": "Tamil" },
  { "value": "tatar", "label": "Tatar" },
  { "value": "telugu", "label": "Telugu" },
  { "value": "tetum", "label": "Tetum" },
  { "value": "thai", "label": "Thai" },
  { "value": "tibetan", "label": "Tibetan" },
  { "value": "tigrinya", "label": "Tigrinya" },
  { "value": "tiv", "label": "Tiv" },
  { "value": "tok_pisin", "label": "Tok Pisin" },
  { "value": "tongan", "label": "Tongan" },
  { "value": "tshiluba", "label": "Tshiluba" },
  { "value": "tsonga", "label": "Tsonga" },
  { "value": "tswana", "label": "Tswana" },
  { "value": "tulu", "label": "Tulu" },
  { "value": "tumbuka", "label": "Tumbuka" },
  { "value": "turkish", "label": "Turkish" },
  { "value": "turkmen", "label": "Turkmen" },
  { "value": "tuvalu", "label": "Tuvan" },
  { "value": "twi", "label": "Twi" },
  { "value": "udmurt", "label": "Udmurt" },
  { "value": "ukrainian", "label": "Ukrainian" },
  { "value": "urdu", "label": "Urdu" },
  { "value": "uyghur", "label": "Uyghur" },
  { "value": "uzbek", "label": "Uzbek" },
  { "value": "venda", "label": "Venda" },
  { "value": "venetian", "label": "Venetian" },
  { "value": "vietnamese", "label": "Vietnamese" },
  { "value": "waray", "label": "Waray" },
  { "value": "welsh", "label": "Welsh" },
  { "value": "wolof", "label": "Wolof" },
  { "value": "xhosa", "label": "Xhosa" },
  { "value": "yakut", "label": "Yakut" },
  { "value": "yiddish", "label": "Yiddish" },
  { "value": "yoruba", "label": "Yoruba" },
  { "value": "yucatec_maya", "label": "Yucatec Maya" },
  { "value": "zapotec", "label": "Zapotec" },
  { "value": "zulu", "label": "Zulu" }
]

export type SelectBoxProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  searchPlaceholder?: string;
  notFoundText?: string;
}

export function SelectBox({
  value: externalValue,
  onValueChange,
  className,
  triggerClassName,
  contentClassName,
  placeholder = "Select language...",
  icon = <Languages className="w-4 h-4" />,
  searchPlaceholder = "Search language...",
  notFoundText = "No language found."
}: SelectBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(externalValue || "")
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0)
  
  // Update width when component mounts or opens
  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [open])
  
  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue)
    }
  }, [externalValue])

  const handleSelect = React.useCallback((currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    setOpen(false)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }, [value, onValueChange])

  const selectedLabel = React.useMemo(() => 
    languages.find((lang) => lang.value === value)?.label || placeholder,
  [value, placeholder])

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between transition-all duration-200", 
              open ? "border-[#7209B7]/40 shadow-[0_0_10px_rgba(114,9,183,0.2)]" : "",
              triggerClassName
            )}
          >
            <div className="flex items-center gap-2 truncate">
              {icon}
              <span>{selectedLabel}</span>
            </div>
            <ChevronsUpDown className={cn(
              "opacity-50 w-4 h-4 transition-transform duration-200",
              open ? "transform rotate-180" : ""
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          align="start" 
          className={cn(
            "p-0 border border-white/10 shadow-lg backdrop-blur-sm", 
            "bg-gradient-to-br from-[#150C28] to-[#0F0A19]",
            contentClassName
          )}
          style={{ width: triggerWidth > 0 ? `${triggerWidth}px` : undefined }}
        >
          <Command className="bg-transparent">
            <div className="relative border-b border-white/5 group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30 group-focus-within:text-[#F72585] transition-colors duration-200">
                <Search className="w-4 h-4" />
              </div>
              <CommandInput 
                placeholder={searchPlaceholder} 
                className="h-10 bg-transparent text-white placeholder:text-white/30 focus:outline-none focus:ring-0 pl-10 pr-3 py-2" 
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#7209B7]/50 via-[#F72585]/30 to-transparent transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
            <CommandList className="max-h-[300px] scrollbar-thin scrollbar-thumb-[#7209B7]/30 scrollbar-track-transparent">
              <CommandEmpty className="py-6 text-center text-white/50 text-sm">{notFoundText}</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    value={language.value}
                    onSelect={handleSelect}
                    className={cn(
                      "py-2.5 px-3 text-white/70 cursor-pointer",
                      "hover:bg-gradient-to-r hover:from-[#7209B7]/20 hover:to-transparent",
                      "hover:text-white transition-all duration-200",
                      value === language.value ? "bg-gradient-to-r from-[#7209B7]/30 to-[#7209B7]/5 text-white" : ""
                    )}
                  >
                    {language.label}
                    <Check
                      className={cn(
                        "ml-auto text-[#F72585]",
                        value === language.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
