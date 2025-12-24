import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bell, 
  Calendar, 
  Inbox, 
  Shield, 
  Check, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Settings, 
  Clock, 
  Zap, 
  Menu,
  MoreHorizontal,
  ArrowRight,
  Filter,
  Type,
  GraduationCap,
  CreditCard,
  MessageCircle,
  Hash,
  Camera,
  Mail,
  TrendingUp,
  Video
} from 'lucide-react';

/**
 * FocusAI - Design Tokens & Configuration
 * * Colors:
 * - Bg: #FAFBF9
 * - Surface: #FFFFFF
 * - Accent Sage: #84A98C
 * - Text Primary: #0F1724
 * - Muted: #A7B6A4
 */

// --- Dataset ---
const INITIAL_DATA = [
  {"id":"n1","app":"Canvas","category":"Education","title":"DSA Assignment Submission","time":"2025-12-24T23:59:00","urgency":true,"sourceLink":"Canvas link"},
  {"id":"new1","app":"Google Meet","category":"Work","title":"Online Hackathon Demo","time":"2025-12-24T15:00:00","urgency":true,"sourceLink":"Join meeting"},
  {"id":"n12","app":"Email","category":"Work","title":"Interview invitation received","time":"2025-12-24T14:30:00","urgency":true,"sourceLink":"Open email"},
  {"id":"n2","app":"Stocks","category":"Finance","title":"Portfolio up 5.2% (+$1,240) today","time":"2025-12-24T07:15:00","urgency":true,"sourceLink":"View portfolio"},
  {"id":"n3","app":"WhatsApp","category":"Family","title":"Mom called twice","time":"2025-12-24T06:50:00","urgency":true,"sourceLink":"Open chat"},
  {"id":"n6","app":"Email","category":"Work","title":"HR: Policy update","time":"2025-12-23T18:45:00","urgency":false,"sourceLink":"Open email"},
  {"id":"n9","app":"WhatsApp","category":"Social","title":"Group chat: Weekend plan","time":"2025-12-22T16:00:00","urgency":false,"sourceLink":"Open chat"}
];

// --- Components ---

const Header = ({ title, showFontToggle, onToggleFont, isLargeFont }) => (
  <div className="flex items-center justify-between px-6 py-5 bg-[#FAFBF9]/80 backdrop-blur-md sticky top-0 z-20">
    <h1 className={`font-bold text-[#0F1724] ${isLargeFont ? 'text-2xl' : 'text-xl'} tracking-tight`}>
      {title}
    </h1>
    <div className="flex gap-3">
      {showFontToggle && (
        <button 
          onClick={onToggleFont} 
          className="p-2 rounded-full bg-white shadow-sm text-[#0F1724] active:scale-95 transition-transform"
          aria-label="Toggle Font Size"
        >
          <Type size={18} />
        </button>
      )}
      <div className="w-8 h-8 rounded-full bg-[#84A98C] flex items-center justify-center text-white text-xs font-bold shadow-md">
        JS
      </div>
    </div>
  </div>
);

const FAB = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute bottom-24 right-6 w-14 h-14 bg-[#0F1724] rounded-2xl shadow-xl flex items-center justify-center text-white active:scale-90 transition-transform z-30"
  >
    <Shield size={24} />
  </button>
);

const Toast = ({ message, onUndo, isVisible }) => (
  <div className={`absolute bottom-24 left-6 right-6 bg-[#0F1724] text-white py-3 px-4 rounded-xl shadow-2xl flex justify-between items-center transition-all duration-300 z-40 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
    <span className="text-sm font-medium">{message}</span>
    {onUndo && (
      <button onClick={onUndo} className="text-[#84A98C] text-sm font-bold px-2 py-1 rounded hover:bg-white/10 transition-colors">
        Undo
      </button>
    )}
  </div>
);

const PriorityCard = ({ notification, onDone, isLargeFont }) => (
  <div className="group relative w-full bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,36,0.06)] mb-4 active:scale-[0.98] transition-all duration-200 border border-transparent hover:border-[#84A98C]/20 overflow-hidden">
    
    {/* Card Content */}
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAFBF9] text-[#556052] text-[11px] font-semibold uppercase tracking-wider">
          {notification.app}
        </span>
        <div className={`w-2 h-2 rounded-full ${notification.urgency ? 'bg-[#E57373]' : 'bg-[#84A98C]'}`} />
      </div>
      
      <h3 className={`font-semibold text-[#0F1724] mb-1 leading-snug ${isLargeFont ? 'text-lg' : 'text-base'}`}>
        {notification.title}
      </h3>
      
      <div className="flex items-center gap-1.5 mt-3 text-[#84A98C] text-xs font-medium">
        <Zap size={12} />
        <span>Prioritized: {notification.category} + {notification.urgency ? 'Urgent' : 'Timeline'}</span>
      </div>
    </div>

    {/* Actions */}
    <div className="absolute top-4 right-4 flex gap-2">
      <button 
        onClick={() => onDone(notification.id)}
        className="w-8 h-8 rounded-full bg-[#FAFBF9] flex items-center justify-center text-[#A7B6A4] hover:bg-[#84A98C] hover:text-white transition-colors"
      >
        <Check size={16} />
      </button>
    </div>
  </div>
);

const MorningBriefingCard = ({ blockedCount, onDemo, isLargeFont }) => (
  <div className="w-full bg-gradient-to-br from-[#84A98C] to-[#6B8E73] rounded-[18px] p-6 shadow-lg mb-6 text-white relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3 opacity-90">
        <Shield size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">FocusAI Briefing</span>
      </div>
      <h2 className={`${isLargeFont ? 'text-2xl' : 'text-xl'} font-bold mb-2`}>Good Morning.</h2>
      <p className={`${isLargeFont ? 'text-base' : 'text-sm'} opacity-90 leading-relaxed mb-4`}>
        I blocked <strong>{blockedCount} notifications</strong> while you slept. Here are the 4 things that actually matter right now.
      </p>
      {/* Visual only demo link for the prototype */}
      <button onClick={onDemo} className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
        Recalculate Priorities
      </button>
    </div>
  </div>
);

const AppAccordion = ({ appName, count, notifications, onOpenItem, isLargeFont }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to get styles based on app name
  const getAppStyles = (name) => {
    switch (name) {
      case 'Canvas': return { bg: 'bg-red-50', text: 'text-red-600' };
      case 'Stocks': return { bg: 'bg-emerald-50', text: 'text-emerald-600' };
      case 'WhatsApp': return { bg: 'bg-green-50', text: 'text-green-600' };
      case 'Slack': return { bg: 'bg-purple-50', text: 'text-purple-600' };
      case 'Instagram': return { bg: 'bg-pink-50', text: 'text-pink-600' };
      case 'Email': return { bg: 'bg-blue-50', text: 'text-blue-600' };
      case 'Bank': return { bg: 'bg-yellow-50', text: 'text-yellow-600' };
      case 'Google Meet': return { bg: 'bg-blue-50', text: 'text-blue-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const styles = getAppStyles(appName);

  // Helper to get icon based on app name
  const getAppIcon = (name) => {
    switch (name) {
      case 'Canvas': return <GraduationCap size={20} />;
      case 'Bank': return <CreditCard size={20} />;
      case 'Stocks': return <TrendingUp size={20} />;
      case 'WhatsApp': return <MessageCircle size={20} />;
      case 'Slack': return <Hash size={20} />;
      case 'Instagram': return <Camera size={20} />;
      case 'Email': return <Mail size={20} />;
      case 'Google Meet': return <Video size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-[18px] shadow-sm mb-3 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.bg} ${styles.text}`}>
            {getAppIcon(appName)}
          </div>
          <div className="text-left">
            <h3 className={`font-semibold text-[#0F1724] ${isLargeFont ? 'text-lg' : 'text-base'}`}>{appName}</h3>
            <p className="text-xs text-[#A7B6A4]">{count} notifications</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-[#A7B6A4] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-100 bg-[#FAFBF9]/50">
          {notifications.map(n => (
            <div key={n.id} onClick={() => onOpenItem(n)} className="p-4 border-b border-gray-100 last:border-0 flex justify-between items-center active:bg-gray-100">
              <div>
                <p className={`text-[#0F1724] ${isLargeFont ? 'text-base' : 'text-sm'}`}>{n.title}</p>
                <p className="text-xs text-[#A7B6A4] mt-1">{new Date(n.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <ArrowRight size={14} className="text-[#A7B6A4]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event, onToggleStatus, isLargeFont }) => {
  const [status, setStatus] = useState('pending'); // pending, done, snoozed
  const [isNotifyOn, setIsNotifyOn] = useState(event.urgency || false);

  const handleToggle = () => {
    setStatus(prev => prev === 'pending' ? 'done' : 'pending');
    onToggleStatus(event.id);
  };

  return (
    <div className={`flex gap-4 mb-6 relative group ${status === 'done' ? 'opacity-50' : ''}`}>
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full border-2 z-10 bg-[#FAFBF9] ${status === 'done' ? 'border-[#84A98C] bg-[#84A98C]' : 'border-[#0F1724]'}`} />
        <div className="w-[1px] h-full bg-gray-200 absolute top-3" />
      </div>
      
      <div className="flex-1 bg-white p-4 rounded-[18px] shadow-sm border border-transparent hover:border-[#84A98C]/20 transition-all">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-bold text-[#84A98C] uppercase tracking-wider">
            {new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
          {event.urgency && <span className="w-2 h-2 rounded-full bg-[#E57373]" />}
        </div>
        <h4 className={`font-semibold text-[#0F1724] mb-2 ${isLargeFont ? 'text-lg' : 'text-base'} ${status === 'done' ? 'line-through decoration-[#84A98C]' : ''}`}>
          {event.title}
        </h4>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-[#A7B6A4] bg-[#FAFBF9] px-2 py-1 rounded-md">{event.app}</span>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsNotifyOn(!isNotifyOn)}
              className={`p-2 rounded-full transition-colors ${isNotifyOn ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:bg-gray-100'}`}
            >
              <Bell size={16} fill={isNotifyOn ? "currentColor" : "none"} />
            </button>
            
            <button onClick={handleToggle} className={`p-2 rounded-full transition-colors ${status === 'done' ? 'text-[#84A98C] bg-[#84A98C]/10' : 'text-gray-400 hover:bg-gray-100'}`}>
              <Check size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Screens ---

const HeroScreen = ({ onStart, onPreview }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[#FAFBF9]">
    {/* Animated Background Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#84A98C]/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-[#0F1724]/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite_reverse]" />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center">
      <div 
        className="w-24 h-24 mb-8 bg-white rounded-[24px] shadow-[0_20px_40px_rgba(132,169,140,0.2)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-300 group"
      >
        <Filter size={40} className="text-[#84A98C] group-hover:rotate-180 transition-transform duration-700" />
      </div>

      <h1 className="text-4xl font-bold text-[#0F1724] mb-2 tracking-tight">FocusAI</h1>
      <p className="text-[#A7B6A4] text-lg mb-12 font-medium">Noise off. Focus on.</p>

      <div className="w-full space-y-4">
        <button 
          onClick={onStart}
          className="w-full py-4 bg-[#0F1724] text-white rounded-[18px] font-semibold text-lg shadow-xl active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button 
          onClick={onPreview}
          className="w-full py-4 bg-white text-[#0F1724] border border-gray-100 rounded-[18px] font-semibold text-lg shadow-sm active:scale-95 transition-transform hover:bg-gray-50"
        >
          Preview my morning
        </button>
      </div>
    </div>
  </div>
);

const OnboardingScreen = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({}); // State to track selected options
  const totalSteps = 7;

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete();
  };

  const steps = [
    { title: "What matters to you?", subtitle: "Select top 3 categories", type: "multiselect", options: ["Education", "Work", "Finance", "Family", "Health", "Social"] },
    { title: "Describe your role", subtitle: "Helps us tune urgency", type: "single", options: ["Student", "Professional", "Entrepreneur", "Creator"] },
    { title: "Urgency Alerts", subtitle: "When should we interrupt?", type: "single", options: ["Time-sensitive only", "All mentions", "Never"] },
    { title: "Financial Updates", subtitle: "Track spending?", type: "single", options: ["Large transactions", "All activity", "None"] },
    { title: "Family Priority", subtitle: "Always let family through?", type: "toggle", options: ["Yes", "No"] },
    { title: "Distraction Level", subtitle: "How strict are we?", type: "single", options: ["Strict Focus", "Balanced", "Permissive"] },
    { title: "Focus Hours", subtitle: "Best time for deep work", type: "single", options: ["Morning", "Afternoon", "Evening"] },
  ];

  const currentStep = steps[step];

  const handleSelect = (option) => {
    const currentSelections = answers[step] || [];
    let newSelections;

    if (currentStep.type === 'multiselect') {
      if (currentSelections.includes(option)) {
        newSelections = currentSelections.filter(item => item !== option);
      } else {
        if (currentSelections.length >= 3) return; // Limit to 3 selections
        newSelections = [...currentSelections, option];
      }
    } else {
      // Single select or toggle
      newSelections = [option];
    }

    setAnswers({ ...answers, [step]: newSelections });
  };

  const isSelected = (option) => (answers[step] || []).includes(option);

  return (
    <div className="h-full flex flex-col p-6 bg-[#FAFBF9]">
      <div className="w-full h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-[#84A98C] transition-all duration-500 ease-out" 
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-[24px] p-8 shadow-xl min-h-[400px] flex flex-col justify-between animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span className="text-[#84A98C] font-bold text-sm tracking-wider uppercase mb-2 block">Step {step + 1}/{totalSteps}</span>
            <h2 className="text-2xl font-bold text-[#0F1724] mb-2">{currentStep.title}</h2>
            <p className="text-[#A7B6A4] mb-8">{currentStep.subtitle}</p>

            <div className="space-y-3">
              {currentStep.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium active:scale-[0.99] ${
                    isSelected(opt) 
                      ? 'border-[#84A98C] bg-[#84A98C]/10 text-[#0F1724]' 
                      : 'border-transparent bg-[#FAFBF9] hover:border-[#84A98C]/30 hover:bg-[#84A98C]/5 text-[#0F1724]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button onClick={onSkip} className="text-[#A7B6A4] font-medium px-4 py-2 hover:text-[#0F1724] transition-colors">
          Skip Setup
        </button>
        <button 
          onClick={nextStep}
          className="flex items-center gap-2 bg-[#0F1724] text-white px-8 py-4 rounded-[18px] font-bold shadow-lg active:scale-95 transition-transform"
        >
          {step === totalSteps - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

const FocusInbox = ({ data, onMarkDone, onUndo, isLargeFont }) => {
  const priorityItems = data.filter(n => n.urgency || n.category === 'Education' || n.category === 'Finance');
  const blockedCount = 42;

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <MorningBriefingCard blockedCount={blockedCount} onDemo={() => {}} isLargeFont={isLargeFont} />
      
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-bold text-[#0F1724] text-sm uppercase tracking-wider">Priority Feed</h3>
        <span className="text-xs text-[#A7B6A4] bg-white px-2 py-1 rounded-md shadow-sm">{priorityItems.length} Items</span>
      </div>

      {priorityItems.length === 0 ? (
        <div className="text-center py-12 opacity-50">
          <Check size={48} className="mx-auto mb-4 text-[#84A98C]" />
          <p>You're all caught up!</p>
        </div>
      ) : (
        priorityItems.map(item => (
          <PriorityCard key={item.id} notification={item} onDone={onMarkDone} isLargeFont={isLargeFont} />
        ))
      )}
    </div>
  );
};

const Vault = ({ data, isLargeFont }) => {
  const [showSummary, setShowSummary] = useState(false);

  // Group by App
  const grouped = data.reduce((acc, curr) => {
    if (!acc[curr.app]) acc[curr.app] = [];
    acc[curr.app].push(curr);
    return acc;
  }, {});

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-[#0F1724] text-white p-6 rounded-[18px] mb-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`font-bold ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>Notification Vault</h2>
            <p className="text-white/60 text-sm">Everything else.</p>
          </div>
          <button 
            onClick={() => setShowSummary(true)}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Zap size={20} className="text-[#84A98C]" />
          </button>
        </div>
        
        {showSummary && (
          <div className="bg-white/10 p-4 rounded-xl text-sm border border-white/10 mb-2 animate-[slideDown_0.3s_ease-out]">
             <div className="flex justify-between items-center mb-2">
               <span className="font-bold text-[#84A98C]">AI Summary</span>
               <button onClick={() => setShowSummary(false)}><X size={14}/></button>
             </div>
             <p className="leading-relaxed opacity-90">
               <strong>Critical:</strong> DSA Assignment due tonight and Online Hackathon Demo at 3:00 PM. <br className="mb-2"/>
               <strong>Updates:</strong> Interview invitation received and Portfolio is up 5.2%. <br className="mb-2"/>
               The rest is low-priority social chatter.
             </p>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {Object.entries(grouped).map(([app, notifs]) => (
          <AppAccordion 
            key={app} 
            appName={app} 
            count={notifs.length} 
            notifications={notifs} 
            onOpenItem={() => {}} 
            isLargeFont={isLargeFont}
          />
        ))}
      </div>
    </div>
  );
};

const FocusCalendar = ({ data, isLargeFont }) => {
  // Simple mapping of notifications to events for demo
  const events = data.map(n => ({...n, status: 'pending'})).sort((a,b) => new Date(a.time) - new Date(b.time));

  // Calendar Date Strip Data
  const weekDates = [
    { day: 'M', date: '22', active: false },
    { day: 'T', date: '23', active: false },
    { day: 'W', date: '24', active: true },
    { day: 'T', date: '25', active: false },
    { day: 'F', date: '26', active: false },
    { day: 'S', date: '27', active: false },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Horizontal Date Strip */}
      <div className="flex justify-between items-center mb-8 px-1">
        {weekDates.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all duration-200 cursor-pointer ${
              item.active 
                ? 'bg-[#0F1724] text-white shadow-lg scale-110' 
                : 'bg-white text-[#A7B6A4] hover:bg-gray-50'
            }`}
          >
            <span className="text-[10px] font-bold mb-1 opacity-80">{item.day}</span>
            <span className={`font-bold ${isLargeFont ? 'text-lg' : 'text-base'}`}>{item.date}</span>
            {item.active && <div className="w-1 h-1 bg-[#84A98C] rounded-full mt-1" />}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className={`font-bold text-[#0F1724] ${isLargeFont ? 'text-2xl' : 'text-xl'}`}>Today's Agenda</h2>
      </div>
      
      <div className="pl-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} onToggleStatus={() => {}} isLargeFont={isLargeFont} />
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('hero'); // hero, onboarding, inbox, vault, calendar
  const [notifications, setNotifications] = useState(INITIAL_DATA);
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', undoId: null });
  const [deletedItems, setDeletedItems] = useState([]);

  // Inject Tailwind if missing
  useEffect(() => {
    if (!window.tailwind && !document.querySelector('#tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Mock "Done" Logic
  const handleMarkDone = (id) => {
    const item = notifications.find(n => n.id === id);
    setDeletedItems(prev => [...prev, item]);
    setNotifications(prev => prev.filter(n => n.id !== id));
    
    setToast({ visible: true, message: 'Marked as done', undoId: id });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const handleUndo = () => {
    const itemToRestore = deletedItems.find(i => i.id === toast.undoId);
    if (itemToRestore) {
      setNotifications(prev => [...prev, itemToRestore]); // Simple restore, ordering might change but fine for prototype
      setToast({ visible: false, message: '', undoId: null });
    }
  };

  const toggleFont = () => setIsLargeFont(!isLargeFont);

  // Navigation Rendering
  const renderScreen = () => {
    switch(currentScreen) {
      case 'hero':
        return <HeroScreen onStart={() => setCurrentScreen('onboarding')} onPreview={() => setCurrentScreen('inbox')} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setCurrentScreen('inbox')} onSkip={() => setCurrentScreen('inbox')} />;
      case 'inbox':
        return <FocusInbox data={notifications} onMarkDone={handleMarkDone} onUndo={handleUndo} isLargeFont={isLargeFont} />;
      case 'vault':
        return <Vault data={INITIAL_DATA} isLargeFont={isLargeFont} />; // Vault always shows all for demo
      case 'calendar':
        return <FocusCalendar data={notifications} isLargeFont={isLargeFont} />;
      default:
        return <FocusInbox data={notifications} />;
    }
  };

  const showNav = ['inbox', 'vault', 'calendar'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex items-center justify-center font-sans text-[#0F1724]">
      {/* Mobile Container (Phone Frame)
         - Fixed height (h-screen)
         - Hidden overflow on the frame itself (overflow-hidden)
         - Flex column layout to manage internal scroll area vs fixed bottom area
      */}
      <div className="w-full max-w-[480px] h-screen bg-[#FAFBF9] relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Scrollable Content Area */}
        {/* This div takes up all available space above the nav, and handles its own scrolling */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full">
          {showNav && (
            <Header 
              title={currentScreen === 'inbox' ? 'Focus Inbox' : currentScreen === 'vault' ? 'Vault' : 'Calendar'} 
              showFontToggle={true}
              onToggleFont={toggleFont}
              isLargeFont={isLargeFont}
            />
          )}

          {/* Main Content with padding at bottom to prevent content hiding behind FAB/Nav */}
          <main className={`p-6 ${showNav ? 'pb-32' : 'h-full'}`}>
            {renderScreen()}
          </main>
        </div>

        {/* Fixed Elements Layer 
           These are children of the Phone Frame, NOT the Scroll Area.
           This ensures they stay visually pinned to the "screen" regardless of content scroll.
        */}
        
        {currentScreen === 'inbox' && (
          <FAB onClick={() => setCurrentScreen('vault')} />
        )}

        <Toast 
          message={toast.message} 
          isVisible={toast.visible} 
          onUndo={toast.undoId ? handleUndo : null} 
        />

        {showNav && (
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-4 pb-8 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <button 
              onClick={() => setCurrentScreen('calendar')}
              className={`p-2 rounded-xl transition-all ${currentScreen === 'calendar' ? 'text-[#84A98C] bg-[#84A98C]/10' : 'text-[#A7B6A4]'}`}
            >
              <Calendar size={24} />
            </button>
            
            <button 
              onClick={() => setCurrentScreen('inbox')}
              className={`p-4 -mt-8 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${currentScreen === 'inbox' ? 'bg-[#84A98C] text-white shadow-[#84A98C]/40' : 'bg-white text-[#A7B6A4]'}`}
            >
              <Inbox size={24} strokeWidth={3} />
            </button>
            
            <button 
              onClick={() => setCurrentScreen('vault')}
              className={`p-2 rounded-xl transition-all ${currentScreen === 'vault' ? 'text-[#84A98C] bg-[#84A98C]/10' : 'text-[#A7B6A4]'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        )}
      </div>
      
      {/* Global Styles for Animations/Scrollbar */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;