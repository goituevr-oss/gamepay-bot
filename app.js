// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupTelegramUser();
    renderGames();
    setupEventListeners();
    lucide.createIcons();
});
const gamesData = [
    {
        id: 'pubg',
        title: 'PUBG Mobile',
        currency: 'UC',
        logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop', // Gaming placeholder
        banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
        rate: 1.2, // Price per 1 currency unit in Rubles
        requiresServer: false,
        requiresZoneId: false,
        idLabel: 'ID Игрока (Character ID)',
        idPlaceholder: 'Например: 512489632',
        packages: [
            { id: 'pubg_60', amount: 60, bonus: 0, price: 120, badge: 'Старт' },
            { id: 'pubg_325', amount: 325, bonus: 15, price: 390, badge: 'Популярно' },
            { id: 'pubg_660', amount: 660, bonus: 40, price: 790, badge: 'Выгодно' },
            { id: 'pubg_1800', amount: 1800, bonus: 150, price: 1990, badge: 'Лучший выбор' },
            { id: 'pubg_3850', amount: 3850, bonus: 450, price: 3990, badge: 'Много UC' },
            { id: 'pubg_8100', amount: 8100, bonus: 1100, price: 7990, badge: 'Гиперпак' }
        ],
        servers: []
    },
    {
        id: 'genshin',
        title: 'Genshin Impact',
        currency: 'Кристаллы',
        logo: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
        rate: 1.5,
        requiresServer: true,
        requiresZoneId: false,
        idLabel: 'UID Игрока',
        idPlaceholder: 'Например: 712495831',
        packages: [
            { id: 'genshin_60', amount: 60, bonus: 0, price: 119, badge: 'Старт' },
            { id: 'genshin_300', amount: 300, bonus: 30, price: 399, badge: 'Популярно' },
            { id: 'genshin_980', amount: 980, bonus: 110, price: 1290, badge: 'Выгодно' },
            { id: 'genshin_1980', amount: 1980, bonus: 260, price: 2490, badge: 'Лучший выбор' },
            { id: 'genshin_3280', amount: 3280, bonus: 600, price: 3990, badge: 'Премиум' },
            { id: 'genshin_6480', amount: 6480, bonus: 1600, price: 7990, badge: 'Гиперпак' }
        ],
        servers: ['Europe', 'Asia', 'America', 'TW/HK/MO']
    },
    {
        id: 'mlbb',
        title: 'Mobile Legends',
        currency: 'Алмазы',
        logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
        rate: 1.4,
        requiresServer: false,
        requiresZoneId: true,
        idLabel: 'ID Пользователя',
        idPlaceholder: 'Например: 123456789',
        packages: [
            { id: 'mlbb_50', amount: 50, bonus: 5, price: 99, badge: 'Старт' },
            { id: 'mlbb_250', amount: 250, bonus: 28, price: 399, badge: 'Популярно' },
            { id: 'mlbb_500', amount: 500, bonus: 65, price: 799, badge: 'Выгодно' },
            { id: 'mlbb_1000', amount: 1000, bonus: 155, price: 1590, badge: 'Лучший выбор' },
            { id: 'mlbb_2500', amount: 2500, bonus: 420, price: 3790, badge: 'Премиум' },
            { id: 'mlbb_5000', amount: 5000, bonus: 1000, price: 7490, badge: 'Гиперпак' }
        ],
        servers: []
    },
    {
        id: 'roblox',
        title: 'Roblox',
        currency: 'Robux',
        logo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
        rate: 1.1,
        requiresServer: false,
        requiresZoneId: false,
        idLabel: 'Имя пользователя (Username)',
        idPlaceholder: 'Например: RobloxGamer123',
        packages: [
            { id: 'roblox_80', amount: 80, bonus: 0, price: 120, badge: 'Старт' },
            { id: 'roblox_400', amount: 400, bonus: 40, price: 490, badge: 'Популярно' },
            { id: 'roblox_800', amount: 800, bonus: 100, price: 890, badge: 'Выгодно' },
            { id: 'roblox_1700', amount: 1700, bonus: 250, price: 1790, badge: 'Лучший выбор' },
            { id: 'roblox_4500', amount: 4500, bonus: 750, price: 4490, badge: 'Премиум' },
            { id: 'roblox_10000', amount: 10000, bonus: 2000, price: 8990, badge: 'Гиперпак' }
        ],
        servers: []
    },
    {
        id: 'brawl',
        title: 'Brawl Stars',
        currency: 'Гемы',
        logo: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=200&auto=format&fit=crop',
        banner: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=600&auto=format&fit=crop',
        rate: 1.8,
        requiresServer: false,
        requiresZoneId: false,
        idLabel: 'Player Tag (#)',
        idPlaceholder: 'Например: #9Y82QPLR',
        packages: [
            { id: 'brawl_30', amount: 30, bonus: 0, price: 149, badge: 'Старт' },
            { id: 'brawl_80', amount: 80, bonus: 8, price: 349, badge: 'Популярно' },
            { id: 'brawl_170', amount: 170, bonus: 20, price: 699, badge: 'Выгодно' },
            { id: 'brawl_360', amount: 360, bonus: 50, price: 1390, badge: 'Лучший выбор' },
            { id: 'brawl_950', amount: 950, bonus: 150, price: 3490, badge: 'Премиум' },
            { id: 'brawl_2000', amount: 2000, bonus: 400, price: 6990, badge: 'Гиперпак' }
        ],
        servers: []
    }
];

// App State
let state = {
    selectedGame: null,
    playerId: '',
    playerServer: '',
    playerZoneId: '',
    selectedPackage: null,
    customAmount: 1000,
    activeTab: 'packages', // 'packages' or 'custom'
    selectedPaymentMethod: 'sbp'
};

// DOM Elements
const sectionGames = document.getElementById('section-games');
const sectionAccount = document.getElementById('section-account');
const sectionCurrency = document.getElementById('section-currency');
const sectionCheckout = document.getElementById('section-checkout');

const stepProgress = document.getElementById('step-progress');
const stepLabel1 = document.getElementById('step-label-1');
const stepLabel2 = document.getElementById('step-label-2');
const stepLabel3 = document.getElementById('step-label-3');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupTelegramUser();
    renderGames();
    setupEventListeners();
    lucide.createIcons();
});

// Setup User Info
function setupTelegramUser() {
    document.getElementById('user-name').textContent = 'Гость';
    const avatar = document.getElementById('user-avatar');
    avatar.textContent = 'G';
}

// Render Games Grid
function renderGames() {
    const gamesGrid = document.getElementById('games-grid');
    gamesGrid.innerHTML = '';
    
    gamesData.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card bg-dark-card border border-dark-border rounded-2xl p-3 flex flex-col justify-between cursor-pointer h-40 relative group';
        card.dataset.id = game.id;
        
        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent z-10 rounded-2xl"></div>
            <img src="${game.logo}" alt="${game.title}" class="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40 group-hover:scale-105 transition-transform duration-500">
            
            <div class="relative z-20 flex justify-between items-start">
                <span class="bg-neon-purple/20 text-neon-cyan text-[9px] font-bold px-2 py-0.5 rounded-full border border-neon-purple/30 uppercase tracking-wider">
                    ${game.currency}
                </span>
                <div class="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-neon-cyan transition-colors">
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </div>
            </div>
            
            <div class="relative z-20">
                <h3 class="font-['Orbitron'] font-bold text-xs text-white group-hover:text-neon-cyan transition-colors">${game.title}</h3>
                <p class="text-[10px] text-slate-400 mt-0.5">Быстрое зачисление</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            selectGame(game);
        });
        
        gamesGrid.appendChild(card);
    });
    
    lucide.createIcons();
}

// Select Game & Transition to Step 2
function selectGame(game) {
    state.selectedGame = game;
    hapticFeedback('medium');
    
    // Update progress bar
    stepProgress.style.width = '66%';
    stepLabel2.classList.add('text-neon-cyan');
    
    // Update Account Form Labels
    document.querySelector('label[for="player-id"]').textContent = game.idLabel;
    document.getElementById('player-id').placeholder = game.idPlaceholder;
    document.getElementById('player-id').value = '';
    
    // Handle Game Banner Preview
    document.getElementById('selected-game-banner-img').src = game.banner;
    document.getElementById('selected-game-banner-logo').src = game.logo;
    document.getElementById('selected-game-banner-title').textContent = game.title;
    document.getElementById('selected-game-banner-currency').textContent = `Пополнение ${game.currency}`;

    // Handle Server Dropdown
    const serverContainer = document.getElementById('server-select-container');
    const serverSelect = document.getElementById('player-server');
    
    // Remove existing MLBB Zone ID if any
    const existingZoneId = document.getElementById('mlbb-zone-id-container');
    if (existingZoneId) existingZoneId.remove();

    if (game.requiresServer) {
        serverContainer.classList.remove('hidden');
        serverSelect.innerHTML = '';
        game.servers.forEach(server => {
            const opt = document.createElement('option');
            opt.value = server;
            opt.textContent = server;
            serverSelect.appendChild(opt);
        });
        state.playerServer = game.servers[0];
    } else {
        serverContainer.classList.add('hidden');
        state.playerServer = '';
    }

    // Handle MLBB Zone ID
    if (game.requiresZoneId) {
        const zoneMarkup = `
            <div id="mlbb-zone-id-container" class="space-y-2">
                <label for="player-zone-id" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Зона ID (Zone ID)</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <i data-lucide="layers" class="w-4 h-4"></i>
                    </div>
                    <input type="text" id="player-zone-id" placeholder="Например: 1234" class="w-full bg-dark-base/80 border border-dark-border rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono">
                </div>
            </div>
        `;
        serverContainer.insertAdjacentHTML('afterend', zoneMarkup);
        lucide.createIcons();
    }

    // Transition Screens
    sectionGames.classList.add('hidden');
    sectionAccount.classList.remove('hidden');
}

// Confirm Account & Transition to Step 3
function confirmAccount() {
    const idInput = document.getElementById('player-id');
    state.playerId = idInput.value.trim();
    
    if (!state.playerId) {
        idInput.classList.add('border-red-500');
        hapticFeedback('error');
        setTimeout(() => idInput.classList.remove('border-red-500'), 1500);
        return;
    }

    if (state.selectedGame.requiresServer) {
        state.playerServer = document.getElementById('player-server').value;
    }

    if (state.selectedGame.requiresZoneId) {
        const zoneInput = document.getElementById('player-zone-id');
        state.playerZoneId = zoneInput.value.trim();
        if (!state.playerZoneId) {
            zoneInput.classList.add('border-red-500');
            hapticFeedback('error');
            setTimeout(() => zoneInput.classList.remove('border-red-500'), 1500);
            return;
        }
    }

    hapticFeedback('medium');

    // Update progress bar
    stepProgress.style.width = '100%';
    stepLabel3.classList.add('text-neon-cyan');

    // Setup Packages Grid & Slider
    renderPackages();
    setupCustomAmountTab();

    // Transition Screens
    sectionAccount.classList.add('hidden');
    sectionCurrency.classList.remove('hidden');
    
    updateSummary();
}

// Render Currency Packages
function renderPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    packagesGrid.innerHTML = '';
    
    state.selectedGame.packages.forEach((pkg, index) => {
        const card = document.createElement('div');
        card.className = `bg-dark-card border rounded-2xl p-4 flex flex-col justify-between cursor-pointer relative transition-all duration-300 hover:border-neon-cyan/50 ${index === 1 ? 'border-neon-purple/40 shadow-purple-glow' : 'border-dark-border'}`;
        card.dataset.id = pkg.id;
        
        // Badge markup
        let badgeMarkup = '';
        if (pkg.badge) {
            badgeMarkup = `<span class="absolute -top-2.5 right-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-pink-glow">${pkg.badge}</span>`;
        }

        // Bonus markup
        let bonusMarkup = '';
        if (pkg.bonus > 0) {
            bonusMarkup = `<span class="text-[10px] text-emerald-400 font-bold ml-1">+${pkg.bonus} Бонус</span>`;
        }

        card.innerHTML = `
            ${badgeMarkup}
            <div class="space-y-1">
                <div class="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mb-2">
                    <i data-lucide="coins" class="w-4.5 h-4.5"></i>
                </div>
                <div class="font-['Orbitron'] font-extrabold text-lg text-white">
                    ${pkg.amount}
                </div>
                <div class="text-[10px] text-slate-400 flex items-center">
                    ${state.selectedGame.currency} ${bonusMarkup}
                </div>
            </div>
            <div class="font-['Orbitron'] font-bold text-sm text-neon-gold border-t border-slate-800/80 pt-2.5 mt-3">
                ${pkg.price} ₽
            </div>
        `;

        card.addEventListener('click', () => {
            // Remove active style from all
            document.querySelectorAll('#packages-grid > div').forEach(c => {
                c.classList.remove('border-neon-cyan', 'shadow-cyan-glow');
                c.classList.add('border-dark-border');
            });
            // Add active style to selected
            card.classList.remove('border-dark-border');
            card.classList.add('border-neon-cyan', 'shadow-cyan-glow');
            
            state.selectedPackage = pkg;
            hapticFeedback('light');
            updateSummary();
        });

        packagesGrid.appendChild(card);
        
        // Select second package by default
        if (index === 1) {
            card.click();
        }
    });

    lucide.createIcons();
}

// Setup Custom Amount Tab
function setupCustomAmountTab() {
    const suffix = document.getElementById('custom-currency-suffix');
    suffix.textContent = state.selectedGame.currency.toUpperCase();
    
    const slider = document.getElementById('custom-amount-slider');
    const input = document.getElementById('custom-amount-input');
    
    // Reset values
    slider.value = 1000;
    input.value = 1000;
    state.customAmount = 1000;
    
    updateCustomBonusAndPrice();
}

// Update Custom Amount Calculations
function updateCustomBonusAndPrice() {
    const amount = state.customAmount;
    const rate = state.selectedGame.rate;
    
    // Dynamic bonus calculation (e.g. 5% for >500, 10% for >2000, 15% for >5000)
    let bonusPercent = 0;
    if (amount >= 5000) {
        bonusPercent = 15;
    } else if (amount >= 2000) {
        bonusPercent = 10;
    } else if (amount >= 500) {
        bonusPercent = 5;
    }

    const bonusAmount = Math.round(amount * (bonusPercent / 100));
    
    // Price calculation with bulk discount
    let discount = 1.0;
    if (amount >= 5000) {
        discount = 0.85; // 15% discount on rate
    } else if (amount >= 2000) {
        discount = 0.90; // 10% discount
    } else if (amount >= 1000) {
        discount = 0.95; // 5% discount
    }

    const price = Math.round(amount * rate * discount);

    // Update UI
    document.getElementById('custom-bonus-percent').textContent = bonusPercent;
    document.getElementById('custom-bonus-amount').textContent = bonusAmount;
    document.querySelectorAll('.currency-name').forEach(el => el.textContent = state.selectedGame.currency);

    updateSummary();
}

// Update Summary Card
function updateSummary() {
    if (!state.selectedGame) return;

    document.getElementById('summary-game').textContent = state.selectedGame.title;
    
    let displayId = state.playerId;
    if (state.playerZoneId) {
        displayId += ` (${state.playerZoneId})`;
    }
    document.getElementById('summary-player-id').textContent = displayId;

    if (state.selectedGame.requiresServer) {
        document.getElementById('summary-server-row').classList.remove('hidden');
        document.getElementById('summary-server').textContent = state.playerServer;
    } else {
        document.getElementById('summary-server-row').classList.add('hidden');
    }

    let finalItemText = '';
    let finalPrice = 0;

    if (state.activeTab === 'packages' && state.selectedPackage) {
        const pkg = state.selectedPackage;
        const bonusText = pkg.bonus > 0 ? ` + ${pkg.bonus} Бонус` : '';
        finalItemText = `${pkg.amount}${bonusText} ${state.selectedGame.currency}`;
        finalPrice = pkg.price;
    } else {
        const amount = state.customAmount;
        const rate = state.selectedGame.rate;
        
        let bonusPercent = 0;
        if (amount >= 5000) bonusPercent = 15;
        else if (amount >= 2000) bonusPercent = 10;
        else if (amount >= 500) bonusPercent = 5;

        const bonusAmount = Math.round(amount * (bonusPercent / 100));
        
        let discount = 1.0;
        if (amount >= 5000) discount = 0.85;
        else if (amount >= 2000) discount = 0.90;
        else if (amount >= 1000) discount = 0.95;

        finalPrice = Math.round(amount * rate * discount);
        const bonusText = bonusAmount > 0 ? ` + ${bonusAmount} Бонус` : '';
        finalItemText = `${amount}${bonusText} ${state.selectedGame.currency}`;
    }

    document.getElementById('summary-item').textContent = finalItemText;
    document.getElementById('summary-price').textContent = `${finalPrice} ₽`;
}

// Transition to Checkout Section
function proceedToCheckout() {
    hapticFeedback('heavy');

    // Update Checkout details
    let finalItemText = '';
    let finalPrice = 0;

    if (state.activeTab === 'packages' && state.selectedPackage) {
        const pkg = state.selectedPackage;
        finalItemText = `${pkg.amount} ${state.selectedGame.currency} (${state.selectedGame.title})`;
        finalPrice = pkg.price;
    } else {
        finalItemText = `${state.customAmount} ${state.selectedGame.currency} (${state.selectedGame.title})`;
        const rate = state.selectedGame.rate;
        let discount = 1.0;
        if (state.customAmount >= 5000) discount = 0.85;
        else if (state.customAmount >= 2000) discount = 0.90;
        else if (state.customAmount >= 1000) discount = 0.95;
        finalPrice = Math.round(state.customAmount * rate * discount);
    }

    document.getElementById('checkout-total-price').textContent = `${finalPrice} ₽`;
    document.getElementById('checkout-item-desc').textContent = finalItemText;

    // Transition Screens
    sectionCurrency.classList.add('hidden');
    sectionCheckout.classList.remove('hidden');
}

// Handle Event Listeners
function setupEventListeners() {
    // Back Buttons
    document.getElementById('back-to-games').addEventListener('click', () => {
        hapticFeedback('light');
        sectionAccount.classList.add('hidden');
        sectionGames.classList.remove('hidden');
        stepProgress.style.width = '33%';
        stepLabel2.classList.remove('text-neon-cyan');
    });

    document.getElementById('back-to-account').addEventListener('click', () => {
        hapticFeedback('light');
        sectionCurrency.classList.add('hidden');
        sectionAccount.classList.remove('hidden');
        stepProgress.style.width = '66%';
        stepLabel3.classList.remove('text-neon-cyan');
    });

    document.getElementById('back-to-currency').addEventListener('click', () => {
        hapticFeedback('light');
        sectionCheckout.classList.add('hidden');
        sectionCurrency.classList.remove('hidden');
    });

    // Confirm Account Button
    document.getElementById('btn-confirm-account').addEventListener('click', confirmAccount);

    // Tab Switching
    const tabPackages = document.getElementById('tab-packages');
    const tabCustom = document.getElementById('tab-custom');
    const tabContentPackages = document.getElementById('tab-content-packages');
    const tabContentCustom = document.getElementById('tab-content-custom');

    tabPackages.addEventListener('click', () => {
        if (state.activeTab === 'packages') return;
        hapticFeedback('light');
        state.activeTab = 'packages';
        
        tabPackages.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-white bg-dark-base border border-white/5 shadow-sm';
        tabCustom.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white';
        
        tabContentPackages.classList.remove('hidden');
        tabContentCustom.classList.add('hidden');
        updateSummary();
    });

    tabCustom.addEventListener('click', () => {
        if (state.activeTab === 'custom') return;
        hapticFeedback('light');
        state.activeTab = 'custom';
        
        tabCustom.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-white bg-dark-base border border-white/5 shadow-sm';
        tabPackages.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white';
        
        tabContentCustom.classList.remove('hidden');
        tabContentPackages.classList.add('hidden');
        updateCustomBonusAndPrice();
    });

    // Custom Slider and Input
    const slider = document.getElementById('custom-amount-slider');
    const input = document.getElementById('custom-amount-input');

    slider.addEventListener('input', (e) => {
        state.customAmount = parseInt(e.target.value);
        input.value = state.customAmount;
        updateCustomBonusAndPrice();
    });

    input.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 100;
        if (val < 100) val = 100;
        if (val > 10000) val = 10000;
        
        state.customAmount = val;
        slider.value = val;
        updateCustomBonusAndPrice();
    });

    // Proceed to Checkout Button
    document.getElementById('btn-proceed-checkout').addEventListener('click', proceedToCheckout);

    // Payment Method Selection
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            paymentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.selectedPaymentMethod = card.dataset.method;
            hapticFeedback('light');
        });
    });
    // Select first payment method (SBP) by default
    paymentCards[0].classList.add('active');

    // Pay Now Button (Redirect to Lava.ru)
    document.getElementById('btn-pay-now').addEventListener('click', () => {
        const lavaUrl = 'https://business.lava.ru/1a052828-a793-432c-8206-704522ddc3ab/';
        window.open(lavaUrl, '_blank');
        
        // Update Success Modal details
        let finalItemText = '';
        if (state.activeTab === 'packages' && state.selectedPackage) {
            finalItemText = `${state.selectedPackage.amount} ${state.selectedGame.currency}`;
        } else {
            finalItemText = `${state.customAmount} ${state.selectedGame.currency}`;
        }
        
        document.getElementById('success-modal-item').textContent = finalItemText;
        document.getElementById('success-modal-id').textContent = state.playerId;

        // Show verification/pending modal
        document.getElementById('modal-success').classList.remove('hidden');
    });

    // Close Success Modal
    document.getElementById('btn-success-close').addEventListener('click', () => {
        hapticFeedback('light');
        document.getElementById('modal-success').classList.add('hidden');
        
        // Reset to first screen
        sectionCheckout.classList.add('hidden');
        sectionGames.classList.remove('hidden');
        stepProgress.style.width = '33%';
        stepLabel2.classList.remove('text-neon-cyan');
        stepLabel3.classList.remove('text-neon-cyan');
        
        state = {
            selectedGame: null,
            playerId: '',
            playerServer: '',
            playerZoneId: '',
            selectedPackage: null,
            customAmount: 1000,
            activeTab: 'packages',
            selectedPaymentMethod: 'sbp'
        };
    });

    // Navigation Tabs
    const navShop = document.getElementById('nav-shop');
    const navHistory = document.getElementById('nav-history');
    const navSupport = document.getElementById('nav-support');

    const screenHistory = document.getElementById('screen-history');
    const screenSupport = document.getElementById('screen-support');

    navShop.addEventListener('click', () => {
        hapticFeedback('light');
        setActiveNav(navShop);
        screenHistory.classList.add('hidden');
        screenSupport.classList.add('hidden');
    });

    navHistory.addEventListener('click', () => {
        hapticFeedback('light');
        setActiveNav(navHistory);
        screenHistory.classList.remove('hidden');
        screenSupport.classList.add('hidden');
    });

    navSupport.addEventListener('click', () => {
        hapticFeedback('light');
        setActiveNav(navSupport);
        screenSupport.classList.remove('hidden');
        screenHistory.classList.add('hidden');
    });

    document.getElementById('close-history').addEventListener('click', () => {
        navShop.click();
    });

    document.getElementById('close-support').addEventListener('click', () => {
        navShop.click();
    });
}

// Set Active Navigation Button Style
function setActiveNav(activeBtn) {
    const navBtns = [document.getElementById('nav-shop'), document.getElementById('nav-history'), document.getElementById('nav-support')];
    navBtns.forEach(btn => {
        if (btn === activeBtn) {
            btn.className = 'flex flex-col items-center gap-1 text-neon-cyan transition-colors';
        } else {
            btn.className = 'flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors';
        }
    });
}

// Haptic Feedback Helper (No-op for standard web)
function hapticFeedback(type) {
    // Standard browsers do not support haptic feedback
}
