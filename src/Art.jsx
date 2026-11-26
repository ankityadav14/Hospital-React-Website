import { IMG } from './img.js'
const P = [
  ['#062b52', '#0b5ea8', '#18a0b8', '#fbbf24'],
  ['#0a2540', '#0e7490', '#34d399', '#fde68a'],
  ['#1e1b4b', '#0b5ea8', '#38bdf8', '#f9a8d4'],
  ['#052e3f', '#0f766e', '#f58220', '#fff7ed']
]
export function Scene ({ k = 0, bg }) {
  const p = P[k % 4],
    id = 'sg' + k + (bg ? 'b' : ''),
    w = []
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 7; c++)
      w.push(
        <rect
          key={r + '-' + c}
          x={700 + c * 48}
          y={320 + r * 46}
          width='28'
          height='26'
          rx='4'
          fill='#fff'
          opacity={(r * 7 + c + k) % 5 === 0 ? 0.95 : 0.35}
        />
      )
  return (
    <svg
      className={'scene' + (bg ? ' bg' : '')}
      viewBox='0 0 1200 600'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      <defs>
        <linearGradient id={id} x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor={p[0]} />
          <stop offset='.6' stopColor={p[1]} />
          <stop offset='1' stopColor={p[2]} />
        </linearGradient>
      </defs>
      <rect width='1200' height='600' fill={`url(#${id})`} />
      <g opacity='.18' fill='#fff'>
        {[...Array(14)].map((_, i) => (
          <circle
            key={i}
            cx={(i * 97 + k * 40) % 1200}
            cy={((i * 53) % 300) + 20}
            r={4 + (i % 3) * 3}
          />
        ))}
      </g>
      <circle
        cx={[980, 300, 1020, 200][k % 4]}
        cy={[140, 130, 110, 150][k % 4]}
        r='64'
        fill={p[3]}
        opacity='.85'
      />
      <path
        d='M0 470 Q300 420 600 470 T1200 460 V600 H0Z'
        fill='#fff'
        opacity='.12'
      />
      <rect
        x='560'
        y='400'
        width='110'
        height='200'
        fill='#fff'
        opacity='.16'
      />
      <rect
        x='1050'
        y='380'
        width='120'
        height='220'
        fill='#fff'
        opacity='.16'
      />
      <rect
        x='680'
        y='300'
        width='360'
        height='300'
        rx='10'
        fill='#fff'
        opacity='.2'
      />
      {w}
      <rect
        x='830'
        y='535'
        width='60'
        height='65'
        rx='6'
        fill='#fff'
        opacity='.8'
      />
      <g transform='translate(860 245)'>
        <rect x='-14' y='-40' width='28' height='80' rx='6' fill='#ef4444' />
        <rect x='-40' y='-14' width='80' height='28' rx='6' fill='#ef4444' />
      </g>
      <path
        d='M0 560 H380 l20-40 30 90 30-120 30 100 20-30 H1200'
        stroke='#fff'
        strokeWidth='4'
        fill='none'
        opacity='.45'
      />
    </svg>
  )
}
const PH = {
  'Dr. Prathap C. Reddy': IMG.p1,
  'Dr. Shreyas Reddy': IMG.p13,
  'Dr. Ankush Singh Kotwal': IMG.p17,
  'Dr. Arun Iyer': IMG.p18,
  'Dr. Arunkumar Karthikayan': IMG.p2,
  'Rajesh Kumar': IMG.p17,
  'Ananya Sharma': IMG.p12,
  'Ankush Rai': IMG.p13,
  'Priya Nair': IMG.p15
}
export function Avatar ({ name = '', className = '' }) {
  if (PH[name])
    return (
      <img
        className={'avatar ' + className}
        src={PH[name]}
        alt={name}
        loading='lazy'
      />
    )
  const h = [...name].reduce((a, c) => a + c.charCodeAt(0), 0),
    skin = ['#f1c9a5', '#e0ac82', '#c68863', '#a86b47'][h % 4],
    hair = ['#2b2118', '#1a1a1a', '#4a3426', '#6b6b6b'][h % 4],
    bg = [
      ['#bae6fd', '#99f6e4'],
      ['#fde68a', '#fbcfe8'],
      ['#c7d2fe', '#a5f3fc'],
      ['#bbf7d0', '#bae6fd']
    ][h % 4],
    f = /Priya|Ananya|Meera|Ms\./.test(name),
    id = 'av' + h
  return (
    <svg
      viewBox='0 0 200 200'
      className={'avatar ' + className}
      role='img'
      aria-label={name}
    >
      <defs>
        <linearGradient id={id} x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor={bg[0]} />
          <stop offset='1' stopColor={bg[1]} />
        </linearGradient>
      </defs>
      <rect width='200' height='200' fill={`url(#${id})`} />
      {f && (
        <path
          d='M58 95 Q54 38 100 36 Q146 38 142 95 L150 160 L50 160Z'
          fill={hair}
        />
      )}
      <path d='M24 200 Q34 138 100 134 Q166 138 176 200Z' fill='#fff' />
      <path d='M84 137 L100 178 L116 137Z' fill='#0e9aa7' />
      <path
        d='M72 140 Q70 175 90 180'
        stroke='#334155'
        strokeWidth='4'
        fill='none'
      />
      <circle cx='90' cy='182' r='6' fill='#94a3b8' />
      <rect x='88' y='108' width='24' height='30' rx='8' fill={skin} />
      <circle cx='100' cy='86' r='36' fill={skin} />
      <path
        d='M62 80 Q62 44 100 44 Q138 44 138 80 Q122 62 100 62 Q78 62 62 80Z'
        fill={hair}
      />
      <circle cx='86' cy='88' r='3.5' fill='#1e293b' />
      <circle cx='114' cy='88' r='3.5' fill='#1e293b' />
      <path
        d='M89 104 Q100 114 111 104'
        stroke='#7c2d12'
        strokeWidth='3'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  )
}
const TH = {
  Cardiology: ['#ef4444', '#fb7185', '❤️'],
  'Preventive Care': ['#0b5ea8', '#38bdf8', '🩺'],
  'Diet & Lifestyle': ['#16a34a', '#a3e635', '🥗'],
  Neurology: ['#7c3aed', '#c084fc', '🧠']
}
const TI = {
  Cardiology: IMG.p3,
  'Preventive Care': IMG.p11,
  'Diet & Lifestyle': IMG.p12,
  Neurology: IMG.p6
}
export function Thumb ({ k }) {
  if (TI[k]) return <img className='tsvg' src={TI[k]} alt='' loading='lazy' />
  const t = TH[k] || TH.Cardiology,
    id = 't' + k.replace(/\W/g, '')
  return (
    <svg
      className='tsvg'
      viewBox='0 0 300 200'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      <defs>
        <linearGradient id={id} x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor={t[0]} />
          <stop offset='1' stopColor={t[1]} />
        </linearGradient>
      </defs>
      <rect width='300' height='200' fill={`url(#${id})`} />
      <circle cx='250' cy='30' r='70' fill='#fff' opacity='.15' />
      <circle cx='30' cy='190' r='60' fill='#fff' opacity='.12' />
      <text x='150' y='120' fontSize='78' textAnchor='middle'>
        {t[2]}
      </text>
    </svg>
  )
}
const IC = {
  spark: (
    <path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z' />
  ),
  pin: (
    <>
      <path d='M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z' />
      <circle cx='12' cy='9' r='2.5' />
    </>
  ),
  clock: (
    <>
      <circle cx='12' cy='12' r='9' />
      <path d='M12 7v5l3 2' />
    </>
  ),
  steth: (
    <>
      <path d='M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2' />
      <circle cx='20' cy='11' r='2' />
    </>
  ),
  award: (
    <>
      <circle cx='12' cy='9' r='6' />
      <path d='M8.5 14 7 22l5-3 5 3-1.5-8' />
    </>
  ),
  chev: <path d='m9 6 6 6-6 6' />,
  up: <path d='M12 19V5M5 12l7-7 7 7' />,
  x: <path d='M6 6l12 12M18 6 6 18' />,
  bot: (
    <>
      <rect x='4' y='8' width='16' height='12' rx='3' />
      <path d='M12 4v4M9 13v2M15 13v2' />
      <circle cx='12' cy='3.5' r='1' />
    </>
  ),
  ig: (
    <>
      <rect x='3' y='3' width='18' height='18' rx='5' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='17.5' cy='6.5' r='.8' />
    </>
  ),
  yt: (
    <>
      <rect x='2' y='5' width='20' height='14' rx='4' />
      <path d='m10 9 5 3-5 3z' fill='currentColor' />
    </>
  ),
  xx: <path d='M4 4l16 16M20 4 4 20' strokeWidth='2.6' />,
  user: (
    <>
      <circle cx='9' cy='8' r='4' />
      <path d='M2 21a7 7 0 0 1 14 0M16 11l2 2 4-4' />
    </>
  ),
  trans: (
    <path d='M4 5h8M8 3v2M6 5c1 4 3 7 6 9M11 5c-1 4-3 7-7 9M13 21l4-9 4 9M14.5 18h5' />
  ),
  login: (
    <path d='M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 17l5-5-5-7M15 12H3' />
  ),
  mail: (
    <>
      <rect x='3' y='5' width='18' height='14' rx='2' />
      <path d='m3 7 9 6 9-6' />
    </>
  ),
  lock: (
    <>
      <rect x='5' y='11' width='14' height='10' rx='2' />
      <path d='M8 11V7a4 4 0 0 1 8 0v4' />
    </>
  ),
  eye: (
    <>
      <path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' />
      <circle cx='12' cy='12' r='3' />
    </>
  ),
  eyeoff: (
    <>
      <path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z' />
      <circle cx='12' cy='12' r='3' />
      <path d='M4 4l16 16' />
    </>
  ),
  shield: (
    <>
      <path d='M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' />
      <path d='m9 12 2 2 4-4' />
    </>
  ),
  help: (
    <>
      <circle cx='12' cy='12' r='9' />
      <path d='M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7' />
      <circle cx='12' cy='17' r='.6' />
    </>
  ),
  arrow: <path d='M5 12h14m-6-6 6 6-6 6' />,
  phone: (
    <path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' />
  ),
  file: (
    <>
      <path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' />
      <path d='M14 3v5h5M9 13h6M9 17h6' />
    </>
  ),
  cal: (
    <>
      <rect x='3' y='5' width='18' height='16' rx='2' />
      <path d='M3 10h18M8 3v4M16 3v4' />
    </>
  ),
  heart: (
    <path d='M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z' />
  )
}
export const Ic = ({ n, s = 18 }) => (
  <svg
    className='ic2'
    width={s}
    height={s}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {IC[n]}
  </svg>
)
export function LoginScene () {
  const w = [],
    c = [],
    l = []
  for (let i = 0; i < 9; i++) {
    const x = 22 + i * 72
    ;[0, 1].forEach(r => {
      const y = 322 + r * 100
      w.push(
        <path
          key={i + 'w' + r}
          d={`M${x} ${y + 88}V${y + 20}a19 19 0 0 1 38 0V${y + 88}Z`}
          fill={(i * 3 + r) % 4 === 0 ? '#f6c46b' : '#24344c'}
          stroke='#cdb98f'
          strokeWidth='3'
        />
      )
    })
    c.push(
      <rect
        key={'c' + i}
        x={x - 12}
        y='300'
        width='8'
        height='230'
        fill='#f1e4c4'
      />
    )
  }
  for (let i = 0; i < 17; i++)
    l.push(
      <circle
        key={i}
        cx={20 + i * 40}
        cy={548 + (i % 2) * 6}
        r='3'
        fill='#ffd76a'
      />
    )
  return (
    <svg
      className='scene'
      viewBox='0 0 660 780'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      <defs>
        <linearGradient id='ls' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#5b9bd5' />
          <stop offset='.3' stopColor='#8fc1e8' />
          <stop offset='.42' stopColor='#f6c58f' />
          <stop offset='.5' stopColor='#f0a56a' />
        </linearGradient>
        <linearGradient id='lg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#4b8a3b' />
          <stop offset='1' stopColor='#1f4d28' />
        </linearGradient>
      </defs>
      <rect width='660' height='780' fill='url(#ls)' />
      <g fill='#fff' opacity='.45'>
        <ellipse cx='120' cy='110' rx='110' ry='22' />
        <ellipse cx='480' cy='170' rx='140' ry='26' />
        <ellipse cx='300' cy='60' rx='90' ry='14' />
      </g>
      <g fill='#ffd9a8' opacity='.6'>
        <ellipse cx='520' cy='250' rx='130' ry='18' />
        <ellipse cx='90' cy='240' rx='100' ry='14' />
      </g>
      <rect y='530' width='660' height='250' fill='url(#lg)' />
      <rect y='290' width='660' height='242' fill='#e9d8b4' />
      <rect y='268' width='660' height='24' fill='#f3e6c8' />
      <rect y='292' width='660' height='8' fill='#d8c394' />
      {c}
      {w}
      <rect
        x='190'
        y='366'
        width='260'
        height='36'
        rx='4'
        fill='#14203a'
        opacity='.6'
      />
      <text
        x='320'
        y='393'
        fill='#fff'
        fontSize='24'
        fontWeight='700'
        textAnchor='middle'
        fontFamily='Lexend,Inter,sans-serif'
      >
        24 x 7 EMERGENCY
      </text>
      <rect x='200' y='408' width='240' height='20' rx='3' fill='#f6edd8' />
      <rect x='210' y='428' width='10' height='100' fill='#f1e4c4' />
      <rect x='420' y='428' width='10' height='100' fill='#f1e4c4' />
      <rect x='230' y='432' width='180' height='96' fill='#2a3a52' />
      <rect x='250' y='438' width='140' height='84' fill='#f7c46a' />
      <rect x='256' y='444' width='36' height='70' fill='#5aa9e6' />
      <rect x='348' y='444' width='36' height='70' fill='#5aa9e6' />
      <ellipse
        cx='330'
        cy='600'
        rx='290'
        ry='36'
        fill='#2c6a30'
        stroke='#c9d6a0'
        strokeWidth='4'
      />
      <path d='M0 700Q330 640 660 700V780H0Z' fill='#8a8f93' opacity='.55' />
      <g fill='#1e2a3c'>
        {[250, 280, 300, 350, 380, 410].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={500 - (i % 2) * 3} r='5' />
            <rect
              x={x - 4}
              y={505 - (i % 2) * 3}
              width='8'
              height='22'
              rx='3'
            />
          </g>
        ))}
      </g>
      {l}
    </svg>
  )
}
