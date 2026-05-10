import { AlertTriangle, CheckCircle, ShieldAlert, RotateCcw } from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  const { dangerScore, verdict, harmfulIngredients, safeIngredients } = result;

  const getColorTheme = () => {
    if (dangerScore <= 30) return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20', icon: <CheckCircle className="w-8 h-8 text-green-400" /> };
    if (dangerScore <= 69) return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20', icon: <AlertTriangle className="w-8 h-8 text-yellow-400" /> };
    return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20', icon: <ShieldAlert className="w-8 h-8 text-red-400" /> };
  };

  const theme = getColorTheme();

  return (
    <div className={`w-full max-w-md mx-auto bg-[#1a1a1a] border ${theme.border} rounded-3xl p-6 shadow-2xl ${theme.glow}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-medium tracking-wider text-white/50 uppercase">Danger Score</h2>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-5xl font-black ${theme.text}`}>{dangerScore}</span>
            <span className="text-xl font-bold text-white/30">/100</span>
          </div>
        </div>
        <div className={`p-4 rounded-full bg-white/5 border ${theme.border}`}>
          {theme.icon}
        </div>
      </div>

      <div className={`p-4 mb-6 rounded-2xl bg-white/5 border ${theme.border}`}>
        <p className={`font-semibold text-lg text-center ${theme.text}`}>{verdict}</p>
      </div>

      {harmfulIngredients && harmfulIngredients.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 mb-3 text-sm font-bold tracking-wide text-red-400 uppercase">
            <AlertTriangle size={16} /> Harmful Ingredients
          </h3>
          <ul className="space-y-3">
            {harmfulIngredients.map((item, idx) => (
              <li key={idx} className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl">
                <span className="block font-semibold text-red-300">{item.name}</span>
                <span className="block mt-1 text-sm text-red-200/70">{item.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {safeIngredients && safeIngredients.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center gap-2 mb-3 text-sm font-bold tracking-wide text-green-400 uppercase">
            <CheckCircle size={16} /> Safe Ingredients
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            {safeIngredients.join(', ')}
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        className="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold text-white transition-all bg-white/10 hover:bg-white/15 rounded-2xl active:scale-95"
      >
        <RotateCcw size={20} />
        Scan Another Product
      </button>
    </div>
  );
}
