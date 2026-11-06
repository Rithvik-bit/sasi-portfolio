/**
 * Rithvik Portfolio — Case Studies & Project Database
 * Strictly accurate, un-embellished technical documentation.
 * Appala Venkat Sasi Rithvik — Software Developer & Creative Technologist
 */

export const caseStudies = {
  satquery: {
    id: "satquery",
    title: "SatQuery AI",
    subtitle: "Orbital Remote Sensing & Agentic Intelligence Engine",
    category: "Applied AI / Agentic Systems / Geospatial Intelligence",
    status: "Active Development Prototype",
    statusType: "prototype",
    year: "2026",
    role: "Lead Systems Architect & ML Engineer",
    hardwareTarget: "NVIDIA RTX 3050 (6GB VRAM) Local Target",
    githubUrl: "https://github.com/Rithvik-bit/satquery",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "geospatial",
    tagline: "An AI-powered remote sensing intelligence platform designed to analyze satellite imagery through specialist machine learning models and an agentic orchestration pipeline.",
    overview: "SatQuery AI is an experimental remote sensing platform that bridges natural language inquiry with raw geospatial raster intelligence. Rather than requiring analysts to configure complex multi-spectral band math or navigate manual QGIS workflows, SatQuery AI breaks down complex spatial queries into sub-tasks and delegates them to specialized, local vision models under strict GPU memory constraints.",
    problemStatement: "Earth observation datasets (Sentinel-2, Landsat, commercial SAR) are vast, complex, and traditionally siloed behind specialized desktop software. Translating questions like 'Detect deforestation along this river basin between March and October' into coordinate bounding boxes, band math, change detection algorithms, and polygon exports is cognitively taxing and inaccessible to non-GIS specialists.",
    solution: "SatQuery AI pairs a ReAct (Reasoning + Acting) agentic pipeline with local, domain-specific vision models. It decomposes user queries, validates coordinate reference systems (CRS), runs affine pixel-to-metric transformations, coordinates model execution within a 6GB VRAM envelope, and streams progressive telemetry over Server-Sent Events (SSE) before generating standard GeoJSON vectors.",
    architecture: {
      summary: "Three-tier architecture comprising a web dashboard, an agentic orchestration layer, and a specialist vision dispatch pipeline with sequential VRAM offloading.",
      nodes: [
        { name: "Client Dashboard", desc: "Interactive map viewer, coordinate picker, and SSE telemetry log stream." },
        { name: "Query Decomposition (FastAPI)", desc: "Pydantic-validated ReAct agent parsing bounding boxes, dates, and analytical intent." },
        { name: "VRAM Arbiter & Dispatch", desc: "Active memory manager loading/unloading models sequentially to prevent OOM on 6GB VRAM." },
        { name: "Specialist Models", desc: "Florence-2 (Captioning/Grounding), TinyCD (Siamese Change Detection), MobileSAM (Segmentation)." },
        { name: "Geospatial Metrology Engine", desc: "Rasterio/NumPy affine transformation converting pixel masks to real-world metric coordinates and GeoJSON." }
      ]
    },
    technologies: [
      "Python 3.11",
      "FastAPI",
      "Pydantic v2",
      "PyTorch",
      "Qwen2.5-3B",
      "Florence-2-Large",
      "TinyCD",
      "MobileSAM",
      "Rasterio & GDAL",
      "NumPy",
      "Server-Sent Events (SSE)",
      "GeoJSON"
    ],
    technicalDecisions: [
      {
        title: "Sequential VRAM Swapping vs. Model Quantization",
        detail: "Targeting a consumer workstation with an RTX 3050 (6GB VRAM) precluded running Florence-2 and MobileSAM concurrently in memory. Implemented an explicit dynamic model arbiter that loads weights into CUDA, runs forward-pass inference, clears intermediate tensor caches (`torch.cuda.empty_cache()`), and swaps weights before the next pipeline stage."
      },
      {
        title: "Strict Affine Metrology Preservation",
        detail: "Standard computer vision models alter tensor dimensions, stripping spatial metadata. Developed a pipeline wrapper that caches the affine transform matrix (`affine.Affine`) and Coordinate Reference System (CRS) prior to inference, projecting output binary masks back into EPSG:4326 GeoJSON polygons with millimeter precision."
      },
      {
        title: "Local-First Execution Architecture",
        detail: "Designed to run entirely offline on local hardware, ensuring satellite imagery containing sensitive geographical infrastructure never leaves the user's secure perimeter."
      }
    ],
    technicalAccuracyNote: "The repository contains both simulated demonstration harnesses and live model execution pathways. Currently in active prototype status. Not all specialized satellite sensors are live-calibrated; synthetic raster batches are used to test affine and change-detection modules without requiring multi-gigabyte GeoTIFF downloads.",
    futureRoadmap: [
      "Integration of Sentinel-2 API automated tile fetching.",
      "Support for multi-spectral band index calculations (NDVI, NDWI, NBR).",
      "ONNX Runtime fp16 quantization to reduce weight swap latencies."
    ]
  },

  ownly: {
    id: "ownly",
    title: "Ownly",
    subtitle: "Shared ownership. Collective purchasing. Better access.",
    category: "Full-Stack Engineering / Collaborative Commerce",
    status: "Active Development",
    statusType: "active",
    year: "2025–2026",
    role: "Full-Stack Engineer & Product Architect",
    hardwareTarget: "Cloud / Node.js Runtime",
    githubUrl: "https://github.com/Rithvik-bit/Groupby",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "commerce",
    tagline: "Ownly is a collaborative ownership and resource-sharing platform designed to help people collectively purchase assets, share equipment and manage ownership through transparent financial records.",
    overview: "Ownly (maintained publicly under the repository name GroupBuy) addresses the economic barrier of acquiring expensive physical tools, studio gear, and shared resources. By structuring co-ownership groups with transparent financial records, basis-point equity division, and reservation calendars, it transforms fragmented group buys into formal, accountable collaborations.",
    problemStatement: "When groups of creators, students, or small businesses attempt to co-purchase expensive equipment (cameras, 3D printers, software licenses), they rely on messy spreadsheets and informal payment apps. Disagreements inevitably arise over equity splits, usage scheduling, maintenance responsibilities, and buyouts.",
    solution: "A production-grade web application with real-time group collaboration, role-based governance, append-only financial ledgers, and automated fractional ownership calculations. The platform supports collective purchasing groups, shared equipment pools, and commercial venture groups.",
    architecture: {
      summary: "Modern full-stack architecture built on React 19, Express REST APIs, MongoDB Mongoose data models, and bidirectional Socket.IO channels.",
      nodes: [
        { name: "Frontend (React 19 + Vite)", desc: "Tailwind-styled responsive UI with optimistic updates and live reservation calendars." },
        { name: "Auth & Session Security", desc: "JWT access tokens + HTTP-only cookie refresh token rotation with device fingerprinting." },
        { name: "Express REST Engine", desc: "Stateless controllers handling group formation, role RBAC, and contribution validation." },
        { name: "Socket.IO Sync Layer", desc: "Real-time room-based group chat, contribution event streaming, and notification broadcasts." },
        { name: "MongoDB Append-Only Ledger", desc: "Strict schema enforcing immutable financial contributions and basis-point equity distributions." }
      ]
    },
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB & Mongoose",
      "Socket.IO",
      "JWT Authentication",
      "Jest & Supertest"
    ],
    technicalDecisions: [
      {
        title: "Integer-Paise Financial Precision",
        detail: "To avoid JavaScript floating-point errors (e.g. `0.1 + 0.2 !== 0.3`), all currency amounts are stored and calculated strictly as integers in the lowest monetary unit (Indian Paise, 1 INR = 100 paise). Ownership shares are computed using basis points (1 bp = 0.01%) to prevent roundoff equity disputes."
      },
      {
        title: "Append-Only Contribution Logs",
        detail: "Rather than mutating a user's balance or group total directly, every financial interaction is logged as an immutable credit or debit entry. Group balance and member equity are derived from the aggregated transaction chain, guaranteeing an auditable paper trail."
      },
      {
        title: "Refresh-Token Rotation with Reuse Detection",
        detail: "Implemented stateful refresh token families in MongoDB. If an expired or already-used refresh token is presented, the entire family is invalidated immediately to protect against token replay attacks."
      }
    ],
    technicalAccuracyNote: "The current payment system operates with a simulated sandbox mock provider. No real fiat money, escrow services, or production payment gateways are connected. GroupBuy repository name reflects the initial open-source codebase; Ownly is the canonical product brand.",
    futureRoadmap: [
      "Provider-authorized subscription group pooling workflows.",
      "Shared equipment time-slot booking with damage deposit automation.",
      "Legal co-ownership agreement generator with exportable PDF contracts."
    ]
  },

  consentlens: {
    id: "consentlens",
    title: "ConsentLens",
    subtitle: "Understand what you're agreeing to.",
    category: "AI / Privacy Intelligence / Full-Stack",
    status: "Prototype / Development",
    statusType: "prototype",
    year: "2025",
    role: "Full-Stack Developer & Extension Architect",
    hardwareTarget: "Web / Chrome Browser Extension",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: "assets/consentlens.png",
    hasLiveVisual: false,
    visualKind: "privacy",
    tagline: "An AI-powered privacy intelligence product designed to analyze privacy policies, identify potential data-use risks and make complex legal language easier to understand.",
    overview: "ConsentLens acts as an intelligent shield between users and dense terms-of-service contracts. Through a lightweight Manifest V3 Chrome Extension and a Next.js intelligence dashboard, it extracts legal terms, highlights critical data-broker selling clauses, and computes a readable privacy risk index in seconds.",
    problemStatement: "The average terms of service document takes over 30 minutes to read, written in opaque legalese that conceals extensive cross-device tracking, AI training usage, and indefinite data retention rights. Almost 99% of web users accept terms without understanding their actual risk.",
    solution: "A dual-component architecture: a browser extension that detects and extracts policy text from active tabs, and a FastAPI backend powered by the Gemini API (with experimental DeepSeek R1 reasoning chains) that returns structured risk scores, biometric notices, and third-party sharing disclosures.",
    architecture: {
      summary: "Browser extension scraper communicating via authenticated REST API with a Next.js / FastAPI analysis pipeline.",
      nodes: [
        { name: "Chrome Extension (MV3)", desc: "DOM parser detecting privacy policy links and capturing raw legal text from web pages." },
        { name: "FastAPI Analytical Gateway", desc: "Document chunking, boilerplate removal, and rate-limited LLM orchestration." },
        { name: "Gemini API & DeepSeek R1", desc: "Structured zero-shot risk extraction and deep reasoning on clause enforceability." },
        { name: "Privacy Scorecard Engine", desc: "Translates AI classifications into a 5-dimension weighted privacy risk metric." },
        { name: "Next.js Intelligence Portal", desc: "Interactive dashboard displaying historical policy comparisons and change alerts." }
      ]
    },
    technologies: [
      "Next.js",
      "Chrome Extension APIs (MV3)",
      "FastAPI",
      "Python",
      "Gemini API",
      "DeepSeek R1 Integration",
      "Tailwind CSS",
      "Pydantic"
    ],
    technicalDecisions: [
      {
        title: "Heuristic DOM Text Extraction",
        detail: "Legal terms are often nested within iframes or multi-page accordion menus. Built custom DOM traversal algorithms that filter out navigation headers, cookie banners, and ads, preserving only relevant legal paragraphs for LLM consumption."
      },
      {
        title: "Structured JSON Output via Strict Schema",
        detail: "Enforced Pydantic schema validation on LLM output to guarantee consistent risk scoring across 5 categories: Data Retention, Third-Party Sharing, AI Training Rights, Biometric Tracking, and User Arbitration Clauses."
      }
    ],
    technicalAccuracyNote: "ConsentLens is an educational risk analysis tool and does not provide legal advice, legal certification, or statutory compliance guarantees.",
    futureRoadmap: [
      "One-click 'Do Not Sell My Info' automated email generation.",
      "Historical revision diff tracking for privacy policy updates.",
      "Offline local LLM processing via WebGPU (e.g. Chrome Built-in AI)."
    ]
  },

  "redz-bt": {
    id: "redz-bt",
    title: "REDz Bluetooth Audio Router",
    subtitle: "Dual-device audio routing & latency synchronization utility",
    category: "Desktop Development / Audio Engineering",
    status: "Functional Prototype (Windows)",
    statusType: "active",
    year: "2025",
    role: "Desktop Software Engineer",
    hardwareTarget: "Windows 10/11 x64 Desktop",
    githubUrl: "https://github.com/Rithvik-bit/-Redz-Bluetooth-Router",
    liveUrl: null,
    previewImage: "assets/bt.png",
    hasLiveVisual: false,
    visualKind: "audio",
    tagline: "A Windows desktop utility designed to route system audio to two Bluetooth listening devices simultaneously, with independent volume controls and configurable synchronization delays.",
    overview: "Windows natively restricts default audio playback to a single device, preventing two listeners from sharing movies, music, or monitoring feeds using individual Bluetooth headphones. REDz BT provides a custom Python-driven audio loopback engine that captures master system audio and duplicates it across two distinct hardware endpoints with independent volume control and delay tuning.",
    problemStatement: "Unlike macOS which provides Multi-Output Audio Devices natively, Windows requires third-party virtual audio cables that introduce latency, complex driver installation, and high CPU overhead. Users wishing to connect two Bluetooth devices face sound desynchronization due to differing Bluetooth hardware codec latencies (SBC vs AAC vs LDAC).",
    solution: "A standalone Windows desktop app developed using CustomTkinter and PyAudioWPatch (WASAPI loopback). It captures system output in real-time, splits the PCM buffer into two threads, and allows millisecond-level buffer delay adjustments so users can perfectly synchronize audio between disparate headphones.",
    architecture: {
      summary: "Windows WASAPI loopback capture with multithreaded circular buffer playback and NumPy RMS telemetry.",
      nodes: [
        { name: "WASAPI Loopback Capture", desc: "Non-exclusive capture of Windows default audio render endpoint via PyAudioWPatch." },
        { name: "Circular Buffer Splitter", desc: "Splits 48kHz stereo stream into independent FIFO ring buffers for Device A and Device B." },
        { name: "Sync Delay Engine", desc: "Configurable ring buffer latency offset (0–500ms) to counteract Bluetooth codec delays." },
        { name: "Device Output Threads", desc: "Two dedicated worker threads streaming synchronized PCM audio to target devices." },
        { name: "CustomTkinter GUI", desc: "Dark-themed control deck with real-time NumPy RMS level visualizers and volume multipliers." }
      ]
    },
    technologies: [
      "Python 3.11",
      "CustomTkinter",
      "PyAudioWPatch",
      "NumPy",
      "WASAPI Audio API",
      "PyInstaller (Standalone EXE)"
    ],
    technicalDecisions: [
      {
        title: "Driverless WASAPI Loopback",
        detail: "Utilized WASAPI loopback rather than requiring kernel-level virtual audio drivers (like VB-Cable), eliminating driver signing complications and security prompts on modern Windows 11 builds."
      },
      {
        title: "NumPy-Accelerated RMS Telemetry",
        detail: "Real-time audio level meters require computing root-mean-square values on 1024-sample chunks 30 times a second. Optimized audio calculations using vectorized NumPy operations to keep GUI thread load under 2% CPU."
      }
    ],
    technicalAccuracyNote: "Users currently configure the Windows default audio device manually before starting the router to avoid audio loopback feedback. Perfect zero-latency playback is impossible over Bluetooth due to RF and hardware codec buffers; synchronization is achieved via relative delay alignment.",
    futureRoadmap: [
      "Automatic acoustic synchronization beep detection via laptop microphone.",
      "Preset profiles for popular earbuds (Sony WH-1000XM, AirPods, Galaxy Buds).",
      "C++ audio engine rewrite with ASIO support for ultra-low latency."
    ]
  },

  "captions-ai": {
    id: "captions-ai",
    title: "Captions AI",
    subtitle: "Browser-Based AI Video Captioning & Subtitle Synthesis",
    category: "Creative Technology / In-Browser Media Processing",
    status: "Functional Client-Side Prototype",
    statusType: "prototype",
    year: "2025",
    role: "Creative Technologist & Frontend Engineer",
    hardwareTarget: "Modern Web Browsers (WebAssembly)",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: "assets/captions-ai.png",
    hasLiveVisual: false,
    visualKind: "video",
    tagline: "A browser-based AI video captioning and subtitle editing experience connecting speech recognition, subtitle animation and local media processing.",
    overview: "Captions AI brings high-end social media subtitle animation directly into the browser. By leveraging Whisper speech recognition and client-side FFmpeg WebAssembly, it transcribes spoken audio, generates word-by-word dynamic animated subtitles, and renders the composited video without uploading heavy media to paid cloud render servers.",
    problemStatement: "Content creators spend hours manually keyframing kinetic subtitles in Premiere Pro or pay subscription fees to cloud services that upload their private footage to remote servers. Server-side video encoding also incurs heavy cloud compute costs.",
    solution: "A local-first web application where speech transcription and video composition happen directly on the creator's machine. Users can customize font hierarchies, karaoke highlight colors, and text bouncing curves in an interactive timeline editor.",
    architecture: {
      summary: "Client-side pipeline integrating Whisper transcription, Canvas overlay keyframing, and FFmpeg.js WebWorker rendering.",
      nodes: [
        { name: "Local Video Ingestion", desc: "HTML5 File API reading video files into browser memory via Blob streams." },
        { name: "Whisper Speech Parser", desc: "Extracts word-level timestamps, punctuation, and speaker cadence." },
        { name: "Kinetic Canvas Renderer", desc: "Custom HTML5 Canvas rendering dynamic font weights, bounce physics, and highlight boxes." },
        { name: "Timeline Editor UI", desc: "Interactive word scrubbing, typo correction, and animation preset selector." },
        { name: "FFmpeg.js WASM Worker", desc: "Encodes and burns styled subtitle layers back into MP4 format inside a Web Worker." }
      ]
    },
    technologies: [
      "JavaScript ES6+",
      "OpenAI Whisper (Transcriptions)",
      "WebAssembly (WASM)",
      "FFmpeg.js",
      "HTML5 Canvas API",
      "Web Workers",
      "Tailwind CSS"
    ],
    technicalDecisions: [
      {
        title: "Offloading Video Encoding to Web Workers",
        detail: "FFmpeg.js is computationally intensive. Executed all video demuxing, overlay burning, and H.264 re-encoding within a background Web Worker, keeping the browser UI buttery smooth and responsive at 60 FPS."
      },
      {
        title: "Word-Level Time Splitting",
        detail: "Standard SRT files only provide sentence-level intervals. Parsed Whisper's word timestamp arrays into sub-second token units to power modern, short-form viral 'one-word-at-a-time' karaoke text reveals."
      }
    ],
    technicalAccuracyNote: "Prototype demonstrates local client-side processing. Cloud SaaS features (Clerk authentication, Supabase cloud storage, multi-user asset libraries) are documented as planned architectural extensions.",
    futureRoadmap: [
      "Direct WebGPU acceleration for instant Whisper transcription in Chrome.",
      "Multi-language translation with auto-sync phonetic alignment.",
      "Export directly to Adobe Premiere Pro XML / Final Cut Pro FCPXML."
    ]
  },

  "redz-bridge": {
    id: "redz-bridge",
    title: "REDz Bridge",
    subtitle: "Cross-Assistant AI Context Synchronizer",
    category: "Desktop Applications / Productivity / AI",
    status: "Desktop Concept & Prototype",
    statusType: "prototype",
    year: "2025",
    role: "Desktop Software Engineer",
    hardwareTarget: "Cross-Platform Electron (macOS / Windows / Linux)",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: "assets/bridge.png",
    hasLiveVisual: false,
    visualKind: "productivity",
    tagline: "An Electron desktop concept for preserving and transferring useful AI conversation context across ChatGPT, Claude and Gemini.",
    overview: "REDz Bridge eliminates the friction of switching between multiple LLMs. As developers oscillate between Claude for deep architecture reviews, ChatGPT for code snippets, and Gemini for multimodal analysis, project rules and system instructions are repeatedly lost. REDz Bridge acts as a universal context dock invoked via a global keyboard shortcut.",
    problemStatement: "Developers maintain active subscriptions to multiple AI assistants, yet each conversation starts from zero context. Manually copying system prompts, database schemas, and project constraints into each separate browser tab wastes hours every week.",
    solution: "A local-first Electron floating overlay accessible anywhere via `Alt+Space`. It maintains project context packs (rules, schemas, style guidelines) and injects or formats conversation snippets across target AI interfaces using local SQLite storage.",
    architecture: {
      summary: "Lightweight Electron desktop overlay with local SQLite persistence and global OS hotkey listeners.",
      nodes: [
        { name: "Global Hotkey Listener", desc: "Instant toggle via OS-level shortcut (`Alt+Space`) without losing active window focus." },
        { name: "Context Pack Manager", desc: "Structured repository of project markdown docs, schemas, and custom instructions." },
        { name: "Local SQLite Store", desc: "Zero-cloud local encrypted storage guaranteeing proprietary project data stays offline." },
        { name: "Clipboard Synthesizer", desc: "Formats stored context into target-optimized prompts tailored for Claude, GPT, or Gemini." }
      ]
    },
    technologies: [
      "Electron",
      "JavaScript ES6+",
      "SQLite / Local-First Storage",
      "Node.js",
      "HTML5 / CSS3",
      "IPC Architecture"
    ],
    technicalDecisions: [
      {
        title: "Local-First Privacy Architecture",
        detail: "Proprietary code schemas and system prompts are stored exclusively on local disk, ensuring developers working under strict NDA cannot inadvertently leak internal assets to an external cloud database."
      }
    ],
    technicalAccuracyNote: "Prototype stage desktop concept. Validated on Windows desktop environment with local storage persistence.",
    futureRoadmap: [
      "Direct browser extension bridge for seamless auto-injection into web tabs.",
      "Semantic vector search over past project notes and AI transcripts."
    ]
  },

  "course-bot": {
    id: "course-bot",
    title: "Course Bot",
    subtitle: "Vision-Guided Desktop Automation Experiment",
    category: "AI Automation / Desktop Agents",
    status: "Experimental Research Prototype",
    statusType: "experiment",
    year: "2025",
    role: "AI & Automation Engineer",
    hardwareTarget: "Local Desktop Workstation",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: "assets/coursebot.png",
    hasLiveVisual: false,
    visualKind: "automation",
    tagline: "A desktop automation agent designed to interact with AWS learning environments using AI vision and computer interaction.",
    overview: "Course Bot is an experimental automation prototype investigating agentic computer vision. By combining desktop screenshot capture with Gemini Vision reasoning and PyAutoGUI mouse/keyboard execution, it explores how autonomous agents can navigate visual learning interfaces and interact with educational platforms.",
    problemStatement: "Traditional screen scrapers break whenever a button shifts by five pixels or an interface layout updates. True GUI automation requires visual reasoning that understands the semantic meaning of UI controls rather than static screen coordinates.",
    solution: "A Python pipeline that periodically captures desktop framebuffers, sends visual queries to Gemini Vision API with structured bounding box prompts, maps normalized coordinates to screen pixel targets, and executes controlled cursor clicks and keystrokes.",
    architecture: {
      summary: "Sense-Plan-Act agentic loop coupling desktop framebuffer capture with multimodal visual reasoning.",
      nodes: [
        { name: "Framebuffer Grabber", desc: "High-speed screen capture via PIL and Windows GDI." },
        { name: "Vision Reasoning Engine", desc: "Gemini Vision API parsing UI layouts and identifying target interactive controls." },
        { name: "Coordinate Normalizer", desc: "Translates 0–1000 normalized vision coordinates into physical display pixel coordinates." },
        { name: "PyAutoGUI Controller", desc: "Executes human-like mouse paths and keyboard triggers with safety kill-switch boundaries." }
      ]
    },
    technologies: [
      "Python 3.11",
      "Google Gemini Vision API",
      "PyAutoGUI",
      "Pillow (PIL)",
      "OpenCV"
    ],
    technicalDecisions: [
      {
        title: "Corner Fail-Safe Killswitch",
        detail: "Because autonomous mouse movement carries the risk of runaway cursor locks, hardcoded PyAutoGUI's fail-safe to immediately terminate script execution whenever the mouse is slammed into the top-left screen corner."
      }
    ],
    technicalAccuracyNote: "Experimental desktop automation research script. Not intended as an autonomous production-grade tool, and not designed to bypass interactive proctoring.",
    futureRoadmap: [
      "Local vision-language model integration (e.g. Qwen2-VL) for latency reduction.",
      "Multi-monitor coordinate mapping."
    ]
  },

  "vibe-editor": {
    id: "vibe-editor",
    title: "Vibe Editor",
    subtitle: "Natural Language to Adobe After Effects Automation Agent",
    category: "AI / Creative Automation",
    status: "In Development / Research",
    statusType: "experiment",
    year: "2025–2026",
    role: "Creative Technologist & Automation Developer",
    hardwareTarget: "Windows Workstation with Adobe After Effects",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: "assets/vibe.png",
    hasLiveVisual: false,
    visualKind: "creative",
    tagline: "An experimental AI video-editing agent designed to translate editing instructions into actions within Adobe After Effects.",
    overview: "Vibe Editor bridges commercial video editing with generative language models. Instead of manually searching through deep effect trees and setting keyframes, editors speak natural language commands ('add a cinematic camera shake on the beat drop and zoom into the subject'), which the agent translates into executable Adobe ExtendScript commands.",
    problemStatement: "Video post-production involves repetitive timeline assembly: applying standard color grades, adding motion graphics transitions, and matching cuts to audio beats. These tasks waste valuable creative time.",
    solution: "A desktop agent coupling Gemini API with After Effects scripting APIs and GUI triggers, translating creative instructions into concrete keyframes and effect parameters.",
    architecture: {
      summary: "Natural language parser mapping creative prompts to Adobe ExtendScript code snippets and timeline commands.",
      nodes: [
        { name: "Prompt Parser", desc: "Gemini API interpreting creative editing commands into timeline operations." },
        { name: "ExtendScript Generator", desc: "Synthesizes After Effects DOM script files (`.jsx`) with validated layer and property targets." },
        { name: "After Effects Bridge", desc: "Executes scripts directly inside active Adobe After Effects compositions." }
      ]
    },
    technologies: [
      "Python",
      "Google Gemini API",
      "Adobe After Effects ExtendScript (JSX)",
      "PyAutoGUI"
    ],
    technicalDecisions: [
      {
        title: "ExtendScript Generation over Blind Mouse Clicks",
        detail: "Prioritized generating native Adobe ExtendScript files over blind GUI clicking. Direct script execution manipulates layers via After Effects' internal C++ engine, guaranteeing 100% precision regardless of UI scaling."
      }
    ],
    technicalAccuracyNote: "In development as an experimental creative automation workflow. Not a commercially packaged plug-in.",
    futureRoadmap: [
      "Beat-grid audio detection synchronization.",
      "Support for Adobe Premiere Pro and DaVinci Resolve scripting."
    ]
  },

  carspec: {
    id: "carspec",
    title: "CarSpec",
    subtitle: "Interactive Automotive Discovery & Comparison Platform",
    category: "Frontend Development / UI Engineering",
    status: "Completed Prototype",
    statusType: "completed",
    year: "2024",
    role: "Lead Frontend Engineer",
    hardwareTarget: "Modern Web Browsers",
    githubUrl: "https://github.com/Rithvik-bit/carspecwork",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "automotive",
    tagline: "An automotive discovery and comparison website that helps users explore vehicles through filtering, search and comparison interfaces.",
    overview: "CarSpec is a responsive web application designed for car enthusiasts and buyers. It features an extensive vehicle catalog, multi-attribute filter system, side-by-side spec comparison, and an interactive loan EMI calculator built using high-performance vanilla JavaScript and GSAP animations.",
    problemStatement: "Automotive portal websites are notoriously cluttered with slow ads, sluggish filter re-renders, and clumsy comparison tools that fail on mobile devices.",
    solution: "A clean, highly responsive automotive portal built with semantic HTML5, modern CSS Grid layouts, GSAP scroll triggers, and a fast client-side filtering engine handling over 80 vehicle entries with zero lag.",
    architecture: {
      summary: "Lightweight, zero-framework client-side architecture with GSAP animation choreography and Python data prep.",
      nodes: [
        { name: "Vehicle Catalog Engine", desc: "80+ vehicle dataset with high-speed client-side attribute filtering." },
        { name: "Comparison Matrix", desc: "Side-by-side spec comparison highlighting differences in power, torque, mileage, and price." },
        { name: "Financial EMI Calculator", desc: "Interactive sliders computing monthly payments, total interest, and amortization visualizers." },
        { name: "GSAP Animation Pipeline", desc: "Hardware-accelerated entrance animations, hover states, and smooth card reveals." }
      ]
    },
    technologies: [
      "HTML5",
      "CSS3 & Flexbox/Grid",
      "JavaScript (ES6+)",
      "GSAP (GreenSock Animation Platform)",
      "Python (Data Preparation & Scraping)"
    ],
    technicalDecisions: [
      {
        title: "Framework-Free Performance",
        detail: "Built using vanilla DOM manipulation to achieve instantaneous search response times and maintain an ultra-lightweight initial page load without bundle bloat."
      },
      {
        title: "Dynamic Loan Math Visualization",
        detail: "Implemented standard automotive loan equations (`E = P × r × (1 + r)^n / ((1 + r)^n - 1)`) with instant SVG donut chart updates as the user drags loan tenure and down-payment sliders."
      }
    ],
    technicalAccuracyNote: "Completed academic prototype. Some dataset specifications were programmatically generated for demonstration purposes and should not be used as official vehicle purchase quotes.",
    futureRoadmap: [
      "Integration with live dealer pricing APIs.",
      "3D vehicle model viewer via Three.js."
    ]
  },

  /* PROJECTS WORKED ON WITH ANTIGRAVITY ON PC */
  "iris-agent": {
    id: "iris-agent",
    title: "Iris / In-PC Agent REDz",
    subtitle: "Local Desktop Autonomous Assistant & System Orchestrator",
    category: "Agentic Systems / Local AI / Desktop Automation",
    status: "Active Workstation Project (Antigravity)",
    statusType: "active",
    year: "2026",
    role: "AI Systems Engineer",
    hardwareTarget: "Local Windows PC",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "agent",
    tagline: "An autonomous desktop intelligence agent developed on PC with Antigravity, executing system diagnostics, workspace orchestration, and visual reasoning.",
    overview: "Developed on-device using Antigravity, Iris (In-PC Agent REDz) investigates true local desktop autonomy. Acting as an operating-system copilot, it bridges file system operations, process monitoring, and multi-model reasoning directly within the local Windows development environment.",
    problemStatement: "Cloud-based AI assistants lack local filesystem context, cannot inspect running processes, and cannot manipulate desktop development environments without tedious manual copy-pasting.",
    solution: "An agentic system capable of orchestrating local project tasks, monitoring background scripts, and interacting with user desktop workspaces with strict permission boundaries.",
    architecture: {
      summary: "Local agentic loop interfacing with Windows terminal, workspace file structures, and local model endpoints.",
      nodes: [
        { name: "Workspace Observer", desc: "Inspects active repository state, git status, and process diagnostics." },
        { name: "Model Intelligence Core", desc: "Reasoning loop coordinating task execution and validation." },
        { name: "System Command Execution", desc: "Sandboxed command-line runner executing build tasks and test suites." }
      ]
    },
    technologies: [
      "Python",
      "Antigravity Agent Framework",
      "PowerShell & Windows APIs",
      "Gemini API & Local LLMs",
      "JSONL Transcripts"
    ],
    technicalDecisions: [
      {
        title: "Permission-Gated Sandbox Execution",
        detail: "Designed tool execution with explicit sandboxing to ensure destructive system commands cannot run without safety boundaries."
      }
    ],
    technicalAccuracyNote: "Active internal project developed on PC with Antigravity. Features local autonomous workflow execution.",
    futureRoadmap: [
      "Voice interaction layer with local Whisper and Piper TTS.",
      "Cross-project memory graph persistence."
    ]
  },

  "airdraw": {
    id: "airdraw",
    title: "AirDraw",
    subtitle: "Contactless Computer Vision Drawing Canvas",
    category: "Computer Vision / Interactive Technology",
    status: "Active Prototype (Desktop)",
    statusType: "prototype",
    year: "2026",
    role: "Computer Vision Developer",
    hardwareTarget: "Standard Webcam / PC",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "vision",
    tagline: "Real-time webcam computer vision interface converting hand gestures into digital brushstrokes on a virtual canvas.",
    overview: "AirDraw allows users to sketch in mid-air using hand gestures captured through a standard laptop webcam. By processing 21 hand landmarks in real-time, it differentiates between pointing (drawing), pinching (color selection), and open-palm (canvas clearing) gestures without requiring specialized hardware.",
    problemStatement: "Digital drawing tablets are expensive and tether users to physical pads. Contactless interfaces provide an engaging medium for presentations, digital whiteboards, and interactive creative installations.",
    solution: "A computer vision pipeline utilizing OpenCV and MediaPipe landmark tracking to compute fingertip velocities, smooth coordinate jitter via moving-average filters, and render smooth anti-aliased strokes on a transparent virtual overlay.",
    architecture: {
      summary: "30 FPS computer vision pipeline mapping webcam frames to virtual coordinate planes.",
      nodes: [
        { name: "Video Capture", desc: "Webcam frame acquisition with OpenCV." },
        { name: "MediaPipe Hand Mesh", desc: "Identifies 21 3D hand coordinates per frame with landmark confidence scoring." },
        { name: "Gesture Recognition", desc: "Finite state machine tracking finger tip distances to detect draw, hover, and erase modes." },
        { name: "Canvas Blending", desc: "Alpha-compositing user strokes over the live video preview at low CPU overhead." }
      ]
    },
    technologies: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "NumPy"
    ],
    technicalDecisions: [
      {
        title: "Exponential Smoothing for Hand Jitter",
        detail: "Raw webcam landmark coordinates exhibit micro-tremors. Implemented an exponential moving average (EMA) filter on index fingertip coordinates, producing fluid lines while maintaining sub-15ms responsiveness."
      }
    ],
    technicalAccuracyNote: "Desktop prototype validated on local camera setups. Performance depends on ambient lighting and webcam frame rates.",
    futureRoadmap: [
      "Export to SVG and raster PNG files.",
      "Multi-hand collaborative drawing modes."
    ]
  },

  "snap-vanish": {
    id: "snap-vanish",
    title: "Snap-Vanish",
    subtitle: "Local Media Privacy & Ephemeral Scrubbing Engine",
    category: "AI & Privacy / Media Processing",
    status: "Active Workstation Project (Antigravity)",
    statusType: "active",
    year: "2026",
    role: "Systems & Privacy Engineer",
    hardwareTarget: "Local Desktop",
    githubUrl: "https://github.com/Rithvik-bit",
    liveUrl: null,
    previewImage: null,
    hasLiveVisual: true,
    visualKind: "privacy",
    tagline: "Privacy-focused utility for stripping EXIF telemetry, metadata, and sensitive visual details before media sharing.",
    overview: "Snap-Vanish is an on-device utility for creators and individuals who share photos and video assets online. It strips embedded GPS coordinates, camera serial numbers, and device fingerprints from media files, with optional AI face and license plate anonymization.",
    problemStatement: "Smartphones and modern cameras embed detailed personal data (precise GPS location, timestamp, hardware IDs) inside every captured file, exposing users to physical tracking and privacy leakage when photos are posted online.",
    solution: "A fast, local tool that completely scrubs EXIF metadata chunks, re-encodes compressed image pixels without quality loss, and guarantees that shared assets carry zero residual digital fingerprints.",
    architecture: {
      summary: "Local media parser stripping binary EXIF blocks and validating output hashes.",
      nodes: [
        { name: "Metadata Extractor", desc: "Scans and flags GPS, camera model, and lens serial numbers." },
        { name: "Sanitization Engine", desc: "Strips non-essential metadata headers while preserving color profiles." },
        { name: "Integrity Verifier", desc: "Calculates SHA-256 before-and-after hashes to ensure no unintended payload tampering." }
      ]
    },
    technologies: [
      "Python",
      "Pillow",
      "ExifTool Engine",
      "FastAPI"
    ],
    technicalDecisions: [
      {
        title: "Byte-Level Header Stripping",
        detail: "Rather than recompressing images (which causes generational JPEG artifacting), Snap-Vanish strips metadata at the binary container level, preserving 100% of the original pixel fidelity."
      }
    ],
    technicalAccuracyNote: "Active utility developed on PC with Antigravity. Strictly local processing with no external network calls.",
    futureRoadmap: [
      "Automated face and license-plate blur using lightweight local YOLO models.",
      "Cross-platform drag-and-drop desktop UI."
    ]
  }
};

export const creativeWork = [
  {
    id: "mitra-medicare",
    title: "Mitra Medicare Hospitals — Healthcare Content & Podcast Clipping",
    client: "Mitra Medicare Hospitals",
    category: "Healthcare · Podcast & Reel Post-Production",
    year: "2026",
    role: "Founder & Lead Post-Production Editor (REDz)",
    outcome: "30+ verified podcast clips delivered; 17 reels recorded in September 2026",
    metrics: "30+ Podcast Clips Delivered · 17 Mitra Reels Recorded · ₹5,950 Sept Reel Records",
    objective: "Transform long-form medical discussions and specialist insights into patient-friendly, high-retention vertical clips for social and community distribution.",
    concept: "Clear conversational editing, active speaker framing, medical terminology titling, crisp subtitle pacing, and clean branded lower thirds tailored to patient education.",
    productionRole: "Post-production architecture, content selection from long-form recordings, audio equalization, and delivery pipeline management.",
    editingRole: "Short-form video editing, vertical reframing (9:16), audio denoising, dynamic captioning, and brand-consistent color profiles.",
    tools: ["CapCut", "Adobe Premiere Pro", "Adobe Photoshop"],
    disclaimer: "Verified delivery records: 30+ podcast clips delivered; 17 reels recorded in September 2026 with documented ₹5,950 reel billing. Maintained as distinct deliverable categories."
  },
  {
    id: "brandnest-marketing",
    title: "BrandNest Digital Marketing — Scalable Post-Production Partnership",
    client: "BrandNest Digital Marketing",
    category: "Digital Marketing · Agency Editing Support",
    year: "2024–2026",
    role: "Post-Production Partner (REDz)",
    outcome: "Ongoing commercial and social media post-production delivery pipeline",
    metrics: "Recurring Deliverables · Multi-Brand Reel Editing · Scalable Agency Turnaround",
    objective: "Provide reliable, professional post-production capacity for agency client campaigns across retail, lifestyle, and corporate domains.",
    concept: "Modular vertical video frameworks with 3-second visual hooks, structured narrative bodies, clean motion typography, and unambiguous conversion calls-to-action.",
    productionRole: "Workflow coordination, creative brief intake, template architecture, and review iteration management.",
    editingRole: "High-volume commercial reel editing, podcast clipping, audio enhancement, kinetic typography, and multi-format master exports.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "CapCut"],
    disclaimer: "Ongoing client relationship involving professional content delivery. Private commercial rates and client financial details are kept strictly confidential."
  },
  {
    id: "jaeyunmi9-salon",
    title: "Jaeyunmi9 Unisex Salon — Brand Launch & Content Package",
    client: "Jaeyunmi9 Unisex Salon",
    category: "Beauty & Personal Care · Monthly Content Suite",
    year: "2026",
    location: "Kakinada, Andhra Pradesh",
    role: "Founder & Creative Lead (REDz)",
    outcome: "Initial monthly package: 12 reels delivered + 4 promotional posters (₹5,000)",
    metrics: "12 Targeted Reels · 4 Promotional Posters · ₹5,000 Monthly Package",
    objective: "Establish modern salon aesthetic, showcase haircut and grooming transformations, and attract local clientele in Kakinada through trend-aware vertical video.",
    concept: "Before-and-after transformation cuts, macro hair-styling textures, ambient salon sound design, and localized Telugu-English lifestyle hooks.",
    productionRole: "Basic content planning, scripting direction, shot list recommendations, and campaign timeline scheduling.",
    editingRole: "Reel editing, captions and subtitle styling, color enhancement for natural skin and hair tones, trend audio synchronization, and 4 promotional social posters.",
    tools: ["Adobe Premiere Pro", "CapCut", "Adobe Photoshop"],
    disclaimer: "Client acquisition and content delivery case study. Initial monthly package executed at ₹5,000 including 12 reels and 4 complimentary promotional posters."
  },
  {
    id: "mobile-mania",
    title: "Mobile Mania — High-Conversion Retail Campaign",
    client: "Mobile Mania",
    category: "Retail & Commercial Video",
    year: "2024",
    role: "Founder & Lead Editor (REDz)",
    outcome: "First reel generated a physical smartphone sale within 24 hours of posting",
    metrics: "Documented 24h Retail Sale · Regional Footfall Conversion",
    objective: "Drive local footfall and immediate device inquiries for a regional mobile retail outlet through high-energy, product-focused Instagram Reels.",
    concept: "Shifted away from generic static flyers to cinematic macro transitions, dynamic sound design, and an urgent price-to-value hook addressing regional smartphone buyers.",
    productionRole: "Cinematography planning, lighting setup for reflective smartphone glass, on-location shooting.",
    editingRole: "Custom pacing, sound design, whip transitions, kinetic typography in Telugu and English.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "CapCut"],
    disclaimer: "Phone sale within 24 hours was reported by the store owner following campaign launch. Shared as a client case study context."
  },
  {
    id: "smart-ev-zone",
    title: "Smart EV Zone — Clean Mobility Campaign",
    client: "Smart EV Zone",
    category: "Automotive & Electric Mobility",
    year: "2024–2025",
    role: "Cinematographer & Motion Editor (REDz)",
    outcome: "Established modern visual identity for regional electric vehicle dealership",
    metrics: "Dealership Visual Identity · Rolling Vehicle Cinematography",
    objective: "Highlight the smooth performance, battery economics, and sleek design of next-generation electric two-wheelers for urban commuters.",
    concept: "Dynamic rolling vehicle shots, low-angle gimbal tracking, and sleek typographic motion displaying real-world range and savings.",
    productionRole: "Gimbal vehicle-tracking shots, outdoor lighting choreography, golden-hour pacing.",
    editingRole: "Color grading for modern teal-and-crimson automotive palette, sound synthesis for whisper-quiet EV acceleration.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "Gimbal Stabilization"],
    disclaimer: "Brand campaign produced in collaboration with regional automotive stakeholders."
  },
  {
    id: "srikar-jewellers",
    title: "Srikar Jewellers — Heritage & Filigree Elegance",
    client: "Srikar Jewellers",
    category: "Luxury & Jewellery",
    year: "2024",
    role: "Cinematographer & Colorist (REDz)",
    outcome: "High-engagement festive showroom showcase",
    metrics: "Macro Filigree Cinematography · Warm Amber Festive Lighting",
    objective: "Capture intricate craftsmanship and festive bridal collections with premium editorial lighting and cinematic intimacy.",
    concept: "Macro lens close-ups on gold filigree, warm amber lighting, and slow, rhythmic pacing set to traditional ambient instrumentation.",
    productionRole: "Precision macro lighting, turntable product capture, shallow depth-of-field cinematography.",
    editingRole: "Warm gold color grading, sparkle highlight enhancement, elegant editorial typography.",
    tools: ["Adobe Premiere Pro", "Adobe Photoshop", "Precision Studio Lighting"],
    disclaimer: "Showroom campaign developed for festive seasonal promotions."
  }
];

export const skillsData = {
  categories: [
    {
      id: "programming",
      name: "Programming & Fundamentals",
      filterGroup: "engineering",
      skills: [
        { name: "Python", type: "proven", desc: "FastAPI, PyTorch, NumPy, desktop automation, machine learning pipelines" },
        { name: "JavaScript (ES6+)", type: "proven", desc: "Async/await, DOM APIs, Canvas, Web Workers, modern closures" },
        { name: "C", type: "academic", desc: "Memory allocation, pointers, low-level data structures, system architecture" },
        { name: "Java", type: "academic", desc: "Object-oriented design, threading, core collections, enterprise foundations" },
        { name: "HTML5 & CSS3", type: "proven", desc: "Semantic markup, modern Grid/Flexbox, CSS custom properties, responsive design" },
        { name: "Data Structures & Algorithms", type: "academic", desc: "Graph traversal, dynamic programming, trees, algorithmic efficiency" },
        { name: "SQL", type: "proven", desc: "Relational queries, indexing, joins, database schema normalization" }
      ]
    },
    {
      id: "frontend",
      name: "Frontend Engineering",
      filterGroup: "fullstack",
      skills: [
        { name: "React 19", type: "proven", desc: "Hooks, server components, optimistic UI, state machines" },
        { name: "Next.js", type: "proven", desc: "App router, SSR/SSG, route handlers, server actions" },
        { name: "Vite", type: "proven", desc: "Fast HMR build configurations, bundle optimization" },
        { name: "Tailwind CSS", type: "proven", desc: "Design systems, responsive utilities, custom token integration" },
        { name: "GSAP", type: "proven", desc: "ScrollTrigger, timeline choreography, kinetic typography" },
        { name: "Three.js & WebGL", type: "explored", desc: "3D scene graphs, lighting, orbit controls, custom shaders" },
        { name: "Responsive UI Architecture", type: "proven", desc: "Mobile-first layouts, touch targets, accessibility WCAG AA" }
      ]
    },
    {
      id: "backend",
      name: "Backend Engineering",
      filterGroup: "fullstack",
      skills: [
        { name: "Node.js & Express.js", type: "proven", desc: "RESTful API design, middleware chains, token validation" },
        { name: "FastAPI", type: "proven", desc: "Asynchronous Python web services, Pydantic type validation, OpenAPI" },
        { name: "Pydantic v2", type: "proven", desc: "Strict schema serialization, JSON validation, settings management" },
        { name: "Socket.IO & WebSockets", type: "proven", desc: "Bidirectional real-time state sync, room routing, chat streams" },
        { name: "Server-Sent Events (SSE)", type: "proven", desc: "Unidirectional telemetry streaming for AI inference" },
        { name: "JWT & Token Rotation", type: "proven", desc: "HTTP-only cookie auth, refresh token family replay protection" }
      ]
    },
    {
      id: "database",
      name: "Database & Infrastructure",
      filterGroup: "fullstack",
      skills: [
        { name: "MongoDB & Mongoose", type: "proven", desc: "Document modeling, aggregation pipelines, append-only logs" },
        { name: "Supabase & Postgres", type: "explored", desc: "Row-level security, relational data, storage buckets" },
        { name: "Firebase (Firestore & Auth)", type: "proven", desc: "Real-time document sync, client authentication rules" },
        { name: "Git & GitHub", type: "proven", desc: "Feature branching, pull requests, version control hygiene" },
        { name: "Vercel Deployment", type: "proven", desc: "Edge deployment, environment management, preview pipelines" }
      ]
    },
    {
      id: "applied-ai",
      name: "Applied AI & Machine Learning",
      filterGroup: "engineering",
      skills: [
        { name: "Gemini API & Google GenAI", type: "proven", desc: "Multimodal perception, structured JSON output, vision prompts" },
        { name: "Agentic Systems (ReAct)", type: "proven", desc: "Reasoning and acting loops, query decomposition, tool use" },
        { name: "Qwen2.5-3B", type: "proven", desc: "Lightweight local LLM deployment for query planning" },
        { name: "DeepSeek R1", type: "explored", desc: "Chain-of-thought reasoning integration for complex document parsing" },
        { name: "Florence-2-Large", type: "proven", desc: "Visual grounding, dense region captioning, spatial tags" },
        { name: "TinyCD & MobileSAM", type: "proven", desc: "Siamese change detection and memory-efficient segmentation" },
        { name: "Whisper", type: "proven", desc: "Speech recognition, word-level timestamps, in-browser WASM" },
        { name: "PyTorch & VRAM Management", type: "proven", desc: "CUDA memory cache arbitration, sequential offloading for 6GB GPUs" },
        { name: "LoRA Workflows", type: "explored", desc: "Fine-tuning exploration and parameter-efficient adaptation" }
      ]
    },
    {
      id: "desktop-creative",
      name: "Desktop & Creative Systems",
      filterGroup: "engineering",
      skills: [
        { name: "Electron", type: "proven", desc: "Cross-platform desktop packaging, IPC communication, global shortcuts" },
        { name: "CustomTkinter", type: "proven", desc: "Modern dark desktop GUIs with Python" },
        { name: "PyAudioWPatch (WASAPI)", type: "proven", desc: "Loopback audio capture, dual-stream buffer routing" },
        { name: "WebAssembly & FFmpeg.js", type: "proven", desc: "Client-side video rendering and audio demuxing in Web Workers" },
        { name: "PyAutoGUI", type: "proven", desc: "Desktop automation, synthetic cursor motion, fail-safe boundaries" },
        { name: "PyInstaller", type: "proven", desc: "Compiling standalone Windows executables with embedded assets" }
      ]
    },
    {
      id: "creative-tools",
      name: "Creative & Production Tools",
      filterGroup: "creative",
      skills: [
        { name: "Adobe Premiere Pro", type: "proven", desc: "Multi-track commercial cutting, pacing, audio mixing" },
        { name: "Adobe After Effects", type: "proven", desc: "Motion graphics, kinetic type, screen replacements, visual effects" },
        { name: "DaVinci Resolve", type: "proven", desc: "Color grading, log profile normalization, cinematic tone curves" },
        { name: "Adobe Photoshop", type: "proven", desc: "Asset preparation, image retouching, brand guidelines" },
        { name: "Figma", type: "proven", desc: "UI wireframing, component design, responsive layout prototypes" },
        { name: "CapCut", type: "proven", desc: "Fast-turnaround vertical social media formatting and pacing" }
      ]
    },
    {
      id: "creative-disciplines",
      name: "Creative Disciplines",
      filterGroup: "creative",
      skills: [
        { name: "Cinematography", type: "proven", desc: "Gimbal camera movement, lighting, lens selection, composition" },
        { name: "Commercial Video Production", type: "proven", desc: "Retail campaigns, automotive commercials, product storytelling" },
        { name: "Creative Direction", type: "proven", desc: "Guiding brand narratives from storyboard to final delivery" },
        { name: "Visual Storytelling", type: "proven", desc: "Attention hooks, emotional arc, rhythm, audio-visual alignment" },
        { name: "Scriptwriting", type: "proven", desc: "Telugu-English bilingual copywriting for regional retail brands" },
        { name: "Content Strategy", type: "proven", desc: "Retention-driven social media formatting and publishing cycles" }
      ]
    },
    {
      id: "product-business",
      name: "Product & Business",
      filterGroup: "creative",
      skills: [
        { name: "Founder Leadership (REDz)", type: "proven", desc: "Venture operations, client relations, commercial proposals" },
        { name: "MVP Architecture", type: "proven", desc: "Scoping core features, rapid prototyping, technical risk mitigation" },
        { name: "Client Management", type: "proven", desc: "Deliverable timelines, stakeholder communication, feedback loops" },
        { name: "Team Coordination", type: "proven", desc: "Managing freelance video editors, asset pipelines, quality control" },
        { name: "Brand Positioning", type: "proven", desc: "Target audience definition, value proposition, identity consistency" }
      ]
    }
  ]
};

