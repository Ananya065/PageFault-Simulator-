import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface Step {
  page: number;
  fault: boolean;
  frames: (number | null)[];
  faultsCount: number;
  hitsCount: number;
}

export function HitRatioChart({ steps }: { steps: Step[] }) {
  const data = steps.map((step, idx) => {
    const total = step.faultsCount + step.hitsCount;
    const ratio = total > 0 ? (step.hitsCount / total) * 100 : 0;
    return {
      name: `T${idx + 1}`,
      ratio: Number(ratio.toFixed(1)),
      faults: step.faultsCount,
      hits: step.hitsCount,
    };
  });

  return (
    <div className="h-[320px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.2)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.2)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            unit="%" 
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
            }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="ratio" 
            name="Hit Ratio"
            stroke="hsl(var(--primary))" 
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6, fill: "hsl(var(--primary))", strokeWidth: 0, shadow: '0 0 10px hsl(var(--primary))' }}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ComparisonData {
  algorithm: string;
  pageFaults: number;
  hitRatio: number;
}

export function ComparisonChart({ data }: { data: ComparisonData[] }) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="algorithm" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="pageFaults" name="Total Faults" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
