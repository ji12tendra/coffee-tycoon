import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Play, RotateCcw, Flame, CheckCircle, AlertTriangle, Gauge } from 'lucide-react';
import { Language } from '../../types';

interface RocketSimProps {
  language: Language;
}

export const RocketSim: React.FC<RocketSimProps> = ({ language }) => {
  const isHi = language === 'hi';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Flight parameters
  const [thrust, setThrust] = useState(85); // 50 to 100%
  const [fuelKg, setFuelKg] = useState(1200); // 800 to 2000 kg
  const [pitchAngle, setPitchAngle] = useState(65); // 45 to 90 degrees

  // Simulation State
  const [isLaunching, setIsLaunching] = useState(false);
  const [flightStatus, setFlightStatus] = useState<'ground' | 'flying' | 'orbit' | 'crashed'>('ground');
  const [telemetry, setTelemetry] = useState({
    altitudeKm: 0,
    velocityKmS: 0,
    fuelRemaining: 1200,
    timeSec: 0
  });

  const launchRef = useRef({
    x: 150,
    y: 280,
    vx: 0,
    vy: 0,
    alt: 0,
    fuel: 1200,
    t: 0,
    status: 'ground' as 'ground' | 'flying' | 'orbit' | 'crashed'
  });

  const handleLaunch = () => {
    setIsLaunching(true);
    setFlightStatus('flying');
    launchRef.current = {
      x: 60,
      y: 270,
      vx: 0,
      vy: 0,
      alt: 0,
      fuel: fuelKg,
      t: 0,
      status: 'flying'
    };
  };

  const handleReset = () => {
    setIsLaunching(false);
    setFlightStatus('ground');
    setTelemetry({
      altitudeKm: 0,
      velocityKmS: 0,
      fuelRemaining: fuelKg,
      timeSec: 0
    });
    launchRef.current = {
      x: 60,
      y: 270,
      vx: 0,
      vy: 0,
      alt: 0,
      fuel: fuelKg,
      t: 0,
      status: 'ground'
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Physics update if flying
      if (launchRef.current.status === 'flying') {
        const rad = (pitchAngle * Math.PI) / 180;
        const currentThrust = launchRef.current.fuel > 0 ? thrust * 0.08 : 0;
        
        // Thrust components
        const ax = currentThrust * Math.cos(rad);
        const ay = -currentThrust * Math.sin(rad) + 0.04; // gravity pulling down

        launchRef.current.vx += ax;
        launchRef.current.vy += ay;

        launchRef.current.x += launchRef.current.vx * 0.4;
        launchRef.current.y += launchRef.current.vy * 0.4;

        launchRef.current.alt = Math.max(0, (270 - launchRef.current.y) * 0.8);
        launchRef.current.fuel = Math.max(0, launchRef.current.fuel - (currentThrust > 0 ? 12 : 0));
        launchRef.current.t += 0.2;

        const currentSpeed = Math.sqrt(launchRef.current.vx ** 2 + launchRef.current.vy ** 2) * 0.45;

        // Check orbit condition
        if (launchRef.current.alt > 140 && currentSpeed >= 6.5) {
          launchRef.current.status = 'orbit';
          setFlightStatus('orbit');
        } else if (launchRef.current.y > 280 && launchRef.current.t > 3) {
          launchRef.current.status = 'crashed';
          setFlightStatus('crashed');
        }

        setTelemetry({
          altitudeKm: Number(launchRef.current.alt.toFixed(1)),
          velocityKmS: Number(currentSpeed.toFixed(2)),
          fuelRemaining: Math.floor(launchRef.current.fuel),
          timeSec: Number(launchRef.current.t.toFixed(1))
        });
      }

      // Draw Canvas Sky & Space
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#030712'); // Deep Space
      gradient.addColorStop(0.5, '#0c1a30');
      gradient.addColorStop(0.85, '#1e3a8a'); // Atmosphere
      gradient.addColorStop(1, '#064e3b'); // Earth ground
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw Orbit Target Zone line
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 80);
      ctx.lineTo(w, 80);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.font = '10px monospace';
      ctx.fillText(isHi ? 'TARGET ORBIT (>140 KM)' : 'TARGET LOW EARTH ORBIT (150 KM)', 12, 75);

      // Draw trajectory line
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w / 2, 450, 400, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Draw Rocket
      const rx = launchRef.current.x;
      const ry = launchRef.current.y;

      ctx.save();
      ctx.translate(rx, ry);
      const angle = Math.atan2(launchRef.current.vy, launchRef.current.vx) + Math.PI / 2;
      ctx.rotate(launchRef.current.status === 'ground' ? 0 : angle);

      // Rocket body
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-4, -15, 8, 24);

      // Nosecone
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(-4, -15);
      ctx.lineTo(0, -24);
      ctx.lineTo(4, -15);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(-7, 2, 3, 7);
      ctx.fillRect(4, 2, 3, 7);

      // Flame if fuel left
      if (launchRef.current.status === 'flying' && launchRef.current.fuel > 0) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(-3, 9);
        ctx.lineTo(0, 18 + Math.random() * 8);
        ctx.lineTo(3, 9);
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [thrust, fuelKg, pitchAngle, isHi]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <span>{isHi ? 'Kerbal Orbit Launcher' : 'Orbital Physics Sandbox'}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                flightStatus === 'orbit' ? 'bg-emerald-500/20 text-emerald-300' :
                flightStatus === 'crashed' ? 'bg-rose-500/20 text-rose-300' :
                flightStatus === 'flying' ? 'bg-amber-500/20 text-amber-300 animate-pulse' :
                'bg-slate-800 text-slate-400'
              }`}>
                {flightStatus}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHi ? 'Thrust, Fuel aur Gravity turn adjust karke satellite orbit me bhejein.' : 'Tune staging parameters to achieve stable orbital velocity!'}
            </p>
          </div>
        </div>

        {/* Live Telemetry */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">{isHi ? 'Altitude' : 'Altitude'}</div>
            <div className="text-xs font-bold text-sky-300 font-mono">{telemetry.altitudeKm} km</div>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">{isHi ? 'Raftaar' : 'Speed'}</div>
            <div className="text-xs font-bold text-emerald-300 font-mono">{telemetry.velocityKmS} km/s</div>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400">{isHi ? 'Fuel' : 'Fuel'}</div>
            <div className="text-xs font-bold text-amber-300 font-mono">{telemetry.fuelRemaining} kg</div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset Rocket"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Sandbox: Controls & Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls (Left) */}
        <div className="lg:col-span-4 space-y-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
            {isHi ? 'Rocket Configuration' : 'Launch Configuration'}
          </h4>

          {/* Thrust */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-300">Engine Thrust:</span>
              <span className="font-bold text-amber-400 font-mono">{thrust}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={thrust}
              disabled={isLaunching}
              onChange={(e) => setThrust(Number(e.target.value))}
              className="w-full accent-amber-500 disabled:opacity-50"
            />
          </div>

          {/* Fuel Weight */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-300">Fuel Mass:</span>
              <span className="font-bold text-sky-400 font-mono">{fuelKg} kg</span>
            </div>
            <input
              type="range"
              min="800"
              max="2000"
              step="100"
              value={fuelKg}
              disabled={isLaunching}
              onChange={(e) => setFuelKg(Number(e.target.value))}
              className="w-full accent-sky-500 disabled:opacity-50"
            />
          </div>

          {/* Gravity Pitch Angle */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-300">{isHi ? 'Pitch Turn Angle:' : 'Pitch Turn Angle:'}</span>
              <span className="font-bold text-indigo-400 font-mono">{pitchAngle}°</span>
            </div>
            <input
              type="range"
              min="45"
              max="85"
              value={pitchAngle}
              disabled={isLaunching}
              onChange={(e) => setPitchAngle(Number(e.target.value))}
              className="w-full accent-indigo-500 disabled:opacity-50"
            />
          </div>

          {/* Launch Button */}
          <button
            id="launch-rocket-btn"
            onClick={handleLaunch}
            disabled={isLaunching && flightStatus === 'flying'}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>{isHi ? 'Launch Rocket 🚀' : 'Ignition & Launch 🚀'}</span>
          </button>

          {/* Status Message */}
          {flightStatus === 'orbit' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isHi ? 'Mubarak ho! Rocket safaltapoorvak orbit me pahunch gaya!' : 'Success! Stable orbit achieved above atmosphere!'}</span>
            </div>
          )}

          {flightStatus === 'crashed' && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{isHi ? 'Gravity ne kheench liya! Fuel ya thrust badhayein.' : 'Crashed down! Try increasing thrust or adjusting pitch angle.'}</span>
            </div>
          )}
        </div>

        {/* 2D Physics Canvas (Right) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={540}
            height={300}
            className="w-full h-auto rounded-xl max-h-[340px]"
          />
        </div>

      </div>

    </div>
  );
};
