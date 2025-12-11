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

const chats: Chat[] = [
  { id: 1, name: 'Александра', avatar: '', lastMessage: 'Отправила голосовое сообщение', time: '14:32', unread: 3, online: true },
  { id: 2, name: 'Команда проекта', avatar: '', lastMessage: 'Марк: Встреча в 15:00', time: '13:20', unread: 5, online: false },
  { id: 3, name: 'Дмитрий', avatar: '', lastMessage: 'Созвон завтра?', time: '12:05', online: true },
  { id: 4, name: 'Мама ❤️', avatar: '', lastMessage: 'Не забудь позвонить', time: 'Вчера', online: false },
  { id: 5, name: 'Анна Смирнова', avatar: '', lastMessage: 'Спасибо за помощь!', time: 'Вчера', online: true },
];

const calls: Call[] = [
  { id: 1, name: 'Александра', avatar: '', type: 'video', time: 'Сегодня 14:20', duration: '45 мин' },
  { id: 2, name: 'Дмитрий', avatar: '', type: 'audio', time: 'Сегодня 11:15', duration: '12 мин' },
  { id: 3, name: 'Команда проекта', avatar: '', type: 'video', time: 'Вчера', duration: '1 ч 23 мин' },
  { id: 4, name: 'Анна Смирнова', avatar: '', type: 'audio', time: 'Вчера', duration: '5 мин', missed: true },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [showPremium, setShowPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
            >
              <Icon name="Plus" size={28} className="text-white" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;