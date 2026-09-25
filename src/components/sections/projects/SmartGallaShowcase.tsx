'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Database, 
  FileText, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Receipt, 
  Layers, 
  CreditCard,
  PlusCircle,
  Github,
  Sparkles,
  ShoppingBag,
  Users,
  Building2,
  Wallet,
  Landmark,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Search,
  Save,
  Download,
  Upload,
  Clock,
  Eye,
  Settings,
  Archive,
  Palette,
  ChevronDown,
  ShieldCheck,
  Check
} from 'lucide-react';
import { GpiEmblem } from '@/components/ui/GpiEmblem';

interface QueuedSale {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: string;
  items: number;
  time: string;
}

export function SmartGallaShowcase() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncComplete, setSyncComplete] = useState(false);

  // Active Terminal View: 'billing' | 'accounting' | 'sync'
  const [terminalView, setTerminalView] = useState<'billing' | 'accounting' | 'sync'>('billing');
  const [accountingTab, setAccountingTab] = useState<string>('Overview');

  // Local Offline Queue State
  const [localQueue, setLocalQueue] = useState<QueuedSale[]>([
    { id: '1', invoiceNo: 'TI/009', customer: 'Walk-in Customer', amount: '₹ 1,380.76', items: 2, time: 'Just now' }
  ]);

  // Central Ledger State
  const [centralLedgerCount, setCentralLedgerCount] = useState(142);

  const handleProcessSale = () => {
    const nextNum = 10 + localQueue.length;
    const customers = ['Walk-in Customer', 'Apex Machinery Pune', 'Kalyan Automation', 'Precision Tools'];
    const randomCust = customers[Math.floor(Math.random() * customers.length)];
    const amounts = ['₹ 1,380.76', '₹ 4,850.00', '₹ 9,700.00', '₹ 2,420.50'];
    const randomAmt = amounts[Math.floor(Math.random() * amounts.length)];

    const newSale: QueuedSale = {
      id: String(Date.now()),
      invoiceNo: `TI/0${nextNum}`,
      customer: randomCust,
      amount: randomAmt,
      items: Math.floor(Math.random() * 3) + 1,
      time: 'Just now'
    };

    if (isOnline) {
      setCentralLedgerCount(c => c + 1);
    } else {
      setLocalQueue(prev => [...prev, newSale]);
    }
  };

  const handleToggleConnection = () => {
    if (isOnline) {
      setIsOnline(false);
      setSyncComplete(false);
    } else {
      setIsOnline(true);
      if (localQueue.length > 0) {
        setIsSyncing(true);
        setSyncProgress(0);

        const interval = setInterval(() => {
          setSyncProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsSyncing(false);
              setCentralLedgerCount(c => c + localQueue.length);
              setLocalQueue([]);
              setSyncComplete(true);
              return 100;
            }
            return prev + 25;
          });
        }, 160);
      }
    }
  };

  return (
    <section 
      id="project-smartgalla" 
      className="relative w-full py-28 px-4 sm:px-8 lg:px-16 border-b border-zinc-200/80 bg-[#F7F6F2]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header & Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-300/60">
                03 / DESKTOP ENTERPRISE SOFTWARE
              </span>
              <span className="text-xs font-mono text-zinc-500">In Active Deployment</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-950 tracking-tight">
              SmartGalla: Offline-First POS & Accounting ERP
            </h2>

            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-3xl font-normal leading-relaxed">
              Electron desktop enterprise software with GST thermal invoicing, local SQLite offline queueing, 
              automatic cloud PostgreSQL reconciliation, and an autonomous double-entry accounting engine.
            </p>
          </div>

          {/* Interactive Mode Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTerminalView('billing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                terminalView === 'billing'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Billing Terminal</span>
            </button>

            <button
              onClick={() => setTerminalView('accounting')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                terminalView === 'accounting'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Accounting Terminal</span>
            </button>

            <button
              onClick={() => setTerminalView('sync')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                terminalView === 'sync'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Offline Sync Engine</span>
            </button>
          </div>
        </div>

        {/* Real Electron Desktop Window Container */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden font-sans">
          {/* 1. Native Windows / Electron Chrome Titlebar */}
          <div className="px-4 py-2 bg-[#1B222C] border-b border-zinc-800 text-zinc-300 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white tracking-wide">SmartGalla</span>
              <div className="hidden sm:flex items-center gap-3 text-zinc-400 text-[11px]">
                <span className="hover:text-white cursor-pointer">File</span>
                <span className="hover:text-white cursor-pointer">Edit</span>
                <span className="hover:text-white cursor-pointer">View</span>
                <span className="hover:text-white cursor-pointer">Window</span>
                <span className="hover:text-white cursor-pointer">Help</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span className="w-3 h-3 hover:text-white cursor-pointer flex items-center justify-center">─</span>
              <span className="w-3 h-3 hover:text-white cursor-pointer flex items-center justify-center">□</span>
              <span className="w-3 h-3 hover:text-red-400 cursor-pointer flex items-center justify-center">✕</span>
            </div>
          </div>

          {/* 2. Blue Gradient App Banner */}
          <div className="px-4 py-2 bg-gradient-to-r from-[#0E3D6E] via-[#0D4B8A] to-[#0A2E54] text-white flex flex-wrap items-center justify-between gap-3 text-xs border-b border-blue-900">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <span>SmartGalla Billing - {terminalView === 'billing' ? 'Billing Terminal' : terminalView === 'accounting' ? 'Accounting' : 'Sync Engine'}</span>
            </div>

            {/* Connection Pill & Context Dropdowns */}
            <div className="flex items-center gap-3 text-[11px] font-mono">
              {/* Online / Offline Toggle Pill */}
              <button
                onClick={handleToggleConnection}
                className={`px-2.5 py-0.5 rounded flex items-center gap-1.5 font-bold transition-all shadow-2xs ${
                  isOnline
                    ? 'bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 border border-emerald-400'
                    : 'bg-amber-600 hover:bg-amber-500 text-white border border-amber-300 animate-pulse'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>{isOnline ? '● Online' : '○ Offline'}</span>
              </button>

              <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/30 border border-white/10 text-zinc-200">
                <span>Company:</span>
                <span className="font-semibold text-white">Local Business (OWNER)</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/30 border border-white/10 text-zinc-200">
                <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">O</span>
                <span>Offline User (OWNER)</span>
              </div>
            </div>
          </div>

          {/* 3. Secondary Text Menu Bar */}
          <div className="px-4 py-1.5 bg-[#EAE6DF] border-b border-[#D8D2C6] text-zinc-700 flex items-center justify-between text-[11px] font-medium overflow-x-auto">
            <div className="flex items-center gap-4">
              <span className="hover:text-zinc-950 cursor-pointer">Master</span>
              <span className="hover:text-zinc-950 cursor-pointer">Transaction</span>
              <span className="hover:text-zinc-950 cursor-pointer">Reports</span>
              <span className="hover:text-zinc-950 cursor-pointer">Utilities</span>
              <span className="hover:text-zinc-950 cursor-pointer">Settings</span>
              <span className="hover:text-zinc-950 cursor-pointer">Help</span>
            </div>
            <span className="text-red-700 font-bold hover:underline cursor-pointer">Exit</span>
          </div>

          {/* 4. Action Ribbon (Cream Background with Authentic Icons) */}
          <div className="px-4 py-2.5 bg-[#F6F3ED] border-b border-[#D8D2C6] flex items-center gap-2 sm:gap-6 overflow-x-auto select-none">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Layers },
              { id: 'billing', label: 'Billing', icon: FileText, active: terminalView === 'billing', onClick: () => setTerminalView('billing') },
              { id: 'purchase', label: 'Purchase', icon: ShoppingBag },
              { id: 'products', label: 'Products', icon: Database },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'suppliers', label: 'Suppliers', icon: Building2 },
              { id: 'expenses', label: 'Expenses', icon: TrendingDown },
              { id: 'reports', label: 'Reports', icon: TrendingUp },
              { id: 'accounting', label: 'Accounting', icon: CreditCard, active: terminalView === 'accounting', onClick: () => setTerminalView('accounting') },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'backup', label: 'Backup', icon: Archive },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'theme', label: 'Theme', icon: Palette },
            ].map((btn, idx) => {
              const IconComp = btn.icon;
              return (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`flex flex-col items-center gap-1 min-w-[50px] py-1 px-1.5 rounded transition-colors text-center ${
                    btn.active
                      ? 'border-b-2 border-blue-700 text-blue-900 font-bold bg-blue-100/60'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/5'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${btn.active ? 'text-blue-700' : 'text-zinc-600'}`} />
                  <span className="text-[10px] leading-tight whitespace-nowrap">{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* 5. Sub-Action Bar (Dark Navy Toolbar) */}
          <div className="px-4 py-2 bg-[#0C2A4A] text-white flex flex-wrap items-center justify-between gap-3 text-xs border-b border-blue-950">
            {terminalView === 'billing' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#0A3D62] border border-emerald-400 text-emerald-200 text-[11px] font-bold">
                    TAX INVOICE
                  </span>
                  <span className="px-3 py-1 rounded bg-black/30 border border-white/10 text-zinc-400 text-[11px]">
                    ESTIMATE
                  </span>
                  <span className="ml-2 text-[11px] text-zinc-300 font-mono hidden sm:inline">
                    Tax Invoice Mode
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
                  <button className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1 shadow-xs">
                    <Search className="w-3 h-3" />
                    <span>Search Document (Ctrl+F)</span>
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200 flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Import</span>
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Export</span>
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200">
                    Hold (F5)
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200">
                    Drafts (F6)
                  </button>
                  <button 
                    onClick={handleProcessSale}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save (F4)</span>
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                  <button className="px-2 py-1 rounded bg-blue-900/60 border border-blue-400/40 text-blue-200 flex items-center gap-1">
                    <Printer className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                </div>
              </>
            ) : terminalView === 'accounting' ? (
              <>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold tracking-wide">Accounting & Financial Terminal</span>
                  <span className="text-zinc-400 text-[11px] hidden md:inline">
                    · Local Business · FY: 2026-2027 · Double-Entry Bookkeeping
                  </span>
                </div>

                <button className="px-3 py-1 rounded bg-blue-800 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Books</span>
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-amber-300">Offline-First Transaction Serialization & SQLite Sync Engine</span>
                <span className="text-zinc-400 text-[11px]">Click "Process New Sale" or toggle status to test live auto-reconciliation</span>
              </div>
            )}
          </div>

          {/* 6. Dynamic Main Body View */}
          <div className="p-4 sm:p-6 bg-[#EBE7DF] min-h-[580px] overflow-x-auto text-zinc-900">
            {/* VIEW A: REAL TAX INVOICE DOCUMENT (Image 1) */}
            {terminalView === 'billing' && (
              <div className="max-w-4xl mx-auto bg-white border border-zinc-300 shadow-xl rounded-sm p-6 sm:p-8 font-sans text-xs">
                {/* Invoice Top Header with GPI Logos */}
                <div className="flex items-center justify-between border-b-2 border-blue-900 pb-4 mb-4">
                  <GpiEmblem className="w-14 h-14" />

                  <div className="text-center flex-1 px-4">
                    <h3 className="text-base sm:text-xl font-extrabold text-blue-950 uppercase tracking-tight">
                      SMARTGALLA DEMO STORE TAX INVOICE
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                      Registered Office: 123 Market Road, Pune
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-[10px] text-zinc-600 font-mono mt-0.5">
                      <span>Email: gpipvtltdcare@gmail.com</span>
                      <span>·</span>
                      <span>Mob. No: 9876543210</span>
                    </div>
                  </div>

                  <GpiEmblem className="w-14 h-14" />
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-zinc-200 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500">Invoice No:</span> <strong className="text-zinc-950">TI/009</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500">Date:</span> <strong className="text-zinc-950">09/23/2026</strong>
                  </div>
                </div>

                {/* Seller & Purchaser Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-zinc-200 text-[11px]">
                  {/* Seller */}
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="font-bold text-blue-950 uppercase text-[10px] tracking-wider border-b pb-1">
                      SELLER DETAILS
                    </div>
                    <p className="font-bold text-zinc-900">SMARTGALLA DEMO STORE</p>
                    <p className="text-zinc-600 font-mono">G.S.T.No: 27ABCDE1234F1Z5</p>
                    <p className="text-zinc-600 font-mono">Mob: 9876543210</p>
                    <p className="text-zinc-500">123 Market Road, Pune, MH</p>
                  </div>

                  {/* Purchaser */}
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-bold text-blue-950 uppercase text-[10px] tracking-wider">PURCHASER</span>
                      <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[9px] rounded font-mono">Lookup F8</span>
                    </div>
                    <p className="font-bold text-zinc-900">Walk-in Customer</p>
                    <p className="text-zinc-600 font-mono">Purchaser GSTIN: Unregistered</p>
                    <p className="text-zinc-600 font-mono">Mob: 9823411090</p>
                    <p className="text-zinc-500">Counter Sale · Billing Address</p>
                  </div>

                  {/* Shipping / Vehicle Details */}
                  <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-bold text-blue-950 uppercase text-[10px] tracking-wider">TRANSPORT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">☑ Same as purchaser</span>
                    </div>
                    <p className="text-zinc-700"><span className="text-zinc-500 font-mono">Vehicle no.:</span> <strong className="text-zinc-900">UP17BT0941</strong></p>
                    <p className="text-zinc-700"><span className="text-zinc-500 font-mono">Driver Name:</span> R. Sharma</p>
                    <p className="text-zinc-700"><span className="text-zinc-500 font-mono">E-Way Bill:</span> Not Required (&lt;₹50k)</p>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="my-4 border border-zinc-300 rounded overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-[#E6ECF5] text-blue-950 font-bold border-b border-zinc-300">
                      <tr>
                        <th className="p-2">S.NO</th>
                        <th className="p-2">HSN CODE</th>
                        <th className="p-2">DESCRIPTION OF GOODS</th>
                        <th className="p-2">UNIT</th>
                        <th className="p-2 text-right">QTY</th>
                        <th className="p-2 text-right">RATE</th>
                        <th className="p-2 text-right">AMOUNT</th>
                        <th className="p-2 text-right">CGST</th>
                        <th className="p-2 text-right">SGST</th>
                        <th className="p-2 text-right">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 font-mono">
                      <tr>
                        <td className="p-2">1</td>
                        <td className="p-2 text-zinc-600">2501</td>
                        <td className="p-2 font-sans font-medium text-zinc-900">GTM Himalayan Rock Salt 1kg (Pouch)</td>
                        <td className="p-2 text-zinc-500">Bag (25)</td>
                        <td className="p-2 text-right">10</td>
                        <td className="p-2 text-right">₹99.00</td>
                        <td className="p-2 text-right">₹990.00</td>
                        <td className="p-2 text-right text-zinc-600">₹24.75</td>
                        <td className="p-2 text-right text-zinc-600">₹24.75</td>
                        <td className="p-2 text-right font-bold text-zinc-950">₹1,039.50</td>
                      </tr>
                      <tr>
                        <td className="p-2">2</td>
                        <td className="p-2 text-zinc-600">0910</td>
                        <td className="p-2 font-sans font-medium text-zinc-900">GPI Kashmiri Rogan & Masala Spices</td>
                        <td className="p-2 text-zinc-500">Box</td>
                        <td className="p-2 text-right">5</td>
                        <td className="p-2 text-right">₹65.00</td>
                        <td className="p-2 text-right">₹325.00</td>
                        <td className="p-2 text-right text-zinc-600">₹8.13</td>
                        <td className="p-2 text-right text-zinc-600">₹8.13</td>
                        <td className="p-2 text-right font-bold text-zinc-950">₹341.26</td>
                      </tr>
                      <tr className="bg-zinc-50 border-t-2 border-dashed border-zinc-300">
                        <td colSpan={3} className="p-2 text-blue-900 font-sans italic">
                          + Search & Add Product / Scan Barcode (F7)
                        </td>
                        <td colSpan={3} className="p-2 text-right font-bold text-zinc-800">
                          TOTAL TAXABLE:
                        </td>
                        <td className="p-2 text-right font-bold">₹1,315.00</td>
                        <td className="p-2 text-right">₹32.88</td>
                        <td className="p-2 text-right">₹32.88</td>
                        <td className="p-2 text-right font-extrabold text-blue-950">₹1,380.76</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bank Details & Pay Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-t border-zinc-200 text-[11px]">
                  <div className="space-y-1 text-zinc-700 font-mono">
                    <p className="font-bold text-zinc-900 uppercase">BANK DETAILS:</p>
                    <p>Company Name: SmartGalla Demo Store</p>
                    <p>Bank: <strong className="text-zinc-900">Canara Bank</strong></p>
                    <p>IFSC Code: CNRB0010925</p>
                    <p>A/C. No.: 120029632672</p>
                    <p className="text-zinc-500">Add.: Baraut J V College (UP, 250611)</p>
                  </div>

                  <div className="text-right space-y-2 font-mono">
                    <p className="text-zinc-500">AMOUNT CHARGEABLE (IN WORDS):</p>
                    <p className="font-bold text-zinc-900">Rupees One Thousand Three Hundred Eighty Only</p>
                    <div className="inline-block p-3 rounded bg-blue-50 border border-blue-200 text-right">
                      <span className="text-xs text-blue-900 font-sans font-bold">TOTAL PAY AMOUNT: </span>
                      <strong className="text-lg text-blue-950 font-bold ml-2">₹ 1,380.76</strong>
                    </div>
                  </div>
                </div>

                {/* Declaration & Signature */}
                <div className="mt-4 pt-3 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-end gap-4 text-[10px] text-zinc-500">
                  <div className="max-w-md">
                    <p className="font-bold uppercase text-zinc-700 mb-0.5">DECLARATION:</p>
                    <p>
                      We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. 
                      SUBJECT TO THIS IS A COMPUTER GENERATED INVOICE JURISDICTION.
                    </p>
                  </div>

                  <div className="text-center font-mono">
                    <p className="text-zinc-700 font-bold">FOR SMARTGALLA DEMO STORE</p>
                    <div className="h-8 flex items-center justify-center text-zinc-300 italic text-[9px]">[Authorized Signatory]</div>
                    <p className="text-zinc-400 border-t border-zinc-300 pt-1">Signature</p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: REAL ACCOUNTING & FINANCIAL TERMINAL (Image 3) */}
            {terminalView === 'accounting' && (
              <div className="space-y-4">
                {/* Accounting Sub-Tabs Ribbon */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-300 text-xs font-mono select-none">
                  {[
                    'Overview',
                    'Chart of Accounts',
                    'Journal Entries',
                    'General Ledger',
                    'Cash & Bank',
                    'Receivables',
                    'Payables',
                    'Trial Balance',
                    'Profit & Loss',
                    'Balance Sheet',
                    'GST Summary'
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAccountingTab(tab)}
                      className={`px-3 py-1.5 rounded text-xs transition-colors whitespace-nowrap font-medium ${
                        accountingTab === tab
                          ? 'bg-[#0E3D6E] text-white shadow-xs font-bold'
                          : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* The 8 Real Metric Cards from Actual Screenshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
                  {/* Card 1: Receivables */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">TOTAL RECEIVABLES</span>
                      <TrendingDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-zinc-900">₹ 26,650.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Customer unpaid balances</p>
                  </div>

                  {/* Card 2: Payables */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">TOTAL PAYABLES</span>
                      <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-red-600">₹ 85,500.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Supplier unpaid dues</p>
                  </div>

                  {/* Card 3: Cash Balance */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">CASH BALANCE</span>
                      <Wallet className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-emerald-700">₹ 45,000.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Liquid cash in hand</p>
                  </div>

                  {/* Card 4: Bank Balance */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">BANK BALANCE</span>
                      <Landmark className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-blue-700">₹ 1,25,000.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Liquid bank funds</p>
                  </div>

                  {/* Card 5: Today's Revenue */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">TODAY'S REVENUE</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-xl font-bold text-zinc-900">₹ 28,450.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Gross sales for today</p>
                  </div>

                  {/* Card 6: Today's Expenses */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">TODAY'S EXPENSES</span>
                      <TrendingDown className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-zinc-800">₹ 79,100.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Operational expenses today</p>
                  </div>

                  {/* Card 7: Net Profit */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">NET PROFIT</span>
                      <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-red-600">₹ -50,650.00</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Total income - expenses</p>
                  </div>

                  {/* Card 8: Outstanding Invoices */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="font-bold text-zinc-700">OUTSTANDING INVOICES</span>
                      <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xl font-bold text-amber-700">3</div>
                    <p className="text-[10px] text-zinc-400 mt-1 font-sans">Pending credit invoices</p>
                  </div>
                </div>

                {/* Real Integrity Panels (Directly from Screenshot) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Panel 1: Double-Entry Integrity Status */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Double-Entry Integrity Status</span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                        All posted journal entries adhere strictly to Debit = Credit balance rules. Invoices, purchases, expenses, and payments are automatically posted to the general ledger with complete transaction traceability.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-zinc-100 font-mono text-[11px]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Books Balanced
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold">
                        ★ Authoritative PostgreSQL Storage
                      </span>
                    </div>
                  </div>

                  {/* Panel 2: Audit & Multi-Tenant Protection */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-blue-900 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Audit & Multi-Tenant Protection</span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                        Every transaction is isolated to your current business context and timestamped. Posted entries cannot be silently deleted: reversing entries are logged to maintain full financial auditability.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-100">
                      <button className="px-3 py-1.5 rounded bg-[#0E3D6E] hover:bg-blue-900 text-white font-mono text-xs font-semibold">
                        View Journal Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW C: OFFLINE SYNC SIMULATOR */}
            {terminalView === 'sync' && (
              <div className="space-y-6">
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isOnline 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  <div className="flex items-center gap-3">
                    {isOnline ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                        {isOnline ? 'Network Connection Active · PostgreSQL Direct' : 'Operating in Offline-First Mode (Local SQLite)'}
                      </h4>
                      <p className="text-xs opacity-80 mt-0.5 font-sans">
                        {isOnline 
                          ? 'Invoices and accounting entries sync directly to central cloud PostgreSQL.' 
                          : 'Invoices are committed locally to encrypted SQLite storage; auto-syncs when online.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleProcessSale}
                      className="px-3.5 py-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Process New Sale</span>
                    </button>
                  </div>
                </div>

                {/* Animated Reconnection Progress Bar */}
                {isSyncing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-mono text-xs space-y-2"
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                        RECONCILING LOCAL SQLITE TRANSACTIONS WITH CENTRAL POSTGRESQL LEDGER...
                      </span>
                      <span>{syncProgress}%</span>
                    </div>
                    <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full transition-all duration-200" 
                        style={{ width: `${syncProgress}%` }}
                      />
                    </div>
                  </motion.div>
                )}

                {syncComplete && !isSyncing && (
                  <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-xs flex items-center justify-between">
                    <span>✓ RECONCILIATION COMPLETE — All offline invoices posted to authoritative ledger with zero duplicate entries.</span>
                    <button onClick={() => setSyncComplete(false)} className="text-emerald-800 underline text-[11px]">
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Dual Column: Local SQLite vs Cloud PostgreSQL */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
                  {/* Left: Local Queue */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-3">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-amber-600" />
                        <h4 className="font-bold text-zinc-900 uppercase">Local SQLite Transaction Queue</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[11px]">
                        {localQueue.length} Pending
                      </span>
                    </div>

                    {localQueue.length === 0 ? (
                      <div className="py-8 text-center text-zinc-400 font-sans">
                        Local queue is empty. All transactions are committed to the central database.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {localQueue.map((item) => (
                          <div 
                            key={item.id}
                            className="p-2.5 rounded bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-bold text-zinc-950">{item.invoiceNo} · {item.customer}</div>
                              <div className="text-[11px] text-zinc-500 font-sans">{item.items} line items · {item.time}</div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-zinc-950">{item.amount}</span>
                              <div className="text-[10px] text-amber-800 font-semibold">QUEUED LOCAL</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Central Cloud PostgreSQL */}
                  <div className="p-4 rounded-xl bg-white border border-zinc-300 shadow-2xs">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-zinc-900 uppercase">Authoritative PostgreSQL Cloud Ledger</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        {centralLedgerCount} Committed
                      </span>
                    </div>

                    <div className="space-y-2 text-zinc-700">
                      <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                        <span>TI/008 · Apex Machinery Pune</span>
                        <span className="font-bold text-zinc-900">₹ 4,850.00 · POSTED</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                        <span>TI/007 · Kalyan Automation</span>
                        <span className="font-bold text-zinc-900">₹ 9,700.00 · POSTED</span>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                        <span>TI/006 · Precision Tools Ltd</span>
                        <span className="font-bold text-zinc-900">₹ 2,420.50 · POSTED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7. Bottom Native Status Bar */}
          <div className="px-4 py-2 bg-[#E2DDCF] border-t border-[#D0C8B8] text-zinc-600 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono select-none">
            <div className="flex items-center gap-3">
              <span>Status: <strong className="text-zinc-900">Ready</strong></span>
              <span className="text-zinc-400">|</span>
              <span>Company: <strong className="text-zinc-900">Local Business</strong></span>
              <span className="text-zinc-400">|</span>
              <span>User: <strong className="text-zinc-900">{isOnline ? 'Offline User' : 'Offline User (Queuing)'}</strong></span>
              <span className="text-zinc-400">|</span>
              <span>Financial Year: <strong className="text-zinc-900">2026-2027</strong></span>
            </div>

            <div className="flex items-center gap-2 text-zinc-500">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>Date: 23/09/2026 · Time: 8:07:37 PM</span>
            </div>
          </div>
        </div>

        {/* Technical Chips & GitHub */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-1">STACK:</span>
            {['React', 'TypeScript', 'Electron', 'Node.js', 'PostgreSQL', 'SQLite Queue', 'Double-Entry Accounting', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-700 shadow-2xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/ObsureBat"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-800 hover:text-emerald-700 transition-colors"
          >
            <span>View GitHub Repository</span>
            <Github className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default SmartGallaShowcase;
