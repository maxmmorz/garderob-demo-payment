import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, ShoppingBag, User, Home, Search, Plus, Menu, X, ArrowLeft, CreditCard, Check, ChevronDown, ChevronUp, Star, MapPin, Clock, Truck } from 'lucide-react';

// Type definitions
interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  price: string;
  sizes: string[];
  colors: string[];
  isLiked: boolean;
  comments: number;
  timeAgo: string;
}

interface CartItem {
  id: number;
  username: string;
  image: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
}

interface SavedCard {
  id: number;
  last4: string;
  brand: string;
  exp: string;
}

interface AnimatedElements {
  [key: string]: boolean;
}

interface InputsFocused {
  card?: boolean;
  exp?: boolean;
  cvv?: boolean;
}

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: 1,
    username: 'fashion_studio_kz',
    avatar: '👗',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    likes: 234,
    caption: 'Новая коллекция весна-лето! Платье из натурального хлопка ✨',
    price: '₸25,000',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Белый', 'Бежевый'],
    isLiked: false,
    comments: 18,
    timeAgo: '2ч'
  },
  {
    id: 2,
    username: 'street_style_almaty',
    avatar: '👕',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    likes: 156,
    caption: 'Стильная джинсовая куртка - must have этого сезона! 🔥',
    price: '₸18,500',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Синий', 'Черный'],
    isLiked: true,
    comments: 12,
    timeAgo: '4ч'
  },
  {
    id: 3,
    username: 'luxury_boutique',
    avatar: '👠',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=450&fit=crop',
    likes: 89,
    caption: 'Элегантные туфли из натуральной кожи 💎',
    price: '₸45,000',
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Черный', 'Коричневый', 'Красный'],
    isLiked: false,
    comments: 7,
    timeAgo: '6ч'
  }
];

// Payment Form Component
interface PaymentFormProps {
  orderTotal: string;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ orderTotal, onBack, onPaymentSuccess }: PaymentFormProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [selectedCardOption, setSelectedCardOption] = useState('new');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<AnimatedElements>({});

  const savedCards: SavedCard[] = [
    { id: 1, last4: '4242', brand: 'visa', exp: '12/25' },
    { id: 2, last4: '8888', brand: 'mastercard', exp: '03/26' },
    { id: 3, last4: '5555', brand: 'visa', exp: '08/24' },
    { id: 4, last4: '1234', brand: 'mastercard', exp: '11/25' },
    { id: 5, last4: '9999', brand: 'visa', exp: '05/27' }
  ];

  const visibleCards = showAllCards ? savedCards : savedCards.slice(0, 3);
  const hasMoreCards = savedCards.length > 3;

  useEffect(() => {
    setTimeout(() => setIsFormVisible(true), 100);
    
    const timers: NodeJS.Timeout[] = [];
    ['wallet1', 'divider', 'method1', 'method2', 'method3'].forEach((id, index) => {
      timers.push(setTimeout(() => {
        setAnimatedElements(prev => ({ ...prev, [id]: true }));
      }, 100 + (index * 50)));
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (selectedMethod === 'card') {
      const timers: NodeJS.Timeout[] = [];
      ['newCard', ...savedCards.slice(0, visibleCards.length).map(c => `card-${c.id}`)].forEach((id, index) => {
        timers.push(setTimeout(() => {
          setAnimatedElements(prev => ({ ...prev, [id]: true }));
        }, index * 60));
      });
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [selectedMethod, visibleCards.length]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const VisaIcon = () => (
    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <path d="M20.5 21H17.5L19.5 11H22.5L20.5 21Z" fill="white"/>
      <path d="M31 11L28.5 17.5L28 15.5L26.5 11H23.5L26.5 21H29.5L34 11H31Z" fill="white"/>
      <path d="M13.5 11L10 21H13L13.5 19H16.5L17 21H20L16.5 11H13.5Z" fill="white"/>
    </svg>
  );

  const MastercardIcon = () => (
    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#EB001B"/>
      <circle cx="19" cy="16" r="9" fill="#FF5F00"/>
      <circle cx="29" cy="16" r="9" fill="#F79E1B"/>
      <path d="M24 10C25.5 11.5 26.5 13.5 26.5 16C26.5 18.5 25.5 20.5 24 22C22.5 20.5 21.5 18.5 21.5 16C21.5 13.5 22.5 11.5 24 10Z" fill="#EB001B"/>
    </svg>
  );

  const KaspiLogo = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF4B3A"/>
      <path d="M8 8V16H10V12.5L12 14.5L14 12.5V16H16V8H14L12 10L10 8H8Z" fill="white"/>
      <circle cx="6" cy="12" r="1.5" fill="white"/>
      <circle cx="18" cy="12" r="1.5" fill="white"/>
    </svg>
  );

  const HalykLogo = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#00A859"/>
      <path d="M12 6L7 12H10V18H14V12H17L12 6Z" fill="white"/>
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1" fill="none"/>
    </svg>
  );

  const QRCode = ({ method }: { method: string }) => {
    const [qrAnimated, setQrAnimated] = useState(false);
    
    useEffect(() => {
      setTimeout(() => setQrAnimated(true), 100);
    }, []);

    return (
      <div 
        className="flex flex-col items-center p-6 bg-white rounded-2xl transition-all duration-500"
        style={{
          opacity: qrAnimated ? 1 : 0,
          transform: qrAnimated ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
              {method === 'kaspi' ? (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="#FF4B3A"/>
                  <path d="M8 8V16H10V12.5L12 14.5L14 12.5V16H16V8H14L12 10L10 8H8Z" fill="white"/>
                  <circle cx="6" cy="12" r="1.5" fill="white"/>
                  <circle cx="18" cy="12" r="1.5" fill="white"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="#00A859"/>
                  <path d="M12 6L7 12H10V18H14V12H17L12 6Z" fill="white"/>
                  <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1" fill="none"/>
                </svg>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700">
              {method === 'kaspi' ? 'Kaspi.kz' : 'Halyk Bank'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {method === 'kaspi' ? 'Kaspi.kz' : 'Halyk Bank'} application will be opened
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center" style={{
          opacity: qrAnimated ? 1 : 0,
          transform: qrAnimated ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.4s ease-out 0.3s'
        }}>
          Complete payment in the {method === 'kaspi' ? 'Kaspi.kz' : 'Halyk Bank'} app
        </p>
      </div>
    );
  };

  interface PaymentMethodButtonProps {
    method: string;
    label: string;
    icon: React.ComponentType<any>;
    isActive: boolean;
    onClick: () => void;
    animationId: string;
  }

  const PaymentMethodButton = ({ label, icon: Icon, isActive, onClick, animationId }: Omit<PaymentMethodButtonProps, 'method'>) => {
    const [isHovered, setIsHovered] = useState(false);
    const isAnimated = animatedElements[animationId];

    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex flex-col items-center justify-center space-y-1.5 py-2.5 px-2 rounded-xl text-xs font-medium border ${
          isActive
            ? 'bg-white shadow-md'
            : 'bg-gray-50 text-gray-600 border-transparent'
        }`}
        style={{
          borderColor: isActive ? '#d33f57' : 'transparent',
          color: isActive ? '#d33f57' : '#4B5563',
          transform: `scale(${isHovered ? 1.05 : isActive ? 1.02 : 1}) translateY(${isAnimated ? 0 : 20}px)`,
          opacity: isAnimated ? 1 : 0,
          boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : undefined,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Icon className="w-4 h-4" style={{
          transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 0.3s ease-out'
        }} />
        <span className="text-[11px]">{label}</span>
      </button>
    );
  };

  interface SavedCardOptionProps {
    card: SavedCard;
    isSelected: boolean;
    onClick: () => void;
    index: number;
  }

  const SavedCardOption = ({ card, isSelected, onClick, index }: SavedCardOptionProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isAnimated = animatedElements[`card-${card.id}`];

    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full p-3 rounded-xl border"
        style={{
          borderColor: isSelected ? '#d33f57' : '#E5E7EB',
          backgroundColor: isSelected ? '#fdf2f3' : isHovered ? '#FAFAFA' : '#FFFFFF',
          transform: `translateX(${isAnimated ? 0 : 30}px) scale(${isHovered ? 1.01 : 1})`,
          opacity: isAnimated ? 1 : 0,
          boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : isHovered ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: `${index * 60}ms`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 flex-1">
            <div style={{
              opacity: isSelected ? 1 : 0.7,
              transform: `rotate(${isHovered ? 5 : 0}deg)`,
              transition: 'all 0.3s ease-out'
            }}>
              {card.brand === 'visa' ? <VisaIcon /> : <MastercardIcon />}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-medium text-gray-800">{card.brand === 'visa' ? 'Visa' : 'Mastercard'}</span>
              <span className="font-medium text-gray-800">•••• {card.last4}</span>
              <span className="text-gray-500">{card.exp}</span>
            </div>
          </div>
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: isSelected ? '#d33f57' : '#D1D5DB',
              backgroundColor: isSelected ? '#d33f57' : 'transparent',
              transform: `scale(${isSelected ? 1 : 0.9})`,
              transition: 'all 0.3s ease-out'
            }}
          >
            {isSelected && (
              <Check className="w-2.5 h-2.5 text-white" style={{
                transform: 'scale(1)',
                animation: 'checkPop 0.3s ease-out'
              }} />
            )}
          </div>
        </div>
      </button>
    );
  };

  const NewCardOption = () => {
    const isSelected = selectedCardOption === 'new';
    const [isHovered, setIsHovered] = useState(false);
    const [inputsFocused, setInputsFocused] = useState<InputsFocused>({});
    const isAnimated = animatedElements.newCard;
    
    return (
      <div className="space-y-2" style={{
        transform: `translateX(${isAnimated ? 0 : 30}px)`,
        opacity: isAnimated ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <button
          onClick={() => setSelectedCardOption('new')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full p-4 rounded-xl border"
          style={{
            borderColor: isSelected ? '#d33f57' : '#E5E7EB',
            backgroundColor: isSelected ? '#fdf2f3' : isHovered ? '#FAFAFA' : '#FFFFFF',
            transform: `scale(${isHovered ? 1.01 : 1})`,
            boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : isHovered ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 flex-1">
              {!isSelected && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100"
                  style={{
                    transform: `rotate(${isHovered ? 90 : 0}deg)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </div>
              )}
              {!isSelected ? (
                <span className="text-xs font-medium text-gray-700">Новая карта</span>
              ) : (
                <div className="flex items-center space-x-3 flex-1" style={{
                  opacity: isSelected ? 1 : 0,
                  animation: isSelected ? 'fadeSlideIn 0.3s ease-out' : 'none'
                }}>
                  <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    onFocus={() => setInputsFocused(prev => ({ ...prev, card: true }))}
                    onBlur={() => setInputsFocused(prev => ({ ...prev, card: false }))}
                    maxLength="19"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-3 py-3 text-sm bg-white border border-gray-200 rounded-lg outline-none"
                    style={{
                      borderColor: inputsFocused.card ? '#d33f57' : '#E5E7EB',
                      boxShadow: inputsFocused.card ? '0 0 0 3px rgba(236, 103, 34, 0.1)' : 'none',
                      transition: 'all 0.2s ease-out'
                    }}
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="ММ/ГГ"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    onFocus={() => setInputsFocused(prev => ({ ...prev, exp: true }))}
                    onBlur={() => setInputsFocused(prev => ({ ...prev, exp: false }))}
                    maxLength="5"
                    onClick={(e) => e.stopPropagation()}
                    className="w-16 px-2.5 py-3 text-sm bg-white border border-gray-200 rounded-lg outline-none"
                    style={{
                      borderColor: inputsFocused.exp ? '#d33f57' : '#E5E7EB',
                      boxShadow: inputsFocused.exp ? '0 0 0 3px rgba(236, 103, 34, 0.1)' : 'none',
                      transition: 'all 0.2s ease-out'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    onFocus={() => setInputsFocused(prev => ({ ...prev, cvv: true }))}
                    onBlur={() => setInputsFocused(prev => ({ ...prev, cvv: false }))}
                    maxLength="4"
                    onClick={(e) => e.stopPropagation()}
                    className="w-14 px-2.5 py-3 text-sm bg-white border border-gray-200 rounded-lg outline-none"
                    style={{
                      borderColor: inputsFocused.cvv ? '#d33f57' : '#E5E7EB',
                      boxShadow: inputsFocused.cvv ? '0 0 0 3px rgba(236, 103, 34, 0.1)' : 'none',
                      transition: 'all 0.2s ease-out'
                    }}
                  />
                </div>
              )}
            </div>
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2"
              style={{
                borderColor: isSelected ? '#d33f57' : '#D1D5DB',
                backgroundColor: isSelected ? '#d33f57' : 'transparent',
                transform: `scale(${isSelected ? 1 : 0.9})`,
                transition: 'all 0.3s ease-out'
              }}
            >
              {isSelected && (
                <Check className="w-2.5 h-2.5 text-white" />
              )}
            </div>
          </div>
        </button>
        
        {isSelected && (
          <div className="px-4 py-2" style={{
            opacity: isSelected ? 1 : 0,
            transform: `translateY(${isSelected ? 0 : -10}px)`,
            transition: 'all 0.3s ease-out 0.1s'
          }}>
            <label className="flex items-center justify-between cursor-pointer group py-2">
              <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Сохранить карту</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="sr-only"
                />
                <div className="w-9 h-5 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: saveCard ? '#d33f57' : '#D1D5DB',
                    boxShadow: saveCard ? '0 2px 4px rgba(236, 103, 34, 0.2)' : 'none'
                  }}
                >
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    style={{
                      transform: `translateX(${saveCard ? 16 : 0}px)`,
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>
              </div>
            </label>
          </div>
        )}
      </div>
    );
  };

  const handlePayment = () => {
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes checkPop {
          0% { transform: scale(0) rotate(-45deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Оплата</h1>
            <div className="w-9" />
          </div>

          <div className="p-4 border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">К оплате:</span>
              <span className="text-xl font-bold text-[#d33f57]">{orderTotal}</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-b from-gray-50 to-white"
            style={{
              opacity: isFormVisible ? 1 : 0,
              transform: `translateY(${isFormVisible ? 0 : 20}px)`,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="mb-3">
              <button 
                className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center space-x-1.5 shadow-sm hover:shadow-lg active:scale-95"
                style={{
                  opacity: animatedElements.wallet1 ? 1 : 0,
                  transform: `translateY(${animatedElements.wallet1 ? 0 : 20}px) scale(${animatedElements.wallet1 ? 1 : 0.95})`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                <span>Apple Pay</span>
              </button>
            </div>

            <div className="relative mb-3" style={{
              opacity: animatedElements.divider ? 1 : 0,
              transition: 'opacity 0.4s ease-out'
            }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gradient-to-b from-gray-50 to-white text-xs text-gray-400">или</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-3 gap-2">
                <PaymentMethodButton
                  label="Карта"
                  icon={CreditCard}
                  isActive={selectedMethod === 'card'}
                  onClick={() => setSelectedMethod(selectedMethod === 'card' ? '' : 'card')}
                  animationId="method1"
                />
                <PaymentMethodButton
                  label="Kaspi"
                  icon={KaspiLogo}
                  isActive={selectedMethod === 'kaspi'}
                  onClick={() => setSelectedMethod(selectedMethod === 'kaspi' ? '' : 'kaspi')}
                  animationId="method2"
                />
                <PaymentMethodButton
                  label="Halyk"
                  icon={HalykLogo}
                  isActive={selectedMethod === 'halyk'}
                  onClick={() => setSelectedMethod(selectedMethod === 'halyk' ? '' : 'halyk')}
                  animationId="method3"
                />
              </div>
            </div>

            <div>
              {selectedMethod === 'card' && (
                <div className="space-y-2">
                  <NewCardOption />

                  {visibleCards.map((card, index) => (
                    <SavedCardOption
                      key={card.id}
                      card={card}
                      index={index}
                      isSelected={selectedCardOption === `saved-${card.id}`}
                      onClick={() => {
                        setSelectedCardOption(`saved-${card.id}`);
                        setCardNumber('');
                        setExpiryDate('');
                        setCvv('');
                        setSaveCard(false);
                      }}
                    />
                  ))}

                  {hasMoreCards && (
                    <button
                      onClick={() => setShowAllCards(!showAllCards)}
                      className="w-full py-3 text-sm font-medium flex items-center justify-center space-x-1"
                      style={{ 
                        color: '#d33f57',
                        opacity: animatedElements.newCard ? 1 : 0,
                        transform: `translateY(${animatedElements.newCard ? 0 : 10}px)`,
                        transition: 'all 0.4s ease-out 0.3s'
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.color = '#b8354a'}
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.target as HTMLButtonElement).style.color = '#d33f57'}
                    >
                      <span>{showAllCards ? 'Скрыть' : `Показать еще ${savedCards.length - 3}`}</span>
                      <ChevronDown 
                        className="w-4 h-4 transition-transform duration-300"
                        style={{ transform: `rotate(${showAllCards ? 180 : 0}deg)` }}
                      />
                    </button>
                  )}

                  <button 
                    onClick={handlePayment}
                    className="w-full mt-3 text-white py-3 rounded-xl font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    style={{ 
                      backgroundColor: '#d33f57',
                      transform: `scale(${animatedElements.newCard ? 1 : 0.95})`,
                      opacity: animatedElements.newCard ? 1 : 0,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      const target = e.target as HTMLButtonElement;
                      if (!target.disabled) {
                        target.style.backgroundColor = '#b8354a';
                        target.style.transform = 'scale(1.02)';
                        target.style.boxShadow = '0 10px 25px -5px rgba(211, 63, 87, 0.3)';
                      }
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      const target = e.target as HTMLButtonElement;
                      if (!target.disabled) {
                        target.style.backgroundColor = '#d33f57';
                        target.style.transform = 'scale(1)';
                        target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                    disabled={selectedCardOption === 'new' ? (!cardNumber || !expiryDate || !cvv) : !selectedCardOption}
                  >
                    <span style={{
                      display: 'inline-block',
                      transform: animatedElements.newCard ? 'translateY(0)' : 'translateY(5px)',
                      opacity: animatedElements.newCard ? 1 : 0,
                      transition: 'all 0.3s ease-out 0.5s'
                    }}>
                      Оплатить {orderTotal}
                    </span>
                  </button>
                </div>
              )}

              {selectedMethod === 'kaspi' && <QRCode method="kaspi" />}
              {selectedMethod === 'halyk' && <QRCode method="halyk" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Main App Component
const SocialCommerceApp = () => {
  const [currentView, setCurrentView] = useState('feed');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedPosts, setLikedPosts] = useState(new Set([2]));
  const [orderSuccess, setOrderSuccess] = useState(false);

  interface ProductModalProps {
    post: Post;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
  }

  const ProductModal = ({ post, onClose, onAddToCart }: ProductModalProps) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
      if (!selectedSize || !selectedColor) return;
      
      const cartItem = {
        id: post.id,
        username: post.username,
        image: post.image,
        price: post.price,
        size: selectedSize,
        color: selectedColor,
        quantity
      };
      
      onAddToCart(cartItem);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
        <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 transform transition-transform duration-300 translate-y-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Детали товара</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <img src={post.image} alt="" className="w-full h-64 object-cover rounded-lg mb-3" />
            <p className="text-gray-600 text-sm mb-2">{post.caption}</p>
            <p className="text-2xl font-bold text-[#d33f57]">{post.price}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Размер</label>
              <div className="flex flex-wrap gap-2">
                {post.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      selectedSize === size
                        ? 'border-[#d33f57] bg-[#fdf2f3] text-[#d33f57]'
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Цвет</label>
              <div className="flex flex-wrap gap-2">
                {post.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      selectedColor === color
                        ? 'border-[#d33f57] bg-[#fdf2f3] text-[#d33f57]'
                        : 'border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Количество</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            className="w-full mt-6 bg-[#d33f57] text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b8354a] transition-colors"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    );
  };

  const SuccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-sm mx-auto rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Заказ оформлен!</h2>
        <p className="text-gray-600 mb-6">Спасибо за покупку. Мы отправим уведомление о статусе заказа.</p>
        <button
          onClick={onClose}
          className="w-full bg-[#d33f57] text-white py-3 rounded-xl font-medium hover:bg-[#b8354a] transition-colors"
        >
          Продолжить покупки
        </button>
      </div>
    </div>
  );

  const Post = ({ post }: { post: Post }) => {
    const isLiked = likedPosts.has(post.id);

    const handleLike = () => {
      const newLiked = new Set(likedPosts);
      if (isLiked) {
        newLiked.delete(post.id);
      } else {
        newLiked.add(post.id);
      }
      setLikedPosts(newLiked);
    };

    return (
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-[#d33f57] rounded-full flex items-center justify-center text-white text-sm">
              {post.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{post.username}</p>
              <p className="text-xs text-gray-500">{post.timeAgo}</p>
            </div>
          </div>
          <button className="p-2">
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <img src={post.image} alt="" className="w-full aspect-square object-cover" />
          <button
            onClick={() => setSelectedPost(post)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:bg-white transition-colors flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{post.price}</span>
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <button onClick={handleLike} className="p-1">
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isLiked ? 'fill-red-500 text-red-500' : 'hover:text-gray-600'
                  }`}
                />
              </button>
              <button className="p-1 hover:text-gray-600">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="p-1 hover:text-gray-600">
                <Send className="w-6 h-6" />
              </button>
            </div>
            <button className="p-1 hover:text-gray-600">
              <Bookmark className="w-6 h-6" />
            </button>
          </div>

          <p className="font-semibold text-sm mb-1">{post.likes.toLocaleString()} отметок "Нравится"</p>
          <p className="text-sm">
            <span className="font-semibold">{post.username}</span> {post.caption}
          </p>
          {post.comments > 0 && (
            <button className="text-gray-500 text-sm mt-1">
              Посмотреть все комментарии ({post.comments})
            </button>
          )}
        </div>
      </div>
    );
  };

  const NavigationBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => setCurrentView('feed')}
          className={`p-3 ${currentView === 'feed' ? 'text-[#d33f57]' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentView('search')}
          className={`p-3 ${currentView === 'search' ? 'text-[#d33f57]' : 'text-gray-400'}`}
        >
          <Search className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentView('add')}
          className="p-3 text-gray-400"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentView('cart')}
          className={`p-3 relative ${currentView === 'cart' ? 'text-[#d33f57]' : 'text-gray-400'}`}
        >
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          className={`p-3 ${currentView === 'profile' ? 'text-[#d33f57]' : 'text-gray-400'}`}
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    setCurrentView('payment');
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setCurrentView('feed');
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-[#d33f57] bg-clip-text text-transparent">
            Garderob
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="p-2">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-20 max-w-md mx-auto">
        {currentView === 'feed' && (
          <div className="space-y-0">
            {mockPosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}

        {currentView === 'search' && (
          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full px-4 py-3 bg-gray-100 rounded-full outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map(post => (
                <div key={post.id} className="aspect-square relative">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                    <span className="text-white text-xs font-medium">{post.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Корзина ({cart.length})</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Ваша корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">@{item.username}</p>
                        <p className="text-xs text-gray-600">{item.size} • {item.color}</p>
                        <p className="text-[#d33f57] font-bold">{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">×{item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Итого:</span>
                    <span className="text-xl font-bold text-[#d33f57]">₸{calculateTotal().toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#d33f57] text-white py-3 rounded-xl font-medium hover:bg-[#b8354a] transition-colors"
                  >
                    Перейти к оплате
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === 'profile' && (
          <div className="p-4 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-[#d33f57] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
              👤
            </div>
            <h2 className="text-xl font-bold mb-2">Мой профиль</h2>
            <p className="text-gray-600 mb-6">Добро пожаловать в Garderob!</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-sm text-gray-600">Публикаций</p>
              </div>
              <div>
                <p className="text-xl font-bold">1.2k</p>
                <p className="text-sm text-gray-600">Подписчиков</p>
              </div>
              <div>
                <p className="text-xl font-bold">845</p>
                <p className="text-sm text-gray-600">Подписок</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {currentView === 'payment' && (
        <PaymentForm
          orderTotal={`₸${calculateTotal().toLocaleString()}`}
          onBack={() => setCurrentView('cart')}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {selectedPost && (
        <ProductModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onAddToCart={addToCart}
        />
      )}

      {orderSuccess && (
        <SuccessModal
          onClose={() => setOrderSuccess(false)}
        />
      )}

      {currentView !== 'payment' && <NavigationBar />}
    </div>
  );
};

export default SocialCommerceApp;