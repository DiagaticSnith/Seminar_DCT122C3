import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  Zap, 
  Coins, 
  BookOpen, 
  Sliders, 
  LogOut, 
  Search, 
  Edit, 
  Trash, 
  Plus, 
  Check, 
  AlertTriangle,
  SlidersHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import api from './services/api';
import axios from 'axios';

// Pie/Donut Chart Colors
const COLORS = ['#39FF14', '#00FFFF', '#FF9F00', '#FF4F9A'];

interface FoodItem {
  id: string;
  name: string;
  baseServingSize: number;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFat: number;
}

interface ExerciseItem {
  id: string;
  name: string;
  category: string;
  tags: string[];
  youtubeLink?: string;
}

interface UserItem {
  id: string;
  email: string;
  role: string;
  suspended: boolean;
  createdAt: string;
}

interface SystemPrompt {
  id?: string;
  workoutStyle: string;
  prompt: string;
}

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  tokenUsage: number;
  tokenCost: number;
}

interface ChartItem {
  date: string;
  tokens: number;
}

interface WorkoutDistItem {
  workoutStyle: string;
  count: number;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'master' | 'ai' | 'users'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Analytics State
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    tokenUsage: 0,
    tokenCost: 0
  });

  // Chart data state
  const [tokenConsumption, setTokenConsumption] = useState<ChartItem[]>([]);
  const [workoutDistribution, setWorkoutDistribution] = useState<WorkoutDistItem[]>([]);

  // Master Data State
  const [masterTab, setMasterTab] = useState<'food' | 'exercise'>('food');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);

  // Modals for CRUD
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [foodForm, setFoodForm] = useState({
    name: '',
    baseServingSize: 100,
    baseCalories: 0,
    baseProtein: 0,
    baseCarbs: 0,
    baseFat: 0
  });

  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseItem | null>(null);
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    category: 'Chest',
    tags: ['Gym', 'Bodybuilding'] as string[],
    youtubeLink: ''
  });

  // AI Prompt State
  const [prompts, setPrompts] = useState<SystemPrompt[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('Gym');
  const [promptText, setPromptText] = useState('');
  const [strictMedicalGuardrails, setStrictMedicalGuardrails] = useState(true);
  const [fallbackRoutines, setFallbackRoutines] = useState(true);
  const [promptSuccessMessage, setPromptSuccessMessage] = useState('');

  // User Management State
  const [users, setUsers] = useState<UserItem[]>([]);

  // Fetch initial dashboard metrics
  const loadDashboardData = async () => {
    try {
      const analyticsRes = await api.get('/analytics/users');
      if (analyticsRes.data?.success) {
        setAnalytics(analyticsRes.data.data);
      }

      const chartsRes = await api.get('/analytics/charts');
      if (chartsRes.data?.success) {
        setTokenConsumption(chartsRes.data.data.tokenConsumption || []);
        setWorkoutDistribution(chartsRes.data.data.workoutDistribution || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard statistics', err);
    }
  };

  // Fetch users list
  const loadUsersData = async () => {
    try {
      const usersRes = await api.get('/users');
      if (usersRes.data?.success) {
        setUsers(usersRes.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load users data', err);
    }
  };

  // Fetch foods & exercises
  const loadMasterData = async () => {
    try {
      const foodRes = await api.get('/master/food');
      if (foodRes.data?.success || Array.isArray(foodRes.data?.data)) {
        setFoods(foodRes.data.data || foodRes.data);
      }

      const exerciseRes = await api.get('/master/exercises');
      if (exerciseRes.data?.success || Array.isArray(exerciseRes.data?.data)) {
        setExercises(exerciseRes.data.data || exerciseRes.data);
      }
    } catch (err) {
      console.error('Failed to load master records', err);
    }
  };

  // Fetch system prompts
  const loadPromptsData = async () => {
    try {
      const promptRes = await api.get('/prompts');
      if (promptRes.data?.success) {
        const fetchedPrompts = promptRes.data.data || [];
        setPrompts(fetchedPrompts);
        
        // Find prompt for currently selected style
        const active = fetchedPrompts.find((p: any) => p.workoutStyle === selectedStyle);
        setPromptText(active ? active.prompt : '');
      }
    } catch (err) {
      console.error('Failed to load system prompts', err);
    }
  };

  // Trigger loads on tab change
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'overview') {
      loadDashboardData();
    } else if (activeTab === 'master') {
      loadMasterData();
    } else if (activeTab === 'ai') {
      loadPromptsData();
    } else if (activeTab === 'users') {
      loadUsersData();
    }
  }, [activeTab, token]);

  // Update prompt text when style changes
  useEffect(() => {
    const active = prompts.find(p => p.workoutStyle === selectedStyle);
    setPromptText(active ? active.prompt : '');
  }, [selectedStyle, prompts]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password });
      const responseBody = res.data;
      if (responseBody?.success && responseBody?.data) {
        const { token: userToken, user } = responseBody.data;
        if (user.role !== 'ADMIN') {
          setLoginError('Forbidden: Access limited to administrators only.');
          return;
        }
        localStorage.setItem('adminToken', userToken);
        setToken(userToken);
        setActiveTab('overview');
      } else {
        setLoginError(responseBody?.message || 'Unexpected authentication response.');
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setFoods([]);
    setExercises([]);
    setUsers([]);
    setPrompts([]);
  };

  // Handle Suspend/Unsuspend Toggle
  const handleToggleSuspend = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await api.post(`/users/${userId}/suspend`, { suspended: !currentStatus });
      if (res.data?.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, suspended: !currentStatus } : u));
      }
    } catch (err) {
      console.error('Failed to toggle user suspension', err);
    }
  };

  // Handle Prompt Save
  const handleSavePrompt = async () => {
    setPromptSuccessMessage('');
    try {
      const res = await api.post('/prompts', {
        workoutStyle: selectedStyle,
        prompt: promptText
      });
      if (res.data?.success) {
        setPromptSuccessMessage('Configuration saved successfully!');
        loadPromptsData();
        setTimeout(() => setPromptSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Failed to save prompts', err);
    }
  };

  // Food CRUD Actions
  const openAddFood = () => {
    setEditingFood(null);
    setFoodForm({
      name: '',
      baseServingSize: 100,
      baseCalories: 0,
      baseProtein: 0,
      baseCarbs: 0,
      baseFat: 0
    });
    setFoodModalOpen(true);
  };

  const openEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      baseServingSize: food.baseServingSize,
      baseCalories: food.baseCalories,
      baseProtein: food.baseProtein,
      baseCarbs: food.baseCarbs,
      baseFat: food.baseFat
    });
    setFoodModalOpen(true);
  };

  const handleSaveFood = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFood) {
        const res = await api.put(`/master/food/${editingFood.id}`, foodForm);
        if (res.data?.success) {
          setFoods(foods.map(f => f.id === editingFood.id ? { ...f, ...foodForm } : f));
          setFoodModalOpen(false);
        }
      } else {
        const res = await api.post('/master/food', foodForm);
        if (res.data?.success) {
          setFoods([...foods, res.data.data]);
          setFoodModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save food record', err);
    }
  };

  const handleDeleteFood = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      const res = await api.delete(`/master/food/${id}`);
      if (res.data?.success) {
        setFoods(foods.filter(f => f.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete food item', err);
    }
  };

  // Exercise CRUD Actions
  const openAddExercise = () => {
    setEditingExercise(null);
    setExerciseForm({
      name: '',
      category: 'Chest',
      tags: ['Gym', 'Bodybuilding'],
      youtubeLink: ''
    });
    setExerciseModalOpen(true);
  };

  const openEditExercise = (ex: ExerciseItem) => {
    setEditingExercise(ex);
    setExerciseForm({
      name: ex.name,
      category: ex.category,
      tags: ex.tags || ['Gym', 'Bodybuilding'],
      youtubeLink: ex.youtubeLink || ''
    });
    setExerciseModalOpen(true);
  };

  const handleSaveExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExercise) {
        const res = await api.put(`/master/exercises/${editingExercise.id}`, exerciseForm);
        if (res.data?.success) {
          setExercises(exercises.map(ex => ex.id === editingExercise.id ? { ...ex, ...exerciseForm } : ex));
          setExerciseModalOpen(false);
        }
      } else {
        const res = await api.post('/master/exercises', exerciseForm);
        if (res.data?.success) {
          setExercises([...exercises, res.data.data]);
          setExerciseModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save exercise record', err);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this exercise item?')) return;
    try {
      const res = await api.delete(`/master/exercises/${id}`);
      if (res.data?.success) {
        setExercises(exercises.filter(ex => ex.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete exercise item', err);
    }
  };

  // Load first screen data
  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  // Auth Screen Render
  if (!token) {
    return (
      <div className="min-h-screen bg-[#060812] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-neonGreen opacity-10 filter blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#00FFFF] opacity-10 filter blur-[80px]"></div>

        <div className="max-w-md w-full bg-[#0b0f19] border border-darkGreenBorder rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-[#111b15] border border-neonGreen/30 rounded-xl mb-4">
              <Zap className="w-8 h-8 text-neonGreen fill-neonGreen" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">GymFitness-AI</h1>
            <p className="text-sm text-textGrey mt-1">Administrative Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200 text-xs">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-textGrey mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonGreen/50 focus:ring-1 focus:ring-neonGreen/30 transition-all"
                placeholder="admin@gymfitness.ai"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-textGrey mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neonGreen/50 focus:ring-1 focus:ring-neonGreen/30 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-neonGreen hover:bg-neonGreen/95 text-black font-semibold rounded-xl py-3 text-sm transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Layout Render
  return (
    <div className="min-h-screen bg-[#060812] flex text-white relative">
      {/* Sidebar */}
      <aside className="w-64 bg-[#090d16] border-r border-[#0f1525] flex flex-col justify-between shrink-0 p-6 z-20">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#111b15] border border-neonGreen/30 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-neonGreen fill-neonGreen" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide">GymFitness-AI</h2>
              <span className="text-[10px] text-neonGreen font-semibold uppercase tracking-wider">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-neonGreen text-black font-bold shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                  : 'text-textGrey hover:text-white hover:bg-[#111624]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab('master')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'master' 
                  ? 'bg-neonGreen text-black font-bold shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                  : 'text-textGrey hover:text-white hover:bg-[#111624]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Master Data</span>
            </button>

            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'ai' 
                  ? 'bg-neonGreen text-black font-bold shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                  : 'text-textGrey hover:text-white hover:bg-[#111624]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>AI Tuning</span>
            </button>

            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'users' 
                  ? 'bg-neonGreen text-black font-bold shadow-[0_0_12px_rgba(57,255,20,0.25)]' 
                  : 'text-textGrey hover:text-white hover:bg-[#111624]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-textGrey hover:text-red-400 px-4 py-3 rounded-xl text-sm transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-[#0f1525] bg-[#090d16]/50 backdrop-blur-md px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="w-96 relative">
            <Search className="w-4 h-4 text-textGrey absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search users, data..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#111624] border border-[#1d273d] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-textGrey focus:outline-none focus:border-neonGreen/40"
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Tokens Info */}
            <div className="border border-neonGreen/30 bg-[#111b15] px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs">
              <Zap className="w-3.5 h-3.5 text-neonGreen fill-neonGreen" />
              <span className="text-neonGreen font-semibold">
                {analytics.tokenUsage.toLocaleString()} / 100k Tokens
              </span>
            </div>

            {/* Admin Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neonGreen text-black font-bold text-xs flex items-center justify-center">
                AD
              </div>
              <span className="text-xs font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Analytics Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Card 1: Total Users */}
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-textGrey uppercase tracking-wider">Total Users</span>
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{analytics.totalUsers}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-neonGreen font-semibold">
                    <span>+12%</span>
                    <span className="text-textGrey font-normal">from last month</span>
                  </div>
                </div>

                {/* Card 2: Weekly Active */}
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-textGrey uppercase tracking-wider">Weekly Active</span>
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{analytics.activeUsers}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-neonGreen font-semibold">
                    <span>+8%</span>
                    <span className="text-textGrey font-normal">from last week</span>
                  </div>
                </div>

                {/* Card 3: Tokens Consumed */}
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-textGrey uppercase tracking-wider">Tokens Consumed</span>
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{analytics.tokenUsage.toLocaleString()}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold">
                    <span>-3%</span>
                    <span className="text-textGrey font-normal">optimization rate</span>
                  </div>
                </div>

                {/* Card 4: Token Cost */}
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-textGrey uppercase tracking-wider">Token Cost</span>
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                      <Coins className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">${analytics.tokenCost.toFixed(2)}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-neonGreen font-semibold">
                    <span>+5%</span>
                    <span className="text-textGrey font-normal">vs budget limit</span>
                  </div>
                </div>
              </div>

              {/* Charts Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 30-Day API Token Consumption Area Chart */}
                <div className="lg:col-span-2 bg-[#090d16] border border-[#0f1525] rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-4 h-4 text-neonGreen" />
                    <h3 className="text-sm font-bold">30-Day API Token Consumption</h3>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={tokenConsumption}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#39FF14" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#141a29" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="#4b5563" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => value.split('-')[2] || value}
                        />
                        <YAxis 
                          stroke="#4b5563" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1d273d' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="tokens" 
                          stroke="#39FF14" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorTokens)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Workout Distribution Donut Chart */}
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6">
                  <h3 className="text-sm font-bold mb-6">Workout Distribution</h3>
                  <div className="h-64 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={workoutDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="workoutStyle"
                        >
                          {workoutDistribution.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1d273d' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend Panel */}
                  <div className="space-y-2 mt-4 text-xs font-medium">
                    {workoutDistribution.map((item, idx) => {
                      const totalCount = workoutDistribution.reduce((acc, curr) => acc + curr.count, 0) || 1;
                      const percentage = Math.round((item.count / totalCount) * 100);
                      return (
                        <div key={item.workoutStyle} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                            ></span>
                            <span className="text-textGrey">{item.workoutStyle}</span>
                          </div>
                          <span>{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'master' && (
            <div className="space-y-6">
              {/* Inner Tab bar */}
              <div className="flex border-b border-[#0f1525] gap-6">
                <button
                  onClick={() => setMasterTab('food')}
                  className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                    masterTab === 'food' ? 'border-neonGreen text-neonGreen' : 'border-transparent text-textGrey hover:text-white'
                  }`}
                >
                  Food Dictionary
                </button>
                <button
                  onClick={() => setMasterTab('exercise')}
                  className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                    masterTab === 'exercise' ? 'border-neonGreen text-neonGreen' : 'border-transparent text-textGrey hover:text-white'
                  }`}
                >
                  Exercises
                </button>
              </div>

              {masterTab === 'food' ? (
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-[#0f1525] flex justify-between items-center">
                    <h3 className="text-sm font-bold">Nutrition Database</h3>
                    <button 
                      onClick={openAddFood}
                      className="bg-neonGreen hover:bg-neonGreen/95 text-black font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Food Item
                    </button>
                  </div>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#0f1525] text-textGrey font-semibold uppercase tracking-wider">
                        <th className="px-6 py-4">Food Name</th>
                        <th className="px-6 py-4">Serving Size</th>
                        <th className="px-6 py-4">Calories (kcal)</th>
                        <th className="px-6 py-4">Protein (g)</th>
                        <th className="px-6 py-4">Carbs (g)</th>
                        <th className="px-6 py-4">Fat (g)</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0f1525] font-medium text-white">
                      {foods
                        .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(food => (
                          <tr key={food.id} className="hover:bg-[#111624]/30 transition-all">
                            <td className="px-6 py-4 font-bold">{food.name}</td>
                            <td className="px-6 py-4">{food.baseServingSize}g</td>
                            <td className="px-6 py-4 text-neonGreen">{food.baseCalories}</td>
                            <td className="px-6 py-4">{food.baseProtein}g</td>
                            <td className="px-6 py-4">{food.baseCarbs}g</td>
                            <td className="px-6 py-4">{food.baseFat}g</td>
                            <td className="px-6 py-4 flex gap-3">
                              <button onClick={() => openEditFood(food)} className="text-neonGreen hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteFood(food.id)} className="text-red-400 hover:text-red-500 transition-all"><Trash className="w-4 h-4" /></button>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-[#0f1525] flex justify-between items-center">
                    <h3 className="text-sm font-bold">Exercise Database</h3>
                    <button 
                      onClick={openAddExercise}
                      className="bg-neonGreen hover:bg-neonGreen/95 text-black font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Exercise
                    </button>
                  </div>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#0f1525] text-textGrey font-semibold uppercase tracking-wider">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Tags</th>
                        <th className="px-6 py-4">YouTube Link</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0f1525] font-medium text-white">
                      {exercises
                        .filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(ex => (
                          <tr key={ex.id} className="hover:bg-[#111624]/30 transition-all">
                            <td className="px-6 py-4 font-bold">{ex.name}</td>
                            <td className="px-6 py-4 text-cyan-400">{ex.category}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {(ex.tags || []).map(tag => (
                                  <span key={tag} className="px-1.5 py-0.5 rounded bg-[#111b15] text-[10px] text-neonGreen font-semibold border border-neonGreen/20">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate text-textGrey">
                              {ex.youtubeLink ? (
                                <a href={ex.youtubeLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                                  {ex.youtubeLink}
                                </a>
                              ) : (
                                <span className="italic text-textGrey/50">None</span>
                              )}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                              <button onClick={() => openEditExercise(ex)} className="text-neonGreen hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteExercise(ex.id)} className="text-red-400 hover:text-red-500 transition-all"><Trash className="w-4 h-4" /></button>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Config Panel */}
              <div className="lg:col-span-2 bg-[#090d16] border border-[#0f1525] rounded-xl p-8 space-y-6">
                <div className="flex items-center gap-2 border-b border-[#0f1525] pb-4">
                  <SlidersHorizontal className="w-4 h-4 text-neonGreen" />
                  <h3 className="text-base font-bold">AI Coach Settings</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-textGrey uppercase tracking-wider mb-2">Workout Target Profile</label>
                    <select 
                      value={selectedStyle} 
                      onChange={e => setSelectedStyle(e.target.value)}
                      className="bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-neonGreen/40"
                    >
                      <option value="Gym">Gym Coach Profile</option>
                      <option value="Yoga">Yoga Coach Profile</option>
                      <option value="Home Cardio">Home Cardio Profile</option>
                      <option value="Diet Only">Diet Coach Profile</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textGrey uppercase tracking-wider mb-2">System Instructions Prompt</label>
                    <textarea 
                      rows={10}
                      value={promptText}
                      onChange={e => setPromptText(e.target.value)}
                      placeholder="Enter system prompt for AI Persona..."
                      className="bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-3 text-sm text-white w-full font-mono focus:outline-none focus:border-neonGreen/40"
                    />
                  </div>
                </div>

                {promptSuccessMessage && (
                  <div className="p-3 bg-neonGreen/10 border border-neonGreen/30 rounded-xl flex items-center gap-2.5 text-neonGreen text-xs">
                    <Check className="w-4 h-4" />
                    <span>{promptSuccessMessage}</span>
                  </div>
                )}

                <button 
                  onClick={handleSavePrompt}
                  className="bg-neonGreen hover:bg-neonGreen/95 text-black font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_12px_rgba(57,255,20,0.2)]"
                >
                  Save Configuration
                </button>
              </div>

              {/* Right Switches Panel */}
              <div className="space-y-6">
                <div className="bg-[#090d16] border border-[#0f1525] rounded-xl p-6 space-y-6">
                  <h3 className="text-sm font-bold border-b border-[#0f1525] pb-3">Security Guardrails</h3>

                  {/* Toggle 1: Strict Medical Guardrails */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Strict Medical Guardrails</h4>
                      <p className="text-[10px] text-textGrey max-w-[200px]">Intercept medical/medication queries and reject automatically.</p>
                    </div>
                    <button 
                      onClick={() => setStrictMedicalGuardrails(!strictMedicalGuardrails)}
                      className={`w-11 h-6 rounded-full transition-all relative ${
                        strictMedicalGuardrails ? 'bg-neonGreen' : 'bg-gray-800'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-all ${
                        strictMedicalGuardrails ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>

                  {/* Toggle 2: Fallback Routines */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Fallback Routines</h4>
                      <p className="text-[10px] text-textGrey max-w-[200px]">Substitute standard plans if the LLM request experiences timeouts.</p>
                    </div>
                    <button 
                      onClick={() => setFallbackRoutines(!fallbackRoutines)}
                      className={`w-11 h-6 rounded-full transition-all relative ${
                        fallbackRoutines ? 'bg-neonGreen' : 'bg-gray-800'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-all ${
                        fallbackRoutines ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#111b15] border border-neonGreen/20 rounded-xl p-6 flex gap-4">
                  <AlertTriangle className="w-5 h-5 text-neonGreen shrink-0" />
                  <div className="text-xs">
                    <h4 className="font-bold text-white mb-1">Notice: Prompt Tuning</h4>
                    <p className="text-textGrey leading-relaxed">System prompt changes take effect instantly across all active WebSocket chat threads.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-[#090d16] border border-[#0f1525] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#0f1525]">
                <h3 className="text-sm font-bold">Registered Gym Members</h3>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#0f1525] text-textGrey font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">User ID</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Account Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0f1525] font-medium text-white">
                  {users
                    .filter(u => u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(user => (
                      <tr key={user.id} className="hover:bg-[#111624]/30 transition-all">
                        <td className="px-6 py-4 font-mono text-[10px] text-textGrey">{user.id}</td>
                        <td className="px-6 py-4 font-bold">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            user.suspended 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                              : 'bg-neonGreen/10 text-neonGreen border border-neonGreen/20'
                          }`}>
                            {user.suspended ? 'Suspended' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {user.role === 'ADMIN' ? (
                            <span className="text-[10px] text-textGrey italic">Protected</span>
                          ) : (
                            <button
                              onClick={() => handleToggleSuspend(user.id, user.suspended)}
                              className={`px-3 py-1.5 rounded font-bold text-[10px] transition-all ${
                                user.suspended 
                                  ? 'bg-[#111b15] text-neonGreen hover:bg-neonGreen hover:text-black border border-neonGreen/30' 
                                  : 'bg-red-950/40 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20'
                              }`}
                            >
                              {user.suspended ? 'Activate' : 'Suspend'}
                            </button>
                          )}
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* CRUD Modal for Foods */}
      {foodModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full bg-[#0b0f19] border border-darkGreenBorder rounded-2xl p-8 relative">
            <h3 className="text-lg font-bold mb-6 text-white">
              {editingFood ? 'Edit Nutrition Item' : 'Add New Nutrition Item'}
            </h3>
            <form onSubmit={handleSaveFood} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Food Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neonGreen/50"
                  value={foodForm.name}
                  onChange={e => setFoodForm({ ...foodForm, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Serving Size (g)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={foodForm.baseServingSize}
                    onChange={e => setFoodForm({ ...foodForm, baseServingSize: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Calories (kcal)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={foodForm.baseCalories}
                    onChange={e => setFoodForm({ ...foodForm, baseCalories: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Protein (g)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={foodForm.baseProtein}
                    onChange={e => setFoodForm({ ...foodForm, baseProtein: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Carbs (g)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={foodForm.baseCarbs}
                    onChange={e => setFoodForm({ ...foodForm, baseCarbs: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Fat (g)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={foodForm.baseFat}
                    onChange={e => setFoodForm({ ...foodForm, baseFat: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 justify-end">
                <button 
                  type="button" 
                  onClick={() => setFoodModalOpen(false)}
                  className="bg-transparent border border-darkGreenBorder hover:bg-[#111624] text-textGrey font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-neonGreen hover:bg-neonGreen/95 text-black font-semibold px-6 py-2 rounded-lg text-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CRUD Modal for Exercises */}
      {exerciseModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full bg-[#0b0f19] border border-darkGreenBorder rounded-2xl p-8 relative">
            <h3 className="text-lg font-bold mb-6 text-white">
              {editingExercise ? 'Edit Exercise Record' : 'Add New Exercise'}
            </h3>
            <form onSubmit={handleSaveExercise} className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Exercise Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neonGreen/50"
                  value={exerciseForm.name}
                  onChange={e => setExerciseForm({ ...exerciseForm, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Category (e.g., Chest, Back, Legs)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neonGreen/50"
                    placeholder="e.g. Chest"
                    value={exerciseForm.category}
                    onChange={e => setExerciseForm({ ...exerciseForm, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">Workout Program Type</label>
                  <select 
                    className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={exerciseForm.tags.includes('Yoga') ? 'Yoga' : exerciseForm.tags.includes('Cardio') ? 'Cardio' : 'Gym'}
                    onChange={e => {
                      const val = e.target.value;
                      const newTags = val === 'Yoga' ? ['Yoga', 'Home'] : val === 'Cardio' ? ['Cardio', 'Home'] : ['Gym', 'Bodybuilding'];
                      setExerciseForm({ ...exerciseForm, tags: newTags });
                    }}
                  >
                    <option value="Gym">Gym / Bodybuilding</option>
                    <option value="Yoga">Yoga / Flexibility</option>
                    <option value="Cardio">Cardio / HIIT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-textGrey mb-2">YouTube Video URL</label>
                <input 
                  type="text" 
                  className="w-full bg-inputBackground border border-darkGreenBorder rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder="https://youtube.com/..."
                  value={exerciseForm.youtubeLink}
                  onChange={e => setExerciseForm({ ...exerciseForm, youtubeLink: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4 justify-end">
                <button 
                  type="button" 
                  onClick={() => setExerciseModalOpen(false)}
                  className="bg-transparent border border-darkGreenBorder hover:bg-[#111624] text-textGrey font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-neonGreen hover:bg-neonGreen/95 text-black font-semibold px-6 py-2 rounded-lg text-xs"
                >
                  Save Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
