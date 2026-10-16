// Banco de Dados Científico e Ilustrações SVG das 5 Épocas Oceânicas e 5 Zonas Batimétricas
// Mais de 20 espécies detalhadas por época (105 espécies no total!)

const OCEAN_ZONES_META = [
  {
    id: 'epipelagic',
    name: 'Zona Epipelágica (Zona Eufótica)',
    shortName: 'Epipelágica',
    depthRange: '0m – 200m',
    minDepth: 0,
    maxDepth: 200,
    light: '100% a 1% de Luz Solar',
    baseDesc: 'Águas superficiais banhadas pelo sol, onde ocorre a fotossíntese, proliferam recifes, cardumes velozes e os grandes predadores costeiros e pelágicos.'
  },
  {
    id: 'mesopelagic',
    name: 'Zona Mesopelágica (Zona Crepuscular)',
    shortName: 'Mesopelágica',
    depthRange: '200m – 1.000m',
    minDepth: 200,
    maxDepth: 1000,
    light: 'Penumbra Crepuscular (<1%)',
    baseDesc: 'Onde a luz solar desaparece gradualmente. Lar da maior migração vertical diária da Terra e do surgimento das primeiras adaptações de bioluminescência e olhos tubulares.'
  },
  {
    id: 'bathypelagic',
    name: 'Zona Batipelágica (Zona da Meia-Noite)',
    shortName: 'Batipelágica',
    depthRange: '1.000m – 4.000m',
    minDepth: 1000,
    maxDepth: 4000,
    light: 'Escuridão Absoluta (0% Sol)',
    baseDesc: 'Apenas a luz produzida pelos próprios seres vivos corta a escuridão. A pressão atinge até 400 atmosferas e a temperatura cai para 4 °C.'
  },
  {
    id: 'abyssopelagic',
    name: 'Zona Abissopelágica (Planície Abissal)',
    shortName: 'Abissopelágica',
    depthRange: '4.000m – 6.000m',
    minDepth: 4000,
    maxDepth: 6000,
    light: 'Trevas Abissais + Neve Marinha',
    baseDesc: 'Planícies vastas cobertas por sedimento orgânico ("neve marinha"). A vida depende de detritos que caem da superfície ou de carcaças de grandes animais.'
  },
  {
    id: 'hadopelagic',
    name: 'Zona Hadopelágica (Fossas Oceânicas)',
    shortName: 'Hadopelágica',
    depthRange: '6.000m – 11.000m',
    minDepth: 6000,
    maxDepth: 11000,
    light: 'Quimiossíntese & Pressão Extrema',
    baseDesc: 'Fossas tectônicas profundas e chaminés hidrotermais vulcânicas. Sob mais de 1.000 atmosferas, proteínas especiais impedem que as células colapsem.'
  }
];

function renderCreatureSVG(shape, primaryColor, secondaryColor, glowColor = '#2dd4bf') {
  const uid = (primaryColor + secondaryColor + shape).replace(/[^a-zA-Z0-9]/g, '');
  const shapes = {
    shark: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g-${uid}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${primaryColor}"/>
            <stop offset="70%" stop-color="${secondaryColor}"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
        </defs>
        <path d="M25,68 C65,42 125,38 185,54 L232,26 L218,65 L235,98 L185,76 C135,90 75,88 25,68 Z" fill="url(#g-${uid})"/>
        <path d="M105,45 L130,12 L145,46 Z" fill="${primaryColor}"/>
        <path d="M95,76 L118,110 L132,78 Z" fill="${secondaryColor}"/>
        <circle cx="52" cy="60" r="3.5" fill="#020617"/>
        <circle cx="51" cy="59" r="1" fill="#fff"/>
        <path d="M74,60 L72,72 M81,60 L79,72 M88,61 L86,72" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
        <path d="M32,71 Q48,76 62,70" stroke="#0f172a" stroke-width="2" fill="none"/>
      </svg>`,
    whale: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,68 C30,36 95,30 165,48 C195,55 215,58 242,40 L232,64 L245,86 C215,72 195,74 165,80 C105,94 35,92 20,68 Z" fill="${primaryColor}"/>
        <path d="M24,70 C55,88 105,88 140,76 C100,76 55,74 24,70 Z" fill="${secondaryColor}"/>
        <path d="M95,72 L78,108 L108,96 L114,74 Z" fill="${secondaryColor}"/>
        <circle cx="54" cy="58" r="3" fill="${glowColor}"/>
        <path d="M35,74 L110,78 M42,79 L105,82" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      </svg>`,
    turtle: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="135" cy="65" rx="55" ry="34" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="3"/>
        <path d="M98,45 L125,40 L145,48 L142,78 L118,84 L95,72 Z" fill="none" stroke="${glowColor}" stroke-width="1.8" opacity="0.7"/>
        <ellipse cx="64" cy="64" rx="16" ry="11" fill="${secondaryColor}"/>
        <circle cx="57" cy="60" r="2.8" fill="#020617"/>
        <path d="M95,38 C72,12 52,14 45,25 C65,34 80,42 88,48 Z" fill="${secondaryColor}"/>
        <path d="M95,92 C72,118 52,116 45,105 C65,96 80,88 88,82 Z" fill="${secondaryColor}"/>
        <path d="M175,45 L205,30 L195,52 Z M175,85 L205,100 L195,78 Z" fill="${secondaryColor}"/>
      </svg>`,
    tuna: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gtuna-${uid}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${primaryColor}"/>
            <stop offset="55%" stop-color="${secondaryColor}"/>
            <stop offset="100%" stop-color="#f8fafc"/>
          </linearGradient>
        </defs>
        <path d="M30,65 C65,32 145,32 200,60 L234,30 L220,65 L234,100 L200,70 C145,98 65,98 30,65 Z" fill="url(#gtuna-${uid})"/>
        <path d="M95,39 L125,20 L140,41 Z" fill="${glowColor}"/>
        <path d="M110,88 L135,108 L148,85 Z" fill="${secondaryColor}"/>
        <circle cx="55" cy="58" r="4.5" fill="#0f172a"/>
        <circle cx="55" cy="58" r="2" fill="${glowColor}"/>
        <path d="M72,50 Q82,65 72,80" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
      </svg>`,
    manta: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M25,62 L45,52 L40,60 C85,50 115,12 140,10 C155,38 175,55 205,62 L248,64 L205,67 C175,74 155,92 140,120 C115,118 85,80 40,70 L45,78 Z" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="2"/>
        <path d="M65,64 C100,40 125,30 138,24 C145,48 145,82 138,106 C125,100 100,90 65,64 Z" fill="${secondaryColor}" opacity="0.55"/>
        <circle cx="52" cy="55" r="2.8" fill="${glowColor}"/>
        <circle cx="52" cy="73" r="2.8" fill="${glowColor}"/>
      </svg>`,
    lanternfish: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M40,65 C70,40 140,42 195,60 L225,40 L215,65 L225,90 L195,70 C140,88 70,90 40,65 Z" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="1.5"/>
        <circle cx="62" cy="58" r="8" fill="#020617" stroke="${glowColor}" stroke-width="2"/>
        <circle cx="60" cy="56" r="3" fill="#fff"/>
        <circle cx="78" cy="76" r="3" fill="${glowColor}"/>
        <circle cx="96" cy="79" r="3" fill="${glowColor}"/>
        <circle cx="114" cy="80" r="3" fill="${glowColor}"/>
        <circle cx="132" cy="79" r="3" fill="${glowColor}"/>
        <circle cx="150" cy="76" r="3" fill="${glowColor}"/>
        <circle cx="168" cy="72" r="2.5" fill="${glowColor}"/>
      </svg>`,
    squid: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <polygon points="235,65 195,38 180,65 195,92" fill="${secondaryColor}"/>
        <path d="M95,45 C140,38 190,48 215,65 C190,82 140,92 95,85 Z" fill="${primaryColor}"/>
        <circle cx="108" cy="60" r="7" fill="#020617" stroke="${glowColor}" stroke-width="2"/>
        <circle cx="106" cy="58" r="2.5" fill="#fff"/>
        <path d="M96,52 C65,35 40,48 18,36 M96,58 C60,52 35,60 12,56 M96,66 C60,72 35,70 15,76 M96,74 C65,88 40,82 22,96" stroke="${primaryColor}" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>`,
    angler: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M55,72 C55,34 115,25 165,45 C190,55 205,60 225,45 L218,68 L225,90 C205,76 190,82 165,92 C115,112 65,105 55,72 Z" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="2"/>
        <path d="M115,34 C90,10 52,12 38,38" stroke="${secondaryColor}" stroke-width="2.5" fill="none"/>
        <circle cx="36" cy="42" r="7" fill="${glowColor}"/>
        <circle cx="36" cy="42" r="13" fill="${glowColor}" opacity="0.3"/>
        <path d="M56,68 L92,62 L85,86 L56,82 Z" fill="#020617"/>
        <path d="M60,68 L63,76 M68,66 L70,75 M76,65 L77,74 M62,82 L65,74 M72,83 L74,75" stroke="#f8fafc" stroke-width="2"/>
        <circle cx="82" cy="52" r="4" fill="${glowColor}"/>
      </svg>`,
    mosasaur: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M15,62 L75,46 C125,40 175,48 215,60 L248,45 L235,66 L248,82 L205,74 C165,86 120,88 75,76 L18,68 Z" fill="${primaryColor}"/>
        <path d="M18,64 L68,62 L65,70 L20,68 Z" fill="#090d16"/>
        <path d="M24,64 L26,68 M32,64 L34,68 M40,64 L42,68 M48,64 L50,68" stroke="#fff" stroke-width="1.8"/>
        <path d="M88,72 L72,106 L104,96 L106,76 Z" fill="${secondaryColor}"/>
        <path d="M156,74 L148,102 L172,94 L170,74 Z" fill="${secondaryColor}"/>
        <circle cx="62" cy="54" r="3.5" fill="${glowColor}"/>
      </svg>`,
    plesiosaur: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M18,42 C28,36 42,40 45,46 C68,52 92,68 115,60 C145,46 185,48 208,64 L242,62 L210,74 C185,88 145,88 115,74 C88,76 62,60 40,50 L20,48 Z" fill="${primaryColor}"/>
        <path d="M125,72 L105,112 L132,102 L140,76 Z" fill="${secondaryColor}"/>
        <path d="M178,72 L166,108 L190,100 L192,72 Z" fill="${secondaryColor}"/>
        <circle cx="28" cy="43" r="2.5" fill="${glowColor}"/>
      </svg>`,
    ammonite: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <circle cx="115" cy="65" r="42" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="4"/>
        <path d="M115,65 m0,-26 a26,26 0 1,1 -18,44 a16,16 0 1,1 22,-22" fill="none" stroke="${glowColor}" stroke-width="3"/>
        <path d="M148,82 C178,82 205,72 225,60 M148,88 C180,90 208,86 228,78 M145,94 C175,98 202,98 220,95" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="152" cy="76" r="5" fill="#020617" stroke="#fff" stroke-width="1.5"/>
      </svg>`,
    placoderm: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M28,64 L65,34 L125,38 L195,56 L236,34 L222,66 L236,94 L195,72 L125,92 L65,92 L35,76 Z" fill="${primaryColor}"/>
        <polygon points="28,64 65,34 118,38 112,88 65,92 38,74" fill="${secondaryColor}" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M32,68 L70,66 L66,80 L38,78 Z" fill="#020617"/>
        <polygon points="36,68 42,76 48,68 54,75 60,68" fill="#f8fafc"/>
        <circle cx="58" cy="52" r="5" fill="${glowColor}" stroke="#020617" stroke-width="2"/>
      </svg>`,
    anomalocaris: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="135" cy="65" rx="62" ry="22" fill="${primaryColor}"/>
        <path d="M90,46 L80,26 L102,43 M112,43 L106,22 L124,43 M134,43 L132,22 L146,43 M156,45 L158,25 L168,47" fill="${secondaryColor}"/>
        <path d="M90,84 L80,104 L102,87 M112,87 L106,108 L124,87 M134,87 L132,108 L146,87 M156,85 L158,105 L168,83" fill="${secondaryColor}"/>
        <path d="M192,65 L232,42 L218,65 L232,88 Z" fill="${secondaryColor}"/>
        <circle cx="76" cy="42" r="7" fill="${glowColor}" stroke="#020617" stroke-width="2"/>
        <circle cx="76" cy="88" r="7" fill="${glowColor}" stroke="#020617" stroke-width="2"/>
        <path d="M74,58 C48,52 32,66 44,78 M74,72 C48,78 32,64 44,52" stroke="${glowColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
      </svg>`,
    trilobite: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="130" cy="65" rx="68" ry="38" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="3"/>
        <path d="M88,28 C60,38 60,92 88,102 Z" fill="${secondaryColor}"/>
        <line x1="90" y1="50" x2="192" y2="50" stroke="#020617" stroke-width="2.5"/>
        <line x1="90" y1="80" x2="192" y2="80" stroke="#020617" stroke-width="2.5"/>
        <line x1="112" y1="29" x2="112" y2="101" stroke="#020617" stroke-width="2"/>
        <line x1="134" y1="28" x2="134" y2="102" stroke="#020617" stroke-width="2"/>
        <line x1="156" y1="30" x2="156" y2="100" stroke="#020617" stroke-width="2"/>
        <path d="M65,52 C38,38 24,28 16,22 M65,78 C38,92 24,102 16,108" stroke="${glowColor}" stroke-width="2.5" fill="none"/>
        <circle cx="75" cy="48" r="4.5" fill="${glowColor}"/>
        <circle cx="75" cy="82" r="4.5" fill="${glowColor}"/>
      </svg>`,
    crab: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="130" cy="68" rx="42" ry="26" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="3"/>
        <path d="M95,55 C65,35 45,25 32,38 C45,48 58,48 88,62 M165,55 C195,35 215,25 228,38 C215,48 202,48 172,62" stroke="${secondaryColor}" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M92,72 L42,92 M98,80 L55,108 M168,72 L218,92 M162,80 L205,108" stroke="${primaryColor}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="115" cy="46" r="4" fill="${glowColor}"/>
        <circle cx="145" cy="46" r="4" fill="${glowColor}"/>
      </svg>`,
    jelly: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M75,65 C75,20 185,20 185,65 C165,72 95,72 75,65 Z" fill="${primaryColor}" opacity="0.85" stroke="${glowColor}" stroke-width="2"/>
        <ellipse cx="130" cy="52" rx="32" ry="14" fill="${glowColor}" opacity="0.45"/>
        <path d="M95,68 C90,92 102,105 94,122 M115,70 C112,95 124,108 118,124 M135,70 C138,95 128,108 136,124 M155,68 C162,92 150,105 160,122" stroke="${glowColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`,
    eel: `
      <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
        <path d="M25,52 C65,25 110,95 155,55 C185,28 215,82 245,62" stroke="${primaryColor}" stroke-width="16" stroke-linecap="round" fill="none"/>
        <path d="M25,52 C65,25 110,95 155,55 C185,28 215,82 245,62" stroke="${glowColor}" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round" fill="none"/>
        <circle cx="30" cy="48" r="3.5" fill="#fff"/>
      </svg>`
  };
  return shapes[shape] || shapes.tuna;
}

const ERAS_DATA = [
  // ============================================================================
  // ÉPOCA 1: PRESENTE (HOLOCENO) — 21 ANIMAIS
  // ============================================================================
  {
    id: 'presente',
    name: 'Presente (Holoceno)',
    shortLabel: 'Presente',
    timeAgo: '0 Ma (Hoje)',
    skyHue: 198,
    seaLevel: 'Atual (0m)',
    surfaceTemp: '17 °C',
    oxygen: '21%',
    heroTitle: 'Oceano Moderno — Era das Baleias, Recifes e Gigantes Abissais',
    summary: 'Dominado pelos maiores mamíferos que já viveram na Terra, tubarões de alta performance, cardumes velozes de teleósteos e ecossistemas abissais altamente especializados.',
    zones: {
      epipelagic: [
        {
          id: 'great-white',
          name: 'Tubarão-Branco',
          scientific: 'Carcharodon carcharias',
          image: 'imagens/Tubarão branco.jpg',
          depth: '0m – 250m',
          sizeMeters: 6.0,
          sizeLabel: 'Até 6,0 m',
          diet: 'Predador Ápice',
          shape: 'shark',
          colors: ['#334155', '#64748b', '#38bdf8'],
          summary: 'Maior peixe predador costeiro atual, dotado de Ampolas de Lorenzini capazes de detectar campos elétricos de batimentos cardíacos.',
          description: 'O Tubarão-Branco mantém a temperatura corporal acima da água circundante (endotermia regional), permitindo explosões de velocidade de até 56 km/h ao caçar pinípedes e cetáceos.',
          funFact: 'Seus 300 dentes serrilhados funcionam como uma esteira rolante: sempre que um quebra, outro avança da fileira de trás.'
        },
        {
          id: 'blue-whale',
          name: 'Baleia-Azul',
          scientific: 'Balaenoptera musculus',
          image: 'imagens/baleia azul.jpg',
          depth: '0m – 200m',
          sizeMeters: 30.0,
          sizeLabel: 'Até 30,0 m',
          diet: 'Filtrador',
          shape: 'whale',
          colors: ['#1d4ed8', '#3b82f6', '#93c5fd'],
          summary: 'O maior animal que já existiu em toda a história do planeta Terra, superando até os maiores dinossauros saurópodes.',
          description: 'Alimenta-se quase exclusivamente de krill, engolindo até 4 toneladas de pequenos crustáceos por dia usando suas placas de barbatanas córneas.',
          funFact: 'Apenas o coração de uma Baleia-Azul tem o tamanho de um carro popular e pesa cerca de 180 kg!'
        },
        {
          id: 'orca',
          name: 'Orca',
          scientific: 'Orcinus orca',
          image: 'imagens/orca.jpg',
          depth: '0m – 200m',
          sizeMeters: 9.0,
          sizeLabel: 'Até 9,0 m',
          diet: 'Predador Ápice',
          shape: 'whale',
          colors: ['#090d16', '#334155', '#f8fafc'],
          summary: 'O predador de topo supremo dos oceanos modernos, caçando em grupos coordenados com cultura e dialetos próprios.',
          description: 'Diferentes populações (ecótipos) especializam-se em presas distintas, desde cardumes de arenque até focas, baleias e até tubarões-brancos.',
          funFact: 'Orcas criam ondas sincronizadas para derrubar focas de blocos de gelo flutuantes na Antártida.'
        },
        {
          id: 'whale-shark',
          name: 'Tubarão-Baleia',
          scientific: 'Rhincodon typus',
          image: 'imagens/tubarão baleia.webp',
          depth: '0m – 180m',
          sizeMeters: 14.0,
          sizeLabel: '12 a 14+ m',
          diet: 'Filtrador',
          shape: 'shark',
          colors: ['#0f172a', '#0284c7', '#7dd3fc'],
          summary: 'O maior peixe vivo do mundo, reconhecível pelo padrão estrelado de pontos brancos sobre a pele azul-acinzentada.',
          description: 'Filtra mais de 6.000 litros de água por hora através de almofadas branquiais esponjosas, capturando plâncton, ovas de coral e pequenos peixes.',
          funFact: 'Até mesmo seus globos oculares são cobertos por milhares de minúsculos dentículos dérmicos para protegê-los contra danos!'
        },
        {
          id: 'manta-ray',
          name: 'Raia-Jamanta Gigante',
          scientific: 'Mobula birostris',
          image: 'imagens/raia jamanta.webp',
          depth: '0m – 120m',
          sizeMeters: 7.0,
          sizeLabel: '7,0 m de envergadura',
          diet: 'Filtrador',
          shape: 'manta',
          colors: ['#0f172a', '#334155', '#2dd4bf'],
          summary: 'A maior raia do mundo; "voa" pelas correntes superficiais filtrando zooplâncton com lóbulos cefálicos.',
          description: 'Com o maior cérebro proporcional entre todos os peixes, exibe comportamentos sociais complexos e visita "estações de limpeza" nos recifes.',
          funFact: 'Possuem padrões de manchas no ventre únicos para cada indivíduo, funcionando como uma impressão digital.'
        }
      ],
      mesopelagic: [
        {
          id: 'lanternfish',
          name: 'Peixe-Lanterna',
          scientific: 'Myctophidae spp.',
          image: 'imagens/peixe lanterna.jpeg',
          depth: '300m – 1.000m',
          sizeMeters: 0.18,
          sizeLabel: '15 – 20 cm',
          diet: 'Filtrador',
          shape: 'lanternfish',
          colors: ['#1e293b', '#475569', '#38bdf8'],
          summary: 'Constitui até 65% de toda a biomassa de peixes do mar profundo; usa fotóforos ventrais para camuflagem por contra-iluminação.',
          description: 'Todas as noites, bilhões de peixes-lanterna sobem até a superfície para se alimentar de plâncton e retornam antes do amanhecer.',
          funFact: 'Seus cardumes são tão densos que enganavam os sonares militares da Segunda Guerra Mundial, criando um "fundo falso" no oceano.'
        },
        {
          id: 'barreleye',
          name: 'Peixe-Olhos-de-Barril',
          scientific: 'Macropinna microstoma',
          image: 'imagens/peixe olhos de barril.jpg',
          depth: '600m – 800m',
          sizeMeters: 0.15,
          sizeLabel: '15 cm',
          diet: 'Carnívoro',
          shape: 'lanternfish',
          colors: ['#064e3b', '#047857', '#4ade80'],
          summary: 'Possui um crânio 100% transparente preenchido por fluido e olhos tubulares verdes voltados para cima.',
          description: 'Fica imóvel na penumbra observando as silhuetas de sifonóforos e pequenos crustáceos contra a tênue luz superior.',
          funFact: 'O que parecem ser "olhos" na frente do focinho são, na verdade, seus órgãos olfativos (narinas).'
        },
        {
          id: 'oarfish',
          name: 'Peixe-Remo Gigante',
          scientific: 'Regalecus glesne',
          image: 'imagens/peixe remo.jpeg',
          depth: '200m – 1.000m',
          sizeMeters: 8.5,
          sizeLabel: 'Até 8,5 m',
          diet: 'Filtrador',
          shape: 'eel',
          colors: ['#64748b', '#94a3b8', '#f43f5e'],
          summary: 'O peixe ósseo mais longo do mundo; nada verticalmente na coluna d’água ondulando sua longa barbatana dorsal vermelha.',
          description: 'Sua postura vertical permite que ele localize o krill e pequenos crustáceos contra a pouca luz que vem de cima.',
          funFact: 'Inspirou a maioria das lendas históricas de "serpentes marinhas" quando exemplares raros apareciam nas praias.'
        },
        {
          id: 'leatherback-deep',
          name: 'Tartaruga-de-Couro (Em Mergulho Profundo)',
          scientific: 'Dermochelys coriacea',
          image: 'imagens/tartaruga de couro.jpg',
          depth: '200m – 1.000m',
          sizeMeters: 2.2,
          sizeLabel: 'Até 2,2 m',
          diet: 'Carnívoro',
          shape: 'turtle',
          colors: ['#0f172a', '#1e293b', '#38bdf8'],
          summary: 'A maior tartaruga marinha e o réptil vivo que mergulha mais fundo, descendo a mais de 1.000m atrás de águas-vivas.',
          description: 'Seu casco flexível semelhante a couro comprime-se sem quebrar sob a imensa pressão da zona crepuscular.',
          funFact: 'Sua garganta é forrada por centenas de papilas pontiagudas voltadas para trás que impedem águas-vivas escorregadias de escaparem.'
        }
      ],
      bathypelagic: [
        {
          id: 'anglerfish',
          name: 'Diabo-Negro do Abismo (Tamboril)',
          scientific: 'Melanocetus johnsonii',
          image: 'imagens/peixe diabo negro.webp',
          depth: '1.000m – 3.500m',
          sizeMeters: 0.2,
          sizeLabel: '20 cm (fêmea)',
          diet: 'Carnívoro',
          shape: 'angler',
          colors: ['#18181b', '#3f3f46', '#2dd4bf'],
          summary: 'Atrai presas na escuridão total usando uma antena dorsal luminosa repleta de bactérias simbióticas bioluminescentes.',
          description: 'Possui estômago altamente elástico e mandíbulas articuladas capazes de engolir presas com o dobro do seu próprio comprimento.',
          funFact: 'Os machos são minúsculos e fundem seu sistema sanguíneo ao corpo da fêmea para garantir a reprodução no escuro absoluto.'
        },
        {
          id: 'giant-squid',
          name: 'Lula-Gigante',
          scientific: 'Architeuthis dux',
          image: 'imagens/lula gigante.webp',
          depth: '1.000m – 2.200m',
          sizeMeters: 13.0,
          sizeLabel: 'Até 13,0 m',
          diet: 'Carnívoro',
          shape: 'squid',
          colors: ['#9f1239', '#e11d48', '#fb7185'],
          summary: 'Invertebrado colossal das profundezas que trava batalhas titânicas com cachalotes em mergulho profundo.',
          description: 'Seus olhos têm o tamanho de bolas de basquete (até 27 cm) — os maiores do reino animal — permitindo detectar predadores bioluminescentes.',
          funFact: 'Possui três corações que bombeiam sangue azulado rico em cobre (hemocianina).'
        },
        {
          id: 'goblin-shark',
          name: 'Tubarão-Duende',
          scientific: 'Mitsukurina owstoni',
          image: 'imagens/tubarão duende.jpg',
          depth: '1.000m – 1.300m',
          sizeMeters: 3.8,
          sizeLabel: 'Até 3,8 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#881337', '#f43f5e', '#fda4af'],
          summary: 'Fóssil vivo de 125 milhões de anos com focinho em forma de espada e mandíbulas que se projetam como uma catapulta.',
          description: 'Quando detecta uma presa com seus sensores elétricos no longo focinho, suas mandíbulas saltam para fora do crânio a 3 metros por segundo.',
          funFact: 'Sua pele semitranslúcida deixa visíveis os vasos sanguíneos, dando-lhe uma coloração rosada única nas profundezas.'
        },
        {
          id: 'vampire-squid',
          name: 'Lula-Vampiro-do-Inferno',
          scientific: 'Vampyroteuthis infernalis',
          image: 'imagens/lula vampiro do inferno.webp',
          depth: '1.000m – 3.000m',
          sizeMeters: 0.3,
          sizeLabel: '30 cm',
          diet: 'Detritívoro',
          shape: 'squid',
          colors: ['#450a0a', '#991b1b', '#38bdf8'],
          summary: 'Apesar do nome assustador e da capa membranosa escura, é um pacífico coletor de "neve marinha" que vive em zonas de mínimo oxigênio.',
          description: 'Quando ameaçada, vira seu manto do avesso cobrindo o corpo com cirros e solta uma nuvem de muco azul brilhante em vez de tinta.',
          funFact: 'Não é nem lula nem polvo, mas o único sobrevivente de uma ordem ancestral própria de cefalópodes.'
        }
      ],
      abyssopelagic: [
        {
          id: 'tripodfish',
          name: 'Peixe-Tripé',
          scientific: 'Bathypterois grallator',
          image: 'imagens/peixe tripé.jpg',
          depth: '4.000m – 4.700m',
          sizeMeters: 0.4,
          sizeLabel: '40 cm',
          diet: 'Carnívoro',
          shape: 'lanternfish',
          colors: ['#334155', '#64748b', '#fcd34d'],
          summary: 'Pousa em pé sobre o lodo abissal usando três raios de barbatanas alongados como pernas de até 1 metro.',
          description: 'Praticamente cego, posiciona-se contra a corrente marinha profunda e usa suas barbatanas peitorais como antenas táteis.',
          funFact: 'Bombeia fluido para endurecer suas barbatanas quando quer "ficar de pé" e as relaxa quando precisa nadar.'
        },
        {
          id: 'dumbo-octopus',
          name: 'Polvo-Dumbo',
          scientific: 'Grimpoteuthis',
          image: 'imagens/polvo dumbo.avif',
          depth: '4.000m – 5.500m',
          sizeMeters: 0.3,
          sizeLabel: '20 – 30 cm',
          diet: 'Carnívoro',
          shape: 'jelly',
          colors: ['#be185d', '#f472b6', '#fbcfe8'],
          summary: 'O polvo que vive em maior profundidade no planeta, batendo duas barbatanas auriculares semelhantes a orelhas.',
          description: 'Diferente dos polvos de águas rasas, não possui saco de tinta (inútil na escuridão total) e engole presas inteiras.',
          funFact: 'Flutua silenciosamente logo acima do leito oceânico economizando o máximo de energia.'
        },
        {
          id: 'fangtooth',
          name: 'Peixe-Ogro (Fangtooth)',
          scientific: 'Anoplogaster cornuta',
          image: 'imagens/peixe ogro.jpg',
          depth: '2.000m – 5.000m',
          sizeMeters: 0.18,
          sizeLabel: '18 cm',
          diet: 'Carnívoro',
          shape: 'angler',
          colors: ['#0f172a', '#334155', '#f8fafc'],
          summary: 'Possui os maiores dentes proporcionais ao tamanho do corpo de qualquer peixe nos oceanos.',
          description: 'Seus dois caninos inferiores são tão longos que o peixe possui duas cavidades especiais ao lado do cérebro para acomodá-los quando fecha a boca.',
          funFact: 'Apesar da aparência feroz, os filhotes são tão diferentes dos adultos que durante 50 anos a ciência achou que eram duas espécies distintas!'
        },
        {
          id: 'gulper-eel',
          name: 'Enguia-Pelicano',
          scientific: 'Eurypharynx pelecanoides',
          image: 'imagens/enguia pelicano.jpg',
          depth: '3.000m – 5.500m',
          sizeMeters: 1.0,
          sizeLabel: 'Até 1,0 m',
          diet: 'Carnívoro',
          shape: 'eel',
          colors: ['#090d16', '#1e1b4b', '#f43f5e'],
          summary: 'Sua mandíbula gigantesca abre como a bolsa de um pelicano ou um guarda-chuva para abocanhar cardumes inteiros de camarões.',
          description: 'Na ponta da longa cauda em forma de chicote há um órgão luminoso rosado que pisca para atrair crustáceos curiosos na escuridão abissal.',
          funFact: 'Sua boca aberta é várias vezes mais larga que o próprio corpo!'
        }
      ],
      hadopelagic: [
        {
          id: 'mariana-snailfish',
          name: 'Peixe-Caracol das Marianas',
          scientific: 'Pseudoliparis swirei',
          image: 'imagens/peixe caracol.jpg',
          depth: '6.000m – 8.336m',
          sizeMeters: 0.28,
          sizeLabel: '28 cm',
          diet: 'Detritívoro',
          shape: 'eel',
          colors: ['#fda4af', '#fecdd3', '#38bdf8'],
          summary: 'Detentor do recorde mundial de peixe mais profundo já filmado, sobrevivendo a pressões equivalentes a 800 elefantes.',
          description: 'Não possui escamas nem bexiga natatória; seus ossos são cartilaginosos e suas células são ricas em TMAO para estabilizar proteínas.',
          funFact: 'Nas fossas hadais, livre de grandes predadores, este pequeno peixe translúcido é o predador de topo de seu ecossistema!'
        },
        {
          id: 'giant-amphipod',
          name: 'Anfípode Supergigante Hadal',
          scientific: 'Alicella gigantea',
          image: 'imagens/alicella gigantea.jpg',
          depth: '6.500m – 10.500m',
          sizeMeters: 0.34,
          sizeLabel: '34 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#e2e8f0', '#94a3b8', '#38bdf8'],
          summary: 'Exemplo clássico de gigantismo abissal: enquanto anfípodes comuns medem 1 cm, este atinge mais de 30 cm nas fossas.',
          description: 'Produz uma enzima especial (celulase) capaz de digerir até pedaços de madeira afundados a 10 quilômetros de profundidade.',
          funFact: 'Resiste até no fundo do Challenger Deep (10.900m) alimentando-se de qualquer matéria orgânica que atinja o leito.'
        },
        {
          id: 'cusk-eel-hadal',
          name: 'Brotula Hadal (Abyssobrotula)',
          scientific: 'Abyssobrotula galatheae',
          image: 'imagens/brotula hadal.webp',
          depth: '6.000m – 8.370m',
          sizeMeters: 0.16,
          sizeLabel: '16 cm',
          diet: 'Detritívoro',
          shape: 'eel',
          colors: ['#475569', '#94a3b8', '#2dd4bf'],
          summary: 'Enguia-cusk cega da Fossa de Porto Rico e da Fossa do Japão, guiada exclusivamente por poros sensoriais na cabeça.',
          description: 'Desliza rente ao sedimento das fossas oceânicas alimentando-se de vermes poliquetas e pequenos crustáceos bentônicos.',
          funFact: 'Foi dragada a mais de 8.300 metros na Fossa de Porto Rico em 1970.'
        },
        {
          id: 'hadal-sea-pig',
          name: 'Porquinho-do-Mar Hadal (Pepino-do-Mar)',
          scientific: 'Scotoplanes globosa',
          image: 'imagens/porquinho do mar hadal.jpg',
          depth: '6.000m – 9.500m',
          sizeMeters: 0.15,
          sizeLabel: '15 cm',
          diet: 'Detritívoro',
          shape: 'crab',
          colors: ['#f472b6', '#fbcfe8', '#38bdf8'],
          summary: 'Equinodermo rechonchudo que caminha em "rebanhos" de centenas de indivíduos pelo fundo das fossas usando pés tubulares inflados com água.',
          description: 'Funciona como um aspirador de pó biológico das profundezas, engolindo lama abissal para extrair nutrientes orgânicos frescos.',
          funFact: 'Pequenos caranguejos abissais costumam pegar carona nas costas dos porquinhos-do-mar para se protegerem!'
        }
      ]
    }
  },
  // ============================================================================
  // ÉPOCA 2: NEÓGENO / MIOCENO (~15 Ma) — 20 ANIMAIS
  // ============================================================================
  {
    id: 'mioceno',
    name: 'Neógeno / Mioceno',
    shortLabel: 'Mioceno',
    timeAgo: '15 Milhões de Anos Atrás',
    skyHue: 205,
    seaLevel: '+40m acima do atual',
    surfaceTemp: '21 °C',
    oxygen: '21.5%',
    heroTitle: 'Oceano do Mioceno — O Império do Megalodon e Livyatan',
    summary: 'A era de ouro dos superpredadores marinhos: tubarões colossais, cachalotes assassinos, crocodilos oceânicos e preguiças marinhas habitavam mares ricos em nutrientes.',
    zones: {
      epipelagic: [
        {
          id: 'megalodon',
          name: 'Megalodon',
          scientific: 'Otodus megalodon',
          depth: '0m – 200m',
          sizeMeters: 18.0,
          sizeLabel: '15 a 18+ metros',
          diet: 'Predador Ápice',
          shape: 'shark',
          colors: ['#1e293b', '#475569', '#f43f5e'],
          summary: 'O maior tubarão que já existiu, com dentes de 18 cm e a mordida mais potente da história animal.',
          description: 'Com peso estimado em até 60 toneladas, caçava baleias primitivas quebrando suas costelas e nadadeiras com uma força de mordida superior a 180.000 Newtons.',
          funFact: 'Suas mandíbulas abertas tinham mais de 2 metros de largura — o suficiente para engolir dois humanos adultos lado a lado.'
        },
        {
          id: 'livyatan',
          name: 'Livyatan melvillei',
          scientific: 'Livyatan melvillei',
          depth: '0m – 200m',
          sizeMeters: 17.5,
          sizeLabel: '16 a 17,5 metros',
          diet: 'Predador Ápice',
          shape: 'whale',
          colors: ['#0f172a', '#312e81', '#fbbf24'],
          summary: 'Cachalote superpredador armado com dentes funcionais de 36 cm nas mandíbulas superior e inferior.',
          description: 'Ao contrário do cachalote moderno, o Livyatan caçava outras baleias perto da superfície, competindo diretamente com o Megalodon.',
          funFact: 'Possuía os maiores dentes destinados a morder de qualquer animal conhecido na ciência.'
        },
        {
          id: 'cetotherium',
          name: 'Cetotherium (Baleia-Anã do Mioceno)',
          scientific: 'Cetotherium rathkei',
          depth: '0m – 150m',
          sizeMeters: 4.5,
          sizeLabel: '4,5 m',
          diet: 'Filtrador',
          shape: 'whale',
          colors: ['#334155', '#64748b', '#38bdf8'],
          summary: 'Pequena baleia de barbatanas que formava a base alimentar do Megalodon e do Livyatan.',
          description: 'Filtrava plâncton em águas costeiras rasas e quentes; seus fósseis frequentemente apresentam marcas profundas de dentes de Megalodon.',
          funFact: 'Era uma das menores baleias de barbatanas de todos os tempos, menor que um tubarão-branco atual.'
        },
        {
          id: 'thalassocnus',
          name: 'Thalassocnus (Preguiça-Marinha)',
          scientific: 'Thalassocnus natans',
          depth: '0m – 60m',
          sizeMeters: 3.3,
          sizeLabel: '3,3 m',
          diet: 'Detritívoro',
          shape: 'mosasaur',
          colors: ['#78350f', '#b45309', '#fcd34d'],
          summary: 'Preguiça gigante que se adaptou a viver no oceano, caminhando no fundo raso para pastar ervas marinhas.',
          description: 'Tinha ossos extremamente densos e pesados (paquiostose) que funcionavam como cinto de lastro de mergulhador para mantê-la no fundo sem flutuar.',
          funFact: 'Usava suas enormes garras curvas para se ancorar nas rochas contra a força das ondas enquanto comia algas.'
        },
        {
          id: 'odobenocetops',
          name: 'Odobenocetops (Golfinho-Morsa)',
          scientific: 'Odobenocetops peruvianus',
          depth: '0m – 120m',
          sizeMeters: 2.1,
          sizeLabel: '2,1 m',
          diet: 'Carnívoro',
          shape: 'whale',
          colors: ['#475569', '#94a3b8', '#fde68a'],
          summary: 'Cetáceo bizarro com duas presas voltadas para trás, sendo a presa direita dos machos de até 1,2 metro de comprimento!',
          description: 'Vasculhava o lodo costeiro com o focinho largo e musculoso, sugando moluscos bivalves exatamente como as morsas atuais.',
          funFact: 'Seus olhos ficavam no topo da cabeça para vigiar ataques do Megalodon vindo de cima.'
        }
      ],
      mesopelagic: [
        {
          id: 'parotodus',
          name: 'Tubarão-Mako-Falso Dente-de-Sabre',
          scientific: 'Parotodus benedeni',
          depth: '200m – 900m',
          sizeMeters: 7.5,
          sizeLabel: 'Até 7,5 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#1e3a8a', '#3b82f6', '#38bdf8'],
          summary: 'Predador pelágico oceânico de águas abertas e profundas, com dentes maciços e curvos.',
          description: 'Habitava longe da costa para evitar o Megalodon costeiro, mergulhando na zona crepuscular atrás de grandes peixes ósseos e cefalópodes.',
          funFact: 'Seus dentes fósseis são encontrados principalmente em sedimentos oceânicos profundos e ilhas oceânicas.'
        },
        {
          id: 'hemipristis-serra',
          name: 'Tubarão-Fuinha Gigante (Hemipristis)',
          scientific: 'Hemipristis serra',
          depth: '150m – 600m',
          sizeMeters: 6.0,
          sizeLabel: 'Até 6,0 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#0f766e', '#14b8a6', '#5eead4'],
          summary: 'Tubarão de dentes ricamente serrilhados especializado em caçar dugongos, sirênios e grandes peixes.',
          description: 'Muito maior que seu único parente vivo hoje, patrulhava as encostas continentais quentes do Mioceno.',
          funFact: 'Seus dentes são tão ornamentados que estão entre os fósseis mais cobiçados por colecionadores.'
        },
        {
          id: 'cosmopolitodus',
          name: 'Tubarão-Mako-Gigante (Cosmopolitodus)',
          scientific: 'Cosmopolitodus hastalis',
          depth: '200m – 800m',
          sizeMeters: 7.0,
          sizeLabel: 'Até 7,0 m',
          diet: 'Predador Ápice',
          shape: 'shark',
          colors: ['#1e293b', '#38bdf8', '#e0f2fe'],
          summary: 'O ancestral direto do Tubarão-Branco moderno, dotado de dentes largos e triangulares sem serrilhas.',
          description: 'Nadador de altíssima velocidade que perseguia atuns pré-históricos, golfinhos primitivos e lulas na zona crepuscular.',
          funFact: 'Documenta perfeitamente no registro fóssil a transição evolutiva entre os tubarões mako e o grande tubarão-branco.'
        },
        {
          id: 'makaira-mioceno',
          name: 'Marlim-Gigante do Mioceno',
          scientific: 'Makaira belgica',
          depth: '200m – 750m',
          sizeMeters: 5.2,
          sizeLabel: '5,2 m',
          diet: 'Carnívoro',
          shape: 'tuna',
          colors: ['#1d4ed8', '#60a5fa', '#fbbf24'],
          summary: 'Peixe de bico colossal que mergulhava na zona mesopelágica para caçar cardumes de lulas e peixes-lanterna.',
          description: 'Possuía um rostro ósseo denso capaz de suportar impactos em alta velocidade.',
          funFact: 'Rostros fósseis de marlins já foram encontrados cravados em vértebras de baleias do Mioceno!'
        }
      ],
      bathypelagic: [
        {
          id: 'physeterula',
          name: 'Physeterula (Cachalote Caçador Abissal)',
          scientific: 'Physeterula dubusi',
          depth: '1.000m – 2.500m',
          sizeMeters: 10.0,
          sizeLabel: '10,0 m',
          diet: 'Carnívoro',
          shape: 'whale',
          colors: ['#334155', '#475569', '#2dd4bf'],
          summary: 'Ancestral dos cachalotes de mergulho profundo que já utilizava ecolocalização potente na zona da meia-noite.',
          description: 'Usava seu órgão de espermacete no crânio para focalizar pulsos sonoros e localizar cardumes de lulas abissais.',
          funFact: 'Ainda possuía dentes funcionais com esmalte tanto na mandíbula superior quanto na inferior.'
        },
        {
          id: 'megalodoras-squid-mio',
          name: 'Architeuthis Ancestral do Neógeno',
          scientific: 'Architeuthidae miocenica',
          depth: '1.200m – 2.800m',
          sizeMeters: 11.5,
          sizeLabel: '11,5 m',
          diet: 'Carnívoro',
          shape: 'squid',
          colors: ['#881337', '#e11d48', '#fda4af'],
          summary: 'Grandes cefalópodes que co-evoluíram em uma corrida armamentista direta com os primeiros cachalotes mergulhadores.',
          description: 'Desenvolveu olhos gigantescos e tentáculos clubes armados com anéis quitinosos serrilhados para se defender na escuridão.',
          funFact: 'Bicos quitinosos fósseis revelam a presença de grandes teutoides abissais desde o Cenozoico médio.'
        },
        {
          id: 'miocene-frilled-shark',
          name: 'Tubarão-Cobra Gigante do Mioceno',
          scientific: 'Chlamydoselachus tobleri',
          depth: '1.000m – 2.200m',
          sizeMeters: 2.8,
          sizeLabel: '2,8 m',
          diet: 'Carnívoro',
          shape: 'eel',
          colors: ['#27272a', '#52525b', '#a1a1aa'],
          summary: 'Parente maior do atual tubarão-cobra, com dentes em forma de tridente projetados para fisgar lulas escorregadias.',
          description: 'Com corpo serpentiforme e seis pares de fendas branquiais em babados, flutuava silenciosamente nos cânions submarinos.',
          funFact: 'Possuía 300 dentes em forma de garfo distribuídos em 25 fileiras.'
        },
        {
          id: 'kekenodon-deep',
          name: 'Zifiídeo Abissal (Baleia-de-Bico do Mioceno)',
          scientific: 'Messapicetus gregarius',
          depth: '1.000m – 3.000m',
          sizeMeters: 5.5,
          sizeLabel: '5,5 m',
          diet: 'Carnívoro',
          shape: 'whale',
          colors: ['#1e1b4b', '#4338ca', '#818cf8'],
          summary: 'Baleia-de-bico de longo rostro que realizava mergulhos extremos na zona da meia-noite atrás de peixes bentônicos.',
          description: 'Fósseis extraordinários no Peru foram encontrados com os restos fossilizados de sua última refeição (sardinhas e peixes de profundidade) ainda no estômago.',
          funFact: 'As baleias-de-bico são os mamíferos que mergulham mais fundo no planeta.'
        }
      ],
      abyssopelagic: [
        {
          id: 'osedax-whale-fall',
          name: 'Colônias Osedax ("Vermes Zumbis" de Baleias)',
          scientific: 'Osedax spp. (Linhagem Neógena)',
          depth: '4.000m – 5.500m',
          sizeMeters: 0.07,
          sizeLabel: 'Colônias de 7 cm',
          diet: 'Detritívoro',
          shape: 'jelly',
          colors: ['#9f1239', '#f43f5e', '#fda4af'],
          summary: 'Com a explosão de grandes baleias no Mioceno, carcaças afundadas no abismo criaram verdadeiros oásis de vida.',
          description: 'Sem boca nem estômago, esses vermes secretam ácido para perfurar ossos de baleias mortas no fundo abissal, digerindo lipídios através de bactérias simbióticas.',
          funFact: 'Uma única carcaça de baleia morta pelo Megalodon podia sustentar um ecossistema abissal inteiro por mais de 50 anos!'
        },
        {
          id: 'bathynomus-miocene',
          name: 'Isópode Gigante do Mioceno',
          scientific: 'Palaega / Bathynomus miocenicus',
          depth: '3.800m – 5.200m',
          sizeMeters: 0.45,
          sizeLabel: '45 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#475569', '#94a3b8', '#38bdf8'],
          summary: 'Crustáceo necrófago couraçado, parente marinho gigante dos tatuzinhos-de-jardim.',
          description: 'Rastejava em bandos pelo lodo abissal para devorar carcaças de cetáceos e tubarões que afundavam da superfície.',
          funFact: 'Consegue passar até 4 anos inteiros sem comer nada entre uma carcaça e outra no deserto abissal.'
        },
        {
          id: 'miocene-hagfish',
          name: 'Peixe-Bruxa Abissal',
          scientific: 'Myxinidae neogenica',
          depth: '4.000m – 5.800m',
          sizeMeters: 0.7,
          sizeLabel: '70 cm',
          diet: 'Detritívoro',
          shape: 'eel',
          colors: ['#701a75', '#a21caf', '#f0abfc'],
          summary: 'Vertebrado sem mandíbula que produz litros de muco sufocante em segundos para afastar tubarões abissais.',
          description: 'Dá um nó no próprio corpo para ganhar alavanca e arrancar pedaços de carne de grandes carcaças no fundo do mar.',
          funFact: 'É o único animal conhecido que possui crânio, mas não possui coluna vertebral verdadeira!'
        },
        {
          id: 'chimaera-abyssal',
          name: 'Quimera-Fantasma Abissal',
          scientific: 'Hydrolagus & Edaphodon',
          depth: '4.000m – 5.000m',
          sizeMeters: 1.5,
          sizeLabel: '1,5 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#312e81', '#6366f1', '#a5b4fc'],
          summary: 'Peixe cartilaginoso parente distante dos tubarões, com espinho venenoso na barbatana dorsal e placas dentárias trituradoras.',
          description: 'Planava sobre o fundo abissal usando grandes nadadeiras peitorais como asas para procurar caranguejos e moluscos.',
          funFact: 'As linhas sensoriais em seu rosto parecem costuras, dando-lhe o apelido de "Tubarão-Fantasma".'
        }
      ],
      hadopelagic: [
        {
          id: 'abyssal-grenadier-mio',
          name: 'Granadeiro-Abissal do Neógeno',
          scientific: 'Coryphaenoides ancestralis',
          depth: '6.000m – 7.500m',
          sizeMeters: 0.9,
          sizeLabel: '90 cm',
          diet: 'Detritívoro',
          shape: 'eel',
          colors: ['#1e293b', '#64748b', '#38bdf8'],
          summary: 'Peixe de cauda longa em forma de chicote e linha lateral hipersensível às vibrações na fossa oceânica.',
          description: 'Patrulhava as bordas das fossas tectônicas em formação durante o Mioceno, guiado pelo olfato apurado.',
          funFact: 'Consegue detectar o odor de uma carcaça a vários quilômetros de distância através das lentas correntes hadais.'
        },
        {
          id: 'yeti-crab-vent',
          name: 'Caranguejo-Yeti das Chaminés Hidrotermais',
          scientific: 'Kiwaidae ancestralis',
          depth: '6.000m – 8.200m',
          sizeMeters: 0.18,
          sizeLabel: '18 cm',
          diet: 'Filtrador',
          shape: 'crab',
          colors: ['#cbd5e1', '#f8fafc', '#fbbf24'],
          summary: 'Crustáceo branco e cego cujas garras peludas cultivam jardins de bactérias comedoras de enxofre.',
          description: 'Balança ritmicamente os braços peludos sobre a água quente que jorra das fissuras vulcânicas para oxigenar suas bactérias simbióticas, que depois ele raspa e come.',
          funFact: 'Literalmente "planta e colhe" sua própria comida nas próprias garras!'
        },
        {
          id: 'hadal-crinoid-mio',
          name: 'Lírio-do-Mar Pedunculado Hadal',
          scientific: 'Bathycrinus',
          depth: '6.500m – 9.800m',
          sizeMeters: 0.5,
          sizeLabel: '50 cm',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#854d0e', '#eab308', '#fef08a'],
          summary: 'Equinodermo em forma de flor ancorado na rocha das fossas oceânicas profundas.',
          description: 'Abre sua coroa de braços plumosos contra a corrente abissal para capturar partículas microscópicas.',
          funFact: 'Apesar de parecerem plantas marinhas, são animais parentes das estrelas-do-mar.'
        }
      ]
    }
  },

  // ============================================================================
  // ÉPOCA 3: CRETÁCEO SUPERIOR (100 – 75 Ma) — 21 ANIMAIS
  // ============================================================================
  {
    id: 'cretaceo',
    name: 'Cretáceo Superior',
    shortLabel: 'Cretáceo',
    timeAgo: '100 – 75 Milhões de Anos Atrás',
    skyHue: 182,
    seaLevel: '+170m (Mares Epicontinentais)',
    surfaceTemp: '28 °C',
    oxygen: '25%',
    heroTitle: 'Mares do Cretáceo — Répteis Marinhos Gigantes & Amonites',
    summary: 'Sem calotas polares, o mar era 170 metros mais alto e cobria grande parte dos continentes. Mosassauros, plesiossauros, tartarugas de 4 metros e amonites dominavam as águas.',
    zones: {
      epipelagic: [
        {
          id: 'mosasaurus',
          name: 'Mosassauro',
          scientific: 'Mosasaurus hoffmannii',
          depth: '0m – 200m',
          sizeMeters: 17.0,
          sizeLabel: 'Até 17,0 m',
          diet: 'Predador Ápice',
          shape: 'mosasaur',
          colors: ['#065f46', '#047857', '#34d399'],
          summary: 'Lagarto marinho colossal no topo da cadeia alimentar do Cretáceo, com segunda fileira de dentes no céu da boca.',
          description: 'Parente distante dos dragões-de-komodo e serpentes, possuía quatro nadadeiras em remo e cauda propulsora potente.',
          funFact: 'Seus dentes pterigóideos no palato impediam que qualquer presa escorregadia escapasse enquanto ele engolia.'
        },
        {
          id: 'elasmosaurus',
          name: 'Elasmossauro',
          scientific: 'Elasmosaurus platyurus',
          depth: '0m – 180m',
          sizeMeters: 14.0,
          sizeLabel: '14,0 m (pescoço de 7m)',
          diet: 'Carnívoro',
          shape: 'plesiosaur',
          colors: ['#0f766e', '#14b8a6', '#5eead4'],
          summary: 'Plesiossauro com 72 vértebras cervicais — o pescoço mais longo proporcionalmente entre todos os animais marinhos.',
          description: 'Aproximava sua pequena cabeça repleta de dentes finos de cardumes de peixes antes que eles percebessem o corpo volumoso.',
          funFact: 'Engolia pedras arredondadas (gastrólitos) para ajudar a triturar alimentos no estômago.'
        },
        {
          id: 'xiphactinus',
          name: 'Xiphactinus ("Peixe-Bulldog")',
          scientific: 'Xiphactinus audax',
          depth: '0m – 200m',
          sizeMeters: 6.0,
          sizeLabel: 'Até 6,0 m',
          diet: 'Predador Ápice',
          shape: 'tuna',
          colors: ['#1e3a8a', '#3b82f6', '#fbbf24'],
          summary: 'Peixe ósseo feroz de 6 metros com presas caninas que engolia presas de 2 metros inteiras.',
          description: 'Nadador explosivo do Mar Interior Ocidental há 85 milhões de anos, combinava velocidade de marlim com mandíbulas voltadas para cima.',
          funFact: 'O fóssil mais famoso mostra um Xiphactinus de 4m que morreu engasgado após engolir um peixe de 1,8m inteiro!'
        },
        {
          id: 'archelon',
          name: 'Archelon (Tartaruga Marinha Gigante)',
          scientific: 'Archelon ischyros',
          depth: '0m – 150m',
          sizeMeters: 4.6,
          sizeLabel: '4,6 m de comprimento',
          diet: 'Carnívoro',
          shape: 'turtle',
          colors: ['#78350f', '#d97706', '#fde68a'],
          summary: 'A maior tartaruga que já existiu na Terra, com mais de 2 toneladas e envergadura de nadadeiras de 5 metros.',
          description: 'Possuía um bico curvo poderoso capaz de esmagar conchas de amonites e lulas flutuantes nos mares rasos.',
          funFact: 'Em vez de casco ósseo maciço, tinha uma estrutura esquelética revestida por couro espesso, igual à tartaruga-de-couro atual.'
        },
        {
          id: 'kronosaurus',
          name: 'Kronossauro',
          scientific: 'Kronosaurus queenslandicus',
          depth: '0m – 200m',
          sizeMeters: 10.5,
          sizeLabel: '10,5 m',
          diet: 'Predador Ápice',
          shape: 'mosasaur',
          colors: ['#7f1d1d', '#b91c1c', '#fca5a5'],
          summary: 'Pliossauro de pescoço curto e crânio gigantesco de quase 3 metros de comprimento.',
          description: 'Com dentes cônicos do tamanho de bananas, caçava elasmossauros, tartarugas marinhas e tubarões no Mar de Eromanga.',
          funFact: 'Seu nome homenageia Cronos, o rei dos Titãs da mitologia grega.'
        }
      ],
      mesopelagic: [
        {
          id: 'parapuzosia',
          name: 'Amonite Gigante (Parapuzosia)',
          scientific: 'Parapuzosia seppenradensis',
          depth: '200m – 700m',
          sizeMeters: 2.5,
          sizeLabel: 'Concha de 2,5 m',
          diet: 'Carnívoro',
          shape: 'ammonite',
          colors: ['#b45309', '#f59e0b', '#fde68a'],
          summary: 'O maior amonite da história: sua concha espiralada tinha câmaras internas de gás que funcionavam como um submarino.',
          description: 'Bombeava líquido para dentro e para fora das câmaras da concha através de um tubo chamado sifúnculo, ajustando sua profundidade.',
          funFact: 'Pesava mais de 1.400 kg em vida e impulsionava-se para trás usando jatos de água pelo sifão.'
        },
        {
          id: 'cretoxyrhina',
          name: 'Tubarão-Ginsu',
          scientific: 'Cretoxyrhina mantelli',
          depth: '150m – 800m',
          sizeMeters: 8.0,
          sizeLabel: 'Até 8,0 m',
          diet: 'Predador Ápice',
          shape: 'shark',
          colors: ['#312e81', '#4f46e5', '#a5b4fc'],
          summary: 'Apelidado de "Tubarão-Ginsu" por seus dentes lisos como navalhas que fatiavam até placas ósseas de plesiossauros.',
          description: 'Possuía olhos grandes adaptados para caçar tanto na superfície quanto nas profundezas mesopelágicas a mais de 600 metros.',
          funFact: 'Marcas de mordida provam que ele atacava até mosassauros e dinossauros levados ao mar.'
        },
        {
          id: 'ptychodus',
          name: 'Ptychodus (Tubarão-Quebra-Nozes)',
          scientific: 'Ptychodus mortoni',
          depth: '200m – 650m',
          sizeMeters: 10.0,
          sizeLabel: 'Até 10,0 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#4c1d95', '#7c3aed', '#ddd6fe'],
          summary: 'Tubarão gigante de 10 metros com pavimentos de dentes planos e rugosos feitos para triturar amonites e moluscos blindados.',
          description: 'Em vez de dentes pontiagudos, tinha até 550 dentes trituradores dispostos como um calçamento de pedras na boca.',
          funFact: 'Conseguia estalar conchas calcárias de quase 1 metro de espessura sem quebrar os próprios dentes.'
        },
        {
          id: 'leedsichthys-rel',
          name: 'Bonnerichthys (Peixe-Filtrador Gigante)',
          scientific: 'Bonnerichthys gladius',
          depth: '100m – 500m',
          sizeMeters: 6.5,
          sizeLabel: '6,5 m',
          diet: 'Filtrador',
          shape: 'manta',
          colors: ['#0369a1', '#0ea5e9', '#bae6fd'],
          summary: 'Peixe ósseo pachycormiforme que nadava de boca escancarada filtrando plâncton durante o Cretáceo.',
          description: 'Parente dos gigantes jurássicos como Leedsichthys, ocupava o nicho ecológico que mais tarde pertenceria às baleias.',
          funFact: 'Sobreviveu por 100 milhões de anos até o impacto do asteroide no fim do Cretáceo.'
        }
      ],
      bathypelagic: [
        {
          id: 'enchoteuthis',
          name: 'Enchoteuthis (Lula-Vampiro Gigante)',
          scientific: 'Enchoteuthis melanae',
          depth: '1.000m – 2.500m',
          sizeMeters: 3.5,
          sizeLabel: 'Até 3,5 m',
          diet: 'Carnívoro',
          shape: 'squid',
          colors: ['#701a75', '#c026d3', '#f0abfc'],
          summary: 'Parente gigante da atual lula-vampiro-do-inferno, caçando na escuridão batipelágica do Cretáceo.',
          description: 'Possuía oito braços robustos conectados por uma membrana e uma estrutura interna rígida (gládio) em forma de folha.',
          funFact: 'Era uma das presas favoritas de répteis marinhos mergulhadores como tilossauros.'
        },
        {
          id: 'diplomoceras',
          name: 'Diplomoceras (Amonite Clipe-de-Papel)',
          scientific: 'Diplomoceras maximum',
          depth: '1.000m – 2.000m',
          sizeMeters: 1.8,
          sizeLabel: '1,8 m',
          diet: 'Filtrador',
          shape: 'eel',
          colors: ['#92400e', '#f59e0b', '#fef08a'],
          summary: 'Amonite heteromorfo cuja concha não era espiral, mas dobrada em ziguezague exatamente como um clipe de papel gigante!',
          description: 'Flutuava verticalmente nas águas frias e profundas, capturando plâncton e pequenos crustáceos com seus tentáculos.',
          funFact: 'Análises isotópicas da concha revelam que um único indivíduo podia viver mais de 200 anos nas profundezas!'
        },
        {
          id: 'protoshyraena',
          name: 'Protosphyraena (Peixe-Espada Dente-de-Sabre)',
          scientific: 'Protosphyraena perniciosa',
          depth: '800m – 1.600m',
          sizeMeters: 3.0,
          sizeLabel: '3,0 m',
          diet: 'Carnívoro',
          shape: 'tuna',
          colors: ['#1e293b', '#0284c7', '#38bdf8'],
          summary: 'Peixe dotado de um longo rostro pontiagudo como o peixe-espada, mas armado com dentes afiados projetados para a frente.',
          description: 'Suas nadadeiras peitorais eram longas, rígidas e serrilhadas como foices ósseas.',
          funFact: 'Apesar de parecer um marlim moderno, pertencia a uma família totalmente extinta de peixes mesozoicos.'
        },
        {
          id: 'chlamydoselachus-cret',
          name: 'Tubarão-Cobra do Cretáceo',
          scientific: 'Chlamydoselachus thomsoni',
          depth: '1.200m – 3.000m',
          sizeMeters: 2.0,
          sizeLabel: '2,0 m',
          diet: 'Carnívoro',
          shape: 'eel',
          colors: ['#18181b', '#3f3f46', '#2dd4bf'],
          summary: 'Caçador furtivo de águas profundas que sobreviveu ao cataclismo que extinguiu os mosassauros da superfície.',
          description: 'Seu fígado gigante rico em óleos de baixa densidade permitia flutuar na zona da meia-noite sem gastar energia.',
          funFact: 'É um dos vertebrados mais antigos ainda vivos em gênero no planeta.'
        }
      ],
      abyssopelagic: [
        {
          id: 'inoceramus-abyss',
          name: 'Bivalves Gigantes Inoceramus',
          scientific: 'Inoceramus steenstrupi',
          depth: '3.500m – 5.000m',
          sizeMeters: 1.8,
          sizeLabel: 'Concha de 1,8 m',
          diet: 'Filtrador',
          shape: 'trilobite',
          colors: ['#475569', '#94a3b8', '#2dd4bf'],
          summary: 'Moluscos com conchas do tamanho de mesas de jantar que prosperavam em fundos oceânicos com baixíssimo oxigênio.',
          description: 'Nos oceanos quentes do Cretáceo, sobreviviam graças a brânquias gigantes com bactérias quimiossintéticas.',
          funFact: 'Fósseis mostram cardumes inteiros de pequenos peixes abissais fossilizados dentro de suas conchas!'
        },
        {
          id: 'cretaceous-sea-lily',
          name: 'Uintacrinus (Lírio-do-Mar Abissal)',
          scientific: 'Uintacrinus socialis',
          depth: '4.000m – 5.200m',
          sizeMeters: 1.2,
          sizeLabel: 'Braços de 1,2 m',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#be185d', '#f472b6', '#fbcfe8'],
          summary: 'Crinoide sem haste com dez braços plumosos de mais de um metro que formava tapetes sobre o lodo profundo.',
          description: 'Capturava a abundante neve marinha que caía dos mares produtivos do Cretáceo.',
          funFact: 'Lajes inteiras de calcário preservam dezenas desses lírios-do-mar entrelaçados como uma pintura.'
        },
        {
          id: 'eryonid-lobster',
          name: 'Lagosta-Cega Abissal (Polichelídeo)',
          scientific: 'Palaeopentacheles / Eryonidae',
          depth: '4.000m – 5.600m',
          sizeMeters: 0.25,
          sizeLabel: '25 cm',
          diet: 'Detritívoro',
          shape: 'crab',
          colors: ['#991b1b', '#ef4444', '#fca5a5'],
          summary: 'Crustáceo achatado com garras em todos os quatro primeiros pares de patas.',
          description: 'Quando os répteis marinhos e peixes ósseos dominaram as águas rasas no Mesozoico, essa linhagem antiga refugiou-se no abismo.',
          funFact: 'Seus descendentes diretos ainda vivem hoje a 4.000 metros de profundidade.'
        },
        {
          id: 'plesiosaur-fall-scavenger',
          name: 'Necrófagos de Carcaças de Plesiossauros',
          scientific: 'Squalicorax & Hexanchidae abissais',
          depth: '3.500m – 4.800m',
          sizeMeters: 4.0,
          sizeLabel: 'Até 4,0 m',
          diet: 'Detritívoro',
          shape: 'shark',
          colors: ['#334155', '#64748b', '#94a3b8'],
          summary: 'Antes de existirem baleias, os ecossistemas do fundo abissal dependiam das carcaças gigantes de plesiossauros e mosassauros.',
          description: 'Tubarões de seis fendas branquiais e invertebrados limpavam os esqueletos reptilianos no fundo escuro.',
          funFact: 'Ossos fósseis de plesiossauros mostram perfurações idênticas às feitas pelos vermes Osedax atuais!'
        }
      ],
      hadopelagic: [
        {
          id: 'cretaceous-vent-worms',
          name: 'Vermes Tubulares Hidrotermais Mesozoicos',
          scientific: 'Vestimentifera cretacea',
          depth: '6.000m – 9.500m',
          sizeMeters: 1.5,
          sizeLabel: 'Tubos de 1,5 m',
          diet: 'Filtrador',
          shape: 'eel',
          colors: ['#991b1b', '#ef4444', '#fca5a5'],
          summary: 'Intenso vulcanismo submarino durante a separação da Pangeia alimentava florestas densas de vermes tubulares.',
          description: 'Enquanto o asteroide devastava a superfície há 66 milhões de anos, as comunidades hadais movidas a enxofre vulcânico continuaram prosperando.',
          funFact: 'A intensa atividade das dorsais oceânicas do Cretáceo foi a razão para o nível do mar ser 170 metros mais alto!'
        },
        {
          id: 'hadal-monoplacophoran',
          name: 'Neopilina (Molusco "Fóssil Vivo" Hadal)',
          scientific: 'Tryblidiida / Neopilina',
          depth: '6.000m – 7.000m',
          sizeMeters: 0.04,
          sizeLabel: '4 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#0f766e', '#2dd4bf', '#99f6e4'],
          summary: 'Molusco primitivo com concha única em forma de chapéu e órgãos internos repetidos em série.',
          description: 'Considerado extinto desde o Paleozoico, refugiou-se nas fossas hadais durante o Mesozoico e sobrevive lá até hoje.',
          funFact: 'Sua redescoberta viva em uma fossa profunda em 1952 foi um dos maiores choques da zoologia moderna!'
        },
        {
          id: 'cretaceous-brittle-star',
          name: 'Ofiuroide Abissal (Estrela-Serpente)',
          scientific: 'Ophiuroidea hadalis',
          depth: '6.200m – 8.800m',
          sizeMeters: 0.3,
          sizeLabel: '30 cm',
          diet: 'Detritívoro',
          shape: 'crab',
          colors: ['#b45309', '#f59e0b', '#fde68a'],
          summary: 'Parentes ágeis das estrelas-do-mar que rastejavam em tapetes densos pelo fundo das fossas tectônicas.',
          description: 'Usavam seus cinco braços articulados como chicotes para caminhar rapidamente sobre o sedimento profundo.',
          funFact: 'Podem regenerar quatro braços inteiros se apenas um braço e parte do disco central sobreviverem.'
        },
        {
          id: 'hadal-foraminifera',
          name: 'Xenofióforos (Unicelulares Gigantes das Fossas)',
          scientific: 'Syringammina ancestralis',
          depth: '6.500m – 10.600m',
          sizeMeters: 0.2,
          sizeLabel: '20 cm (uma única célula!)',
          diet: 'Detritívoro',
          shape: 'jelly',
          colors: ['#374151', '#9ca3af', '#38bdf8'],
          summary: 'Organismos compostos por uma única célula multinucleada que atinge 20 centímetros de diâmetro construindo "castelos" de lodo.',
          description: 'Concentram metais pesados e minerais do sedimento das fossas mais profundas do planeta.',
          funFact: 'São os maiores seres vivos unicelulares que existem na Terra!'
        }
      ]
    }
  },
  // ============================================================================
  // ÉPOCA 4: DEVONIANO ("ERA DOS PEIXES" ~380 Ma) — 20 ANIMAIS
  // ============================================================================
  {
    id: 'devoniano',
    name: 'Devoniano ("Era dos Peixes")',
    shortLabel: 'Devoniano',
    timeAgo: '380 Milhões de Anos Atrás',
    skyHue: 165,
    seaLevel: '+120m acima do atual',
    surfaceTemp: '26 °C',
    oxygen: '19%',
    heroTitle: 'Oceano Devoniano — A Grande Era dos Peixes Couraçados',
    summary: 'Antes dos dinossauros existirem na terra, os oceanos explodiram em diversidade de peixes: monstros encouraçados sem dentes verdadeiros, tubarões bizarros, escorpiões marinhos gigantes e os primeiros tetrápodes.',
    zones: {
      epipelagic: [
        {
          id: 'dunkleosteus',
          name: 'Dunkleosteus',
          scientific: 'Dunkleosteus terrelli',
          depth: '0m – 200m',
          sizeMeters: 6.0,
          sizeLabel: '5,0 a 6,0 m',
          diet: 'Predador Ápice',
          shape: 'placoderm',
          colors: ['#7c2d12', '#c2410c', '#fb923c'],
          summary: 'O tanque de guerra blindado do Devoniano: cabeça revestida de placas ósseas espessas e lâminas autoafiáveis no lugar de dentes.',
          description: 'Abria a boca em apenas 20 milésimos de segundo, criando um vácuo de sucção que puxava tubarões e outros peixes blindados direto para suas guilhotinas ósseas.',
          funFact: 'A pressão concentrada na ponta de suas lâminas ósseas era suficiente para partir armaduras dérmicas de outros placodermos ao meio!'
        },
        {
          id: 'stethacanthus',
          name: 'Stethacanthus ("Tubarão-Bigorna")',
          scientific: 'Stethacanthus altonensis',
          depth: '0m – 150m',
          sizeMeters: 1.2,
          sizeLabel: '1,2 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#3f6212', '#65a30d', '#bef264'],
          summary: 'Tubarão primitivo famoso por sua barbatana dorsal em formato de bigorna coberta por dentículos ásperos.',
          description: 'O topo da "bigorna" e o alto da cabeça dos machos eram cobertos por escamas pontiagudas usadas em exibições ou defesa.',
          funFact: 'Possuía longos "chicotes" cartilaginosos saindo das nadadeiras peitorais.'
        },
        {
          id: 'tiktaalik',
          name: 'Tiktaalik (Nas Margens Costeiras Rasas)',
          scientific: 'Tiktaalik roseae',
          depth: '0m – 30m',
          sizeMeters: 2.0,
          sizeLabel: 'Até 2,0 m',
          diet: 'Carnívoro',
          shape: 'mosasaur',
          colors: ['#713f12', '#ca8a04', '#fde047'],
          summary: 'O famoso elo evolutivo entre os peixes de nadadeiras lobadas e os primeiros vertebrados terrestres de quatro patas.',
          description: 'Tinha escamas e brânquias de peixe, mas também pulmões primitivos, pescoço móvel, costelas robustas e pulsos articulados.',
          funFact: 'Olhos posicionados no topo da cabeça achatada permitiam espiar fora d’água nas margens pantanosas.'
        },
        {
          id: 'jaekelopterus',
          name: 'Jaekelopterus (Escorpião-Marinho Gigante)',
          scientific: 'Jaekelopterus rhenaniae',
          depth: '0m – 80m',
          sizeMeters: 2.5,
          sizeLabel: '2,5 m',
          diet: 'Predador Ápice',
          shape: 'anomalocaris',
          colors: ['#7f1d1d', '#dc2626', '#fca5a5'],
          summary: 'O maior artrópode que já existiu na história da Terra, superando a altura de um ser humano adulto!',
          description: 'Este euripterídeo emboscava peixes couraçados em estuários e mares costeiros usando duas garras dentadas de 46 centímetros.',
          funFact: 'Era maior até mesmo que a famosa centopeia gigante Arthropleura do Carbonífero.'
        },
        {
          id: 'hyneria',
          name: 'Hyneria',
          scientific: 'Hyneria lindae',
          depth: '0m – 120m',
          sizeMeters: 3.5,
          sizeLabel: '3,5 m',
          diet: 'Predador Ápice',
          shape: 'tuna',
          colors: ['#065f46', '#10b981', '#6ee7b7'],
          summary: 'Peixe de nadadeiras lobadas gigante de quase duas toneladas, armado com presas de 5 cm na ponta do focinho.',
          description: 'Usava suas nadadeiras musculosas para impulsionar o corpo em águas rasas e turvas, caçando tubarões primitivos e primeiros anfíbios como Hynerpeton.',
          funFact: 'Possuía enormes câmaras sensoriais no crânio para detectar as vibrações de presas em águas barrentas.'
        }
      ],
      mesopelagic: [
        {
          id: 'coelacanth-devonian',
          name: 'Miguashaia (Celacanto Primitivo)',
          scientific: 'Miguashaia bureaui',
          depth: '200m – 700m',
          sizeMeters: 0.6,
          sizeLabel: '60 cm',
          diet: 'Carnívoro',
          shape: 'tuna',
          colors: ['#1e3a8a', '#2563eb', '#93c5fd'],
          summary: 'O pioneiro da linhagem dos celacantos, que sobreviveria a quatro grandes extinções em massa até os dias de hoje.',
          description: 'Com articulação intracraniana única que permitia levantar a parte superior do crânio ao morder.',
          funFact: 'Suas nadadeiras moviam-se de forma alternada como o trote de um cavalo.'
        },
        {
          id: 'titanichthys',
          name: 'Titanichthys',
          scientific: 'Titanichthys agassizi',
          depth: '100m – 500m',
          sizeMeters: 6.5,
          sizeLabel: 'Até 6,5 m',
          diet: 'Filtrador',
          shape: 'manta',
          colors: ['#134e4a', '#0d9488', '#5eead4'],
          summary: 'O primeiro vertebrado gigante filtrador dos oceanos, equivalente ecológico do tubarão-frade e das baleias modernas.',
          description: 'Enquanto seu parente Dunkleosteus usava mandíbulas esmagadoras, o Titanichthys evoluiu placas bucais longas para engolir enormes volumes de zooplâncton.',
          funFact: 'Mostra que o nicho de "gigante gentil filtrador" já existia há 380 milhões de anos!'
        },
        {
          id: 'cladoselache',
          name: 'Cladoselache (Tubarão-Velocista)',
          scientific: 'Cladoselache fyleri',
          depth: '150m – 600m',
          sizeMeters: 1.8,
          sizeLabel: '1,8 m',
          diet: 'Carnívoro',
          shape: 'shark',
          colors: ['#334155', '#64748b', '#38bdf8'],
          summary: 'Um dos tubarões mais bem conhecidos do registro fóssil, com até músculos e órgãos internos preservados em pedra!',
          description: 'Praticamente desprovido de escamas para reduzir o atrito, tinha quilhas laterais na cauda como os atuns modernos para fugir do Dunkleosteus.',
          funFact: 'Fósseis mostram peixes inteiros engolidos pela cauda dentro de seu estômago, provando que ele os alcançava por trás em alta velocidade.'
        },
        {
          id: 'eusthenopteron',
          name: 'Eusthenopteron',
          scientific: 'Eusthenopteron foordi',
          depth: '100m – 400m',
          sizeMeters: 1.8,
          sizeLabel: '1,8 m',
          diet: 'Carnívoro',
          shape: 'tuna',
          colors: ['#92400e', '#d97706', '#fcd34d'],
          summary: 'Peixe tetrapodomorfo cujas nadadeiras já continham exatamente os mesmos ossos do braço humano: úmero, rádio e ulna!',
          description: 'Caçador pelágico de meia-água que possuía dentes com esmalte dobrado em labirinto (dentes labirintodontes).',
          funFact: 'É um dos vertebrados fósseis mais estudados da ciência por mostrar a origem anatômica dos nossos membros.'
        }
      ],
      bathypelagic: [
        {
          id: 'orthocone-devonian',
          name: 'Nautiloide Ortocone de Profundidade',
          scientific: 'Bactrites & Michelinoceras',
          depth: '1.000m – 2.200m',
          sizeMeters: 1.5,
          sizeLabel: '1,5 m',
          diet: 'Carnívoro',
          shape: 'squid',
          colors: ['#581c87', '#9333ea', '#d8b4fe'],
          summary: 'Cefalópodes de concha reta cônica que patrulhavam a coluna de água escura fora do alcance dos placodermos.',
          description: 'Suas conchas reforçadas com septos internos suportavam a alta pressão hidrostática da zona batipelágica.',
          funFact: 'Foram desta linhagem de cefalópodes do Devoniano que surgiram os primeiros amonites!'
        },
        {
          id: 'goniatite-devonian',
          name: 'Goniatite (Primeiro Amonoide)',
          scientific: 'Manticoceras & Goniatites',
          depth: '1.000m – 2.500m',
          sizeMeters: 0.35,
          sizeLabel: '35 cm',
          diet: 'Carnívoro',
          shape: 'ammonite',
          colors: ['#9d174d', '#ec4899', '#fbcfe8'],
          summary: 'Os ancestrais diretos dos amonites, que enrolaram suas conchas para ganhar manobrabilidade em águas profundas.',
          description: 'Suas linhas de sutura internas em ziguezague reforçavam a concha contra o esmagamento hidrostático.',
          funFact: 'Essa inovação mecânica permitiu aos cefalópodes colonizar profundidades muito maiores no Devoniano.'
        },
        {
          id: 'rhamphodopsis',
          name: 'Rhamphodopsis (Quimera Couraçada)',
          scientific: 'Rhamphodopsis threiplandi',
          depth: '900m – 2.000m',
          sizeMeters: 0.15,
          sizeLabel: '15 cm',
          diet: 'Carnívoro',
          shape: 'placoderm',
          colors: ['#475569', '#94a3b8', '#2dd4bf'],
          summary: 'Placodermo ptictodontídeo de águas profundas que se assemelhava extraordinariamente às atuais quimeras abissais.',
          description: 'Possuía olhos enormes para captar o mínimo de luz e longos espinhos nas nadadeiras.',
          funFact: 'É o registro fóssil mais antigo conhecido de fecundação interna e nascimento de filhotes vivos (viviparidade) em vertebrados!'
        },
        {
          id: 'concavicaris',
          name: 'Concavicaris (Crustáceo Caçador)',
          scientific: 'Concavicaris sinuata',
          depth: '1.000m – 2.800m',
          sizeMeters: 0.2,
          sizeLabel: '20 cm',
          diet: 'Carnívoro',
          shape: 'anomalocaris',
          colors: ['#0c4a6e', '#0284c7', '#38bdf8'],
          summary: 'Artrópode tilacocefálico com carapaça pontiaguda, olhos compostos hipertrofiados e três pares de garras preênseis.',
          description: 'Emboscava pequenos peixes e cefalópodes na escuridão batipelágica do Devoniano.',
          funFact: 'Seus olhos ocupavam quase um terço da parte frontal da carapaça!'
        }
      ],
      abyssopelagic: [
        {
          id: 'glass-sponges-dev',
          name: 'Recifes Profundos de Esponjas-de-Vidro',
          scientific: 'Dictyospongia (Hexactinellida)',
          depth: '4.000m – 5.200m',
          sizeMeters: 0.8,
          sizeLabel: 'Colônias de 80 cm',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#0c4a6e', '#0284c7', '#7dd3fc'],
          summary: 'Esqueletos intrincados de sílica pura que formavam jardins cristalinos nas planícies abissais após as crises dos recifes rasos.',
          description: 'Filtravam bactérias e micropartículas orgânicas nas águas frias e silenciosas do fundo devoniano.',
          funFact: 'Suas espículas de sílica conduzem luz exatamente como cabos de fibra óptica modernos.'
        },
        {
          id: 'phacops-rana',
          name: 'Trilobita Olhos-de-Sapo (Eldredgeops)',
          scientific: 'Eldredgeops rana',
          depth: '3.500m – 4.800m',
          sizeMeters: 0.12,
          sizeLabel: '12 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#3f3f46', '#71717a', '#4ade80'],
          summary: 'Trilobita dotado de lentes esquizocroais sofisticadas que corrigiam a aberração esférica debaixo d’água.',
          description: 'Quando atacado, enrolava-se em uma esfera blindada perfeita com trava mecânica na cauda.',
          funFact: 'Seu sistema óptico inspirou físicos modernos como René Descartes e Christiaan Huygens no desenho de lentes!'
        },
        {
          id: 'terataspis-abyss',
          name: 'Terataspis (Super-Trilobita Espinhoso)',
          scientific: 'Terataspis grandis',
          depth: '3.800m – 5.000m',
          sizeMeters: 0.6,
          sizeLabel: '60 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#7c2d12', '#ea580c', '#fdba74'],
          summary: 'Um dos maiores trilobitas de todos os tempos, coberto da cabeça à cauda por tubérculos e espinhos defensivos.',
          description: 'Como os mares rasos do Devoniano estavam cheios de placodermos esmagadores, sua carapaça espinhosa funcionava como uma fortaleza ambulante no fundo.',
          funFact: 'Media mais de meio metro de comprimento, superando a maioria dos peixes de sua época.'
        },
        {
          id: 'devonian-blind-trilobite',
          name: 'Trimerocephalus (Trilobita Cego Abissal)',
          scientific: 'Trimerocephalus lelievrei',
          depth: '4.200m – 5.600m',
          sizeMeters: 0.08,
          sizeLabel: '8 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#4c1d95', '#8b5cf6', '#c4b5fd'],
          summary: 'Trilobita abissal que perdeu completamente os olhos por viver na escuridão perpétua abaixo de 4.000m.',
          description: 'Fósseis preservam filas indianas de dezenas de indivíduos caminhando juntos, guiados pelo toque das antenas nas costas do companheiro da frente.',
          funFact: 'Essas "filas indianas fósseis" de 365 milhões de anos são a evidência mais antiga de migração coletiva no abismo!'
        }
      ],
      hadopelagic: [
        {
          id: 'lingula-brachiopod',
          name: 'Braquiópodes Abissais ("Fósseis Vivos")',
          scientific: 'Lingulida',
          depth: '6.000m – 8.000m',
          sizeMeters: 0.08,
          sizeLabel: '8 cm',
          diet: 'Filtrador',
          shape: 'trilobite',
          colors: ['#064e3b', '#10b981', '#6ee7b7'],
          summary: 'Animais com duas valvas e pedúnculo carnoso que sobreviveram aos eventos anóxicos devonianos refugiados no mar profundo.',
          description: 'Apesar de parecerem moluscos bivalves, possuem anatomia interna totalmente diferente, filtrando água com um lofóforo.',
          funFact: 'O gênero Lingula permanece praticamente idêntico há mais de 400 milhões de anos!'
        },
        {
          id: 'conodont-hadal',
          name: 'Conodonte Abissal',
          scientific: 'Palmatolepis (Conodonta)',
          depth: '6.000m – 8.500m',
          sizeMeters: 0.1,
          sizeLabel: '10 cm',
          diet: 'Carnívoro',
          shape: 'eel',
          colors: ['#be123c', '#f43f5e', '#fda4af'],
          summary: 'Vertebrado primitivo semelhante a uma enguia com um aparelho bucal complexo de dentes microscópicos de apatita.',
          description: 'Seus elementos dentários eram os mais duros de todo o Paleozoico, permitindo cortar presas macias nas profundezas.',
          funFact: 'Seus minúsculos dentes mudam de cor conforme a temperatura geológica das rochas, ajudando geólogos até hoje!'
        },
        {
          id: 'devonian-vent-tube-worm',
          name: 'Tevnia Ancestral (Verme de Chaminé Paleozoico)',
          scientific: 'Polychaeta hydrothermalis',
          depth: '6.500m – 9.200m',
          sizeMeters: 0.6,
          sizeLabel: '60 cm',
          diet: 'Filtrador',
          shape: 'eel',
          colors: ['#991b1b', '#dc2626', '#fef08a'],
          summary: 'Colônias de vermes tubulares preservados em depósitos de sulfetos maciços vulcânicos dos Montes Urais.',
          description: 'Enquanto a superfície sofria o Evento Kellwasser (uma das 5 maiores extinções em massa), esses vermes prosperavam no calor geotérmico.',
          funFact: 'Fósseis de chaminés hidrotermais do Devoniano na Rússia preservam esses tubos intactos em pirita ("ouro dos tolos")!'
        }
      ]
    }
  },

  // ============================================================================
  // ÉPOCA 5: CAMBRIANO (EXPLOSÃO DA VIDA ~508 Ma) — 20 ANIMAIS
  // ============================================================================
  {
    id: 'cambriano',
    name: 'Cambriano (Explosão da Vida)',
    shortLabel: 'Cambriano',
    timeAgo: '508 Milhões de Anos Atrás',
    skyHue: 255,
    seaLevel: '+90m (Continentes Desertos)',
    surfaceTemp: '24 °C',
    oxygen: '13%',
    heroTitle: 'Oceano Cambriano — O Amanhecer dos Olhos e Predadores',
    summary: 'A terra firme era um deserto rochoso sem árvores ou animais. Toda a vida complexa explodiu nos oceanos: surgiram os primeiros olhos compostos, garras articuladas e o nosso primeiro ancestral vertebrado.',
    zones: {
      epipelagic: [
        {
          id: 'anomalocaris',
          name: 'Anomalocaris',
          scientific: 'Anomalocaris canadensis',
          depth: '0m – 150m',
          sizeMeters: 1.0,
          sizeLabel: 'Até 1,0 m',
          diet: 'Predador Ápice',
          shape: 'anomalocaris',
          colors: ['#9a3412', '#ea580c', '#2dd4bf'],
          summary: 'O primeiro superpredador da história da Terra: um gigante de 1 metro em um mundo onde quase tudo media poucos centímetros.',
          description: 'Nadava ondulando abas laterais como uma raia, possuía dois apêndices frontais articulados e olhos compostos com mais de 16.000 lentes cada.',
          funFact: 'Durante décadas, cientistas acharam suas garras, boca circular e corpo separados e pensaram que eram três animais diferentes!'
        },
        {
          id: 'pikaia',
          name: 'Pikaia (Nosso Ancestral Cordado)',
          scientific: 'Pikaia gracilens',
          depth: '10m – 180m',
          sizeMeters: 0.05,
          sizeLabel: '5 cm',
          diet: 'Filtrador',
          shape: 'eel',
          colors: ['#0284c7', '#38bdf8', '#fde047'],
          summary: 'Pequeno nadador em forma de fita que possuía notocorda — o precursor direto da coluna vertebral de todos os peixes e humanos.',
          description: 'Sem armadura pesada, dependia de seus blocos musculares em ziguezague (miômeros) para nadar rapidamente.',
          funFact: 'Se o Pikaia e seus parentes cordados tivessem sido extintos no Cambriano, nenhum vertebrado ou humano existiria!'
        },
        {
          id: 'haikouichthys',
          name: 'Haikouichthys (O Primeiro Peixe Verdadeiro)',
          scientific: 'Haikouichthys ercaicunensis',
          depth: '0m – 120m',
          sizeMeters: 0.03,
          sizeLabel: '3 cm',
          diet: 'Filtrador',
          shape: 'lanternfish',
          colors: ['#0369a1', '#38bdf8', '#bae6fd'],
          summary: 'Mais evoluído que o Pikaia, já possuía crânio definido, olhos pares, ouvido interno e brânquias estruturadas.',
          description: 'Nadava em cardumes de centenas de indivíduos nos mares rasos do que hoje é a China (Biota de Chengjiang).',
          funFact: 'É considerado pelos paleontólogos o mais antigo peixe sem mandíbula (agnato) da árvore da vida.'
        },
        {
          id: 'tamisiocaris',
          name: 'Tamisiocaris ("Baleia" do Cambriano)',
          scientific: 'Tamisiocaris borealis',
          depth: '0m – 160m',
          sizeMeters: 0.7,
          sizeLabel: '70 cm',
          diet: 'Filtrador',
          shape: 'anomalocaris',
          colors: ['#0f766e', '#14b8a6', '#5eead4'],
          summary: 'Parente gigante do Anomalocaris que trocou as garras assassinas por pentes filtradores finos para capturar plâncton.',
          description: 'Seus apêndices frontais tinham cerdas espaçadas em meio milímetro, varrendo a água como uma rede de plâncton.',
          funFact: 'Prova que a evolução de superpredadores para gigantes filtradores já acontecia há mais de 500 milhões de anos!'
        },
        {
          id: 'omnidens',
          name: 'Omnidens (O Colosso de Boca Circular)',
          scientific: 'Omnidens amplus',
          depth: '20m – 200m',
          sizeMeters: 1.5,
          sizeLabel: '1,5 m',
          diet: 'Predador Ápice',
          shape: 'anomalocaris',
          colors: ['#7f1d1d', '#b91c1c', '#fbbf24'],
          summary: 'Ainda maior que o Anomalocaris: com 1,5 metro, foi o maior animal conhecido de todo o período Cambriano.',
          description: 'Possuía um aparato bucal circular gigantesco rodeado por placas dentadas esmagadoras.',
          funFact: 'Sua boca sozinha era maior que a maioria dos trilobitas adultos da época!'
        }
      ],
      mesopelagic: [
        {
          id: 'opabinia',
          name: 'Opabinia (O Enigma de 5 Olhos)',
          scientific: 'Opabinia regalis',
          depth: '150m – 500m',
          sizeMeters: 0.07,
          sizeLabel: '7 cm',
          diet: 'Carnívoro',
          shape: 'anomalocaris',
          colors: ['#6d28d9', '#8b5cf6', '#c4b5fd'],
          summary: 'Criatura surreal com cinco olhos pedunculados na cabeça e uma tromba flexível terminada em uma garra dentada.',
          description: 'Vasculhava o sedimento das encostas marinhas usando sua probóscide como um braço de aspirador para capturar vermes.',
          funFact: 'Quando sua reconstrução foi apresentada pela primeira vez em 1972, a plateia científica riu achando que era uma brincadeira!'
        },
        {
          id: 'paradoxides',
          name: 'Trilobita Gigante Paradoxides',
          scientific: 'Paradoxides davidis',
          depth: '100m – 600m',
          sizeMeters: 0.45,
          sizeLabel: '45 cm',
          diet: 'Carnívoro',
          shape: 'trilobite',
          colors: ['#78350f', '#d97706', '#fcd34d'],
          summary: 'Colosso entre os trilobitas cambrianos, com carapaça articulada de calcita e olhos de cristal mineral.',
          description: 'Seus olhos eram feitos de cristais puros de calcita inorgânica orientados no eixo óptico perfeito.',
          funFact: 'Os trilobitas foram os primeiros animais a desenvolver olhos capazes de formar imagens nítidas.'
        },
        {
          id: 'hurdia',
          name: 'Hurdia (Predador com Escudo Frontal)',
          scientific: 'Hurdia victoria',
          depth: '200m – 650m',
          sizeMeters: 0.5,
          sizeLabel: '50 cm',
          diet: 'Carnívoro',
          shape: 'anomalocaris',
          colors: ['#1e3a8a', '#3b82f6', '#93c5fd'],
          summary: 'Radiodonta cuja cabeça carregava uma enorme carapaça oca em forma de proa de navio projetada para a frente.',
          description: 'Patrulhava águas mesopelágicas usando sua boca circular em camadas ("cone de abacaxi") para triturar presas.',
          funFact: 'Seu escudo frontal era tão grande que inicialmente foi classificado como a carapaça de um crustáceo gigante.'
        },
        {
          id: 'nectocaris',
          name: 'Nectocaris',
          scientific: 'Nectocaris pteryx',
          depth: '200m – 800m',
          sizeMeters: 0.07,
          sizeLabel: '7 cm',
          diet: 'Carnívoro',
          shape: 'squid',
          colors: ['#831843', '#db2777', '#f9a8d4'],
          summary: 'Criatura em forma de pipa com dois tentáculos longos, olhos pedunculados e um funil de propulsão a jato.',
          description: 'Nadava exatamente como as lulas e chocos modernos, ondulando barbatanas laterais e ejetando água por um sifão.',
          funFact: 'É um dos fósseis mais debatidos da paleontologia sobre a origem dos primeiros cefalópodes.'
        }
      ],
      bathypelagic: [
        {
          id: 'hallucigenia',
          name: 'Hallucigenia',
          scientific: 'Hallucigenia sparsa',
          depth: '800m – 1.800m',
          sizeMeters: 0.05,
          sizeLabel: '5 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#be123c', '#f43f5e', '#2dd4bf'],
          summary: 'Verme lobopódio protegido por duas fileiras de espinhos dorsais longos e rígidos contra predadores.',
          description: 'Caminhava com sete ou oito pares de pernas terminadas em garras sobre esponjas nas águas profundas.',
          funFact: 'Por décadas foi desenhado de cabeça para baixo (achavam que os espinhos das costas eram pernas) e de trás para frente!'
        },
        {
          id: 'marrella',
          name: 'Marrella ("Caranguejo-de-Renda")',
          scientific: 'Marrella splendens',
          depth: '600m – 1.500m',
          sizeMeters: 0.025,
          sizeLabel: '2,5 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#0e7490', '#06b6d4', '#67e8f9'],
          summary: 'Artrópode delicado com quatro grandes chifres curvados para trás e brilho iridescente metálico.',
          description: 'Redes de difração microscópicas preservadas nos fósseis mostram que sua carapaça refletia luz multicolorida.',
          funFact: 'É o fóssil mais abundante do famoso depósito de Burgess Shale, com mais de 25.000 exemplares encontrados.'
        },
        {
          id: 'wiwaxia',
          name: 'Wiwaxia (Bola Blindada de Escamas e Espadas)',
          scientific: 'Wiwaxia corrugata',
          depth: '800m – 2.000m',
          sizeMeters: 0.05,
          sizeLabel: '5 cm',
          diet: 'Detritívoro',
          shape: 'crab',
          colors: ['#854d0e', '#eab308', '#fef08a'],
          summary: 'Molusco primitivo revestido por uma cota de malha de escamas estriadas e duas fileiras de espinhos como adagas.',
          description: 'Rastejava pelo fundo escuro raspando tapetes bacterianos com uma língua dentada (rádula).',
          funFact: 'Pequenos braquiópodes fósseis já foram encontrados crescendo presos aos seus espinhos dorsais!'
        },
        {
          id: 'sanctacaris',
          name: 'Sanctacaris (Ancestral dos Quelicerados)',
          scientific: 'Sanctacaris uncata',
          depth: '900m – 2.200m',
          sizeMeters: 0.1,
          sizeLabel: '10 cm',
          diet: 'Carnívoro',
          shape: 'anomalocaris',
          colors: ['#312e81', '#6366f1', '#a5b4fc'],
          summary: 'Predador de águas profundas com uma bateria de seis pares de apêndices frontais espinhosos para agarrar presas.',
          description: 'Parente ancestral da linhagem que daria origem aos caranguejos-ferradura, escorpiões e aranhas.',
          funFact: 'Seu apelido entre os descobridores era "Santa Claws" (Papai Noel de Garras).'
        }
      ],
      abyssopelagic: [
        {
          id: 'chancelloria',
          name: 'Chancelloriídeos Estelares',
          scientific: 'Chancelloria eros',
          depth: '3.500m – 5.000m',
          sizeMeters: 0.15,
          sizeLabel: '15 cm',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#3730a3', '#6366f1', '#a5b4fc'],
          summary: 'Criaturas sésseis cobertas por escleritos em forma de estrelas de seis pontas.',
          description: 'Ancoravam-se no lodo profundo filtrando nutrientes em suspensão; quando ameaçados, contraíam o corpo eriçando suas estrelas.',
          funFact: 'Não possuíam órgãos internos conhecidos além de uma cavidade central.'
        },
        {
          id: 'ottoia',
          name: 'Ottoia (Verme-Pênis Carnívoro)',
          scientific: 'Ottoia prolifica',
          depth: '3.200m – 4.800m',
          sizeMeters: 0.15,
          sizeLabel: '15 cm',
          diet: 'Carnívoro',
          shape: 'eel',
          colors: ['#9f1239', '#fb7185', '#ffe4e6'],
          summary: 'Verme priapulídeo escavador que vivia em tocas em forma de "U" no lodo abissal pobre em oxigênio.',
          description: 'Projetava uma tromba reversível armada com fileiras de ganchos e dentes para puxar trilobitas e braquiópodes para dentro da toca.',
          funFact: 'Fósseis preservam o conteúdo do seu intestino, mostrando que praticavam até canibalismo!'
        },
        {
          id: 'dinomischus',
          name: 'Dinomischus (Cálice Filtrador do Abismo)',
          scientific: 'Dinomischus isolatus',
          depth: '3.800m – 5.200m',
          sizeMeters: 0.1,
          sizeLabel: '10 cm',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#065f46', '#10b981', '#6ee7b7'],
          summary: 'Animal em forma de taça de vinho sustentado por uma longa haste rígida fincada no fundo do mar.',
          description: 'Dezoito pétalas rígidas ao redor do cálice criavam correntes de água para direcionar partículas orgânicas até a boca central.',
          funFact: 'Tanto a boca quanto o ânus ficavam dentro da mesma coroa de pétalas.'
        },
        {
          id: 'agnosid-trilobite',
          name: 'Agnostus (Micro-Trilobita Cego Abissal)',
          scientific: 'Agnostus pisiformis',
          depth: '4.000m – 5.800m',
          sizeMeters: 0.01,
          sizeLabel: '1 cm',
          diet: 'Detritívoro',
          shape: 'trilobite',
          colors: ['#475569', '#94a3b8', '#38bdf8'],
          summary: 'Artrópode cego cuja cabeça e cauda tinham exatamente o mesmo formato, fechando-se como uma concha.',
          description: 'Habitava em quantidades astronômicas as zonas profundas e escuras de todos os oceanos cambrianos do planeta.',
          funFact: 'Por serem globais e abundantes, são usados por geólogos do mundo todo para datar rochas do Cambriano.'
        }
      ],
      hadopelagic: [
        {
          id: 'cambrian-archaean-mats',
          name: 'Tapetes Microbianos & Arqueias Quimiossintéticas',
          scientific: 'Consórcios Quimiolitotróficos Abissais',
          depth: '6.000m – 10.000m',
          sizeMeters: 0.5,
          sizeLabel: 'Colônias de 0,5 m',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#065f46', '#10b981', '#34d399'],
          summary: 'Nas fossas mais profundas e sem oxigênio do Cambriano, tapetes bacterianos e arqueias dominavam as chaminés vulcânicas.',
          description: 'Como os oceanos profundos do Cambriano tinham bolsões pobres em oxigênio, microrganismos extremófilos sustentavam a base da vida hadal.',
          funFact: 'Foram esses ecossistemas hidrotermais primordiais que provavelmente deram origem à própria vida na Terra!'
        },
        {
          id: 'vauxia-sponge-hadal',
          name: 'Vauxia (Esponja Arbustiva de Profundidade)',
          scientific: 'Vauxia gracilenta',
          depth: '6.000m – 7.800m',
          sizeMeters: 0.2,
          sizeLabel: '20 cm',
          diet: 'Filtrador',
          shape: 'jelly',
          colors: ['#0c4a6e', '#0ea5e9', '#7dd3fc'],
          summary: 'Esponja colonial ramificada cujo esqueleto era tecido por fibras resistentes semelhantes a quitina.',
          description: 'Formava pequenos bosques nas encostas das fossas profundas onde a água fria trazia sílica e minerais.',
          funFact: 'Análises químicas encontraram vestígios de quitina original intacta em seus fósseis de 508 milhões de anos!'
        },
        {
          id: 'louisella-hadal',
          name: 'Louisella (Verme de Brânquias Duplas)',
          scientific: 'Louisella pedunculata',
          depth: '6.200m – 8.500m',
          sizeMeters: 0.25,
          sizeLabel: '25 cm',
          diet: 'Detritívoro',
          shape: 'eel',
          colors: ['#4c1d95', '#7c3aed', '#ddd6fe'],
          summary: 'Grande verme escavador dotado de duas longas fileiras de plumas branquiais para respirar em águas quase sem oxigênio.',
          description: 'Afundava o corpo no lodo hadal deixando apenas suas brânquias plumosas de fora para captar o mínimo de oxigênio disponível.',
          funFact: 'Era um dos maiores habitantes dos fundos lodosos profundos do Cambriano.'
        }
      ]
    }
  }
];
