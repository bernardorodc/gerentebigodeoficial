// Dicionário de traduções
export const translations = {
  pt: {
    // Header
    products: "Produtos",
    prices: "Preços",
    resources: "Recursos",
    login: "Login",
    scheduleDemo: "Agendar Demonstração",
    tryFree: "Testar Grátis",
    
    // Hero
    heroTitle: "Gerente Bigode Plataforma Financeira Inteligente",
    heroSubtitle: "Controle suas finanças com clareza, elegância e sem planilhas complicadas, tudo pelo WhatsApp.",
    satisfiedUsers: "de usuários satisfeitos",
    happyUsers: "100+ usuários felizes e contando",
    
    // Outros componentes
    currentBalance: "Saldo Atual",
    monthlyExpenses: "Despesas do Mês",
    monthlyFlow: "Fluxo Mensal",
    weekdays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    spotifySubscription: "Assinatura Spotify",
    clientPayment: "Pagamento Cliente",
  },
  en: {
    // Header
    products: "Products",
    prices: "Pricing",
    resources: "Resources",
    login: "Login",
    scheduleDemo: "Schedule Demo",
    tryFree: "Try Free",
    
    // Hero
    heroTitle: "Gerente Bigode Smart Financial Platform",
    heroSubtitle: "Control your finances with clarity, elegance and without complicated spreadsheets, all through WhatsApp.",
    satisfiedUsers: "satisfied users",
    happyUsers: "100+ happy users and counting",
    
    // Outros componentes
    currentBalance: "Current Balance",
    monthlyExpenses: "Monthly Expenses",
    monthlyFlow: "Monthly Flow",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    spotifySubscription: "Spotify Subscription",
    clientPayment: "Client Payment",
  }
};

// Função para obter a linguagem atual
export const getCurrentLanguage = (): 'pt' | 'en' => {
  const savedLang = localStorage.getItem('language');
  return (savedLang === 'en') ? 'en' : 'pt'; // Padrão é português
};

// Função para definir a linguagem
export const setLanguage = (lang: 'pt' | 'en'): void => {
  localStorage.setItem('language', lang);
  document.documentElement.setAttribute('lang', lang);
  
  // Disparar evento para notificar componentes sobre a mudança de idioma
  window.dispatchEvent(new Event('languagechange'));
};

// Função para obter uma tradução
export const t = (key: string): string => {
  const lang = getCurrentLanguage();
  const langDict = translations[lang];
  
  // Navegação em chaves aninhadas (ex: "hero.title")
  const keys = key.split('.');
  let result: any = langDict;
  
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Retorna a chave se não encontrar tradução
    }
  }
  
  return result;
};

// Hook para usar traduções e reagir a mudanças de idioma
export const useTranslation = () => {
  return { t, getCurrentLanguage, setLanguage };
};
