// Optimized icon imports - only import what we actually use
// This reduces bundle size significantly by tree-shaking unused icons

// Navigation & UI icons
export { Home, FileText, Search, FolderOpen } from '@lucide/svelte';

// Theme toggle
export { Sun, Moon } from '@lucide/svelte';

// Search dialog
export { X, Hash, Calendar, Clock, BookOpen, Scroll } from '@lucide/svelte';

// Project gallery
export {
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	ChevronUp,
	Maximize2,
	X as CloseIcon,
	Download,
	ZoomIn,
	ZoomOut,
	RotateCcw,
	Play
} from '@lucide/svelte';

export { GitBranch } from '@lucide/svelte';

// Contact & social
export { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from '@lucide/svelte';

// Project actions
export { ExternalLink, ArrowLeft, ArrowRight } from '@lucide/svelte';

// Content footer icons
export { Tag, User, Share2, Heart } from '@lucide/svelte';

// Heading links
export { Link } from '@lucide/svelte';

// Callout types
export { AlertTriangle, Info, CheckCircle, XCircle, AlertCircle, Eye } from '@lucide/svelte';

// Enhanced components
export { Copy, Check } from '@lucide/svelte';

// Tech icons fallbacks (used in techIcons.ts)
export { Code, Zap, Database, Globe, Smartphone, Monitor } from '@lucide/svelte';

// Additional home page icons
export { ArrowDown, Coffee, Sparkles, Palette, Folder, MessageCircle, Award } from '@lucide/svelte';

// About page icons
export { TestTube, Layers, Shield, Target, Lightbulb } from '@lucide/svelte';

// Re-export the icon type for TypeScript
export type { Icon } from '@lucide/svelte';

export { Facebook } from '@lucide/svelte';
