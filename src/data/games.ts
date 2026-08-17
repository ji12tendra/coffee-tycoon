import { Game, QuizQuestion } from '../types';

export const SIMULATION_GAMES: Game[] = [
  {
    id: 'euro-truck-simulator-2',
    title: 'Euro Truck Simulator 2',
    category: 'driving_vehicle',
    categoryName: { en: 'Vehicle & Logistics', hi: 'Vehicle & Driving Sim' },
    tagline: {
      en: 'The ultimate chill driving & logistics empire simulator across Europe.',
      hi: 'Europe ke khoobsurat highways par truck chalaane aur transport business banane ka sukoon bhara sim.'
    },
    description: {
      en: 'Travel across Europe as king of the road, delivering cargo across impressive distances! Build your own fleet of trucks, hire drivers, and explore dozens of realistic cities while listening to real internet radio stations.',
      hi: 'Europe ke shandar highways par truck chalate hue cargo deliver karein. Truck customize karein, apni logistics company banayein, drivers hire karein aur radio sunte hue scenic long drives ka maza lein.'
    },
    whyPlay: {
      en: [
        'Extremely therapeutic, relaxing, and stress-busting gameplay',
        'Supports steering wheels, VR, and real internet radio streams',
        'Deep modding community with 1:1 map extensions (ProMods)'
      ],
      hi: [
        'Stress door karne aur relax karne ke liye duniya ka sabse behtareen game',
        'Steering wheel aur real Indian / World radio stations support karta hai',
        'Halki PC par bhi smooth chalta hai'
      ]
    },
    rating: 4.9,
    steamRating: 'Overwhelmingly Positive (97%)',
    releaseYear: 2012,
    developer: 'SCS Software',
    publisher: 'SCS Software',
    platforms: ['pc', 'steam_deck'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: 'Runs smoothly even on budget laptops and integrated graphics.',
      hi: 'Purane laptop aur basic specs par bhi smooth chalta hai.'
    },
    vibe: ['relaxing', 'realistic', 'strategic'],
    difficulty: 'Casual',
    difficultyHi: 'Aasan / Relaxing',
    timeSinkHours: '200+ Hours',
    priceType: 'Paid',
    badge: 'Zen & Relaxation Masterpiece',
    imageBanner: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0f766e', '#1e293b'],
    iconName: 'Truck',
    keyFeatures: {
      en: ['60+ European cities', 'Authentic truck physics & customizable engines', 'Business empire expansion'],
      hi: ['60+ European shehar', 'Asli truck physics aur customizable parts', 'Apni logistics company badhana']
    },
    systemRequirementsMin: {
      os: 'Windows 7/8.1/10 64-bit',
      processor: 'Dual core CPU 2.4 GHz',
      ram: '4 GB RAM',
      graphics: 'GeForce GTS 450-class (Intel HD 4000)'
    },
    similarGames: ['American Truck Simulator', 'SnowRunner', 'BeamNG.drive']
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    category: 'cozy_farming',
    categoryName: { en: 'Cozy Life & Farming', hi: 'Cozy Life & Farming Sim' },
    tagline: {
      en: 'Escape modern corporate life to build your dream farm in Pelican Town.',
      hi: 'Corporate stress chhodkar gaon me apna dream farm, dosti aur nayi zindagi banayein.'
    },
    description: {
      en: 'You\'ve inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, can you turn these overgrown fields into a thriving paradise while befriending charming villagers and exploring mysterious caves?',
      hi: 'Dada ji ka purana farm aapke naam hua hai. Kheti karein, fasal ugayein, janwar paalein, mining karein, gaon walo se dosti karein, shaadi karein aur sukoon bhari gaon ki life jeeyein.'
    },
    whyPlay: {
      en: [
        'Endless cozy warmth, charming music, and zero anxiety gameplay',
        '4-player co-op multiplayer to farm and explore with friends',
        'Works on virtually every device (PC, Switch, Mobile, Mac)'
      ],
      hi: [
        'Dil ko sukoon dene wala pyara music aur gameplay',
        'Dosto ke saath co-op multiplayer khelne ki poori suvidha',
        'Mobile, low-end PC, aur laptops par aasaani se chalta hai'
      ]
    },
    rating: 4.95,
    steamRating: 'Overwhelmingly Positive (98%)',
    releaseYear: 2016,
    developer: 'ConcernedApe',
    publisher: 'ConcernedApe',
    platforms: ['pc', 'steam_deck', 'switch', 'playstation', 'xbox', 'mobile'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: 'Runs flawlessly on any potato PC, Mac, Android, or iOS device.',
      hi: 'Kisi bhi normal PC ya smartphone par smooth chalta hai.'
    },
    vibe: ['relaxing', 'creative', 'strategic'],
    difficulty: 'Casual',
    difficultyHi: 'Aasan / Relaxing',
    timeSinkHours: '300+ Hours',
    priceType: 'Paid',
    badge: 'Top Cozy Gem',
    imageBanner: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#15803d', '#1e3a8a'],
    iconName: 'Sprout',
    keyFeatures: {
      en: ['Farming & animal husbandry', 'Mining, fishing & monster combat', 'Town relationships & seasonal festivals'],
      hi: ['Fasal ugayein aur pashupalan', 'Mining, machhli pakadna aur gufaayein', 'Gaon me tyohaar aur rishte']
    },
    systemRequirementsMin: {
      os: 'Windows Vista or greater',
      processor: '2 GHz',
      ram: '2 GB RAM',
      graphics: '256 mb video memory, shader model 3.0+'
    },
    similarGames: ['Animal Crossing', 'Coral Island', 'Sun Haven', 'Slime Rancher']
  },
  {
    id: 'cities-skylines',
    title: 'Cities: Skylines',
    category: 'city_building',
    categoryName: { en: 'City Building & Management', hi: 'City Building & Management' },
    tagline: {
      en: 'The definitive modern city builder with realistic zoning, traffic, and economy.',
      hi: 'Modern shehar design karein: roads, traffic, water, electricity aur public transit manage karein.'
    },
    description: {
      en: 'Build and manage a bustling metropolis from a quiet plot of land. Design complex highway interchanges, balance water and electric grids, manage district policies, and solve tricky traffic congestion issues.',
      hi: 'Ek khali zameen se shuru karke aasmaan chhooti imaraton wala metropolis banayein. Zoning karein, traffic jams theek karein, schools aur hospitals banayein aur shehar ke mayor banein.'
    },
    whyPlay: {
      en: [
        'Deepest traffic simulation and urban planning mechanics available',
        'Massive Steam Workshop mod support with infinite assets and maps',
        'Extremely rewarding when your public transit network runs like clockwork'
      ],
      hi: [
        'Traffic system aur urban planning ka sabse deep simulation',
        'Hazaron mods aur Indian/International buildings lagane ki azaadi',
        'Ek baar khelna shuru karenge toh ghanto pata nahi chalega'
      ]
    },
    rating: 4.8,
    steamRating: 'Very Positive (93%)',
    releaseYear: 2015,
    developer: 'Colossal Order',
    publisher: 'Paradox Interactive',
    platforms: ['pc', 'steam_deck', 'playstation', 'xbox', 'switch'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'Requires decent RAM (8GB-16GB) as your city population expands.',
      hi: 'Shehar bada hone par 8GB+ RAM aur theek processor zaroori hai.'
    },
    vibe: ['creative', 'strategic', 'realistic'],
    difficulty: 'Moderate',
    difficultyHi: 'Normal',
    timeSinkHours: '250+ Hours',
    priceType: 'Paid',
    badge: 'City Planner Favorite',
    imageBanner: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0369a1', '#1e1b4b'],
    iconName: 'Building2',
    keyFeatures: {
      en: ['Multi-tiered road & transit networks', 'Realistic citizen life & commute AI', 'Custom districts & city ordinances'],
      hi: ['Roads, metro, bus aur highway networks', 'Real citizen daily routine AI', 'Tax aur pollution control']
    },
    systemRequirementsMin: {
      os: 'Microsoft Windows 7/8.1/10 (64-bit)',
      processor: 'Intel Core 2 Duo, 3.0GHz or AMD Athlon 64 X2 6400+',
      ram: '4 GB RAM (8GB recommended)',
      graphics: 'nVIDIA GeForce GTX 260, 512 MB or ATI Radeon HD 5670'
    },
    similarGames: ['SimCity 4', 'Manor Lords', 'Workers & Resources: Soviet Republic', 'Frostpunk']
  },
  {
    id: 'beamng-drive',
    title: 'BeamNG.drive',
    category: 'driving_vehicle',
    categoryName: { en: 'Physics & Vehicle Sim', hi: 'Soft-Body Physics & Car Sim' },
    tagline: {
      en: 'Hyper-realistic soft-body physics vehicle simulator with breathtaking crashes.',
      hi: 'Duniya ka sabse realistic vehicle crash aur soft-body driving physics sandbox.'
    },
    description: {
      en: 'BeamNG.drive is a realistic, immersive driving game offering near-limitless possibilities. Our soft-body physics engine simulates every component of a vehicle in real time, resulting in true-to-life behavior and visceral crash dynamics.',
      hi: 'Har car ke har part ka alag physics model hota hai. High speed par car collide karna, off-roading karna, rally racing ya delivery missions karna—yeh physics ka marvel hai.'
    },
    whyPlay: {
      en: [
        'The gold standard of video game physics and vehicle destruction',
        'Huge variety of scenarios: rock crawling, high-speed chases, track racing',
        'Active modding scene with hundreds of community cars and tracks'
      ],
      hi: [
        'Duniya ki sabse asli car damage aur suspension physics',
        'Rally, off-road, police chase aur stunt maps',
        'Custom cars aur steering wheel support'
      ]
    },
    rating: 4.9,
    steamRating: 'Overwhelmingly Positive (97%)',
    releaseYear: 2015,
    developer: 'BeamNG',
    publisher: 'BeamNG',
    platforms: ['pc', 'steam_deck'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'CPU heavy due to real-time physical beam calculations for multiple vehicles.',
      hi: 'Physics calculation ki wajah se theek CPU (Intel i5/Ryzen 5) chahiye.'
    },
    vibe: ['physics_fun', 'realistic', 'creative'],
    difficulty: 'Moderate',
    difficultyHi: 'Normal',
    timeSinkHours: '150+ Hours',
    priceType: 'Paid',
    badge: 'Physics Masterclass',
    imageBanner: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#c2410c', '#312e81'],
    iconName: 'Gauge',
    keyFeatures: {
      en: ['Soft-body physics simulation', 'Real-time vehicle deformation', 'Detailed open-world environments'],
      hi: ['Real-time car deformation physics', 'Customizable parts aur tuning', 'Open-world sandboxes aur stunt tracks']
    },
    systemRequirementsMin: {
      os: 'Windows 10 64 Bit',
      processor: 'AMD FX 6300 3.5Ghz / Intel Core i3-6300 3.8Ghz',
      ram: '16 GB RAM',
      graphics: 'Radeon HD 7750 / Nvidia GeForce GTX 550 Ti'
    },
    similarGames: ['Assetto Corsa', 'Wreckfest', 'Automation', 'Forza Horizon']
  },
  {
    id: 'factorio',
    title: 'Factorio',
    category: 'business_tycoon',
    categoryName: { en: 'Automation & Factory Tycoon', hi: 'Automation & Factory Sim' },
    tagline: {
      en: 'Build, automate, and optimize massive industrial planetary supply chains.',
      hi: 'Ek anjaan planet par giant automatic factory, conveyor belts aur trains banayein.'
    },
    description: {
      en: 'You crash-land on an alien world. What starts as mining coal by hand quickly turns into building sprawling automated factories with conveyor belts, assembly machines, oil refineries, logistic robotics, and train networks to launch a rocket.',
      hi: 'Koyla aur loha haath se khodte hue shuru karein aur dekhte hi dekhte hazaron conveyor belts, robots, trains aur automatic atomic plants se puri factory automate karein. Is game ko "Cracktorio" bhi kehte hain kyunki yeh behad addictive hai!'
    },
    whyPlay: {
      en: [
        'Universally considered one of the highest-rated games in video game history',
        'Pure dopamine hit when your automated supply chains work synchronously',
        'Outstanding optimization that can simulate millions of items simultaneously'
      ],
      hi: [
        'Steam par 99% positive rating ke saath all-time top games me se ek',
        'Dimag ki exercise aur problem solving ka zabardast maza',
        'Low-end PC par bhi laakhon items smoothly render karta hai'
      ]
    },
    rating: 4.98,
    steamRating: 'Overwhelmingly Positive (99%)',
    releaseYear: 2020,
    developer: 'Wube Software',
    publisher: 'Wube Software',
    platforms: ['pc', 'steam_deck', 'switch'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: 'Phenomenal C++ engine optimization, runs great on modest laptops.',
      hi: 'Inka game engine itna tagda hai ki purane laptop par bhi mast chalta hai.'
    },
    vibe: ['strategic', 'creative', 'hardcore'],
    difficulty: 'Deep/Complex',
    difficultyHi: 'Bahut Deep & Complex',
    timeSinkHours: '500+ Hours',
    priceType: 'Paid',
    badge: 'Addictive Perfection',
    imageBanner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#b45309', '#18181b'],
    iconName: 'Cog',
    keyFeatures: {
      en: ['Conveyor & robotic logistics', 'Deep crafting research tree', 'Defend against hostile indigenous bugs'],
      hi: ['Automated logistics & trains', 'Deep technology research tree', 'Alien creatures se base ki suraksha']
    },
    systemRequirementsMin: {
      os: 'Windows 10, 8, 7, Vista (64 Bit)',
      processor: 'Dual core 3Ghz+',
      ram: '4 GB RAM',
      graphics: 'DirectX 11 capable with 512 MB VRAM'
    },
    similarGames: ['Satisfactory', 'Dyson Sphere Program', 'Mindustry', 'Oxygen Not Included']
  },
  {
    id: 'microsoft-flight-simulator',
    title: 'Microsoft Flight Simulator',
    category: 'flight_space',
    categoryName: { en: 'Flight & Space Sim', hi: 'Aviation & Flight Sim' },
    tagline: {
      en: 'Fly any aircraft anywhere on a 1:1 photorealistic digital twin of planet Earth.',
      hi: 'Puri dharti ke 1:1 photorealistic digital map par kisi bhi aeroplane ko udayein.'
    },
    description: {
      en: 'From light planes to wide-body jets, fly highly detailed and accurate aircraft in the next generation of Microsoft Flight Simulator. Test your piloting skills against the challenges of real-time weather including live wind speed, temperature, and humidity.',
      hi: 'Duniya ke har shehar, pahad, aur airport par real weather aur real clouds ke sath flight udayein. Cockpit ke har switch aur dial ka real-life simulation.'
    },
    whyPlay: {
      en: [
        'Jaw-dropping visuals powered by Bing Maps satellite streaming and Azure AI',
        'Includes your hometown, local landmarks, and 37,000+ real airports',
        'Authentic flight aerodynamics certified by real-world aviation authorities'
      ],
      hi: [
        'Apne ghar ya shehar ke upar se aeroplane udane ka magical experience',
        'Real-time live weather, clouds aur din-raat cycle',
        'Aviation lovers ke liye absolute dream simulator'
      ]
    },
    rating: 4.85,
    steamRating: 'Very Positive (88%)',
    releaseYear: 2020,
    developer: 'Asobo Studio',
    publisher: 'Xbox Game Studios',
    platforms: ['pc', 'xbox'],
    hardwareSpec: 'high',
    hardwareNote: {
      en: 'High hardware demands: requires solid GPU, 16GB+ RAM, and fast internet.',
      hi: 'Heavy graphics game hai: dedicated graphics card aur accha internet connection chahiye.'
    },
    vibe: ['realistic', 'relaxing', 'hardcore'],
    difficulty: 'Challenging',
    difficultyHi: 'Challenging',
    timeSinkHours: '150+ Hours',
    priceType: 'Subscription / Game Pass',
    badge: 'Visual Marvel',
    imageBanner: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0284c7', '#0f172a'],
    iconName: 'Plane',
    keyFeatures: {
      en: ['1:1 Earth satellite streaming', 'Real-world live air traffic & weather', 'Aerodynamic physics modeling'],
      hi: ['Puri dharti ka photorealistic map', 'Real-time weather & live flight traffic', 'Realistic cockpit dials & instrumentation']
    },
    systemRequirementsMin: {
      os: 'Windows 10 (Nov 2019 update - 1909)',
      processor: 'Intel i5-4460 or AMD Ryzen 3 1200',
      ram: '8 GB RAM (16GB recommended)',
      graphics: 'NVIDIA GTX 770 or AMD Radeon RX 570 (2GB+ VRAM)'
    },
    similarGames: ['Kerbal Space Program', 'X-Plane 12', 'DCS World', 'Elite Dangerous']
  },
  {
    id: 'kerbal-space-program',
    title: 'Kerbal Space Program',
    category: 'flight_space',
    categoryName: { en: 'Aerospace & Orbit Physics', hi: 'Space Rocket & Orbital Physics' },
    tagline: {
      en: 'Build rockets, master orbital mechanics, and explore the Mun with green Kerbals.',
      hi: 'Real orbital physics se rocket design karein aur doosre planets par landing karein.'
    },
    description: {
      en: 'Take charge of the space program for the alien race known as the Kerbals. You have access to an array of parts to assemble fully-functional spacecraft that flies (or crashes) based on realistic aerodynamic and orbital physics.',
      hi: 'Rocket ke stages, thrust-to-weight ratio, fuel tank aur heat shield jodein. Gravity turn karein, Earth ki orbit pakdein aur Moon (Mun) par land karne ki koshish karein. Yeh physics seekhne ka sabse mazedar tarika hai!'
    },
    whyPlay: {
      en: [
        'Teaches real rocket science and orbital mechanics in an intuitive, hilarious way',
        'Unmatched sense of triumph when you land your first lunar probe successfully',
        'Huge modding ecosystem offering realistic solar systems and autopilots'
      ],
      hi: [
        'Real rocket science aur gravity physics aasan aur hasi-mazaak me seekhne ko milti hai',
        'Pehli baar Moon par bina crash huye land karne par jo khushi milti hai woh lajawab hai',
        'NASA aur SpaceX ke engineers bhi is game ki tareef karte hain'
      ]
    },
    rating: 4.9,
    steamRating: 'Overwhelmingly Positive (95%)',
    releaseYear: 2015,
    developer: 'Squad',
    publisher: 'Private Division',
    platforms: ['pc', 'steam_deck', 'playstation', 'xbox'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'Needs reasonable single-core CPU power for multi-part physics staging.',
      hi: 'Normal gaming PC ya laptop par mast chalta hai.'
    },
    vibe: ['physics_fun', 'strategic', 'creative'],
    difficulty: 'Deep/Complex',
    difficultyHi: 'Bahut Deep & Complex',
    timeSinkHours: '200+ Hours',
    priceType: 'Paid',
    badge: 'NASA-Approved Genius',
    imageBanner: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#6366f1', '#09090b'],
    iconName: 'Rocket',
    keyFeatures: {
      en: ['Orbital mechanics & Keplerian physics', 'Modular rocket & rover designer', 'Space station & planetary colonization'],
      hi: ['Asli space physics aur orbital trajectories', 'Custom rockets aur space rover designer', 'Space station docking aur space missions']
    },
    systemRequirementsMin: {
      os: 'Windows 7 SP1+ 64-bit',
      processor: 'Core 2 Duo 2.0 Ghz',
      ram: '4 GB RAM',
      graphics: 'DX10 (SM 4.0) capable, 512MB VRAM'
    },
    similarGames: ['SimpleRockets 2 / Juno', 'Space Engineers', 'Oxygen Not Included']
  },
  {
    id: 'rimworld',
    title: 'RimWorld',
    category: 'survival_colony',
    categoryName: { en: 'Colony Sim & Story Generator', hi: 'Colony Sim & Survival Story' },
    tagline: {
      en: 'A sci-fi colony sim driven by an intelligent AI storyteller that creates wild emergent drama.',
      hi: 'Ek sci-fi planet par bache survivors ki colony banayein jise intelligent AI storyteller chalata hai.'
    },
    description: {
      en: 'Manage a group of shipwrecked survivors on a distant rimworld. Build shelter, craft weapons, manage emotional breakdowns, fend off pirate raids, domesticate wild thrumbos, and negotiate tricky organ trades in an emergent procedural story.',
      hi: 'Teen survivors ek anjaan planet par girte hain. Unke mood, hunger, injuries aur relationships ko manage karein. AI Storyteller har pal naye surprises, attacks, aur emotional drama create karta hai.'
    },
    whyPlay: {
      en: [
        'Infinite emergent storytelling: every colony run creates unforgettable personal tales',
        'Unmatched freedom of choice (from wholesome farming utopian to ruthless survival)',
        'Extensive Steam Workshop modding support that adds thousands of hours'
      ],
      hi: [
        'Har bar nayi story banti hai—kabhi do survivors me pyar ho jata hai toh kabhi pirate attack',
        'Full freedom: chahe peaceful kheti karein ya high-tech defense fortress banayein',
        'PC specs ki koi tension nahi, kisi bhi laptop par chalega'
      ]
    },
    rating: 4.95,
    steamRating: 'Overwhelmingly Positive (98%)',
    releaseYear: 2018,
    developer: 'Ludeon Studios',
    publisher: 'Ludeon Studios',
    platforms: ['pc', 'steam_deck', 'playstation', 'xbox'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: '2D top-down simulation that runs well on almost any PC or laptop.',
      hi: '2D top-down graphics hai, purane laptops par bhi tezi se chalta hai.'
    },
    vibe: ['strategic', 'hardcore', 'creative'],
    difficulty: 'Deep/Complex',
    difficultyHi: 'Bahut Deep & Complex',
    timeSinkHours: '400+ Hours',
    priceType: 'Paid',
    badge: 'Infinite Story Engine',
    imageBanner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#be123c', '#18181b'],
    iconName: 'ShieldAlert',
    keyFeatures: {
      en: ['AI Storyteller (Cassandra, Phoebe, Randy)', 'Colonist psychology, health & prosthetics', 'Base construction & tactical defense'],
      hi: ['Intelligent AI Storyteller events', 'Colonists ka mood, health aur relationships', 'Base building, traps aur science research']
    },
    systemRequirementsMin: {
      os: 'Windows 7',
      processor: 'Core 2 Duo',
      ram: '4 GB RAM',
      graphics: 'Intel HD Graphics 4000 or other shader model 4.0'
    },
    similarGames: ['Dwarf Fortress', 'Oxygen Not Included', 'Project Zomboid', 'Going Medieval']
  },
  {
    id: 'powerwash-simulator',
    title: 'PowerWash Simulator',
    category: 'realistic_job',
    categoryName: { en: 'Satisfying Job Sim', hi: 'Relaxing Job & Cleaning Sim' },
    tagline: {
      en: 'Wash away your worries with the soothing sounds of high-pressure water blasting dirt.',
      hi: 'High-pressure water nozzle se gandi gaadiyan, ghar aur playgrounds chamkane ka ultimate ASMR sukoon.'
    },
    description: {
      en: 'Release the pressure with PowerWash Simulator! Wash away your worries with the soothing sounds of high-pressure water. Fire up your power washer and blast away every speck of dirt and grime you can find.',
      hi: 'Har tarah ki gandi cheezon (cars, vans, ghar, parks, helicopters) par high-pressure water pipe chalaakar unhe bilkul naya banayein. Iska sound aur visual satisfaction dimaag ko shaant kar deta hai.'
    },
    whyPlay: {
      en: [
        'Pure ASMR satisfaction as dirty surfaces turn sparkling clean under your jet spray',
        'Zero time pressure, zero penalties, 100% calming meditative gameplay',
        'Crossplay co-op to clean gigantic maps together with a friend'
      ],
      hi: [
        '100% stress relief aur mind relaxing experience',
        'Koi time limit ya death nahi, bas aaram se saaf-safai karein',
        'Dosto ke saath milkar online multiplayer me safai kar sakte hain'
      ]
    },
    rating: 4.85,
    steamRating: 'Overwhelmingly Positive (97%)',
    releaseYear: 2022,
    developer: 'FuturLab',
    publisher: 'Square Enix Collective',
    platforms: ['pc', 'steam_deck', 'switch', 'playstation', 'xbox'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'Very well optimized across platforms, including Game Pass on Xbox/PC.',
      hi: 'Xbox Game Pass par bhi available hai aur PC par badhiya chalta hai.'
    },
    vibe: ['relaxing', 'realistic'],
    difficulty: 'Casual',
    difficultyHi: 'Aasan / Relaxing',
    timeSinkHours: '60+ Hours',
    priceType: 'Subscription / Game Pass',
    badge: 'Ultimate ASMR Relief',
    imageBanner: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0284c7', '#064e3b'],
    iconName: 'Sparkles',
    keyFeatures: {
      en: ['Satisfying surface cleaning mechanics', 'Nozzles, extensions & soap upgrades', 'Co-op online cleaning mode'],
      hi: ['Realistic dirt blasting physics', 'Alag-alag nozzles aur pressure washers', 'Co-op online gameplay']
    },
    systemRequirementsMin: {
      os: 'Windows 8 or higher 64-bit',
      processor: 'Intel i5-760 (4*2800) or AMD Phenom II',
      ram: '4 GB RAM',
      graphics: 'GeForce GTX 760 or AMD R7-260X'
    },
    similarGames: ['House Flipper 2', 'Car Mechanic Simulator 2021', 'Supermarket Simulator', 'Crime Scene Cleaner']
  },
  {
    id: 'supermarket-simulator',
    title: 'Supermarket Simulator',
    category: 'realistic_job',
    categoryName: { en: 'Retail & Business Job', hi: 'Shopkeeper & Retail Tycoon' },
    tagline: {
      en: 'Stock shelves, set retail prices, scan groceries, and grow your neighbourhood grocery store.',
      hi: 'Apni kirana dukaan chalayein: saman order karein, rate tay karein, cashier banein aur store bada karein.'
    },
    description: {
      en: 'Run your own grocery store! Order stock, unpack delivery boxes, set your own product pricing with profit margins, scan barcodes at the cash register, give exact change, and expand into a giant hypermarket.',
      hi: 'Wholesale se chips, doodh, tel aur sabun order karein. Shelf me sajayein, price tag lagayein, customers se paise lein, change wapas karein aur bank se loan lekar naye license aur storage khareedein.'
    },
    whyPlay: {
      en: [
        'Engrossing everyday shopkeeping loop that hooks you instantly',
        'Freedom to set your own markup margins and balance customer happiness',
        'Very easy to pick up, play in short sessions, or binge for hours'
      ],
      hi: [
        'Dukaan chalane ka ekdum realistic aur entertaining feel',
        'Price set karne aur profit kamane ka maza',
        'Bina kisi complex controls ke turant samajh aa jata hai'
      ]
    },
    rating: 4.8,
    steamRating: 'Very Positive (94%)',
    releaseYear: 2024,
    developer: 'Nokta Games',
    publisher: 'Nokta Games',
    platforms: ['pc', 'steam_deck'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: 'Runs smoothly on integrated graphics and standard laptops.',
      hi: 'Basic PC aur laptop par aaram se chalta hai.'
    },
    vibe: ['relaxing', 'strategic'],
    difficulty: 'Casual',
    difficultyHi: 'Aasan / Relaxing',
    timeSinkHours: '80+ Hours',
    priceType: 'Paid',
    badge: 'Viral Sensation',
    imageBanner: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0d9488', '#111827'],
    iconName: 'Store',
    keyFeatures: {
      en: ['Dynamic product pricing & economics', 'Cash register barcode scanning & change', 'Store expansion & hiring cashiers'],
      hi: ['Product pricing aur profit margin', 'Billing counter aur cash transaction', 'Store extension aur worker hire karna']
    },
    systemRequirementsMin: {
      os: 'Windows (64-bit) 10',
      processor: 'i5 3550 / RYZEN 5 1600',
      ram: '4 GB RAM',
      graphics: 'NVidia GeForce GTX 1050 / AMD Radeon RX 560'
    },
    similarGames: ['Gas Station Simulator', 'TCG Card Shop Simulator', 'Trader Life Simulator', 'Big Ambitions']
  },
  {
    id: 'frostpunk',
    title: 'Frostpunk',
    category: 'survival_colony',
    categoryName: { en: 'Survival Society Sim', hi: 'Cold Survival & Morality Sim' },
    tagline: {
      en: 'The city must survive: manage warmth, coal, and tough moral decisions in a frozen apocalypse.',
      hi: '-120°C thand me bache hue aakhiri shehar ko generator ki aag aur mushkil faislon se zinda rakhein.'
    },
    description: {
      en: 'In an alternate 1886 frozen wasteland, humanity\'s last city clings to life around a towering coal-powered thermal heat generator. Manage resources, enact laws (child labor or healthcare?), research steam tech, and brace for devastating -120°C blizzards.',
      hi: 'Duniya baraf me jam chuki hai. Aap shehar ke Leader hain. Coal generator chalana, baraf se bachna, naye kanoon banana aur logo ki umeed zinda rakhna aapki zimmedari hai. Is game ka atmosphere behad intense hai.'
    },
    whyPlay: {
      en: [
        'Incredible atmosphere, gripping music by Piotr Musiał, and real moral weight',
        'Tense strategic gameplay where every piece of coal matters during a storm',
        'Frostpunk 2 is also available for those who want larger scale politics'
      ],
      hi: [
        'Duniya ka sabse intense aur emotional survival simulation',
        'Background music aur graphics itne shandar hain ki thand mehsoos hogi',
        'Har decision ka asar shehar ke logo par padta hai'
      ]
    },
    rating: 4.88,
    steamRating: 'Very Positive (92%)',
    releaseYear: 2018,
    developer: '11 bit studios',
    publisher: '11 bit studios',
    platforms: ['pc', 'steam_deck', 'playstation', 'xbox'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'Runs well on mid-range GPUs; stunning visual snow effects.',
      hi: 'Medium gaming PC ya graphic card wale laptop par badhiya chalta hai.'
    },
    vibe: ['hardcore', 'strategic', 'realistic'],
    difficulty: 'Challenging',
    difficultyHi: 'Challenging',
    timeSinkHours: '80+ Hours',
    priceType: 'Paid',
    badge: 'Masterpiece of Tension',
    imageBanner: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#0284c7', '#09090b'],
    iconName: 'Flame',
    keyFeatures: {
      en: ['Heat generator micro-grid', 'Book of Laws & morality dilemmas', 'Scouting frozen expeditions'],
      hi: ['Central heat generator grid', 'Book of Laws (Kanoon aur niyam)', 'Bahar baraf me scouts bhejna']
    },
    systemRequirementsMin: {
      os: 'Windows 7/8/10 64-bit',
      processor: '3.2 GHz Dual Core Processor',
      ram: '4 GB RAM',
      graphics: 'GeForce GTX 660, Radeon R7 370 with 2 GB of VRAM'
    },
    similarGames: ['Frostpunk 2', 'Manor Lords', 'They Are Billions', 'Ixion']
  },
  {
    id: 'project-zomboid',
    title: 'Project Zomboid',
    category: 'survival_colony',
    categoryName: { en: 'Hardcore Zombie Survival Sim', hi: 'Realistic Zombie Apocalypse Sim' },
    tagline: {
      en: 'The definitive zombie survival simulator. "This is how you died."',
      hi: 'Duniya ka sabse realistic zombie apocalypse simulator. Kahan chupenge, kya khayenge, kab tak bachenge?'
    },
    description: {
      en: 'Project Zomboid is the ultimate zombie survival RPG. Loot homes, barricade windows, hotwire cars, treat wound infections, farm food, read carpentry books, and survive realistic weather in a 1:1 isometric Kentucky apocalypse.',
      hi: 'Yeh koi action shooter nahi balki ek gehra simulation hai. Paani-bijli band ho jayegi, chot lagne par bandage bandhna hoga, depression se bachne ke liye kitab padhni hogi, aur ek zombie bite se maut pakki hai.'
    },
    whyPlay: {
      en: [
        'Unbelievable depth of survival mechanics (nutrition, body temperature, panic, electricity cuts)',
        'Play solo or join dedicated multiplayer servers with friends',
        'Massive mod support that turns Kentucky into anything you imagine'
      ],
      hi: [
        'Realistic survival ka baap: hunger, thirst, sleep, anxiety, car mechanics sab realistic hai',
        'Dosto ke sath multiplayer me base banakar survival kar sakte hain',
        'Low-spec PC par bhi aasaani se chal jata hai'
      ]
    },
    rating: 4.88,
    steamRating: 'Very Positive (94%)',
    releaseYear: 2013,
    developer: 'The Indie Stone',
    publisher: 'The Indie Stone',
    platforms: ['pc', 'steam_deck'],
    hardwareSpec: 'low',
    hardwareNote: {
      en: 'Isometric 2.5D engine, runs well on 8GB RAM laptops.',
      hi: 'Normal laptops aur PC par bhi accha chalta hai.'
    },
    vibe: ['hardcore', 'realistic', 'strategic'],
    difficulty: 'Deep/Complex',
    difficultyHi: 'Bahut Deep & Complex',
    timeSinkHours: '300+ Hours',
    priceType: 'Paid',
    badge: 'Survival Gold Standard',
    imageBanner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#1e293b', '#450a0a'],
    iconName: 'Skull',
    keyFeatures: {
      en: ['Complex medical & wound trauma system', 'Car hotwiring & engine part mechanics', 'Farming, carpentry & base barricading'],
      hi: ['Realistic medical aur bandage system', 'Car mechanics, battery & hotwire', 'Ghar barricade karna aur kheti']
    },
    systemRequirementsMin: {
      os: 'Windows 10, 64-bit',
      processor: 'Intel 2.77GHz Quad-core',
      ram: '8 GB RAM',
      graphics: 'Dedicated graphics card with 2 GB VRAM minimum'
    },
    similarGames: ['DayZ', 'Cataclysm: Dark Days Ahead', '7 Days to Die', 'RimWorld']
  },
  {
    id: 'manor-lords',
    title: 'Manor Lords',
    category: 'city_building',
    categoryName: { en: 'Medieval City Builder', hi: 'Medieval City & Lord Sim' },
    tagline: {
      en: 'Gridless medieval city building with organic town growth and tactical battles.',
      hi: 'Madhyakalin (Medieval) gaon aur shehar banayein, organic farming karein aur fauj tayyar karein.'
    },
    description: {
      en: 'Experience the life of a medieval lord in Manor Lords. Grow your starting village into a bustling city, manage complex resource supply chains with seasonal crop rotations, and lead your peasant militia in real-time tactical battles.',
      hi: 'Bina kisi rigid grid ke organic tarike se sadkein aur khet banayein. Season ke hisab se fasal ugayein, lakdi kaatein, bazaar lagayein aur apne gaon ki suraksha ke liye swordmen aur archers ki army khadi karein.'
    },
    whyPlay: {
      en: [
        'Photorealistic Unreal Engine 5 visuals with a third-person walking mode',
        'Organic, realistic road networks that feel historically authentic',
        'Mix of relaxing village life and thrilling Total War-style battlefield tactics'
      ],
      hi: [
        'Unreal Engine 5 ke behad khoobsurat graphics, khud gaon me walk kar sakte hain',
        'Real medieval itihas par aadharit organic building system',
        'Shanti se kheti bhi karein aur zaroorat padne par ladai bhi'
      ]
    },
    rating: 4.88,
    steamRating: 'Very Positive (89%)',
    releaseYear: 2024,
    developer: 'Slavic Magic',
    publisher: 'Hooded Horse',
    platforms: ['pc', 'steam_deck'],
    hardwareSpec: 'mid',
    hardwareNote: {
      en: 'Requires modern GPU (GTX 1060 / RX 580 minimum) for Unreal Engine visuals.',
      hi: 'Unreal Engine graphics ki wajah se theek GPU chahiye.'
    },
    vibe: ['realistic', 'strategic', 'creative'],
    difficulty: 'Moderate',
    difficultyHi: 'Normal',
    timeSinkHours: '100+ Hours',
    priceType: 'Subscription / Game Pass',
    badge: '2024 Medieval Phenomenon',
    imageBanner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gradientColors: ['#78350f', '#064e3b'],
    iconName: 'Castle',
    keyFeatures: {
      en: ['Gridless organic town placement', 'Seasonal crop rotation & firewood supply', 'Real-time tactical militia combat'],
      hi: ['Bina grid ke organic town layout', 'Mausam ke hisab se kheti aur storehouse', 'Peasant militia se tactical battles']
    },
    systemRequirementsMin: {
      os: 'Windows 10 (64-bit)',
      processor: 'Intel Core i5-4670 (quad-core) / AMD FX-4350',
      ram: '8 GB RAM (16 GB recommended)',
      graphics: 'NVIDIA GeForce GTX 1060 (6 GB) / AMD Radeon RX 580 (8 GB)'
    },
    similarGames: ['Cities: Skylines', 'Banished', 'Total War: Medieval II', 'Kingdoms and Castles']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEn: 'What type of experience are you looking for right now?',
    questionHi: 'Aapko is waqt kaisa gaming experience chahiye?',
    options: [
      {
        textEn: 'Relaxing, meditative & stress-free (chill vibes, music, cozy)',
        textHi: 'Relaxing aur chill sukoon (zero tension, bina kisi jaldbazi ke)',
        icon: 'Coffee',
        categoryWeights: { cozy_farming: 3, driving_vehicle: 3, realistic_job: 3 },
        vibeMatch: ['relaxing']
      },
      {
        textEn: 'Creative builder (designing roads, cities, factories, rocket ships)',
        textHi: 'Creative building (shehar, factories, sadkein ya rockets banana)',
        icon: 'Hammer',
        categoryWeights: { city_building: 3, business_tycoon: 3, flight_space: 2 },
        vibeMatch: ['creative']
      },
      {
        textEn: 'Hardcore survival & strategy (high stakes, emergencies, management)',
        textHi: 'Hardcore survival & challenge (zombies, barfili thand, deep planning)',
        icon: 'Flame',
        categoryWeights: { survival_colony: 4, business_tycoon: 2 },
        vibeMatch: ['hardcore', 'strategic']
      },
      {
        textEn: 'Hyper-realistic vehicles / physics simulation',
        textHi: 'Realistic driving, flying ya car crash physics',
        icon: 'Gauge',
        categoryWeights: { driving_vehicle: 4, flight_space: 3 },
        vibeMatch: ['realistic', 'physics_fun']
      }
    ]
  },
  {
    id: 2,
    questionEn: 'What hardware / device do you primarily play on?',
    questionHi: 'Aap kis device / PC par games khelte hain?',
    options: [
      {
        textEn: 'Basic Laptop / Budget PC / Integrated Graphics',
        textHi: 'Normal Laptop / Budget PC (bina heavy graphic card ke)',
        icon: 'Laptop',
        categoryWeights: { cozy_farming: 2, business_tycoon: 2, survival_colony: 2 },
        vibeMatch: ['relaxing', 'strategic'],
        specMatch: 'low'
      },
      {
        textEn: 'Mid-Range Gaming PC (GTX 1060 / 1650 / RTX 3050)',
        textHi: 'Mid-Range Gaming PC ya Gaming Laptop',
        icon: 'Monitor',
        categoryWeights: { city_building: 2, driving_vehicle: 2, flight_space: 2 },
        vibeMatch: ['creative', 'realistic'],
        specMatch: 'mid'
      },
      {
        textEn: 'High-End Gaming PC (RTX 3070 / 4070+)',
        textHi: 'High-End Powerful PC (Photorealistic graphics)',
        icon: 'Cpu',
        categoryWeights: { flight_space: 4, city_building: 2 },
        vibeMatch: ['realistic'],
        specMatch: 'high'
      },
      {
        textEn: 'Console / Steam Deck / Mobile phone',
        textHi: 'Mobile, Switch ya Console (PlayStation / Xbox)',
        icon: 'Gamepad2',
        categoryWeights: { cozy_farming: 3, realistic_job: 2 },
        vibeMatch: ['relaxing']
      }
    ]
  },
  {
    id: 3,
    questionEn: 'How deep do you want the learning curve to be?',
    questionHi: 'Game seekhne me kitna waqt lagna chahiye?',
    options: [
      {
        textEn: 'Pick up and play instantly in 2 minutes (Casual / Fun)',
        textHi: 'Turant shuru ho jaye, koi complex tutorials nahi (Aasan)',
        icon: 'Zap',
        categoryWeights: { realistic_job: 3, driving_vehicle: 2, cozy_farming: 2 },
        vibeMatch: ['relaxing', 'physics_fun']
      },
      {
        textEn: 'Moderate depth (Easy to start, takes a few hours to master)',
        textHi: 'Theek-thaak depth (shuruat aasan, dhire-dhire master karein)',
        icon: 'Sliders',
        categoryWeights: { city_building: 3, driving_vehicle: 2 },
        vibeMatch: ['creative', 'strategic']
      },
      {
        textEn: 'Galaxy-brain deep simulation (I love spreadsheets, physics, and optimization)',
        textHi: 'Bahut deep & complex (Mujhe complex supply chains & physics pasand hai)',
        icon: 'Brain',
        categoryWeights: { business_tycoon: 4, flight_space: 3, survival_colony: 3 },
        vibeMatch: ['strategic', 'hardcore']
      }
    ]
  }
];

export const GENRE_TABS = [
  { id: 'all', labelEn: 'All Top Sims', labelHi: 'Sabhi Games', icon: 'Sparkles' },
  { id: 'driving_vehicle', labelEn: 'Truck & Car Sim', labelHi: 'Truck & Car Sim', icon: 'Truck' },
  { id: 'cozy_farming', labelEn: 'Cozy & Farming', labelHi: 'Cozy & Kheti Sim', icon: 'Sprout' },
  { id: 'city_building', labelEn: 'City Builders', labelHi: 'City Builders', icon: 'Building2' },
  { id: 'business_tycoon', labelEn: 'Factory & Tycoon', labelHi: 'Factory & Tycoon', icon: 'Cog' },
  { id: 'flight_space', labelEn: 'Flight & Space', labelHi: 'Flight & Space', icon: 'Plane' },
  { id: 'realistic_job', labelEn: 'Job & Shop Sims', labelHi: 'Job & Shop Sims', icon: 'Store' },
  { id: 'survival_colony', labelEn: 'Survival & Colony', labelHi: 'Survival Colony', icon: 'ShieldAlert' },
] as const;
