import {
  Home,
  Search,
  Plus,
  ShoppingBag,
  User,
  MessageCircle,
  Menu,
  ArrowLeft,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  cartCount: number;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function Layout({ 
  children, 
  currentView, 
  onViewChange, 
  cartCount,
  showBackButton = false,
  onBackClick
}: LayoutProps) {
  const isPaymentScreen = currentView === "cart";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-foreground relative flex items-center justify-center">
      {/* Mobile Phone Frame */}
      <div className="relative">
        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-4 scale-105 rounded-[3rem] hidden sm:block"></div>

        {/* Phone Body */}
        <div className="phone-frame hidden sm:block">
          {/* Phone Screen */}
          <div className="phone-screen">
            {/* Dynamic Island / Notch */}
            <div className="phone-notch"></div>

            {/* Screen Content Container */}
            <div className="w-full h-full bg-background flex flex-col relative">
              {/* Top Bar - Icons in safe area */}
              <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center">
                    {showBackButton ? (
                      <button
                        onClick={onBackClick}
                        className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95"
                      >
                        <ArrowLeft
                          className="w-5 h-5 text-foreground/80"
                          strokeWidth={1.5}
                        />
                      </button>
                    ) : (
                      <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                        <Menu
                          className="w-5 h-5 text-foreground/80"
                          strokeWidth={1.5}
                        />
                      </button>
                    )}
                  </div>

                  <div className="w-6"></div>

                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => onViewChange("cart")}
                      className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95 relative"
                    >
                      <ShoppingBag
                        className="w-5 h-5 text-foreground/80"
                        strokeWidth={1.5}
                      />
                      {cartCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {cartCount}
                        </div>
                      )}
                    </button>
                    <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                      <MessageCircle
                        className="w-5 h-5 text-foreground/80"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`flex-1 overflow-y-auto ${isPaymentScreen ? "pb-4" : "pb-12"}`}>
                {children}
              </div>

              {!isPaymentScreen && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
                  <div className="flex justify-around py-2 safe-area-inset-bottom">
                    <button
                      onClick={() => onViewChange("feed")}
                      className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                        currentView === "feed"
                          ? "text-[#d33f57] bg-[#d33f57]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <Home
                        className="w-5 h-5 mb-1.5"
                        strokeWidth={currentView === "feed" ? 2 : 1.5}
                      />
                      <span className="text-xs font-medium">Главная</span>
                    </button>

                    <button
                      onClick={() => onViewChange("search")}
                      className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                        currentView === "search"
                          ? "text-[#d33f57] bg-[#d33f57]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <Search
                        className="w-5 h-5 mb-1.5"
                        strokeWidth={currentView === "search" ? 2 : 1.5}
                      />
                      <span className="text-xs font-medium">Поиск</span>
                    </button>

                    <button
                      onClick={() => onViewChange("add")}
                      className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                        currentView === "add"
                          ? "text-[#d33f57] bg-[#d33f57]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <Plus
                        className="w-5 h-5 mb-1.5"
                        strokeWidth={currentView === "add" ? 2 : 1.5}
                      />
                      <span className="text-xs font-medium">Добавить</span>
                    </button>

                    <button
                      onClick={() => onViewChange("cart")}
                      className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 relative ${
                        currentView === "cart"
                          ? "text-[#d33f57] bg-[#d33f57]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <ShoppingBag
                        className="w-5 h-5 mb-1.5"
                        strokeWidth={currentView === "cart" ? 2 : 1.5}
                      />
                      {cartCount > 0 && (
                        <span className="absolute top-1 right-4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                      <span className="text-xs font-medium">Корзина</span>
                    </button>

                    <button
                      onClick={() => onViewChange("profile")}
                      className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                        currentView === "profile"
                          ? "text-[#d33f57] bg-[#d33f57]/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <User
                        className="w-5 h-5 mb-1.5"
                        strokeWidth={currentView === "profile" ? 2 : 1.5}
                      />
                      <span className="text-xs font-medium">Профиль</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout (shown on small devices only) */}
        <div className="sm:hidden w-screen mx-auto bg-background min-h-screen flex flex-col">
          {/* Top Bar - Icons in safe area */}
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center">
                {showBackButton ? (
                  <button
                    onClick={onBackClick}
                    className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <ArrowLeft
                      className="w-5 h-5 text-foreground/80"
                      strokeWidth={1.5}
                    />
                  </button>
                ) : (
                  <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                    <Menu
                      className="w-5 h-5 text-foreground/80"
                      strokeWidth={1.5}
                    />
                  </button>
                )}
              </div>

              <div className="w-6"></div>

              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => onViewChange("cart")}
                  className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95 relative"
                >
                  <ShoppingBag
                    className="w-5 h-5 text-foreground/80"
                    strokeWidth={1.5}
                  />
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </div>
                  )}
                </button>
                <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                  <MessageCircle
                    className="w-5 h-5 text-foreground/80"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className={`flex-1 ${isPaymentScreen ? "pb-8" : "pb-20"}`}>
            {children}
          </div>

          {!isPaymentScreen && (
            <div className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
              <div className="flex justify-around py-2 safe-area-inset-bottom">
                <button
                  onClick={() => onViewChange("feed")}
                  className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                    currentView === "feed"
                      ? "text-[#d33f57] bg-[#d33f57]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Home
                    className="w-5 h-5 mb-1.5"
                    strokeWidth={currentView === "feed" ? 2 : 1.5}
                  />
                  <span className="text-xs font-medium">Главная</span>
                </button>

                <button
                  onClick={() => onViewChange("search")}
                  className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                    currentView === "search"
                      ? "text-[#d33f57] bg-[#d33f57]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Search
                    className="w-5 h-5 mb-1.5"
                    strokeWidth={currentView === "search" ? 2 : 1.5}
                  />
                  <span className="text-xs font-medium">Поиск</span>
                </button>

                <button
                  onClick={() => onViewChange("add")}
                  className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                    currentView === "add"
                      ? "text-[#d33f57] bg-[#d33f57]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Plus
                    className="w-5 h-5 mb-1.5"
                    strokeWidth={currentView === "add" ? 2 : 1.5}
                  />
                  <span className="text-xs font-medium">Добавить</span>
                </button>

                <button
                  onClick={() => onViewChange("cart")}
                  className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 relative ${
                    currentView === "cart"
                      ? "text-[#d33f57] bg-[#d33f57]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <ShoppingBag
                    className="w-5 h-5 mb-1.5"
                    strokeWidth={currentView === "cart" ? 2 : 1.5}
                  />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-xs font-medium">Корзина</span>
                </button>

                <button
                  onClick={() => onViewChange("profile")}
                  className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                    currentView === "profile"
                      ? "text-[#d33f57] bg-[#d33f57]/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <User
                    className="w-5 h-5 mb-1.5"
                    strokeWidth={currentView === "profile" ? 2 : 1.5}
                  />
                  <span className="text-xs font-medium">Профиль</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}