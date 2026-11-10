import {
  Circle,
  Code,
  Layout,
  Line,
  Node,
  Path,
  Rect,
  Txt,
  lines,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  DEFAULT,
  Reference,
  Vector2,
  all,
  chain,
  createRef,
  createSignal,
  easeInCubic,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  sequence,
  useThread,
  waitFor,
} from '@motion-canvas/core';
import {CUES, type CueName} from '../cues';

// ═════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═════════════════════════════════════════════════════════════════════════════
const C = {
  bg: '#0a0a0a',
  ink: '#f4f4f5',
  dim: '#8b8b95',
  panel: '#14161c',
  chip: '#1b2030',
  pink: '#ff6fa3',
  amber: '#ffb938',
  cyan: '#4dd0e1',
  green: '#4ade80',
  red: '#ff4d4d',
  blue: '#60a5fa',
  parchment: '#f3ead0',
  paper: '#b8a26b',
  cyanSoft: '#0c2b31',
  okSoft: '#0f2a1d',
  dangerSoft: '#3a1216',
  blueSoft: '#12263f',
};

// As fontes são carregadas em src/global.css (importe no project.ts).
const DISPLAY = '"Permanent Marker", "Comic Sans MS", cursive';
const MONO = '"JetBrains Mono", "Fira Code", Menlo, monospace';
const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';

// ═════════════════════════════════════════════════════════════════════════════
// SINCRONIA COM O VOICEOVER
// Os instantes de cada frase vêm de src/cues.ts, gerado por align.py A PARTIR DO
// MP3 DO VOICEOVER (nunca estimados). Se o áudio mudar, é preciso realinhar.
// Cada animação (beat) começa no seu cue e encolhe sozinha se a próxima frase
// chegar antes do previsto, então nada atropela a fala seguinte.
// ═════════════════════════════════════════════════════════════════════════════
const CUE_ORDER = Object.keys(CUES) as CueName[];

function fit(name: CueName, natural: number): (x: number) => number {
  const i = CUE_ORDER.indexOf(name);
  const next = CUES[CUE_ORDER[i + 1]];
  const k = Math.min(1, Math.max(0.35, (next - CUES[name] - 0.1) / natural));
  return (x: number) => x * k;
}

// ═════════════════════════════════════════════════════════════════════════════
// CODE SHOWN ON SCREEN
// ═════════════════════════════════════════════════════════════════════════════
const CODE_ATTACKED = [
  'const id = "1\' OR \'1\'=\'1"; // attacker',
  'const sql = `SELECT * FROM users',
  "  WHERE id = '${id}'`;",
  'await db.query(sql);',
].join('\n');

const CODE_SECURE = [
  'const id = "1\' OR \'1\'=\'1"; // attacker',
  'const sql = `SELECT * FROM users',
  '  WHERE id = $1`;',
  'await db.query(sql, [id]);',
].join('\n');

// pernas do "bug" do SQLi: x1, y1, x2, y2
const BUG_LEGS: [number, number, number, number][] = [
  [-45, 38, -100, 72],
  [-8, 48, -48, 98],
  [30, 42, 86, 78],
];

export default makeScene2D(function* (view) {
  view.size(new Vector2(1080, 1920));
  view.fill(C.bg);

  // ───────────────────────────────────────────────────────────────────────────
  // REFS
  // ───────────────────────────────────────────────────────────────────────────
  // HUD
  const tag = createRef<Txt>();
  const title = createRef<Txt>();
  const rule = createRef<Line>();
  const redFlash = createRef<Rect>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();

  // Ato 1
  const s1 = createRef<Node>();
  const shield = createRef<Node>();
  const shieldPath = createRef<Path>();
  const crack = createRef<Line>();
  const zeroLabel = createRef<Txt>();
  const qMark = createRef<Txt>();
  const bug = createRef<Node>();
  const wrongStamp = createRef<Txt>();

  // Ato 2
  const s2 = createRef<Node>();
  const userG = createRef<Node>();
  const gate = createRef<Node>();
  const arm = createRef<Rect>();
  const checklist = createRef<Rect>();
  const chkA = createRef<Line>();
  const chkB = createRef<Line>();
  const chkC = createRef<Line>();
  const mailG = createRef<Node>();
  const letter2 = createRef<Rect>();
  const tlsBadge = createRef<Rect>();
  const beam = createRef<Rect>();
  const allowedStamp = createRef<Txt>();
  const ring = createRef<Rect>();
  const envNote = createRef<Txt>();
  const eye = createRef<Node>();
  const eyeNote = createRef<Txt>();

  // Ato 3
  const s3 = createRef<Node>();
  const env3 = createRef<Node>();
  const letter3 = createRef<Rect>();
  const payloadLabel = createRef<Txt>();
  const strip = createRef<Rect>();
  const blkA = createRef<Rect>();
  const blkB = createRef<Rect>();
  const blkC = createRef<Rect>();
  const txtB = createRef<Txt>();
  const concatLabel = createRef<Txt>();
  const tokRow = createRef<Rect>();
  const colA = createRef<Layout>();
  const colB = createRef<Layout>();
  const colC = createRef<Layout>();
  const chipB = createRef<Rect>();
  const chipC = createRef<Rect>();
  const labB = createRef<Txt>();
  const labC = createRef<Txt>();
  const parserTag = createRef<Txt>();
  const db3 = createRef<Node>();
  const counter = createRef<Txt>();

  // Ato 4
  const s4 = createRef<Node>();
  const zoneL = createRef<Rect>();
  const zoneR = createRef<Rect>();
  const tmplChip = createRef<Rect>();
  const valChip = createRef<Rect>();
  const valTxt = createRef<Txt>();
  const wall = createRef<Line>();
  const orChip = createRef<Rect>();
  const xMark = createRef<Node>();
  const db4 = createRef<Node>();
  const lockBadge = createRef<Node>();
  const slot = createRef<Rect>();
  const compiledNote = createRef<Txt>();
  const okMark = createRef<Line>();
  const result4 = createRef<Txt>();

  // Ato 5
  const s5 = createRef<Node>();
  const cardA = createRef<Rect>();
  const cardB = createRef<Rect>();
  const strikeTxt = createRef<Txt>();
  const strikeLine = createRef<Line>();
  const useBoth = createRef<Txt>();

  const rows = createSignal(0);

  // ───────────────────────────────────────────────────────────────────────────
  // COMPONENTE REUTILIZÁVEL: banco de dados (cilindro)
  // ───────────────────────────────────────────────────────────────────────────
  const makeDb = (ref: Reference<Node>, x: number, y: number) => (
    <Node
      ref={ref}
      x={x}
      y={y}
      opacity={0}
      shadowColor={C.red}
      shadowBlur={0}
    >
      <Circle y={70} width={220} height={64} fill={'#0f2f3a'} stroke={C.cyan} lineWidth={5} />
      <Rect width={220} height={140} fill={'#0f2f3a'} />
      <Line points={[[-110, -70], [-110, 70]]} stroke={C.cyan} lineWidth={5} />
      <Line points={[[110, -70], [110, 70]]} stroke={C.cyan} lineWidth={5} />
      <Circle y={-70} width={220} height={64} fill={'#17475a'} stroke={C.cyan} lineWidth={5} />
      <Txt y={-68} fontFamily={DISPLAY} fontSize={28} fill={C.cyan} text={'DATABASE'} />
    </Node>
  );

  // ───────────────────────────────────────────────────────────────────────────
  // HUD GLOBAL
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Txt
      ref={tag}
      y={-770}
      opacity={0}
      fontFamily={DISPLAY}
      fontSize={34}
      letterSpacing={4}
      fill={C.amber}
      text={'INTERVIEW QUESTION'}
    />,
  );
  view.add(
    <Txt
      ref={title}
      y={-660}
      width={900}
      textWrap
      textAlign={'center'}
      opacity={0}
      fontFamily={DISPLAY}
      fontSize={72}
      fill={C.ink}
      text={'Does Zero-Trust stop SQL Injection?'}
    />,
  );
  view.add(
    <Line
      ref={rule}
      points={[[-163, -545], [163, -545]]}
      stroke={C.dim}
      lineWidth={4}
      lineDash={[14, 12]}
      end={0}
    />,
  );

  // Card de código persistente (atos 3 e 4)
  view.add(
    <Rect
      ref={codeCard}
      y={-370}
      width={920}
      height={230}
      radius={24}
      fill={C.panel}
      stroke={C.dim}
      lineWidth={3}
      lineDash={[14, 10]}
      opacity={0}
    >
      <Code ref={code} fontSize={30} fontFamily={MONO} code={CODE_ATTACKED} />
    </Rect>,
  );

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 1 — GANCHO: escudo Zero-Trust + bug do SQLi
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Node ref={s1}>
      <Node ref={shield} y={-110} opacity={0}>
        <Path
          ref={shieldPath}
          data={'M 0 -170 L 150 -110 L 150 20 C 150 120 70 180 0 210 C -70 180 -150 120 -150 20 L -150 -110 Z'}
          fill={C.cyanSoft}
          stroke={C.cyan}
          lineWidth={12}
          lineJoin={'round'}
        />
        <Circle y={-30} width={84} height={84} startAngle={180} endAngle={360} stroke={C.cyan} lineWidth={14} />
        <Rect y={30} width={116} height={90} radius={16} fill={C.cyan} />
        <Circle y={26} size={22} fill={C.cyanSoft} />
        <Line
          ref={crack}
          opacity={0}
          points={[[30, -150], [58, -92], [6, -52], [66, 0], [16, 62]]}
          stroke={C.red}
          lineWidth={9}
          lineCap={'round'}
          lineJoin={'round'}
          end={0}
        />
      </Node>
      <Txt
        ref={zeroLabel}
        y={150}
        opacity={0}
        fontFamily={DISPLAY}
        fontSize={56}
        fill={C.cyan}
        text={'ZERO-TRUST'}
      />
      <Txt
        ref={qMark}
        x={230}
        y={-300}
        rotation={12}
        opacity={0}
        fontFamily={DISPLAY}
        fontSize={220}
        fill={C.amber}
        text={'?'}
      />
      <Node ref={bug} x={720} y={-330} opacity={0}>
        {[1, -1].flatMap((s) =>
          BUG_LEGS.map(([x1, y1, x2, y2]) => (
            <Line
              points={[[x1, y1 * s], [x2, y2 * s]]}
              stroke={C.red}
              lineWidth={9}
              lineCap={'round'}
            />
          )),
        )}
        <Line points={[[-120, -22], [-155, -62]]} stroke={C.red} lineWidth={7} lineCap={'round'} />
        <Line points={[[-120, 22], [-155, 62]]} stroke={C.red} lineWidth={7} lineCap={'round'} />
        <Circle width={170} height={120} fill={C.red} />
        <Circle x={-105} size={64} fill={C.red} />
        <Txt x={8} fontFamily={MONO} fontSize={38} fontWeight={700} fill={C.ink} text={'SQLi'} />
      </Node>
      <Txt
        ref={wrongStamp}
        y={330}
        rotation={-10}
        opacity={0}
        fontFamily={DISPLAY}
        fontSize={120}
        fill={C.red}
        text={'WRONG.'}
      />
    </Node>,
  );

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 2 — O portão Zero-Trust só confere o ENVELOPE
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Node ref={s2}>
      {/* checklist do guarda */}
      <Rect
        ref={checklist}
        y={-330}
        width={620}
        height={230}
        radius={24}
        fill={C.panel}
        stroke={C.cyan}
        lineWidth={4}
        lineDash={[14, 10]}
        opacity={0}
      >
        <Txt x={-250} y={-65} offset={[-1, 0]} fontFamily={MONO} fontSize={32} fill={C.ink} text={'Identity (mTLS)'} />
        <Txt x={-250} y={0} offset={[-1, 0]} fontFamily={MONO} fontSize={32} fill={C.ink} text={'Device'} />
        <Txt x={-250} y={65} offset={[-1, 0]} fontFamily={MONO} fontSize={32} fill={C.ink} text={'TLS certificate'} />
        <Line ref={chkA} opacity={0} x={245} y={-65} points={[[-16, 0], [-4, 14], [18, -14]]} stroke={C.green} lineWidth={9} lineCap={'round'} lineJoin={'round'} end={0} />
        <Line ref={chkB} opacity={0} x={245} y={0} points={[[-16, 0], [-4, 14], [18, -14]]} stroke={C.green} lineWidth={9} lineCap={'round'} lineJoin={'round'} end={0} />
        <Line ref={chkC} opacity={0} x={245} y={65} points={[[-16, 0], [-4, 14], [18, -14]]} stroke={C.green} lineWidth={9} lineCap={'round'} lineJoin={'round'} end={0} />
      </Rect>

      {/* portão */}
      <Node ref={gate} y={100} opacity={0}>
        <Rect x={-100} width={36} height={280} radius={8} fill={C.panel} stroke={C.ink} lineWidth={4} />
        <Rect x={100} width={36} height={280} radius={8} fill={C.panel} stroke={C.ink} lineWidth={4} />
        <Rect y={-190} width={250} height={60} radius={14} fill={C.panel} stroke={C.cyan} lineWidth={4} lineDash={[12, 8]}>
          <Txt fontFamily={DISPLAY} fontSize={30} fill={C.cyan} text={'ZERO-TRUST'} />
        </Rect>
        <Rect ref={arm} x={-82} width={170} height={18} radius={9} fill={C.red} offset={[-1, 0]} />
      </Node>

      {/* usuário */}
      <Node ref={userG} x={-700} y={100} opacity={0}>
        <Circle y={-110} size={68} stroke={C.ink} lineWidth={7} />
        <Line points={[[0, -76], [0, 40]]} stroke={C.ink} lineWidth={8} lineCap={'round'} />
        <Line points={[[0, -45], [-52, 10]]} stroke={C.ink} lineWidth={8} lineCap={'round'} />
        <Line points={[[0, -45], [58, -5]]} stroke={C.ink} lineWidth={8} lineCap={'round'} />
        <Line points={[[0, 40], [-38, 130]]} stroke={C.ink} lineWidth={8} lineCap={'round'} />
        <Line points={[[0, 40], [38, 130]]} stroke={C.ink} lineWidth={8} lineCap={'round'} />
        <Txt y={175} fontFamily={MONO} fontSize={26} fill={C.dim} text={'USER'} />
      </Node>

      {/* envelope (com a carta escondida atrás) */}
      <Node ref={mailG} x={-700} y={100} opacity={0}>
        <Rect ref={letter2} y={10} width={190} height={80} radius={6} fill={C.ink} opacity={0}>
          <Txt fontFamily={MONO} fontSize={22} fontWeight={700} fill={C.red} text={"1' OR '1'='1"} />
        </Rect>
        <Rect y={10} width={220} height={120} radius={10} fill={C.parchment} stroke={C.paper} lineWidth={4} />
        <Line points={[[-110, -50], [0, 25], [110, -50]]} stroke={C.paper} lineWidth={4} lineJoin={'round'} />
        <Rect ref={tlsBadge} y={36} width={74} height={38} radius={8} fill={C.cyan}>
          <Txt fontFamily={MONO} fontSize={20} fontWeight={700} fill={'#04121c'} text={'TLS'} />
        </Rect>
        <Txt y={100} fontFamily={MONO} fontSize={22} fill={C.dim} text={'HTTPS request'} />
      </Node>

      <Rect ref={beam} x={-200} y={60} width={260} height={6} radius={3} fill={C.cyan} opacity={0} shadowColor={C.cyan} shadowBlur={26} />
      <Txt ref={allowedStamp} x={-190} y={340} rotation={-8} opacity={0} fontFamily={DISPLAY} fontSize={92} fill={C.green} text={'ALLOWED'} />
      <Rect ref={ring} x={330} y={115} width={290} height={250} radius={22} stroke={C.cyan} lineWidth={5} lineDash={[12, 10]} opacity={0} />
      <Txt ref={envNote} x={330} y={285} opacity={0} fontFamily={MONO} fontSize={26} fill={C.cyan} text={'ENVELOPE-only check'} />
      <Node ref={eye} x={330} y={-110} opacity={0}>
        <Circle width={120} height={64} stroke={C.ink} lineWidth={7} />
        <Circle size={28} fill={C.ink} />
        <Line points={[[-66, 44], [66, -44]]} stroke={C.red} lineWidth={9} lineCap={'round'} />
      </Node>
      <Txt ref={eyeNote} x={330} y={-52} opacity={0} fontFamily={MONO} fontSize={24} fill={C.red} text={'never looks here'} />
    </Node>,
  );

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 3 — payload, concatenação, parser, vazamento
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Node ref={s3}>
      <Node ref={env3} x={-700} y={-130} scale={1.5} opacity={0}>
        <Rect ref={letter3} y={10} width={190} height={80} radius={6} fill={C.ink} opacity={0}>
          <Txt fontFamily={MONO} fontSize={22} fontWeight={700} fill={C.red} text={"1' OR '1'='1"} />
        </Rect>
        <Rect y={10} width={220} height={120} radius={10} fill={C.parchment} stroke={C.paper} lineWidth={4} />
        <Line points={[[-110, -50], [0, 25], [110, -50]]} stroke={C.paper} lineWidth={4} lineJoin={'round'} />
        <Rect y={36} width={74} height={38} radius={8} fill={C.cyan}>
          <Txt fontFamily={MONO} fontSize={20} fontWeight={700} fill={'#04121c'} text={'TLS'} />
        </Rect>
      </Node>
      <Txt ref={payloadLabel} y={-340} opacity={0} fontFamily={DISPLAY} fontSize={40} fill={C.red} text={"ATTACKER'S PAYLOAD"} />

      {/* string da query: três pedaços que se fundem */}
      <Txt ref={concatLabel} y={-140} opacity={0} fontFamily={DISPLAY} fontSize={34} fill={C.amber} text={'CONCATENATION'} />
      <Rect ref={strip} y={-60} layout direction={'row'} gap={110} opacity={0}>
        <Rect ref={blkA} padding={[12, 16]} radius={10} fill={C.chip} stroke={C.dim} lineWidth={3}>
          <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={"SELECT * FROM users WHERE id = '"} />
        </Rect>
        <Rect ref={blkB} padding={[12, 16]} radius={10} fill={C.dangerSoft} stroke={C.red} lineWidth={3}>
          <Txt ref={txtB} fontFamily={MONO} fontSize={24} fill={C.red} text={"1' OR '1'='1"} />
        </Rect>
        <Rect ref={blkC} padding={[12, 16]} radius={10} fill={C.chip} stroke={C.dim} lineWidth={3}>
          <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={"'"} />
        </Rect>
      </Rect>

      {/* tokens do parser */}
      <Txt ref={parserTag} y={-140} opacity={0} fontFamily={DISPLAY} fontSize={34} fill={C.amber} text={'PARSER AST'} />
      <Rect ref={tokRow} y={-60} layout direction={'row'} gap={16} alignItems={'start'} opacity={0}>
        <Layout ref={colA} direction={'column'} alignItems={'center'} gap={10} opacity={0}>
          <Rect padding={[12, 16]} radius={10} fill={C.chip} stroke={C.dim} lineWidth={3}>
            <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={'SELECT * FROM users WHERE id ='} />
          </Rect>
          <Txt fontFamily={SANS} fontSize={26} fill={C.dim} text={'structure'} />
        </Layout>
        <Layout ref={colB} direction={'column'} alignItems={'center'} gap={10} opacity={0}>
          <Rect ref={chipB} padding={[12, 16]} radius={10} fill={C.chip} stroke={C.dim} lineWidth={3}>
            <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={"'1'"} />
          </Rect>
          <Txt ref={labB} fontFamily={SANS} fontSize={26} fill={C.dim} text={'data'} />
        </Layout>
        <Layout ref={colC} direction={'column'} alignItems={'center'} gap={10} opacity={0}>
          <Rect ref={chipC} padding={[12, 16]} radius={10} fill={C.chip} stroke={C.dim} lineWidth={3}>
            <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={"OR '1'='1'"} />
          </Rect>
          <Txt ref={labC} fontFamily={SANS} fontSize={26} fill={C.dim} text={'control'} />
        </Layout>
      </Rect>

      {makeDb(db3, 0, 190)}
      <Txt
        ref={counter}
        y={395}
        opacity={0}
        fontFamily={DISPLAY}
        fontSize={68}
        fill={C.red}
        text={() => `${Math.round(rows()).toLocaleString('en-US')} rows leaked`}
      />
    </Node>,
  );

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 4 — a correção: plano de controle x plano de dados
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Node ref={s4}>
      <Rect ref={zoneL} x={-265} y={-60} width={480} height={230} radius={24} fill={C.panel} stroke={C.blue} lineWidth={4} lineDash={[14, 10]} opacity={0}>
        <Txt y={-85} fontFamily={DISPLAY} fontSize={30} fill={C.blue} text={'CONTROL PLANE'} />
      </Rect>
      <Rect ref={zoneR} x={265} y={-60} width={480} height={230} radius={24} fill={C.panel} stroke={C.green} lineWidth={4} lineDash={[14, 10]} opacity={0}>
        <Txt y={-85} fontFamily={DISPLAY} fontSize={30} fill={C.green} text={'DATA PLANE'} />
      </Rect>

      <Rect ref={tmplChip} x={-265} y={-20} layout direction={'column'} alignItems={'start'} padding={[12, 16]} radius={10} fill={C.blueSoft} stroke={C.blue} lineWidth={3} opacity={0}>
        <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={'SELECT * FROM users'} />
        <Txt fontFamily={MONO} fontSize={24} fill={C.ink} text={'WHERE id = $1'} />
      </Rect>
      <Rect ref={valChip} x={265} y={-20} layout padding={[12, 16]} radius={10} fill={C.dangerSoft} stroke={C.red} lineWidth={3} opacity={0}>
        <Txt ref={valTxt} fontFamily={MONO} fontSize={24} fill={C.red} text={`"1' OR '1'='1"`} />
      </Rect>

      <Line ref={wall} points={[[0, -175], [0, 60]]} stroke={C.dim} lineWidth={6} lineDash={[12, 10]} end={0} />
      <Rect ref={orChip} x={265} y={-105} width={92} height={44} radius={10} fill={C.dangerSoft} stroke={C.red} lineWidth={3} opacity={0}>
        <Txt fontFamily={MONO} fontSize={24} fontWeight={700} fill={C.red} text={'OR'} />
      </Rect>
      <Node ref={xMark} x={0} y={-60} opacity={0}>
        <Circle size={80} fill={C.bg} />
        <Line points={[[-24, -24], [24, 24]]} stroke={C.red} lineWidth={10} lineCap={'round'} />
        <Line points={[[-24, 24], [24, -24]]} stroke={C.red} lineWidth={10} lineCap={'round'} />
      </Node>

      {makeDb(db4, 0, 200)}
      <Node ref={lockBadge} x={0} y={212} scale={0} opacity={0}>
        <Circle y={-28} width={54} height={54} startAngle={180} endAngle={360} stroke={C.blue} lineWidth={10} />
        <Rect width={76} height={56} radius={10} fill={C.blue} />
      </Node>
      <Rect ref={slot} x={92} y={222} width={64} height={34} radius={8} stroke={C.green} lineWidth={3} lineDash={[8, 6]} opacity={0}>
        <Txt fontFamily={MONO} fontSize={20} fontWeight={700} fill={C.green} text={'$1'} />
      </Rect>
      <Txt ref={compiledNote} y={330} opacity={0} fontFamily={MONO} fontSize={26} fill={C.blue} text={'template compiled'} />
      <Line ref={okMark} opacity={0} x={0} y={205} points={[[-44, 0], [-12, 34], [48, -38]]} stroke={C.green} lineWidth={16} lineCap={'round'} lineJoin={'round'} end={0} />
      <Txt ref={result4} y={395} opacity={0} fontFamily={DISPLAY} fontSize={72} fill={C.green} text={'0 rows returned'} />
    </Node>,
  );

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 5 — resumo
  // ───────────────────────────────────────────────────────────────────────────
  view.add(
    <Node ref={s5}>
      <Rect ref={cardA} y={-250} width={900} height={200} radius={28} fill={C.panel} stroke={C.cyan} lineWidth={4} lineDash={[16, 12]} opacity={0}>
        <Rect x={-330} y={25} width={30} height={120} radius={6} stroke={C.ink} lineWidth={4} />
        <Rect x={-230} y={25} width={30} height={120} radius={6} stroke={C.ink} lineWidth={4} />
        <Rect x={-280} y={-5} width={110} height={12} radius={6} fill={C.green} />
        <Txt x={-150} y={-38} offset={[-1, 0]} fontFamily={DISPLAY} fontSize={50} fill={C.cyan} text={'ZERO-TRUST'} />
        <Txt x={-150} y={32} offset={[-1, 0]} fontFamily={SANS} fontSize={40} fontWeight={700} fill={C.ink} text={'controls WHO connects'} />
      </Rect>
      <Rect ref={cardB} y={10} width={900} height={200} radius={28} fill={C.panel} stroke={C.green} lineWidth={4} lineDash={[16, 12]} opacity={0}>
        <Line points={[[-330, -50], [-330, 70]]} stroke={C.blue} lineWidth={10} lineCap={'round'} />
        <Line points={[[-295, -50], [-295, 70]]} stroke={C.dim} lineWidth={4} lineDash={[8, 6]} />
        <Line points={[[-260, -50], [-260, 70]]} stroke={C.green} lineWidth={10} lineCap={'round'} />
        <Txt x={-190} y={-38} offset={[-1, 0]} fontFamily={DISPLAY} fontSize={46} fill={C.green} text={'PARAMETER BINDING'} />
        <Txt x={-190} y={32} offset={[-1, 0]} fontFamily={SANS} fontSize={36} fontWeight={700} fill={C.ink} text={'controls WHAT the query means'} />
      </Rect>
      <Txt ref={strikeTxt} y={260} opacity={0} fontFamily={MONO} fontSize={32} fill={C.ink} text={`"... WHERE id = " + id`} />
      <Line ref={strikeLine} opacity={0} points={[[-330, 260], [330, 260]]} stroke={C.red} lineWidth={10} lineCap={'round'} end={0} />
      <Txt ref={useBoth} y={385} opacity={0} fontFamily={DISPLAY} fontSize={84} fill={C.amber} text={'Use both.'} />
    </Node>,
  );

  // Overlays finais (ficam por cima de tudo)
  view.add(<Rect ref={redFlash} size={[1080, 1920]} fill={C.red} opacity={0} />);

  // ───────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ───────────────────────────────────────────────────────────────────────────
  function* until(t: number) {
    const remaining = t - useThread().time();
    if (remaining > 0) {
      yield* waitFor(remaining);
    }
  }

  function* at(name: CueName) {
    yield* until(CUES[name]);
  }

  function* swapHead(tagText: string, titleText: string) {
    yield* all(tag().opacity(0, 0.25), title().opacity(0, 0.25));
    tag().text(tagText);
    title().text(titleText);
    yield* all(tag().opacity(1, 0.35), title().opacity(1, 0.45));
  }

  function* pop(n: Node, d: number = 0.45) {
    n.scale(0.01);
    yield* all(n.opacity(1, d * 0.5), n.scale(1, d, easeOutBack));
  }

  function* shake(n: Node, amp: number = 12, d: number = 0.4) {
    const x0 = n.x();
    yield* chain(
      n.x(x0 + amp, d / 8),
      n.x(x0 - amp, d / 4),
      n.x(x0 + amp, d / 4),
      n.x(x0, d / 8),
    );
  }

  function* bob(n: Node, amp: number, times: number, d: number = 0.22) {
    const y0 = n.y();
    for (let i = 0; i < times; i++) {
      yield* n.y(y0 - amp, d, easeInOutCubic);
      yield* n.y(y0, d, easeInOutCubic);
    }
  }

  function* flashRed() {
    yield* chain(redFlash().opacity(0.22, 0.12), redFlash().opacity(0, 0.35));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 1
  // Cada beat começa no seu cue e usa D(x) = x escalado para caber até o próximo cue.
  // ───────────────────────────────────────────────────────────────────────────
  function* intro() {
    const D = fit('hook', 1.8);
    yield* all(
      tag().opacity(1, D(0.5)),
      title().opacity(1, D(0.7)),
      rule().end(1, D(0.7)),
    );
    yield* pop(shield(), D(0.7));
    yield* zeroLabel().opacity(1, D(0.4));
  }

  function* showQuestion() {
    const D = fit('question', 1.1);
    yield* pop(qMark(), D(0.5));
    yield* chain(
      qMark().rotation(24, D(0.2)),
      qMark().rotation(2, D(0.2)),
      qMark().rotation(14, D(0.2)),
    );
  }

  function* wrong() {
    const D = fit('wrong', 1.6);
    yield qMark().opacity(0, D(0.25));
    bug().opacity(1);
    yield* bug().position(new Vector2(185, -215), D(0.7), easeInCubic);
    crack().opacity(1);
    yield* all(
      shake(shield(), 16, D(0.5)),
      shieldPath().stroke(C.red, D(0.2)),
      crack().end(1, D(0.35)),
      bug().rotation(-25, D(0.2)),
      flashRed(),
    );
    yield* pop(wrongStamp(), D(0.4));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 2
  // ───────────────────────────────────────────────────────────────────────────
  function* s2Start() {
    const D = fit('user', 2.15);
    yield s1().opacity(0, 0.5);
    yield swapHead('ZERO-TRUST', 'What does the gate really check?');
    yield* pop(gate(), D(0.55));
    userG().opacity(1);
    mailG().opacity(1);
    yield* all(
      userG().x(-440, D(1.6), easeOutCubic),
      mailG().x(-300, D(1.6), easeOutCubic),
      bob(userG(), 12, 3, D(0.22)),
    );
  }

  function* s2Checklist() {
    const D = fit('checklist', 0.5);
    yield* pop(checklist(), D(0.5));
  }

  function* sweep(D: (x: number) => number) {
    beam().x(mailG().x());
    beam().y(45);
    yield beam().opacity(1, D(0.15));
    yield* beam().y(160, D(0.55), easeInOutCubic);
    yield* beam().y(45, D(0.55), easeInOutCubic);
  }

  function* s2MailToGate() {
    const D = fit('mailGate', 0.9);
    yield* mailG().x(-200, D(0.9), easeInOutCubic);
    beam().x(-200);
  }

  function* s2Check(name: 'chk1' | 'chk2', line: Line) {
    const D = fit(name, 1.25);
    line.opacity(1);
    yield* all(line.end(1, D(0.35)), sweep(D));
  }

  function* s2Check3() {
    const D = fit('chk3', 1.25);
    chkC().opacity(1);
    yield* all(
      chkC().end(1, D(0.35)),
      sweep(D),
      chain(tlsBadge().scale(1.3, D(0.25)), tlsBadge().scale(1, D(0.3))),
    );
  }

  function* s2Allowed() {
    const D = fit('allowed', 1.8);
    yield* all(
      beam().opacity(0, D(0.2)),
      arm().fill(C.green, D(0.25)),
      arm().rotation(-80, D(0.5), easeOutBack),
      pop(allowedStamp(), D(0.45)),
    );
    yield* mailG().x(330, D(1.3), easeInOutCubic);
  }

  function* s2OnlyEnvelope() {
    const D = fit('onlyEnvelope', 0.4);
    yield* all(pop(ring(), D(0.4)), envNote().opacity(1, D(0.4)));
  }

  function* s2NeverOpen() {
    const D = fit('neverOpen', 1.3);
    letter2().opacity(1);
    yield* letter2().y(-62, D(0.6), easeOutBack);
    yield* pop(eye(), D(0.4));
    yield* eyeNote().opacity(1, D(0.3));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 3
  // ───────────────────────────────────────────────────────────────────────────
  function* s3Start() {
    const D = fit('payload', 1.0);
    yield s2().opacity(0, 0.5);
    yield swapHead('SQL INJECTION', 'What happens inside the query?');
    env3().opacity(1);
    yield* env3().x(0, D(1.0), easeOutCubic);
  }

  function* s3Peek() {
    const D = fit('peek', 1.1);
    letter3().opacity(1);
    yield* all(
      letter3().y(-62, D(0.7), easeOutBack),
      payloadLabel().opacity(1, D(0.4)),
    );
    yield* shake(env3(), 8, D(0.4));
  }

  function* s3Snippet() {
    const D = fit('snippet', 0.8);
    letter3().shadowColor(C.red);
    yield* all(
      chain(letter3().shadowBlur(46, D(0.3)), letter3().shadowBlur(0, D(0.5))),
      chain(letter3().scale(1.14, D(0.3), easeOutCubic), letter3().scale(1, D(0.5))),
      chain(payloadLabel().scale(1.15, D(0.3)), payloadLabel().scale(1, D(0.5))),
    );
  }

  function* s3Concat() {
    const D = fit('concat', 2.8);
    yield* all(
      env3().opacity(0, D(0.4)),
      env3().y(-60, D(0.4)),
      payloadLabel().opacity(0, D(0.3)),
    );
    yield* all(codeCard().opacity(1, D(0.5)), code().selection(lines(1, 2), D(0.5)));
    yield* all(strip().opacity(1, D(0.4)), concatLabel().opacity(1, D(0.4)));
    yield* strip().gap(0, D(1.5), easeInOutCubic);
  }

  function* s3Merge() {
    const D = fit('merge', 0.7);
    yield* all(
      blkB().fill(C.chip, D(0.7)),
      blkB().stroke(C.dim, D(0.7)),
      txtB().fill(C.ink, D(0.7)),
      code().selection(DEFAULT, D(0.5)),
    );
  }

  function* s3Parse() {
    const D = fit('parser', 1.6);
    yield pop(db3(), D(0.5));
    yield* all(
      concatLabel().opacity(0, D(0.3)),
      strip().y(130, D(0.7), easeInCubic),
      strip().scale(0.4, D(0.7)),
      strip().opacity(0, D(0.7)),
    );
    tokRow().opacity(1);
    yield parserTag().opacity(1, D(0.4));
    yield* sequence(D(0.25), pop(colA(), D(0.4)), pop(colB(), D(0.4)), pop(colC(), D(0.4)));
  }

  function* s3Recolor() {
    const D = fit('recolor', 1.1);
    yield* all(
      chipB().fill(C.okSoft, D(0.6)),
      chipB().stroke(C.green, D(0.6)),
      labB().fill(C.green, D(0.6)),
      chipC().fill(C.dangerSoft, D(0.6)),
      chipC().stroke(C.red, D(0.6)),
      labC().fill(C.red, D(0.6)),
      labC().text('INSTRUCTION!', D(0.6)),
    );
    yield* chain(colC().scale(1.2, D(0.2), easeOutCubic), colC().scale(1, D(0.3)));
  }

  function* s3Leak() {
    const D = fit('leak', 2.5);
    yield flashRed();
    yield db3().shadowBlur(60, D(0.4));
    yield pop(counter(), D(0.5));
    yield rows(1842, D(2.4), easeOutCubic);

    for (let i = 0; i < 12; i++) {
      const card = createRef<Rect>();
      s3().add(
        <Rect
          ref={card}
          y={190}
          width={320}
          height={46}
          radius={10}
          fill={C.dangerSoft}
          stroke={C.red}
          lineWidth={2}
          opacity={0}
        >
          <Txt fontFamily={MONO} fontSize={18} fill={C.ink} text={`user_${1000 + i} · ******@mail.com`} />
        </Rect>,
      );
      const side = i % 2 === 0 ? -1 : 1;
      const row = Math.floor(i / 2);
      const dx = side * (335 + (row % 2) * 30);
      const dy = 105 + row * 44;
      yield all(
        card().opacity(1, D(0.15)),
        card().position(new Vector2(dx, dy), D(0.9), easeOutCubic),
        card().rotation(side * 6, D(0.9)),
      );
      yield* waitFor(D(0.14));
    }
    yield* flashRed();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 4
  // ───────────────────────────────────────────────────────────────────────────
  function* s4Start() {
    const D = fit('fix', 1.15);
    yield s3().opacity(0, 0.5);
    yield swapHead('THE FIX', 'Parameter Binding');
    yield pop(db4(), D(0.5));
    yield* sequence(
      D(0.25),
      pop(zoneL(), D(0.5)),
      pop(zoneR(), D(0.5)),
      pop(tmplChip(), D(0.4)),
      pop(valChip(), D(0.4)),
    );
  }

  function* s4Morph() {
    const D = fit('morph', 1.4);
    yield* all(code().code(CODE_SECURE, D(1.4)), code().selection(lines(2, 3), D(0.8)));
  }

  function* s4Template() {
    const D = fit('template', 1.5);
    yield* all(
      tmplChip().position(new Vector2(-40, 205), D(1.0), easeInOutCubic),
      tmplChip().scale(0.45, D(1.0)),
      tmplChip().opacity(0, D(1.0)),
      code().selection(lines(1, 2), D(0.6)),
    );
    yield* all(
      pop(lockBadge(), D(0.5)),
      db4().shadowColor(C.blue, 0.1),
      db4().shadowBlur(50, D(0.5)),
      compiledNote().opacity(1, D(0.4)),
    );
  }

  function* s4Data() {
    const D = fit('data', 1.95);
    yield* all(wall().end(1, D(0.5)), pop(orChip(), D(0.35)));
    // o "OR" tenta cruzar para o plano de controle e é barrado
    yield* orChip().x(60, D(0.55), easeInCubic);
    yield* all(
      pop(xMark(), D(0.3)),
      shake(wall(), 8, D(0.4)),
      orChip().x(260, D(0.5), easeOutCubic),
    );
    yield* all(xMark().opacity(0, D(0.4)), orChip().opacity(0, D(0.4)));
  }

  function* s4Bind() {
    const D = fit('bind', 2.2);
    yield* all(
      slot().opacity(1, D(0.3)),
      code().selection(lines(3, 3), D(0.6)),
    );
    yield* all(
      valChip().position(new Vector2(92, 222), D(1.3), easeInOutCubic),
      valChip().scale(0.5, D(1.3)),
      valChip().fill(C.okSoft, D(1.0)),
      valChip().stroke(C.green, D(1.0)),
      valTxt().fill(C.green, D(1.0)),
    );
    yield* valChip().opacity(0, D(0.3));
  }

  function* s4Safe() {
    const D = fit('safe', 1.5);
    yield* all(
      db4().shadowColor(C.green, 0.1),
      db4().shadowBlur(60, D(0.5)),
      lockBadge().opacity(0, D(0.3)),
      slot().opacity(0, D(0.3)),
      compiledNote().opacity(0, D(0.3)),
      code().selection(DEFAULT, D(0.5)),
    );
    okMark().opacity(1);
    yield* okMark().end(1, D(0.5));
    yield* pop(result4(), D(0.5));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ATO 5
  // ───────────────────────────────────────────────────────────────────────────
  function* s5Start() {
    const D = fit('recap', 1.15);
    yield s4().opacity(0, 0.5);
    yield codeCard().opacity(0, 0.5);
    yield swapHead('RECAP', 'Defense in depth');
    yield* waitFor(D(0.6));
    yield* pop(cardA(), D(0.55));
  }

  function* s5CardB() {
    const D = fit('cardB', 0.55);
    yield* pop(cardB(), D(0.55));
  }

  function* s5Cta() {
    const D = fit('cta', 1.45);
    yield* strikeTxt().opacity(1, D(0.4));
    strikeLine().opacity(1);
    yield* strikeLine().end(1, D(0.5));
    yield* pop(useBoth(), D(0.55));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // TIMELINE MESTRE — cada beat dispara no instante MEDIDO da frase (src/cues.ts)
  // ───────────────────────────────────────────────────────────────────────────
  yield* at('hook');
  yield intro();
  yield* at('question');
  yield showQuestion();
  yield* at('wrong');
  yield wrong();

  yield* at('user');
  yield s2Start();
  yield* at('checklist');
  yield s2Checklist();
  yield* at('mailGate');
  yield s2MailToGate();
  yield* at('chk1');
  yield s2Check('chk1', chkA());
  yield* at('chk2');
  yield s2Check('chk2', chkB());
  yield* at('chk3');
  yield s2Check3();
  yield* at('allowed');
  yield s2Allowed();
  yield* at('onlyEnvelope');
  yield s2OnlyEnvelope();
  yield* at('neverOpen');
  yield s2NeverOpen();

  yield* at('payload');
  yield s3Start();
  yield* at('peek');
  yield s3Peek();
  yield* at('snippet');
  yield s3Snippet();
  yield* at('concat');
  yield s3Concat();
  yield* at('merge');
  yield s3Merge();
  yield* at('parser');
  yield s3Parse();
  yield* at('recolor');
  yield s3Recolor();
  yield* at('leak');
  yield s3Leak();

  yield* at('fix');
  yield s4Start();
  yield* at('morph');
  yield s4Morph();
  yield* at('template');
  yield s4Template();
  yield* at('data');
  yield s4Data();
  yield* at('bind');
  yield s4Bind();
  yield* at('safe');
  yield s4Safe();

  yield* at('recap');
  yield s5Start();
  yield* at('cardB');
  yield s5CardB();
  yield* at('cta');
  yield s5Cta();

  // a cena dura exatamente o áudio (+ cauda curta), definido em cues.ts
  yield* at('end');
});