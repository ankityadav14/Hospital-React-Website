import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation
} from 'react-router-dom'
import { IMG } from './img.js'
import { Scene, Avatar, Thumb, Ic, LoginScene } from './Art.jsx'
import {
  PHONE,
  centres,
  specs,
  doctors,
  articles,
  tests,
  quick,
  stats,
  nav
} from './data.js'

const Logo = ({ light }) => (
  <Link to='/' className={'logo' + (light ? ' light' : '')}>
    <span className='mark'>✚</span>
    <span>
      <b>MadMaxx</b>
      <small>HOSPITALS · JABALPUR</small>
    </span>
  </Link>
)
const Btn = ({ to, children, cls = 'primary' }) => (
  <Link to={to} className={'btn ' + cls}>
    {children}
  </Link>
)
const Head = ({ kicker, title, text, center = true }) => (
  <div className={'head' + (center ? ' c' : '')}>
    <span className='kick'>{kicker}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
)
const initials = n =>
  n
    .replace('Dr. ', '')
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')

function Header () {
  const [panel, setPanel] = useState(false),
    [open, setOpen] = useState(false),
    [sub, setSub] = useState(null),
    [lang, setLang] = useState('EN'),
    [sc, setSc] = useState(false)
  const loc = useLocation()
  useEffect(() => {
    setOpen(false)
    setSub(null)
    setPanel(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])
  useEffect(() => {
    const f = () => setSc(scrollY > 20)
    addEventListener('scroll', f)
    return () => removeEventListener('scroll', f)
  }, [])
  const L = () => (
    <div className='langs'>
      {['EN', 'हिं'].map(l => (
        <button
          key={l}
          className={lang === l ? 'on' : ''}
          onClick={() => setLang(l)}
        >
          {l}
        </button>
      ))}
    </div>
  )
  return (
    <>
      <div className='topbar'>
        <div className='wrap row'>
          <span className='pulse'>
            24/7 Care & Emergency Services Available
          </span>
          <div className='tb-r'>
            <Link className='tl' to='/doctors'>
              <Ic n='user' s={18} />
              Find a Doctor
            </Link>
            <i className='dv' />
            <Link className='tl' to='/patientcare/appointment'>
              <Ic n='cal' s={18} />
              Book Appointment
            </Link>
            <i className='dv' />
            <a href={'tel:' + PHONE} className='em'>
              <Ic n='phone' s={18} />
              Emergency: {PHONE}
            </a>
            <i className='dv' />
            <Ic n='trans' s={18} />
            <L />
            <i className='dv' />
            <Link to='/login' className='login'>
              <Ic n='login' s={18} />
              Login
            </Link>
          </div>
        </div>
      </div>
      <header className={'hdr' + (sc ? ' sc' : '')}>
        <div className='wrap row'>
          <Logo />
          <nav className='desk'>
            {nav.map(([n, p, s]) => (
              <div key={n} className='ni'>
                <NavLink
                  to={p}
                  end={p === '/'}
                  className={n === 'Emergency' ? 'emg' : ''}
                >
                  {n}
                  {s && <i>▾</i>}
                </NavLink>
                {s && (
                  <div className='dd'>
                    {s.map(([a, b, c]) => (
                      <Link key={c} to={c}>
                        <b>{a}</b>
                        <small>{b}</small>
                      </Link>
                    ))}
                    <Link to='/patientcare/appointment' className='ddb'>
                      Book a Consultation →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Btn to='/patientcare/appointment' cls='gold dsk'>
            <Ic n='cal' s={18} />
            Book an Appointment
          </Btn>
          <button
            className='pbtn'
            aria-label='Hospital info'
            onClick={() => setPanel(true)}
          >
            ⋮⋮
          </button>
          <button
            className='burger'
            aria-label='Menu'
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
      <div className={'drawer' + (open ? ' open' : '')}>
        <div className='dr-in'>
          <div className='row' style={{ marginBottom: 14 }}>
            <L />
            <Link to='/login' className='login'>
              Hospital Portal Sign In
            </Link>
          </div>
          <Btn to='/patientcare/appointment'>Book Appointment</Btn>{' '}
          <a className='btn em2' href={'tel:' + PHONE}>
            Emergency {PHONE}
          </a>{' '}
          <button
            className='btn outline'
            onClick={() => {
              setOpen(false)
              setPanel(true)
            }}
          >
            Hospital Info
          </button>
          <ul>
            {nav.map(([n, p, s]) => (
              <li key={n}>
                {s ? (
                  <>
                    <button onClick={() => setSub(sub === n ? null : n)}>
                      {n}
                      <i>{sub === n ? '−' : '+'}</i>
                    </button>
                    {sub === n && (
                      <div className='subm'>
                        <Link to={p}>Explore All {n}</Link>
                        {s.map(([a, b, c]) => (
                          <Link key={c} to={c}>
                            <b>{a}</b>
                            <small>{b}</small>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={p}>{n}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Panel open={panel} close={() => setPanel(false)} />
    </>
  )
}

function Hero () {
  const sl = [
    ['Sunrise', 'linear-gradient(120deg,#062b52,#0b5ea8 55%,#18a0b8)'],
    ['Surgery', 'linear-gradient(120deg,#0a2540,#0e7490 60%,#34d399)'],
    ['Care', 'linear-gradient(120deg,#1e1b4b,#0b5ea8 60%,#38bdf8)'],
    ['Lobby', 'linear-gradient(120deg,#052e3f,#0f766e 60%,#f58220)']
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % 4), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <section className='hero'>
      {sl.map((s, k) => (
        <div key={k} className={'slide' + (i === k ? ' on' : '')}>
          <img
            className='scene'
            src={[IMG.p4, IMG.p6, IMG.p3, IMG.p7][k]}
            alt=''
          />
        </div>
      ))}
      <div className='orb o1' />
      <div className='orb o2' />
      <div className='grid-bg' />
      <div className='wrap hero-in'>
        <div className='hero-t'>
          <span className='chip'>
            ✚ MadMaxx Hospital · Precision & Compassion
          </span>
          <h1>
            Advanced Care
            <br />
            for a <em>Healthier</em> Tomorrow
          </h1>
          <p>
            World-class medical expertise, advanced technology and a human touch
            at every stage of your health journey.
          </p>
          <div className='btns'>
            <Btn to='/centres-of-excellence'>Explore Centres of Excellence</Btn>
            <Btn to='/doctors' cls='glass'>
              Meet our Doctors
            </Btn>
            <Btn to='/emergency' cls='red'>
              24×7 Emergency
            </Btn>
          </div>
        </div>
        <div className='hero-c'>
          <div className='hframe'>
            <img src={IMG.p5} alt='Doctor consulting a patient' />
            <div className='hbadge'>✚ MadMaxx Hospital</div>
          </div>
          <div className='fl f1'>❤️ 99.2% cardiac success</div>
          <div className='fl f2'>🧠 Stroke care &lt;30 min</div>
          <div className='fl f3'>🦾 Robotic surgery</div>
        </div>
      </div>
      <div className='dots'>
        {sl.map((_, k) => (
          <button
            key={k}
            aria-label={'slide ' + k}
            className={i === k ? 'on' : ''}
            onClick={() => setI(k)}
          />
        ))}
      </div>
    </section>
  )
}

function Home () {
  const [tab, setTab] = useState(0),
    [t, setT] = useState(0),
    [cat, setCat] = useState('All'),
    [vid, setVid] = useState(false)
  useEffect(() => {
    const x = setInterval(() => setT(v => (v + 1) % tests.length), 6000)
    return () => clearInterval(x)
  }, [])
  const c = centres[tab],
    ts = tests[t],
    cats = ['All', ...new Set(articles.map(a => a[0]))],
    arts = articles.filter(a => cat === 'All' || a[0] === cat)
  return (
    <>
      <Hero />
      <section className='wrap quick'>
        {quick.map(([ic, k, t, d, to]) => (
          <Link key={t} to={to} className='qc'>
            <span className='ic'>{ic}</span>
            <small>{k}</small>
            <b>{t}</b>
            <p>{d}</p>
            <em>Access Now →</em>
          </Link>
        ))}
      </section>
      <section className='statbar'>
        <div className='wrap sgrid'>
          {stats.map(([n, t, d]) => (
            <div key={t}>
              <b>{n}</b>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='sec'>
        <div className='wrap'>
          <Head
            kicker='Comprehensive Care'
            title='Our Specialities'
            text='World-class clinical departments, backed by decades of expertise and state-of-the-art technology.'
          />
          <div className='cards5'>
            {specs.slice(0, 5).map((s, k) => (
              <Link
                to='/ourspecialities'
                key={s[0]}
                className={'sp' + (k === 0 ? ' big' : '')}
              >
                <span className='num'>0{k + 1}</span>
                <small>{s[3]}</small>
                <h3>{s[0]}</h3>
                <h5>{s[1]}</h5>
                <p>{s[2]}</p>
                <em>Explore Procedures →</em>
              </Link>
            ))}
          </div>
          <div className='c'>
            <Btn to='/ourspecialities' cls='outline'>
              View All Specialities
            </Btn>
          </div>
        </div>
      </section>
      <section className='sec alt'>
        <div className='wrap'>
          <Head
            kicker='The MadMaxx Advantage'
            title='Why People Choose MadMaxx Hospital?'
            text='Advanced technology, experienced specialists and patient-centred care — together in Central India.'
          />
          <div className='why'>
            {[
              [
                'Technological Edge',
                'World-Class Infrastructure',
                'SSI and MAKO robotic systems with specialised diagnostic and critical-care facilities.',
                '🏥'
              ],
              [
                'Clinical Excellence',
                'Renowned Specialists',
                '10,000+ internationally trained doctors, surgeons and researchers.',
                '👨‍⚕️'
              ],
              [
                'Compassionate Healing',
                'Patient-Centric Approach',
                'Personalised plans, compassionate nursing, transparent family updates.',
                '🤝'
              ],
              [
                'Accredited Safety',
                'Global Standards',
                'JCI & NABH accredited with strict international safety protocols.',
                '🛡️'
              ]
            ].map(([k, t, d, i], n) => (
              <div className='wc' key={t}>
                <span className='ic'>{i}</span>
                <small>
                  0{n + 1} · {k}
                </small>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className='accr'>
            <b>Globally Recognized Standards</b>
            {[
              'JCI Accredited',
              'NABH Certified',
              'ISO 9001:2015',
              'NABL Labs'
            ].map(a => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>
      <section className='sec'>
        <div className='wrap'>
          <Head
            kicker='World-Class Clinical Specialty Units'
            title='7 Centres of Excellence'
            text='Cutting-edge medical robotics, global experts and uncompromising compassion.'
          />
          <div className='tabs'>
            {centres.map((x, k) => (
              <button
                key={x.id}
                className={tab === k ? 'on' : ''}
                onClick={() => setTab(k)}
              >
                <span>{x.icon}</span>
                {x.name.replace(' Sciences', '')}
                <i>{x.stat}</i>
              </button>
            ))}
          </div>
          <div className='cdet'>
            <div className='cl'>
              <small>Advanced Care</small>
              <h3>{c.name}</h3>
              <h5>{c.sub}</h5>
              <p>{c.desc}</p>
              <div className='pills'>
                <span>24/7 Specialist Support</span>
                <span>Top-Tier Experts</span>
              </div>
              <div className='btns'>
                <Btn to={'/centres-of-excellence/' + c.id}>
                  Consult Specialist
                </Btn>
                <Btn to='/patientcare/appointment' cls='outline'>
                  Priority Appointment
                </Btn>
              </div>
            </div>
            <div className='cr'>
              <h4>Key Services & Treatments</h4>
              <ul>
                {c.services.map(s => (
                  <li key={s}>✓ {s}</li>
                ))}
              </ul>
              <div className='jci'>
                <b>JCI & NABH Accredited</b>
                <p>
                  50+ super-specialty departments supported by 2,000+ ICU beds
                  nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='sec alt'>
        <div className='wrap'>
          <Head
            kicker='Meet Our Experts'
            title='Our Leading Doctors'
            text='Internationally trained specialists and pioneering surgeons trusted by millions.'
          />
          <div className='docs'>
            {doctors.slice(0, 5).map((d, k) => (
              <DocCard key={d[0]} d={d} feat={k === 0} />
            ))}
          </div>
          <div className='c'>
            <Btn to='/doctors' cls='outline'>
              View All Doctors
            </Btn>
          </div>
        </div>
      </section>
      <section className='cta'>
        <div className='wrap ctain'>
          <div>
            <span className='kick l'>Take the First Step</span>
            <h2>Book Your Appointment Today</h2>
            <p>
              Connect with top surgeons and consultants in minutes — no queues,
              no delays.
            </p>
            <div className='btns'>
              <Btn to='/patientcare/appointment' cls='white'>
                Book Now
              </Btn>
              <a className='btn glass' href={'tel:' + PHONE}>
                Call {PHONE}
              </a>
            </div>
            <div className='pills l'>
              <span>Zero Wait Times</span>
              <span>SMS & WhatsApp</span>
              <span>24/7 Booking Desk</span>
            </div>
          </div>
          <div className='ctac'>
            <h3>⚡ Instant Confirmation</h3>
            <ul>
              <li>✓ Instant slot confirmation</li>
              <li>✓ Digital receipt, instantly</li>
              <li>✓ Round-the-clock support</li>
            </ul>
            <div className='mini'>
              <div>
                <b>150,000+</b>Happy Patients
              </div>
              <div>
                <b>24/7</b>Compassionate Care
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='tsec2'>
        <div className='ts2-wrap'>
          <div className='ts2-top'>
            <div>
              <span className='ts2-chip'>✦ Real Stories, Real Healing</span>
              <h2>
                Patient <em>Testimonials</em>
              </h2>
            </div>
            <div className='ts2-nav'>
              <button
                aria-label='Prev'
                onClick={() => setT((t + tests.length - 1) % tests.length)}
              >
                ‹
              </button>
              <span>
                0{t + 1} / 0{tests.length}
              </span>
              <button
                aria-label='Next'
                onClick={() => setT((t + 1) % tests.length)}
              >
                ›
              </button>
            </div>
          </div>
          <div className='ts2-body'>
            <div className='ts2-left'>
              <span className='ts2-bq2'>“</span>
              <div className='ts2-av-row'>
                <div className='ts2-av'>
                  {initials(ts[0])}
                  <span className='ts2-vf'>✓</span>
                </div>
                <div>
                  <h3>{ts[0]}</h3>
                  <p>{ts[1]}, India</p>
                  <span className='ts2-tag'>MadMaxx Hospital</span>
                </div>
              </div>
              <div className='ts2-rows'>
                <div>
                  <label>Procedure</label>
                  <span className='ts2-pill'>{ts[2]}</span>
                </div>
                <div>
                  <label>Recovery Time</label>
                  <span className='ts2-gr'>{ts[3]}</span>
                </div>
                <div className='ts2-hr' />
                <div>
                  <label>Overall Care</label>
                  <span className='ts2-stars'>★★★★★</span>
                </div>
              </div>
            </div>
            <div className='ts2-right'>
              <span className='ts2-bq'>“</span>
              <blockquote key={t}>"{ts[4]}"</blockquote>
              <button className='ts2-vid' onClick={() => setVid(true)}>
                <span className='ts2-play'>▶</span>Watch Video Testimonial
              </button>
            </div>
          </div>
        </div>
        {vid && (
          <div className='tmodal' onClick={() => setVid(false)}>
            <div className='tm-in' onClick={e => e.stopPropagation()}>
              <button
                className='tm-x'
                aria-label='Close'
                onClick={() => setVid(false)}
              >
                ✕
              </button>
              <Avatar name={ts[0]} className='tm-img' />
              <span className='tm-play'>▶</span>
              <p>Video testimonial from {ts[0]} is coming soon.</p>
            </div>
          </div>
        )}
      </section>
      <section className='sec alt'>
        <div className='wrap'>
          <Head
            kicker='Doctor-Verified Medical Insights'
            title='Health Articles & Awareness'
            text='Medical research, preventive guidelines and wellness tips from our consultants.'
          />
          <div className='tabs sm'>
            {cats.map(x => (
              <button
                key={x}
                className={cat === x ? 'on' : ''}
                onClick={() => setCat(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <Arts list={arts} />
        </div>
      </section>
      <section className='banner'>
        <img className='scene bg' src={IMG.p7} alt='' />
        <div className='wrap rel'>
          <h2>Touching Lives, Healing Hearts, Creating Hope</h2>
          <div className='bst'>
            <span>
              <b>40+</b>Years of Leadership
            </span>
            <span>
              <b>13,000+</b>Specialist Doctors
            </span>
            <span>
              <b>NABH & JCI</b>Accredited
            </span>
          </div>
          <div className='btns c'>
            <Btn to='/emergency' cls='red'>
              Emergency {PHONE}
            </Btn>
            <Btn to='/patientcare/appointment' cls='white'>
              Book Appointment
            </Btn>
          </div>
        </div>
      </section>
    </>
  )
}
const DocCard = ({ d, feat }) =>
  feat ? (
    <div className='doc feat'>
      <div className='photo'>
        <Avatar name={d[0]} />
        <small>{d[5]}</small>
      </div>
      <div className='fb'>
        <h6>{d[7]}</h6>
        <h3>{d[0]}</h3>
        <p>{d[2]}</p>
        <q>
          Healthcare is not a privilege for the few, it is a right for every
          life we touch.
        </q>
        <div className='rt'>
          ★ {d[4]} <span>{d[3]}</span>
        </div>
        <Link to='/patientcare/appointment' className='btn white sm'>
          Book Consultation
        </Link>
      </div>
    </div>
  ) : (
    <div className='doc'>
      <div className='photo'>
        <Avatar name={d[0]} />
        <small>{d[5]}</small>
      </div>
      <h3>{d[0]}</h3>
      <h6>{d[1]}</h6>
      <p>{d[2]}</p>
      <div className='rt'>
        ★ {d[4]} {d[6] && <span>· {d[6]}</span>}
      </div>
      <Link to='/patientcare/appointment' className='btn primary sm'>
        Book Consultation
      </Link>
    </div>
  )
const Arts = ({ list }) => (
  <div className='arts'>
    {list.map((a, k) => (
      <article key={a[1]} className={'art' + (k === 0 ? ' f' : '')}>
        <div className='thumb'>
          <Thumb k={a[0]} />
          <span>{a[0]}</span>
        </div>
        <div className='ab'>
          <small>
            {a[0]} · {a[5]} read
          </small>
          <h3>{a[1]}</h3>
          <h6>{a[2]}</h6>
          <p>{a[3]}</p>
          <div className='by'>By {a[4]}</div>
          <button className='lnk'>Read Article →</button>
        </div>
      </article>
    ))}
  </div>
)

function Page ({ title, crumb, children, text }) {
  return (
    <>
      <section className='phero'>
        <img className='ph-bg' src={IMG.p11} alt='' />
        <div className='wrap'>
          <div className='crumb'>
            <Link to='/'>Home</Link> / {crumb || title}
          </div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
      </section>
      <section className='sec'>
        <div className='wrap'>{children}</div>
      </section>
    </>
  )
}
const Grid = ({ items, to }) => (
  <div className='g3'>
    {items.map(([t, d, i, l]) => (
      <Link to={l || to || '#'} key={t} className='wc'>
        <span className='ic'>{i}</span>
        <h3>{t}</h3>
        <p>{d}</p>
      </Link>
    ))}
  </div>
)
function About () {
  return (
    <Page
      title='About Us'
      text="Part of one of Asia's foremost integrated healthcare groups, pioneering since 1983."
    >
      <div className='two'>
        <div>
          <Head
            center={false}
            kicker='Our Story'
            title='Touching Lives, Healing Hearts'
          />
          <p className='lead'>
            MadMaxx Hospital brings world-class tertiary care to Central India:
            advanced cardiac, oncology, robotic joint replacement and
            neuro-trauma services under one roof in Jabalpur.
          </p>
          <p className='lead'>
            Our mission is to bring healthcare of international standards within
            the reach of every individual.
          </p>
          <img
            className='pic'
            src={IMG.p5}
            alt='Doctor reviewing records with a patient'
          />
        </div>
        <div className='statbar in'>
          <div className='sgrid'>
            {stats.map(([n, t]) => (
              <div key={t}>
                <b>{n}</b>
                <h4>{t}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Grid
        items={[
          [
            'Vision',
            'To be the leading healthcare provider in Central India.',
            '🔭'
          ],
          [
            'Mission',
            'Healthcare of international standards within reach of all.',
            '🎯'
          ],
          [
            'Values',
            'Clinical excellence, compassion, integrity, teamwork.',
            '💙'
          ]
        ]}
      />
    </Page>
  )
}
function Centres () {
  return (
    <Page
      title='Centres of Excellence'
      text='Seven world-class clinical units combining robotics, global experts and compassion.'
    >
      <Grid
        items={centres.map(c => [
          c.name,
          c.sub + ' — ' + c.desc,
          c.icon,
          '/centres-of-excellence/' + c.id
        ])}
      />
    </Page>
  )
}
function Centre () {
  const { id } = useParams(),
    c = centres.find(x => x.id === id) || centres[0]
  return (
    <Page title={c.name} crumb={'Centres / ' + c.name} text={c.sub}>
      <div className='cdet'>
        <div className='cl'>
          <h3>
            {c.icon} {c.name}
          </h3>
          <p>{c.desc}</p>
          <div className='pills'>
            <span>{c.stat} Excellence</span>
            <span>JCI & NABH</span>
          </div>
          <Btn to='/patientcare/appointment'>Consult Specialist</Btn>
        </div>
        <div className='cr'>
          <h4>Key Services & Treatments</h4>
          <ul>
            {c.services.map(s => (
              <li key={s}>✓ {s}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className='sub'>Related Specialists</h3>
      <div className='docs'>
        {doctors.slice(0, 3).map(d => (
          <DocCard key={d[0]} d={d} />
        ))}
      </div>
    </Page>
  )
}
function Specs () {
  return (
    <Page title='Our Specialities' text='30+ clinical specialty departments.'>
      <div className='g3'>
        {specs.map(s => (
          <Link key={s[0]} to='/patientcare/appointment' className='wc'>
            <small>{s[3]}</small>
            <h3>{s[0]}</h3>
            <h6>{s[1]}</h6>
            <p>{s[2]}</p>
          </Link>
        ))}
      </div>
    </Page>
  )
}
function Doctors () {
  const [q, setQ] = useState(''),
    l = doctors.filter(d =>
      (d[0] + d[1] + d[2]).toLowerCase().includes(q.toLowerCase())
    )
  return (
    <Page
      title='Our Leading Doctors'
      crumb='Doctors'
      text='Internationally trained specialists, pioneering surgeons, and healthcare leaders trusted by millions.'
    >
      <div className='filt'>
        <input
          placeholder='Search doctors by name or specialty…'
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>
      <div className='docs'>
        {l.map(d => (
          <DocCard key={d[0]} d={d} feat={d === doctors[0]} />
        ))}
      </div>
      {!l.length && <p className='c'>No doctors found.</p>}
    </Page>
  )
}
function Care () {
  return (
    <Page
      title='Patient Care'
      text='Everything you need, before, during and after your visit.'
    >
      <Grid
        items={[
          [
            'Our Specialities',
            '30+ Clinical Specialty Departments',
            '🩺',
            '/ourspecialities'
          ],
          [
            'Make Appointment',
            "Book a Doctor's Appointment Instantly",
            '📅',
            '/patientcare/appointment'
          ],
          [
            'Ambulance Service',
            '24/7 Mobile ICU & Trauma Express',
            '🚑',
            '/patientcare/ambulance'
          ],
          [
            'Case Studies',
            'Clinical Breakthroughs & Saved Lives',
            '📋',
            '/patientcare/case-studies'
          ],
          [
            'Events',
            'Free Health Camps & CME Seminars',
            '🎪',
            '/patientcare/events'
          ]
        ]}
      />
    </Page>
  )
}
function Form ({ fields, btn, done }) {
  const [ok, setOk] = useState(false)
  return ok ? (
    <div className='ok'>✅ {done}</div>
  ) : (
    <form
      className='form'
      onSubmit={e => {
        e.preventDefault()
        setOk(true)
      }}
    >
      {fields.map(([n, t, o]) =>
        t === 'select' ? (
          <select key={n} required>
            <option value=''>{n}</option>
            {o.map(x => (
              <option key={x}>{x}</option>
            ))}
          </select>
        ) : t === 'area' ? (
          <textarea key={n} placeholder={n} rows='4' required />
        ) : (
          <input key={n} type={t} placeholder={n} required />
        )
      )}
      <button className='btn primary'>{btn}</button>
    </form>
  )
}
const Appt = () => (
  <Page
    title='Book an Appointment'
    crumb='Patient Care / Appointment'
    text='Instant confirmation by SMS & WhatsApp.'
  >
    <div className='two'>
      <Form
        btn='Confirm Appointment'
        done='Request received! You will get SMS & WhatsApp confirmation shortly.'
        fields={[
          ['Full Name', 'text'],
          ['Phone', 'tel'],
          ['Email', 'email'],
          ['Select Specialty', 'select', specs.map(s => s[0])],
          ['Preferred Date', 'date']
        ]}
      />
      <div className='ctac dark'>
        <img className='pic' src={IMG.p15} alt='Smiling doctor at her desk' />
        <h3>Why book online?</h3>
        <ul>
          <li>✓ Zero wait times</li>
          <li>✓ Instant digital receipt</li>
          <li>✓ 24/7 booking desk</li>
        </ul>
        <a className='btn white' href={'tel:' + PHONE}>
          Call {PHONE}
        </a>
      </div>
    </div>
  </Page>
)
const Amb = () => (
  <Page
    title='Ambulance Service'
    text='Fully equipped mobile ICU with trained paramedics at your doorstep.'
  >
    <Grid
      items={[
        [
          'Mobile ICU',
          'Ventilator, defibrillator and monitors on board.',
          '🚑'
        ],
        ['Trauma Express', 'Rapid response with pre-alerted ER.', '⚡'],
        ['24/7 Dispatch', 'Call ' + PHONE + ' anytime.', '📞']
      ]}
    />
    <div className='c'>
      <a className='btn red' href={'tel:' + PHONE}>
        Call Ambulance {PHONE}
      </a>
    </div>
  </Page>
)
const Cases = () => (
  <Page title='Case Studies' text='Clinical breakthroughs and saved lives.'>
    <Grid
      items={[
        [
          'Robotic Bypass at 72',
          'Minimal-incision surgery, home in 5 days.',
          '❤️'
        ],
        [
          'CyberKnife for Brain Tumour',
          'Non-invasive treatment with precision.',
          '🎗️'
        ],
        [
          'Stroke Rescue in 28 minutes',
          'Door-to-needle under 30 minutes.',
          '🧠'
        ],
        ['Robotic Knee Replacement', 'Walking on day one.', '🦴']
      ]}
    />
  </Page>
)
const Events = () => (
  <Page title='Events' text='Free health camps and CME seminars.'>
    <Grid
      items={[
        ['Free Heart Camp', 'Every first Sunday · ECG & BP screening', '❤️'],
        [
          'Diabetes Awareness Week',
          'Free sugar tests and diet counselling',
          '🩸'
        ],
        ['CME: Advances in Robotics', 'For doctors · registration open', '🎓']
      ]}
    />
  </Page>
)
const Lib = () => {
  const [c, setC] = useState('All'),
    cs = ['All', ...new Set(articles.map(a => a[0]))]
  return (
    <Page
      title='Health Library'
      text='Doctor-verified articles and awareness guides.'
    >
      <div className='tabs sm'>
        {cs.map(x => (
          <button
            key={x}
            className={c === x ? 'on' : ''}
            onClick={() => setC(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <Arts list={articles.filter(a => c === 'All' || a[0] === c)} />
    </Page>
  )
}
const Contact = () => (
  <Page
    title='Contact MadMaxx Hospital'
    crumb='Contact'
    text='We are always here to help.'
  >
    <div className='two'>
      <div className='g1'>
        {[
          [
            '📍',
            'Hospital Address',
            'Vijay Nagar, Karmeta, Jabalpur, MP 482002'
          ],
          ['📞', 'Phone Consultation', '+91 8031320388'],
          ['🕘', 'OPD Timing', 'Mon - Sat: 09:00 AM - 08:00 PM'],
          ['🚨', 'Emergency Hotline', PHONE]
        ].map(([i, t, d]) => (
          <div className='wc row2' key={t}>
            <span className='ic'>{i}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </div>
      <Form
        btn='Send Message'
        done='Thank you! We will contact you shortly.'
        fields={[
          ['Name', 'text'],
          ['Phone', 'tel'],
          ['Email', 'email'],['Select Specialty', 'select', specs.map(s => s[0])],
          ['Message', 'area']
        ]}
      />
    </div>
    <iframe
      title='map'
      className='map'
      loading='lazy'
      src='https://maps.google.com/maps?q=Vijay%20Nagar%20Karmeta%20Jabalpur&output=embed'
    />
  </Page>
)
const Careers = () => (
  <Page title='Careers' text='Join MadMaxx Hospital Jabalpur Team'>
    <div className='two'>
      <div>
        <Head
          center={false}
          kicker='Join Our Team'
          title='Touching Lives, Healing Hearts, Creating Hope'
        />
        <p className='lead'>
          Work alongside 2,000+ specialist doctors in a JCI & NABH accredited
          healthcare group, pioneering care since 1983.
        </p>
        <img className='pic' src={IMG.p7} alt='Our healthcare team' />
      </div>
      <div className='g1'>
        <div className='wc row2'>
          <span className='ic'>✉️</span>
          <div>
            <h3>Send your CV</h3>
            <p>
              <a href='#'>
                Connect@madmaxxhospital.com
              </a>
            </p>
          </div>
        </div>
        <div className='wc row2'>
          <span className='ic'>📞</span>
          <div>
            <h3>Phone</h3>
            <p>+91 8031320388</p>
          </div>
        </div>
        <div className='wc row2'>
          <span className='ic'>📍</span>
          <div>
            <h3>Address</h3>
            <p>Vijay Nagar, Jabalpur, MP 482002</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
)
const Emerg = () => (
  <Page
    title='Emergency'
    text='24/7 Critical Care, Trauma and Ambulance Services'
  >
    <div className='emb'>
      <span className='kick l'>24/7 Rapid Emergency Care</span>
      <h2>Need Immediate Help?</h2>
      <p>
        We are always here to help in an emergency. Contact us immediately if
        you are experiencing any serious health problems.
      </p>
      <a className='btn white big' href={'tel:' + PHONE}>
        Emergency Hotline: {PHONE}
      </a>
    </div>
    <div className='g3'>
      <Link to='/centres-of-excellence/critical-care' className='wc'>
        <span className='ic'>🚨</span>
        <h3>Critical Care</h3>
        <p>Level-1 CCU & Trauma ER</p>
      </Link>
      <Link to='/patientcare/ambulance' className='wc'>
        <span className='ic'>🚑</span>
        <h3>Ambulance Service</h3>
        <p>
          Fully equipped ambulance with trained paramedics, at your doorstep
        </p>
      </Link>
      <div className='wc'>
        <span className='ic'>📍</span>
        <h3>Hospital Address</h3>
        <p>
        Vijay Nagar, Jabalpur, Madhya Pradesh 482002
        </p>
      </div>
    </div>
  </Page>
)
function Login () {
  const [show, setShow] = useState(false),
    [ok, setOk] = useState(false)
  return (
    <div className='lg'>
      <div className='lg-bg'>
        
        <img src="/src/img/p4.jpg" alt="Login Scene" />
      </div>
      <div className='lg-ov' />
      <div className='lg-main'>
        <div className='lg-card'>
          <div className='lg-l'>
              
            <img src="/src/img/p4.jpg" alt="Login Scene" 
                  width={1000} height={400} 
            />
            <Link to='/' className='lg-logo'>
              <span className='mark'>✚</span>
              <b>MadMaxx</b>
              <small>HOSPITAL</small>
              <em>JABALPUR</em>
            </Link>
            <div className='lg-cap'>
              <h3>Excellence in Care, Connected to You.</h3>
              <p>
                Access world-class specialists and personalized health records
                anywhere, anytime.
              </p>
              <div className='chips'>
                <span>
                  <Ic n='file' s={15} />
                  Lab Reports
                </span>
                <span>
                  <Ic n='cal' s={15} />
                  OPD Booking
                </span>
                <span>
                  <Ic n='heart' s={15} />
                  Clinical History
                </span>
              </div>
              <i className='bar' />
            </div>
          </div>
          <div className='lg-r'>
            <div className='kk'>
              <Ic n='shield' />
              SECURE AUTHENTICATION
              <i />
            </div>
            <h1>
              Login to <span>MadMaxx</span>
            </h1>
            <p className='lg-p'>
              Patients, doctors and staff can sign in here to access reports,
              appointments, clinical history and hospital services from one
              secure place.
            </p>
            <form
              onSubmit={e => {
                e.preventDefault()
                setOk(true)
              }}
            >
              <label className='fi'>
                <Ic n='mail' s={20} />
                <input
                  type='text'
                  placeholder='Enter Email, UHID or Employee ID'
                  required
                />
              </label>
              <label className='fi'>
                <Ic n='lock' s={20} />
                <input
                  type={show ? 'text' : 'password'}
                  placeholder='Enter Password'
                  required
                />
                <button
                  type='button'
                  aria-label='Show password'
                  onClick={() => setShow(!show)}
                >
                  <Ic n={show ? 'eyeoff' : 'eye'} s={20} />
                </button>
              </label>
              <div className='rm'>
                <label>
                  <input type='checkbox' />
                  Remember Me
                </label>
                <a href='#!' onClick={e => e.preventDefault()}>
                  <Ic n='help' s={16} />
                  Forgot Password?
                </a>
              </div>
              <button className='lg-btn'>
                Login <Ic n='arrow' s={18} />
              </button>
              
              {ok && (
                <p className='lg-ok'>Contact Admin for Access</p>
              )}
            </form>
            <div className='lg-f'>
              <span>
                <Ic n='shield' s={17} />
                256-Bit TLS Encryption
              </span>
              <Link to='/privacy-policy'>Privacy</Link>
              <Link to='/terms-of-service'>Terms</Link>
              <Link to='/contact'>Help Desk</Link>
            </div>
          </div>
        </div>
      </div>
      <footer className='lg-ft'>
        <span>© 2026 MadMaxx Hospital Jabalpur. All rights reserved.</span>
        <span>
          <Ic n='phone' s={18} />
          Emergency Hotline 24×7: <b>+91 8031320388</b>
        </span>
      </footer>
    </div>
  )
}
const Legal = ({ t }) => (
  <Page title={t}>
    <p className='lead'>
      This is placeholder legal content for {t}. Replace with your
      organisation's official text.
    </p>
  </Page>
)

function Footer () {
  const [s, setS] = useState(false)
  const n1 = [
      ['Home Page', '/'],
      ['About Us', '/about-us'],
      ['Our Specialities', '/ourspecialities'],
      ['Find a Doctor', '/doctors'],
      ['Patient Care', '/patientcare']
    ],
    n2 = [
      ['Health Library', '/health-library'],
      ['Contact & Location Map', '/contact'],
      ['24/7 Emergency Care', '/emergency'],
      ['Book Appointment', '/patientcare/appointment'],
      ['MP Service Reach', '/contact']
    ]
  const col = (t, l) => (
    <div className='ff-c'>
      <h4>{t}</h4>
      <i className='ul' />
      <ul>
        {l.map(([a, b]) => (
          <li key={a}>
            <Link to={b}>
              <Ic n='chev' s={13} />
              {a}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <footer className='ff'>
      <Scene k={0} bg />
      <span className='ff-wm'>Madmaxx HOSPITALS</span>
      <div className='ff-in'>
        <div className='ff-cta'>
          <span className='ff-hi'>
            <Ic n='heart' s={26} />
          </span>
          <h3>
            Touching Lives, Healing
            <br />
            Hearts, Creating Hope
          </h3>
          <div className='ff-st'>
            <div>
              <Ic n='clock' s={26} />
              <span>
                <b>40+</b>Years of Medical Leadership
              </span>
            </div>
            <div>
              <Ic n='steth' s={26} />
              <span>
                <b>13,000+</b>Specialist Doctors
              </span>
            </div>
            <div>
              <Ic n='award' s={26} />
              <span>
                <b>NABH & JCI</b>Accredited
              </span>
            </div>
          </div>
          <a className='ff-em' href={'tel:' + PHONE}>
            <i />
            Emergency {PHONE}
          </a>
          <Link className='ff-bk' to='/patientcare/appointment'>
            <Ic n='cal' s={18} />
            Book Appointment
          </Link>
        </div>
        <div className='ff-g'>
          <div className='ff-c'>
            <div className='ff-br'>
              <span className='tile'>
                <span className='mark'>✚</span>
              </span>
              <div>
                <h4>MadMaxx Hospital</h4>
                <small>JABALPUR</small>
              </div>
            </div>
            <p>
              A multi-specialty tertiary care centre offering advanced cardiac,
              oncology, robotic joint replacement and neuro-trauma care.
            </p>
            <p className='ct'>
              <Ic n='pin' s={19} />
              <span>
                Vijay Nagar, Jabalpur, MP 482002
              </span>
            </p>
            <p className='ct'>
              <Ic n='phone' s={19} />
              <a href='tel:+918031320388'>+91 8031320388</a>
            </p>
            <p className='ct'>
              <Ic n='mail' s={19} />
              <a href='mailto:Connect@madmaxxhospital.com'>
                Connect@madmaxxhospital.com
              </a>
            </p>
            <div className='ff-so'>
              <a
                href='#'
                aria-label='Facebook'
                style={{ background: '#1877f2' }}
              >
                <b>f</b>
              </a>
              <a
                href='#'
                aria-label='X'
                style={{ background: '#0b0b0b' }}
              >
                <Ic n='xx' s={18} />
              </a>
              <a
                href='#'
                aria-label='Instagram'
                style={{
                  background: 'linear-gradient(135deg,#f9a03f,#e1306c,#8a3ab9)'
                }}
              >
                <Ic n='ig' s={22} />
              </a>
              <a
                href='#'
                aria-label='LinkedIn'
                style={{ background: '#0a66c2' }}
              >
                <b>in</b>
              </a>
              <a
                href='#'
                aria-label='YouTube'
                style={{ background: '#ff0000' }}
              >
                <Ic n='yt' s={22} />
              </a>
            </div>
          </div>
          {col('Quick Navigation', n1)}
          {col('Key Services', n2)}
          <div className='ff-c'>
            <h4>Health Newsletter</h4>
            <i className='ul' />
            <p>
              Doctor-approved health updates and screening tips, in your inbox.
            </p>
            {s ? (
              <p className='ff-ok'>✅ Subscribed!</p>
            ) : (
              <form
                className='ff-nl'
                onSubmit={e => {
                  e.preventDefault()
                  setS(true)
                }}
              >
                <input type='email' required placeholder='Your email address' />
                <button>Subscribe</button>
              </form>
            )}
            <div className='ff-ac'>
              <Ic n='shield' s={40} />
              <div>
                <b>NABH & NABL Accredited</b>
                <small>Highest Standard Patient Care</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ff-bt'>
        <div className='ff-in ff-bi'>
          <span>© 2026 MadMaxx Hospital Jabalpur. All rights reserved.</span>
          <div className='ff-lk'>
            <Link to='/privacy-policy'>Privacy Policy</Link>
            <i />
            <Link to='/terms-of-service'>Terms of Use</Link>
            <button
              className='ff-up'
              aria-label='Back to top'
              onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Ic n='up' s={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
function Panel ({ open, close }) {
  return (
    <aside className={'panel' + (open ? ' open' : '')}>
      <div className='pn-bg' onClick={close} />
      <div className='pn'>
        <button className='pn-x' onClick={close} aria-label='Close'>
          ✕
        </button>
        <Logo />
        <small className='kick'>World-Class Healthcare</small>
        <h3>MadMaxx Hospital</h3>
        <div className='pn-em'>
          <h4>Need Immediate Help?</h4>
          <p>
            We are always here to help in an emergency. Contact us immediately
            if you are experiencing any serious health problems.
          </p>
          <a className='btn red' href={'tel:' + PHONE}>
            Emergency Hotline: <b>{PHONE}</b>
          </a>
        </div>
        <h4>Contact MadMaxx Hospital, Jabalpur</h4>
        <div className='pn-i'>
          <b>Hospital Address</b>
          <p>
            Global Square, Patan Road, Karmeta, Jabalpur, Madhya Pradesh 482002
          </p>
        </div>
        <div className='pn-i'>
          <b>Phone Consultation</b>
          <p>
            <a href='tel:8031320388'>+91 8031320388</a>
          </p>
        </div>
        <div className='pn-i'>
          <b>OPD Timing</b>
          <p>Mon - Sat: 09:00 AM - 08:00 PM</p>
        </div>
        <Btn to='/patientcare/appointment'>Request an Appointment</Btn>{' '}
        <a
          className='btn outline'
          href='https://wa.me/918031320388'
          target='_blank'
          rel='noreferrer'
        >
          How can I help you?
        </a>
      </div>
    </aside>
  )
}
function Float () {
  const [o, setO] = useState(false),
    [hint, setHint] = useState(true),
    [m, setM] = useState([
      ['b', "Hi, I'm MadMaxx Assist. How can I help you today?"]
    ]),
    [v, setV] = useState('')
  const rep = t => {
    t = t.toLowerCase()
    return /emerg|ambul|urgent/.test(t)
      ? 'For emergencies call ' + PHONE + ' now (24/7).'
      : /appoint|book/.test(t)
      ? 'You can book instantly on the Make Appointment page.'
      : /time|opd|open/.test(t)
      ? 'OPD timing: Mon - Sat, 09:00 AM - 08:00 PM.'
      : /where|address|locat/.test(t)
      ? 'Global Square, Patan Road, Karmeta, Jabalpur, MP 482002.'
      : 'Please call +91 8031320388 or use Book Appointment.'
  }
  const send = t => {
    if (!t.trim()) return
    setM(x => [...x, ['u', t], ['b', rep(t)]])
    setV('')
  }
  return (
    <div className='assist-w'>
      {o && (
        <div className='chat'>
          <div className='ch-h'>
            <span className='pp'>PP</span>
            <b>MadMaxx Assist</b>
            <button onClick={() => setO(false)} aria-label='Close chat'>
              ✕
            </button>
          </div>
          <div className='ch-b'>
            {m.map((x, k) => (
              <p key={k} className={x[0]}>
                {x[1]}
              </p>
            ))}
          </div>
          <div className='ch-q'>
            {['Book appointment', 'OPD timing', 'Emergency'].map(q => (
              <button key={q} onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={e => {
              e.preventDefault()
              send(v)
            }}
          >
            <input
              value={v}
              onChange={e => setV(e.target.value)}
              placeholder='Type your message…'
            />
            <button>➤</button>
          </form>
        </div>
      )}
      {hint && !o && (
        <div className='hint'>
          <i />
          <span>Chat with MadMaxx Assist</span>
          <button aria-label='Dismiss' onClick={() => setHint(false)}>
            <Ic n='x' s={14} />
          </button>
        </div>
      )}
      <button
        className='botb'
        aria-label='Open MadMaxx Assist chat'
        onClick={() => {
          setO(!o)
          setHint(false)
        }}
      >
        <Ic n='bot' s={30} />
        <span className='bd' />
      </button>
    </div>
  )
}
export default function App () {
  const { pathname } = useLocation()
  if (pathname === '/login') return <Login />
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/centres-of-excellence' element={<Centres />} />
          <Route path='/centres-of-excellence/:id' element={<Centre />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/patientcare' element={<Care />} />
          <Route path='/ourspecialities' element={<Specs />} />
          <Route path='/patientcare/appointment' element={<Appt />} />
          <Route path='/patientcare/ambulance' element={<Amb />} />
          <Route path='/patientcare/case-studies' element={<Cases />} />
          <Route path='/patientcare/events' element={<Events />} />
          <Route path='/health-library' element={<Lib />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/emergency' element={<Emerg />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/privacy-policy'
            element={<Legal t='Privacy Policy' />}
          />
          <Route
            path='/terms-of-service'
            element={<Legal t='Terms of Use' />}
          />
          <Route
            path='*'
            element={
              <Page title='Page not found'>
                <Btn to='/'>Back to Home</Btn>
              </Page>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Float />
    </>
  )
}
