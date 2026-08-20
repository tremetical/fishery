import type { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { makeWbProblem, WB_AIRCRAFT, type WbProblem } from '../lib/wbgen';

/*
 * Weight & balance worksheet: the app hands you a loading scenario and
 * checks YOUR arithmetic at every step — moments, totals, CG, and the
 * go/no-go call — because you'll walk an examiner through this out loud.
 */

type StepState = 'pending' | 'active' | 'done';

export function ToolWbPage(): JSX.Element {
  const [p, setP] = useState<WbProblem>(() => makeWbProblem());
  const [momentsOk, setMomentsOk] = useState<boolean[]>(() => p.rows.map(() => false));
  const [weightOk, setWeightOk] = useState(false);
  const [momentTotalOk, setMomentTotalOk] = useState(false);
  const [cgOk, setCgOk] = useState(false);
  const [verdict, setVerdict] = useState<null | boolean>(null); // user's go/no-go

  const reset = () => {
    const np = makeWbProblem();
    setP(np);
    setMomentsOk(np.rows.map(() => false));
    setWeightOk(false);
    setMomentTotalOk(false);
    setCgOk(false);
    setVerdict(null);
  };

  const allMoments = momentsOk.every(Boolean);
  const stepTotals: StepState = !allMoments ? 'pending' : weightOk && momentTotalOk ? 'done' : 'active';
  const stepCg: StepState = stepTotals !== 'done' ? 'pending' : cgOk ? 'done' : 'active';
  const stepVerdict: StepState = stepCg !== 'done' ? 'pending' : verdict !== null ? 'done' : 'active';

  const actuallyGood = p.cgOk && !p.overGross;

  return (
    <div class="stack">
      <h1 class="page-h">
        W&B worksheet
        <span class="sub">{WB_AIRCRAFT.name}</span>
      </h1>

      <div class="panel">
        <div class="panel-title">1 · Moments (weight × arm)</div>
        <div class="tiny dim" style="margin-bottom: 8px">
          Max gross {WB_AIRCRAFT.maxGross} lb · fuel {WB_AIRCRAFT.fuelCapacityGal} gal max ·
          baggage {WB_AIRCRAFT.baggageLimit} lb max
        </div>
        {p.rows.map((r, i) => (
          <CheckRow
            key={`${p.totalMoment}-${i}`}
            label={r.label}
            detail={`${r.weight} lb × ${r.arm}"`}
            expected={r.weight * r.arm}
            tolerance={2}
            done={momentsOk[i]}
            onDone={() =>
              setMomentsOk((m) => m.map((v, j) => (j === i ? true : v)))
            }
          />
        ))}
      </div>

      <div class="panel" style={stepTotals === 'pending' ? 'opacity: 0.45' : ''}>
        <div class="panel-title">2 · Totals</div>
        {stepTotals !== 'pending' && (
          <>
            <CheckRow
              label="Total weight"
              detail="sum of the weight column (lb)"
              expected={p.totalWeight}
              tolerance={1}
              done={weightOk}
              onDone={() => setWeightOk(true)}
            />
            <CheckRow
              label="Total moment"
              detail="sum of the moment column (lb-in)"
              expected={p.totalMoment}
              tolerance={10}
              done={momentTotalOk}
              onDone={() => setMomentTotalOk(true)}
            />
          </>
        )}
      </div>

      <div class="panel" style={stepCg === 'pending' ? 'opacity: 0.45' : ''}>
        <div class="panel-title">3 · Center of gravity</div>
        {stepCg !== 'pending' && (
          <CheckRow
            label="CG"
            detail="total moment ÷ total weight (inches aft of datum)"
            expected={p.cg}
            tolerance={0.2}
            done={cgOk}
            onDone={() => setCgOk(true)}
          />
        )}
      </div>

      <div class="panel" style={stepVerdict === 'pending' ? 'opacity: 0.45' : ''}>
        <div class="panel-title">4 · The call</div>
        {stepVerdict !== 'pending' && (
          <>
            <p class="small dim">
              Limits: max gross {WB_AIRCRAFT.maxGross} lb · forward limit at your
              weight {p.fwdLimit.toFixed(1)}" · aft limit {WB_AIRCRAFT.aftLimit}".
            </p>
            {verdict === null ? (
              <div class="gradebar mt" style="grid-template-columns: 1fr 1fr">
                <button class="gradebtn grade-2" onClick={() => setVerdict(true)}>
                  Good to fly
                </button>
                <button class="gradebtn grade-0" onClick={() => setVerdict(false)}>
                  Out of limits
                </button>
              </div>
            ) : (
              <div class="mt">
                <p
                  class="small"
                  style={`color: var(${verdict === actuallyGood ? '--accent' : '--warning'}); font-weight: 700`}
                >
                  {verdict === actuallyGood ? 'Correct.' : 'Not quite.'}{' '}
                  {actuallyGood
                    ? `Within limits: ${p.totalWeight} lb (≤ ${WB_AIRCRAFT.maxGross}), CG ${p.cg.toFixed(1)}" inside ${p.fwdLimit.toFixed(1)}–${WB_AIRCRAFT.aftLimit}".`
                    : p.overGross
                      ? `Over gross by ${p.totalWeight - WB_AIRCRAFT.maxGross} lb — offload fuel or bags and recompute.`
                      : `CG ${p.cg.toFixed(1)}" is outside ${p.fwdLimit.toFixed(1)}–${WB_AIRCRAFT.aftLimit}" — move weight and recompute.`}
                </p>
                <Envelope p={p} />
                <button class="btn btn-primary btn-block btn-big mt" onClick={reset}>
                  New scenario
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <p class="tiny faint">
        Practice airplane with fictional-but-plausible numbers. Real flights use
        the actual aircraft’s current W&B record and POH envelope.
      </p>
    </div>
  );
}

function CheckRow(props: {
  label: string;
  detail: string;
  expected: number;
  tolerance: number;
  done: boolean;
  onDone: () => void;
}): JSX.Element {
  const [val, setVal] = useState('');
  const [wrong, setWrong] = useState(false);

  const check = () => {
    const n = parseFloat(val);
    if (!Number.isFinite(n)) return;
    if (Math.abs(n - props.expected) <= props.tolerance) {
      props.onDone();
      setWrong(false);
    } else {
      setWrong(true);
    }
  };

  return (
    <div style="padding: 8px 0; border-bottom: 1px solid var(--line)">
      <div class="rowline">
        <div style="flex: 1; min-width: 0">
          <div class="small" style="font-weight: 700">{props.label}</div>
          <div class="tiny dim mono">{props.detail}</div>
        </div>
        {props.done ? (
          <span class="mono" style="color: var(--accent); font-weight: 700">
            {fmt(props.expected)} ✓
          </span>
        ) : (
          <div style="display: flex; gap: 6px; align-items: center">
            <input
              type="text"
              inputMode="decimal"
              placeholder="?"
              value={val}
              style={`width: 108px; text-align: right; font-family: var(--font-mono); ${wrong ? 'border-color: var(--warning)' : ''}`}
              onInput={(e) => {
                setVal((e.target as HTMLInputElement).value);
                setWrong(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && check()}
            />
            <button class="btn" style="min-width: var(--tap); padding: 0 10px" onClick={check}>
              ✓
            </button>
          </div>
        )}
      </div>
      {wrong && (
        <div class="tiny mt" style="color: var(--warning)">
          Not it — recheck the arithmetic. ({props.detail})
        </div>
      )}
    </div>
  );
}

function fmt(n: number): string {
  return Number.isInteger(n) ? n.toLocaleString() : n.toFixed(1);
}

/** Weight-vs-CG envelope with the computed point plotted. */
function Envelope(props: { p: WbProblem }): JSX.Element {
  const { p } = props;
  // map CG 33–49" → x 30–350; weight 1500–2600 lb → y 150–10
  const X = (cg: number) => 30 + ((cg - 33) / 16) * 320;
  const Y = (w: number) => 150 - ((w - 1500) / 1100) * 140;
  const a = WB_AIRCRAFT;
  const path = [
    `M ${X(35)} ${Y(1500)}`,
    `L ${X(35)} ${Y(1950)}`,
    `L ${X(38.5)} ${Y(2400)}`,
    `L ${X(a.aftLimit)} ${Y(2400)}`,
    `L ${X(a.aftLimit)} ${Y(1500)}`,
    'Z',
  ].join(' ');

  return (
    <svg viewBox="0 0 380 175" class="mt" style="width: 100%">
      <path d={path} fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" />
      <g fill="var(--text-dim)" font-size="9" font-family="var(--font-mono)">
        <text x={X(35) - 4} y="168" text-anchor="middle">35"</text>
        <text x={X(38.5)} y="168" text-anchor="middle">38.5"</text>
        <text x={X(47.3)} y="168" text-anchor="middle">47.3"</text>
        <text x="2" y={Y(2400) + 3}>2400</text>
        <text x="2" y={Y(1950) + 3}>1950</text>
      </g>
      <line x1="30" y1={Y(2400)} x2="350" y2={Y(2400)} stroke="var(--line)" stroke-dasharray="3 3" />
      <circle
        cx={X(p.cg)}
        cy={Y(p.totalWeight)}
        r="6"
        fill={p.cgOk && !p.overGross ? 'var(--accent)' : 'var(--warning)'}
        stroke="var(--bg)"
        stroke-width="2"
      />
    </svg>
  );
}
