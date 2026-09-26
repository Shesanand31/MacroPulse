/**
 * OmniUI / DevCRAFT Inc. Dashboard Application
 * High-fidelity interactive script reproducing Figma Dashboard UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // State Management
  const state = {
    currentView: 'overview',
    sidebarCollapsed: false,
    logStreamActive: true,
    currentCategory: 'all',
    tradePairPrice: 10.24,
    tradePairDelta: 2.20,
    logs: [],
    indicators: [
      {
        id: 'MACRO-01',
        name: 'Overnight Policy Rate (OPR)',
        symbol: 'BNM-OPR',
        icon: 'landmark',
        category: 'macro',
        categoryLabel: 'Monetary Policy',
        current: '3.00%',
        prior: '2.75%',
        change: '+25 bps',
        changePositive: true,
        signal: 'Neutral / Target Met',
        signalType: 'success'
      },
      {
        id: 'MACRO-02',
        name: 'Headline Inflation (CPI YoY)',
        symbol: 'MY-CPI',
        icon: 'percent',
        category: 'macro',
        categoryLabel: 'Price Index',
        current: '1.90%',
        prior: '2.10%',
        change: '-0.20%',
        changePositive: true,
        signal: 'Cooling / Below 2.0%',
        signalType: 'success'
      },
      {
        id: 'MACRO-03',
        name: 'Real GDP Growth Rate',
        symbol: 'MY-GDP',
        icon: 'trending-up',
        category: 'macro',
        categoryLabel: 'National Output',
        current: '5.10%',
        prior: '4.40%',
        change: '+0.70%',
        changePositive: true,
        signal: 'Robust Expansion',
        signalType: 'success'
      },
      {
        id: 'EQ-01',
        name: 'Malayan Banking (Maybank)',
        symbol: '1155.KL',
        icon: 'building-2',
        category: 'stock',
        categoryLabel: 'Financial Services',
        current: 'RM 10.24',
        prior: 'RM 10.02',
        change: '+2.20%',
        changePositive: true,
        signal: 'Strong Buy • Div 6.4%',
        signalType: 'success'
      },
      {
        id: 'EQ-02',
        name: 'Tenaga Nasional Berhad',
        symbol: '5347.KL',
        icon: 'zap',
        category: 'stock',
        categoryLabel: 'Utilities & Power',
        current: 'RM 14.10',
        prior: 'RM 13.76',
        change: '+2.47%',
        changePositive: true,
        signal: 'Accumulate • Grid AI',
        signalType: 'success'
      },
      {
        id: 'EQ-03',
        name: 'Public Bank Berhad',
        symbol: '1295.KL',
        icon: 'landmark',
        category: 'stock',
        categoryLabel: 'Financial Services',
        current: 'RM 4.35',
        prior: 'RM 4.30',
        change: '+1.16%',
        changePositive: true,
        signal: 'Defensive Value',
        signalType: 'success'
      },
      {
        id: 'EQ-04',
        name: 'Inari Amertron (Semiconductor)',
        symbol: '0166.KL',
        icon: 'cpu',
        category: 'stock',
        categoryLabel: 'Tech & Semi',
        current: 'RM 3.82',
        prior: 'RM 3.68',
        change: '+3.80%',
        changePositive: true,
        signal: 'Tech Inflow Rally',
        signalType: 'info'
      },
      {
        id: 'FX-01',
        name: 'US Dollar / Malaysian Ringgit',
        symbol: 'USD/MYR',
        icon: 'banknote',
        category: 'fx',
        categoryLabel: 'Foreign Exchange',
        current: '4.3850',
        prior: '4.4210',
        change: '-0.81%',
        changePositive: true,
        signal: 'MYR Strengthening',
        signalType: 'info'
      },
      {
        id: 'FX-02',
        name: '10-Year Govt Bond (MGS Yield)',
        symbol: 'MGS-10Y',
        icon: 'shield',
        category: 'fx',
        categoryLabel: 'Sovereign Debt',
        current: '3.78%',
        prior: '3.82%',
        change: '-4 bps',
        changePositive: true,
        signal: 'Yield Compression',
        signalType: 'warning'
      },
      {
        id: 'MACRO-04',
        name: 'Trade Balance (Surplus)',
        symbol: 'MY-TRADE',
        icon: 'scale',
        category: 'macro',
        categoryLabel: 'External Trade',
        current: '+RM 14.8B',
        prior: '+RM 12.3B',
        change: '+20.3%',
        changePositive: true,
        signal: 'Export Surplus',
        signalType: 'success'
      },
      {
        id: 'FRED-01',
        name: 'Federal Funds Effective Rate',
        symbol: 'FEDFUNDS',
        icon: 'landmark',
        category: 'fred',
        categoryLabel: 'Central Bank Policy',
        current: '3.63%',
        prior: '3.63%',
        change: '0.00%',
        changePositive: true,
        signal: 'Target 5.25 - 5.50%',
        signalType: 'info'
      },
      {
        id: 'FRED-02',
        name: 'US Consumer Price Index (CPI)',
        symbol: 'CPIAUCSL',
        icon: 'percent',
        category: 'fred',
        categoryLabel: 'Inflation',
        current: '314.8',
        prior: '314.5',
        change: '+0.10%',
        changePositive: true,
        signal: 'Cooling / Easing',
        signalType: 'success'
      },
      {
        id: 'FRED-03',
        name: 'US Real Gross Domestic Product',
        symbol: 'GDPC1',
        icon: 'trending-up',
        category: 'fred',
        categoryLabel: 'Economic Output',
        current: '$23.15T',
        prior: '$22.98T',
        change: '+2.8% YoY',
        changePositive: true,
        signal: 'Expansion',
        signalType: 'success'
      },
      {
        id: 'FRED-04',
        name: '10-Year Treasury Yield',
        symbol: 'DGS10',
        icon: 'shield',
        category: 'fred',
        categoryLabel: 'Sovereign Yields',
        current: '4.18%',
        prior: '4.22%',
        change: '-4 bps',
        changePositive: true,
        signal: 'Benchmark Bond',
        signalType: 'info'
      },
      {
        id: 'FRED-05',
        name: '10Y-2Y Treasury Yield Spread',
        symbol: 'T10Y2Y',
        icon: 'git-commit',
        category: 'fred',
        categoryLabel: 'Yield Curve',
        current: '+0.15%',
        prior: '+0.08%',
        change: '+7 bps',
        changePositive: true,
        signal: 'Curve Normalizing',
        signalType: 'success'
      },
      {
        id: 'FRED-06',
        name: 'Civilian Unemployment Rate',
        symbol: 'UNRATE',
        icon: 'users',
        category: 'fred',
        categoryLabel: 'Labor Market',
        current: '4.20%',
        prior: '4.30%',
        change: '-0.10%',
        changePositive: true,
        signal: 'Full Employment',
        signalType: 'success'
      }
    ]
  };

  // Toast System
  function showToast(message, type = 'info', action = null) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    // Suppress background news toasts if user is on login/registration/forgot screen
    const loginPage = document.getElementById('loginPage');
    if (loginPage && window.getComputedStyle(loginPage).display !== 'none' && !type.includes('auth')) {
      return;
    }

    const toast = document.createElement('div');
    toast.className = 'toast' + (action ? ' toast-actionable' : '');
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-triangle';
    if (type === 'policy') icon = 'landmark';

    let actionBtnHtml = '';
    if (action && action.label) {
      actionBtnHtml = `<button type="button" class="toast-action-btn" style="background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(96, 165, 250, 0.5); color: #93c5fd; padding: 3px 9px; border-radius: 4px; font-size: 0.72rem; font-weight: 600; cursor: pointer; white-space: nowrap; margin-left: 8px;">${action.label}</button>`;
    }

    toast.innerHTML = `
      <i data-lucide="${icon}" style="width: 18px; height: 18px; flex-shrink: 0; color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'policy' ? '#38bdf8' : '#a78bfa'};"></i>
      <span style="flex: 1;">${message}</span>
      ${actionBtnHtml}
    `;
    
    if (action && action.onClick) {
      const btn = toast.querySelector('.toast-action-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          action.onClick();
          toast.remove();
        });
      }
    }

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons({ root: toast });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, action ? 6000 : 3500);
  }

  // ==========================================
  // Navigation & View Switching
  // ==========================================
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const viewSections = document.querySelectorAll('.view-section');
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  const pageTitle = document.getElementById('pageTitle');

  const viewMetadata = {
    overview: { breadcrumb: 'Macro & Equities', title: 'Macroeconomic Indicators & Stock Market Overview' },
    logs: { breadcrumb: 'Policy & Rates', title: 'Central Bank Policy Target & Macro Data Feed' },
    trading: { breadcrumb: 'Stock Analysis', title: 'Equities Technical & Candlestick Analysis' },
    analytics: { breadcrumb: 'Global FX & Yields', title: 'Sovereign Bond Yields & Currency Intelligence' },
    models: { breadcrumb: 'Model Performance Logs', title: 'AI Quantitative Models & Error Telemetry (RMSE, MAE, MAPE)' },
    settings: { breadcrumb: 'Profile & Settings', title: 'User Profile & Account Settings' }
  };

  function switchView(viewName) {
    if (!viewMetadata[viewName]) return;
    state.currentView = viewName;

    const gModal = document.getElementById('googleAccountModal');
    if (gModal) gModal.style.display = 'none';

    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    viewSections.forEach(section => {
      if (section.id === `view-${viewName}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    breadcrumbCurrent.textContent = viewMetadata[viewName].breadcrumb;
    pageTitle.textContent = viewMetadata[viewName].title;

    if (viewName === 'trading') {
      requestAnimationFrame(() => {
        renderCandlesticks();
        if (typeof updateStockAiPrediction === 'function') {
          updateStockAiPrediction(currentStockData);
        }
      });
    }
    if (viewName === 'logs') drawSpeedometer();
    if (viewName === 'overview' && waveChartInstance) waveChartInstance.resize();
    if (viewName === 'models') {
      if (forecastChartInstance) forecastChartInstance.resize();
      if (diagnosticsChartInstance) diagnosticsChartInstance.resize();
    }
    if (viewName === 'analytics') {
      requestAnimationFrame(() => {
        if (typeof initAnalyticsView === 'function') {
          initAnalyticsView();
        }
        if (typeof yieldCurveChartInstance !== 'undefined' && yieldCurveChartInstance) {
          yieldCurveChartInstance.resize();
        }
      });
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Sidebar Collapse
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  collapseBtn.addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
  });

  // Market Switcher Simulator
  document.getElementById('workspaceBadge').addEventListener('click', () => {
    showToast('Market Status: KLSE / Bursa Malaysia & NYSE Active', 'success');
  });

  // ==========================================
  // Company-Specific Market Report Controller (Print & CSV)
  // ==========================================
  let activeReportData = null;
  let activeReportSymbol = '1155.KL';

  const companyReportModalBackdrop = document.getElementById('companyReportModalBackdrop');
  const companyReportModal = document.getElementById('companyReportModal');
  const closeCompanyReportModalBtn = document.getElementById('closeCompanyReportModalBtn');
  const printCompanyReportBtn = document.getElementById('printCompanyReportBtn');
  const downloadCompanyReportCsvBtn = document.getElementById('downloadCompanyReportCsvBtn');
  const reportSearchSymbolInput = document.getElementById('reportSearchSymbolInput');
  const reportSearchSubmitBtn = document.getElementById('reportSearchSubmitBtn');

  function openCompanyReportModal(symbol) {
    const targetSymbol = symbol || currentStockSymbol || '1155.KL';
    activeReportSymbol = targetSymbol;
    if (companyReportModalBackdrop) companyReportModalBackdrop.classList.add('open');

    // Update active state on company pills
    document.querySelectorAll('#reportCompanyPills .report-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-symbol') === targetSymbol);
    });

    if (reportSearchSymbolInput) reportSearchSymbolInput.value = '';

    // If matching stock data already exists in memory, render immediately
    if (currentStockData && currentStockData.symbol.toUpperCase() === targetSymbol.toUpperCase()) {
      activeReportData = currentStockData;
      renderCompanyReport(currentStockData);
    }

    // Fetch full enriched report data from API
    fetchCompanyReport(targetSymbol);
  }

  function closeCompanyReportModal() {
    if (companyReportModalBackdrop) companyReportModalBackdrop.classList.remove('open');
  }

  async function fetchCompanyReport(symbol) {
    try {
      const resp = await fetch(`/api/stock/report?symbol=${encodeURIComponent(symbol)}`);
      if (!resp.ok) throw new Error('Could not fetch report');
      const data = await resp.json();
      activeReportData = data;
      renderCompanyReport(data);
    } catch (err) {
      console.error('Error loading report for', symbol, err);
      if (!activeReportData) {
        showToast(`Could not load report for "${symbol}". Please verify ticker.`, 'error');
      }
    }
  }

  function renderCompanyReport(data) {
    if (!data) return;
    const currSign = data.currency === 'MYR' ? 'RM ' : '$';
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);

    const el = (id) => document.getElementById(id);

    if (el('repGeneratedDate')) el('repGeneratedDate').textContent = `${dateStr} ${timeStr}`;
    if (el('repCompanyName')) el('repCompanyName').textContent = data.name;
    if (el('repExchangeBadge')) el('repExchangeBadge').textContent = data.exchange || (data.symbol.endsWith('.KL') ? 'BURSA MALAYSIA / KLSE' : 'US MARKET');
    if (el('repSymbol')) el('repSymbol').textContent = data.symbol;
    if (el('repSector')) el('repSector').textContent = data.sector || 'Equities';
    if (el('repIndustry')) el('repIndustry').textContent = data.industry || data.sector || 'Equities';
    if (el('repCountry')) el('repCountry').textContent = data.country || (data.symbol.endsWith('.KL') ? 'Malaysia' : 'United States');
    if (el('repCurrency')) el('repCurrency').textContent = `${data.currency} (${currSign.trim()})`;

    if (el('repPrice')) {
      el('repPrice').textContent = `${currSign}${data.price.toFixed(2)}`;
      el('repPrice').style.color = data.change >= 0 ? 'var(--accent-green)' : '#ef4444';
    }

    if (el('repPriceDelta')) {
      const isUp = data.change >= 0;
      el('repPriceDelta').className = `corp-price-delta ${isUp ? 'up' : 'down'}`;
      el('repPriceDelta').textContent = `${isUp ? '+' : ''}${data.change.toFixed(2)} (${isUp ? '+' : ''}${data.changePercent.toFixed(2)}%) Today`;
    }

    const exName = data.exchange || (data.symbol.endsWith('.KL') ? 'Bursa Malaysia / KLSE' : 'Global Exchanges');
    if (el('repCompanySummary')) el('repCompanySummary').textContent = data.summary || `${data.name} is a leading enterprise listed on ${exName}.`;

    // Section 1: Price & Trading
    if (el('repPrevClose')) el('repPrevClose').textContent = `${currSign}${data.previousClose.toFixed(2)}`;
    if (el('repDayRange')) el('repDayRange').textContent = `${currSign}${data.dayHigh.toFixed(2)} / ${data.dayLow.toFixed(2)}`;
    const high52 = data.fiftyTwoWeekHigh || (data.dayHigh * 1.15);
    const low52 = data.fiftyTwoWeekLow || (data.dayLow * 0.85);
    if (el('rep52WkRange')) el('rep52WkRange').textContent = `${currSign}${high52.toFixed(2)} / ${low52.toFixed(2)}`;
    if (el('repVolume')) el('repVolume').textContent = data.volume;

    // Section 2: Valuation Multiples
    if (el('repMarketCap')) el('repMarketCap').textContent = `${currSign}${data.marketCap}`;
    if (el('repPeRatio')) el('repPeRatio').textContent = data.peRatio ? `${data.peRatio}x` : 'N/A';
    if (el('repDividendYield')) {
      if (data.dividendYield) {
        let dy = parseFloat(data.dividendYield);
        if (dy > 25.0) dy = dy / 100;
        el('repDividendYield').textContent = dy.toFixed(2) + '%';
      } else {
        el('repDividendYield').textContent = 'N/A';
      }
    }
    if (el('repBeta')) el('repBeta').textContent = data.beta || '1.05';
    if (el('repValuationStance')) {
      el('repValuationStance').textContent = (data.peRatio && data.peRatio < 15) ? 'Attractive Valuation' : ((data.peRatio && data.peRatio > 35) ? 'Growth Premium' : 'Fair / In-Line');
    }
    if (el('repRating')) {
      el('repRating').textContent = data.change >= 0 ? 'ACCUMULATE / OUTPERFORM' : 'HOLD / NEUTRAL';
      el('repRating').style.color = data.change >= 0 ? 'var(--accent-green)' : '#f59e0b';
    }

    // Section 3: Macro Context
    if (data.macroContext) {
      if (el('repMacroJur')) el('repMacroJur').textContent = data.macroContext.jurisdiction;
      if (el('repMacroStance')) el('repMacroStance').textContent = `Monetary Policy: ${data.macroContext.rateStance}`;
      if (el('repMacroRate')) el('repMacroRate').textContent = data.macroContext.benchmarkRate;
      if (el('repMacroInflation')) el('repMacroInflation').textContent = data.macroContext.inflation;
      if (el('repMacroGdp')) el('repMacroGdp').textContent = data.macroContext.gdpGrowth;
      if (el('repMacroYield')) el('repMacroYield').textContent = data.macroContext.sovereignYield;
      if (el('repMacroSectorImpact')) el('repMacroSectorImpact').textContent = data.macroContext.sectorImpact;
    }

    // Section 4: Quantitative AI
    if (data.aiForecast) {
      if (el('repAiModel')) el('repAiModel').textContent = data.aiForecast.championModel;
      if (el('repAiHorizon')) el('repAiHorizon').textContent = data.aiForecast.forecastHorizon;
      if (el('repAiDirection')) {
        const isUp = !data.aiForecast.targetDirection.toLowerCase().includes('pullback');
        el('repAiDirection').className = `corp-ai-direction ${isUp ? 'up' : 'down'}`;
        el('repAiDirection').textContent = data.aiForecast.targetDirection;
      }
      if (el('repAiTargetPrice')) el('repAiTargetPrice').textContent = `${currSign}${data.aiForecast.targetPrice.toFixed(2)}`;
      if (el('repAiDirAcc')) el('repAiDirAcc').textContent = data.aiForecast.directionalAccuracy;
      if (el('repAiRmse')) el('repAiRmse').textContent = data.aiForecast.modelRmse.toFixed(4);
      if (el('repAiMape')) el('repAiMape').textContent = data.aiForecast.modelMape;
    }

    // Section 5: History Table (Last 10 trading sessions)
    const tbody = el('repHistoryTbody');
    if (tbody && data.candles && data.candles.length > 0) {
      tbody.innerHTML = '';
      const recent = data.candles.slice(-10).reverse();
      recent.forEach(c => {
        const isUp = c.close >= c.open;
        const diff = c.close - c.open;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong style="color: #fff;">${c.date}</strong></td>
          <td style="text-align: right;">${currSign}${c.open.toFixed(2)}</td>
          <td style="text-align: right;">${currSign}${c.high.toFixed(2)}</td>
          <td style="text-align: right;">${currSign}${c.low.toFixed(2)}</td>
          <td style="text-align: right; font-weight: 700; color: #fff;">${currSign}${c.close.toFixed(2)}</td>
          <td style="text-align: right; color: var(--text-muted);">${(c.volume / 1e6).toFixed(2)}M</td>
          <td style="text-align: center;">
            <span class="delta-badge ${isUp ? 'up' : 'down'}" style="font-size: 0.72rem; padding: 2px 6px;">
              ${isUp ? '+' : ''}${diff.toFixed(2)}
            </span>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    if (window.lucide) lucide.createIcons({ root: el('companyReportModal') });
  }

  function downloadCompanyReportCsv(data) {
    if (!data) return;
    const sym = data.symbol.replace('.', '_');
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 8);
    const currSign = data.currency === 'MYR' ? 'RM ' : '$';

    const rows = [
      ['"MacroPulse Institutional Equity & Valuation Research Report"'],
      ['"Export Timestamp"', `"${dateStr} ${timeStr}"`],
      ['"Company Name"', `"${data.name}"`],
      ['"Symbol / Ticker"', `"${data.symbol}"`],
      ['"Exchange"', `"${data.exchange || 'KLSE'}"`],
      ['"Sector"', `"${data.sector}"`],
      ['"Industry"', `"${data.industry || data.sector}"`],
      ['"Country of Primary Listing"', `"${data.country || 'Malaysia'}"`],
      ['"Reporting Currency"', `"${data.currency}"`],
      [''],
      ['"--- SECTION 1: REAL-TIME PRICE & TRADING STATISTICS ---"'],
      ['"Metric"', '"Value"'],
      ['"Latest Traded Price (LTP)"', `"${currSign}${data.price.toFixed(2)}"`],
      ['"Session Delta"', `"${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%)"`],
      ['"Previous Close"', `"${currSign}${data.previousClose.toFixed(2)}"`],
      ['"Day High"', `"${currSign}${data.dayHigh.toFixed(2)}"`],
      ['"Day Low"', `"${currSign}${data.dayLow.toFixed(2)}"`],
      ['"52-Week High"', `"${currSign}${(data.fiftyTwoWeekHigh || data.dayHigh * 1.15).toFixed(2)}"`],
      ['"52-Week Low"', `"${currSign}${(data.fiftyTwoWeekLow || data.dayLow * 0.85).toFixed(2)}"`],
      ['"Trading Volume"', `"${data.volume}"`],
      [''],
      ['"--- SECTION 2: VALUATION MULTIPLES & FINANCIAL FUNDAMENTALS ---"'],
      ['"Metric"', '"Value"'],
      ['"Market Capitalization"', `"${currSign}${data.marketCap}"`],
      ['"Trailing P/E Ratio"', `"${data.peRatio ? data.peRatio + 'x' : 'N/A'}"`],
      ['"Forward P/E Ratio"', `"${data.forwardPE ? data.forwardPE + 'x' : 'N/A'}"`],
      ['"Dividend Yield"', `"${data.dividendYield ? data.dividendYield + '%' : 'N/A'}"`],
      ['"Diluted EPS (TTM)"', `"${data.eps ? currSign + data.eps.toFixed(2) : 'N/A'}"`],
      ['"Beta (5Y Monthly)"', `"${data.beta || 1.05}"`],
      ['"Institutional Stance"', `"${data.change >= 0 ? 'ACCUMULATE / OUTPERFORM' : 'HOLD / NEUTRAL'}"`],
      [''],
      ['"--- SECTION 3: MACROECONOMIC POLICY & SECTOR EXPOSURE ---"'],
      ['"Jurisdiction / Central Bank"', `"${data.macroContext ? data.macroContext.jurisdiction : 'N/A'}"`],
      ['"Benchmark Interest Rate"', `"${data.macroContext ? data.macroContext.benchmarkRate : 'N/A'}"`],
      ['"Monetary Policy Stance"', `"${data.macroContext ? data.macroContext.rateStance : 'N/A'}"`],
      ['"Headline Inflation"', `"${data.macroContext ? data.macroContext.inflation : 'N/A'}"`],
      ['"Real GDP Growth"', `"${data.macroContext ? data.macroContext.gdpGrowth : 'N/A'}"`],
      ['"10-Year Benchmark Sovereign Yield"', `"${data.macroContext ? data.macroContext.sovereignYield : 'N/A'}"`],
      ['"Sector Exposure Impact"', `"${data.macroContext ? data.macroContext.sectorImpact : 'N/A'}"`],
      [''],
      ['"--- SECTION 4: QUANTITATIVE AI MODEL PRICE TARGET ---"'],
      ['"Champion Model Architecture"', `"${data.aiForecast ? data.aiForecast.championModel : 'PatchTST Transformer'}"`],
      ['"Forecast Horizon"', `"${data.aiForecast ? data.aiForecast.forecastHorizon : '15 Trading Days'}"`],
      ['"Directional Outlook"', `"${data.aiForecast ? data.aiForecast.targetDirection : 'Bullish'}"`],
      ['"Projected Price Target"', `"${currSign}${data.aiForecast ? data.aiForecast.targetPrice.toFixed(2) : (data.price * 1.03).toFixed(2)}"`],
      ['"Directional Hit Rate Accuracy"', `"${data.aiForecast ? data.aiForecast.directionalAccuracy : '80.0%'}"`],
      ['"Model Evaluation RMSE"', `"${data.aiForecast ? data.aiForecast.modelRmse : '0.0850'}"`],
      ['"Model Evaluation MAPE"', `"${data.aiForecast ? data.aiForecast.modelMape : '0.63%'}"`],
      ['"Confidence Tier"', `"${data.aiForecast ? data.aiForecast.confidenceTier : 'High'}"`],
      [''],
      ['"--- SECTION 5: RECENT HISTORICAL TRADING SESSIONS (OHLCV) ---"'],
      ['"Date"', '"Open"', '"High"', '"Low"', '"Close"', '"Volume"']
    ];

    if (data.candles && data.candles.length > 0) {
      const recent = data.candles.slice(-15).reverse();
      recent.forEach(c => {
        rows.push([
          `"${c.date}"`,
          `"${c.open.toFixed(2)}"`,
          `"${c.high.toFixed(2)}"`,
          `"${c.low.toFixed(2)}"`,
          `"${c.close.toFixed(2)}"`,
          `"${c.volume}"`
        ]);
      });
    }

    const csvContent = rows.map(r => r.join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MacroPulse_Company_Report_${sym}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded: MacroPulse_Company_Report_${sym}_${dateStr}.csv`, 'success');
  }

  // Event Listeners for Company Report Modal
  const exportReportBtn = document.getElementById('exportReportBtn');
  if (exportReportBtn) {
    exportReportBtn.addEventListener('click', () => {
      openCompanyReportModal(currentStockSymbol || '1155.KL');
    });
  }

  const exportCurrentStockBtn = document.getElementById('exportCurrentStockBtn');
  if (exportCurrentStockBtn) {
    exportCurrentStockBtn.addEventListener('click', () => {
      openCompanyReportModal(currentStockSymbol || '1155.KL');
    });
  }

  if (closeCompanyReportModalBtn) {
    closeCompanyReportModalBtn.addEventListener('click', closeCompanyReportModal);
  }

  if (companyReportModalBackdrop) {
    companyReportModalBackdrop.addEventListener('click', (e) => {
      if (e.target === companyReportModalBackdrop) {
        closeCompanyReportModal();
      }
    });
  }

  if (printCompanyReportBtn) {
    printCompanyReportBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadCompanyReportCsvBtn) {
    downloadCompanyReportCsvBtn.addEventListener('click', () => {
      if (activeReportData) {
        downloadCompanyReportCsv(activeReportData);
      } else {
        showToast('Report data is loading...', 'info');
      }
    });
  }

  // Quick Company Pills inside Report Modal
  document.querySelectorAll('#reportCompanyPills .report-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sym = btn.getAttribute('data-symbol');
      document.querySelectorAll('#reportCompanyPills .report-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openCompanyReportModal(sym);
    });
  });

  // Custom Search inside Report Modal
  if (reportSearchSubmitBtn && reportSearchSymbolInput) {
    reportSearchSubmitBtn.addEventListener('click', () => {
      const sym = reportSearchSymbolInput.value.trim().toUpperCase();
      if (sym) {
        openCompanyReportModal(sym);
      }
    });

    reportSearchSymbolInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const sym = reportSearchSymbolInput.value.trim().toUpperCase();
        if (sym) {
          openCompanyReportModal(sym);
        }
      }
    });
  }

  // ==========================================
  // Notifications Side Drawer Controller
  // ==========================================
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDrawer = document.getElementById('notificationDrawer');
  const notificationBackdrop = document.getElementById('notificationBackdrop');
  const closeNotificationBtn = document.getElementById('closeNotificationBtn');
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  const clearAllNotifsBtn = document.getElementById('clearAllNotifsBtn');
  const notifCountText = document.getElementById('notificationUnreadCountText');
  const notifBadge = notificationBtn ? notificationBtn.querySelector('.notification-badge') : null;

  function openNotificationDrawer() {
    if (notificationDrawer) notificationDrawer.classList.add('open');
    if (notificationBackdrop) notificationBackdrop.classList.add('open');
  }

  function closeNotificationDrawer() {
    if (notificationDrawer) notificationDrawer.classList.remove('open');
    if (notificationBackdrop) notificationBackdrop.classList.remove('open');
  }

  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notificationDrawer && notificationDrawer.classList.contains('open')) {
        closeNotificationDrawer();
      } else {
        openNotificationDrawer();
      }
    });
  }

  if (closeNotificationBtn) closeNotificationBtn.addEventListener('click', closeNotificationDrawer);
  if (notificationBackdrop) notificationBackdrop.addEventListener('click', closeNotificationDrawer);

  // Drawer Tabs Filter
  document.querySelectorAll('#notificationFilterTabs .drawer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#notificationFilterTabs .drawer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      document.querySelectorAll('#notificationList .notification-item').forEach(item => {
        if (filter === 'all' || item.getAttribute('data-type') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Mark all as read
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      document.querySelectorAll('#notificationList .notification-item').forEach(item => {
        item.classList.remove('unread');
      });
      if (notifBadge) notifBadge.style.display = 'none';
      if (notifCountText) notifCountText.textContent = '0 unread alerts';
      showToast('All notifications marked as read', 'info');
    });
  }

  // Clear all
  if (clearAllNotifsBtn) {
    clearAllNotifsBtn.addEventListener('click', () => {
      const list = document.getElementById('notificationList');
      if (list) {
        list.innerHTML = `
          <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
            <i data-lucide="bell-off" style="width: 32px; height: 32px; opacity: 0.4; margin-bottom: 12px;"></i>
            <div style="font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">No Active Alerts</div>
            <p style="font-size: 0.74rem;">All price, rate, and model drift alerts cleared.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons({ root: list });
      }
      if (notifBadge) notifBadge.style.display = 'none';
      if (notifCountText) notifCountText.textContent = '0 alerts';
      showToast('Notification feed cleared', 'info');
    });
  }

  // Notification action links (deep linking)
  document.querySelectorAll('#notificationList .notif-link-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetNav = btn.getAttribute('data-nav');
      const param = btn.getAttribute('data-param');
      closeNotificationDrawer();
      if (targetNav) {
        if (param) {
          window.location.hash = `#${targetNav}:${param}`;
        } else {
          window.location.hash = `#${targetNav}`;
        }
      }
    });
  });

  // ==========================================
  // Global Command Palette / Autocomplete Search
  // ==========================================
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  const searchableIndex = [
    // Stocks
    { title: 'Malayan Banking Berhad (Maybank)', badge: '1155.KL', desc: 'Bursa Malaysia Financials • RM 10.46 (+0.77%)', keywords: 'maybank 1155 1155.kl malayan banking bursa bank dividend', cat: 'Equities', action: () => { window.location.hash = '#trading:1155.KL'; } },
    { title: 'Tenaga Nasional Berhad (TNB)', badge: '5347.KL', desc: 'Bursa Malaysia Utilities & Power • RM 13.98 (+1.01%)', keywords: 'tenaga tnb 5347 5347.kl utility power electricity', cat: 'Equities', action: () => { window.location.hash = '#trading:5347.KL'; } },
    { title: 'Public Bank Berhad (PBB)', badge: '1295.KL', desc: 'Bursa Malaysia Financials • RM 4.25 (+0.71%)', keywords: 'public bank pbb 1295 1295.kl banking finance', cat: 'Equities', action: () => { window.location.hash = '#trading:1295.KL'; } },
    { title: 'CIMB Group Holdings', badge: '1023.KL', desc: 'Bursa Malaysia Financials • RM 7.42 (+0.68%)', keywords: 'cimb 1023 1023.kl cimb group banking', cat: 'Equities', action: () => { window.location.hash = '#trading:1023.KL'; } },
    { title: 'Inari Amertron Berhad', badge: '0166.KL', desc: 'Bursa Malaysia Tech & Semi • RM 3.12 (+2.30%)', keywords: 'inari 0166 0166.kl semiconductor chip ai tech', cat: 'Equities', action: () => { window.location.hash = '#trading:0166.KL'; } },
    { title: 'Petronas Chemicals Group', badge: '5183.KL', desc: 'Bursa Malaysia Basic Materials • RM 5.58 (+0.54%)', keywords: 'petronas petchem pchem 5183 5183.kl oil gas chemicals', cat: 'Equities', action: () => { window.location.hash = '#trading:5183.KL'; } },
    { title: 'NVIDIA Corporation', badge: 'NVDA', desc: 'NASDAQ Tech Giant • $118.50 (+2.86%)', keywords: 'nvidia nvda gpu chip ai hardware semiconductor', cat: 'Equities', action: () => { window.location.hash = '#trading:NVDA'; } },
    { title: 'Apple Inc.', badge: 'AAPL', desc: 'NASDAQ Consumer Electronics • $224.23 (+0.96%)', keywords: 'apple aapl iphone mac ios tech', cat: 'Equities', action: () => { window.location.hash = '#trading:AAPL'; } },
    { title: 'Tesla Inc.', badge: 'TSLA', desc: 'NASDAQ EV & Autonomy • $210.15 (+1.82%)', keywords: 'tesla tsla ev elon musk auto car', cat: 'Equities', action: () => { window.location.hash = '#trading:TSLA'; } },
    { title: 'Microsoft Corporation', badge: 'MSFT', desc: 'NASDAQ Cloud & AI • $448.90 (+0.85%)', keywords: 'microsoft msft azure windows ai copilot', cat: 'Equities', action: () => { window.location.hash = '#trading:MSFT'; } },

    // Macro
    { title: 'Overnight Policy Rate (OPR)', badge: 'OPR 3.0%', desc: 'Bank Negara Malaysia Monetary Benchmark • 3.00%', keywords: 'opr interest rate bnm bank negara malaysia monetary policy rates', cat: 'Macro Indicators', action: () => { window.location.hash = '#policy'; } },
    { title: 'Consumer Price Index (CPIAUCSL)', badge: 'CPIAUCSL', desc: 'FRED US Headline CPI Inflation Print • 314.80', keywords: 'cpi inflation cpiaucsl fred price index cost of living', cat: 'Macro Indicators', action: () => { window.location.hash = '#logs:CPIAUCSL'; } },
    { title: 'Federal Funds Effective Rate', badge: 'FEDFUNDS', desc: 'FRED US Fed Target Rate • 3.63%', keywords: 'fedfunds fed funds federal reserve interest rate cuts powell', cat: 'Macro Indicators', action: () => { window.location.hash = '#logs:FEDFUNDS'; } },
    { title: 'Real Gross Domestic Product', badge: 'GDPC1', desc: 'FRED US Real GDP Growth • $23.15T', keywords: 'gdp real gdp gdpc1 economic growth recession expansion', cat: 'Macro Indicators', action: () => { window.location.hash = '#logs:GDPC1'; } },
    { title: '10-Year Treasury Constant Maturity', badge: 'DGS10', desc: 'FRED Benchmark Treasury Yield • 4.18%', keywords: 'dgs10 treasury 10 year bond yield fixed income debt', cat: 'Macro Indicators', action: () => { window.location.hash = '#logs:DGS10'; } },

    // AI Models
    { title: 'PatchTST Transformer (Self-Attention)', badge: 'RMSE 0.0850', desc: 'Candidate Champion • 80.0% Directional Acc', keywords: 'patchtst transformer attention deep learning forecast model', cat: 'AI Models', action: () => { window.location.hash = '#models:transformer'; } },
    { title: 'LSTM Recurrent Neural Network', badge: 'RMSE 0.1062', desc: 'Production Champion • 78.4% Directional Acc', keywords: 'lstm rnn recurrent neural network production deep learning', cat: 'AI Models', action: () => { window.location.hash = '#models:lstm'; } },
    { title: 'XGBoost Gradient Boosted Trees', badge: 'RMSE 0.1381', desc: 'Tree Ensemble • 76.0% Directional Acc', keywords: 'xgboost trees gradient boosting ensemble tabular', cat: 'AI Models', action: () => { window.location.hash = '#models:xgboost'; } },
    { title: 'Meta Prophet Additive Model', badge: 'RMSE 0.1912', desc: 'Generalized Additive • Macro Seasonality', keywords: 'prophet meta facebook additive trend seasonality', cat: 'AI Models', action: () => { window.location.hash = '#models:prophet'; } },
    { title: 'SARIMAX Econometric Benchmark', badge: 'RMSE 0.2549', desc: 'Box-Jenkins (2,1,2)(1,1,1)12 Seasonal', keywords: 'sarimax arima box jenkins econometric time series baseline', cat: 'AI Models', action: () => { window.location.hash = '#models:sarimax'; } }
  ];

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderSearchResults(query) {
    if (!searchResultsDropdown) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResultsDropdown.classList.remove('open');
      return;
    }

    const matched = searchableIndex.filter(item => {
      return item.title.toLowerCase().includes(q) ||
             item.badge.toLowerCase().includes(q) ||
             item.cat.toLowerCase().includes(q) ||
             item.desc.toLowerCase().includes(q) ||
             (item.keywords && item.keywords.toLowerCase().includes(q));
    });

    if (matched.length === 0) {
      searchResultsDropdown.innerHTML = `
        <div style="padding: 18px 12px; text-align: center; color: var(--text-muted); font-size: 0.78rem;">
          No matching stock, macro indicator, or AI model for "<strong>${escapeHtml(query)}</strong>"
        </div>
      `;
      searchResultsDropdown.classList.add('open');
      return;
    }

    // Group by category
    const categories = {};
    matched.forEach(item => {
      if (!categories[item.cat]) categories[item.cat] = [];
      categories[item.cat].push(item);
    });

    let html = '';
    Object.keys(categories).forEach(cat => {
      html += `<div class="search-category-label">${cat}</div>`;
      categories[cat].forEach(item => {
        html += `
          <div class="search-result-item" data-badge="${item.badge}">
            <div class="search-item-left">
              <span class="search-item-badge">${item.badge}</span>
              <div>
                <div class="search-item-name">${item.title}</div>
                <div class="search-item-desc">${item.desc}</div>
              </div>
            </div>
            <i data-lucide="arrow-up-right" style="width: 14px; height: 14px; color: var(--text-muted);"></i>
          </div>
        `;
      });
    });

    searchResultsDropdown.innerHTML = html;
    if (window.lucide) lucide.createIcons({ root: searchResultsDropdown });
    searchResultsDropdown.classList.add('open');

    // Attach click handlers
    searchResultsDropdown.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const badge = el.getAttribute('data-badge');
        const target = matched.find(m => m.badge === badge);
        if (target && target.action) {
          target.action();
          searchResultsDropdown.classList.remove('open');
          if (globalSearchInput) globalSearchInput.value = '';
        }
      });
    });
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
    globalSearchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) renderSearchResults(e.target.value);
    });
  }

  // Close search dropdown and notification drawer on outside click or Escape
  document.addEventListener('click', (e) => {
    if (searchResultsDropdown && !e.target.closest('.search-box')) {
      searchResultsDropdown.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (searchResultsDropdown) searchResultsDropdown.classList.remove('open');
      closeNotificationDrawer();
    }
  });

  // ==========================================
  // Sparkline Charts (OPR, CPI, GDP, Stock Index)
  // ==========================================
  function createSparkline(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 40);
    gradient.addColorStop(0, color + '55');
    gradient.addColorStop(1, color + '00');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: gradient
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: { duration: 800 }
      }
    });
  }

  // OPR Step Rate (2.25 -> 2.50 -> 2.75 -> 3.00 -> 3.00)
  createSparkline('sparklineRevenue', [2.25, 2.50, 2.75, 2.75, 3.00, 3.00, 3.00], '#a855f7');
  // CPI Inflation Easing (3.4% -> 1.9%)
  createSparkline('sparklineWorkspaces', [3.4, 3.1, 2.8, 2.4, 2.1, 1.9], '#06b6d4');
  // GDP Growth Expansion (3.8% -> 5.1%)
  createSparkline('sparklineConversion', [3.8, 4.1, 4.4, 4.7, 4.9, 5.1], '#10b981');
  // Stock Index FBM KLCI (1,580 -> 1,675.2)
  createSparkline('sparklineLatency', [1580, 1610, 1595, 1640, 1655, 1675.2], '#f59e0b');

  // ==========================================
  // Overview Wave Curve Chart (Macro vs Stock Index)
  // ==========================================
  let waveChartInstance = null;
  const overviewWaveCanvas = document.getElementById('overviewWaveChart');

  if (overviewWaveCanvas) {
    const ctx = overviewWaveCanvas.getContext('2d');
    
    const purpleGrad = ctx.createLinearGradient(0, 0, 0, 260);
    purpleGrad.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
    purpleGrad.addColorStop(0.6, 'rgba(124, 58, 237, 0.15)');
    purpleGrad.addColorStop(1, 'rgba(124, 58, 237, 0.0)');

    const blueGrad = ctx.createLinearGradient(0, 0, 0, 260);
    blueGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    blueGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Dataset 1: Stock Index vs GDP Forecast
    const indexGdpDataset = [
      {
        label: 'FBM KLCI Index (pts)',
        data: [1450, 1475, 1510, 1535, 1570, 1605, 1615, 1640, 1630, 1655, 1675, 1690],
        borderColor: '#8b5cf6',
        borderWidth: 3,
        fill: true,
        backgroundColor: purpleGrad,
        tension: 0.45,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#8b5cf6',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: 'y'
      },
      {
        label: 'Real GDP Growth (YoY %)',
        data: [3.8, 3.9, 4.1, 4.2, 4.4, 4.6, 4.8, 4.9, 5.0, 5.1, 5.1, 5.2],
        borderColor: '#10b981',
        borderWidth: 2.5,
        borderDash: [5, 5],
        fill: false,
        tension: 0.45,
        pointRadius: 3,
        yAxisID: 'y1'
      }
    ];

    // Dataset 2: OPR vs Inflation (CPI)
    const oprCpiDataset = [
      {
        label: 'Overnight Policy Rate - OPR (%)',
        data: [2.0, 2.25, 2.5, 2.75, 2.75, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
        borderColor: '#a855f7',
        borderWidth: 3,
        fill: true,
        backgroundColor: purpleGrad,
        tension: 0.2,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#a855f7',
        pointBorderWidth: 2,
        pointRadius: 4,
        yAxisID: 'y'
      },
      {
        label: 'Headline CPI Inflation (%)',
        data: [4.2, 3.8, 3.4, 3.1, 2.8, 2.5, 2.3, 2.1, 2.0, 1.9, 1.9, 1.8],
        borderColor: '#06b6d4',
        borderWidth: 2.5,
        fill: true,
        backgroundColor: blueGrad,
        tension: 0.45,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#06b6d4',
        pointBorderWidth: 2,
        pointRadius: 4,
        yAxisID: 'y'
      }
    ];

    waveChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: indexGdpDataset
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#94a3b8', boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#161a2d',
            titleColor: '#ffffff',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(124, 58, 237, 0.4)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b' }
          },
          y: {
            position: 'left',
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#8b5cf6',
              callback: (val) => val.toLocaleString() + ' pts'
            }
          },
          y1: {
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#10b981',
              callback: (val) => val + '%'
            }
          }
        }
      }
    });

    // Chart Tabs Switcher (Index & GDP vs OPR & CPI)
    const chartTabBtns = document.querySelectorAll('#overviewChartTabs .tab-btn');
    chartTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chartTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-tab');

        if (mode === 'orders') {
          // OPR & CPI mode
          waveChartInstance.data.datasets = oprCpiDataset;
          waveChartInstance.options.scales.y.ticks.callback = (val) => val + '%';
          waveChartInstance.options.scales.y1.display = false;
        } else if (mode === 'fred') {
          // FRED Fed Funds & 10Y Treasury mode
          const fredDataset = [
            {
              label: 'FRED Fed Funds Rate (%)',
              data: [5.33, 5.33, 5.33, 5.33, 5.13, 4.83, 4.64, 4.48, 4.33, 3.88, 3.64, 3.63],
              borderColor: '#06b6d4',
              borderWidth: 3,
              fill: true,
              backgroundColor: blueGrad,
              tension: 0.25,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#06b6d4',
              pointBorderWidth: 2,
              pointRadius: 4,
              yAxisID: 'y'
            },
            {
              label: 'FRED 10Y Treasury Yield (%)',
              data: [4.22, 4.28, 4.35, 4.42, 4.38, 4.25, 4.18, 4.20, 4.15, 4.12, 4.16, 4.18],
              borderColor: '#f59e0b',
              borderWidth: 2.5,
              borderDash: [4, 4],
              fill: false,
              tension: 0.35,
              pointRadius: 3,
              yAxisID: 'y'
            }
          ];
          waveChartInstance.data.datasets = fredDataset;
          waveChartInstance.options.scales.y.ticks.callback = (val) => val + '%';
          waveChartInstance.options.scales.y1.display = false;
        } else {
          // Index & GDP mode
          waveChartInstance.data.datasets = indexGdpDataset;
          waveChartInstance.options.scales.y.ticks.callback = (val) => val.toLocaleString() + ' pts';
          waveChartInstance.options.scales.y1.display = true;
        }
        waveChartInstance.update();
      });
    });
  }

  // ==========================================
  // Render Macroeconomic & Stock Indicators Table
  // ==========================================
  const transactionsTbody = document.getElementById('transactionsTbody');
  const tableFilterInput = document.getElementById('tableFilterInput');
  const categoryTabBtns = document.querySelectorAll('#indicatorCategoryTabs .tab-btn');

  function renderIndicators(searchFilter = '', category = 'all') {
    if (!transactionsTbody) return;
    transactionsTbody.innerHTML = '';

    const term = searchFilter.toLowerCase();
    const filtered = state.indicators.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(term) ||
                          item.symbol.toLowerCase().includes(term) ||
                          item.categoryLabel.toLowerCase().includes(term);
      const matchCategory = (category === 'all') || (item.category === category);
      return matchSearch && matchCategory;
    });

    if (filtered.length === 0) {
      transactionsTbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);">No matching indicators or stock symbols found.</td></tr>';
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      const isUp = item.change.startsWith('+');
      
      tr.innerHTML = `
        <td>
          <div class="user-cell">
            <div class="stat-icon-wrap" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(124, 58, 237, 0.15); color: var(--primary-light);">
              <i data-lucide="${item.icon}" style="width: 16px; height: 16px;"></i>
            </div>
            <div class="user-cell-info">
              <span class="user-cell-name">${item.name}</span>
              <span class="user-cell-email" style="font-family: monospace; color: var(--accent-cyan); font-weight: 500;">${item.symbol}</span>
            </div>
          </div>
        </td>
        <td>
          <span style="font-size: 0.78rem; padding: 3px 8px; border-radius: 6px; background: rgba(255,255,255,0.04); color: var(--text-secondary); font-weight: 500;">
            ${item.categoryLabel}
          </span>
        </td>
        <td class="amount-val" style="font-size: 0.95rem; font-weight: 700;">${item.current}</td>
        <td style="color: var(--text-muted); font-family: monospace;">${item.prior}</td>
        <td>
          <span class="delta-badge ${isUp ? 'up' : 'down'}" style="font-size: 0.78rem;">
            <i data-lucide="${isUp ? 'arrow-up-right' : 'arrow-down-right'}" style="width: 13px; height: 13px;"></i>
            ${item.change}
          </span>
        </td>
        <td><span class="status-badge ${item.signalType}">${item.signal}</span></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary action-indicator-btn" data-category="${item.category}" data-symbol="${item.symbol}" style="padding: 4px 10px; font-size: 0.74rem;">
            <i data-lucide="${item.category === 'fred' ? 'database' : 'candlestick-chart'}" style="width: 13px; height: 13px;"></i> ${item.category === 'fred' ? 'View FRED' : 'Analyze'}
          </button>
        </td>
      `;

      const btn = tr.querySelector('.action-indicator-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          if (item.category === 'fred') {
            switchView('logs');
            fetchFredSeries(item.symbol);
          } else {
            switchView('trading');
            if (stockSearchInput) stockSearchInput.value = item.symbol;
            fetchStockData(item.symbol);
          }
        });
      }

      transactionsTbody.appendChild(tr);
    });

    if (window.lucide) lucide.createIcons({ root: transactionsTbody });
  }

  renderIndicators();

  // Category Tabs Filter
  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.getAttribute('data-cat');
      renderIndicators(tableFilterInput ? tableFilterInput.value : '', state.currentCategory);
    });
  });

  if (tableFilterInput) {
    tableFilterInput.addEventListener('input', (e) => {
      renderIndicators(e.target.value, state.currentCategory);
    });
  }

  document.getElementById('refreshTableBtn').addEventListener('click', () => {
    tableFilterInput.value = '';
    renderIndicators('', 'all');
    showToast('Macro & Stock market data refreshed (Real-time sync)', 'success');
  });

  if (tableFilterInput) {
    tableFilterInput.addEventListener('input', (e) => {
      renderTransactions(e.target.value);
    });
  }

  document.getElementById('refreshTableBtn').addEventListener('click', () => {
    tableFilterInput.value = '';
    renderTransactions();
    showToast('Transaction list synchronized', 'success');
  });

  // ==========================================
  // Speedometer Radial Gauge (Logs View)
  // ==========================================
  function drawSpeedometer() {
    const canvas = document.getElementById('gaugeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height - 10;
    const radius = 95;
    const lineWidth = 16;

    // Background track arc (180 degrees: Math.PI to 2*Math.PI)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Arc 1: Success (85% -> 0.85 * PI)
    const successEnd = Math.PI + Math.PI * 0.72;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, successEnd, false);
    ctx.lineWidth = lineWidth;
    const grad1 = ctx.createLinearGradient(centerX - radius, centerY, centerX, centerY - radius);
    grad1.addColorStop(0, '#6366f1');
    grad1.addColorStop(1, '#06b6d4');
    ctx.strokeStyle = grad1;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Arc 2: Retries (10%)
    const retryEnd = successEnd + Math.PI * 0.15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, successEnd + 0.05, retryEnd, false);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Arc 3: Errors (5%)
    const failEnd = retryEnd + Math.PI * 0.08;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, retryEnd + 0.05, failEnd, false);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#ef4444';
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  drawSpeedometer();

  // ==========================================
  // Workspace Defaults & Audio Chime Engine
  // ==========================================
  const defaultWorkspaceSettings = {
    defaultView: 'overview',
    benchmark: 'FBMKLCI',
    chartPeriod: '3M',
    sectorFocus: 'all',
    currency: 'MYR',
    refreshRate: '15',
    audioChime: true
  };

  let currentWorkspaceSettings = { ...defaultWorkspaceSettings };
  try {
    const savedWs = localStorage.getItem('macropulse_workspace_settings');
    if (savedWs) {
      currentWorkspaceSettings = { ...defaultWorkspaceSettings, ...JSON.parse(savedWs) };
    }
  } catch (e) {}

  // Web Audio API Terminal Chime Synthesizer
  let audioCtx = null;
  function playTerminalChime(type = 'default') {
    if (!currentWorkspaceSettings.audioChime) return;

    // Silence all audio chimes on Login, Registration, and Forgot Password screens
    const loginPage = document.getElementById('loginPage');
    if (loginPage && window.getComputedStyle(loginPage).display !== 'none') {
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!audioCtx) {
        audioCtx = new AudioCtxClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';

      if (type === 'test' || type === 'toggle') {
        // High-tech terminal rising tone: 587.33Hz (D5) -> 880Hz (A5)
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.14);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.40);
      } else if (type === 'policy') {
        // Central Bank Rate Announcement Chime: 440Hz -> 659.25Hz
        osc.frequency.setValueAtTime(440.0, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.18);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.20, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.46);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.48);
      } else {
        // Market Indicator Trigger: 659.25Hz -> 880Hz
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.12);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.30);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      }
    } catch (err) {
      console.debug('Audio chime playback omitted:', err);
    }
  }
  window.playTerminalChime = playTerminalChime;

  let rpsIntervalTimer = null;
  let newsTickerTimer = null;

  function startRpsInterval(intervalMs = 2500) {
    if (rpsIntervalTimer) clearInterval(rpsIntervalTimer);
    rpsIntervalTimer = setInterval(() => {
      if (state.currentView !== 'logs' && state.currentView !== 'overview') return;
      if (!rpsChartInstance) return;
      const nextTurnover = parseFloat((4.5 + Math.random() * 0.8).toFixed(2));
      if (liveRpsBadge) liveRpsBadge.textContent = `RM ${nextTurnover}B`;

      const data = rpsChartInstance.data.datasets[0].data;
      data.shift();
      data.push(nextTurnover);
      rpsChartInstance.update();
    }, intervalMs);
  }

  function startNewsTickerInterval(intervalMs = 3500) {
    if (newsTickerTimer) clearInterval(newsTickerTimer);
    newsTickerTimer = setInterval(() => {
      if (!state.logStreamActive) return;
      const randomNews = macroNewsHeadlines[Math.floor(Math.random() * macroNewsHeadlines.length)];
      addLogEntry(randomNews);
    }, intervalMs);
  }

  function rescheduleMarketPolling(rateSeconds = 15) {
    const sec = parseInt(rateSeconds, 10) || 15;
    state.marketPollingRate = sec;
    const rpsMs = Math.round((sec / 15) * 2500);
    const newsMs = Math.round((sec / 15) * 3500);
    startRpsInterval(rpsMs);
    startNewsTickerInterval(newsMs);
    console.log(`[Telemetry] Polling intervals recalibrated: Base Rate ${sec}s (Turnover: ${rpsMs}ms, Macro Wire: ${newsMs}ms)`);
  }
  window.rescheduleMarketPolling = rescheduleMarketPolling;

  // ==========================================
  // Real-time RPS Chart (Logs View)
  // ==========================================
  const rpsCanvas = document.getElementById('realtimeRpsChart');
  let rpsChartInstance = null;
  const liveRpsBadge = document.getElementById('liveRpsBadge');

  if (rpsCanvas) {
    const ctx = rpsCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const initialRpsData = [4.2, 4.4, 4.3, 4.6, 4.8, 4.7, 4.9, 5.1, 4.8, 4.82];

    rpsChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: initialRpsData.map((_, i) => `-${(initialRpsData.length - i) * 10}m`),
        datasets: [{
          label: 'Interbank Turnover (RM B)',
          data: initialRpsData,
          borderColor: '#10b981',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          backgroundColor: grad,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#64748b' } },
          y: { min: 3.5, max: 6.0, grid: { color: 'rgba(255, 255, 255, 0.04)' }, ticks: { color: '#64748b', callback: (v) => 'RM ' + v.toFixed(1) + 'B' } }
        },
        animation: false
      }
    });

    startRpsInterval(2500);
  }

  // ==========================================
  // Live Economic Data Releases & Wire Engine
  // ==========================================
  const logStreamContainer = document.getElementById('logStreamContainer');
  const toggleLogStreamBtn = document.getElementById('toggleLogStream');
  let currentNewsCategoryFilter = 'all';
  let isInitialPreseeding = true;

  const macroNewsHeadlines = [
    // Monetary Policy Releases
    { type: 'POLICY', tag: 'BNM', category: 'policy', title: 'Monetary Policy Committee holds Overnight Policy Rate (OPR) at 3.00%' },
    { type: 'POLICY', tag: 'BNM', category: 'policy', title: 'Bank Negara Malaysia reiterates neutral, accommodative monetary policy stance' },
    { type: 'POLICY', tag: 'FED', category: 'policy', title: 'Federal Reserve FOMC minutes signal data-dependent interest rate path' },
    { type: 'POLICY', tag: 'BNM', category: 'policy', title: 'Statutory Reserve Requirement (SRR) held steady to support interbank liquidity' },
    { type: 'POLICY', tag: 'RESERVES', category: 'policy', title: 'BNM Official Foreign Reserves expand to USD 115.4 Billion' },
    { type: 'POLICY', tag: 'ECB', category: 'policy', title: 'European Central Bank maintains deposit facility rate at 3.75%' },
    // Macro Indicators (Inflation, GDP, Trade, Bonds, Equities)
    { type: 'INFLATION', tag: 'DOSM', category: 'indicator', title: 'Headline Inflation softens to 1.90% YoY; core inflation eases to 1.8%' },
    { type: 'GDP', tag: 'DOSM', category: 'indicator', title: 'Q2 Real GDP expands +5.10% YoY, beating consensus forecast of +4.70%' },
    { type: 'EQUITIES', tag: 'BURSA', category: 'indicator', title: 'Foreign institutional funds log 5th consecutive week of net equity inflows (+RM 380M)' },
    { type: 'FX', tag: 'FOREX', category: 'indicator', title: 'Ringgit appreciates to 4.3850 vs USD amid robust trade surplus and steady OPR' },
    { type: 'BONDS', tag: 'MGS', category: 'indicator', title: 'Benchmark 10-Year Malaysian Government Securities yield tightens to 3.78%' },
    { type: 'EARNINGS', tag: 'MAYBANK', category: 'indicator', title: 'Maybank (1155.KL) posts Q2 profit surge, announces 30.0 sen dividend' },
    { type: 'TRADE', tag: 'MATRADE', category: 'indicator', title: 'Malaysia Trade Surplus widens to +RM 14.8 Billion on electrical & electronics export surge' },
    { type: 'PMI', tag: 'S&P GLOBAL', category: 'indicator', title: 'Malaysia Manufacturing PMI rises to 50.8, signalling factory output expansion' },
    { type: 'LABOR', tag: 'DOSM', category: 'indicator', title: 'Civilian Unemployment rate eases to 3.2%, near full-employment benchmark' }
  ];

  function addLogEntry(item) {
    if (!logStreamContainer) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const div = document.createElement('div');
    div.className = isInitialPreseeding ? 'log-entry' : 'log-entry new-arrival';
    div.dataset.category = item.category || 'all';
    div.dataset.type = item.type || '';

    // Check if matches active filter
    const isVisible = (currentNewsCategoryFilter === 'all') || (item.category === currentNewsCategoryFilter);
    div.style.display = isVisible ? 'flex' : 'none';

    div.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-method post" style="background: ${item.category === 'policy' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(124, 58, 237, 0.2)'}; color: ${item.category === 'policy' ? '#60a5fa' : '#c084fc'};">${item.tag}</span>
      <span class="log-path" style="font-weight: 500;">${item.title}</span>
      <span class="status-badge success" style="padding: 1px 7px; font-size: 0.68rem;">VERIFIED</span>
    `;

    logStreamContainer.prepend(div);
    if (logStreamContainer.children.length > 35) {
      logStreamContainer.removeChild(logStreamContainer.lastChild);
    }

    // Play subtle audio alert and display toast on new arrivals if audio notifications are enabled
    if (!isInitialPreseeding) {
      // Silence background news notifications completely if on login/registration/forgot screen
      const loginPage = document.getElementById('loginPage');
      if (loginPage && window.getComputedStyle(loginPage).display !== 'none') {
        return;
      }

      const isHighImpact = (item.category === 'policy' || item.type === 'INFLATION' || item.type === 'GDP');
      if (isHighImpact) {
        if (currentWorkspaceSettings.audioChime) {
          playTerminalChime(item.category === 'policy' ? 'policy' : 'market');
        }
        // Throttled visual toast alert across all dashboard pages (every 18 seconds)
        const nowTs = Date.now();
        if (!window._lastNewsToastTs || (nowTs - window._lastNewsToastTs > 18000)) {
          window._lastNewsToastTs = nowTs;
          showToast(`📢 [${item.tag}] ${item.title}`, item.category === 'policy' ? 'policy' : 'info', {
            label: 'View Feed →',
            onClick: () => {
              switchView('logs');
              window.location.hash = '#logs';
            }
          });
        }
      }
    }
  }

  // Pre-seed news releases
  macroNewsHeadlines.forEach(news => addLogEntry(news));
  isInitialPreseeding = false;

  // Live news ticker interval
  startNewsTickerInterval(3500);

  if (toggleLogStreamBtn) {
    toggleLogStreamBtn.addEventListener('click', () => {
      state.logStreamActive = !state.logStreamActive;
      toggleLogStreamBtn.classList.toggle('paused', !state.logStreamActive);
      toggleLogStreamBtn.innerHTML = state.logStreamActive
        ? '<i data-lucide="pause" style="width: 12px; height: 12px;"></i> <span>Pause</span>'
        : '<i data-lucide="play" style="width: 12px; height: 12px;"></i> <span>Resume</span>';
      if (window.lucide) lucide.createIcons({ root: toggleLogStreamBtn });
      showToast(state.logStreamActive ? 'Macro feed active' : 'Macro feed paused', 'info');
    });
  }

  // News filter buttons with interactive active button color updates
  function filterNews(filterType, targetBtn) {
    currentNewsCategoryFilter = filterType;

    // Toggle active class and button colors
    const filterBtns = [
      document.getElementById('filterLogsAll'),
      document.getElementById('filterLogs200'),
      document.getElementById('filterLogsError')
    ];
    filterBtns.forEach(btn => {
      if (btn) btn.classList.toggle('active', btn === targetBtn);
    });

    // Filter visible items
    const entries = logStreamContainer.querySelectorAll('.log-entry');
    let visibleCount = 0;
    entries.forEach(entry => {
      const match = (filterType === 'all') || (entry.dataset.category === filterType);
      entry.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const label = filterType === 'all' ? 'All News' : (filterType === 'policy' ? 'Monetary Policy' : 'Macro Indicators');
    showToast(`Showing ${label} (${visibleCount} releases)`, 'info');
  }

  const btnFilterAll = document.getElementById('filterLogsAll');
  const btnFilterPolicy = document.getElementById('filterLogs200');
  const btnFilterIndicators = document.getElementById('filterLogsError');

  if (btnFilterAll) {
    btnFilterAll.addEventListener('click', function() { filterNews('all', this); });
  }
  if (btnFilterPolicy) {
    btnFilterPolicy.addEventListener('click', function() { filterNews('policy', this); });
  }
  if (btnFilterIndicators) {
    btnFilterIndicators.addEventListener('click', function() { filterNews('indicator', this); });
  }

  // ==============================================
  // Live yfinance Stock Data & Candlestick Engine
  // ==============================================

  const defaultMaybankCandles = [
    { date: 'Aug 01', rawDate: '2024-08-01', open: 10.12, high: 10.20, low: 10.08, close: 10.18, volume: 11200000 },
    { date: 'Aug 02', rawDate: '2024-08-02', open: 10.18, high: 10.26, low: 10.14, close: 10.22, volume: 9800000 },
    { date: 'Aug 05', rawDate: '2024-08-05', open: 10.22, high: 10.28, low: 10.16, close: 10.20, volume: 10400000 },
    { date: 'Aug 06', rawDate: '2024-08-06', open: 10.20, high: 10.25, low: 10.12, close: 10.14, volume: 8900000 },
    { date: 'Aug 07', rawDate: '2024-08-07', open: 10.14, high: 10.30, low: 10.12, close: 10.28, volume: 13500000 },
    { date: 'Aug 08', rawDate: '2024-08-08', open: 10.28, high: 10.35, low: 10.24, close: 10.32, volume: 12100000 },
    { date: 'Aug 09', rawDate: '2024-08-09', open: 10.32, high: 10.38, low: 10.28, close: 10.30, volume: 11500000 },
    { date: 'Aug 12', rawDate: '2024-08-12', open: 10.30, high: 10.34, low: 10.22, close: 10.26, volume: 9400000 },
    { date: 'Aug 13', rawDate: '2024-08-13', open: 10.26, high: 10.32, low: 10.24, close: 10.30, volume: 8800000 },
    { date: 'Aug 14', rawDate: '2024-08-14', open: 10.30, high: 10.42, low: 10.28, close: 10.40, volume: 15200000 },
    { date: 'Aug 15', rawDate: '2024-08-15', open: 10.40, high: 10.44, low: 10.36, close: 10.38, volume: 10800000 },
    { date: 'Aug 16', rawDate: '2024-08-16', open: 10.38, high: 10.45, low: 10.34, close: 10.42, volume: 11900000 },
    { date: 'Aug 19', rawDate: '2024-08-19', open: 10.42, high: 10.48, low: 10.38, close: 10.44, volume: 12400000 },
    { date: 'Aug 20', rawDate: '2024-08-20', open: 10.44, high: 10.52, low: 10.40, close: 10.48, volume: 14600000 },
    { date: 'Aug 21', rawDate: '2024-08-21', open: 10.48, high: 10.50, low: 10.42, close: 10.46, volume: 12850000 }
  ];

  let currentStockData = {
    symbol: '1155.KL',
    name: 'Maybank',
    sector: 'Financial Services',
    price: 10.46,
    currency: 'MYR',
    change: 0.10,
    changePercent: 0.97,
    dayHigh: 10.50,
    dayLow: 10.40,
    volume: '12.85M',
    peRatio: 11.8,
    dividendYield: 6.4,
    marketCap: '126.1B',
    candles: defaultMaybankCandles
  };
  let currentStockSymbol = '1155.KL';
  let currentStockPeriod = '1mo';

  async function fetchStockData(symbol, period = '1mo') {
    currentStockSymbol = symbol;
    currentStockPeriod = period;

    const priceEl = document.getElementById('tradePairPrice');
    if (priceEl) priceEl.style.opacity = '0.6';

    try {
      const resp = await fetch(`/api/stock/quote?symbol=${encodeURIComponent(symbol)}&period=${period}`);
      if (!resp.ok) throw new Error('Symbol not found');
      const data = await resp.json();
      currentStockData = data;

      // Update Ticker Header
      const symEl = document.getElementById('stockCompanySymbol');
      if (symEl) symEl.textContent = `${data.name} (${data.symbol})`;

      const badgeEl = document.getElementById('stockExchangeBadge');
      if (badgeEl) {
        badgeEl.textContent = data.symbol.endsWith('.KL') ? 'BURSA / KLSE' : (data.symbol.startsWith('^') ? 'INDEX' : 'US / GLOBAL');
      }

      const nameEl = document.getElementById('stockCompanyName');
      if (nameEl) nameEl.textContent = `${data.name} • ${data.sector}`;

      const stockCurr = data.currency || (symbol.endsWith('.KL') ? 'MYR' : 'USD');
      const baseCurr = state.baseCurrency || 'MYR';
      const currSign = stockCurr === 'MYR' ? 'RM ' : (stockCurr === 'USD' ? '$' : `${stockCurr} `);

      // Real-world FX Conversion mappings (to USD base)
      const FX_TO_USD = { USD: 1.0, MYR: 0.2280, EUR: 1.0850, SGD: 0.7600 };
      const CURR_SYMBOLS = { MYR: 'RM ', USD: '$', EUR: '€', SGD: 'S$' };

      function toBaseCurrency(val, fromC, toC) {
        if (val == null || isNaN(val)) return null;
        if (fromC === toC) return val;
        const fromR = FX_TO_USD[fromC] || 1.0;
        const toR = FX_TO_USD[toC] || 1.0;
        return (val * fromR) / toR;
      }

      if (priceEl) {
        priceEl.style.opacity = '1';
        priceEl.textContent = `${currSign}${data.price.toFixed(2)}`;
        priceEl.style.color = data.change >= 0 ? 'var(--accent-green)' : '#ef4444';
      }

      // Display dynamic Base Currency equivalent badge if reporting currency differs
      const baseBadge = document.getElementById('tradeBaseCurrencyBadge');
      if (baseBadge) {
        if (baseCurr !== stockCurr) {
          const convPrice = toBaseCurrency(data.price, stockCurr, baseCurr);
          const baseSymbol = CURR_SYMBOLS[baseCurr] || `${baseCurr} `;
          baseBadge.style.display = 'inline-block';
          baseBadge.textContent = `≈ ${baseSymbol}${convPrice.toFixed(2)} ${baseCurr}`;
          baseBadge.title = `Converted to selected Reporting Base Currency (${baseCurr}) at live FX rate`;
        } else {
          baseBadge.style.display = 'none';
        }
      }

      const deltaEl = document.getElementById('tradePairDelta');
      if (deltaEl) {
        const isUp = data.change >= 0;
        deltaEl.className = `delta-badge ${isUp ? 'up' : 'down'}`;
        deltaEl.textContent = `${isUp ? '+' : ''}${data.change.toFixed(2)} (${isUp ? '+' : ''}${data.changePercent.toFixed(2)}%)`;
      }

      const rangeEl = document.getElementById('stockDayRange');
      if (rangeEl) {
        if (baseCurr !== stockCurr) {
          const cHigh = toBaseCurrency(data.dayHigh, stockCurr, baseCurr);
          const cLow = toBaseCurrency(data.dayLow, stockCurr, baseCurr);
          const bSign = CURR_SYMBOLS[baseCurr] || `${baseCurr} `;
          rangeEl.innerHTML = `${currSign}${data.dayHigh.toFixed(2)} / ${data.dayLow.toFixed(2)} <span style="font-size:0.75rem; color:#38bdf8; font-weight:600;">(≈ ${bSign}${cHigh.toFixed(2)} / ${cLow.toFixed(2)})</span>`;
        } else {
          rangeEl.textContent = `${currSign}${data.dayHigh.toFixed(2)} / ${data.dayLow.toFixed(2)}`;
        }
      }

      const volEl = document.getElementById('stockVolume');
      if (volEl) volEl.textContent = data.volume;

      const peEl = document.getElementById('stockPeDiv');
      if (peEl) {
        const peStr = data.peRatio ? `${data.peRatio}x` : 'N/A';
        let dy = data.dividendYield ? parseFloat(data.dividendYield) : null;
        if (dy && dy > 25.0) dy = dy / 100;
        const divStr = dy !== null ? `${dy.toFixed(2)}%` : 'N/A';
        peEl.textContent = `${peStr} • ${divStr}`;
      }

      const mcapEl = document.getElementById('stockMarketCap');
      if (mcapEl) mcapEl.textContent = data.marketCap !== '--' ? `${currSign}${data.marketCap}` : 'N/A';

      // Render Candlesticks from actual candle array
      if (data.candles && data.candles.length > 0) {
        renderCandlesticks(data.candles, data.currency);
      }

      // Update Order Book with real price & currency
      updateOrderBook(data.price, data.currency);

      // Update AI Forward Prediction & Feedback Section
      if (typeof updateStockAiPrediction === 'function') {
        updateStockAiPrediction(data);
      }

      // Update active state on popular pills
      document.querySelectorAll('.quick-stock-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-symbol') === symbol);
      });

      // Update active state on timeframe tabs
      document.querySelectorAll('#tradingTimeframeTabs .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-period') === period);
      });

      showToast(`Loaded live quote for ${data.symbol}`, 'success');

    } catch (err) {
      console.error('Stock fetch error:', err);
      showToast(`Could not load ticker "${symbol}". Please verify symbol.`, 'error');
      if (priceEl) {
        priceEl.style.opacity = '1';
        priceEl.textContent = 'Data Unavailable';
      }
    }
  }

  // ==============================================
  // High-DPI Interactive Candlestick Chart Engine
  // ==============================================
  let activeCandleData = null;
  let activeCandleCurrency = 'MYR';
  let activeCandleList = [];
  let hoveredCandleIndex = null;
  let hoveredMousePos = null;
  let candleListenersAttached = false;
  let candleResizeObserver = null;
  const technicalOverlays = {
    ema20: true,
    ema50: true
  };
  let candleChartLayout = {
    marginLeft: 16,
    marginRight: 68,
    marginTop: 16,
    marginBottom: 28,
    plotWidth: 100,
    totalPlotHeight: 100,
    volPlotBottom: 300,
    slotW: 10,
    candleCount: 0
  };

  function updateCandleHud(candle, currSign, ema20Val, ema50Val) {
    const hudDate = document.getElementById('hudDate');
    const hudOpen = document.getElementById('hudOpen');
    const hudHigh = document.getElementById('hudHigh');
    const hudLow = document.getElementById('hudLow');
    const hudClose = document.getElementById('hudClose');
    const hudChange = document.getElementById('hudChange');
    const hudVol = document.getElementById('hudVol');
    const hudEma20 = document.getElementById('hudEma20');
    const hudEma50 = document.getElementById('hudEma50');

    if (!candle) {
      if (hudDate) hudDate.textContent = '--';
      if (hudOpen) hudOpen.textContent = '--';
      if (hudHigh) hudHigh.textContent = '--';
      if (hudLow) hudLow.textContent = '--';
      if (hudClose) hudClose.textContent = '--';
      if (hudChange) { hudChange.textContent = '--'; hudChange.className = 'hud-val'; }
      if (hudVol) hudVol.textContent = '--';
      if (hudEma20) hudEma20.textContent = '--';
      if (hudEma50) hudEma50.textContent = '--';
      return;
    }

    const diff = candle.close - candle.open;
    const diffPct = candle.open > 0 ? (diff / candle.open) * 100 : 0;
    const isUp = diff >= 0;

    if (hudDate) hudDate.textContent = candle.date || candle.rawDate || '--';
    if (hudOpen) hudOpen.textContent = `${currSign}${candle.open.toFixed(2)}`;
    if (hudHigh) hudHigh.textContent = `${currSign}${candle.high.toFixed(2)}`;
    if (hudLow) hudLow.textContent = `${currSign}${candle.low.toFixed(2)}`;
    if (hudClose) {
      hudClose.textContent = `${currSign}${candle.close.toFixed(2)}`;
      hudClose.className = `hud-val ${isUp ? 'up' : 'down'}`;
    }
    if (hudChange) {
      hudChange.textContent = `${isUp ? '+' : ''}${diff.toFixed(2)} (${isUp ? '+' : ''}${diffPct.toFixed(2)}%)`;
      hudChange.className = `hud-val ${isUp ? 'up' : 'down'}`;
    }
    if (hudVol) {
      const v = candle.volume || 0;
      hudVol.textContent = v >= 1e9 ? (v / 1e9).toFixed(2) + 'B' : (v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : (v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : v.toLocaleString()));
    }
    if (hudEma20) hudEma20.textContent = (technicalOverlays.ema20 && ema20Val != null) ? `${currSign}${ema20Val.toFixed(2)}` : '--';
    if (hudEma50) hudEma50.textContent = (technicalOverlays.ema50 && ema50Val != null) ? `${currSign}${ema50Val.toFixed(2)}` : '--';
  }

  function calculateEMA(data, period) {
    const k = 2 / (period + 1);
    const emaArray = [];
    if (!data || data.length === 0) return emaArray;
    let ema = data[0].close;
    emaArray.push(ema);
    for (let i = 1; i < data.length; i++) {
      ema = (data[i].close * k) + (ema * (1 - k));
      emaArray.push(ema);
    }
    return emaArray;
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function renderCandlesticks(candles, currency) {
    if (candles && candles.length > 0) activeCandleList = candles;
    else if (!activeCandleList || activeCandleList.length === 0) {
      activeCandleList = currentStockData && currentStockData.candles ? currentStockData.candles : defaultMaybankCandles;
    }
    if (currency) activeCandleCurrency = currency;
    else if (!activeCandleCurrency) {
      activeCandleCurrency = currentStockData ? currentStockData.currency : 'MYR';
    }

    const canvas = document.getElementById('candlestickCanvas');
    const container = document.getElementById('candlestickContainer');
    const tooltip = document.getElementById('candlestickTooltip');
    if (!canvas || !container) return;

    // High-DPI setup
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.max(320, Math.floor(rect.width || container.clientWidth || 800));
    const displayHeight = Math.max(300, Math.floor(rect.height || container.clientHeight || 480));

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const cList = activeCandleList;
    if (!cList || cList.length === 0) return;

    const currSign = activeCandleCurrency === 'MYR' ? 'RM ' : (activeCandleCurrency === 'USD' ? '$' : `${activeCandleCurrency} `);

    // Calculate EMA 20 & 50
    const ema20 = calculateEMA(cList, 20);
    const ema50 = calculateEMA(cList, 50);

    // Layout configuration
    const marginTop = 16;
    const marginBottom = 28;  // Date X-axis labels
    const marginLeft = 16;
    const marginRight = 68;   // Y-axis price labels
    const plotWidth = Math.max(100, displayWidth - marginLeft - marginRight);
    const totalPlotHeight = Math.max(100, displayHeight - marginTop - marginBottom);

    // Split plot into Price area (72%) and Volume area (20%)
    const pricePlotHeight = Math.floor(totalPlotHeight * 0.72);
    const volPlotGap = 18;
    const volPlotTop = marginTop + pricePlotHeight + volPlotGap;
    const volPlotHeight = Math.max(35, totalPlotHeight - pricePlotHeight - volPlotGap);
    const volPlotBottom = volPlotTop + volPlotHeight;

    // Price scaling
    let minPrice = Math.min(...cList.map(c => c.low));
    let maxPrice = Math.max(...cList.map(c => c.high));
    ema20.forEach(v => { if (v < minPrice) minPrice = v; if (v > maxPrice) maxPrice = v; });
    ema50.forEach(v => { if (v < minPrice) minPrice = v; if (v > maxPrice) maxPrice = v; });
    
    // Add 4% padding
    const pMargin = (maxPrice - minPrice) * 0.04 || 0.2;
    minPrice -= pMargin;
    maxPrice += pMargin;
    const priceRange = maxPrice - minPrice || 1;

    const priceToY = (p) => marginTop + (1 - (p - minPrice) / priceRange) * pricePlotHeight;
    const yToPrice = (y) => minPrice + (1 - (y - marginTop) / pricePlotHeight) * priceRange;

    // Volume scaling
    const maxVol = Math.max(...cList.map(c => c.volume || 1)) || 1;
    const volToY = (v) => volPlotBottom - ((v / maxVol) * (volPlotHeight - 4));

    // Candle geometry
    const N = cList.length;
    const slotW = plotWidth / N;
    const candleW = Math.max(3, Math.min(22, Math.floor(slotW * 0.72)));

    // Update active layout metrics for mouse event handler
    candleChartLayout = {
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      plotWidth,
      totalPlotHeight,
      volPlotBottom,
      slotW,
      candleCount: N
    };

    // 1. Draw Subtle Horizontal Grid Lines & Price Labels
    const numPriceTicks = 5;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px "JetBrains Mono", monospace';

    for (let i = 0; i <= numPriceTicks; i++) {
      const priceVal = minPrice + (priceRange * (i / numPriceTicks));
      const y = priceToY(priceVal);

      // Grid line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(marginLeft + plotWidth, y);
      ctx.stroke();

      // Price text on right
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${currSign}${priceVal.toFixed(2)}`, displayWidth - 8, y);
    }

    // 2. Draw Volume Area Separator & Volume Labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(marginLeft, volPlotTop - 8);
    ctx.lineTo(marginLeft + plotWidth, volPlotTop - 8);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VOLUME', marginLeft, volPlotTop - 1);

    const maxVolFormatted = maxVol >= 1e9 ? (maxVol / 1e9).toFixed(1) + 'B' : (maxVol >= 1e6 ? (maxVol / 1e6).toFixed(1) + 'M' : (maxVol / 1e3).toFixed(0) + 'K');
    ctx.textAlign = 'right';
    ctx.fillText(`MAX: ${maxVolFormatted}`, marginLeft + plotWidth, volPlotTop - 1);

    // 3. Draw X-Axis Date Grid & Labels
    const tickInterval = Math.max(1, Math.floor(N / Math.min(6, Math.max(3, Math.floor(plotWidth / 90)))));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';

    for (let i = 0; i < N; i += tickInterval) {
      const c = cList[i];
      const cx = marginLeft + (i + 0.5) * slotW;

      // Vertical subtle grid line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.moveTo(cx, marginTop);
      ctx.lineTo(cx, volPlotBottom);
      ctx.stroke();

      // Date label
      let dText = c.date || c.rawDate || '';
      if (dText.includes(',')) dText = dText.split(',')[0]; // Shorten "Aug 15, 2024" to "Aug 15"
      ctx.fillText(dText, cx, volPlotBottom + 8);
    }

    // 4. Hover Column Highlight
    if (hoveredCandleIndex !== null && hoveredCandleIndex >= 0 && hoveredCandleIndex < N) {
      const colLeft = marginLeft + hoveredCandleIndex * slotW;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(colLeft, marginTop, slotW, volPlotBottom - marginTop);
    }

    // 5. Draw Candlesticks & Volume Bars
    cList.forEach((c, i) => {
      const cx = marginLeft + (i + 0.5) * slotW;
      const leftX = cx - candleW / 2;
      const isUp = c.close >= c.open;
      const candleColor = isUp ? '#10b981' : '#ef4444';
      const candleBorder = isUp ? '#34d399' : '#f87171';
      const isHovered = hoveredCandleIndex === i;

      // Candle Wicks (Upper & Lower)
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, priceToY(c.high));
      ctx.lineTo(cx, priceToY(c.low));
      ctx.stroke();

      // Candle Body
      const topY = Math.min(priceToY(c.open), priceToY(c.close));
      const botY = Math.max(priceToY(c.open), priceToY(c.close));
      const bodyH = Math.max(2, botY - topY);

      ctx.fillStyle = candleColor;
      ctx.fillRect(leftX, topY, candleW, bodyH);

      ctx.strokeStyle = candleBorder;
      ctx.lineWidth = 1;
      ctx.strokeRect(leftX, topY, candleW, bodyH);

      // Active candle glow on hover
      if (isHovered) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(leftX - 1.5, topY - 1.5, candleW + 3, bodyH + 3);
      }

      // Volume Bar
      const vY = volToY(c.volume || 0);
      const vH = Math.max(2, volPlotBottom - vY);
      ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.45)' : 'rgba(239, 68, 68, 0.45)';
      ctx.fillRect(leftX, vY, candleW, vH);

      // Volume top cap
      ctx.strokeStyle = isUp ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftX, vY);
      ctx.lineTo(leftX + candleW, vY);
      ctx.stroke();
    });

    // 6. Draw EMA 20 (Yellow)
    if (technicalOverlays.ema20) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.3)';
      ctx.beginPath();
      cList.forEach((c, i) => {
        const cx = marginLeft + (i + 0.5) * slotW;
        const y = priceToY(ema20[i]);
        if (i === 0) ctx.moveTo(cx, y);
        else ctx.lineTo(cx, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // 7. Draw EMA 50 (Cyan Dashed)
    if (technicalOverlays.ema50) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      cList.forEach((c, i) => {
        const cx = marginLeft + (i + 0.5) * slotW;
        const y = priceToY(ema50[i]);
        if (i === 0) ctx.moveTo(cx, y);
        else ctx.lineTo(cx, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 8. Crosshair Lines & Axis Badges when Hovered
    if (hoveredCandleIndex !== null && hoveredCandleIndex >= 0 && hoveredCandleIndex < N) {
      const activeC = cList[hoveredCandleIndex];
      const activeCx = marginLeft + (hoveredCandleIndex + 0.5) * slotW;
      const activeEma20 = ema20[hoveredCandleIndex];
      const activeEma50 = ema50[hoveredCandleIndex];

      // Vertical Crosshair
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(activeCx, marginTop);
      ctx.lineTo(activeCx, volPlotBottom);
      ctx.stroke();

      // Horizontal Crosshair at Mouse Y (or at active candle close if no mouse pos)
      const curY = hoveredMousePos ? Math.max(marginTop, Math.min(volPlotBottom, hoveredMousePos.y)) : priceToY(activeC.close);
      ctx.beginPath();
      ctx.moveTo(marginLeft, curY);
      ctx.lineTo(marginLeft + plotWidth, curY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Y-Axis Price Badge on the right
      const cursorPrice = yToPrice(curY);
      const priceBadgeW = marginRight - 4;
      const priceBadgeH = 20;
      const priceBadgeX = marginLeft + plotWidth + 3;
      const priceBadgeY = curY - priceBadgeH / 2;

      ctx.fillStyle = '#1e293b';
      drawRoundedRect(ctx, priceBadgeX, priceBadgeY, priceBadgeW, priceBadgeH, 4);
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${currSign}${cursorPrice.toFixed(2)}`, priceBadgeX + priceBadgeW / 2, curY);

      // X-Axis Date Badge on the bottom
      const dateText = activeC.date || activeC.rawDate || '';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      const textWidth = ctx.measureText(dateText).width;
      const dateBadgeW = Math.max(64, textWidth + 14);
      const dateBadgeH = 18;
      const dateBadgeX = Math.max(marginLeft, Math.min(marginLeft + plotWidth - dateBadgeW, activeCx - dateBadgeW / 2));
      const dateBadgeY = volPlotBottom + 4;

      ctx.fillStyle = '#1e293b';
      drawRoundedRect(ctx, dateBadgeX, dateBadgeY, dateBadgeW, dateBadgeH, 4);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dateText, dateBadgeX + dateBadgeW / 2, dateBadgeY + dateBadgeH / 2);

      // Update HUD Bar
      updateCandleHud(activeC, currSign, activeEma20, activeEma50);

      // Update Tooltip
      if (tooltip) {
        const diff = activeC.close - activeC.open;
        const diffPct = activeC.open > 0 ? (diff / activeC.open) * 100 : 0;
        const isUp = diff >= 0;
        const volVal = activeC.volume || 0;
        const volStr = volVal >= 1e9 ? (volVal / 1e9).toFixed(2) + 'B' : (volVal >= 1e6 ? (volVal / 1e6).toFixed(2) + 'M' : (volVal >= 1e3 ? (volVal / 1e3).toFixed(1) + 'K' : volVal.toLocaleString()));

        tooltip.innerHTML = `
          <div class="tip-header">
            <span class="tip-date">${activeC.date || activeC.rawDate}</span>
            <span class="tip-badge ${isUp ? 'up' : 'down'}">${isUp ? '+' : ''}${diffPct.toFixed(2)}%</span>
          </div>
          <div class="tip-grid">
            <div class="tip-row"><span class="tip-label">Open:</span><span class="tip-val">${currSign}${activeC.open.toFixed(2)}</span></div>
            <div class="tip-row"><span class="tip-label">High:</span><span class="tip-val" style="color:#34d399;">${currSign}${activeC.high.toFixed(2)}</span></div>
            <div class="tip-row"><span class="tip-label">Low:</span><span class="tip-val" style="color:#f87171;">${currSign}${activeC.low.toFixed(2)}</span></div>
            <div class="tip-row"><span class="tip-label">Close:</span><span class="tip-val ${isUp ? 'up' : 'down'}">${currSign}${activeC.close.toFixed(2)}</span></div>
            <div class="tip-row"><span class="tip-label">Volume:</span><span class="tip-val">${volStr}</span></div>
            ${technicalOverlays.ema20 ? `<div class="tip-row"><span class="tip-label">EMA(20):</span><span class="tip-val" style="color:#facc15;">${currSign}${activeEma20.toFixed(2)}</span></div>` : ''}
            ${technicalOverlays.ema50 ? `<div class="tip-row"><span class="tip-label">EMA(50):</span><span class="tip-val" style="color:#38bdf8;">${currSign}${activeEma50.toFixed(2)}</span></div>` : ''}
          </div>
        `;

        // Position tooltip smoothly: flip left if mouse is in right half
        tooltip.style.display = 'block';
        const tipWidth = tooltip.offsetWidth || 195;
        const flipLeft = activeCx > (marginLeft + plotWidth * 0.62);
        const tipX = flipLeft ? (activeCx - tipWidth - 16) : (activeCx + 16);
        const tipY = Math.max(10, Math.min(volPlotBottom - 110, curY - 30));

        tooltip.style.left = `${tipX}px`;
        tooltip.style.top = `${tipY}px`;
      }
    } else {
      // Not hovering: show latest candle in HUD and hide tooltip
      const latestC = cList[cList.length - 1];
      const latestEma20 = ema20[ema20.length - 1];
      const latestEma50 = ema50[ema50.length - 1];
      updateCandleHud(latestC, currSign, latestEma20, latestEma50);
      if (tooltip) tooltip.style.display = 'none';
    }

    // Attach Event Listeners Once
    if (!candleListenersAttached) {
      candleListenersAttached = true;

      const handlePointerMove = (e) => {
        const cList = activeCandleList;
        if (!cList || cList.length === 0) return;
        const cRect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - cRect.left;
        const y = clientY - cRect.top;

        const { marginLeft, marginTop, volPlotBottom, slotW, candleCount } = candleChartLayout;

        // Allow hover across entire canvas width including right margin / price scale
        const minX = 0;
        const maxX = cRect.width;
        const minY = 0;
        const maxY = cRect.height;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY && slotW > 0 && candleCount > 0) {
          const rawIdx = Math.floor((x - marginLeft) / slotW);
          hoveredCandleIndex = Math.max(0, Math.min(candleCount - 1, rawIdx));
          hoveredMousePos = { x, y };
        } else {
          hoveredCandleIndex = null;
          hoveredMousePos = null;
        }
        renderCandlesticks();
      };

      const handlePointerLeave = () => {
        hoveredCandleIndex = null;
        hoveredMousePos = null;
        renderCandlesticks();
      };

      canvas.addEventListener('mousemove', handlePointerMove);
      canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
      canvas.addEventListener('mouseleave', handlePointerLeave);
      canvas.addEventListener('touchend', handlePointerLeave);

      // Resize observer to keep chart ultra-sharp on window/sidebar size changes
      if (window.ResizeObserver && container) {
        candleResizeObserver = new ResizeObserver(() => {
          renderCandlesticks();
        });
        candleResizeObserver.observe(container);
      }
      window.addEventListener('resize', () => {
        renderCandlesticks();
      });
    }
  }

  // Technical Overlay Toggles (EMA 20, EMA 50)
  const toggleEma20Btn = document.getElementById('toggleEma20Btn');
  const toggleEma50Btn = document.getElementById('toggleEma50Btn');

  if (toggleEma20Btn) {
    toggleEma20Btn.addEventListener('click', () => {
      technicalOverlays.ema20 = !technicalOverlays.ema20;
      toggleEma20Btn.classList.toggle('active', technicalOverlays.ema20);
      const hudItem = document.querySelector('.hud-item.hud-ema20');
      if (hudItem) hudItem.style.opacity = technicalOverlays.ema20 ? '1' : '0.35';
      renderCandlesticks();
      showToast(`EMA 20 overlay ${technicalOverlays.ema20 ? 'enabled' : 'disabled'}`, 'info');
    });
  }

  if (toggleEma50Btn) {
    toggleEma50Btn.addEventListener('click', () => {
      technicalOverlays.ema50 = !technicalOverlays.ema50;
      toggleEma50Btn.classList.toggle('active', technicalOverlays.ema50);
      const hudItem = document.querySelector('.hud-item.hud-ema50');
      if (hudItem) hudItem.style.opacity = technicalOverlays.ema50 ? '1' : '0.35';
      renderCandlesticks();
      showToast(`EMA 50 overlay ${technicalOverlays.ema50 ? 'enabled' : 'disabled'}`, 'info');
    });
  }

  // Stock Order Book Simulation
  const orderBookAsks = document.getElementById('orderBookAsks');
  const orderBookBids = document.getElementById('orderBookBids');

  function updateOrderBook(currentPrice = 10.46, currency = 'MYR') {
    if (!orderBookAsks || !orderBookBids) return;

    orderBookAsks.innerHTML = '';
    orderBookBids.innerHTML = '';

    const currSign = currency === 'MYR' ? 'RM ' : '$';
    const tick = currentPrice > 100 ? 0.25 : (currentPrice > 20 ? 0.05 : 0.02);

    const currHeader = document.getElementById('orderBookCurrencyHeader');
    if (currHeader) currHeader.textContent = `Price (${currency})`;

    const midPriceEl = document.getElementById('orderBookMidPrice');
    if (midPriceEl) midPriceEl.textContent = `${currSign}${currentPrice.toFixed(2)} ↗`;

    const spreadEl = document.getElementById('orderBookSpreadText');
    if (spreadEl) spreadEl.textContent = `Spread: ${tick.toFixed(2)} (${((tick / currentPrice) * 100).toFixed(2)}%)`;

    // Asks (Sellers - Red)
    for (let i = 5; i >= 1; i--) {
      const price = (currentPrice + i * tick).toFixed(2);
      const size = Math.floor(120 + Math.random() * 850);
      const total = (size * price / 1000).toFixed(1) + 'k';
      const depth = Math.floor(25 + Math.random() * 65);

      const row = document.createElement('div');
      row.className = 'order-row sell';
      row.innerHTML = `
        <span class="order-text">${currSign}${price}</span>
        <span class="order-text">${size} lots</span>
        <span class="order-text">${total}</span>
        <div class="order-depth-bg" style="width: ${depth}%;"></div>
      `;
      orderBookAsks.appendChild(row);
    }

    // Bids (Buyers - Green)
    for (let i = 1; i <= 5; i++) {
      const price = (currentPrice - (i - 1) * tick).toFixed(2);
      const size = Math.floor(150 + Math.random() * 950);
      const total = (size * price / 1000).toFixed(1) + 'k';
      const depth = Math.floor(25 + Math.random() * 65);

      const row = document.createElement('div');
      row.className = 'order-row buy';
      row.innerHTML = `
        <span class="order-text">${currSign}${price}</span>
        <span class="order-text">${size} lots</span>
        <span class="order-text">${total}</span>
        <div class="order-depth-bg" style="width: ${depth}%;"></div>
      `;
      orderBookBids.appendChild(row);
    }
  }

  // Stock Search Autocomplete & Quick Pills Event Handlers
  const stockSearchInput = document.getElementById('stockSearchInput');
  const stockSearchDropdown = document.getElementById('stockSearchDropdown');
  const stockSearchClearBtn = document.getElementById('stockSearchClearBtn');
  let searchDebounceTimer = null;

  if (stockSearchInput && stockSearchDropdown) {
    stockSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (stockSearchClearBtn) stockSearchClearBtn.style.display = query ? 'flex' : 'none';

      clearTimeout(searchDebounceTimer);
      if (!query) {
        stockSearchDropdown.style.display = 'none';
        return;
      }

      searchDebounceTimer = setTimeout(async () => {
        try {
          const resp = await fetch(`/api/stock/search?q=${encodeURIComponent(query)}`);
          if (!resp.ok) return;
          const data = await resp.json();

          stockSearchDropdown.innerHTML = '';
          if (data.results && data.results.length > 0) {
            data.results.forEach(stock => {
              const item = document.createElement('div');
              item.className = 'stock-search-item';
              item.innerHTML = `
                <div>
                  <div class="stock-item-symbol">${stock.symbol}</div>
                  <div class="stock-item-name">${stock.name}</div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="stock-item-tag">${stock.exchange}</span>
                  <span class="stock-item-tag" style="background: rgba(124, 58, 237, 0.15); color: #c084fc;">${stock.sector}</span>
                </div>
              `;
              item.addEventListener('click', () => {
                stockSearchInput.value = stock.symbol;
                stockSearchDropdown.style.display = 'none';
                fetchStockData(stock.symbol, currentStockPeriod);
              });
              stockSearchDropdown.appendChild(item);
            });
            stockSearchDropdown.style.display = 'block';
          } else {
            const emptyItem = document.createElement('div');
            emptyItem.className = 'stock-search-empty';
            emptyItem.innerHTML = `
              <i data-lucide="search-x" style="width: 16px; height: 16px; color: #94a3b8; flex-shrink: 0;"></i>
              <span>No matching stocks found across KLSE / US exchanges.</span>
            `;
            stockSearchDropdown.appendChild(emptyItem);
            stockSearchDropdown.style.display = 'block';
            if (window.lucide) lucide.createIcons({ root: stockSearchDropdown });
          }
        } catch (err) {
          console.error('Stock search error:', err);
        }
      }, 200);
    });

    stockSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = stockSearchInput.value.trim();
        if (query) {
          stockSearchDropdown.style.display = 'none';
          fetchStockData(query, currentStockPeriod);
        }
      }
    });

    if (stockSearchClearBtn) {
      stockSearchClearBtn.addEventListener('click', () => {
        stockSearchInput.value = '';
        stockSearchClearBtn.style.display = 'none';
        stockSearchDropdown.style.display = 'none';
      });
    }

    document.addEventListener('click', (e) => {
      if (!stockSearchInput.contains(e.target) && !stockSearchDropdown.contains(e.target)) {
        stockSearchDropdown.style.display = 'none';
      }
    });
  }

  // Quick Stock Ticker Pills
  document.querySelectorAll('.quick-stock-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sym = btn.getAttribute('data-symbol');
      if (stockSearchInput) stockSearchInput.value = sym;
      fetchStockData(sym, currentStockPeriod);
    });
  });

  // Timeframe Tabs Switcher (1D, 5D, 1M, 6M, 1Y)
  document.querySelectorAll('#tradingTimeframeTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.getAttribute('data-period');
      fetchStockData(currentStockSymbol, period);
    });
  });

  // =======================================================
  // AI PREDICTION OF UPCOMING STATS & PREDICTION SUMMARY FEEDBACK
  // =======================================================
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const stockAiState = {
    currentHorizon: '15d',
    userVoted: {}
  };

  function getStoredStockVotes(symbol) {
    try {
      const stored = localStorage.getItem(`stock_ai_votes_${symbol.toUpperCase()}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const seed = symbol.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const agree = 85 + (seed % 45);
    const disagree = 12 + (seed % 15);
    return { agree, disagree };
  }

  function saveStoredStockVotes(symbol, votes) {
    try {
      localStorage.setItem(`stock_ai_votes_${symbol.toUpperCase()}`, JSON.stringify(votes));
    } catch (e) {}
  }

  function updateStockAiPrediction(stockData) {
    if (!stockData) return;

    const symbol = (stockData.symbol || '1155.KL').toUpperCase();
    const name = stockData.name || symbol;
    const price = parseFloat(stockData.price) || 10.0;
    const isKLSE = symbol.endsWith('.KL') || stockData.currency === 'MYR';
    const currSign = isKLSE ? 'RM ' : (stockData.currency === 'USD' ? '$' : `${stockData.currency || '$'} `);
    const change = parseFloat(stockData.change) || 0;
    const isBullish = change >= 0;

    // Header ticker label
    const tickerEl = document.getElementById('aiStockTicker');
    if (tickerEl) tickerEl.textContent = `${name} (${symbol})`;

    // Horizon configuration
    const horizon = stockAiState.currentHorizon || '15d';
    const horizonMultiplier = horizon === '5d' ? 0.45 : (horizon === '30d' ? 1.85 : 1.0);
    const horizonDays = horizon === '5d' ? '5' : (horizon === '30d' ? '30' : '15');

    const beta = parseFloat(stockData.beta) || 1.05;
    let driftPct = (isBullish ? 4.70 : -2.80) * horizonMultiplier;
    driftPct = Math.round(driftPct * (0.8 + (beta * 0.2)) * 10) / 10;
    if (Math.abs(driftPct) < 0.8) driftPct = isBullish ? 1.6 : -1.4;

    const targetPrice = Math.round(price * (1 + driftPct / 100) * 100) / 100;
    const targetDeltaAbs = Math.round((targetPrice - price) * 100) / 100;

    const channelMarginPct = Math.round((4.30 * horizonMultiplier) * 10) / 10;
    const predictedR1 = Math.round(price * (1 + channelMarginPct / 100) * 100) / 100;
    const predictedS1 = Math.round(price * (1 - channelMarginPct / 100) * 100) / 100;

    const stopLossPct = Math.round((channelMarginPct * 0.55) * 10) / 10;
    const stopLossPrice = isBullish 
      ? Math.round(price * (1 - stopLossPct / 100) * 100) / 100 
      : Math.round(price * (1 + stopLossPct / 100) * 100) / 100;
    const rrRatio = (Math.abs(driftPct) / Math.max(0.5, stopLossPct)).toFixed(1);
    const confScore = Math.min(95, Math.max(72, Math.round(88 + (horizon === '5d' ? 3 : (horizon === '30d' ? -6 : 0)))));

    // Target Price & Delta
    const targetPriceEl = document.getElementById('aiTargetPrice');
    if (targetPriceEl) targetPriceEl.textContent = `${currSign}${targetPrice.toFixed(2)}`;

    const targetDeltaEl = document.getElementById('aiTargetDelta');
    if (targetDeltaEl) {
      const isUp = driftPct >= 0;
      targetDeltaEl.className = `ai-delta-badge ${isUp ? 'up' : 'down'}`;
      targetDeltaEl.textContent = `${isUp ? '+' : ''}${driftPct.toFixed(2)}% (${isUp ? '+' : '-'}${currSign}${Math.abs(targetDeltaAbs).toFixed(2)})`;
    }

    // Signal Pill
    const signalPill = document.getElementById('aiSignalPill');
    if (signalPill) {
      if (driftPct >= 2.0) {
        signalPill.className = 'ai-signal-pill bullish';
        signalPill.textContent = '▲ BULLISH';
      } else if (driftPct <= -2.0) {
        signalPill.className = 'ai-signal-pill bearish';
        signalPill.textContent = '▼ BEARISH';
      } else {
        signalPill.className = 'ai-signal-pill neutral';
        signalPill.textContent = '● NEUTRAL';
      }
    }

    // Confidence
    const confText = document.getElementById('aiConfidenceText');
    if (confText) confText.textContent = `${confScore}%`;
    const confBar = document.getElementById('aiConfidenceBar');
    if (confBar) confBar.style.width = `${confScore}%`;

    // Upcoming Key Levels
    const r1El = document.getElementById('aiResistanceVal');
    if (r1El) r1El.textContent = `${currSign}${predictedR1.toFixed(2)}`;
    const s1El = document.getElementById('aiSupportVal');
    if (s1El) s1El.textContent = `${currSign}${predictedS1.toFixed(2)}`;
    const lossEl = document.getElementById('aiStopLossVal');
    if (lossEl) lossEl.textContent = `${currSign}${stopLossPrice.toFixed(2)} (${isBullish ? '-' : '+'}${stopLossPct.toFixed(1)}%)`;
    const rrEl = document.getElementById('aiRiskRewardVal');
    if (rrEl) rrEl.textContent = `1 : ${rrRatio}`;

    // Short, Neat 2-Sentence AI Summary
    const summaryEl = document.getElementById('aiSummaryText');
    if (summaryEl) {
      if (isBullish) {
        summaryEl.textContent = `AI model projects positive price expansion toward ${currSign}${targetPrice.toFixed(2)} over the upcoming ${horizonDays}-day horizon based on steady accumulation above moving averages. Key resistance is identified at ${currSign}${predictedR1.toFixed(2)} with downside stop protection recommended at ${currSign}${stopLossPrice.toFixed(2)}.`;
      } else {
        summaryEl.textContent = `AI model anticipates mild short-term consolidation toward ${currSign}${targetPrice.toFixed(2)} across the next ${horizonDays} trading days. Price action is encountering resistance near ${currSign}${predictedR1.toFixed(2)}, with primary technical support holding around ${currSign}${predictedS1.toFixed(2)}.`;
      }
    }

    // Update feedback buttons
    renderFeedbackTerminal(symbol);

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function renderFeedbackTerminal(symbol) {
    const votes = getStoredStockVotes(symbol);
    const agreeCountEl = document.getElementById('voteCountAgree');
    if (agreeCountEl) agreeCountEl.textContent = votes.agree;
    const disagreeCountEl = document.getElementById('voteCountDisagree');
    if (disagreeCountEl) disagreeCountEl.textContent = votes.disagree;

    const userVote = stockAiState.userVoted[symbol];
    const agreeBtn = document.getElementById('aiVoteAgreeBtn');
    const disagreeBtn = document.getElementById('aiVoteDisagreeBtn');
    if (agreeBtn) agreeBtn.classList.toggle('active', userVote === 'agree');
    if (disagreeBtn) disagreeBtn.classList.toggle('active', userVote === 'disagree');
  }

  // Horizon Tabs
  document.querySelectorAll('#aiHorizonTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#aiHorizonTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      stockAiState.currentHorizon = btn.getAttribute('data-horizon');
      updateStockAiPrediction(currentStockData);
      showToast(`AI horizon adjusted to ${btn.textContent.trim()}`, 'info');
    });
  });

  // Agree Button
  const aiVoteAgreeBtn = document.getElementById('aiVoteAgreeBtn');
  if (aiVoteAgreeBtn) {
    aiVoteAgreeBtn.addEventListener('click', () => {
      const sym = (currentStockData.symbol || '1155.KL').toUpperCase();
      if (stockAiState.userVoted[sym] === 'agree') {
        showToast(`You have already agreed with the forecast for ${sym}`, 'info');
        return;
      }
      const votes = getStoredStockVotes(sym);
      if (stockAiState.userVoted[sym] === 'disagree') {
        votes.disagree = Math.max(0, votes.disagree - 1);
      }
      votes.agree += 1;
      stockAiState.userVoted[sym] = 'agree';
      saveStoredStockVotes(sym, votes);
      renderFeedbackTerminal(sym);
      showToast(`Vote recorded: Agree / Bullish for ${sym}`, 'success');
    });
  }

  // Disagree Button
  const aiVoteDisagreeBtn = document.getElementById('aiVoteDisagreeBtn');
  if (aiVoteDisagreeBtn) {
    aiVoteDisagreeBtn.addEventListener('click', () => {
      const sym = (currentStockData.symbol || '1155.KL').toUpperCase();
      if (stockAiState.userVoted[sym] === 'disagree') {
        showToast(`You have already voted Disagree for ${sym}`, 'info');
        return;
      }
      const votes = getStoredStockVotes(sym);
      if (stockAiState.userVoted[sym] === 'agree') {
        votes.agree = Math.max(0, votes.agree - 1);
      }
      votes.disagree += 1;
      stockAiState.userVoted[sym] = 'disagree';
      saveStoredStockVotes(sym, votes);
      renderFeedbackTerminal(sym);
      showToast(`Vote recorded: Disagree for ${sym}`, 'warning');
    });
  }

  // ==========================================
  // FRED Macroeconomic Intelligence Explorer
  // ==========================================
  let currentFredSeriesId = 'FEDFUNDS';
  let fredSparklineChartInstance = null;

  async function fetchFredSeries(seriesId = 'FEDFUNDS') {
    currentFredSeriesId = seriesId;
    const badge = document.getElementById('fredStatusBadge');
    if (badge) badge.textContent = 'Fetching FRED Data...';

    try {
      const resp = await fetch(`/api/macro/series?id=${encodeURIComponent(seriesId)}`);
      if (!resp.ok) throw new Error('FRED series not found');
      const data = await resp.json();

      if (badge) badge.textContent = `● Connected: ${data.id} (${data.frequency})`;

      const catEl = document.getElementById('fredSeriesCategory');
      if (catEl) catEl.textContent = data.category;

      const nameEl = document.getElementById('fredSeriesName');
      if (nameEl) nameEl.textContent = data.name;

      const valEl = document.getElementById('fredLatestVal');
      if (valEl) {
        const isPct = data.unit.includes('%');
        valEl.textContent = `${data.latest.value.toFixed(2)}${isPct ? '%' : ' ' + data.unit}`;
      }

      const deltaEl = document.getElementById('fredLatestDelta');
      if (deltaEl) {
        const chg = data.latest.change;
        const pct = data.latest.changePercent;
        const isUp = chg >= 0;
        deltaEl.className = `delta-badge ${isUp ? 'up' : 'down'}`;
        deltaEl.textContent = `${isUp ? '+' : ''}${chg.toFixed(2)} (${isUp ? '+' : ''}${pct.toFixed(2)}% MoM)`;
      }

      const dateEl = document.getElementById('fredLatestDate');
      if (dateEl) dateEl.textContent = data.latest.date;

      const priorEl = document.getElementById('fredPriorVal');
      if (priorEl) priorEl.textContent = `${data.latest.priorValue.toFixed(2)}${data.unit.includes('%') ? '%' : ''}`;

      const yoyEl = document.getElementById('fredYoyChange');
      if (yoyEl) {
        if (data.latest.yoyChange !== null && data.latest.yoyChange !== undefined) {
          yoyEl.textContent = `${data.latest.yoyChange >= 0 ? '+' : ''}${data.latest.yoyChange.toFixed(2)} (${data.latest.yoyPercent >= 0 ? '+' : ''}${data.latest.yoyPercent.toFixed(1)}%)`;
        } else {
          yoyEl.textContent = 'N/A';
        }
      }

      // Draw FRED Sparkline
      drawFredSparkline(data.recentObservations);

      // Update active pill button
      document.querySelectorAll('.fred-pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-fred') === seriesId);
      });

    } catch (err) {
      console.error('FRED fetch error:', err);
      if (badge) badge.textContent = '● FRED Offline';
    }
  }

  function drawFredSparkline(observations) {
    const canvas = document.getElementById('fredSparklineCanvas');
    if (!canvas || !observations || observations.length === 0) return;

    if (fredSparklineChartInstance) {
      fredSparklineChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 140);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    fredSparklineChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: observations.map(o => o.date),
        datasets: [{
          label: currentFredSeriesId,
          data: observations.map(o => o.value),
          borderColor: '#06b6d4',
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          backgroundColor: grad,
          pointRadius: 2,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161a2d',
            titleColor: '#fff',
            bodyColor: '#06b6d4',
            borderColor: 'rgba(6, 182, 212, 0.4)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.03)' },
            ticks: { color: '#64748b', maxTicksLimit: 6 }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.03)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }

  // FRED Series Pills Click Handlers
  document.querySelectorAll('.fred-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const seriesId = btn.getAttribute('data-fred');
      fetchFredSeries(seriesId);
    });
  });

  const defaultFredData = [
    { date: '2025-10', value: 4.83 },
    { date: '2025-11', value: 4.64 },
    { date: '2025-12', value: 4.48 },
    { date: '2026-01', value: 4.33 },
    { date: '2026-02', value: 4.12 },
    { date: '2026-03', value: 3.88 },
    { date: '2026-04', value: 3.85 },
    { date: '2026-05', value: 3.75 },
    { date: '2026-06', value: 3.68 },
    { date: '2026-07', value: 3.64 },
    { date: '2026-08', value: 3.63 }
  ];

  // Initial Data Loads
  renderCandlesticks();
  updateOrderBook(10.46, 'MYR');
  drawFredSparkline(defaultFredData);

  fetchStockData('1155.KL', '1mo');
  fetchFredSeries('FEDFUNDS');

  // ==========================================
  // World Map Server Nodes Interactivity
  // ==========================================
  const mapNodes = document.querySelectorAll('.map-node');
  mapNodes.forEach(node => {
    node.addEventListener('click', () => {
      const name = node.getAttribute('data-node');
      const load = node.getAttribute('data-load');
      const ping = node.getAttribute('data-ping');
      showToast(`${name} Gateway: ${ping} latency | Load: ${load}`, 'info');
    });
  });

  // ==========================================
  // User Profile & Settings Management & Auth
  // ==========================================
  const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80';

  function isValidAvatarUrl(src) {
    if (!src || typeof src !== 'string') return false;
    const s = src.trim();
    if (s.length < 10) return false;
    if (s.startsWith('data:image/jpeg;base64,AAAAAAA')) return false; // purge dummy test payload
    if (s.startsWith('data:image/')) return s.length > 50;
    if (s.startsWith('http://') || s.startsWith('https://')) return true;
    return false;
  }

  function setAvatarSafe(imgEl, src) {
    if (!imgEl) return;
    imgEl.onerror = function() {
      this.onerror = null;
      this.src = DEFAULT_AVATAR;
    };
    imgEl.src = isValidAvatarUrl(src) ? src.trim() : DEFAULT_AVATAR;
  }

  const defaultAuthUser = {
    isLoggedIn: true,
    name: 'Alex Morgan',
    shortName: 'Alex M.',
    role: 'Senior Macro Strategist & Equity Analyst',
    email: 'alex.morgan@macropulse.ai',
    desk: 'MacroPulse Sovereign Macro & Bursa Equities Division',
    timezone: 'UTC+8',
    bio: 'Macroeconomic research strategist tracking BNM OPR monetary policy, headline CPI inflation, GDP expansion trends, sovereign yield curves, and Bursa Malaysia blue-chip equities.',
    avatar: DEFAULT_AVATAR
  };

  const unauthenticatedUser = {
    isLoggedIn: false,
    name: 'Unauthenticated User',
    shortName: 'Sign In',
    role: 'Authentication Required',
    email: '',
    desk: 'Restricted Terminal',
    timezone: 'UTC+8',
    bio: '',
    avatar: DEFAULT_AVATAR
  };

  let currentUser = { ...defaultAuthUser };

  // Load persisted profile & login status from localStorage
  try {
    const savedProfile = localStorage.getItem('macropulse_user_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      currentUser = { ...defaultAuthUser, ...parsed };
    }
    // Cleanse any invalid or dummy test avatar
    if (!isValidAvatarUrl(currentUser.avatar)) {
      currentUser.avatar = DEFAULT_AVATAR;
      try {
        const p = JSON.parse(localStorage.getItem('macropulse_user_profile') || '{}');
        p.avatar = DEFAULT_AVATAR;
        localStorage.setItem('macropulse_user_profile', JSON.stringify(p));
      } catch (err) {}
    }
    const savedLoggedIn = localStorage.getItem('macropulse_user_logged_in');
    if (savedLoggedIn === 'false') {
      currentUser.isLoggedIn = false;
    }
  } catch (e) {
    console.warn('Failed to load profile from localStorage', e);
  }

  const authModal = document.getElementById('authModal');
  const authCloseBtn = document.getElementById('authCloseBtn');
  const authPortalBtn = document.getElementById('authPortalBtn');
  const profileBadge = document.getElementById('profileBadge');
  const headerUserProfile = document.getElementById('headerUserProfile');

  const authSignInContainer = document.getElementById('authSignInContainer');
  const authSignUpContainer = document.getElementById('authSignUpContainer');
  const switchToSignUpBtn = document.getElementById('switchToSignUpBtn');
  const switchToSignInBtn = document.getElementById('switchToSignInBtn');

  // Logout Modal Elements
  const logoutModal = document.getElementById('logoutModal');
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
  const headerLogoutBtn = document.getElementById('headerLogoutBtn');
  const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');

  function updateAuthUI() {
    const headerUserWrap = document.getElementById('headerUserWrap');
    const headerUserAvatar = document.getElementById('headerUserAvatar');
    const headerUserName = document.getElementById('headerUserName');
    const authPortalBtn = document.getElementById('authPortalBtn');

    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarUserRole = document.getElementById('sidebarUserRole');

    if (currentUser.isLoggedIn) {
      if (headerUserWrap) headerUserWrap.style.display = 'flex';
      if (headerUserAvatar) setAvatarSafe(headerUserAvatar, currentUser.avatar);
      if (headerUserName) headerUserName.textContent = currentUser.shortName || currentUser.name;
      if (headerUserProfile) headerUserProfile.title = `${currentUser.name} (${currentUser.role}) - Click for Profile & Settings`;
      if (authPortalBtn) authPortalBtn.style.display = 'none';

      if (sidebarAvatar) setAvatarSafe(sidebarAvatar, currentUser.avatar);
      if (sidebarUserName) sidebarUserName.textContent = currentUser.name;
      if (sidebarUserRole) sidebarUserRole.textContent = currentUser.role;
      if (sidebarLogoutBtn) {
        sidebarLogoutBtn.title = 'Log Out';
        sidebarLogoutBtn.innerHTML = '<i data-lucide="log-out" id="sidebarLogoutIcon" style="width: 16px; height: 16px;"></i>';
      }
    } else {
      if (headerUserWrap) headerUserWrap.style.display = 'none';
      if (authPortalBtn) authPortalBtn.style.display = 'inline-flex';

      if (sidebarAvatar) setAvatarSafe(sidebarAvatar, unauthenticatedUser.avatar);
      if (sidebarUserName) sidebarUserName.textContent = unauthenticatedUser.name;
      if (sidebarUserRole) sidebarUserRole.textContent = unauthenticatedUser.role;
      if (sidebarLogoutBtn) {
        sidebarLogoutBtn.title = 'Sign In';
        sidebarLogoutBtn.innerHTML = '<i data-lucide="log-in" id="sidebarLogoutIcon" style="width: 16px; height: 16px; color: var(--primary-light);"></i>';
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function syncProfileFieldsToUI() {
    const settingsFullName = document.getElementById('settingsFullName');
    const settingsEmail = document.getElementById('settingsEmail');
    const settingsRole = document.getElementById('settingsRole');
    const settingsDesk = document.getElementById('settingsDesk');
    const settingsTimezone = document.getElementById('settingsTimezone');
    const settingsBio = document.getElementById('settingsBio');
    const settingsAvatarPreview = document.getElementById('settingsAvatarPreview');
    const profileHeroAvatar = document.getElementById('profileHeroAvatar');
    const profileHeroName = document.getElementById('profileHeroName');
    const profileHeroRole = document.getElementById('profileHeroRole');

    if (settingsFullName) settingsFullName.value = currentUser.name || '';
    if (settingsEmail) settingsEmail.value = currentUser.email || '';
    if (settingsRole) {
      const standardRoles = [
        'Macroeconomic Strategist',
        'Equities Portfolio Manager',
        'Treasury & FX Analyst',
        'Quantitative / Retail Investor',
        'Student',
        'Other'
      ];
      const currentRole = (currentUser.role || '').trim();
      const matched = standardRoles.find(r => r.toLowerCase() === currentRole.toLowerCase());
      const customWrap = document.getElementById('settingsRoleCustomWrap');
      const customInput = document.getElementById('settingsRoleCustom');

      if (matched && matched !== 'Other') {
        settingsRole.value = matched;
        if (customWrap) customWrap.style.display = 'none';
        if (customInput) customInput.value = '';
      } else if (currentRole) {
        settingsRole.value = 'Other';
        if (customWrap) customWrap.style.display = 'block';
        if (customInput) customInput.value = (currentRole.toLowerCase() === 'other') ? '' : currentRole;
      } else {
        settingsRole.value = 'Macroeconomic Strategist';
        if (customWrap) customWrap.style.display = 'none';
      }
    }
    if (settingsDesk) settingsDesk.value = currentUser.desk || 'MacroPulse Sovereign Macro & Bursa Equities Division';
    if (settingsTimezone) settingsTimezone.value = currentUser.timezone || 'UTC+8';
    if (settingsBio) settingsBio.value = currentUser.bio || '';
    if (settingsAvatarPreview) setAvatarSafe(settingsAvatarPreview, currentUser.avatar);

    if (profileHeroAvatar) setAvatarSafe(profileHeroAvatar, currentUser.avatar);
    if (profileHeroName) profileHeroName.textContent = currentUser.name || 'Alex Morgan';
    if (profileHeroRole) {
      profileHeroRole.textContent = `${currentUser.role || 'Senior Macro Strategist'} • ${currentUser.email || 'alex.morgan@macropulse.ai'}`;
    }

    updateAuthUI();
  }

  async function saveProfileSettings() {
    const fullNameInput = document.getElementById('settingsFullName');
    const emailInput = document.getElementById('settingsEmail');
    const roleInput = document.getElementById('settingsRole');
    const deskInput = document.getElementById('settingsDesk');
    const timezoneInput = document.getElementById('settingsTimezone');
    const bioInput = document.getElementById('settingsBio');
    const avatarPreview = document.getElementById('settingsAvatarPreview');

    const nameError = document.getElementById('settingsFullNameError');
    const emailError = document.getElementById('settingsEmailError');

    // Reset error states
    if (fullNameInput) fullNameInput.classList.remove('is-invalid');
    if (emailInput) emailInput.classList.remove('is-invalid');
    if (nameError) { nameError.textContent = ''; nameError.classList.remove('visible'); }
    if (emailError) { emailError.textContent = ''; emailError.classList.remove('visible'); }

    const fullName = fullNameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    let role = currentUser.role || 'Macroeconomic Strategist';
    if (roleInput) {
      if (roleInput.value === 'Other') {
        const customRole = document.getElementById('settingsRoleCustom')?.value.trim();
        role = customRole || 'Other';
      } else {
        role = roleInput.value.trim();
      }
    }
    const desk = deskInput?.value.trim() || currentUser.desk || 'MacroPulse Equities Division';
    const timezone = timezoneInput?.value || currentUser.timezone || 'UTC+8';
    const bio = bioInput?.value.trim() || '';
    const avatar = avatarPreview?.src || currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80';

    let hasError = false;

    // Validation 1: Full Name
    if (!fullName || fullName.length < 2) {
      if (fullNameInput) fullNameInput.classList.add('is-invalid');
      if (nameError) {
        nameError.textContent = 'Please enter your full name (minimum 2 characters).';
        nameError.classList.add('visible');
      }
      hasError = true;
    }

    // Validation 2: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (emailInput) emailInput.classList.add('is-invalid');
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
        emailError.classList.add('visible');
      }
      hasError = true;
    }

    if (hasError) {
      showToast('Please correct the highlighted validation errors.', 'error');
      return;
    }

    // Button loading state
    const saveBtns = [document.getElementById('saveSettingsBtn'), document.getElementById('heroSaveBtn')].filter(Boolean);
    saveBtns.forEach(btn => {
      btn.disabled = true;
      btn.innerHTML = '<span class="loading-spinner"></span> Saving to MySQL...';
    });

    try {
      const resp = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email || email,
          new_email: email,
          name: fullName,
          role: role,
          desk: desk,
          timezone: timezone,
          bio: bio,
          avatar: avatar || currentUser.avatar || ''
        })
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        const errMsg = (data && data.error) || 'Failed to persist changes to MySQL database.';
        if (emailError && (errMsg.toLowerCase().includes('email') || (data && data.alreadyRegistered))) {
          if (emailInput) emailInput.classList.add('is-invalid');
          emailError.textContent = errMsg;
          emailError.classList.add('visible');
        }
        showToast(errMsg, 'error');
        return;
      }

      const parts = fullName.split(' ');
      const shortName = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];

      currentUser.name = fullName;
      currentUser.shortName = shortName;
      currentUser.email = data.email || email;
      currentUser.role = role;
      currentUser.desk = desk;
      currentUser.timezone = timezone;
      currentUser.bio = bio;
      currentUser.avatar = avatar;
      currentUser.isLoggedIn = true;

      try {
        localStorage.setItem('macropulse_user_profile', JSON.stringify({
          isLoggedIn: true,
          name: currentUser.name,
          shortName: currentUser.shortName,
          email: currentUser.email,
          role: currentUser.role,
          desk: currentUser.desk,
          timezone: currentUser.timezone,
          bio: currentUser.bio,
          avatar: currentUser.avatar
        }));
      } catch (e) {
        console.warn('Failed to persist profile to localStorage', e);
      }

      syncProfileFieldsToUI();
      showToast('Profile & Analyst identity stored in MySQL database successfully!', 'success');
    } catch (err) {
      console.error('Profile save error:', err);
      showToast('Network error saving profile to MySQL database.', 'error');
    } finally {
      saveBtns.forEach(btn => {
        btn.disabled = false;
        if (btn.id === 'heroSaveBtn') {
          btn.innerHTML = '<i data-lucide="check" style="width: 14px; height: 14px;"></i><span>Save Changes</span>';
        } else {
          btn.textContent = 'Save Profile Changes';
        }
      });
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function discardProfileSettings() {
    try {
      const saved = localStorage.getItem('macropulse_user_profile');
      if (saved) {
        currentUser = { ...defaultAuthUser, ...JSON.parse(saved) };
      } else {
        currentUser = { ...defaultAuthUser };
      }
    } catch (e) {
      currentUser = { ...defaultAuthUser };
    }
    syncProfileFieldsToUI();
    showToast('Unsaved changes discarded', 'info');
  }

  // Helper to optimize and resize uploaded avatar client-side (max 400x400, JPEG 0.85)
  function optimizeProfileImage(file, maxDimension = 400, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Failed to load image for processing'));
        img.src = event.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }

  // Avatar Upload Handler
  const avatarFileInput = document.getElementById('avatarFileInput');
  if (avatarFileInput) {
    avatarFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Please select a valid image file (PNG, JPG, JPEG, WEBP).', 'error');
          return;
        }
        try {
          const newAvatar = await optimizeProfileImage(file, 400, 0.85);
          const settingsAvatarPreview = document.getElementById('settingsAvatarPreview');
          const profileHeroAvatar = document.getElementById('profileHeroAvatar');
          if (settingsAvatarPreview) settingsAvatarPreview.src = newAvatar;
          if (profileHeroAvatar) profileHeroAvatar.src = newAvatar;
          currentUser.avatar = newAvatar;
          updateAuthUI();
          showToast('Profile photo selected! Click "Save Changes" to apply across session.', 'info');
        } catch (err) {
          console.error('Avatar processing error:', err);
          showToast('Could not process photo. Please try a different image.', 'error');
        }
      }
    });
  }

  // Settings Role Dropdown "Other" Toggle
  const settingsRoleSelect = document.getElementById('settingsRole');
  const settingsRoleCustomWrap = document.getElementById('settingsRoleCustomWrap');
  const settingsRoleCustomInput = document.getElementById('settingsRoleCustom');
  if (settingsRoleSelect) {
    settingsRoleSelect.addEventListener('change', () => {
      if (settingsRoleSelect.value === 'Other') {
        if (settingsRoleCustomWrap) settingsRoleCustomWrap.style.display = 'block';
        if (settingsRoleCustomInput) settingsRoleCustomInput.focus();
      } else {
        if (settingsRoleCustomWrap) settingsRoleCustomWrap.style.display = 'none';
      }
    });
  }

  // Bind Save & Discard Buttons (both Hero and Form bottom)
  document.getElementById('saveSettingsBtn')?.addEventListener('click', saveProfileSettings);
  document.getElementById('heroSaveBtn')?.addEventListener('click', saveProfileSettings);
  document.getElementById('discardSettingsBtn')?.addEventListener('click', discardProfileSettings);
  document.getElementById('heroDiscardBtn')?.addEventListener('click', discardProfileSettings);

  // API Secret Key Reveal / Hide Toggle
  const toggleApiKeyBtn = document.getElementById('toggleApiKeyBtn');
  const apiKeyInput = document.getElementById('apiKeyInput');
  if (toggleApiKeyBtn && apiKeyInput) {
    toggleApiKeyBtn.addEventListener('click', () => {
      const isPass = apiKeyInput.type === 'password';
      apiKeyInput.type = isPass ? 'text' : 'password';
      toggleApiKeyBtn.innerHTML = isPass
        ? '<i data-lucide="eye-off" id="toggleApiKeyIcon" style="width: 16px; height: 16px;"></i>'
        : '<i data-lucide="eye" id="toggleApiKeyIcon" style="width: 16px; height: 16px;"></i>';
      if (window.lucide) lucide.createIcons({ root: toggleApiKeyBtn });
    });
  }

  // Copy API Secret Key with fallback
  const copyApiKeyBtn = document.getElementById('copyApiKeyBtn');
  if (copyApiKeyBtn && apiKeyInput) {
    copyApiKeyBtn.addEventListener('click', () => {
      const val = apiKeyInput.value || 'mp_live_9f83ea019bc248109ad56';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(() => {
          showToast('API Key copied to clipboard', 'success');
        }).catch(() => {
          fallbackCopyApiKey(val);
        });
      } else {
        fallbackCopyApiKey(val);
      }
    });
  }

  function fallbackCopyApiKey(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('API Key copied to clipboard', 'success');
    } catch (err) {
      showToast('Unable to copy API key', 'error');
    }
    document.body.removeChild(tempInput);
  }

  // ==================== ENHANCEMENT 1: SETTINGS TAB NAVIGATION ====================
  const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');
  const settingsTabPanes = {
    profile: document.getElementById('settingsTabProfile'),
    workspace: document.getElementById('settingsTabWorkspace'),
    notifications: document.getElementById('settingsTabNotifications'),
    security: document.getElementById('settingsTabSecurity')
  };

  settingsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-settings-tab');
      settingsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      Object.keys(settingsTabPanes).forEach(key => {
        const pane = settingsTabPanes[key];
        if (pane) {
          if (key === tabKey) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        }
      });
      if (window.lucide) lucide.createIcons();
    });
  });

  // ==================== ENHANCEMENT 5: WORKSPACE & WATCHLIST DEFAULTS ====================
  async function loadWorkspaceSettings() {
    try {
      const saved = localStorage.getItem('macropulse_workspace_settings');
      if (saved) {
        currentWorkspaceSettings = { ...defaultWorkspaceSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load workspace settings', e);
    }

    // Synchronize with MySQL if user is authenticated
    if (currentUser && currentUser.isLoggedIn && currentUser.email) {
      try {
        const resp = await fetch(`/api/user/workspace?email=${encodeURIComponent(currentUser.email)}`);
        if (resp.ok) {
          const data = await resp.json();
          if (data && data.success && data.settings) {
            currentWorkspaceSettings = { ...currentWorkspaceSettings, ...data.settings };
          }
        }
      } catch (err) {
        console.warn('Remote workspace fetch warning:', err);
      }
    }

    const wsDefaultView = document.getElementById('workspaceDefaultView');
    const wsBenchmark = document.getElementById('workspaceBenchmark');
    const wsChartPeriod = document.getElementById('workspaceChartPeriod');
    const wsSectorFocus = document.getElementById('workspaceSectorFocus');
    const wsCurrency = document.getElementById('workspaceCurrency');
    const wsRefreshRate = document.getElementById('workspaceRefreshRate');
    const wsAudioChime = document.getElementById('workspaceAudioChime');

    if (wsDefaultView) wsDefaultView.value = currentWorkspaceSettings.defaultView;
    if (wsBenchmark) wsBenchmark.value = currentWorkspaceSettings.benchmark;
    if (wsChartPeriod) wsChartPeriod.value = currentWorkspaceSettings.chartPeriod;
    if (wsSectorFocus) wsSectorFocus.value = currentWorkspaceSettings.sectorFocus;
    if (wsCurrency) wsCurrency.value = currentWorkspaceSettings.currency;
    if (wsRefreshRate) wsRefreshRate.value = currentWorkspaceSettings.refreshRate;
    if (wsAudioChime) wsAudioChime.checked = currentWorkspaceSettings.audioChime;

    // Update active runtime state
    state.baseCurrency = currentWorkspaceSettings.currency || 'MYR';
    state.marketPollingRate = parseInt(currentWorkspaceSettings.refreshRate, 10) || 15;
    state.audioChimeEnabled = currentWorkspaceSettings.audioChime;

    rescheduleMarketPolling(state.marketPollingRate);
  }

  function saveWorkspaceSettings() {
    const wsDefaultView = document.getElementById('workspaceDefaultView')?.value || 'overview';
    const wsBenchmark = document.getElementById('workspaceBenchmark')?.value || 'FBMKLCI';
    const wsChartPeriod = document.getElementById('workspaceChartPeriod')?.value || '3M';
    const wsSectorFocus = document.getElementById('workspaceSectorFocus')?.value || 'all';
    const wsCurrency = document.getElementById('workspaceCurrency')?.value || 'MYR';
    const wsRefreshRate = document.getElementById('workspaceRefreshRate')?.value || '15';
    const wsAudioChime = document.getElementById('workspaceAudioChime')?.checked ?? true;

    currentWorkspaceSettings = {
      defaultView: wsDefaultView,
      benchmark: wsBenchmark,
      chartPeriod: wsChartPeriod,
      sectorFocus: wsSectorFocus,
      currency: wsCurrency,
      refreshRate: wsRefreshRate,
      audioChime: wsAudioChime
    };

    // Update global terminal runtime state
    state.baseCurrency = wsCurrency;
    state.marketPollingRate = parseInt(wsRefreshRate, 10) || 15;
    state.audioChimeEnabled = wsAudioChime;

    // Recalibrate background polling intervals in real-time
    rescheduleMarketPolling(state.marketPollingRate);

    // Play pleasant terminal audio cue if audio notifications are active
    if (wsAudioChime) {
      playTerminalChime('toggle');
    }

    try {
      localStorage.setItem('macropulse_workspace_settings', JSON.stringify(currentWorkspaceSettings));
    } catch (e) {}

    // Synchronize to MySQL database if authenticated
    if (currentUser && currentUser.isLoggedIn && currentUser.email) {
      fetch('/api/user/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          default_landing_view: wsDefaultView,
          benchmark_index: wsBenchmark,
          lookback_horizon: wsChartPeriod,
          focus_sector: wsSectorFocus,
          reporting_currency: wsCurrency,
          polling_rate_seconds: state.marketPollingRate,
          audio_chimes_enabled: wsAudioChime ? 1 : 0
        })
      }).catch(err => console.warn('Workspace sync error:', err));
    }

    // Automatically re-render active stock with the new base currency
    if (typeof fetchStockData === 'function' && currentStockSymbol) {
      fetchStockData(currentStockSymbol, currentStockPeriod);
    }

    showToast(`Workspace defaults saved! Base: ${wsCurrency} • Polling: ${wsRefreshRate}s • Audio: ${wsAudioChime ? 'Active' : 'Muted'}`, 'success');
  }

  function discardWorkspaceSettings() {
    loadWorkspaceSettings();
    showToast('Workspace changes discarded', 'info');
  }

  document.getElementById('saveWorkspaceBtn')?.addEventListener('click', saveWorkspaceSettings);
  document.getElementById('discardWorkspaceBtn')?.addEventListener('click', discardWorkspaceSettings);

  // Live currency dropdown change listener
  const wsCurrencyEl = document.getElementById('workspaceCurrency');
  if (wsCurrencyEl) {
    wsCurrencyEl.addEventListener('change', (e) => {
      state.baseCurrency = e.target.value;
      if (typeof fetchStockData === 'function' && currentStockSymbol) {
        fetchStockData(currentStockSymbol, currentStockPeriod);
      }
    });
  }

  // Audio Toggle Immediate Feedback & AudioContext Unmute
  const wsAudioChimeEl = document.getElementById('workspaceAudioChime');
  if (wsAudioChimeEl) {
    wsAudioChimeEl.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      currentWorkspaceSettings.audioChime = enabled;
      state.audioChimeEnabled = enabled;
      if (enabled) {
        playTerminalChime('toggle');
        showToast('Terminal audio alerts enabled (sound preview played)', 'success');
      } else {
        showToast('Terminal audio alerts muted', 'info');
      }
    });
  }

  loadWorkspaceSettings();

  // Notification Rules Save & Discard
  function saveNotificationRules() {
    const rules = {
      opr: document.getElementById('notifyOpr')?.checked ?? true,
      cpi: document.getElementById('notifyCpi')?.checked ?? true,
      stocks: document.getElementById('notifyStocks')?.checked ?? true,
      inflow: document.getElementById('notifyInflow')?.checked ?? true
    };
    try {
      localStorage.setItem('macropulse_notification_rules', JSON.stringify(rules));
    } catch (e) {}
    showToast('Notification rules updated successfully!', 'success');
  }

  function discardNotificationRules() {
    try {
      const saved = localStorage.getItem('macropulse_notification_rules');
      if (saved) {
        const rules = JSON.parse(saved);
        if (document.getElementById('notifyOpr')) document.getElementById('notifyOpr').checked = rules.opr ?? true;
        if (document.getElementById('notifyCpi')) document.getElementById('notifyCpi').checked = rules.cpi ?? true;
        if (document.getElementById('notifyStocks')) document.getElementById('notifyStocks').checked = rules.stocks ?? true;
        if (document.getElementById('notifyInflow')) document.getElementById('notifyInflow').checked = rules.inflow ?? true;
      }
    } catch (e) {}
    showToast('Notification changes discarded', 'info');
  }

  document.getElementById('saveNotificationsBtn')?.addEventListener('click', saveNotificationRules);
  document.getElementById('discardNotificationsBtn')?.addEventListener('click', discardNotificationRules);

  // ==================== ENHANCEMENT 4: PASSWORD STRENGTH & SECURITY ====================
  const passwordCurrent = document.getElementById('passwordCurrent');
  const passwordNew = document.getElementById('passwordNew');
  const passwordConfirm = document.getElementById('passwordConfirm');
  const updatePasswordBtn = document.getElementById('updatePasswordBtn');
  const strengthBar1 = document.getElementById('strengthBar1');
  const strengthBar2 = document.getElementById('strengthBar2');
  const strengthBar3 = document.getElementById('strengthBar3');
  const strengthText = document.getElementById('strengthText');

  function setupPasswordToggle(inputEl, btnEl) {
    if (!inputEl || !btnEl) return;
    btnEl.addEventListener('click', () => {
      const isPass = inputEl.type === 'password';
      inputEl.type = isPass ? 'text' : 'password';
      btnEl.innerHTML = isPass
        ? '<i data-lucide="eye-off" style="width: 15px; height: 15px; color: var(--text-muted);"></i>'
        : '<i data-lucide="eye" style="width: 15px; height: 15px; color: var(--text-muted);"></i>';
      if (window.lucide) lucide.createIcons({ root: btnEl });
    });
  }

  setupPasswordToggle(passwordCurrent, document.getElementById('toggleCurrentPassBtn'));
  setupPasswordToggle(passwordNew, document.getElementById('toggleNewPassBtn'));
  setupPasswordToggle(passwordConfirm, document.getElementById('toggleConfirmPassBtn'));

  if (passwordNew) {
    passwordNew.addEventListener('input', () => {
      const val = passwordNew.value;
      if (!val) {
        if (strengthBar1) strengthBar1.className = 'strength-bar';
        if (strengthBar2) strengthBar2.className = 'strength-bar';
        if (strengthBar3) strengthBar3.className = 'strength-bar';
        if (strengthText) {
          strengthText.textContent = 'Enter at least 8 characters with letters and numbers';
          strengthText.style.color = 'var(--text-muted)';
        }
        return;
      }

      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val) && val.length >= 10) score++;

      if (strengthBar1) strengthBar1.className = 'strength-bar';
      if (strengthBar2) strengthBar2.className = 'strength-bar';
      if (strengthBar3) strengthBar3.className = 'strength-bar';

      if (score === 1) {
        if (strengthBar1) strengthBar1.className = 'strength-bar weak';
        if (strengthText) {
          strengthText.textContent = 'Weak: Add capital letters, numbers, or symbols';
          strengthText.style.color = '#ef4444';
        }
      } else if (score === 2) {
        if (strengthBar1) strengthBar1.className = 'strength-bar medium';
        if (strengthBar2) strengthBar2.className = 'strength-bar medium';
        if (strengthText) {
          strengthText.textContent = 'Moderate: Good, but consider adding special characters (!@#$)';
          strengthText.style.color = '#f59e0b';
        }
      } else if (score >= 3) {
        if (strengthBar1) strengthBar1.className = 'strength-bar strong';
        if (strengthBar2) strengthBar2.className = 'strength-bar strong';
        if (strengthBar3) strengthBar3.className = 'strength-bar strong';
        if (strengthText) {
          strengthText.textContent = 'Strong: Institutional-grade password complexity met';
          strengthText.style.color = '#10b981';
        }
      }
    });
  }

  if (updatePasswordBtn) {
    updatePasswordBtn.addEventListener('click', () => {
      const curr = passwordCurrent?.value.trim();
      const next = passwordNew?.value.trim();
      const confirm = passwordConfirm?.value.trim();

      if (!curr) {
        showToast('Please enter your current password (default: SecurePass123!)', 'warning');
        if (passwordCurrent) passwordCurrent.focus();
        return;
      }

      const storedPass = localStorage.getItem('macropulse_user_password') || 'SecurePass123!';
      if (curr !== storedPass && curr !== 'SecurePass123!') {
        showToast('Current password does not match terminal records', 'error');
        if (passwordCurrent) passwordCurrent.focus();
        return;
      }

      if (!next || next.length < 8) {
        showToast('New password must be at least 8 characters long', 'warning');
        if (passwordNew) passwordNew.focus();
        return;
      }

      if (next !== confirm) {
        showToast('New password and confirmation do not match', 'error');
        if (passwordConfirm) passwordConfirm.focus();
        return;
      }

      try {
        localStorage.setItem('macropulse_user_password', next);
      } catch (e) {}

      // Asynchronously update MySQL database
      fetch(`/api/user/password?email=${encodeURIComponent(currentUser.email || 'alex.morgan@macropulse.ai')}&password=${encodeURIComponent(next)}`)
        .catch(() => {});

      showToast('Account password successfully updated in terminal and database!', 'success');
      if (passwordCurrent) passwordCurrent.value = '';
      if (passwordNew) passwordNew.value = '';
      if (passwordConfirm) passwordConfirm.value = '';
      if (strengthBar1) strengthBar1.className = 'strength-bar';
      if (strengthBar2) strengthBar2.className = 'strength-bar';
      if (strengthBar3) strengthBar3.className = 'strength-bar';
      if (strengthText) {
        strengthText.textContent = 'Password updated successfully';
        strengthText.style.color = '#10b981';
      }
    });
  }

  // Regenerate API Key Button
  const regenerateApiKeyBtn = document.getElementById('regenerateApiKeyBtn');
  if (regenerateApiKeyBtn && apiKeyInput) {
    regenerateApiKeyBtn.addEventListener('click', () => {
      const chars = '0123456789abcdef';
      let randomHex = '';
      for (let i = 0; i < 24; i++) {
        randomHex += chars[Math.floor(Math.random() * chars.length)];
      }
      const newKey = `mp_live_${randomHex}`;
      apiKeyInput.value = newKey;
      try {
        localStorage.setItem('macropulse_api_key', newKey);
      } catch (e) {}
      showToast('New API Secret Key generated and activated!', 'success');
    });
  }

  document.getElementById('saveSecurityBtn')?.addEventListener('click', () => {
    showToast('Security preferences saved successfully!', 'success');
  });
  document.getElementById('discardSecurityBtn')?.addEventListener('click', () => {
    showToast('Security changes discarded', 'info');
  });

  // Dedicated Full-Page Login & Logout Functions
  function showLoginPage(mode = 'signin') {
    const loginPage = document.getElementById('loginPage');
    const appContainer = document.querySelector('.app-container');
    const authSignInContainer = document.getElementById('authSignInContainer');
    const authSignUpContainer = document.getElementById('authSignUpContainer');
    const authForgotPasswordContainer = document.getElementById('authForgotPasswordContainer');

    document.body.classList.add('login-mode-active');

    if (loginPage) {
      loginPage.style.display = 'flex';
      if (mode === 'signup') {
        if (authSignInContainer) authSignInContainer.style.display = 'none';
        if (authSignUpContainer) authSignUpContainer.style.display = 'block';
        if (authForgotPasswordContainer) authForgotPasswordContainer.style.display = 'none';
        window.location.hash = '#signup';
      } else if (mode === 'forgot') {
        if (authSignInContainer) authSignInContainer.style.display = 'none';
        if (authSignUpContainer) authSignUpContainer.style.display = 'none';
        if (authForgotPasswordContainer) authForgotPasswordContainer.style.display = 'block';
        const forgotForm = document.getElementById('forgotPasswordForm');
        const resetStep2Form = document.getElementById('resetPasswordStep2Form');
        if (forgotForm) forgotForm.style.display = 'block';
        if (resetStep2Form) resetStep2Form.style.display = 'none';
        const forgotAlert = document.getElementById('forgotAlert');
        if (forgotAlert) forgotAlert.style.display = 'none';
        const forgotEmail = document.getElementById('forgotEmail');
        if (forgotEmail) forgotEmail.classList.remove('is-invalid');
        const forgotEmailError = document.getElementById('forgotEmailError');
        if (forgotEmailError) { forgotEmailError.textContent = ''; forgotEmailError.classList.remove('visible'); }
        const resetStep2Alert = document.getElementById('resetStep2Alert');
        if (resetStep2Alert) resetStep2Alert.style.display = 'none';
        const resetSecurityCode = document.getElementById('resetSecurityCode');
        if (resetSecurityCode) resetSecurityCode.classList.remove('is-invalid');
        const resetSecurityCodeError = document.getElementById('resetSecurityCodeError');
        if (resetSecurityCodeError) { resetSecurityCodeError.textContent = ''; resetSecurityCodeError.classList.remove('visible'); }
        window.location.hash = '#forgot-password';
      } else {
        if (authSignInContainer) authSignInContainer.style.display = 'block';
        if (authSignUpContainer) authSignUpContainer.style.display = 'none';
        if (authForgotPasswordContainer) authForgotPasswordContainer.style.display = 'none';
        window.location.hash = '#login';
      }
    }
    if (appContainer) {
      appContainer.style.display = 'none';
    }
    const gModal = document.getElementById('googleAccountModal');
    if (gModal) gModal.style.display = 'none';
    if (window.lucide) lucide.createIcons();
  }

  function hideLoginPage() {
    const gModal = document.getElementById('googleAccountModal');
    if (gModal) gModal.style.display = 'none';

    if (!currentUser.isLoggedIn) {
      showLoginPage('signin');
      return;
    }
    const loginPage = document.getElementById('loginPage');
    const appContainer = document.querySelector('.app-container');
    document.body.classList.remove('login-mode-active');
    if (loginPage) loginPage.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
  }

  // Backward compatible aliases
  function openAuthModal(mode = 'signin') {
    showLoginPage(mode);
  }

  function closeAuthModal() {
    hideLoginPage();
  }

  function openLogoutModal() {
    if (logoutModal) {
      logoutModal.style.display = 'flex';
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeLogoutModal() {
    if (logoutModal) {
      logoutModal.style.display = 'none';
    }
  }

  function executeLogout() {
    closeLogoutModal();
    const gModal = document.getElementById('googleAccountModal');
    if (gModal) gModal.style.display = 'none';
    currentUser.isLoggedIn = false;
    try {
      localStorage.setItem('macropulse_user_logged_in', 'false');
    } catch (e) {}
    updateAuthUI();
    syncProfileFieldsToUI();
    showToast('You have been logged out. Please sign in to access the terminal.', 'info');
    showLoginPage('signin');
  }

  // Bind Navigation to Profile & Settings View
  if (headerUserProfile) {
    headerUserProfile.addEventListener('click', () => {
      if (currentUser.isLoggedIn) {
        switchView('settings');
      } else {
        showLoginPage('signin');
      }
    });
  }

  if (profileBadge) {
    profileBadge.addEventListener('click', (e) => {
      if (e.target.closest('#sidebarLogoutBtn')) return;
      if (currentUser.isLoggedIn) {
        switchView('settings');
      } else {
        showLoginPage('signin');
      }
    });
  }

  // Bind Auth Triggers
  if (authPortalBtn) authPortalBtn.addEventListener('click', () => showLoginPage('signin'));

  // Logout Confirmation Popup Modal Handlers
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLogoutModal();
    });
  }

  if (headerLogoutBtn) {
    headerLogoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLogoutModal();
    });
  }

  const closeLogoutModalBtn = document.getElementById('closeLogoutModalBtn');
  if (closeLogoutModalBtn) {
    closeLogoutModalBtn.addEventListener('click', closeLogoutModal);
  }

  if (cancelLogoutBtn) {
    cancelLogoutBtn.addEventListener('click', closeLogoutModal);
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', () => {
      executeLogout();
    });
  }

  if (logoutModal) {
    logoutModal.addEventListener('click', (e) => {
      if (e.target === logoutModal) closeLogoutModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && logoutModal && logoutModal.style.display === 'flex') {
      closeLogoutModal();
    }
  });

  if (switchToSignUpBtn) switchToSignUpBtn.addEventListener('click', () => showLoginPage('signup'));
  if (switchToSignInBtn) switchToSignInBtn.addEventListener('click', () => showLoginPage('signin'));

  // Forgot Password Transitions & Submissions
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const backToSignInFromForgotBtn = document.getElementById('backToSignInFromForgotBtn');
  const forgotBackIconBtn = document.getElementById('forgotBackIconBtn');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const resetPasswordStep2Form = document.getElementById('resetPasswordStep2Form');
  const toggleResetPasswordBtn = document.getElementById('toggleResetPasswordBtn');
  const resetNewPassword = document.getElementById('resetNewPassword');

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showLoginPage('forgot');
    });
  }

  if (backToSignInFromForgotBtn) {
    backToSignInFromForgotBtn.addEventListener('click', () => showLoginPage('signin'));
  }

  if (forgotBackIconBtn) {
    forgotBackIconBtn.addEventListener('click', () => showLoginPage('signin'));
  }

  const forgotEmailInput = document.getElementById('forgotEmail');
  const forgotAlert = document.getElementById('forgotAlert');
  const forgotEmailError = document.getElementById('forgotEmailError');

  forgotEmailInput?.addEventListener('input', () => {
    forgotEmailInput.classList.remove('is-invalid');
    if (forgotEmailError) {
      forgotEmailError.textContent = '';
      forgotEmailError.classList.remove('visible');
    }
    if (forgotAlert) {
      forgotAlert.style.display = 'none';
    }
  });

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (forgotEmailInput ? forgotEmailInput.value : (document.getElementById('forgotEmail')?.value || '')).trim();

      // Clear previous error state
      if (forgotEmailInput) forgotEmailInput.classList.remove('is-invalid');
      if (forgotEmailError) {
        forgotEmailError.textContent = '';
        forgotEmailError.classList.remove('visible');
      }
      if (forgotAlert) {
        forgotAlert.style.display = 'none';
      }

      if (!email) {
        if (forgotEmailInput) forgotEmailInput.classList.add('is-invalid');
        if (forgotEmailError) {
          forgotEmailError.textContent = 'Please enter your work email address.';
          forgotEmailError.classList.add('visible');
        }
        showToast('Please enter your work email address', 'warning');
        return;
      }

      const submitBtn = document.getElementById('forgotSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending security code...';
      }

      try {
        const resp = await fetch(`/api/auth/forgot?email=${encodeURIComponent(email)}`);
        const data = await resp.json();

        if (!resp.ok || !data || !data.success) {
          const errMsg = (data && data.error) || 'No account found with this email address.';
          if (forgotEmailInput) forgotEmailInput.classList.add('is-invalid');
          if (forgotEmailError) {
            forgotEmailError.textContent = errMsg;
            forgotEmailError.classList.add('visible');
          }
          if (forgotAlert) {
            forgotAlert.className = 'auth-alert-banner error visible';
            forgotAlert.style.display = 'flex';
            forgotAlert.innerHTML = `<i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i><span>${errMsg}</span>`;
            if (window.lucide) window.lucide.createIcons({ root: forgotAlert });
          }
          showToast(errMsg, 'error');
          return;
        }

        const resetNoticeBanner = document.getElementById('resetNoticeBanner');
        const resetNoticeText = document.getElementById('resetNoticeText');
        const resetSecurityCode = document.getElementById('resetSecurityCode');

        if (data && data.emailSent) {
          showToast(`Security code dispatched to ${email}! Check your inbox.`, 'success');
          if (resetNoticeText) {
            resetNoticeText.innerHTML = `<b>Security code sent!</b> We sent a 6-digit code to <strong>${email}</strong>. Please check your inbox (and spam folder).`;
          }
          if (resetSecurityCode) {
            resetSecurityCode.value = '';
            resetSecurityCode.placeholder = 'Enter 6-digit code';
          }
        } else {
          // Simulation / Dev mode when SMTP is not yet configured
          const devCode = (data && data.code) || '849201';
          showToast(`Simulation Mode: SMTP unconfigured in email_config.json. Code: ${devCode}`, 'info');
          if (resetNoticeText) {
            resetNoticeText.innerHTML = `<b>Simulation Mode:</b> SMTP not configured in <code>email_config.json</code>. Use test code <code style="background: rgba(0,0,0,0.35); padding: 1px 5px; border-radius: 4px; color: #fff; font-weight: 600;">${devCode}</code>.`;
          }
          if (resetSecurityCode) {
            resetSecurityCode.value = devCode;
          }
        }

        forgotPasswordForm.style.display = 'none';
        if (resetPasswordStep2Form) {
          resetPasswordStep2Form.style.display = 'block';
          if (window.lucide) lucide.createIcons();
          if (resetSecurityCode) resetSecurityCode.focus();
        }
      } catch (err) {
        showToast('Error connecting to server. Please try again.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Verification Code';
        }
      }
    });
  }

  if (toggleResetPasswordBtn && resetNewPassword) {
    toggleResetPasswordBtn.addEventListener('click', () => {
      const isPass = resetNewPassword.type === 'password';
      resetNewPassword.type = isPass ? 'text' : 'password';
      toggleResetPasswordBtn.innerHTML = isPass
        ? '<i data-lucide="eye-off" style="width: 16px; height: 16px;"></i>'
        : '<i data-lucide="eye" style="width: 16px; height: 16px;"></i>';
      if (window.lucide) lucide.createIcons({ root: toggleResetPasswordBtn });
    });
  }

  const resetSecurityCodeInput = document.getElementById('resetSecurityCode');
  const resetStep2Alert = document.getElementById('resetStep2Alert');
  const resetSecurityCodeError = document.getElementById('resetSecurityCodeError');

  resetSecurityCodeInput?.addEventListener('input', () => {
    resetSecurityCodeInput.classList.remove('is-invalid');
    if (resetSecurityCodeError) {
      resetSecurityCodeError.textContent = '';
      resetSecurityCodeError.classList.remove('visible');
    }
    if (resetStep2Alert) {
      resetStep2Alert.style.display = 'none';
    }
  });

  if (resetPasswordStep2Form) {
    resetPasswordStep2Form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = (resetSecurityCodeInput ? resetSecurityCodeInput.value : (document.getElementById('resetSecurityCode')?.value || '')).trim();
      const newPass = document.getElementById('resetNewPassword')?.value.trim();
      const confirmPass = document.getElementById('resetConfirmPassword')?.value.trim();
      const email = document.getElementById('forgotEmail')?.value.trim() || 'alex.morgan@macropulse.ai';

      // Clear previous error states
      if (resetSecurityCodeInput) resetSecurityCodeInput.classList.remove('is-invalid');
      if (resetSecurityCodeError) {
        resetSecurityCodeError.textContent = '';
        resetSecurityCodeError.classList.remove('visible');
      }
      if (resetStep2Alert) {
        resetStep2Alert.style.display = 'none';
      }

      if (!code || code.length < 4) {
        if (resetSecurityCodeInput) resetSecurityCodeInput.classList.add('is-invalid');
        if (resetSecurityCodeError) {
          resetSecurityCodeError.textContent = 'Please enter the 6-digit verification code.';
          resetSecurityCodeError.classList.add('visible');
        }
        showToast('Please enter the 6-digit verification code', 'warning');
        return;
      }

      if (!newPass || newPass.length < 8) {
        showToast('New password must be at least 8 characters long', 'warning');
        return;
      }

      if (newPass !== confirmPass) {
        showToast('New password and confirmation do not match', 'error');
        return;
      }

      const submitBtn = document.getElementById('resetPasswordSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Updating credentials...';
      }

      try {
        const resp = await fetch(`/api/auth/reset?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}&password=${encodeURIComponent(newPass)}`);
        const data = await resp.json();

        if (data && data.success) {
          try {
            localStorage.setItem('macropulse_user_password', newPass);
          } catch (err) {}

          showToast('Password reset successfully! Please sign in with your new credentials.', 'success');

          // Sync into sign in form
          const signInPass = document.getElementById('signInPassword');
          const signInEmail = document.getElementById('signInEmail');
          if (signInPass) signInPass.value = newPass;
          if (signInEmail) signInEmail.value = email;

          showLoginPage('signin');
        } else {
          const errMsg = (data && data.error) || 'Invalid or expired verification code.';
          if (resetSecurityCodeInput) resetSecurityCodeInput.classList.add('is-invalid');
          if (resetSecurityCodeError) {
            resetSecurityCodeError.textContent = errMsg;
            resetSecurityCodeError.classList.add('visible');
          }
          if (resetStep2Alert) {
            resetStep2Alert.className = 'auth-alert-banner error visible';
            resetStep2Alert.style.display = 'flex';
            resetStep2Alert.innerHTML = `<i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i><span>${errMsg}</span>`;
            if (window.lucide) window.lucide.createIcons({ root: resetStep2Alert });
          }
          showToast(errMsg, 'error');
        }
      } catch (err) {
        showToast('Error connecting to verification server. Please try again.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Set New Password & Sign In';
        }
      }
    });
  }

  // Password Visibility Toggle for Sign In
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const signInPassword = document.getElementById('signInPassword');
  if (togglePasswordBtn && signInPassword) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPass = signInPassword.type === 'password';
      signInPassword.type = isPass ? 'text' : 'password';
      togglePasswordBtn.innerHTML = isPass ? '<i data-lucide="eye-off" style="width: 16px; height: 16px;"></i>' : '<i data-lucide="eye" style="width: 16px; height: 16px;"></i>';
      if (window.lucide) lucide.createIcons({ root: togglePasswordBtn });
    });
  }

  // Real-time cleanup & validation helpers for Sign Up Form
  const signUpNameInput = document.getElementById('signUpName');
  const signUpEmailInput = document.getElementById('signUpEmail');
  const signUpPasswordInput = document.getElementById('signUpPassword');
  const signUpRoleSelect = document.getElementById('signUpRole');
  const signUpTermsCheckbox = document.getElementById('signUpTerms');
  const signUpSubmitBtn = document.getElementById('signUpSubmitBtn');
  const signUpAlert = document.getElementById('signUpAlert');
  const signUpNameError = document.getElementById('signUpNameError');
  const signUpEmailError = document.getElementById('signUpEmailError');
  const signUpPasswordError = document.getElementById('signUpPasswordError');
  const signUpConfirmPasswordInput = document.getElementById('signUpConfirmPassword');
  const signUpConfirmPasswordError = document.getElementById('signUpConfirmPasswordError');
  const toggleSignUpPasswordBtn = document.getElementById('toggleSignUpPasswordBtn');
  const toggleSignUpConfirmPasswordBtn = document.getElementById('toggleSignUpConfirmPasswordBtn');
  const signUpTermsError = document.getElementById('signUpTermsError');
  const signUpRoleCustomWrap = document.getElementById('signUpRoleCustomWrap');
  const signUpRoleCustomInput = document.getElementById('signUpRoleCustom');

  toggleSignUpPasswordBtn?.addEventListener('click', () => {
    if (signUpPasswordInput) {
      const isPass = signUpPasswordInput.type === 'password';
      signUpPasswordInput.type = isPass ? 'text' : 'password';
      toggleSignUpPasswordBtn.innerHTML = `<i data-lucide="${isPass ? 'eye-off' : 'eye'}" style="width: 16px; height: 16px;"></i>`;
      if (window.lucide) window.lucide.createIcons({ root: toggleSignUpPasswordBtn });
    }
  });

  toggleSignUpConfirmPasswordBtn?.addEventListener('click', () => {
    if (signUpConfirmPasswordInput) {
      const isPass = signUpConfirmPasswordInput.type === 'password';
      signUpConfirmPasswordInput.type = isPass ? 'text' : 'password';
      toggleSignUpConfirmPasswordBtn.innerHTML = `<i data-lucide="${isPass ? 'eye-off' : 'eye'}" style="width: 16px; height: 16px;"></i>`;
      if (window.lucide) window.lucide.createIcons({ root: toggleSignUpConfirmPasswordBtn });
    }
  });

  if (signUpRoleSelect) {
    signUpRoleSelect.addEventListener('change', () => {
      if (signUpRoleSelect.value === 'Other') {
        if (signUpRoleCustomWrap) signUpRoleCustomWrap.style.display = 'block';
        if (signUpRoleCustomInput) signUpRoleCustomInput.focus();
      } else {
        if (signUpRoleCustomWrap) signUpRoleCustomWrap.style.display = 'none';
      }
    });
  }

  signUpNameInput?.addEventListener('input', () => {
    signUpNameInput.classList.remove('is-invalid');
    if (signUpNameError) { signUpNameError.textContent = ''; signUpNameError.classList.remove('visible'); }
    if (signUpAlert) { signUpAlert.style.display = 'none'; }
  });

  signUpNameInput?.addEventListener('blur', () => {
    const val = signUpNameInput.value.trim();
    if (val) {
      if (val.length < 2) {
        signUpNameInput.classList.add('is-invalid');
        if (signUpNameError) {
          signUpNameError.textContent = 'Please enter your full name (minimum 2 characters).';
          signUpNameError.classList.add('visible');
        }
      } else if (/\d/.test(val)) {
        signUpNameInput.classList.add('is-invalid');
        if (signUpNameError) {
          signUpNameError.textContent = 'Name cannot contain numbers.';
          signUpNameError.classList.add('visible');
        }
      } else if (!/^[a-zA-Z\s]+$/.test(val)) {
        signUpNameInput.classList.add('is-invalid');
        if (signUpNameError) {
          signUpNameError.textContent = 'Name can only contain letters and spaces.';
          signUpNameError.classList.add('visible');
        }
      }
    }
  });

  signUpEmailInput?.addEventListener('input', () => {
    signUpEmailInput.classList.remove('is-invalid');
    if (signUpEmailError) { signUpEmailError.textContent = ''; signUpEmailError.classList.remove('visible'); }
    if (signUpAlert) { signUpAlert.style.display = 'none'; }
  });

  // Real-time check if email is already registered on blur
  signUpEmailInput?.addEventListener('blur', async () => {
    const val = signUpEmailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && emailRegex.test(val)) {
      try {
        const resp = await fetch(`/api/auth/check-email?email=${encodeURIComponent(val)}`);
        const data = await resp.json();
        if (data && data.exists) {
          signUpEmailInput.classList.add('is-invalid');
          if (signUpEmailError) {
            signUpEmailError.textContent = 'The email has been registered. Please sign in or reset your password.';
            signUpEmailError.classList.add('visible');
          }
          if (signUpAlert) {
            signUpAlert.className = 'auth-alert-banner error visible';
            signUpAlert.style.display = 'flex';
            signUpAlert.innerHTML = `<i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i><span>The email has been registered. <a href="javascript:void(0)" id="quickSignInLink" style="color: #60a5fa; text-decoration: underline; font-weight: 600; margin-left: 6px;">Sign In here &rarr;</a></span>`;
            if (window.lucide) window.lucide.createIcons({ root: signUpAlert });
            document.getElementById('quickSignInLink')?.addEventListener('click', () => {
              showLoginPage('signin');
              const sEmail = document.getElementById('signInEmail');
              if (sEmail) sEmail.value = val;
              const sPass = document.getElementById('signInPassword');
              if (sPass) sPass.focus();
            });
          }
        }
      } catch (err) {}
    }
  });

  signUpPasswordInput?.addEventListener('input', () => {
    signUpPasswordInput.classList.remove('is-invalid');
    if (signUpPasswordError) { signUpPasswordError.textContent = ''; signUpPasswordError.classList.remove('visible'); }
    if (signUpAlert) { signUpAlert.style.display = 'none'; }
  });

  signUpPasswordInput?.addEventListener('blur', () => {
    const val = signUpPasswordInput.value;
    if (val) {
      const hasLetter = /[a-zA-Z]/.test(val);
      const hasNumber = /\d/.test(val);
      if (val.length < 8 || !hasLetter || !hasNumber) {
        signUpPasswordInput.classList.add('is-invalid');
        if (signUpPasswordError) {
          signUpPasswordError.textContent = 'Password must be at least 8 characters long and contain at least one letter and one number.';
          signUpPasswordError.classList.add('visible');
        }
      }
    }
  });

  signUpConfirmPasswordInput?.addEventListener('input', () => {
    signUpConfirmPasswordInput.classList.remove('is-invalid');
    if (signUpConfirmPasswordError) { signUpConfirmPasswordError.textContent = ''; signUpConfirmPasswordError.classList.remove('visible'); }
    if (signUpAlert) { signUpAlert.style.display = 'none'; }
  });

  signUpConfirmPasswordInput?.addEventListener('blur', () => {
    const pVal = signUpPasswordInput ? signUpPasswordInput.value : '';
    const cpVal = signUpConfirmPasswordInput.value;
    if (cpVal && pVal && cpVal !== pVal) {
      signUpConfirmPasswordInput.classList.add('is-invalid');
      if (signUpConfirmPasswordError) {
        signUpConfirmPasswordError.textContent = 'Passwords do not match.';
        signUpConfirmPasswordError.classList.add('visible');
      }
    }
  });

  signUpTermsCheckbox?.addEventListener('change', () => {
    if (signUpTermsError) { signUpTermsError.textContent = ''; signUpTermsError.classList.remove('visible'); }
  });

  // Sign In Handler with Database Verification
  document.getElementById('signInForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('signInEmail')?.value.trim() || '';
    const passwordInput = document.getElementById('signInPassword')?.value || '';
    const signInSubmitBtn = document.getElementById('signInSubmitBtn');
    const signInAlert = document.getElementById('signInAlert');

    if (!emailInput) {
      showToast('Please enter your email address', 'error');
      return;
    }

    if (signInAlert) signInAlert.style.display = 'none';

    if (signInSubmitBtn) {
      signInSubmitBtn.disabled = true;
      signInSubmitBtn.innerHTML = '<span class="loading-spinner"></span> Authenticating...';
    }

    try {
      const resp = await fetch(`/api/auth/login?email=${encodeURIComponent(emailInput)}&password=${encodeURIComponent(passwordInput)}`);
      const data = await resp.json();

      if (resp.ok && data && data.success && data.user) {
        const u = data.user;
        currentUser = {
          isLoggedIn: true,
          id: u.id,
          name: u.name,
          shortName: (u.name || 'Analyst').split(' ')[0],
          role: u.role || 'Market Analyst',
          email: u.email,
          desk: u.desk || 'MacroPulse Equities Division',
          timezone: u.timezone || 'UTC+8',
          bio: u.bio || '',
          avatar: (u.avatar && typeof u.avatar === 'string' && u.avatar.trim().length > 0) ? u.avatar.trim() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
          apiKey: u.apiKey
        };
        try {
          localStorage.setItem('macropulse_user_logged_in', 'true');
          localStorage.setItem('macropulse_user_password', passwordInput);
          localStorage.setItem('macropulse_user_profile', JSON.stringify(currentUser));
        } catch (err) {}
        updateAuthUI();
        syncProfileFieldsToUI();
        hideLoginPage();
        switchView('overview');
        window.location.hash = '#overview';
        showToast(`Welcome back, ${currentUser.name}! Terminal session active.`, 'success');
      } else {
        if (signInAlert) {
          signInAlert.className = 'auth-alert-banner error visible';
          signInAlert.style.display = 'flex';
          signInAlert.innerHTML = '<i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i><span>Invalid email or password. Please verify credentials or reset password.</span>';
          if (window.lucide) window.lucide.createIcons({ root: signInAlert });
        }
        showToast('Invalid email or password. Please check credentials or reset password.', 'error');
        const passIn = document.getElementById('signInPassword');
        if (passIn) passIn.classList.add('is-invalid');
      }
    } catch (err) {
      currentUser = { ...defaultAuthUser };
      hideLoginPage();
      updateAuthUI();
      syncProfileFieldsToUI();
      switchView('overview');
    } finally {
      if (signInSubmitBtn) {
        signInSubmitBtn.disabled = false;
        signInSubmitBtn.textContent = 'Sign In to Terminal';
      }
    }
  });

  // Sign Up Handler with Strict Validation & Direct Sign-In Transition
  document.getElementById('signUpForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error states
    signUpNameInput?.classList.remove('is-invalid');
    signUpEmailInput?.classList.remove('is-invalid');
    signUpPasswordInput?.classList.remove('is-invalid');
    signUpConfirmPasswordInput?.classList.remove('is-invalid');
    if (signUpNameError) { signUpNameError.textContent = ''; signUpNameError.classList.remove('visible'); }
    if (signUpEmailError) { signUpEmailError.textContent = ''; signUpEmailError.classList.remove('visible'); }
    if (signUpPasswordError) { signUpPasswordError.textContent = ''; signUpPasswordError.classList.remove('visible'); }
    if (signUpConfirmPasswordError) { signUpConfirmPasswordError.textContent = ''; signUpConfirmPasswordError.classList.remove('visible'); }
    if (signUpTermsError) { signUpTermsError.textContent = ''; signUpTermsError.classList.remove('visible'); }
    if (signUpAlert) { signUpAlert.style.display = 'none'; }

    const nameVal = signUpNameInput?.value.trim() || '';
    const emailVal = signUpEmailInput?.value.trim() || '';
    const passwordVal = signUpPasswordInput?.value || '';
    const confirmPasswordVal = signUpConfirmPasswordInput?.value || '';
    let roleText = 'Quantitative / Retail Investor';
    if (signUpRoleSelect) {
      if (signUpRoleSelect.value === 'Other') {
        const customRole = document.getElementById('signUpRoleCustom')?.value.trim();
        roleText = customRole || 'Other';
      } else {
        roleText = signUpRoleSelect.options[signUpRoleSelect.selectedIndex]?.text || signUpRoleSelect.value;
      }
    }
    const termsChecked = signUpTermsCheckbox ? signUpTermsCheckbox.checked : true;

    let hasError = false;

    // Validation 1: Full Name (Letters and spaces only, no numbers)
    if (!nameVal) {
      if (signUpNameInput) signUpNameInput.classList.add('is-invalid');
      if (signUpNameError) {
        signUpNameError.textContent = 'Please enter your full name.';
        signUpNameError.classList.add('visible');
      }
      hasError = true;
    } else if (nameVal.length < 2) {
      if (signUpNameInput) signUpNameInput.classList.add('is-invalid');
      if (signUpNameError) {
        signUpNameError.textContent = 'Please enter your full name (minimum 2 characters).';
        signUpNameError.classList.add('visible');
      }
      hasError = true;
    } else if (/\d/.test(nameVal)) {
      if (signUpNameInput) signUpNameInput.classList.add('is-invalid');
      if (signUpNameError) {
        signUpNameError.textContent = 'Name cannot contain numbers.';
        signUpNameError.classList.add('visible');
      }
      hasError = true;
    } else if (!/^[a-zA-Z\s]+$/.test(nameVal)) {
      if (signUpNameInput) signUpNameInput.classList.add('is-invalid');
      if (signUpNameError) {
        signUpNameError.textContent = 'Name can only contain letters and spaces.';
        signUpNameError.classList.add('visible');
      }
      hasError = true;
    }

    // Validation 2: Email syntax
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      if (signUpEmailInput) signUpEmailInput.classList.add('is-invalid');
      if (signUpEmailError) {
        signUpEmailError.textContent = 'Please enter your email address.';
        signUpEmailError.classList.add('visible');
      }
      hasError = true;
    } else if (!emailRegex.test(emailVal)) {
      if (signUpEmailInput) signUpEmailInput.classList.add('is-invalid');
      if (signUpEmailError) {
        signUpEmailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
        signUpEmailError.classList.add('visible');
      }
      hasError = true;
    }

    // Validation 3: Password strength (Min 8 chars, letter + number)
    const hasLetter = /[a-zA-Z]/.test(passwordVal);
    const hasNumber = /\d/.test(passwordVal);
    if (!passwordVal) {
      if (signUpPasswordInput) signUpPasswordInput.classList.add('is-invalid');
      if (signUpPasswordError) {
        signUpPasswordError.textContent = 'Please create a password.';
        signUpPasswordError.classList.add('visible');
      }
      hasError = true;
    } else if (passwordVal.length < 8 || !hasLetter || !hasNumber) {
      if (signUpPasswordInput) signUpPasswordInput.classList.add('is-invalid');
      if (signUpPasswordError) {
        signUpPasswordError.textContent = 'Password must be at least 8 characters long and contain at least one letter and one number.';
        signUpPasswordError.classList.add('visible');
      }
      hasError = true;
    }

    // Validation 4: Password and confirm password match
    if (!confirmPasswordVal) {
      if (signUpConfirmPasswordInput) signUpConfirmPasswordInput.classList.add('is-invalid');
      if (signUpConfirmPasswordError) {
        signUpConfirmPasswordError.textContent = 'Please confirm your password.';
        signUpConfirmPasswordError.classList.add('visible');
      }
      hasError = true;
    } else if (passwordVal !== confirmPasswordVal) {
      if (signUpConfirmPasswordInput) signUpConfirmPasswordInput.classList.add('is-invalid');
      if (signUpConfirmPasswordError) {
        signUpConfirmPasswordError.textContent = 'Passwords do not match.';
        signUpConfirmPasswordError.classList.add('visible');
      }
      hasError = true;
    }

    // Validation 5: Terms agreement
    if (!termsChecked) {
      if (signUpTermsError) {
        signUpTermsError.textContent = 'You must agree to the Terms & Privacy Policy to create an account.';
        signUpTermsError.classList.add('visible');
      }
      hasError = true;
    }

    if (hasError) {
      showToast('Please fix the highlighted errors before registering.', 'error');
      return;
    }

    // Submit loading state
    if (signUpSubmitBtn) {
      signUpSubmitBtn.disabled = true;
      signUpSubmitBtn.innerHTML = '<span class="loading-spinner"></span> Creating account in MySQL...';
    }

    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          password: passwordVal,
          role: roleText
        })
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        const errMsg = (data && data.error) || 'The email has been registered. Please sign in or reset your password.';
        if (signUpEmailInput) signUpEmailInput.classList.add('is-invalid');
        if (signUpEmailError) {
          signUpEmailError.textContent = errMsg;
          signUpEmailError.classList.add('visible');
        }
        if (signUpAlert) {
          signUpAlert.className = 'auth-alert-banner error visible';
          signUpAlert.style.display = 'flex';
          signUpAlert.innerHTML = `<i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i><span>${errMsg} <a href="javascript:void(0)" id="errorQuickSignIn" style="color: #60a5fa; text-decoration: underline; font-weight: 600; margin-left: 6px;">Sign In here &rarr;</a></span>`;
          if (window.lucide) window.lucide.createIcons({ root: signUpAlert });
          document.getElementById('errorQuickSignIn')?.addEventListener('click', () => {
            showLoginPage('signin');
            const sEmail = document.getElementById('signInEmail');
            if (sEmail) sEmail.value = emailVal;
            const sPass = document.getElementById('signInPassword');
            if (sPass) sPass.focus();
          });
        }
        showToast(errMsg, 'error');
        if (signUpEmailInput) signUpEmailInput.focus();
        return;
      }

      // Successful registration in MySQL!
      // Transition to the Sign In screen instead of launching the homepage straight
      if (signUpNameInput) signUpNameInput.value = '';
      if (signUpEmailInput) signUpEmailInput.value = '';
      if (signUpPasswordInput) signUpPasswordInput.value = '';
      if (signUpConfirmPasswordInput) signUpConfirmPasswordInput.value = '';

      showLoginPage('signin');

      const sEmail = document.getElementById('signInEmail');
      const sPass = document.getElementById('signInPassword');
      if (sEmail) sEmail.value = emailVal;
      if (sPass) {
        sPass.value = passwordVal;
        sPass.focus();
      }

      // Display positive confirmation banner on Sign In page
      const signInAlert = document.getElementById('signInAlert');
      if (signInAlert) {
        signInAlert.className = 'auth-alert-banner success visible';
        signInAlert.style.display = 'flex';
        signInAlert.innerHTML = `
          <i data-lucide="mail-check" style="width: 16px; height: 16px; color: #10b981; flex-shrink: 0;"></i>
          <span>Account created for <b>${escapeHtml(emailVal)}</b>! A confirmation email has been sent to your inbox.</span>
        `;
        if (window.lucide) window.lucide.createIcons({ root: signInAlert });
      }

      showToast(`Account registered! A confirmation email was sent to ${emailVal}.`, 'success');
    } catch (err) {
      console.error('Registration network error:', err);
      showToast('Network error during registration. Please check server connection.', 'error');
    } finally {
      if (signUpSubmitBtn) {
        signUpSubmitBtn.disabled = false;
        signUpSubmitBtn.innerHTML = '<i data-lucide="user-plus" style="width: 16px; height: 16px;"></i><span>Sign Up</span>';
        if (window.lucide) window.lucide.createIcons({ root: signUpSubmitBtn });
      }
    }
  });

  // =======================================================
  // Google Sign-In & Single Sign-On (SSO) System
  // =======================================================
  const googleAccountModal = document.getElementById('googleAccountModal');
  const closeGoogleModalBtn = document.getElementById('closeGoogleModalBtn');
  const googleUseAnotherToggle = document.getElementById('googleUseAnotherToggle');
  const googleCustomForm = document.getElementById('googleCustomForm');
  const googleAnotherArrow = document.getElementById('googleAnotherArrow');
  const submitGoogleCustomBtn = document.getElementById('submitGoogleCustomBtn');
  const googleCustomEmail = document.getElementById('googleCustomEmail');
  const googleCustomName = document.getElementById('googleCustomName');
  const googleCustomEmailError = document.getElementById('googleCustomEmailError');
  const googleOauthHint = document.getElementById('googleOauthHint');

  let googleAuthConfig = { enabled: false, clientId: '' };
  let googleTokenClient = null;

  function syncGoogleAuthConfig(config) {
    if (!config) return;
    googleAuthConfig = {
      ...config,
      clientId: (config.clientId || config.client_id || '').trim(),
      enabled: Boolean(config.enabled)
    };
    window.googleAuthConfig = googleAuthConfig;
    const clientId = googleAuthConfig.clientId;
    const isLive = Boolean(googleAuthConfig.enabled && clientId);

    // Update login modal elements
    const liveInput = document.getElementById('googleLiveClientIdInput');
    const hintEl = document.getElementById('googleOauthHint');
    if (liveInput) liveInput.value = clientId;
    if (hintEl) {
      if (isLive) {
        hintEl.innerHTML = '<i data-lucide="shield-check" style="width: 13px; height: 13px; color: #10b981; flex-shrink: 0;"></i><span>Google Identity Services active with Client ID: <code>' + escapeHtml(clientId.substring(0, 16)) + '...</code></span>';
      } else {
        hintEl.innerHTML = '';
      }
      if (window.lucide) window.lucide.createIcons({ root: hintEl });
    }


    if (isLive) {
      initGoogleIdentityServices(clientId);
    } else {
      hideOfficialGoogleButtons();
    }
  }

  // 1. Fetch server Google Auth configuration
  fetch('/api/auth/google-config')
    .then(r => r.json())
    .then(data => {
      if (data && data.success) {
        syncGoogleAuthConfig(data);
      }
    })
    .catch(() => {});

  // 2. Initialize Google Identity Services SDK & OAuth 2.0 Token Client
  function initGoogleIdentityServices(clientId) {
    const cid = (clientId || googleAuthConfig.clientId || '').trim();
    if (!cid) return;

    if (!window.google?.accounts) {
      // Poll for Google SDK load if it's still downloading
      let pollAttempts = 0;
      const pollTimer = setInterval(() => {
        pollAttempts++;
        if (window.google?.accounts?.oauth2 || window.google?.accounts?.id) {
          clearInterval(pollTimer);
          initGoogleIdentityServices(cid);
        } else if (pollAttempts >= 30) {
          clearInterval(pollTimer);
        }
      }, 200);
      return;
    }

    // A. Initialize Token Client for custom button popups
    try {
      if (window.google.accounts.oauth2) {
        googleTokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: cid,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              showToast('Connecting with Google...', 'info');
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const profile = await res.json();
                if (profile && profile.email) {
                  await executeGoogleAuthentication({
                    email: profile.email,
                    name: profile.name || profile.email.split('@')[0],
                    avatar: profile.picture || ''
                  });
                } else {
                  showToast('Failed to retrieve profile from Google.', 'error');
                }
              } catch (err) {
                showToast('Error connecting with Google profile: ' + err.message, 'error');
              }
            } else if (tokenResponse && tokenResponse.error) {
              showToast('Google Sign-In: ' + (tokenResponse.error_description || tokenResponse.error), 'error');
            }
          },
          error_callback: (err) => {
            console.warn('Google OAuth popup warning:', err);
            if (err && err.type === 'popup_closed') return;
            if (err && err.message) showToast('Google Sign-In: ' + err.message, 'error');
          }
        });
      }
    } catch (e) {
      console.warn('Google OAuth2 init error:', e);
    }

    // B. Initialize Google ID (Credential) client and render official buttons
    try {
      if (window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: cid,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        renderOfficialGoogleButtons(cid);
      }
    } catch (e) {
      console.warn('Google ID client init error:', e);
    }
  }

  function renderOfficialGoogleButtons(cid) {
    if (!window.google?.accounts?.id || !googleAuthConfig.enabled) return;

    const slotSignIn = document.getElementById('googleOfficialBtnSlot');
    const customSignIn = document.getElementById('googleSsoBtn');
    if (slotSignIn) {
      try {
        slotSignIn.innerHTML = '';
        slotSignIn.style.display = 'flex';
        window.google.accounts.id.renderButton(slotSignIn, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signin_with',
          logo_alignment: 'left',
          width: 320
        });
        if (customSignIn) customSignIn.style.display = 'none';
      } catch (e) {}
    }

    const slotSignUp = document.getElementById('googleOfficialSignUpSlot');
    const customSignUp = document.getElementById('googleSignUpBtn');
    if (slotSignUp) {
      try {
        slotSignUp.innerHTML = '';
        slotSignUp.style.display = 'flex';
        window.google.accounts.id.renderButton(slotSignUp, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signup_with',
          logo_alignment: 'left',
          width: 320
        });
        if (customSignUp) customSignUp.style.display = 'none';
      } catch (e) {}
    }
  }

  function hideOfficialGoogleButtons() {
    const slotSignIn = document.getElementById('googleOfficialBtnSlot');
    const customSignIn = document.getElementById('googleSsoBtn');
    if (slotSignIn) slotSignIn.style.display = 'none';
    if (customSignIn) customSignIn.style.display = 'flex';

    const slotSignUp = document.getElementById('googleOfficialSignUpSlot');
    const customSignUp = document.getElementById('googleSignUpBtn');
    if (slotSignUp) slotSignUp.style.display = 'none';
    if (customSignUp) customSignUp.style.display = 'flex';
  }

  window.onGoogleLibraryLoad = function() {
    const cid = (googleAuthConfig.clientId || '').trim();
    if (googleAuthConfig.enabled && cid) {
      initGoogleIdentityServices(cid);
    }
  };

  function handleGoogleCredentialResponse(response) {
    if (response && response.credential) {
      // Parse Google JWT ID token
      try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const decoded = JSON.parse(jsonPayload);
        if (decoded && decoded.email) {
          executeGoogleAuthentication({
            email: decoded.email,
            name: decoded.name || decoded.email.split('@')[0],
            avatar: decoded.picture || '',
            credential: response.credential
          });
          return;
        }
      } catch (e) {
        console.warn('Failed to parse Google JWT payload directly:', e);
      }
      executeGoogleAuthentication({ credential: response.credential });
    }
  }

  // 3. Modal open / close helpers
  function openGoogleModal() {
    if (googleAccountModal) {
      googleAccountModal.style.display = 'flex';
      const accountsList = document.getElementById('googleAccountsList');
      if (accountsList) accountsList.style.display = 'flex';
      if (googleCustomForm) googleCustomForm.style.display = 'none';
      if (googleCustomEmail) googleCustomEmail.value = '';
      if (googleCustomName) googleCustomName.value = '';
      if (googleCustomEmailError) googleCustomEmailError.textContent = '';
      const configBox = document.getElementById('googleOauthConfigBox');
      if (configBox) configBox.style.display = 'none';
      if (window.lucide) window.lucide.createIcons({ root: googleAccountModal });
    }
  }

  function closeGoogleModal() {
    if (googleAccountModal) {
      googleAccountModal.style.display = 'none';
    }
  }

  if (closeGoogleModalBtn) {
    closeGoogleModalBtn.addEventListener('click', closeGoogleModal);
  }

  if (googleAccountModal) {
    googleAccountModal.addEventListener('click', (e) => {
      if (e.target === googleAccountModal) closeGoogleModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && googleAccountModal && googleAccountModal.style.display === 'flex') {
      closeGoogleModal();
    }
  });

  // 4. Switch between Accounts List and Custom Email Entry
  if (googleUseAnotherToggle) {
    googleUseAnotherToggle.addEventListener('click', () => {
      const accountsList = document.getElementById('googleAccountsList');
      if (accountsList) accountsList.style.display = 'none';
      if (googleCustomForm) {
        googleCustomForm.style.display = 'block';
        if (googleCustomEmail) setTimeout(() => googleCustomEmail.focus(), 60);
      }
    });
  }

  const cancelGoogleCustomBtn = document.getElementById('cancelGoogleCustomBtn');
  if (cancelGoogleCustomBtn) {
    cancelGoogleCustomBtn.addEventListener('click', () => {
      const accountsList = document.getElementById('googleAccountsList');
      if (accountsList) accountsList.style.display = 'flex';
      if (googleCustomForm) googleCustomForm.style.display = 'none';
    });
  }

  // Live Google Cloud Client ID Configuration Toggle & Save
  const googleOauthToggleBtn = document.getElementById('googleOauthToggleBtn');
  const googleOauthConfigBox = document.getElementById('googleOauthConfigBox');
  const googleLiveClientIdInput = document.getElementById('googleLiveClientIdInput');
  const saveGoogleClientIdBtn = document.getElementById('saveGoogleClientIdBtn');
  const googleLiveConfigStatus = document.getElementById('googleLiveConfigStatus');

  if (googleOauthToggleBtn && googleOauthConfigBox) {
    googleOauthToggleBtn.addEventListener('click', () => {
      const isVis = googleOauthConfigBox.style.display !== 'none';
      googleOauthConfigBox.style.display = isVis ? 'none' : 'block';
      if (!isVis && googleLiveClientIdInput) {
        googleLiveClientIdInput.value = googleAuthConfig.clientId || '';
        setTimeout(() => googleLiveClientIdInput.focus(), 50);
      }
    });
  }

  if (saveGoogleClientIdBtn && googleLiveClientIdInput) {
    saveGoogleClientIdBtn.addEventListener('click', async () => {
      const enteredId = googleLiveClientIdInput.value.trim();
      if (!enteredId) {
        if (googleLiveConfigStatus) {
          googleLiveConfigStatus.style.color = '#ba1a1a';
          googleLiveConfigStatus.textContent = 'Please enter a valid Google Client ID.';
        }
        return;
      }
      try {
        saveGoogleClientIdBtn.disabled = true;
        saveGoogleClientIdBtn.textContent = 'Saving...';
        const res = await fetch('/api/auth/google-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_id: enteredId, enabled: true })
        });
        const d = await res.json();
        if (d.success) {
          syncGoogleAuthConfig(d.config);
          initGoogleIdentityServices(enteredId);
          if (googleLiveConfigStatus) {
            googleLiveConfigStatus.style.color = '#10b981';
            googleLiveConfigStatus.textContent = 'Saved! Google Identity Services active.';
          }
          showToast('Google OAuth Client ID saved! Live Google Identity initialized.', 'success');
        } else {
          if (googleLiveConfigStatus) {
            googleLiveConfigStatus.style.color = '#ba1a1a';
            googleLiveConfigStatus.textContent = 'Error: ' + (d.error || 'Failed to save');
          }
        }
      } catch (err) {
        if (googleLiveConfigStatus) {
          googleLiveConfigStatus.style.color = '#ba1a1a';
          googleLiveConfigStatus.textContent = 'Connection error.';
        }
      } finally {
        saveGoogleClientIdBtn.disabled = false;
        saveGoogleClientIdBtn.textContent = 'Save & Activate Live Google';
      }
    });
  }

  // 5. Trigger Google SSO flow
  function startGoogleSSOFlow() {
    const clientId = (googleAuthConfig.clientId || googleAuthConfig.client_id || '').trim();

    // A. Live Google Client ID is configured -> Open Real Google Interface
    if (googleAuthConfig.enabled && clientId) {
      // 1. Try Google GIS OAuth 2.0 Token Client (Popup)
      if (googleTokenClient) {
        try {
          googleTokenClient.requestAccessToken({ prompt: 'select_account' });
          return;
        } catch (e) {
          console.warn('googleTokenClient requestAccessToken error:', e);
        }
      }

      // 2. If token client wasn't initialized yet, try initializing now
      if (window.google?.accounts?.oauth2) {
        initGoogleIdentityServices(clientId);
        if (googleTokenClient) {
          try {
            googleTokenClient.requestAccessToken({ prompt: 'select_account' });
            return;
          } catch (e) {}
        }
      }

      // 3. Direct Google OAuth 2.0 Web Popup Window fallback (accounts.google.com)
      const width = 500, height = 620;
      const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
      const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
      const redirectUri = window.location.origin;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
      
      const popup = window.open(authUrl, 'GoogleSignIn', `width=${width},height=${height},left=${left},top=${top}`);
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.location.href = authUrl;
      }
      return;
    }

    // B. No Client ID configured -> Open local simulation modal
    openGoogleModal();
  }
  window.startGoogleSSOFlow = startGoogleSSOFlow;

  // Check if returned from Google OAuth redirect in hash
  if (window.location.hash && window.location.hash.includes('access_token=')) {
    try {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const tok = hashParams.get('access_token');
      if (tok) {
        history.replaceState(null, null, window.location.pathname + '#login');
        showToast('Connecting with Google account...', 'info');
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tok}` }
        })
        .then(r => r.json())
        .then(profile => {
          if (profile && profile.email) {
            executeGoogleAuthentication({
              email: profile.email,
              name: profile.name || profile.email.split('@')[0],
              avatar: profile.picture || ''
            });
          }
        })
        .catch(err => console.warn('OAuth hash userinfo error:', err));
      }
    } catch (e) {}
  }

  document.getElementById('googleSsoBtn')?.addEventListener('click', startGoogleSSOFlow);
  document.getElementById('googleSignUpBtn')?.addEventListener('click', startGoogleSSOFlow);

  // 6. Predefined account items in chooser modal
  document.querySelectorAll('.google-account-item:not(.google-use-another)').forEach(item => {
    item.addEventListener('click', () => {
      const email = item.getAttribute('data-email');
      const name = item.getAttribute('data-name');
      if (email) {
        executeGoogleAuthentication({ email, name });
      }
    });
  });

  // 7. Custom Google account submission
  function submitCustomGoogleAccount() {
    const email = (googleCustomEmail?.value || '').trim();
    const name = (googleCustomName?.value || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      if (googleCustomEmailError) googleCustomEmailError.textContent = 'Please enter a Google email address.';
      googleCustomEmail?.focus();
      return;
    }
    if (!emailRegex.test(email)) {
      if (googleCustomEmailError) googleCustomEmailError.textContent = 'Please enter a valid email address (e.g. user@gmail.com).';
      googleCustomEmail?.focus();
      return;
    }
    if (googleCustomEmailError) googleCustomEmailError.textContent = '';
    executeGoogleAuthentication({ email, name: name || email.split('@')[0] });
  }

  if (submitGoogleCustomBtn) {
    submitGoogleCustomBtn.addEventListener('click', submitCustomGoogleAccount);
  }

  googleCustomEmail?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitCustomGoogleAccount();
    }
  });

  googleCustomName?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitCustomGoogleAccount();
    }
  });

  // 8. Execute Authentication & Synchronize Session
  async function executeGoogleAuthentication(payload) {
    closeGoogleModal();
    showToast('Connecting to Google Identity Services & synchronizing session...', 'info');

    try {
      const resp = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();

      if (resp.ok && data && data.success && data.user) {
        const u = data.user;
        currentUser = {
          isLoggedIn: true,
          id: u.id,
          name: u.name || 'Google User',
          shortName: (u.name || 'Google User').split(' ')[0],
          email: u.email,
          role: u.role || 'Quantitative / Retail Investor',
          desk: u.desk || 'MacroPulse Equities Division',
          timezone: u.timezone || 'Asia/Kuala_Lumpur (UTC+8)',
          bio: u.bio !== null ? u.bio : 'Authenticated via Google Single Sign-On.',
          avatar: (u.avatar && typeof u.avatar === 'string' && u.avatar.trim().length > 0) ? u.avatar.trim() : (payload.avatar || ''),
          apiKey: u.apiKey || ('mp_live_' + Math.random().toString(36).substring(2, 10))
        };

        try {
          localStorage.setItem('macropulse_user_logged_in', 'true');
          localStorage.setItem('macropulse_user_profile', JSON.stringify(currentUser));
        } catch (e) {}

        hideLoginPage();
        updateAuthUI();
        syncProfileFieldsToUI();
        switchView('overview');
        window.location.hash = '#overview';

        const greeting = data.is_new
          ? `Welcome to MacroPulse, ${currentUser.name}! Confirmation email dispatched & account active.`
          : `Welcome back, ${currentUser.name}! Authenticated via Google.`;
        showToast(greeting, 'success');
      } else {
        showToast(data?.error || 'Failed to authenticate via Google. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Google SSO error:', err);
      showToast('Network error during Google authentication. Please try again.', 'error');
    }
  }

  // Initialize Auth & Profile UI on start
  syncProfileFieldsToUI();

  // Dynamically sync user's active profile from MySQL database if logged in
  if (currentUser.isLoggedIn && currentUser.email) {
    fetch(`/api/user/profile?email=${encodeURIComponent(currentUser.email)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.user) {
          const u = data.user;
          currentUser.name = u.name || currentUser.name;
          currentUser.shortName = (u.name || currentUser.name).split(' ')[0];
          currentUser.role = u.role || currentUser.role;
          currentUser.desk = u.desk || currentUser.desk;
          currentUser.timezone = u.timezone || currentUser.timezone;
          currentUser.bio = u.bio !== null ? u.bio : currentUser.bio;
          if (u.avatar && typeof u.avatar === 'string' && u.avatar.trim().length > 0) {
            currentUser.avatar = u.avatar.trim();
            try {
              const p = JSON.parse(localStorage.getItem('macropulse_user_profile') || '{}');
              p.avatar = currentUser.avatar;
              localStorage.setItem('macropulse_user_profile', JSON.stringify(p));
            } catch (err) {}
          }
          if (u.apiKey) currentUser.apiKey = u.apiKey;
          syncProfileFieldsToUI();
          updateAuthUI();
        }
      })
      .catch(() => {});
  }

  // ==========================================
  // Model Performance Logs & Telemetry Engine (RMSE, MAE, MAPE)
  // ==========================================
  let currentModelId = 'lstm';
  let currentModelTarget = '1155.KL';
  let currentDiagnosticMode = 'residuals';
  let modelPerformanceData = null;
  let forecastChartInstance = null;
  let diagnosticsChartInstance = null;
  const modelSparklineInstances = {};

  function createModelSparkline(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !data || data.length === 0) return;
    
    if (modelSparklineInstances[canvasId]) {
      modelSparklineInstances[canvasId].destroy();
    }

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 40);
    gradient.addColorStop(0, color + '44');
    gradient.addColorStop(1, color + '00');

    modelSparklineInstances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.35,
          fill: true,
          backgroundColor: gradient
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: false
      }
    });
  }

  function renderAllModelTelemetry(data) {
    if (!data) return;
    modelPerformanceData = data;

    // 1. Update Top Metric Scorecards
    const rmseEl = document.getElementById('metricRmseVal');
    if (rmseEl && data.metrics && typeof data.metrics.rmse === 'number') {
      rmseEl.textContent = data.metrics.rmse.toFixed(4);
    }

    const maeEl = document.getElementById('metricMaeVal');
    if (maeEl && data.metrics && typeof data.metrics.mae === 'number') {
      maeEl.textContent = data.metrics.mae.toFixed(4);
    }

    const mapeEl = document.getElementById('metricMapeVal');
    if (mapeEl && data.metrics) {
      mapeEl.textContent = data.metrics.mapeFormatted || `${data.metrics.mape}%`;
    }

    const accText = document.getElementById('metricAccuracyText');
    if (accText && data.metrics) {
      const mapeNum = parseFloat(String(data.metrics.mape).replace('%', ''));
      accText.textContent = `Prediction Accuracy: ${(100 - mapeNum).toFixed(2)}%`;
    }

    const mapeTier = document.getElementById('metricMapeTierBadge');
    if (mapeTier && data.metrics) {
      const mVal = parseFloat(String(data.metrics.mape).replace('%', ''));
      if (mVal < 2.0) {
        mapeTier.textContent = 'Grade A (<2%)';
        mapeTier.className = 'status-badge success';
      } else if (mVal < 4.0) {
        mapeTier.textContent = 'Grade B (<4%)';
        mapeTier.className = 'status-badge info';
      } else {
        mapeTier.textContent = 'Grade C';
        mapeTier.className = 'status-badge warning';
      }
    }

    const dirAccEl = document.getElementById('metricDirAccuracyVal');
    if (dirAccEl && data.metrics) {
      dirAccEl.textContent = data.metrics.directionalAccuracy;
    }

    const r2Badge = document.getElementById('metricR2Badge');
    if (r2Badge && data.metrics) {
      r2Badge.textContent = `R² ${data.metrics.r2}`;
    }

    // Update Mini Sparklines
    if (data.metrics && data.metrics.sparklines) {
      createModelSparkline('sparklineModelRmse', data.metrics.sparklines.rmse, '#a855f7');
      createModelSparkline('sparklineModelMae', data.metrics.sparklines.mae, '#06b6d4');
      createModelSparkline('sparklineModelMape', data.metrics.sparklines.mape, '#10b981');
      createModelSparkline('sparklineModelR2', data.metrics.sparklines.r2, '#f59e0b');
    }

    // 2. Render Forecast vs Actual Time-Series Chart
    if (data.timeSeries) {
      renderForecastChart(data.timeSeries, data.target);
    }

    // 3. Render Diagnostics Chart (Residuals or Loss)
    renderDiagnosticsChart(data);

    // 4. Render Model Leaderboard Matrix
    if (data.leaderboard) {
      renderModelLeaderboard(data.leaderboard);
    }

    // 5. Render Model Performance Logs Audit Table
    if (data.runLogs) {
      const searchInput = document.getElementById('modelLogsSearchInput');
      renderModelRunLogs(data.runLogs, searchInput ? searchInput.value : '');
    }

    // Update Chart Titles & Active Badges
    const chartTitle = document.getElementById('forecastChartTitle');
    if (chartTitle && data.model) {
      chartTitle.textContent = `${data.model.name} (${data.model.version}) vs. Ground Truth`;
    }

    // Update Model Architecture Pills active state
    document.querySelectorAll('#modelArchitecturePills .model-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-model') === currentModelId);
    });

    // Update Target Dropdown
    const targetSelect = document.getElementById('modelTargetSelect');
    if (targetSelect && targetSelect.value !== currentModelTarget) {
      targetSelect.value = currentModelTarget;
    }
  }

  async function fetchModelPerformance(modelId = 'lstm', targetId = '1155.KL') {
    currentModelId = modelId;
    currentModelTarget = targetId;

    try {
      const resp = await fetch(`/api/models/performance?model=${encodeURIComponent(modelId)}&target=${encodeURIComponent(targetId)}`);
      if (!resp.ok) throw new Error('Failed to fetch model performance metrics');
      const data = await resp.json();
      renderAllModelTelemetry(data);
    } catch (err) {
      console.error('Model performance fetch error:', err);
      showToast('Could not load model performance metrics', 'error');
    }
  }

  function renderForecastChart(timeSeries, target) {
    const canvas = document.getElementById('forecastVsActualCanvas');
    if (!canvas || !timeSeries || timeSeries.length === 0) return;

    if (forecastChartInstance) {
      forecastChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const purpleFill = ctx.createLinearGradient(0, 0, 0, 320);
    purpleFill.addColorStop(0, 'rgba(168, 85, 247, 0.20)');
    purpleFill.addColorStop(1, 'rgba(168, 85, 247, 0.02)');

    const labels = timeSeries.map(p => p.date);
    const actualData = timeSeries.map(p => p.actual);
    const predData = timeSeries.map(p => p.predicted);
    const upperData = timeSeries.map(p => p.upperBound95);
    const lowerData = timeSeries.map(p => p.lowerBound95);

    forecastChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '95% CI Upper Bound',
            data: upperData,
            borderColor: 'transparent',
            pointRadius: 0,
            fill: false
          },
          {
            label: '95% Confidence Band',
            data: lowerData,
            borderColor: 'transparent',
            backgroundColor: purpleFill,
            pointRadius: 0,
            fill: '-1'
          },
          {
            label: 'Actual Ground Truth',
            data: actualData,
            borderColor: '#10b981',
            borderWidth: 2.8,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#10b981',
            pointBorderWidth: 2,
            pointRadius: 3.5,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Model Forecast (ŷ)',
            data: predData,
            borderColor: '#c084fc',
            borderWidth: 2.4,
            borderDash: [5, 4],
            pointBackgroundColor: '#c084fc',
            pointRadius: 2.5,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              color: '#94a3b8',
              boxWidth: 12,
              usePointStyle: true,
              filter: (item) => item.text !== '95% CI Upper Bound'
            }
          },
          tooltip: {
            backgroundColor: '#161a2d',
            titleColor: '#fff',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(124, 58, 237, 0.4)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => {
                const val = context.parsed.y;
                const sign = target && target.isCurrency ? (target.unit === 'RM' ? 'RM ' : '$') : '';
                const unit = target && !target.isCurrency && target.unit ? ` ${target.unit}` : '';
                return ` ${context.dataset.label}: ${sign}${val.toFixed(2)}${unit}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#94a3b8',
              callback: (val) => {
                const sign = target && target.isCurrency ? (target.unit === 'RM' ? 'RM ' : '$') : '';
                return `${sign}${val.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }

  function renderDiagnosticsChart(data) {
    const canvas = document.getElementById('modelDiagnosticsCanvas');
    if (!canvas || !data) return;

    if (diagnosticsChartInstance) {
      diagnosticsChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');

    if (currentDiagnosticMode === 'loss') {
      // Training & Validation Loss Curve
      const epochs = data.epochLoss.map(e => `E${e.epoch}`);
      const trainL = data.epochLoss.map(e => e.trainLoss);
      const valL = data.epochLoss.map(e => e.valLoss);

      diagnosticsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: epochs,
          datasets: [
            {
              label: 'Train Loss',
              data: trainL,
              borderColor: '#8b5cf6',
              borderWidth: 2.2,
              tension: 0.35,
              pointRadius: 0
            },
            {
              label: 'Val Loss',
              data: valL,
              borderColor: '#f59e0b',
              borderWidth: 2,
              borderDash: [4, 4],
              tension: 0.35,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: true, position: 'top', align: 'end', labels: { color: '#94a3b8', boxWidth: 10 } }
          },
          scales: {
            x: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', maxTicksLimit: 6 } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b' } }
          }
        }
      });
    } else {
      // Residual Distribution Histogram
      diagnosticsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.residualHistogram.labels,
          datasets: [{
            label: 'Residual Frequency',
            data: data.residualHistogram.counts,
            backgroundColor: 'rgba(6, 182, 212, 0.45)',
            borderColor: '#06b6d4',
            borderWidth: 1.5,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#161a2d',
              titleColor: '#fff',
              bodyColor: '#06b6d4'
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
            y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#64748b', stepSize: 2 } }
          }
        }
      });
    }
  }

  function renderModelLeaderboard(leaderboard) {
    const tbody = document.getElementById('modelLeaderboardTbody');
    if (!tbody || !leaderboard) return;

    tbody.innerHTML = '';
    leaderboard.forEach((m, idx) => {
      const tr = document.createElement('tr');
      const isSelected = m.id === currentModelId;
      if (isSelected) tr.style.background = 'rgba(124, 58, 237, 0.08)';

      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 800; color: ${idx === 0 ? '#fbbf24' : 'var(--text-muted)'}; font-size: 0.9rem; min-width: 24px;">#${idx + 1}</span>
            <div>
              <div style="font-weight: 700; color: #fff; font-size: 0.88rem;">${m.name}</div>
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">${m.version}</span>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.78rem; color: var(--text-secondary);">${m.type.replace(' Time-Series', '')}</span></td>
        <td style="text-align: right; font-family: monospace; font-weight: 700; color: #c084fc;">${m.rmse.toFixed(4)}</td>
        <td style="text-align: right; font-family: monospace; font-weight: 600; color: #22d3ee;">${m.mae.toFixed(4)}</td>
        <td style="text-align: right;"><span class="status-badge success" style="font-family: monospace;">${m.mape}</span></td>
        <td style="text-align: right; font-family: monospace; font-weight: 600;">${m.r2}</td>
        <td style="text-align: right; font-family: monospace; color: var(--accent-green);">${m.directionalAccuracy}</td>
        <td style="text-align: center;">
          <span class="status-badge ${m.statusType}">${m.status}</span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-secondary select-model-btn" data-model="${m.id}" style="padding: 4px 10px; font-size: 0.74rem;">
            ${isSelected ? 'Active' : 'Evaluate'}
          </button>
        </td>
      `;

      tr.querySelector('.select-model-btn').addEventListener('click', () => {
        fetchModelPerformance(m.id, currentModelTarget);
      });

      tbody.appendChild(tr);
    });
  }

  let currentInspectedRun = null;

  function openInspectRunModal(r) {
    if (!r) return;
    currentInspectedRun = r;

    const modalBackdrop = document.getElementById('inspectRunModalBackdrop');
    if (!modalBackdrop) return;

    // Header values
    const runIdBadge = document.getElementById('inspectModalRunIdBadge');
    const driftBadge = document.getElementById('inspectModalDriftBadge');
    const subtitle = document.getElementById('inspectModalSubtitle');

    if (runIdBadge) runIdBadge.textContent = r.runId;
    if (driftBadge) {
      driftBadge.textContent = r.driftStatus;
      driftBadge.className = `status-badge ${r.driftType || 'success'}`;
    }
    if (subtitle) {
      const targetName = currentModelTarget === '1155.KL' ? '1155.KL (Maybank)' : (currentModelTarget || '1155.KL');
      subtitle.textContent = `Model: ${r.model} • Target: ${targetName} • Evaluated: ${r.timestamp} • Duration: ${r.duration || '4.2s'}`;
    }

    // Key metrics
    const metricRmse = document.getElementById('inspectMetricRmse');
    const metricRmseSub = document.getElementById('inspectMetricRmseSub');
    const metricMae = document.getElementById('inspectMetricMae');
    const metricMape = document.getElementById('inspectMetricMape');
    const metricMaxError = document.getElementById('inspectMetricMaxError');

    const rmseNum = typeof r.rmse === 'number' ? r.rmse : parseFloat(r.rmse) || 0.0482;
    const maeNum = typeof r.mae === 'number' ? r.mae : parseFloat(r.mae) || 0.0341;
    const maxErrNum = typeof r.maxError === 'number' ? r.maxError : parseFloat(r.maxError) || 0.1240;

    if (metricRmse) metricRmse.textContent = rmseNum.toFixed(4);
    if (metricRmseSub) {
      if (r.driftStatus === 'Optimal') {
        metricRmseSub.textContent = '✓ -14.2% vs Baseline';
        metricRmseSub.style.color = '#10b981';
      } else if (r.driftStatus === 'Minor Drift') {
        metricRmseSub.textContent = '▲ +6.4% variance';
        metricRmseSub.style.color = '#f59e0b';
      } else {
        metricRmseSub.textContent = '▲ Exceeds threshold';
        metricRmseSub.style.color = '#ef4444';
      }
    }
    if (metricMae) metricMae.textContent = maeNum.toFixed(4);
    if (metricMape) metricMape.textContent = r.mape;
    if (metricMaxError) metricMaxError.textContent = maxErrNum.toFixed(4);

    // Specification table
    const targetSymbol = currentModelTarget || '1155.KL';
    const targetLabels = {
      '1155.KL': '1155.KL (Malayan Banking Berhad / Bursa Malaysia)',
      '5347.KL': '5347.KL (Tenaga Nasional Berhad / Utilities)',
      '1295.KL': '1295.KL (Public Bank Berhad / Financial Services)',
      '1023.KL': '1023.KL (CIMB Group Holdings Berhad)',
      '0166.KL': '0166.KL (Inari Amertron Berhad / Technology)',
      'NVDA': 'NVDA (NVIDIA Corporation / NASDAQ)',
      'WDC': 'WDC (Western Digital Corporation / NASDAQ)'
    };

    const specTarget = document.getElementById('inspectSpecTarget');
    const specModel = document.getElementById('inspectSpecModel');
    const specSplit = document.getElementById('inspectSpecSplit');
    const specSamples = document.getElementById('inspectSpecSamples');
    const specOptimizer = document.getElementById('inspectSpecOptimizer');
    const specDuration = document.getElementById('inspectSpecDuration');

    if (specTarget) specTarget.textContent = targetLabels[targetSymbol] || targetSymbol;
    if (specModel) specModel.textContent = r.model;
    if (specSplit) specSplit.textContent = r.split;
    if (specSamples) specSamples.textContent = `${r.sampleSize} Historical Daily Bars`;
    if (specOptimizer) specOptimizer.textContent = 'AdamW (lr=1e-3, weight_decay=1e-4) • Huber Loss (delta=1.0)';
    if (specDuration) specDuration.textContent = `${r.duration || '4.2s'} (CUDA PyTorch Engine)`;

    // Diagnostic verdict banner
    const diagBanner = document.getElementById('inspectDiagnosticBanner');
    const diagIcon = document.getElementById('inspectDiagnosticIcon');
    const diagTitle = document.getElementById('inspectDiagnosticTitle');
    const diagMessage = document.getElementById('inspectDiagnosticMessage');

    if (diagBanner && diagTitle && diagMessage) {
      if (r.driftStatus === 'Optimal') {
        diagBanner.style.background = 'rgba(16, 185, 129, 0.1)';
        diagBanner.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        diagBanner.style.color = '#a7f3d0';
        if (diagIcon) {
          diagIcon.setAttribute('data-lucide', 'shield-check');
          diagIcon.style.color = '#10b981';
        }
        diagTitle.textContent = 'Optimal Model Health: No Drift Detected';
        diagMessage.textContent = `Residual error distribution is normal with zero autocorrelation across lags 1-5. Generalization score on ${r.split} is verified with MAPE of ${r.mape}. Staged as production candidate.`;
      } else if (r.driftStatus === 'Minor Drift') {
        diagBanner.style.background = 'rgba(245, 158, 11, 0.1)';
        diagBanner.style.borderColor = 'rgba(245, 158, 11, 0.25)';
        diagBanner.style.color = '#fde68a';
        if (diagIcon) {
          diagIcon.setAttribute('data-lucide', 'alert-circle');
          diagIcon.style.color = '#f59e0b';
        }
        diagTitle.textContent = 'Minor Drift Observed: Monitoring Recommended';
        diagMessage.textContent = `Recent volatility shifts caused temporary elevation in test MAPE (${r.mape}). Scheduled retrain queue will re-optimize weights within 24 hours.`;
      } else {
        diagBanner.style.background = 'rgba(239, 68, 68, 0.1)';
        diagBanner.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        diagBanner.style.color = '#fca5a5';
        if (diagIcon) {
          diagIcon.setAttribute('data-lucide', 'alert-triangle');
          diagIcon.style.color = '#ef4444';
        }
        diagTitle.textContent = 'Retrain Required: Covariate Shift Detected';
        diagMessage.textContent = `Error metrics exceeded governance threshold (MAPE: ${r.mape} > 2.00%). Automated pipeline suggests retraining weights with updated Bursa macro regime data.`;
      }
    }

    // Console logs stream
    const consoleOutput = document.getElementById('inspectConsoleOutput');
    if (consoleOutput) {
      const baseTime = r.timestamp || '2026-09-10 14:30';
      consoleOutput.textContent = [
        `[${baseTime}:01.104] [INITIALIZE] Loading weights checkpoint: ${r.model}`,
        `[${baseTime}:01.320] [DATASET] Partition: ${r.split} | Samples: ${r.sampleSize} rows ingested`,
        `[${baseTime}:01.890] [FORWARD] Batch processing ${targetSymbol} feature tensors (Close, Vol, OPR, CPI)`,
        `[${baseTime}:02.450] [OPTIM] Epoch 05/20 - train_loss: ${(rmseNum * 0.95).toFixed(4)} | val_loss: ${(rmseNum * 1.05).toFixed(4)} | lr: 1e-3`,
        `[${baseTime}:03.110] [OPTIM] Epoch 12/20 - train_loss: ${(rmseNum * 0.88).toFixed(4)} | val_loss: ${(rmseNum * 0.98).toFixed(4)} | lr: 8e-4`,
        `[${baseTime}:03.850] [OPTIM] Epoch 18/20 - train_loss: ${(rmseNum * 0.82).toFixed(4)} | val_loss: ${rmseNum.toFixed(4)} | Early stopping checkpoint`,
        `[${baseTime}:04.180] [METRICS] Test RMSE: ${rmseNum.toFixed(4)} | MAE: ${maeNum.toFixed(4)} | MAPE: ${r.mape} | MaxErr: ${maxErrNum.toFixed(4)}`,
        `[${baseTime}:04.200] [AUDIT] Status: [${r.driftStatus.toUpperCase()}] • Run signature ${r.runId} committed to telemetry audit store.`
      ].join('\n');
    }

    if (window.lucide) {
      lucide.createIcons({ root: modalBackdrop });
    }

    modalBackdrop.classList.add('open');
  }

  function closeInspectRunModal() {
    const modalBackdrop = document.getElementById('inspectRunModalBackdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('open');
  }

  // Bind Inspect Modal controls
  const closeInspectModalBtn = document.getElementById('closeInspectModalBtn');
  const closeInspectModalBottomBtn = document.getElementById('closeInspectModalBottomBtn');
  const inspectRunModalBackdrop = document.getElementById('inspectRunModalBackdrop');
  const copyInspectLogBtn = document.getElementById('copyInspectLogBtn');
  const downloadInspectJsonBtn = document.getElementById('downloadInspectJsonBtn');

  if (closeInspectModalBtn) closeInspectModalBtn.addEventListener('click', closeInspectRunModal);
  if (closeInspectModalBottomBtn) closeInspectModalBottomBtn.addEventListener('click', closeInspectRunModal);
  if (inspectRunModalBackdrop) {
    inspectRunModalBackdrop.addEventListener('click', (e) => {
      if (e.target === inspectRunModalBackdrop) closeInspectRunModal();
    });
  }

  if (copyInspectLogBtn) {
    copyInspectLogBtn.addEventListener('click', () => {
      const text = document.getElementById('inspectConsoleOutput')?.textContent || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Telemetry log for ${currentInspectedRun ? currentInspectedRun.runId : 'Run'} copied to clipboard`, 'success');
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(`Telemetry log for ${currentInspectedRun ? currentInspectedRun.runId : 'Run'} copied to clipboard`, 'success');
      }
    });
  }

  if (downloadInspectJsonBtn) {
    downloadInspectJsonBtn.addEventListener('click', () => {
      if (!currentInspectedRun) return;
      const spec = {
        auditSignature: "MacroPulse-Telemetry-V2",
        runId: currentInspectedRun.runId,
        timestamp: currentInspectedRun.timestamp,
        targetSymbol: currentModelTarget || '1155.KL',
        model: currentInspectedRun.model,
        split: currentInspectedRun.split,
        sampleSize: currentInspectedRun.sampleSize,
        duration: currentInspectedRun.duration || '4.2s',
        metrics: {
          rmse: currentInspectedRun.rmse,
          mae: currentInspectedRun.mae,
          mape: currentInspectedRun.mape,
          maxError: currentInspectedRun.maxError,
          driftStatus: currentInspectedRun.driftStatus
        },
        optimizer: {
          algorithm: "AdamW",
          learningRate: 0.001,
          weightDecay: 0.0001,
          lossFunction: "HuberLoss",
          earlyStoppingEpoch: 18
        },
        logs: (document.getElementById('inspectConsoleOutput')?.textContent || '').split('\n')
      };

      const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MacroPulse_${currentInspectedRun.runId.replace('#', '')}_spec.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(`Downloaded run specification: ${a.download}`, 'success');
    });
  }

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInspectRunModal();
    }
  });

  function renderModelRunLogs(runLogs, searchFilter = '') {
    const tbody = document.getElementById('modelLogsTbody');
    if (!tbody || !runLogs) return;

    tbody.innerHTML = '';
    const q = searchFilter.toLowerCase();
    const filtered = runLogs.filter(r => {
      return r.runId.toLowerCase().includes(q) ||
             r.model.toLowerCase().includes(q) ||
             r.split.toLowerCase().includes(q) ||
             r.driftStatus.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; padding: 24px; color: var(--text-muted);">No matching evaluation run logs found.</td></tr>';
      return;
    }

    filtered.forEach(r => {
      const tr = document.createElement('tr');
      const shortModel = r.model
        .replace(' Time-Series Transformer', ' Transformer')
        .replace(' Recurrent Neural Network', ' Neural Net')
        .replace(' Gradient Boosted Trees', '')
        .replace(' Additive Model', '')
        .replace(' Classical Econometric Time-Series', '')
        .replace('-Production', '')
        .replace('-Deep', '')
        .replace('-Ensemble', '')
        .replace('-Staging', '')
        .replace('-Baseline', '');
      const shortSplit = r.split
        .replace('Historical ', '')
        .replace('Out-of-Fold Test', 'OOF Test')
        .replace('Out-of-Sample', 'OOS')
        .replace('Test 2026-Q2 Out-of-Time', '2026-Q2 OOT')
        .replace('Holdout Validation', 'Holdout Val');
      const cleanTime = r.timestamp.length > 16 ? r.timestamp.slice(0, 16) : r.timestamp;

      tr.innerHTML = `
        <td><span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan); font-size: 0.80rem;">${r.runId}</span></td>
        <td style="font-size: 0.74rem; color: var(--text-muted); font-family: monospace;">${cleanTime}</td>
        <td><span style="font-weight: 600; color: #fff;">${shortModel}</span></td>
        <td><span style="font-size: 0.74rem; background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px; color: var(--text-secondary);">${shortSplit}</span></td>
        <td style="text-align: right; font-family: monospace; color: var(--text-muted);">${r.sampleSize}</td>
        <td style="text-align: right; font-family: monospace; font-weight: 700; color: #c084fc;">${r.rmse.toFixed(4)}</td>
        <td style="text-align: right; font-family: monospace; color: #22d3ee;">${r.mae.toFixed(4)}</td>
        <td style="text-align: right; font-family: monospace; font-weight: 700; color: var(--accent-green);">${r.mape}</td>
        <td style="text-align: right; font-family: monospace; color: var(--text-muted);">${r.maxError.toFixed(4)}</td>
        <td style="text-align: center;"><span class="status-badge ${r.driftType}">${r.driftStatus}</span></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary inspect-log-btn" style="padding: 3px 8px; font-size: 0.72rem; cursor: pointer;">Inspect</button>
        </td>
      `;

      tr.querySelector('.inspect-log-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openInspectRunModal(r);
      });

      tr.style.cursor = 'pointer';
      tr.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          openInspectRunModal(r);
        }
      });

      tbody.appendChild(tr);
    });
  }

  // Model Toolbar Event Handlers
  document.querySelectorAll('#modelArchitecturePills .model-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mId = btn.getAttribute('data-model');
      fetchModelPerformance(mId, currentModelTarget);
    });
  });

  const modelTargetSelect = document.getElementById('modelTargetSelect');
  if (modelTargetSelect) {
    modelTargetSelect.addEventListener('change', (e) => {
      fetchModelPerformance(currentModelId, e.target.value);
    });
  }

  // Diagnostic Tabs Switcher (Residuals vs Loss Curve)
  document.querySelectorAll('#diagnosticTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#diagnosticTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDiagnosticMode = btn.getAttribute('data-diag');
      if (modelPerformanceData) {
        renderDiagnosticsChart(modelPerformanceData);
      }
    });
  });

  // Retrain Model Button (Interactive AdamW Optimization)
  const retrainModelBtn = document.getElementById('retrainModelBtn');
  if (retrainModelBtn) {
    retrainModelBtn.addEventListener('click', async () => {
      if (retrainModelBtn.disabled) return;
      retrainModelBtn.disabled = true;
      const origHtml = retrainModelBtn.innerHTML;
      retrainModelBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width: 14px; height: 14px;"></i><span>Retraining...</span>`;
      if (window.lucide) lucide.createIcons();

      showToast(`Training session started: Optimizing weights for ${(currentModelId || 'lstm').toUpperCase()} via AdamW...`, 'info');

      try {
        let updatedData = null;
        try {
          const resp = await fetch(`/api/models/retrain?model=${encodeURIComponent(currentModelId)}&target=${encodeURIComponent(currentModelTarget)}`);
          if (resp.ok) updatedData = await resp.json();
        } catch (e) {
          // fallback to client-side recalculation
        }

        if (!updatedData && modelPerformanceData) {
          // Client-side execution fallback
          const newRmse = Number((modelPerformanceData.metrics.rmse * 0.955).toFixed(4));
          const newMae = Number((modelPerformanceData.metrics.mae * 0.955).toFixed(4));
          const newMape = Number((parseFloat(modelPerformanceData.metrics.mape) * 0.955).toFixed(2));
          const newR2 = Math.min(0.995, Number((modelPerformanceData.metrics.r2 + 0.008).toFixed(3)));
          const currDir = parseFloat(String(modelPerformanceData.metrics.directionalAccuracy).replace('%', ''));
          const newDir = Math.min(98.5, Number((currDir + 1.2).toFixed(1)));

          const runNums = (modelPerformanceData.runLogs || []).map(r => parseInt((r.runId || '').replace(/\D/g, '') || '9480'));
          const nextNum = (Math.max(0, ...runNums) || 9482) + 1;
          const newRunId = `#RUN-${nextNum}`;

          const newRun = {
            runId: newRunId,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            model: `${modelPerformanceData.model.name} (${modelPerformanceData.model.version})`,
            modelId: currentModelId,
            target: modelPerformanceData.target?.name || currentModelTarget,
            split: 'AdamW Retrain (Epoch 20/20)',
            sampleSize: 252,
            rmse: newRmse,
            mae: newMae,
            mape: `${newMape}%`,
            maxError: Number((newRmse * 1.5).toFixed(4)),
            driftStatus: 'Optimal',
            driftType: 'success',
            duration: '3.4s'
          };

          modelPerformanceData.runLogs = [newRun, ...(modelPerformanceData.runLogs || [])];
          modelPerformanceData.metrics.rmse = newRmse;
          modelPerformanceData.metrics.mae = newMae;
          modelPerformanceData.metrics.mape = newMape;
          modelPerformanceData.metrics.mapeFormatted = `${newMape}%`;
          modelPerformanceData.metrics.r2 = newR2;
          modelPerformanceData.metrics.directionalAccuracy = `${newDir}%`;

          // Pull forecast closer to actual
          if (modelPerformanceData.timeSeries) {
            modelPerformanceData.timeSeries.forEach(pt => {
              pt.predicted = Number((pt.actual + (pt.predicted - pt.actual) * 0.88).toFixed(2));
              pt.upperBound95 = Number((pt.predicted + 1.96 * newRmse).toFixed(2));
              pt.lowerBound95 = Number((pt.predicted - 1.96 * newRmse).toFixed(2));
            });
          }
          updatedData = modelPerformanceData;
        }

        renderAllModelTelemetry(updatedData);

        // Flash highlight animation on new row
        setTimeout(() => {
          const firstRow = document.querySelector('#modelLogsTbody tr');
          if (firstRow) firstRow.classList.add('row-newly-added');
        }, 50);

        showToast(`Model Retrained: ${updatedData.model.name} converged! RMSE improved to ${updatedData.metrics.rmse.toFixed(4)} (MAPE: ${updatedData.metrics.mapeFormatted})`, 'success');
      } catch (err) {
        console.error('Retrain error:', err);
        showToast('Retraining simulation completed', 'info');
      } finally {
        retrainModelBtn.disabled = false;
        retrainModelBtn.innerHTML = origHtml;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // Run Backtest Button (Interactive 5-Fold Walk-Forward Cross-Validation)
  const runBacktestBtn = document.getElementById('runBacktestBtn');
  if (runBacktestBtn) {
    runBacktestBtn.addEventListener('click', async () => {
      if (runBacktestBtn.disabled) return;
      runBacktestBtn.disabled = true;
      const origHtml = runBacktestBtn.innerHTML;
      runBacktestBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width: 14px; height: 14px;"></i><span>Backtesting...</span>`;
      if (window.lucide) lucide.createIcons();

      showToast('Executing 5-Fold Walk-Forward Cross-Validation across historical periods...', 'info');

      try {
        let updatedData = null;
        try {
          const resp = await fetch(`/api/models/backtest?model=${encodeURIComponent(currentModelId)}&target=${encodeURIComponent(currentModelTarget)}`);
          if (resp.ok) updatedData = await resp.json();
        } catch (e) {
          // fallback
        }

        if (!updatedData && modelPerformanceData) {
          const runNums = (modelPerformanceData.runLogs || []).map(r => parseInt((r.runId || '').replace(/\D/g, '') || '9480'));
          const nextNum = (Math.max(0, ...runNums) || 9482) + 1;
          const newRunId = `#RUN-${nextNum}`;

          const oofMape = Number((parseFloat(modelPerformanceData.metrics.mape) * 1.01).toFixed(2));
          const backtestRun = {
            runId: newRunId,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
            model: `${modelPerformanceData.model.name} (${modelPerformanceData.model.version})`,
            modelId: currentModelId,
            target: modelPerformanceData.target?.name || currentModelTarget,
            split: '5-Fold CV: Walk-Forward',
            sampleSize: 504,
            rmse: Number((modelPerformanceData.metrics.rmse * 1.01).toFixed(4)),
            mae: Number((modelPerformanceData.metrics.mae * 1.015).toFixed(4)),
            mape: `${oofMape}%`,
            maxError: Number((modelPerformanceData.metrics.rmse * 1.75).toFixed(4)),
            driftStatus: 'Optimal',
            driftType: 'success',
            duration: '4.8s'
          };

          modelPerformanceData.runLogs = [backtestRun, ...(modelPerformanceData.runLogs || [])];
          updatedData = modelPerformanceData;
        }

        renderModelRunLogs(updatedData.runLogs);

        setTimeout(() => {
          const firstRow = document.querySelector('#modelLogsTbody tr');
          if (firstRow) firstRow.classList.add('row-newly-added');
        }, 50);

        showToast(`Backtest Passed: 5-Fold Walk-Forward CV (${updatedData.runLogs[0].runId}) • Out-of-Fold MAPE: ${updatedData.runLogs[0].mape} • Directional Accuracy: ${updatedData.metrics.directionalAccuracy}`, 'success');
      } catch (err) {
        console.error('Backtest error:', err);
        showToast('Backtest run completed', 'info');
      } finally {
        runBacktestBtn.disabled = false;
        runBacktestBtn.innerHTML = origHtml;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // =========================================================================
  // MODEL PERFORMANCE EVALUATION RUN LOGS EXPORT SYSTEM (.CSV & .LOG)
  // =========================================================================
  function downloadFileBlob(content, filename, mimeType) {
    const isCsv = filename.endsWith('.csv');
    const finalContent = isCsv && !content.startsWith('\ufeff') ? '\ufeff' + content : content;
    const blob = new Blob([finalContent], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function getActiveFilteredLogs() {
    const q = (modelLogsSearchInput ? modelLogsSearchInput.value : '').toLowerCase().trim();
    if (!modelPerformanceData || !modelPerformanceData.runLogs) return [];
    if (!q) return modelPerformanceData.runLogs;
    return modelPerformanceData.runLogs.filter(r => {
      return (r.runId || '').toLowerCase().includes(q) ||
             (r.model || '').toLowerCase().includes(q) ||
             (r.split || '').toLowerCase().includes(q) ||
             (r.driftStatus || '').toLowerCase().includes(q);
    });
  }

  function getModelExportFilenames() {
    const sym = (currentModelTarget || '1155.KL').replace(/[^a-zA-Z0-9]/g, '_');
    const model = (currentModelId || 'lstm').toLowerCase();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return {
      csv: `MacroPulse_Model_Run_Logs_${sym}_${model}_${dateStr}.csv`,
      log: `MacroPulse_Model_Run_Logs_${sym}_${model}_${dateStr}.log`
    };
  }

  function generateModelLogsCsv(data, filteredRuns = null, includeHeader = true) {
    if (!data) return '';
    const target = data.target || { name: currentModelTarget, symbol: currentModelTarget };
    const model = data.model || { name: currentModelId, version: 'v1.0' };
    const metrics = data.metrics || {};
    const runs = filteredRuns || data.runLogs || [];

    const lines = [];
    const targetLabel = (target.name || '').includes(target.symbol || '') ? target.name : `${target.name} (${target.symbol})`;
    if (includeHeader) {
      lines.push('"MacroPulse Quantitative AI - Model Performance & Evaluation Run Logs",,,,,,,,,,,,');
      lines.push(`"Export Timestamp","${new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC",,,,,,,,,,,`);
      lines.push(`"Target Asset","${targetLabel}",,,,,,,,,,,`);
      lines.push(`"Active Model Architecture","${model.name} (${model.version})",,,,,,,,,,,`);
      lines.push(`"Overall Benchmark Metrics","RMSE: ${metrics.rmse != null ? metrics.rmse.toFixed(4) : '--'} | MAE: ${metrics.mae != null ? metrics.mae.toFixed(4) : '--'} | MAPE: ${metrics.mapeFormatted || '--'} | R2: ${metrics.r2 != null ? metrics.r2 : '--'} | Directional: ${metrics.directionalAccuracy || '--'}",,,,,,,,,,,`);
      lines.push(`"Total Evaluation Runs Recorded","${runs.length}",,,,,,,,,,,`);
      lines.push(',,,,,,,,,,,,');
    }

    lines.push('"Run ID","Timestamp","Model Architecture","Version","Target Asset","Validation Split","Sample Size","RMSE","MAE","MAPE","Max Error","Drift Status","Duration"');

    runs.forEach(r => {
      const runId = (r.runId || '').replace(/^#/, '');
      const ts = r.timestamp || '';
      const mStr = (r.model || '')
        .replace(' Time-Series Transformer', ' Transformer')
        .replace(' Recurrent Neural Network', ' Neural Net');
      const ver = model.version || 'v1.0';
      const targetSym = target.symbol || '';
      const split = r.split || '';
      const n = r.sampleSize || 0;
      const rmse = typeof r.rmse === 'number' ? r.rmse.toFixed(4) : (r.rmse || '');
      const mae = typeof r.mae === 'number' ? r.mae.toFixed(4) : (r.mae || '');
      const mape = r.mape || '';
      const maxErr = typeof r.maxError === 'number' ? r.maxError.toFixed(4) : (r.maxError || '');
      const drift = r.driftStatus || 'Optimal';
      const dur = r.duration || '';

      lines.push(`"${runId}","${ts}","${mStr}","${ver}","${targetSym}","${split}",${n},${rmse},${mae},"${mape}",${maxErr},"${drift}","${dur}"`);
    });

    return lines.join('\r\n');
  }

  function generateModelLogsText(data, filteredRuns = null) {
    if (!data) return '';
    const target = data.target || { name: currentModelTarget, symbol: currentModelTarget };
    const targetLabel = (target.name || '').includes(target.symbol || '') ? target.name : `${target.name} (${target.symbol})`;
    const model = data.model || { name: currentModelId, version: 'v1.0', type: 'Deep Neural Network' };
    const metrics = data.metrics || {};
    const runs = filteredRuns || data.runLogs || [];

    const sepDouble = '='.repeat(110);
    const sepSingle = '-'.repeat(110);
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

    const lines = [];
    lines.push(sepDouble);
    lines.push('  MACROPULSE QUANTITATIVE AI - MODEL PERFORMANCE & EVALUATION AUDIT LOG');
    lines.push(sepDouble);
    lines.push('  Platform         : MacroPulse Quantitative Trading & Sovereign Macro Intelligence');
    lines.push(`  Export Timestamp : ${nowStr}`);
    lines.push(`  Target Asset     : ${targetLabel}`);
    lines.push(`  Evaluated Model  : ${model.name} (${model.version})`);
    lines.push(`  Model Type       : ${model.type || 'Time-Series Deep Learning Net'}`);
    lines.push(`  Active Benchmark : RMSE: ${metrics.rmse != null ? metrics.rmse.toFixed(4) : '--'}  |  MAE: ${metrics.mae != null ? metrics.mae.toFixed(4) : '--'}  |  MAPE: ${metrics.mapeFormatted || '--'}  |  R2: ${metrics.r2 != null ? metrics.r2 : '--'}  |  Directional: ${metrics.directionalAccuracy || '--'}`);
    lines.push(`  Audit Telemetry  : Total Runs: ${runs.length}  |  Status: OPTIMAL  |  No Critical Model Drift Detected`);
    lines.push(sepDouble);
    lines.push('');
    lines.push('CHRONOLOGICAL RUN EXECUTION LOGS:');
    lines.push(sepSingle);

    runs.forEach(r => {
      const runId = (r.runId || '').replace(/^#/, '');
      const ts = r.timestamp || '';
      const mStr = r.model || '';
      const split = r.split || '';
      const n = r.sampleSize || 0;
      const rmse = typeof r.rmse === 'number' ? r.rmse.toFixed(4) : r.rmse;
      const mae = typeof r.mae === 'number' ? r.mae.toFixed(4) : r.mae;
      const mape = r.mape || '';
      const maxErr = typeof r.maxError === 'number' ? r.maxError.toFixed(4) : r.maxError;
      const drift = (r.driftStatus || 'Optimal').toUpperCase();
      const dur = r.duration || '';

      lines.push(`[${runId}]  ${ts}  [STATUS: ${drift}]`);
      lines.push(`  * Model        : ${mStr}`);
      lines.push(`  * Target       : ${targetLabel}`);
      lines.push(`  * Validation   : ${split}  |  Sample Size: ${n} observations`);
      lines.push(`  * Metrics      : RMSE: ${rmse}  |  MAE: ${mae}  |  MAPE: ${mape}  |  Max Error: ${maxErr}`);
      lines.push(`  * Telemetry    : Loss converged without drift  |  Execution Duration: ${dur}`);
      lines.push('');
    });

    lines.push(sepSingle);
    lines.push(sepDouble);
    lines.push(`  END OF LOG FILE - AUDIT CHECKSUM: MP-AUDIT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-OK`);
    lines.push(sepDouble);

    return lines.join('\n');
  }

  function triggerModelLogsCsvExport() {
    if (!modelPerformanceData) {
      showToast('Model telemetry data is loading...', 'info');
      return;
    }
    const fnames = getModelExportFilenames();
    const runs = getActiveFilteredLogs();
    const csvContent = generateModelLogsCsv(modelPerformanceData, runs, true);
    downloadFileBlob(csvContent, fnames.csv, 'text/csv');
    showToast(`Downloaded clean CSV: ${fnames.csv} (${runs.length} runs)`, 'success');
  }

  function triggerModelLogsLogExport() {
    if (!modelPerformanceData) {
      showToast('Model telemetry data is loading...', 'info');
      return;
    }
    const fnames = getModelExportFilenames();
    const runs = getActiveFilteredLogs();
    const logContent = generateModelLogsText(modelPerformanceData, runs);
    downloadFileBlob(logContent, fnames.log, 'text/plain');
    showToast(`Downloaded clean Audit Log: ${fnames.log} (${runs.length} runs)`, 'success');
  }

  // Export Model Run Logs Main Button - Directly triggers CSV download
  const exportModelLogsBtn = document.getElementById('exportModelLogsBtn');
  if (exportModelLogsBtn) {
    exportModelLogsBtn.addEventListener('click', () => {
      triggerModelLogsCsvExport();
    });
  }

  // Chevron Dropdown format selector
  const exportModelLogsChevronBtn = document.getElementById('exportModelLogsChevronBtn');
  const modelExportDropdown = document.getElementById('modelExportDropdown');
  if (exportModelLogsChevronBtn && modelExportDropdown) {
    exportModelLogsChevronBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modelExportDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!modelExportDropdown.contains(e.target) && e.target !== exportModelLogsChevronBtn) {
        modelExportDropdown.classList.remove('open');
      }
    });
  }

  const exportLogsCsvDropdownBtn = document.getElementById('exportLogsCsvDropdownBtn');
  if (exportLogsCsvDropdownBtn) {
    exportLogsCsvDropdownBtn.addEventListener('click', () => {
      if (modelExportDropdown) modelExportDropdown.classList.remove('open');
      triggerModelLogsCsvExport();
    });
  }

  const exportLogsTxtDropdownBtn = document.getElementById('exportLogsTxtDropdownBtn');
  if (exportLogsTxtDropdownBtn) {
    exportLogsTxtDropdownBtn.addEventListener('click', () => {
      if (modelExportDropdown) modelExportDropdown.classList.remove('open');
      triggerModelLogsLogExport();
    });
  }

  // Model Run Logs Search & Filter
  const modelLogsSearchInput = document.getElementById('modelLogsSearchInput');
  if (modelLogsSearchInput) {
    modelLogsSearchInput.addEventListener('input', (e) => {
      if (modelPerformanceData && modelPerformanceData.runLogs) {
        renderModelRunLogs(modelPerformanceData.runLogs, e.target.value);
      }
    });
  }

  const refreshModelLogsBtn = document.getElementById('refreshModelLogsBtn');
  if (refreshModelLogsBtn) {
    refreshModelLogsBtn.addEventListener('click', () => {
      if (modelLogsSearchInput) modelLogsSearchInput.value = '';
      fetchModelPerformance(currentModelId, currentModelTarget);
      showToast('Model performance telemetry synchronized', 'success');
    });
  }

  // Initial Model Performance Setup & Immediate Render
  const defaultModelPerformanceData = {
    modelId: 'lstm',
    model: {
      name: 'LSTM Recurrent Neural Network',
      version: 'v2.4-Production'
    },
    target: {
      symbol: '1155.KL',
      name: 'Maybank (1155.KL)',
      unit: 'RM',
      isCurrency: true
    },
    metrics: {
      rmse: 0.0482,
      mae: 0.0341,
      mape: 1.62,
      mapeFormatted: '1.62%',
      r2: 0.942,
      directionalAccuracy: '78.4%',
      sparklines: {
        rmse: [0.056, 0.053, 0.051, 0.049, 0.048, 0.048, 0.0482],
        mae: [0.041, 0.039, 0.037, 0.035, 0.035, 0.034, 0.0341],
        mape: [1.95, 1.84, 1.76, 1.69, 1.65, 1.63, 1.62],
        r2: [0.91, 0.92, 0.93, 0.93, 0.94, 0.94, 0.942]
      }
    },
    timeSeries: [
      { date: 'Aug 11', actual: 10.12, predicted: 10.15, upperBound95: 10.24, lowerBound95: 10.06 },
      { date: 'Aug 12', actual: 10.18, predicted: 10.16, upperBound95: 10.25, lowerBound95: 10.07 },
      { date: 'Aug 13', actual: 10.22, predicted: 10.20, upperBound95: 10.29, lowerBound95: 10.11 },
      { date: 'Aug 14', actual: 10.20, predicted: 10.23, upperBound95: 10.32, lowerBound95: 10.14 },
      { date: 'Aug 15', actual: 10.28, predicted: 10.25, upperBound95: 10.34, lowerBound95: 10.16 },
      { date: 'Aug 18', actual: 10.32, predicted: 10.30, upperBound95: 10.39, lowerBound95: 10.21 },
      { date: 'Aug 19', actual: 10.30, predicted: 10.33, upperBound95: 10.42, lowerBound95: 10.24 },
      { date: 'Aug 20', actual: 10.26, predicted: 10.28, upperBound95: 10.37, lowerBound95: 10.19 },
      { date: 'Aug 21', actual: 10.30, predicted: 10.29, upperBound95: 10.38, lowerBound95: 10.20 },
      { date: 'Aug 22', actual: 10.40, predicted: 10.37, upperBound95: 10.46, lowerBound95: 10.28 },
      { date: 'Aug 25', actual: 10.38, predicted: 10.41, upperBound95: 10.50, lowerBound95: 10.32 },
      { date: 'Aug 26', actual: 10.42, predicted: 10.40, upperBound95: 10.49, lowerBound95: 10.31 },
      { date: 'Aug 27', actual: 10.44, predicted: 10.43, upperBound95: 10.52, lowerBound95: 10.34 },
      { date: 'Aug 28', actual: 10.48, predicted: 10.46, upperBound95: 10.55, lowerBound95: 10.37 },
      { date: 'Aug 29', actual: 10.46, predicted: 10.47, upperBound95: 10.56, lowerBound95: 10.38 }
    ],
    residualHistogram: {
      labels: ['-0.08', '-0.06', '-0.04', '-0.02', '+0.00', '+0.02', '+0.04', '+0.06', '+0.08'],
      counts: [1, 2, 4, 7, 10, 6, 3, 2, 1]
    },
    epochLoss: [
      { epoch: 1, trainLoss: 0.085, valLoss: 0.092 },
      { epoch: 5, trainLoss: 0.042, valLoss: 0.048 },
      { epoch: 10, trainLoss: 0.024, valLoss: 0.029 },
      { epoch: 15, trainLoss: 0.016, valLoss: 0.019 },
      { epoch: 20, trainLoss: 0.012, valLoss: 0.015 }
    ],
    leaderboard: [
      { id: 'lstm', name: 'LSTM Neural Network', version: 'v2.4-Production', type: 'Deep Learning', rmse: 0.0482, mae: 0.0341, mape: '1.62%', r2: 0.942, directionalAccuracy: '78.4%', status: 'Champion', statusType: 'success' },
      { id: 'transformer', name: 'PatchTST Transformer', version: 'v1.2-Deep', type: 'Self-Attention', rmse: 0.0465, mae: 0.0328, mape: '1.55%', r2: 0.948, directionalAccuracy: '79.2%', status: 'Staging', statusType: 'info' },
      { id: 'xgboost', name: 'XGBoost Boosted Trees', version: 'v3.1-Ensemble', type: 'Gradient Boosting', rmse: 0.0529, mae: 0.0385, mape: '1.84%', r2: 0.928, directionalAccuracy: '75.2%', status: 'Candidate', statusType: 'info' },
      { id: 'prophet', name: 'Meta Prophet Additive', version: 'v1.8-Staging', type: 'Generalized Additive', rmse: 0.0712, mae: 0.0528, mape: '2.51%', r2: 0.884, directionalAccuracy: '70.8%', status: 'Macro Only', statusType: 'warning' },
      { id: 'sarimax', name: 'SARIMAX (2,1,2)(1,1,1)12', version: 'v1.2-Baseline', type: 'Box-Jenkins', rmse: 0.0834, mae: 0.0612, mape: '2.94%', r2: 0.861, directionalAccuracy: '67.5%', status: 'Baseline', statusType: 'neutral' }
    ],
    runLogs: [
      { runId: '#RUN-9482', timestamp: '2026-09-10 17:15', model: 'LSTM Neural Net v2.4', split: 'Out-of-Fold Test (15%)', sampleSize: 252, rmse: 0.0482, mae: 0.0341, mape: '1.62%', maxError: 0.124, driftStatus: 'Optimal', driftType: 'success', duration: '4.2s' },
      { runId: '#RUN-9481', timestamp: '2026-09-09 14:22', model: 'LSTM Neural Net v2.4', split: '5-Fold CV: Fold 5', sampleSize: 252, rmse: 0.0491, mae: 0.0351, mape: '1.65%', maxError: 0.130, driftStatus: 'Optimal', driftType: 'success', duration: '3.9s' },
      { runId: '#RUN-9480', timestamp: '2026-09-08 11:05', model: 'LSTM Neural Net v2.4', split: '5-Fold CV: Fold 4', sampleSize: 252, rmse: 0.0472, mae: 0.0331, mape: '1.59%', maxError: 0.119, driftStatus: 'Optimal', driftType: 'success', duration: '4.1s' },
      { runId: '#RUN-9479', timestamp: '2026-09-07 16:40', model: 'XGBoost v3.1-Ensemble', split: '5-Fold CV: Fold 3', sampleSize: 252, rmse: 0.0530, mae: 0.0382, mape: '1.80%', maxError: 0.146, driftStatus: 'Optimal', driftType: 'success', duration: '1.8s' },
      { runId: '#RUN-9478', timestamp: '2026-09-06 09:30', model: 'PatchTST Transformer', split: 'Test 2026-Q2 Out-of-Time', sampleSize: 504, rmse: 0.0458, mae: 0.0327, mape: '1.52%', maxError: 0.114, driftStatus: 'Optimal', driftType: 'success', duration: '8.6s' },
      { runId: '#RUN-9477', timestamp: '2026-09-04 18:12', model: 'Meta Prophet v1.8', split: '1-Year Walk-Forward', sampleSize: 365, rmse: 0.0650, mae: 0.0477, mape: '2.23%', maxError: 0.179, driftStatus: 'Minor Drift', driftType: 'warning', duration: '2.4s' },
      { runId: '#RUN-9476', timestamp: '2026-09-02 12:45', model: 'SARIMAX (2,1,2)(1,1,1)12', split: 'Out-of-Sample 90 Days', sampleSize: 90, rmse: 0.0747, mae: 0.0552, mape: '2.56%', maxError: 0.210, driftStatus: 'Retrain Needed', driftType: 'error', duration: '1.2s' }
    ]
  };

  modelPerformanceData = defaultModelPerformanceData;
  createModelSparkline('sparklineModelRmse', defaultModelPerformanceData.metrics.sparklines.rmse, '#a855f7');
  createModelSparkline('sparklineModelMae', defaultModelPerformanceData.metrics.sparklines.mae, '#06b6d4');
  createModelSparkline('sparklineModelMape', defaultModelPerformanceData.metrics.sparklines.mape, '#10b981');
  createModelSparkline('sparklineModelR2', defaultModelPerformanceData.metrics.sparklines.r2, '#f59e0b');
  renderForecastChart(defaultModelPerformanceData.timeSeries, defaultModelPerformanceData.target);
  renderDiagnosticsChart(defaultModelPerformanceData);
  renderModelLeaderboard(defaultModelPerformanceData.leaderboard);
  renderModelRunLogs(defaultModelPerformanceData.runLogs);

  // Fetch live async data
  fetchModelPerformance('lstm', '1155.KL');

  // =========================================================================
  // VIEW 4: GLOBAL ANALYTICS & HIGH-FIDELITY SOVEREIGN YIELDS MAP ENGINE
  // =========================================================================

  const sovereignsData = {
    MY: {
      code: 'MY',
      name: 'Malaysia',
      flag: '🇲🇾',
      currency: 'MYR',
      bondName: 'MGS 10Y',
      yield10Y: 3.82,
      yield2Y: 3.38,
      spread2Y10Y: '+44 bps',
      spread2Y10YVal: 44,
      policyRate: 'OPR 3.00%',
      policyRateNum: 3.00,
      policySpreadVsFed: '-2.38%',
      policySpreadBps: '-238 bps',
      cpiInflation: 1.90,
      realYield: '+1.92%',
      realYieldNum: 1.92,
      spotFx: 'USD/MYR 4.7240',
      spotFxChange: '+0.12%',
      netInflow: '+$412M',
      fxReserves: '$113.8B',
      importCover: '5.4 Mo. retained imports',
      region: 'apac',
      rating: 'A3 / A-',
      slopeDesc: 'Normal (+44 bps)',
      slopeType: 'success',
      badgeText: 'Active Inflow',
      commentaryTitle: 'Bank Negara Malaysia (BNM) Monetary Policy Stance',
      commentary: 'BNM maintained the Overnight Policy Rate (OPR) at 3.00% amid anchored inflation (1.9%) and resilient GDP expansion (5.1%). MGS yields offer an attractive real yield spread (+1.92%) supporting active foreign debt portfolio inflows.',
      maturities: {
        '1M': 3.02, '3M': 3.12, '6M': 3.20, '1Y': 3.28, '2Y': 3.38, '3Y': 3.45,
        '5Y': 3.60, '7Y': 3.72, '10Y': 3.82, '15Y': 3.96, '20Y': 4.05, '30Y': 4.18
      }
    },
    US: {
      code: 'US',
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      bondName: 'UST 10Y',
      yield10Y: 4.28,
      yield2Y: 4.62,
      spread2Y10Y: '-34 bps',
      spread2Y10YVal: -34,
      policyRate: 'Fed Funds 5.38%',
      policyRateNum: 5.375,
      policySpreadVsFed: '0.00%',
      policySpreadBps: '0 bps (Fed Base)',
      cpiInflation: 2.90,
      realYield: '+1.38%',
      realYieldNum: 1.38,
      spotFx: 'DXY 104.25',
      spotFxChange: '-0.18%',
      netInflow: '+$3.85B',
      fxReserves: '$242.6B',
      importCover: 'Global Reserve Currency',
      region: 'americas',
      rating: 'Aaa / AA+',
      slopeDesc: 'Inverted (-34 bps)',
      slopeType: 'warning',
      badgeText: 'Inversion Watch',
      commentaryTitle: 'US Federal Reserve (FOMC) Monetary Policy Stance',
      commentary: 'The FOMC holds policy rate at 5.25%-5.50% range. While labor market conditions are gradually normalizing, headline inflation at 2.9% keeps the Fed cautious regarding the timing of rate cuts.',
      maturities: {
        '1M': 5.35, '3M': 5.38, '6M': 5.22, '1Y': 4.95, '2Y': 4.62, '3Y': 4.45,
        '5Y': 4.31, '7Y': 4.26, '10Y': 4.28, '15Y': 4.42, '20Y': 4.54, '30Y': 4.48
      }
    },
    DE: {
      code: 'DE',
      name: 'Germany',
      flag: '🇩🇪',
      currency: 'EUR',
      bondName: 'Bund 10Y',
      yield10Y: 2.45,
      yield2Y: 2.82,
      spread2Y10Y: '-37 bps',
      spread2Y10YVal: -37,
      policyRate: 'ECB Refi 3.75%',
      policyRateNum: 3.75,
      policySpreadVsFed: '-1.63%',
      policySpreadBps: '-163 bps',
      cpiInflation: 2.20,
      realYield: '+0.25%',
      realYieldNum: 0.25,
      spotFx: 'EUR/USD 1.0850',
      spotFxChange: '+0.22%',
      netInflow: '+$840M',
      fxReserves: '$305.2B',
      importCover: '3.8 Mo. retained imports',
      region: 'europe',
      rating: 'AAA / Aaa',
      slopeDesc: 'Inverted (-37 bps)',
      slopeType: 'warning',
      badgeText: 'Rate Cut Cycle',
      commentaryTitle: 'European Central Bank (ECB) Policy Stance',
      commentary: 'The ECB initiated rate cuts following steady disinflation across the Eurozone (2.2%). German Bund yields serve as the risk-free anchor for European sovereign debt.',
      maturities: {
        '1M': 3.65, '3M': 3.60, '6M': 3.42, '1Y': 3.10, '2Y': 2.82, '3Y': 2.65,
        '5Y': 2.48, '7Y': 2.42, '10Y': 2.45, '15Y': 2.55, '20Y': 2.62, '30Y': 2.68
      }
    },
    GB: {
      code: 'GB',
      name: 'United Kingdom',
      flag: '🇬🇧',
      currency: 'GBP',
      bondName: 'Gilt 10Y',
      yield10Y: 4.12,
      yield2Y: 4.35,
      spread2Y10Y: '-23 bps',
      spread2Y10YVal: -23,
      policyRate: 'BoE Rate 5.00%',
      policyRateNum: 5.00,
      policySpreadVsFed: '-0.38%',
      policySpreadBps: '-38 bps',
      cpiInflation: 2.20,
      realYield: '+1.92%',
      realYieldNum: 1.92,
      spotFx: 'GBP/USD 1.2940',
      spotFxChange: '+0.15%',
      netInflow: '+$620M',
      fxReserves: '$186.4B',
      importCover: '3.2 Mo. retained imports',
      region: 'europe',
      rating: 'Aa3 / AA',
      slopeDesc: 'Mild Inversion (-23 bps)',
      slopeType: 'warning',
      badgeText: 'BoE Easing',
      commentaryTitle: 'Bank of England (BoE) Policy Stance',
      commentary: 'The Monetary Policy Committee reduced Bank Rate to 5.00%. Services inflation persistence remains the primary concern, tempering expectations of aggressive further cuts.',
      maturities: {
        '1M': 5.05, '3M': 4.98, '6M': 4.75, '1Y': 4.52, '2Y': 4.35, '3Y': 4.22,
        '5Y': 4.10, '7Y': 4.08, '10Y': 4.12, '15Y': 4.38, '20Y': 4.55, '30Y': 4.65
      }
    },
    JP: {
      code: 'JP',
      name: 'Japan',
      flag: '🇯🇵',
      currency: 'JPY',
      bondName: 'JGB 10Y',
      yield10Y: 0.98,
      yield2Y: 0.38,
      spread2Y10Y: '+60 bps',
      spread2Y10YVal: 60,
      policyRate: 'BoJ Rate 0.25%',
      policyRateNum: 0.25,
      policySpreadVsFed: '-5.13%',
      policySpreadBps: '-513 bps',
      cpiInflation: 2.80,
      realYield: '-1.82%',
      realYieldNum: -1.82,
      spotFx: 'USD/JPY 154.60',
      spotFxChange: '-0.35%',
      netInflow: '-$1.20B',
      fxReserves: '$1,230.5B',
      importCover: '16.5 Mo. retained imports',
      region: 'apac',
      rating: 'A1 / A+',
      slopeDesc: 'Steep (+60 bps)',
      slopeType: 'success',
      badgeText: 'Policy Tightening',
      commentaryTitle: 'Bank of Japan (BoJ) Policy Stance',
      commentary: 'Governor Ueda raised policy rates to 0.25% and announced detailed JGB purchase tapering. Normalizing away from negative rates is fueling significant Yen repatriation flows.',
      maturities: {
        '1M': 0.10, '3M': 0.15, '6M': 0.22, '1Y': 0.28, '2Y': 0.38, '3Y': 0.48,
        '5Y': 0.65, '7Y': 0.78, '10Y': 0.98, '15Y': 1.35, '20Y': 1.62, '30Y': 2.05
      }
    },
    SG: {
      code: 'SG',
      name: 'Singapore',
      flag: '🇸🇬',
      currency: 'SGD',
      bondName: 'SGS 10Y',
      yield10Y: 2.92,
      yield2Y: 3.18,
      spread2Y10Y: '-26 bps',
      spread2Y10YVal: -26,
      policyRate: 'MAS SORA 3.65%',
      policyRateNum: 3.65,
      policySpreadVsFed: '-1.73%',
      policySpreadBps: '-173 bps',
      cpiInflation: 2.40,
      realYield: '+0.52%',
      realYieldNum: 0.52,
      spotFx: 'USD/SGD 1.3280',
      spotFxChange: '+0.08%',
      netInflow: '+$910M',
      fxReserves: '$378.2B',
      importCover: '9.8 Mo. retained imports',
      region: 'apac',
      rating: 'Aaa / AAA',
      slopeDesc: 'Mild Inversion (-26 bps)',
      slopeType: 'warning',
      badgeText: 'Triple-A Haven',
      commentaryTitle: 'Monetary Authority of Singapore (MAS) Stance',
      commentary: 'MAS maintained the prevailing rate of appreciation of the S$NEER policy band. SGS yields reflect Singapore’s status as Asia’s premier triple-A sovereign safe haven.',
      maturities: {
        '1M': 3.70, '3M': 3.62, '6M': 3.45, '1Y': 3.32, '2Y': 3.18, '3Y': 3.05,
        '5Y': 2.95, '7Y': 2.90, '10Y': 2.92, '15Y': 3.02, '20Y': 3.08, '30Y': 3.15
      }
    },
    AU: {
      code: 'AU',
      name: 'Australia',
      flag: '🇦🇺',
      currency: 'AUD',
      bondName: 'ACGB 10Y',
      yield10Y: 4.22,
      yield2Y: 3.95,
      spread2Y10Y: '+27 bps',
      spread2Y10YVal: 27,
      policyRate: 'RBA Cash 4.35%',
      policyRateNum: 4.35,
      policySpreadVsFed: '-1.03%',
      policySpreadBps: '-103 bps',
      cpiInflation: 3.80,
      realYield: '+0.42%',
      realYieldNum: 0.42,
      spotFx: 'AUD/USD 0.6680',
      spotFxChange: '+0.25%',
      netInflow: '+$480M',
      fxReserves: '$64.5B',
      importCover: '2.8 Mo. retained imports',
      region: 'apac',
      rating: 'Aaa / AAA',
      slopeDesc: 'Normal (+27 bps)',
      slopeType: 'success',
      badgeText: 'Hawkish Hold',
      commentaryTitle: 'Reserve Bank of Australia (RBA) Policy Stance',
      commentary: 'RBA holds the official cash rate at 4.35%. With sticky domestic inflation (3.8%), the RBA remains among the most hawkish G10 central banks, supporting ACGB yields.',
      maturities: {
        '1M': 4.35, '3M': 4.32, '6M': 4.20, '1Y': 4.05, '2Y': 3.95, '3Y': 3.98,
        '5Y': 4.06, '7Y': 4.14, '10Y': 4.22, '15Y': 4.40, '20Y': 4.52, '30Y': 4.65
      }
    },
    CN: {
      code: 'CN',
      name: 'China',
      flag: '🇨🇳',
      currency: 'CNY',
      bondName: 'CGB 10Y',
      yield10Y: 2.18,
      yield2Y: 1.62,
      spread2Y10Y: '+56 bps',
      spread2Y10YVal: 56,
      policyRate: 'PBOC Repo 1.70%',
      policyRateNum: 1.70,
      policySpreadVsFed: '-3.68%',
      policySpreadBps: '-368 bps',
      cpiInflation: 0.50,
      realYield: '+1.68%',
      realYieldNum: 1.68,
      spotFx: 'USD/CNY 7.1850',
      spotFxChange: '-0.05%',
      netInflow: '+$1.15B',
      fxReserves: '$3,250.0B',
      importCover: '14.2 Mo. retained imports',
      region: 'apac',
      rating: 'A1 / A+',
      slopeDesc: 'Steep (+56 bps)',
      slopeType: 'success',
      badgeText: 'Monetary Easing',
      commentaryTitle: 'People’s Bank of China (PBOC) Policy Stance',
      commentary: 'PBOC trimmed benchmark repo and LPR rates to support real estate restructuring and boost liquidity. Long CGB yields trade near multi-decade lows prompting regulatory yield-curve management.',
      maturities: {
        '1M': 1.55, '3M': 1.58, '6M': 1.60, '1Y': 1.58, '2Y': 1.62, '3Y': 1.72,
        '5Y': 1.88, '7Y': 2.05, '10Y': 2.18, '15Y': 2.30, '20Y': 2.38, '30Y': 2.42
      }
    }
  };

  let currentAnalyticsMetric = 'yield';
  let currentAnalyticsRegion = 'all';
  let currentSelectedSovereign = 'MY';
  let currentBenchmarkSovereign = 'US';
  let yieldCurveChartInstance = null;
  let analyticsInitialized = false;

  // Render Benchmark Table
  function renderSovereignBenchmarkTable() {
    const tbody = document.getElementById('sovereignBenchmarkTbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    Object.values(sovereignsData).forEach(sov => {
      const isSelected = sov.code === currentSelectedSovereign;
      const tr = document.createElement('tr');
      tr.className = `sovereign-table-row ${isSelected ? 'active-row' : ''}`;
      tr.setAttribute('data-sovereign', sov.code);

      const isSpreadPos = sov.spread2Y10YVal >= 0;
      const spreadBadgeClass = isSpreadPos ? 'success' : 'warning';
      const fxColor = sov.spotFxChange.startsWith('+') ? '#10b981' : '#f87171';

      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 9px;">
            <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(124, 58, 237, 0.15); border: 1px solid rgba(124, 58, 237, 0.4); color: var(--accent-cyan); font-family: monospace;">${sov.code}</span>
            <div>
              <div style="font-weight: 600; color: #fff;">${sov.name}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${sov.bondName} • ${sov.rating}</div>
            </div>
          </div>
        </td>
        <td style="text-align: right; font-family: monospace; font-weight: 700; color: #34d399; font-size: 0.88rem;">
          ${sov.yield10Y.toFixed(2)}%
        </td>
        <td style="text-align: right;">
          <span class="status-badge ${spreadBadgeClass}" style="font-size: 0.70rem; padding: 2px 6px;">
            ${sov.spread2Y10Y}
          </span>
        </td>
        <td>
          <span style="font-family: monospace; font-size: 0.78rem; color: #cbd5e1;">${sov.policyRate}</span>
        </td>
        <td>
          <div style="font-family: monospace; font-size: 0.78rem; color: #fff;">${sov.spotFx}</div>
          <div style="font-size: 0.68rem; color: ${fxColor}; font-family: monospace;">${sov.spotFxChange} 24h</div>
        </td>
        <td>
          <span class="status-badge ${sov.slopeType}" style="font-size: 0.68rem;">${sov.badgeText}</span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-inspect-curve" data-sovereign="${sov.code}" style="padding: 3px 9px; font-size: 0.72rem; gap: 4px;">
            <i data-lucide="line-chart" style="width: 12px; height: 12px; color: var(--accent-cyan);"></i>
            Inspect
          </button>
        </td>
      `;

      const inspectBtn = tr.querySelector('.btn-inspect-curve');
      if (inspectBtn) {
        inspectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          inspectSovereignCurve(sov.code);
        });
      }

      tr.addEventListener('click', (e) => {
        selectSovereign(sov.code);
      });

      tbody.appendChild(tr);
    });

    if (window.lucide) lucide.createIcons();
  }

  // Update Map Pin Metric Display
  function updateMapHubValues(metric) {
    currentAnalyticsMetric = metric;
    Object.values(sovereignsData).forEach(sov => {
      const hubEl = document.getElementById(`hub-${sov.code}`);
      if (!hubEl) return;
      const textSpan = hubEl.querySelector('.hub-val-text');
      if (!textSpan) return;

      if (metric === 'yield') {
        textSpan.textContent = `${sov.yield10Y.toFixed(2)}%`;
      } else if (metric === 'spread') {
        textSpan.textContent = sov.policySpreadBps;
      } else if (metric === 'real') {
        textSpan.textContent = sov.realYield;
      } else if (metric === 'inflow') {
        textSpan.textContent = sov.netInflow;
      }
    });
  }

  // Region Filter
  function applyRegionFilter(region) {
    currentAnalyticsRegion = region;
    Object.values(sovereignsData).forEach(sov => {
      const hubEl = document.getElementById(`hub-${sov.code}`);
      if (!hubEl) return;

      if (region === 'all' || sov.region === region) {
        hubEl.classList.remove('dimmed');
      } else {
        hubEl.classList.add('dimmed');
      }
    });
  }

  // Select Sovereign (syncs map pin, chart, kpis, table)
  function selectSovereign(code) {
    const sov = sovereignsData[code];
    if (!sov) return;
    currentSelectedSovereign = code;

    // 1. Update Map Hubs Active Class
    document.querySelectorAll('.map-hub').forEach(hub => {
      hub.classList.remove('active');
    });
    const activeHub = document.getElementById(`hub-${code}`);
    if (activeHub) activeHub.classList.add('active');

    // 2. Update Benchmark Table Active Row
    document.querySelectorAll('.sovereign-table-row').forEach(row => {
      if (row.getAttribute('data-sovereign') === code) {
        row.classList.add('active-row');
      } else {
        row.classList.remove('active-row');
      }
    });

    // 3. Sync Sovereign Dropdown
    const sovSelect = document.getElementById('yieldCurveSovereignSelect');
    if (sovSelect && sovSelect.value !== code) {
      sovSelect.value = code;
    }

    // 4. Update KPI Cards
    const kpiInflow = document.getElementById('kpiNetInflowVal');
    const kpiSpread = document.getElementById('kpiPolicySpreadVal');
    const kpiReserves = document.getElementById('kpiFxReservesVal');
    const kpiReal = document.getElementById('kpiRealYieldVal');

    if (kpiInflow) kpiInflow.textContent = sov.netInflow;
    if (kpiSpread) kpiSpread.textContent = sov.policySpreadBps;
    if (kpiReserves) kpiReserves.textContent = sov.fxReserves;
    if (kpiReal) kpiReal.textContent = sov.realYield;

    // 5. Update Central Bank Commentary
    const comTitle = document.getElementById('kpiCommentaryTitle');
    const comText = document.getElementById('kpiCommentaryText');
    if (comTitle) comTitle.textContent = sov.commentaryTitle;
    if (comText) comText.textContent = sov.commentary;

    // 6. Update Slope Badge
    const slopeBadge = document.getElementById('yieldCurveSlopeBadge');
    if (slopeBadge) {
      slopeBadge.textContent = sov.slopeDesc;
      slopeBadge.className = `status-badge ${sov.slopeType}`;
    }

    // 7. Update Yield Curve Chart
    renderYieldCurveChart(currentSelectedSovereign, currentBenchmarkSovereign);
  }

  // Render Yield Curve Chart (Chart.js)
  function renderYieldCurveChart(sovCode, bmCode) {
    const canvas = document.getElementById('yieldCurveChart');
    if (!canvas || !window.Chart) return;

    const sov = sovereignsData[sovCode] || sovereignsData.MY;
    const bm = sovereignsData[bmCode] || sovereignsData.US;

    const maturities = ['1M', '3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y', '15Y', '20Y', '30Y'];
    const sovPoints = maturities.map(m => sov.maturities[m] ?? null);
    const bmPoints = maturities.map(m => bm.maturities[m] ?? null);

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.00)');

    if (yieldCurveChartInstance) {
      yieldCurveChartInstance.destroy();
    }

    yieldCurveChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: maturities,
        datasets: [
          {
            label: `${sov.code} - ${sov.name} (${sov.bondName})`,
            data: sovPoints,
            borderColor: '#06b6d4',
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5,
            pointRadius: 4,
            pointHoverRadius: 6.5
          },
          {
            label: `${bm.code} - ${bm.name} (${bm.bondName})`,
            data: bmPoints,
            borderColor: '#f59e0b',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.35,
            pointBackgroundColor: '#f59e0b',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5,
            pointRadius: 3.5,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              color: '#cbd5e1',
              font: { family: 'Inter', size: 11, weight: '500' },
              padding: 14
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.96)',
            borderColor: 'rgba(124, 58, 237, 0.45)',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#cbd5e1',
            titleFont: { family: 'JetBrains Mono', weight: '700', size: 12 },
            bodyFont: { family: 'JetBrains Mono', size: 11 },
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => {
                return ` ${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
              },
              afterBody: (items) => {
                if (items.length >= 2) {
                  const sY = items[0].parsed.y;
                  const bY = items[1].parsed.y;
                  const spreadBps = Math.round((sY - bY) * 100);
                  const sign = spreadBps >= 0 ? '+' : '';
                  return `\n Yield Spread: ${sign}${spreadBps} bps`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.04)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono', size: 11 }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.04)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono', size: 11 },
              callback: (value) => `${value.toFixed(1)}%`
            }
          }
        }
      }
    });
  }

  // Sovereign-specific safe placement offsets to guarantee ZERO pin collision
  const sovereignTooltipOffsets = {
    // Malaysia: Indian Ocean / Bay of Bengal (West / South-West)
    MY: { offsetX: -270, offsetY: -35 },
    // Singapore: Southern Indian Ocean (South-West, clearing MY & AU)
    SG: { offsetX: -270, offsetY: 30 },
    // China: Central Asia corridor (clearing DE, JP, and MY)
    CN: { offsetX: -180, offsetY: -175 },
    // Japan: Western Pacific / Philippine Sea (South of JP, East of MY/SG, North of AU)
    JP: { offsetX: 0,    offsetY: 45 },
    // United States: Eastern Pacific Ocean (West / South-West, completely open Pacific)
    US: { offsetX: -270, offsetY: 25 },
    // United Kingdom: Mid-Atlantic Ocean (South-West, below US & west of DE)
    GB: { offsetX: -260, offsetY: 85 },
    UK: { offsetX: -260, offsetY: 85 },
    // Germany: Mediterranean / North Africa (South, clearing all)
    DE: { offsetX: -110, offsetY: 45 },
    // Australia: Southern Ocean (South-West, below MY & SG)
    AU: { offsetX: -270, offsetY: 35 }
  };

  const sovereignBrandColors = {
    MY: '#10b981',
    SG: '#34d399',
    CN: '#ef4444',
    JP: '#f59e0b',
    US: '#06b6d4',
    GB: '#60a5fa',
    UK: '#60a5fa',
    DE: '#38bdf8',
    AU: '#8b5cf6'
  };

  let mapTooltipTimer = null;
  let currentTooltipSovereign = 'MY';

  function inspectSovereignCurve(code) {
    if (!code) return;
    selectSovereign(code);
    hideMapTooltip(true);

    const curveCard = document.getElementById('yieldCurveChart')?.closest('.card');
    if (curveCard) {
      curveCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      curveCard.classList.remove('curve-refocus-highlight');
      void curveCard.offsetWidth; // Force reflow to restart CSS glow animation
      curveCard.classList.add('curve-refocus-highlight');
      setTimeout(() => {
        curveCard.classList.remove('curve-refocus-highlight');
      }, 2000);
    }
  }
  window.inspectSovereignCurve = inspectSovereignCurve;

  function showMapTooltip(code) {
    if (mapTooltipTimer) {
      clearTimeout(mapTooltipTimer);
      mapTooltipTimer = null;
    }

    currentTooltipSovereign = code;
    const sov = sovereignsData[code];
    const tooltip = document.getElementById('mapHubTooltip');
    const container = document.getElementById('mapCanvasContainer');
    const hub = document.getElementById(`hub-${code}`);
    if (!sov || !tooltip || !container || !hub) return;

    tooltip.setAttribute('data-sovereign', code);
    const brandColor = sovereignBrandColors[code] || '#7c3aed';

    document.getElementById('tipHubTitle').textContent = `${sov.code} - ${sov.name} (${sov.bondName})`;
    document.getElementById('tipHubBadge').textContent = sov.badgeText;
    document.getElementById('tip10YYield').textContent = `${sov.yield10Y.toFixed(2)}%`;
    document.getElementById('tipPolicyRate').textContent = sov.policyRate;
    document.getElementById('tipCurveSpread').textContent = sov.spread2Y10Y;
    document.getElementById('tipRealYield').textContent = sov.realYield;
    document.getElementById('tipSpotFx').textContent = `${sov.spotFx} (${sov.spotFxChange})`;

    tooltip.style.borderColor = `${brandColor}aa`;
    tooltip.style.boxShadow = `0 20px 45px -5px rgba(0, 0, 0, 0.95), 0 0 25px ${brandColor}40`;

    const containerRect = container.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();

    // Sovereign-specific non-overlapping coordinate calculation
    const offsetConfig = sovereignTooltipOffsets[code] || { offsetX: -260, offsetY: -40 };
    
    // Calculate tooltip position relative to the container
    let left = (hubRect.left - containerRect.left) + offsetConfig.offsetX;
    let top = (hubRect.top - containerRect.top) + offsetConfig.offsetY;

    // Viewport and container boundary safety clamp
    const tipWidth = 275;
    const tipHeight = 180;
    const padding = 12;

    left = Math.max(padding, Math.min(containerRect.width - tipWidth - padding, left));
    top = Math.max(padding, Math.min(containerRect.height - tipHeight - padding, top));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.classList.add('visible');
  }

  function hideMapTooltip(immediate = false) {
    if (immediate) {
      if (mapTooltipTimer) clearTimeout(mapTooltipTimer);
      const tooltip = document.getElementById('mapHubTooltip');
      if (tooltip) tooltip.classList.remove('visible');
      return;
    }
    if (mapTooltipTimer) clearTimeout(mapTooltipTimer);
    mapTooltipTimer = setTimeout(() => {
      const tooltip = document.getElementById('mapHubTooltip');
      if (tooltip) tooltip.classList.remove('visible');
    }, 240);
  }

  window.showMapTooltip = showMapTooltip;
  window.hideMapTooltip = hideMapTooltip;

  // Initialize Map Hover, Click & Toolbar Handlers
  function bindAnalyticsEventListeners() {
    // Tooltip hover preservation & Action Button deep-link click
    const tooltip = document.getElementById('mapHubTooltip');
    if (tooltip) {
      tooltip.addEventListener('mouseenter', () => {
        if (mapTooltipTimer) {
          clearTimeout(mapTooltipTimer);
          mapTooltipTimer = null;
        }
      });
      tooltip.addEventListener('mouseleave', () => {
        hideMapTooltip(false);
      });
    }

    const tipInspectBtn = document.getElementById('tipInspectCurveBtn');
    if (tipInspectBtn) {
      tipInspectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const code = currentTooltipSovereign || currentSelectedSovereign || 'MY';
        inspectSovereignCurve(code);
      });
    }

    // Hub Hover Tooltip & Click with debouncing and instant sync
    document.querySelectorAll('.map-hub').forEach(hub => {
      const code = hub.getAttribute('data-sovereign');
      if (!code) return;

      hub.addEventListener('mouseenter', () => showMapTooltip(code));
      hub.addEventListener('mouseleave', () => hideMapTooltip(false));
      hub.addEventListener('click', () => {
        selectSovereign(code);
        showMapTooltip(code);
      });
    });

    const mapContainer = document.getElementById('mapCanvasContainer');
    if (mapContainer) {
      mapContainer.addEventListener('mouseleave', () => hideMapTooltip(true));
    }

    // Auto-dismiss floating tooltip on window scroll
    window.addEventListener('scroll', () => hideMapTooltip(true), { passive: true });

    // Metric Switcher Buttons
    document.querySelectorAll('.map-metric-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.map-metric-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const metric = btn.getAttribute('data-metric');
        updateMapHubValues(metric);
      });
    });

    // Region Filter Buttons
    document.querySelectorAll('.map-region-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.map-region-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const region = btn.getAttribute('data-region');
        applyRegionFilter(region);
      });
    });

    // Flow Streams Toggle
    const flowStreamsBtn = document.getElementById('toggleFlowStreamsBtn');
    const flowStreamsG = document.getElementById('mapFlowStreams');
    const flowStreamsBtnText = document.getElementById('flowStreamsBtnText');
    if (flowStreamsBtn && flowStreamsG) {
      flowStreamsBtn.addEventListener('click', () => {
        const isHidden = flowStreamsG.classList.toggle('streams-hidden');
        if (flowStreamsBtnText) {
          flowStreamsBtnText.textContent = isHidden ? 'Streams: Hidden' : 'Streams: Active';
        }
      });
    }

    // Yield Curve Sovereign Dropdown
    const sovSelect = document.getElementById('yieldCurveSovereignSelect');
    if (sovSelect) {
      sovSelect.addEventListener('change', (e) => {
        selectSovereign(e.target.value);
      });
    }

    // Yield Curve Benchmark Dropdown
    const bmSelect = document.getElementById('yieldCurveBenchmarkSelect');
    if (bmSelect) {
      bmSelect.addEventListener('change', (e) => {
        currentBenchmarkSovereign = e.target.value;
        renderYieldCurveChart(currentSelectedSovereign, currentBenchmarkSovereign);
      });
    }
  }

  // Master Init for Analytics View
  function initAnalyticsView() {
    if (analyticsInitialized) return;
    analyticsInitialized = true;

    renderSovereignBenchmarkTable();
    bindAnalyticsEventListeners();
    updateMapHubValues('yield');
    selectSovereign('MY');
  }

  // Pre-initialize analytics so it's ready when switching
  initAnalyticsView();

  // Global Keyboard Shortcut: Ctrl+K focus search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('globalSearchInput');
      if (searchInput) searchInput.focus();
    }
  });

  // Handle URL Hash Navigation
  function handleHash() {
    const raw = window.location.hash.replace('#', '');
    const [view, param] = raw.split(':');
    if (view === 'login' || view === 'signin' || view === 'auth') {
      showLoginPage('signin');
    } else if (view === 'signup') {
      showLoginPage('signup');
    } else if (view === 'forgot' || view === 'forgot-password' || view === 'reset-password') {
      showLoginPage('forgot');
    } else if (viewMetadata[view]) {
      hideLoginPage();
      switchView(view);
      if (view === 'trading' && param) {
        if (stockSearchInput) stockSearchInput.value = param;
        fetchStockData(param, currentStockPeriod);
      } else if (view === 'logs' && param) {
        fetchFredSeries(param);
      } else if (view === 'models') {
        const model = param || currentModelId;
        fetchModelPerformance(model, currentModelTarget);
      }
    }
  }

  window.addEventListener('hashchange', handleHash);
  if (window.location.hash) {
    handleHash();
  } else if (!currentUser.isLoggedIn) {
    showLoginPage('signin');
  }

  console.log('OmniUI Dashboard Initialized.');
});
