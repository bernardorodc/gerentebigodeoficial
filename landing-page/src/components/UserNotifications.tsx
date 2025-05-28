import { useState, useEffect } from 'react';

// Array de nomes e cidades para as notificações
const users = [
  { name: 'João', city: 'SP' },
  { name: 'Maria', city: 'RJ' },
  { name: 'Carlos', city: 'MG' },
  { name: 'Ana', city: 'RS' },
  { name: 'Pedro', city: 'BA' },
  { name: 'Camila', city: 'PR' },
  { name: 'Lucas', city: 'SC' },
  { name: 'Fernanda', city: 'PE' },
  { name: 'Mateus', city: 'CE' },
  { name: 'Juliana', city: 'DF' },
  { name: 'Rafael', city: 'GO' },
  { name: 'Mariana', city: 'AM' },
  { name: 'Gabriel', city: 'PA' },
  { name: 'Isabela', city: 'MT' },
  { name: 'Thiago', city: 'MS' }
];

// Array de tempos para as notificações
const times = [
  '30 segundos',
  '1 minuto',
  '2 minutos',
  '5 minutos',
  'agora mesmo',
  'poucos instantes'
];

// Tipos de notificações
type NotificationType = 'joined' | 'created';

// Interface para a notificação
interface Notification {
  id: number;
  user: typeof users[0];
  type: NotificationType;
  time?: string;
  visible: boolean;
}

const UserNotifications = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  // Função para gerar uma notificação aleatória
  const generateRandomNotification = (): Notification => {
    const user = users[Math.floor(Math.random() * users.length)];
    const type = Math.random() > 0.5 ? 'joined' : 'created';
    const time = type === 'joined' ? times[Math.floor(Math.random() * times.length)] : undefined;
    
    return {
      id: Date.now(),
      user,
      type,
      time,
      visible: true
    };
  };

  useEffect(() => {
    // Mostrar uma notificação a cada 60 segundos
    const showNotification = () => {
      const newNotification = generateRandomNotification();
      setNotification(newNotification);
      
      // Esconder a notificação após 5 segundos
      setTimeout(() => {
        setNotification(prev => prev && prev.id === newNotification.id ? { ...prev, visible: false } : prev);
      }, 5000);
    };
    
    // Mostrar a primeira notificação após 3 segundos
    const initialTimeout = setTimeout(showNotification, 3000);
    
    // Configurar o intervalo para mostrar notificações a cada 60 segundos
    const interval = setInterval(showNotification, 60000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Não renderizar nada se não houver notificação ou se ela não estiver visível
  if (!notification || !notification.visible) return null;

  // Texto da notificação apenas em português
  const getNotificationText = () => {
    const { user, type, time } = notification;
    
    if (type === 'created') {
      return `${user.name} de ${user.city} acabou de criar uma conta no Gerente Bigode`;
    } else {
      return `${user.name} se juntou ao Bigode há ${time}`;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 notification-toast">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 max-w-xs">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {getNotificationText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
