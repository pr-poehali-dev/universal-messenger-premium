import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

interface Call {
  id: number;
  name: string;
  avatar: string;
  type: 'video' | 'audio';
  time: string;
  duration: string;
  missed?: boolean;
}

interface Gift {
  id: number;
  name: string;
  icon: string;
  price: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const chats: Chat[] = [
  { id: 1, name: 'Александра', avatar: '', lastMessage: 'Отправила голосовое сообщение', time: '14:32', unread: 3, online: true },
  { id: 2, name: 'Дмитрий', avatar: '', lastMessage: 'Созвон завтра?', time: '12:05', online: true },
];

const calls: Call[] = [
  { id: 1, name: 'Александра', avatar: '', type: 'video', time: 'Сегодня 14:20', duration: '45 мин' },
  { id: 2, name: 'Дмитрий', avatar: '', type: 'audio', time: 'Сегодня 11:15', duration: '12 мин' },
];

const gifts: Gift[] = [
  { id: 1, name: 'Роза', icon: '🌹', price: 50 },
  { id: 2, name: 'Торт', icon: '🎂', price: 100 },
  { id: 3, name: 'Подарок', icon: '🎁', price: 150 },
  { id: 4, name: 'Сердце', icon: '❤️', price: 200 },
  { id: 5, name: 'Диамант', icon: '💎', price: 500 },
  { id: 6, name: 'Корона', icon: '👑', price: 1000 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [showPremium, setShowPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [authStep, setAuthStep] = useState<'phone' | 'code'>('phone');
  const [coins, setCoins] = useState(1250);
  const [showGifts, setShowGifts] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Отлично! Что у тебя?', sender: 'me', time: '14:31' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const premiumEmojis = ['😎', '🔥', '⭐', '💎', '👑', '🚀', '💫', '✨', '🌟', '💯', '🎯', '🏆'];

  const handleOpenChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setShowGifts(false);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleBuyGift = (gift: Gift) => {
    if (coins >= gift.price) {
      setCoins(coins - gift.price);
      const giftMsg: Message = {
        id: messages.length + 1,
        text: `Подарок: ${gift.icon} ${gift.name}`,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, giftMsg]);
      setShowGifts(false);
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-6xl mx-auto p-4 md:p-6">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Messenger
                </h1>
                <p className="text-sm text-muted-foreground">Связь без границ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Card className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/20">
                <span className="text-2xl">🪙</span>
                <span className="font-bold text-lg">{coins}</span>
              </Card>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowPhoneAuth(true)}
                className="hover:bg-accent/10 transition-all"
              >
                <Icon name="UserPlus" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-primary/10 transition-all"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowPremium(!showPremium)}
                className="hover:bg-secondary/10 transition-all"
              >
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </header>

        {showPremium ? (
          <Card className="p-8 animate-scale-in border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent mb-4 shadow-xl">
                <Icon name="Crown" size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Premium
              </h2>
              <p className="text-muted-foreground text-lg">Максимум возможностей</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4">
                  <Icon name="Video" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">HD Видеозвонки</h3>
                <p className="text-muted-foreground">Кристально чистое качество до 4K разрешения</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4">
                  <Icon name="Mic" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Безлимитные голосовые</h3>
                <p className="text-muted-foreground">Отправляйте сообщения любой длины</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Быстрая загрузка</h3>
                <p className="text-muted-foreground">Приоритетная скорость отправки файлов</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Максимальная защита</h3>
                <p className="text-muted-foreground">Усиленное шифрование данных</p>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all text-white font-semibold px-12 h-14 text-lg shadow-xl"
              >
                Попробовать Premium
                <Icon name="Sparkles" size={20} className="ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">299 ₽/месяц • Отмена в любой момент</p>
            </div>

            <Button 
              variant="ghost" 
              className="mt-6 w-full"
              onClick={() => setShowPremium(false)}
            >
              Вернуться назад
            </Button>
          </Card>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/50 p-1 h-14 animate-fade-in">
                <TabsTrigger value="chats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white transition-all">
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Чаты
                </TabsTrigger>
                <TabsTrigger value="calls" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-secondary/80 data-[state=active]:text-white transition-all">
                  <Icon name="Phone" size={18} className="mr-2" />
                  Звонки
                </TabsTrigger>
                <TabsTrigger value="contacts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent/80 data-[state=active]:text-white transition-all">
                  <Icon name="Users" size={18} className="mr-2" />
                  Контакты
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all">
                  <Icon name="User" size={18} className="mr-2" />
                  Профиль
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chats" className="space-y-4">
                <div className="relative animate-slide-in">
                  <Icon name="Search" size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Поиск чатов..." 
                    className="pl-12 h-12 bg-card border-border/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  {filteredChats.map((chat, index) => (
                    <Card 
                      key={chat.id} 
                      className="p-4 hover:bg-accent/5 transition-all cursor-pointer border-border/50 animate-fade-in hover:scale-[1.02] hover:shadow-lg"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleOpenChat(chat)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-14 h-14 border-2 border-primary/20">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                              {chat.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold truncate">{chat.name}</h3>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread && (
                          <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calls" className="space-y-2">
                {calls.map((call, index) => (
                  <Card 
                    key={call.id} 
                    className="p-4 hover:bg-accent/5 transition-all cursor-pointer border-border/50 animate-fade-in hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 border-2 border-secondary/20">
                        <AvatarImage src={call.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white font-semibold">
                          {call.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{call.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon 
                            name={call.type === 'video' ? 'Video' : 'Phone'} 
                            size={14} 
                            className={call.missed ? 'text-destructive' : 'text-green-500'} 
                          />
                          <span>{call.time}</span>
                          <span>•</span>
                          <span>{call.duration}</span>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="hover:bg-secondary/20 transition-all"
                      >
                        <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={20} className="text-secondary" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <Card className="p-8 text-center border-dashed border-2 animate-scale-in">
                  <Icon name="UserPlus" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Добавьте контакты</h3>
                  <p className="text-muted-foreground mb-4">Пригласите друзей для общения</p>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить контакт
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <Card className="p-6 animate-scale-in border-primary/20">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-accent text-white text-3xl font-bold">
                        В
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mb-1">Вы</h2>
                    <p className="text-muted-foreground">@your_username</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 border-primary/30 hover:bg-primary/10"
                    >
                      Редактировать профиль
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Card 
                      className="p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setShowPremium(true)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Icon name="Crown" size={20} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Получить Premium</h3>
                            <p className="text-sm text-muted-foreground">HD-качество и больше</p>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-accent/5 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Palette" size={20} className="text-primary" />
                          <span className="font-medium">Оформление</span>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-accent/5 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Lock" size={20} className="text-secondary" />
                          <span className="font-medium">Приватность</span>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-accent/5 transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="Bell" size={20} className="text-accent" />
                          <span className="font-medium">Уведомления</span>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </Card>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <Button 
              className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-2xl transition-all hover:scale-110"
              size="icon"
              onClick={() => setShowCreateChannel(true)}
            >
              <Icon name="Plus" size={28} className="text-white" />
            </Button>
          </>
        )}

        {showCreateChannel && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-md p-6 animate-scale-in border-2 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Создать канал</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateChannel(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название канала</label>
                  <Input 
                    placeholder="Введите название канала"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Описание</label>
                  <Input 
                    placeholder="О чём ваш канал?"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium block">Тип канала</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-4 cursor-pointer hover:bg-primary/5 transition-all border-2 border-primary/20">
                      <div className="flex flex-col items-center gap-2">
                        <Icon name="Users" size={24} className="text-primary" />
                        <span className="text-sm font-medium">Публичный</span>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer hover:bg-secondary/5 transition-all border-2 border-transparent">
                      <div className="flex flex-col items-center gap-2">
                        <Icon name="Lock" size={24} className="text-secondary" />
                        <span className="text-sm font-medium">Приватный</span>
                      </div>
                    </Card>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                  onClick={() => {
                    setShowCreateChannel(false);
                    setChannelName('');
                  }}
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать канал
                </Button>
              </div>
            </Card>
          </div>
        )}

        {showPhoneAuth && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-md p-6 animate-scale-in border-2 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Регистрация</h3>
                <Button variant="ghost" size="icon" onClick={() => {
                  setShowPhoneAuth(false);
                  setAuthStep('phone');
                  setPhoneNumber('');
                  setVerificationCode('');
                }}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {authStep === 'phone' ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                      <Icon name="Phone" size={32} className="text-white" />
                    </div>
                    <p className="text-muted-foreground">
                      Введите номер телефона для регистрации
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Номер телефона</label>
                    <Input 
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                    onClick={() => setAuthStep('code')}
                    disabled={phoneNumber.length < 10}
                  >
                    Получить код
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с условиями использования
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent mb-4">
                      <Icon name="MessageSquare" size={32} className="text-white" />
                    </div>
                    <p className="text-muted-foreground">
                      Введите код из SMS
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Отправлен на {phoneNumber}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Код подтверждения</label>
                    <Input 
                      type="text"
                      placeholder="● ● ● ● ● ●"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="h-12 text-lg text-center tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                    onClick={() => {
                      setShowPhoneAuth(false);
                      setAuthStep('phone');
                      setPhoneNumber('');
                      setVerificationCode('');
                    }}
                    disabled={verificationCode.length < 6}
                  >
                    Подтвердить
                  </Button>

                  <Button 
                    variant="ghost"
                    className="w-full"
                    onClick={() => setAuthStep('phone')}
                  >
                    Изменить номер
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {selectedChat && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-3xl h-[600px] flex flex-col animate-scale-in border-2 border-primary/20">
              <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                      {selectedChat.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{selectedChat.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedChat.online ? 'В сети' : 'Не в сети'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => setShowVideoCall(true)}>
                    <Icon name="Video" size={20} className="text-secondary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => setShowGifts(true)}>
                    <Icon name="Gift" size={20} className="text-accent" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-destructive/10" onClick={handleCloseChat}>
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-2xl ${
                        message.sender === 'me' 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-sm' 
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${
                        message.sender === 'me' ? 'text-right' : 'text-left'
                      }`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-gradient-to-r from-primary/5 to-secondary/5">
                {showEmojiPicker && (
                  <div className="mb-4 p-4 bg-card rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Crown" size={16} className="text-amber-500" />
                      <span className="text-sm font-semibold">Premium эмодзи</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {premiumEmojis.map((emoji, idx) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          className="text-2xl hover:scale-125 transition-all"
                          onClick={() => {
                            setNewMessage(newMessage + emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Icon name="Smile" size={20} className="text-muted-foreground" />
                  </Button>
                  <Input 
                    placeholder="Написать сообщение..." 
                    className="flex-1 h-12 bg-background border-border/50"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    size="icon"
                    className="h-12 w-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                    onClick={handleSendMessage}
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {showGifts && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-md p-6 animate-scale-in border-2 border-accent/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Отправить подарок</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowGifts(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="mb-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 flex items-center justify-between">
                <span className="text-sm font-medium">Ваш баланс:</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  <span className="font-bold text-lg">{coins}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {gifts.map((gift) => (
                  <Card 
                    key={gift.id}
                    className="p-4 cursor-pointer hover:bg-accent/5 transition-all hover:scale-105 border-border/50"
                    onClick={() => handleBuyGift(gift)}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-5xl mb-2">{gift.icon}</div>
                      <p className="font-medium text-sm">{gift.name}</p>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg">🪙</span>
                        <span className="font-bold">{gift.price}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Подарки появятся в чате после покупки
              </p>
            </Card>
          </div>
        )}

        {showVideoCall && (
          <div className="fixed inset-0 bg-black z-[70] flex items-center justify-center animate-fade-in">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white/20">
                    <AvatarImage src={selectedChat?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                      {selectedChat?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedChat?.name}</h2>
                  <p className="text-white/70 text-lg">Видеозвонок...</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                  onClick={() => setShowVideoCall(false)}
                >
                  <Icon name="PhoneOff" size={28} className="text-white" />
                </Button>
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Icon name="Mic" size={28} className="text-white" />
                </Button>
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Icon name="Video" size={28} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;