// ==================== STATE MANAGEMENT & SEED DATA ====================
const initialData = {
  user: {
    name: "Rohan Sharma",
    email: "rohan.sharma@university.edu",
    level: 5,
    xp: 450,
    streak: 14
  },
  currency: "₹",
  theme: "dark",
  balance: 18450,
  expenses: [
    { id: 1, title: "Cafe Coffee Day", amount: 180, category: "Food", date: "2026-05-20" },
    { id: 2, title: "Semester-3 Books", amount: 1200, category: "Academics", date: "2026-05-18" },
    { id: 3, title: "Spotify Student Premium", amount: 59, category: "Utilities", date: "2026-05-15" },
    { id: 4, title: "Uber ride to campus", amount: 220, category: "Travel", date: "2026-05-14" },
    { id: 5, title: "Movie ticket & popcorn", amount: 450, category: "Entertainment", date: "2026-05-10" },
    { id: 6, title: "Zomato dinner delivery", amount: 340, category: "Food", date: "2026-05-08" },
    { id: 7, title: "College Gym Monthly", amount: 500, category: "Other", date: "2026-05-01" }
  ],
  savingsGoals: [
    { id: 1, title: "Goa Trip 🏖️", current: 3400, target: 5000, date: "2026-07-15", completed: false },
    { id: 2, title: "New iPad Pro 💻", current: 12000, target: 45000, date: "2026-12-01", completed: false },
    { id: 3, title: "Emergency Fund 🚨", current: 3000, target: 10000, date: "2026-09-30", completed: false }
  ],
  investments: [
    { id: 1, name: "Mutual Funds (Index SIP)", amount: 8000, pct: 52, color: "#00C896" },
    { id: 2, name: "Equity Stocks (Zomato/Tata)", amount: 4200, pct: 27, color: "#6366f1" },
    { id: 3, name: "Crypto Assets (BTC/ETH)", amount: 1800, pct: 12, color: "#a855f7" },
    { id: 4, name: "FD / Debt (Post Office)", amount: 1400, pct: 9, color: "#06b6d4" }
  ],
  budgets: {
    "Food": 5000,
    "Academics": 3000,
    "Entertainment": 2000,
    "Travel": 2000,
    "Utilities": 1000,
    "Other": 2000
  },
  subscriptions: [
    { id: 1, name: "Netflix Premium", amount: 649, shared: false, icon: "🎬", desc: "Premium 4K plan" },
    { id: 2, name: "Spotify Student", amount: 59, shared: false, icon: "🎵", desc: "Ad-free student plan" },
    { id: 3, name: "Gold's Gym Membership", amount: 1500, shared: false, icon: "🏋️", desc: "Local gym access" }
  ],
  challenges: [
    { id: 1, title: "3-Day No-Spend Streak", xp: 50, completed: false },
    { id: 2, title: "Save ₹500 this week", xp: 100, completed: true },
    { id: 3, title: "Set Monthly Budgets", xp: 75, completed: true },
    { id: 4, title: "Add your first SIP investment", xp: 120, completed: false }
  ],
  badges: [
    { id: 1, title: "Budget Boss", desc: "Maintained all budgets for a month", emoji: "👑", unlocked: true },
    { id: 2, title: "SIP Starter", desc: "Created your first mutual fund investment", emoji: "📈", unlocked: true },
    { id: 3, title: "Streaker", desc: "Logged transactions for 7 consecutive days", emoji: "🔥", unlocked: true },
    { id: 4, title: "Frugal Master", desc: "Achieved a personal savings goal", emoji: "💎", unlocked: false },
    { id: 5, title: "Speech Cadet", desc: "Logged an expense using Voice Assistant", emoji: "🎙️", unlocked: false }
  ],
  notifications: [
    { id: 1, text: "Welcome to Paisa Tracker! Track smart, save more.", time: "1 hour ago" },
    { id: 2, text: "You have used 75% of your Utilities budget limit.", time: "2 hours ago" }
  ],
  leaderboard: [
    { rank: 1, name: "Sneha Patel", xp: 620, me: false },
    { rank: 2, name: "Rohan Sharma", xp: 450, me: true },
    { rank: 3, name: "Vikram Singh", xp: 410, me: false },
    { rank: 4, name: "Anjali Rao", xp: 380, me: false },
    { rank: 5, name: "Kabir Sen", xp: 290, me: false }
  ]
};

let store = {};

function initStore() {
  const localData = localStorage.getItem('paisa_data');
  if (localData) {
    store = JSON.parse(localData);
  } else {
    store = JSON.parse(JSON.stringify(initialData));
    saveStore();
  }
}

function saveStore() {
  localStorage.setItem('paisa_data', JSON.stringify(store));
}

// ==================== APP ROUTER ====================
const router = {
  currentPage: 'landing',
  
  navigate(page) {
    this.currentPage = page;
    
    // Manage top-level shell panels visibility
    const isPublic = ['landing', 'login', 'signup'].includes(page);
    
    document.getElementById('view-landing').style.display = page === 'landing' ? 'block' : 'none';
    document.getElementById('view-auth').style.display = ['login', 'signup'].includes(page) ? 'flex' : 'none';
    document.getElementById('app-shell').style.display = isPublic ? 'none' : 'flex';
    
    if (isPublic) {
      if (page === 'login' || page === 'signup') {
        auth.updateUI();
      }
      return;
    }
    
    // Switch inner dashboard page content view tabs
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${page}`);
    if (targetView) {
      targetView.classList.add('active');
    }
    
    // Switch active state highlight on left sidebar navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Set Header Breadcrumb Title
    const titleMap = {
      'dashboard': 'Financial Dashboard',
      'expenses': 'Expense Tracker',
      'savings': 'Savings Goals',
      'investments': 'Investment Portfolio',
      'budgets': 'Budget Planner',
      'analytics': 'Smart Analytics',
      'ai-insights': 'AI Financial Insights',
      'profile': 'Profile & Gamification',
      'settings': 'Settings'
    };
    document.getElementById('page-title').innerText = titleMap[page] || 'Dashboard';
    
    // Close sidebar on mobile
    document.querySelector('.sidebar').classList.remove('active');
    
    // Page load routines
    this.onload(page);
  },
  
  onload(page) {
    // Redraw charts and update forms dynamically per tab
    ui.renderUserInfo();
    ui.renderNotifications();
    
    if (page === 'dashboard') {
      dashboardPage.render();
    } else if (page === 'expenses') {
      expensesPage.render();
    } else if (page === 'savings') {
      savingsPage.render();
    } else if (page === 'investments') {
      investmentsPage.render();
    } else if (page === 'budgets') {
      budgetsPage.render();
    } else if (page === 'analytics') {
      analyticsPage.render();
    } else if (page === 'ai-insights') {
      aiCoach.render();
    } else if (page === 'profile') {
      profilePage.render();
    } else if (page === 'settings') {
      settingsPage.render();
    }
    
    // Reinitialize Lucide Icon icons on dynamically added layout elements
    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// ==================== AUTHENTICATION SERVICE ====================
const auth = {
  isSignUp: false,
  
  toggleState() {
    this.isSignUp = !this.isSignUp;
    this.updateUI();
  },
  
  updateUI() {
    const title = document.getElementById('auth-title');
    const desc = document.getElementById('auth-desc');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const nameGroup = document.getElementById('signup-name-group');
    
    if (this.isSignUp) {
      title.innerText = "Create Account";
      desc.innerText = "Start mastering your student budget today.";
      submitBtn.innerText = "Sign Up";
      toggleText.innerText = "Already have an account?";
      toggleBtn.innerText = "Log In";
      nameGroup.style.display = "flex";
      document.getElementById('auth-name').setAttribute('required', 'true');
    } else {
      title.innerText = "Welcome Back";
      desc.innerText = "Login to access your financial dashboard.";
      submitBtn.innerText = "Log In";
      toggleText.innerText = "Don't have an account?";
      toggleBtn.innerText = "Sign Up";
      nameGroup.style.display = "none";
      document.getElementById('auth-name').removeAttribute('required');
    }
  },
  
  handleSubmit() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-password').value;
    
    if (this.isSignUp) {
      const name = document.getElementById('auth-name').value;
      store.user.name = name || "Rohan Sharma";
      store.user.email = email;
      saveStore();
      ui.toast("Account created successfully! Welcome aboard.", "success");
    } else {
      ui.toast("Welcome back to your dashboard!", "success");
    }
    
    router.navigate('dashboard');
  },
  
  logout() {
    ui.toast("Logged out of session.", "success");
    router.navigate('landing');
  }
};

// ==================== GLOBAL UI UTILITIES ====================
const ui = {
  charts: {},
  
  toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    store.theme = newTheme;
    saveStore();
    
    // Switch header icons
    document.getElementById('theme-sun-icon').style.display = newTheme === 'light' ? 'none' : 'block';
    document.getElementById('theme-moon-icon').style.display = newTheme === 'light' ? 'block' : 'none';
    
    // Force settings checkbox synch
    const check = document.getElementById('settings-theme-toggle');
    if (check) {
      check.checked = (newTheme === 'dark');
    }
    
    // Redraw charts to align with potential background theme font/grid colors
    router.navigate(router.currentPage);
    
    this.toast(`Switched to ${newTheme} mode!`, "success");
  },
  
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    sidebar.classList.toggle('active');
    if (backdrop) backdrop.classList.toggle('active');
  },
  
  toggleNotifications(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('noti-dropdown');
    dropdown.classList.toggle('active');
    
    // Remove notification red dot
    const dot = document.getElementById('noti-dot');
    if (dot) dot.style.display = 'none';
  },
  
  showModal(modalId) {
    const overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.add('active');
      // Prevent body scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }
  },
  
  closeModals() {
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(o => o.classList.remove('active'));
    document.body.style.overflow = '';
  },
  
  toast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    
    let icon = 'check-circle';
    if (type === 'warning') icon = 'alert-triangle';
    if (type === 'error') icon = 'x-circle';
    
    t.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
    container.appendChild(t);
    
    if (window.lucide) lucide.createIcons();
    
    setTimeout(() => {
      t.classList.add('fade-out');
      t.addEventListener('animationend', () => t.remove());
    }, 3000);
  },
  
  renderUserInfo() {
    // Left mini profile
    document.getElementById('sidebar-name').innerText = store.user.name;
    document.getElementById('sidebar-avatar').innerText = store.user.name.split(' ').map(n=>n[0]).join('').toUpperCase();
    document.getElementById('sidebar-level').innerText = `Level ${store.user.level} Budget Boss`;
    
    // Profile settings/ID pages
    const pName = document.getElementById('prof-name');
    const pAvatar = document.getElementById('prof-avatar');
    const pRank = document.getElementById('prof-rank');
    const pXp = document.getElementById('prof-xp');
    const xpBar = document.getElementById('xp-progress-bar');
    
    if (pName) {
      pName.innerText = store.user.name;
      pAvatar.innerText = store.user.name.split(' ').map(n=>n[0]).join('').toUpperCase();
      pRank.innerText = `👑 Level ${store.user.level} Budget Boss`;
      pXp.innerText = `${store.user.xp} / 500 XP`;
      xpBar.style.width = `${(store.user.xp / 500) * 100}%`;
    }
  },
  
  addXP(amount) {
    store.user.xp += amount;
    this.toast(`+${amount} XP Earned! 🚀`, "success");
    
    if (store.user.xp >= 500) {
      store.user.level += 1;
      store.user.xp -= 500;
      this.toast(`🎉 Level Up! You are now Level ${store.user.level}!`, "success");
      this.triggerConfetti();
    }
    
    saveStore();
    this.renderUserInfo();
  },
  
  renderNotifications() {
    const list = document.getElementById('noti-list');
    if (!list) return;
    
    list.innerHTML = store.notifications.map(n => `
      <div class="notification-item">
        <div>${n.text}</div>
        <div class="notification-time">${n.time}</div>
      </div>
    `).join('');
  },
  
  triggerConfetti() {
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  },
  
  downloadPDF() {
    this.toast("Simulating statement PDF download...", "success");
    this.triggerConfetti();
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Paisa Tracker - Monthly Health Checkup</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
          .header { border-bottom: 2px solid #00C896; padding-bottom: 20px; margin-bottom: 40px; }
          .title { font-size: 24px; font-weight: bold; color: #0f172a; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 18px; font-weight: bold; margin-bottom: 12px; color: #00C896; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          th { background: #f8fafc; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Paisa Tracker Statement</div>
          <div>Student Financial Report for ${store.user.name}</div>
          <div>Streak Status: ${store.user.streak} Days 🔥</div>
        </div>
        <div class="section">
          <div class="section-title">Account Overview</div>
          <p>Total Balance Available: ${store.currency}${store.balance.toLocaleString()}</p>
        </div>
        <div class="section">
          <div class="section-title">Recent Transactions</div>
          <table>
            <thead>
              <tr><th>Description</th><th>Category</th><th>Date</th><th>Amount</th></tr>
            </thead>
            <tbody>
              ${store.expenses.slice(0, 5).map(e => `
                <tr><td>${e.title}</td><td>${e.category}</td><td>${e.date}</td><td>${store.currency}${e.amount}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
};

// ==================== DASHBOARD PAGE CONTROLLER ====================
const dashboardPage = {
  render() {
    // Set balance figures
    const totalSpend = store.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    document.getElementById('dash-balance').innerText = `${store.currency}${store.balance.toLocaleString()}`;
    document.getElementById('dash-expenses').innerText = `${store.currency}${totalSpend.toLocaleString()}`;
    
    // Check savings goal
    if (store.savingsGoals.length > 0) {
      const primaryGoal = store.savingsGoals[0];
      const pct = Math.min(100, Math.round((primaryGoal.current / primaryGoal.target) * 100));
      document.getElementById('dash-savings').innerText = `${store.currency}${primaryGoal.current.toLocaleString()}`;
      document.querySelector('.stat-card:nth-child(3) .stat-change').innerHTML = `<i data-lucide="check" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> ${primaryGoal.title}: ${pct}% saved`;
    }
    
    // Check investments
    const totalInvest = store.investments.reduce((sum, inv) => sum + inv.amount, 0);
    document.getElementById('dash-investments').innerText = `${store.currency}${totalInvest.toLocaleString()}`;
    
    // Render recent transaction feed list
    const feed = document.getElementById('dash-feed-list');
    const recent = store.expenses.slice(0, 4);
    
    const catEmojis = { Food: "🍔", Academics: "📚", Entertainment: "🎬", Travel: "🚗", Utilities: "📱", Other: "💸" };
    const catColors = { Food: "#3b82f6", Academics: "#10b981", Entertainment: "#8b5cf6", Travel: "#ec4899", Utilities: "#f59e0b", Other: "#6b7280" };
    
    feed.innerHTML = recent.map(item => `
      <div class="feed-item">
        <div class="feed-item-left">
          <div class="feed-item-icon" style="background: ${catColors[item.category] || '#6b7280'}20; color: ${catColors[item.category] || '#6b7280'};">
            ${catEmojis[item.category] || "💸"}
          </div>
          <div class="feed-item-info">
            <span class="feed-item-title">${item.title}</span>
            <span class="feed-item-time">${item.date}</span>
          </div>
        </div>
        <div class="feed-item-right">
          <span class="feed-item-amount" style="color: #ef4444;">-${store.currency}${item.amount}</span>
          <span class="feed-item-cat">${item.category}</span>
        </div>
      </div>
    `).join('');
    
    this.drawCharts();
  },
  
  drawCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textCol = isDark ? '#94a3b8' : '#64748b';
    const borderCol = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    
    // Chart 1: Cashflow Line Chart (dynamic data)
    if (ui.charts.cashflow) ui.charts.cashflow.destroy();
    
    const ctxCashflow = document.getElementById('chart-cashflow').getContext('2d');
    
    // Let's create dummy dates/data grouped by past 5 transactions
    const chartLabels = store.expenses.slice(0, 6).reverse().map(e => e.date);
    const chartData = store.expenses.slice(0, 6).reverse().map(e => e.amount);
    
    ui.charts.cashflow = new Chart(ctxCashflow, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Spending amount',
          data: chartData,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: borderCol }, ticks: { color: textCol } },
          y: { grid: { color: borderCol }, ticks: { color: textCol } }
        }
      }
    });
    
    // Chart 2: Category Breakdown doughnut (dynamic)
    if (ui.charts.categories) ui.charts.categories.destroy();
    
    const ctxCat = document.getElementById('chart-categories').getContext('2d');
    
    const catSums = {};
    store.expenses.forEach(e => {
      catSums[e.category] = (catSums[e.category] || 0) + e.amount;
    });
    
    const catLabels = Object.keys(catSums);
    const catValues = Object.values(catSums);
    const bgColors = ['#00C896', '#6366f1', '#a855f7', '#06b6d4', '#f59e0b', '#ef4444'];
    
    ui.charts.categories = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catValues,
          backgroundColor: bgColors.slice(0, catLabels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: textCol } }
        },
        cutout: '70%'
      }
    });
  }
};

// ==================== EXPENSE TRACKER PAGE CONTROLLER ====================
const expensesPage = {
  render() {
    this.renderTable(store.expenses);
  },
  
  renderTable(list) {
    const tbody = document.getElementById('expenses-table-body');
    const catEmojis = { Food: "🍔", Academics: "📚", Entertainment: "🎬", Travel: "🚗", Utilities: "📱", Other: "💸" };
    
    tbody.innerHTML = list.map(item => `
      <tr style="border-bottom:1px solid var(--border);">
        <td style="padding:16px; font-weight:600;">${item.title}</td>
        <td style="padding:16px;">
          <span class="badge badge-info">${catEmojis[item.category] || "💸"} ${item.category}</span>
        </td>
        <td style="padding:16px; color:var(--text-muted); font-size:0.85rem;">${item.date}</td>
        <td style="padding:16px; text-align:right; font-weight:700; color:#ef4444;">-${store.currency}${item.amount}</td>
        <td style="padding:16px; text-align:center;">
          <button onclick="expensesPage.delete(${item.id})" class="btn btn-secondary" style="padding:6px; border-radius:50%; border-color:transparent;"><i data-lucide="trash-2" style="width:16px; height:16px; color:#ef4444;"></i></button>
        </td>
      </tr>
    `).join('');
    
    if (window.lucide) lucide.createIcons();
  },
  
  filter() {
    const q = document.getElementById('expense-search').value.toLowerCase();
    const cat = document.getElementById('expense-filter-cat').value;
    
    let filtered = store.expenses;
    
    if (q) {
      filtered = filtered.filter(e => e.title.toLowerCase().includes(q));
    }
    if (cat !== 'all') {
      filtered = filtered.filter(e => e.category === cat);
    }
    
    this.renderTable(filtered);
  },
  
  add(title, amount, category) {
    const date = new Date().toISOString().split('T')[0];
    const newId = store.expenses.length > 0 ? Math.max(...store.expenses.map(e=>e.id)) + 1 : 1;
    const amountNum = parseFloat(amount);
    
    // Add transaction to store
    store.expenses.unshift({ id: newId, title, amount: amountNum, category, date });
    
    // Deduct balance
    store.balance -= amountNum;
    
    // Push budget alert warning check
    const spentLimit = this.getSpentByCategory(category);
    const limitMax = store.budgets[category] || 0;
    if (limitMax > 0 && spentLimit > limitMax) {
      const alertText = `Warning! Budget breached for ${category} category (Spent: ${store.currency}${spentLimit} of ${store.currency}${limitMax}).`;
      store.notifications.unshift({ id: Date.now(), text: alertText, time: "Just now" });
      ui.toast(alertText, "warning");
    }
    
    ui.addXP(20); // Award XP
    saveStore();
    ui.toast("Expense logged successfully!", "success");
    
    // Redraw
    router.navigate(router.currentPage);
  },
  
  addManual() {
    const title = document.getElementById('exp-title').value;
    const amount = document.getElementById('exp-amount').value;
    const cat = document.getElementById('exp-cat').value;
    
    this.add(title, amount, cat);
    
    // Clear inputs
    document.getElementById('exp-title').value = '';
    document.getElementById('exp-amount').value = '';
  },
  
  addManualModal() {
    const title = document.getElementById('modal-exp-title').value;
    const amount = document.getElementById('modal-exp-amount').value;
    const cat = document.getElementById('modal-exp-cat').value;
    
    this.add(title, amount, cat);
    
    // Clear inputs and close
    document.getElementById('modal-exp-title').value = '';
    document.getElementById('modal-exp-amount').value = '';
    ui.closeModals();
  },
  
  delete(id) {
    const idx = store.expenses.findIndex(e => e.id === id);
    if (idx !== -1) {
      // Return balance
      store.balance += store.expenses[idx].amount;
      store.expenses.splice(idx, 1);
      saveStore();
      ui.toast("Expense removed.", "success");
      router.navigate(router.currentPage);
    }
  },
  
  getSpentByCategory(cat) {
    return store.expenses.filter(e => e.category === cat).reduce((sum, curr) => sum + curr.amount, 0);
  },
  
  exportCSV() {
    let csv = "Description,Amount,Category,Date\n";
    store.expenses.forEach(e => {
      csv += `"${e.title}",${e.amount},"${e.category}",${e.date}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `PaisaTracker_Statement_${Date.now()}.csv`);
    a.click();
    ui.toast("CSV statements exported successfully!", "success");
  }
};

// ==================== SAVINGS PAGE CONTROLLER ====================
const savingsPage = {
  render() {
    const grid = document.getElementById('savings-goals-grid');
    if (!grid) return;
    
    grid.innerHTML = store.savingsGoals.map(g => {
      const pct = Math.min(100, Math.round((g.current / g.target) * 100));
      return `
        <div class="card goal-card">
          <div class="goal-card-header">
            <span class="goal-icon">${g.emoji || "🏖️"}</span>
            <button onclick="savingsPage.deleteGoal(${g.id})" class="btn btn-secondary" style="padding:6px; border-radius:50%; border-color:transparent;"><i data-lucide="trash-2" style="width:16px; height:16px; color:#ef4444;"></i></button>
          </div>
          
          <div class="goal-details">
            <h4 class="goal-title">${g.title}</h4>
            <span class="goal-target-date">Target Date: ${g.date}</span>
          </div>
          
          <div class="goal-progress-wrap">
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="goal-progress-values">
              <span>${store.currency}${g.current.toLocaleString()} saved</span>
              <span class="goal-progress-percent">${pct}%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-align:right;">Target: ${store.currency}${g.target.toLocaleString()}</div>
          </div>
          
          <div class="goal-card-footer">
            <div class="goal-input-action">
              <input type="number" id="add-funds-val-${g.id}" class="goal-amount-input" placeholder="+ ${store.currency}">
              <button onclick="savingsPage.addFunds(${g.id})" class="btn btn-primary btn-sm" style="flex-grow:1;">Save Funds</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    if (window.lucide) lucide.createIcons();
  },
  
  addGoal() {
    const name = document.getElementById('goal-name-input').value;
    const target = parseFloat(document.getElementById('goal-target-input').value);
    const emoji = document.getElementById('goal-emoji-input').value;
    
    const newId = store.savingsGoals.length > 0 ? Math.max(...store.savingsGoals.map(g=>g.id)) + 1 : 1;
    
    store.savingsGoals.push({
      id: newId,
      title: name,
      current: 0,
      target: target,
      emoji: emoji || "💰",
      date: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0], // 60 days
      completed: false
    });
    
    ui.addXP(40);
    saveStore();
    ui.toast(`Savings bucket "${name}" created!`, "success");
    ui.closeModals();
    router.navigate('savings');
  },
  
  addFunds(id) {
    const input = document.getElementById(`add-funds-val-${id}`);
    const amt = parseFloat(input.value);
    
    if (isNaN(amt) || amt <= 0) {
      ui.toast("Enter a valid amount", "error");
      return;
    }
    
    if (amt > store.balance) {
      ui.toast("Insufficient available balance", "error");
      return;
    }
    
    const goal = store.savingsGoals.find(g => g.id === id);
    if (goal) {
      goal.current += amt;
      store.balance -= amt;
      
      ui.toast(`Saved ${store.currency}${amt} to ${goal.title}!`, "success");
      
      // Goal achieved trigger
      if (goal.current >= goal.target && !goal.completed) {
        goal.completed = true;
        ui.toast(`🎉 Congratulations! You achieved your savings goal: ${goal.title}!`, "success");
        ui.addXP(150);
        ui.triggerConfetti();
        
        // Unlock Frugal Master badge
        const badge = store.badges.find(b => b.id === 4);
        if (badge && !badge.unlocked) {
          badge.unlocked = true;
          ui.toast(`💎 Badge Unlocked: ${badge.title}!`, "success");
        }
      }
      
      saveStore();
      router.navigate('savings');
    }
  },
  
  deleteGoal(id) {
    const idx = store.savingsGoals.findIndex(g => g.id === id);
    if (idx !== -1) {
      // Refund current savings to general balance
      store.balance += store.savingsGoals[idx].current;
      store.savingsGoals.splice(idx, 1);
      saveStore();
      ui.toast("Goal deleted, funds returned to balance.", "success");
      router.navigate('savings');
    }
  }
};

// ==================== INVESTMENTS PAGE CONTROLLER ====================
const investmentsPage = {
  render() {
    this.renderAllocationList();
    this.drawChart();
  },
  
  renderAllocationList() {
    const list = document.getElementById('assets-list');
    if (!list) return;
    
    const total = store.investments.reduce((sum, inv) => sum + inv.amount, 0);
    
    list.innerHTML = store.investments.map(inv => {
      const pct = total > 0 ? Math.round((inv.amount / total) * 100) : 0;
      return `
        <div class="asset-item">
          <div class="asset-item-left">
            <div class="asset-marker" style="background: ${inv.color};"></div>
            <div class="asset-info">
              <h4>${inv.name}</h4>
              <p>${pct}% allocation</p>
            </div>
          </div>
          <div class="asset-item-right">
            <span class="asset-val">${store.currency}${inv.amount.toLocaleString()}</span>
            <span class="asset-pct" style="color: ${inv.color}; margin-left: 8px;">+18.4%</span>
          </div>
        </div>
      `;
    }).join('');
  },
  
  addInvestment() {
    const assetClass = document.getElementById('invest-class').value;
    const amount = parseFloat(document.getElementById('invest-amount').value);
    
    if (isNaN(amount) || amount <= 0) {
      ui.toast("Enter a valid investment amount", "error");
      return;
    }
    if (amount > store.balance) {
      ui.toast("Insufficient available balance to allocate", "error");
      return;
    }
    
    const inv = store.investments.find(i => i.name.includes(assetClass));
    if (inv) {
      inv.amount += amount;
    } else {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      store.investments.push({
        id: store.investments.length + 1,
        name: assetClass,
        amount: amount,
        pct: 10,
        color: randomColor
      });
    }
    
    store.balance -= amount;
    ui.addXP(60);
    saveStore();
    ui.toast(`Invested ${store.currency}${amount} in ${assetClass}!`, "success");
    
    // Force reset form
    document.getElementById('invest-amount').value = '';
    router.navigate('investments');
  },
  
  drawChart() {
    if (ui.charts.investments) ui.charts.investments.destroy();
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textCol = isDark ? '#94a3b8' : '#64748b';
    const borderCol = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    
    const ctx = document.getElementById('chart-investments').getContext('2d');
    
    // Simulate past 6 months growth
    const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const totalCurrentVal = store.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const mockGrowthValues = [
      Math.round(totalCurrentVal * 0.75),
      Math.round(totalCurrentVal * 0.8),
      Math.round(totalCurrentVal * 0.84),
      Math.round(totalCurrentVal * 0.9),
      Math.round(totalCurrentVal * 0.95),
      totalCurrentVal
    ];
    
    ui.charts.investments = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Portfolio Valuation',
          data: mockGrowthValues,
          borderColor: '#00C896',
          backgroundColor: 'rgba(0, 200, 150, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: borderCol }, ticks: { color: textCol } },
          y: { grid: { color: borderCol }, ticks: { color: textCol } }
        }
      }
    });
  }
};

// ==================== BUDGET PAGE CONTROLLER ====================
const budgetsPage = {
  render() {
    const grid = document.getElementById('budgets-limits-grid');
    if (!grid) return;
    
    const categories = Object.keys(store.budgets);
    
    grid.innerHTML = categories.map(cat => {
      const limit = store.budgets[cat];
      const spent = expensesPage.getSpentByCategory(cat);
      const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
      
      const badgeStyle = pct > 90 ? 'badge-danger' : (pct > 70 ? 'badge-warning' : 'badge-success');
      
      return `
        <div class="card goal-card">
          <div class="goal-card-header">
            <span class="badge ${badgeStyle}" style="font-size:0.8rem;">${pct}% used</span>
            <span style="font-size: 1.5rem;">⚙️</span>
          </div>
          
          <div class="goal-details">
            <h4 class="goal-title">${cat}</h4>
            <span class="goal-target-date">Limit: ${store.currency}${limit.toLocaleString()} / mo</span>
          </div>
          
          <div class="goal-progress-wrap" style="margin-bottom:12px;">
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${pct}%; background: ${pct > 90 ? '#ef4444' : (pct > 75 ? '#f59e0b' : 'var(--primary)')}"></div>
            </div>
            <div class="goal-progress-values" style="margin-top: 4px;">
              <span>Spent: ${store.currency}${spent.toLocaleString()}</span>
              <span>Limit: ${store.currency}${limit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },
  
  updateLimit() {
    const cat = document.getElementById('budget-cat-select').value;
    const limit = parseFloat(document.getElementById('budget-limit-input').value);
    
    if (isNaN(limit) || limit <= 0) {
      ui.toast("Enter a valid limit amount", "error");
      return;
    }
    
    store.budgets[cat] = limit;
    saveStore();
    ui.toast(`Budget limit updated for ${cat}!`, "success");
    ui.closeModals();
    router.navigate('budgets');
  }
};

// ==================== ANALYTICS PAGE CONTROLLER ====================
const analyticsPage = {
  render() {
    this.drawCharts();
    this.renderHeatmap();
  },
  
  drawCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textCol = isDark ? '#94a3b8' : '#64748b';
    const borderCol = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    
    // Doughnut category breakdown
    if (ui.charts.analyticsPie) ui.charts.analyticsPie.destroy();
    
    const ctxPie = document.getElementById('chart-analytics-pie').getContext('2d');
    
    const catSums = {};
    store.expenses.forEach(e => {
      catSums[e.category] = (catSums[e.category] || 0) + e.amount;
    });
    
    ui.charts.analyticsPie = new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: Object.keys(catSums),
        datasets: [{
          data: Object.values(catSums),
          backgroundColor: ['#00C896', '#6366f1', '#a855f7', '#06b6d4', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { color: textCol } } }
      }
    });
    
    // Bar chart comparison income vs outflow
    if (ui.charts.analyticsBar) ui.charts.analyticsBar.destroy();
    
    const ctxBar = document.getElementById('chart-analytics-bar').getContext('2d');
    
    ui.charts.analyticsBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['March', 'April', 'May'],
        datasets: [
          {
            label: 'Monthly Income',
            data: [15000, 18000, 20000],
            backgroundColor: '#00C896',
            borderRadius: 6
          },
          {
            label: 'Outflows / Expenses',
            data: [8200, 9400, store.expenses.reduce((sum, e) => sum + e.amount, 0)],
            backgroundColor: '#ef4444',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: textCol } } },
        scales: {
          x: { grid: { color: borderCol }, ticks: { color: textCol } },
          y: { grid: { color: borderCol }, ticks: { color: textCol } }
        }
      }
    });
  },
  
  renderHeatmap() {
    const grid = document.getElementById('analytics-heatmap');
    if (!grid) return;
    
    // Build 28 mock days blocks. Map expense frequency.
    const blocksCount = 28;
    let html = '';
    
    // Seed days. Randomly associate a dynamic expense intensity value
    for (let i = 1; i <= blocksCount; i++) {
      const level = Math.floor(Math.random() * 5); // 0 to 4
      const mockSpendsVal = level * 120;
      
      html += `
        <div class="heatmap-day hm-level-${level}">
          <div class="tooltip">Day ${i}: Spent ₹${mockSpendsVal}</div>
        </div>
      `;
    }
    grid.innerHTML = html;
  }
};

// ==================== SUBSCRIPTION OPTIMIZER & AI COACH ====================
const aiCoach = {
  render() {
    this.renderSubscriptions();
  },
  
  renderSubscriptions() {
    const list = document.getElementById('subscriptions-container');
    if (!list) return;
    
    list.innerHTML = store.subscriptions.map(sub => `
      <div class="opt-sub-card">
        <div class="opt-sub-info">
          <span class="opt-sub-icon" style="background: rgba(99, 102, 241, 0.1); color:#6366f1;">
            ${sub.icon || "📱"}
          </span>
          <div class="opt-sub-details">
            <h4>${sub.name}</h4>
            <p>${sub.desc} • ${store.currency}${sub.amount}/mo</p>
          </div>
        </div>
        
        <div class="opt-actions">
          ${sub.shared ? `
            <span class="badge badge-success">Split Active</span>
          ` : `
            <button onclick="aiCoach.splitSubscription(${sub.id})" class="opt-btn opt-btn-share"><i data-lucide="users" style="width:12px; height:12px; display:inline-block; vertical-align:middle;"></i> Split plan</button>
            <button onclick="aiCoach.cancelSubscription(${sub.id})" class="opt-btn opt-btn-danger">Cancel</button>
          `}
        </div>
      </div>
    `).join('');
    
    if (window.lucide) lucide.createIcons();
  },
  
  splitSubscription(id) {
    const sub = store.subscriptions.find(s => s.id === id);
    if (sub) {
      const original = sub.amount;
      sub.amount = Math.round(original / 4); // Split 4-ways
      sub.shared = true;
      sub.desc = `Shared plan (4-way split cost)`;
      
      // Add savings difference to general balance
      const difference = original - sub.amount;
      store.balance += difference;
      
      ui.toast(`Success! Split ${sub.name} with friends. Saved ${store.currency}${difference}/mo!`, "success");
      ui.addXP(40);
      ui.triggerConfetti();
      saveStore();
      
      // Update view
      this.renderSubscriptions();
      ui.renderUserInfo();
    }
  },
  
  cancelSubscription(id) {
    const idx = store.subscriptions.findIndex(s => s.id === id);
    if (idx !== -1) {
      const cancelled = store.subscriptions[idx];
      store.balance += cancelled.amount;
      
      ui.toast(`Cancelled ${cancelled.name}. Refunded ${store.currency}${cancelled.amount}!`, "success");
      store.subscriptions.splice(idx, 1);
      ui.addXP(30);
      saveStore();
      
      this.renderSubscriptions();
      ui.renderUserInfo();
    }
  },
  
  sendMessage() {
    const input = document.getElementById('coach-user-input');
    const msgText = input.value.trim();
    if (!msgText) return;
    
    // Render user bubble
    const log = document.getElementById('coach-message-log');
    const userBubble = document.createElement('div');
    userBubble.className = "msg msg-user";
    userBubble.innerText = msgText;
    log.appendChild(userBubble);
    
    input.value = '';
    
    // Scroll container
    log.scrollTop = log.scrollHeight;
    
    // Add typing indicator
    const typing = document.createElement('div');
    typing.className = "typing-indicator";
    typing.id = "bot-typing";
    typing.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    
    // Compute reply
    setTimeout(() => {
      typing.remove();
      
      let reply = "I'm analyzing your student transaction logs. Ask me about your budgets or savings goals to get tailored gen-z advice!";
      const clean = msgText.toLowerCase();
      
      if (clean.includes('budget')) {
        const foodBudget = store.budgets.Food;
        const foodSpent = expensesPage.getSpentByCategory('Food');
        reply = `Your monthly Food limit is ${store.currency}${foodBudget}. You have spent ${store.currency}${foodSpent} (${Math.round((foodSpent/foodBudget)*100)}%). ${foodSpent > foodBudget ? "You have breached this limit! Try eating at the student mess." : "Looking clean so far!"}`;
      } else if (clean.includes('goa') || clean.includes('saving')) {
        const goal = store.savingsGoals[0];
        reply = `You're tracking toward your "${goal.title}" target. You have saved ${store.currency}${goal.current} out of ${store.currency}${goal.target} (${Math.round((goal.current/goal.target)*100)}%). Keep checking off challenges to boost XP.`;
      } else if (clean.includes('tip') || clean.includes('advise')) {
        const tips = [
          "Split subscriptions (Netflix/Spotify) 4-ways using the subscription optimizer to save over ₹1,500/mo.",
          "Use your student ID card! Most local transit options and software subscriptions have 50% discount programs.",
          "Set up automatic weekly savings sweepers. Saving just ₹50 a day yields ₹1,500 by month-end."
        ];
        reply = tips[Math.floor(Math.random() * tips.length)];
      } else if (clean.includes('invest') || clean.includes('sip')) {
        const totalInvest = store.investments.reduce((sum, inv) => sum + inv.amount, 0);
        reply = `Your portfolio currently stands at ${store.currency}${totalInvest}. Broad allocation: ${store.investments.map(i=>`${i.name} (${i.pct}%)`).join(', ')}. Solid diversification!`;
      }
      
      const botBubble = document.createElement('div');
      botBubble.className = "msg msg-bot";
      botBubble.innerText = reply;
      log.appendChild(botBubble);
      log.scrollTop = log.scrollHeight;
    }, 1200);
  }
};

// ==================== PROFILE & GAMIFICATION CONTROLLER ====================
const profilePage = {
  render() {
    this.renderChallenges();
    this.renderBadges();
    this.renderLeaderboard();
    
    const count = document.getElementById('profile-streak-count');
    if (count) count.innerText = `${store.user.streak} Days`;
  },
  
  renderChallenges() {
    const board = document.getElementById('challenges-board');
    if (!board) return;
    
    board.innerHTML = store.challenges.map(c => `
      <div class="challenge-item ${c.completed ? 'completed' : ''}">
        <div class="challenge-chk-wrap">
          <div class="challenge-check" onclick="profilePage.toggleChallenge(${c.id})">
            ${c.completed ? '✓' : ''}
          </div>
          <span class="challenge-title" style="font-size:0.9rem; font-weight:600;">${c.title}</span>
        </div>
        <span class="challenge-xp-reward">+${c.xp} XP</span>
      </div>
    `).join('');
  },
  
  toggleChallenge(id) {
    const challenge = store.challenges.find(c => c.id === id);
    if (challenge) {
      challenge.completed = !challenge.completed;
      if (challenge.completed) {
        ui.addXP(challenge.xp);
        ui.triggerConfetti();
        ui.toast(`Challenge Complete! Received +${challenge.xp} XP!`, "success");
        
        // Push your user rank XP up the mock leaderboard
        const me = store.leaderboard.find(l => l.me);
        if (me) {
          me.xp = store.user.xp + (store.user.level - 5)*500;
          store.leaderboard.sort((a,b) => b.xp - a.xp);
          // Recalculate rank numbering
          store.leaderboard.forEach((item, idx) => {
            item.rank = idx + 1;
          });
        }
      } else {
        store.user.xp -= challenge.xp;
        if (store.user.xp < 0) store.user.xp = 0;
        ui.toast(`Challenge unchecked.`, "warning");
      }
      
      saveStore();
      this.render();
      ui.renderUserInfo();
    }
  },
  
  renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;
    
    container.innerHTML = store.badges.map(b => `
      <div class="badge-item ${b.unlocked ? '' : 'locked'}">
        <div class="badge-art">${b.emoji}</div>
        <span class="badge-name">${b.title}</span>
        <span class="badge-desc">${b.desc}</span>
      </div>
    `).join('');
  },
  
  renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;
    
    container.innerHTML = store.leaderboard.map(u => `
      <div class="leaderboard-item ${u.me ? 'me' : ''}">
        <div class="lb-left">
          <span class="lb-rank">#${u.rank}</span>
          <span class="lb-name">${u.name} ${u.me ? '(You)' : ''}</span>
        </div>
        <span class="lb-xp">${u.xp} XP</span>
      </div>
    `).join('');
  }
};

// ==================== SETTINGS PAGE CONTROLLER ====================
const settingsPage = {
  render() {
    const currencySelect = document.getElementById('settings-currency');
    if (currencySelect) currencySelect.value = store.currency;
    
    const themeToggle = document.getElementById('settings-theme-toggle');
    if (themeToggle) themeToggle.checked = (store.theme === 'dark');
  },
  
  changeCurrency() {
    const sym = document.getElementById('settings-currency').value;
    store.currency = sym;
    saveStore();
    ui.toast(`Currency updated to ${sym}`, "success");
    router.navigate(router.currentPage);
  },
  
  resetData() {
    if (confirm("Are you sure you want to reset all data back to factory student defaults?")) {
      localStorage.removeItem('paisa_data');
      initStore();
      ui.toast("Application reset completed.", "success");
      router.navigate('dashboard');
    }
  }
};

// ==================== ADVANCED MOCKS (VOICE & OCR SCANNER) ====================
const voiceInput = {
  recognition: null,
  isListening: false,
  
  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-IN';
      
      this.recognition.onstart = () => {
        this.isListening = true;
        document.getElementById('voice-mic-btn').classList.add('listening');
        document.getElementById('voice-status').innerText = "Listening... Speak now.";
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        document.getElementById('voice-mic-btn').classList.remove('listening');
      };
      
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById('voice-status').innerText = `Speech detected: "${text}"`;
        this.parseText(text);
      };
      
      this.recognition.onerror = () => {
        document.getElementById('voice-status').innerText = "Voice error. Click to try again.";
        this.isListening = false;
        document.getElementById('voice-mic-btn').classList.remove('listening');
      };
    }
  },
  
  toggle() {
    if (!this.recognition) {
      this.init();
    }
    
    if (!this.recognition) {
      // Speech recognition not supported in browser, run simulated parse fallback
      ui.toast("Web Speech API not supported in this browser. Running simulation instead!", "warning");
      const simulatedPhrases = [
        "spent 180 rupees on burger",
        "added 350 for books academics",
        "spent 900 for netflix subscription",
        "spent 120 on travel uber"
      ];
      const phrase = simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)];
      document.getElementById('voice-status').innerText = `Simulated voice speech: "${phrase}"`;
      setTimeout(() => this.parseText(phrase), 1500);
      return;
    }
    
    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  },
  
  parseText(phrase) {
    const clean = phrase.toLowerCase();
    
    // Basic regex matches
    const amountRegex = /(\d+)/;
    const matchAmount = clean.match(amountRegex);
    
    if (matchAmount) {
      const amt = parseInt(matchAmount[0]);
      
      let title = "Voice Entry Spend";
      if (clean.includes("coffee") || clean.includes("cafe")) title = "Coffee CCD";
      else if (clean.includes("burger") || clean.includes("food") || clean.includes("pizza")) title = "Burger Eatout";
      else if (clean.includes("uber") || clean.includes("cab") || clean.includes("travel") || clean.includes("auto")) title = "Uber cab ride";
      else if (clean.includes("book") || clean.includes("academics") || clean.includes("exam")) title = "Academic Books";
      else if (clean.includes("netflix") || clean.includes("spotify") || clean.includes("subscription")) title = "Digital Sub";
      
      let category = "Other";
      if (clean.includes("coffee") || clean.includes("burger") || clean.includes("food") || clean.includes("pizza") || clean.includes("ccd")) category = "Food";
      else if (clean.includes("uber") || clean.includes("cab") || clean.includes("travel") || clean.includes("auto")) category = "Travel";
      else if (clean.includes("book") || clean.includes("academics") || clean.includes("exam")) category = "Academics";
      else if (clean.includes("netflix") || clean.includes("spotify") || clean.includes("subscription") || clean.includes("utilities")) category = "Utilities";
      
      setTimeout(() => {
        expensesPage.add(title, amt, category);
        ui.toast(`Voice logged: "${title}" • ${store.currency}${amt}`, "success");
        
        // Unlock Speech Cadet badge
        const badge = store.badges.find(b => b.id === 5);
        if (badge && !badge.unlocked) {
          badge.unlocked = true;
          ui.toast(`🎙️ Badge Unlocked: ${badge.title}!`, "success");
        }
      }, 1000);
    } else {
      document.getElementById('voice-status').innerText = "Could not parse amount. Say: 'Spent 150 on coffee'";
    }
  }
};

const ocrMock = {
  trigger() {
    const dropzone = document.getElementById('ocr-dropzone');
    if (dropzone.classList.contains('scanning')) return;
    
    dropzone.classList.add('scanning');
    ui.toast("Simulating receipt scanning scan...", "warning");
    
    setTimeout(() => {
      dropzone.classList.remove('scanning');
      
      const mockSpends = [
        { title: "Starbucks Coffee", amount: 340, category: "Food" },
        { title: "Campus Bookstore", amount: 890, category: "Academics" },
        { title: "Uber Shuttle", amount: 120, category: "Travel" },
        { title: "Cinepolis Ticket", amount: 280, category: "Entertainment" }
      ];
      
      const scanResult = mockSpends[Math.floor(Math.random() * mockSpends.length)];
      expensesPage.add(scanResult.title, scanResult.amount, scanResult.category);
      ui.toast(`Receipt Scanned! Logged ${store.currency}${scanResult.amount} for ${scanResult.title}`, "success");
      ui.triggerConfetti();
    }, 2500);
  }
};

// ==================== APP INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initStore();
  
  // Set theme variable attributes
  document.documentElement.setAttribute('data-theme', store.theme);
  document.getElementById('settings-theme-toggle').checked = (store.theme === 'dark');
  document.getElementById('theme-sun-icon').style.display = store.theme === 'light' ? 'none' : 'block';
  document.getElementById('theme-moon-icon').style.display = store.theme === 'light' ? 'block' : 'none';
  
  // Handle FAQ details click sliders
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('active');
    });
  });
  
  // Close popups on click outside
  window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('noti-dropdown');
    if (dropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
  });
  
  // Route to public landing initially
  router.navigate('landing');
});
