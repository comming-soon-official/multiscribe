"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Languages,
  FileAudio2,
  WavesIcon,
  Play,
  RefreshCw,
  X,
  Pause,
} from "lucide-react";
import { Orbitron } from "next/font/google";
import { SearchSelect } from "@/components/ui/search-select";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// Define application states
const STATES = {
  UPLOAD: "upload",
  PREVIEW: "preview",
  PROCESSING: "processing",
};

// Custom animated wave component
const AudioWave = ({ playing = false }: { playing?: boolean }) => {
  const bars = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#7209B7] to-[#F72585]"
          animate={
            playing
              ? {
                  height: [
                    `${Math.random() * 50 + 20}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 50 + 20}%`,
                  ],
                }
              : { height: "30%" }
          }
          transition={{
            duration: playing ? 0.6 : 0,
            repeat: playing ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

// Language options
const languages = [
  { value: "abkhaz", label: "Abkhaz" },
  { value: "acehnese", label: "Acehnese" },
  { value: "acholi", label: "Acholi" },
  { value: "afar", label: "Afar" },
  { value: "afrikaans", label: "Afrikaans" },
  { value: "albanian", label: "Albanian" },
  { value: "alur", label: "Alur" },
  { value: "amharic", label: "Amharic" },
  { value: "arabic", label: "Arabic" },
  { value: "armenian", label: "Armenian" },
  { value: "assamese", label: "Assamese" },
  { value: "avar", label: "Avar" },
  { value: "awadhi", label: "Awadhi" },
  { value: "aymara", label: "Aymara" },
  { value: "azerbaijani", label: "Azerbaijani" },
  { value: "balinese", label: "Balinese" },
  { value: "baluchi", label: "Baluchi" },
  { value: "bambara", label: "Bambara" },
  { value: "baoule", label: "Baoulé" },
  { value: "bashkir", label: "Bashkir" },
  { value: "basque", label: "Basque" },
  { value: "batak_karo", label: "Batak Karo" },
  { value: "batak_simalungun", label: "Batak Simalungun" },
  { value: "batak_toba", label: "Batak Toba" },
  { value: "belarusian", label: "Belarusian" },
  { value: "bemba", label: "Bemba" },
  { value: "bengali", label: "Bengali" },
  { value: "betawi", label: "Betawi" },
  { value: "bhojpuri", label: "Bhojpuri" },
  { value: "bikol", label: "Bikol" },
  { value: "bosnian", label: "Bosnian" },
  { value: "breton", label: "Breton" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "buryat", label: "Buryat" },
  { value: "cantonese", label: "Cantonese" },
  { value: "catalan", label: "Catalan" },
  { value: "cebuano", label: "Cebuano" },
  { value: "chamorro", label: "Chamorro" },
  { value: "chechen", label: "Chechen" },
  { value: "chichewa", label: "Chichewa" },
  { value: "chinese_simplified", label: "Chinese (Simplified)" },
  { value: "chinese_traditional", label: "Chinese (Traditional)" },
  { value: "chuukese", label: "Chuukese" },
  { value: "chuvash", label: "Chuvash" },
  { value: "corsican", label: "Corsican" },
  { value: "crimean_tatar_cyrillic", label: "Crimean Tatar (Cyrillic)" },
  { value: "crimean_tatar_latin", label: "Crimean Tatar (Latin)" },
  { value: "croatian", label: "Croatian" },
  { value: "czech", label: "Czech" },
  { value: "danish", label: "Danish" },
  { value: "dari", label: "Dari" },
  { value: "dhivehi", label: "Dhivehi" },
  { value: "dinka", label: "Dinka" },
  { value: "dogri", label: "Dogri" },
  { value: "dombe", label: "Dombe" },
  { value: "dutch", label: "Dutch" },
  { value: "dyula", label: "Dyula" },
  { value: "dzongkha", label: "Dzongkha" },
  { value: "english", label: "English" },
  { value: "esperanto", label: "Esperanto" },
  { value: "estonian", label: "Estonian" },
  { value: "ewe", label: "Ewe" },
  { value: "faroese", label: "Faroese" },
  { value: "fijian", label: "Fijian" },
  { value: "filipino", label: "Filipino" },
  { value: "finnish", label: "Finnish" },
  { value: "fon", label: "Fon" },
  { value: "french", label: "French" },
  { value: "french_canada", label: "French (Canada)" },
  { value: "frisian", label: "Frisian" },
  { value: "friulian", label: "Friulian" },
  { value: "fulani", label: "Fulani" },
  { value: "ga", label: "Ga" },
  { value: "galician", label: "Galician" },
  { value: "georgian", label: "Georgian" },
  { value: "german", label: "German" },
  { value: "greek", label: "Greek" },
  { value: "guarani", label: "Guarani" },
  { value: "gujarati", label: "Gujarati" },
  { value: "haitian_creole", label: "Haitian Creole" },
  { value: "hakha_chin", label: "Hakha Chin" },
  { value: "hausa", label: "Hausa" },
  { value: "hawaiian", label: "Hawaiian" },
  { value: "hebrew", label: "Hebrew" },
  { value: "hiligaynon", label: "Hiligaynon" },
  { value: "hindi", label: "Hindi" },
  { value: "hmong", label: "Hmong" },
  { value: "hungarian", label: "Hungarian" },
  { value: "hunsrik", label: "Hunsrik" },
  { value: "iban", label: "Iban" },
  { value: "icelandic", label: "Icelandic" },
  { value: "igbo", label: "Igbo" },
  { value: "ilocano", label: "Ilocano" },
  { value: "indonesian", label: "Indonesian" },
  { value: "inuktut_latin", label: "Inuktut (Latin)" },
  { value: "inuktut_syllabics", label: "Inuktut (Syllabics)" },
  { value: "irish", label: "Irish" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "javanese", label: "Javanese" },
  { value: "jingpo", label: "Jingpo" },
  { value: "kalaallisut", label: "Kalaallisut" },
  { value: "kannada", label: "Kannada" },
  { value: "kanuri", label: "Kanuri" },
  { value: "kapampangan", label: "Kapampangan" },
  { value: "kazakh", label: "Kazakh" },
  { value: "khasi", label: "Khasi" },
  { value: "khmer", label: "Khmer" },
  { value: "kiga", label: "Kiga" },
  { value: "kikongo", label: "Kikongo" },
  { value: "kinyarwanda", label: "Kinyarwanda" },
  { value: "kituba", label: "Kituba" },
  { value: "kokborok", label: "Kokborok" },
  { value: "komi", label: "Komi" },
  { value: "konkani", label: "Konkani" },
  { value: "korean", label: "Korean" },
  { value: "krio", label: "Krio" },
  { value: "kurdish_kurmanji", label: "Kurdish (Kurmanji)" },
  { value: "kurdish_sorani", label: "Kurdish (Sorani)" },
  { value: "kyrgyz", label: "Kyrgyz" },
  { value: "lao", label: "Lao" },
  { value: "latgalian", label: "Latgalian" },
  { value: "latin", label: "Latin" },
  { value: "latvian", label: "Latvian" },
  { value: "ligurian", label: "Ligurian" },
  { value: "limburgish", label: "Limburgish" },
  { value: "lingala", label: "Lingala" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "lombard", label: "Lombard" },
  { value: "luganda", label: "Luganda" },
  { value: "luo", label: "Luo" },
  { value: "luxembourgish", label: "Luxembourgish" },
  { value: "macedonian", label: "Macedonian" },
  { value: "madurese", label: "Madurese" },
  { value: "maithili", label: "Maithili" },
  { value: "makassar", label: "Makassar" },
  { value: "malagasy", label: "Malagasy" },
  { value: "malay", label: "Malay" },
  { value: "malay_jawi", label: "Malay (Jawi)" },
  { value: "malayalam", label: "Malayalam" },
  { value: "maltese", label: "Maltese" },
  { value: "mam", label: "Mam" },
  { value: "manx", label: "Manx" },
  { value: "maori", label: "Maori" },
  { value: "marathi", label: "Marathi" },
  { value: "marshallese", label: "Marshallese" },
  { value: "marwadi", label: "Marwadi" },
  { value: "mauritian_creole", label: "Mauritian Creole" },
  { value: "meadow_mari", label: "Meadow Mari" },
  { value: "meiteilon_manipuri", label: "Meiteilon (Manipuri)" },
  { value: "minang", label: "Minang" },
  { value: "mizo", label: "Mizo" },
  { value: "mongolian", label: "Mongolian" },
  { value: "myanmar_burmese", label: "Myanmar (Burmese)" },
  { value: "nahuatl_eastern_huasteca", label: "Nahuatl (Eastern Huasteca)" },
  { value: "ndau", label: "Ndau" },
  { value: "ndebele_south", label: "Ndebele (South)" },
  { value: "nepalbhasa_newari", label: "Nepalbhasa (Newari)" },
  { value: "nepali", label: "Nepali" },
  { value: "nko", label: "NKo" },
  { value: "norwegian", label: "Norwegian" },
  { value: "nuer", label: "Nuer" },
  { value: "occitan", label: "Occitan" },
  { value: "odia_oriya", label: "Odia (Oriya)" },
  { value: "oromo", label: "Oromo" },
  { value: "ossetian", label: "Ossetian" },
  { value: "pangasinan", label: "Pangasinan" },
  { value: "papiamento", label: "Papiamento" },
  { value: "pashto", label: "Pashto" },
  { value: "persian", label: "Persian" },
  { value: "polish", label: "Polish" },
  { value: "portuguese_brazil", label: "Portuguese (Brazil)" },
  { value: "portuguese_portugal", label: "Portuguese (Portugal)" },
  { value: "punjabi_gurmukhi", label: "Punjabi (Gurmukhi)" },
  { value: "punjabi_shahmukhi", label: "Punjabi (Shahmukhi)" },
  { value: "quechua", label: "Quechua" },
  { value: "qeqchi", label: "Q'eqchi'" },
  { value: "romani", label: "Romani" },
  { value: "romanian", label: "Romanian" },
  { value: "rundi", label: "Rundi" },
  { value: "russian", label: "Russian" },
  { value: "samoan", label: "Samoan" },
  { value: "sango", label: "Sango" },
  { value: "sanskrit", label: "Sanskrit" },
  { value: "santali_latin", label: "Santali (Latin)" },
  { value: "santali_olchiki", label: "Santali (Ol Chiki)" },
  { value: "scots_gaelic", label: "Scots Gaelic" },
  { value: "sepedi", label: "Sepedi" },
  { value: "serbian_cyrillic", label: "Serbian (Cyrillic)" },
  { value: "serbian_latin", label: "Serbian (Latin)" },
  { value: "sesotho", label: "Sesotho" },
  { value: "seychellois_creole", label: "Seychellois Creole" },
  { value: "shan", label: "Shan" },
  { value: "shona", label: "Shona" },
  { value: "sicilian", label: "Sicilian" },
  { value: "silesian", label: "Silesian" },
  { value: "sindhi", label: "Sindhi" },
  { value: "sinhala", label: "Sinhala" },
  { value: "slovak", label: "Slovak" },
  { value: "slovenian", label: "Slovenian" },
  { value: "somali", label: "Somali" },
  { value: "spanish", label: "Spanish" },
  { value: "sundanese", label: "Sundanese" },
  { value: "susu", label: "Susu" },
  { value: "swahili", label: "Swahili" },
  { value: "swati", label: "Swati" },
  { value: "swedish", label: "Swedish" },
  { value: "tahitian", label: "Tahitian" },
  { value: "tajik", label: "Tajik" },
  { value: "tamazight", label: "Tamazight" },
  { value: "tamazight_tifinagh", label: "Tamazight (Tifinagh)" },
  { value: "tamil", label: "Tamil" },
  { value: "tatar", label: "Tatar" },
  { value: "telugu", label: "Telugu" },
  { value: "tetum", label: "Tetum" },
  { value: "thai", label: "Thai" },
  { value: "tibetan", label: "Tibetan" },
  { value: "tigrinya", label: "Tigrinya" },
  { value: "tiv", label: "Tiv" },
  { value: "tok_pisin", label: "Tok Pisin" },
  { value: "tongan", label: "Tongan" },
  { value: "tshiluba", label: "Tshiluba" },
  { value: "tsonga", label: "Tsonga" },
  { value: "tswana", label: "Tswana" },
  { value: "tulu", label: "Tulu" },
  { value: "tumbuka", label: "Tumbuka" },
  { value: "turkish", label: "Turkish" },
  { value: "turkmen", label: "Turkmen" },
  { value: "tuvalu", label: "Tuvan" },
  { value: "twi", label: "Twi" },
  { value: "udmurt", label: "Udmurt" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "urdu", label: "Urdu" },
  { value: "uyghur", label: "Uyghur" },
  { value: "uzbek", label: "Uzbek" },
  { value: "venda", label: "Venda" },
  { value: "venetian", label: "Venetian" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "waray", label: "Waray" },
  { value: "welsh", label: "Welsh" },
  { value: "wolof", label: "Wolof" },
  { value: "xhosa", label: "Xhosa" },
  { value: "yakut", label: "Yakut" },
  { value: "yiddish", label: "Yiddish" },
  { value: "yoruba", label: "Yoruba" },
  { value: "yucatec_maya", label: "Yucatec Maya" },
  { value: "zapotec", label: "Zapotec" },
  { value: "zulu", label: "Zulu" },
];

// Convert languages to the format expected by SearchSelect
const languageOptions = languages.map((lang) => ({
  label: lang.label,
  value: lang.value,
}));

// Upload state component
type UploadStateProps = {
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  handleFileSelect: React.ChangeEventHandler<HTMLInputElement>;
  dragActive: boolean;
};

const UploadState = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  handleFileSelect,
  dragActive,
}: UploadStateProps) => (
  <div
    className={`border-2 border-dashed border-white/10 rounded-xl p-10 cursor-pointer text-center h-72 flex flex-col items-center justify-center hover:border-[#7209B7]/40 transition-colors duration-300 ${
      dragActive ? "bg-[#7209B7]/10" : ""
    }`}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onClick={() => document.getElementById("fileInput")?.click()}
    tabIndex={0}
    role="button"
    aria-label="Upload audio or video file"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        document.getElementById("fileInput")?.click();
      }
    }}
  >
    <input
      type="file"
      id="fileInput"
      className="hidden"
      accept="audio/*,video/*"
      onChange={handleFileSelect}
    />
    <div className="w-20 h-20 rounded-full bg-[#7209B7]/10 flex items-center justify-center mb-6">
      <FileAudio2 className="w-8 h-8 text-[#F72585]" />
    </div>
    <p className="text-xl font-medium text-white mb-2">
      Drop your audio or video here
    </p>
    <p className="text-white/50">or click to browse your files</p>
    <p className="text-white/30 text-xs mt-4">
      Supports MP3, WAV, MP4, MOV & more
    </p>
  </div>
);

// Preview state component
type PreviewStateProps = {
  uploadedFile: File;
  handleReset: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  formatFileSize: (bytes: number) => string;
  getFileExtension: (filename: string) => string;
};

const PreviewState = ({
  uploadedFile,
  handleReset,
  isPlaying,
  togglePlay,
  formatFileSize,
  getFileExtension,
}: PreviewStateProps) => (
  <div className="border-2 border-[#7209B7]/30 rounded-xl p-8 text-center h-72 flex flex-col justify-between">
    {/* File info */}
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7209B7]/30 to-[#F72585]/30 flex items-center justify-center mb-4">
        <span className="text-lg font-bold text-white">
          {getFileExtension(uploadedFile.name)}
        </span>
      </div>

      <h4 className="font-medium text-white mb-1 max-w-xs truncate">
        {uploadedFile.name}
      </h4>

      <p className="text-white/50 text-sm">
        {formatFileSize(uploadedFile.size)}
      </p>

      {/* Audio wave animation */}
      <div className="mt-4">
        <AudioWave playing={isPlaying} />
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className={`flex items-center gap-2 ${
          isPlaying
            ? "bg-[#F72585]/20 text-[#F72585]"
            : "bg-[#7209B7]/20 text-[#7209B7]"
        } px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors`}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
        <span>{isPlaying ? "Pause" : "Play"}</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleReset(); // Add this line to properly reset the state
          // Give a slight delay to ensure the reset completes before opening file dialog
          setTimeout(() => {
            document.getElementById("fileInput")?.click();
          }, 10);
        }}
        className="flex items-center gap-2 bg-white/5 text-white/80 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Replace</span>
      </button>
    </div>
  </div>
);

// Processing state component
const ProcessingState = () => (
  <div className="border-2 border-[#7209B7]/30 rounded-xl p-10 cursor-pointer text-center h-72 flex flex-col items-center justify-center">
    <div className="w-20 h-20 mb-6">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7209B7" />
            <stop offset="100%" stopColor="#F72585" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 180 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
    <AudioWave playing={true} />
    <p className="mt-5 text-white font-medium">Processing your audio...</p>
    <p className="text-white/50 text-sm mt-2">
      This usually takes less than a minute
    </p>
  </div>
);

// Main component
const HeroSection = () => {
  const [currentState, setCurrentState] = useState(STATES.UPLOAD);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      controls.start({
        scale: 1.03,
        boxShadow: "0 0 30px rgba(114, 9, 183, 0.5)",
      });
    } else if (e.type === "dragleave") {
      setDragActive(false);
      controls.start({
        scale: 1,
        boxShadow: "0 0 0px rgba(114, 9, 183, 0)",
      });
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    controls.start({
      scale: 1,
      boxShadow: "0 0 0px rgba(114, 9, 183, 0)",
    });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    // Reset the input value to ensure the change event fires even if the same file is selected again
    e.target.value = "";
  };

  // Common handler for both drop and file selection
  const handleFile = (file: File) => {
    // Reset previous audio URL if it exists
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setUploadedFile(file);
    setCurrentState(STATES.PREVIEW);

    // Create URL for audio preview if it's audio file
    if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      // Create audio element for preview
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      } else {
        const audio = new Audio(url);
        audioRef.current = audio;
      }
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Reset file upload
  const handleReset = () => {
    setUploadedFile(null);
    setCurrentState(STATES.UPLOAD);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  // Start transcription process
  const startTranscription = () => {
    if (uploadedFile && selectedLanguage) {
      setCurrentState(STATES.PROCESSING);

      // Auto-disable demo after 10 seconds
      setTimeout(() => {
        setCurrentState(STATES.UPLOAD);
        // Reset after processing is complete
        handleReset();
      }, 10000);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Audio playback ended event
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef.current]);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Get file extension
  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toUpperCase() || "";
  };

  // Render the appropriate state component
  const renderStateComponent = () => {
    switch (currentState) {
      case STATES.UPLOAD:
        return (
          <UploadState
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            dragActive={dragActive}
          />
        );
      case STATES.PREVIEW:
        return (
          <PreviewState
            uploadedFile={uploadedFile!}
            handleReset={handleReset}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            formatFileSize={formatFileSize}
            getFileExtension={getFileExtension}
          />
        );
      case STATES.PROCESSING:
        return <ProcessingState />;
      default:
        return (
          <UploadState
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            dragActive={dragActive}
          />
        );
    }
  };

  // Selected language display name
  const selectedLanguageName =
    languages.find((lang) => lang.value === selectedLanguage)?.label ||
    "Select language";

  return (
    <section className="min-h-screen relative pt-20 pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Animated circles */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#7209B7]/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#4361EE]/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/4 w-[25rem] h-[25rem] rounded-full bg-[#F72585]/10 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.015] z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 pt-10">
          {/* Left column - Text content */}
          <div className="w-full lg:w-1/2">
            {/* Tech badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3A0CA3]/20 to-[#7209B7]/20 border border-purple-500/20 rounded-full py-2 px-4 mb-8"
            >
              <WavesIcon className="w-4 h-4 text-[#7209B7]" />
              <span className="text-xs font-semibold tracking-wider text-[#F72585]">
                AI-POWERED TRANSCRIPTION
              </span>
            </motion.div>

            {/* Main heading with animation */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-100 to-[#F72585] ${orbitron.className}`}
              >
                Turn Voice Into Text
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-4 my-4"
              >
                <div className="h-[1px] w-20 bg-gradient-to-r from-[#7209B7] to-transparent"></div>
                <AudioWave playing={currentState === STATES.PROCESSING} />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-white/70 mb-10 max-w-lg"
            >
              Precision transcription powered by cutting-edge AI. Convert any
              audio or video to text with unmatched accuracy in over 100+
              languages.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 mb-10"
            >
              {[
                { label: "Accuracy", value: "99.8%" },
                { label: "Languages", value: "100+" },
                { label: "Users", value: "500K+" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Call to action links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <button className="bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Start Transcribing
              </button>

              <a
                href="#features"
                className="flex items-center gap-2 text-white/80 hover:text-white group"
              >
                <span>See Features</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right column - Upload interface */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full border border-[#7209B7]/30"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border border-[#F72585]/30"></div>

              {/* Upload panel */}
              <motion.div
                animate={controls}
                className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] overflow-visible rounded-2xl border border-white/5 shadow-lg relative z-10"
              >
                {/* Top navigation bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <FileAudio2 className="w-5 h-5 text-[#F72585]" />
                    <span className="font-medium text-white">
                      Audio Transcription
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                </div>

                {/* Main upload area - Dynamic based on current state */}
                <div className="p-8 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentState}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStateComponent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom controls */}
                <div className="border-t border-white/5 p-6 flex flex-col lg:flex-row gap-4 justify-between relative">
                  {/* Language selector */}
                  <div className="w-full">
                    <SearchSelect
                      options={languageOptions}
                      value={selectedLanguage}
                      onChange={setSelectedLanguage}
                      placeholder="Select language"
                      searchPlaceholder="Search language..."
                      icon={<Languages className="w-4 h-4" />}
                      emptyMessage="No languages found"
                    />
                  </div>

                  {/* Transcribe button - disabled until file is uploaded and language is selected */}
                  <button
                    className={`w-full lg:w-auto px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap
                      ${
                        uploadedFile && selectedLanguage
                          ? "bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white hover:shadow-lg hover:shadow-purple-500/30"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      }`}
                    disabled={
                      !uploadedFile ||
                      !selectedLanguage ||
                      currentState === STATES.PROCESSING
                    }
                    onClick={startTranscription}
                  >
                    Transcribe Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
