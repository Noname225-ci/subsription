'use strict';

// =====================================================
//  WASTED OR WORTH IT? — Enhanced Script
// =====================================================

// === Configuration ===
const CURRENCY_SYMBOL = '$';
const THRESHOLD_GOOD    = 2.00;  // ≤ $2/use = great value
const THRESHOLD_CONSIDER = 5.00; // > $2 and ≤ $5 = consider alternatives

// =====================================================
//  FREE RESOURCES BLOG DATA (per category)
//  Each entry: top 5 free legal sites + primary subreddit
// =====================================================
const categoryResources = {
    "Streaming Video": {
        freeSites: [
            { rank: 1, icon: "📺", name: "Tubi",          desc: "50,000+ movies & shows, 100% free", url: "https://tubitv.com" },
            { rank: 2, icon: "🎬", name: "Pluto TV",      desc: "300+ live channels & on-demand VOD", url: "https://pluto.tv" },
            { rank: 3, icon: "🦚", name: "Peacock (Free)", desc: "Hit shows, live sports clips & news", url: "https://peacocktv.com" },
            { rank: 4, icon: "🎭", name: "Crackle",       desc: "Sony-owned free movies & originals", url: "https://crackle.com" },
            { rank: 5, icon: "📡", name: "The Roku Channel", desc: "Free movies, live TV & news", url: "https://therokuchannel.roku.com" }
        ],
        subreddit: { name: "r/cordcutters", url: "https://www.reddit.com/r/cordcutters/" },
        subredditDesc: "A community of 450k+ people who've ditched cable. They share deals, free streaming tips, and help you set up antennas, streaming sticks, and VPNs.",
        newcomerTip: "New to Reddit? Just click the link — you can read everything without an account. Make a free account to ask questions and get personalized setup advice."
    },
    "Streaming Music": {
        freeSites: [
            { rank: 1, icon: "🎵", name: "Spotify (Free)", desc: "Shuffle mode with ads — still huge library", url: "https://open.spotify.com" },
            { rank: 2, icon: "🎶", name: "YouTube Music (Free)", desc: "Official music videos & auto-generated mixes", url: "https://music.youtube.com" },
            { rank: 3, icon: "🔊", name: "SoundCloud (Free)", desc: "Indie artists & emerging talent, no paywall", url: "https://soundcloud.com" },
            { rank: 4, icon: "💿", name: "Bandcamp",       desc: "Support artists directly, preview any album free", url: "https://bandcamp.com" },
            { rank: 5, icon: "📻", name: "Radio.garden",   desc: "Live radio from any city on Earth", url: "https://radio.garden" }
        ],
        subreddit: { name: "r/spotify", url: "https://www.reddit.com/r/spotify/" },
        subredditDesc: "Tips to maximize the free tier, find new music, and share playlists. Also check r/musichoarder for managing your own local music library.",
        newcomerTip: "Reddit is free to browse. No account needed to read threads packed with tips on getting more out of free music services."
    },
    "Gaming": {
        freeSites: [
            { rank: 1, icon: "🎮", name: "Epic Games Store", desc: "2–3 free AAA games every single week", url: "https://store.epicgames.com/en-US/free-games" },
            { rank: 2, icon: "🕹️", name: "Steam (Free to Play)", desc: "Hundreds of free-to-play PC games", url: "https://store.steampowered.com/genre/Free%20to%20Play/" },
            { rank: 3, icon: "🎲", name: "itch.io (Free games)", desc: "Thousands of indie games, many free", url: "https://itch.io/games/free" },
            { rank: 4, icon: "🏆", name: "GOG Free Games",  desc: "DRM-free classic games given away free", url: "https://www.gog.com/en/games?priceRange=0,0" },
            { rank: 5, icon: "☁️", name: "Xbox Free to Play", desc: "Free-to-play Xbox & PC games, no subscription", url: "https://www.xbox.com/en-US/games/free-to-play" }
        ],
        subreddit: { name: "r/patientgamers", url: "https://www.reddit.com/r/patientgamers/" },
        subredditDesc: "A community that waits for sales and finds incredible value. Threads on the best cheap/free games, deal alerts, and how to backlog smart rather than spend constantly.",
        newcomerTip: "No Reddit account? No problem — browse freely. Once you sign up (it's free), ask for game recommendations based on your exact budget and tastes."
    },
    "News & Magazines": {
        freeSites: [
            { rank: 1, icon: "📰", name: "BBC News",        desc: "World-class journalism, fully free online", url: "https://www.bbc.com/news" },
            { rank: 2, icon: "🌐", name: "Reuters",         desc: "Wire service news without opinion slant", url: "https://www.reuters.com" },
            { rank: 3, icon: "🗞️", name: "The Guardian",    desc: "UK paper, no paywall — donation funded", url: "https://theguardian.com" },
            { rank: 4, icon: "📻", name: "NPR News",         desc: "Balanced US news, podcasts & live radio", url: "https://www.npr.org" },
            { rank: 5, icon: "📖", name: "Libby (Library)",  desc: "Free digital magazines via your library card", url: "https://libbyapp.com" }
        ],
        subreddit: { name: "r/worldnews", url: "https://www.reddit.com/r/worldnews/" },
        subredditDesc: "Millions of readers sharing breaking news, analysis, and links to free articles. Great for bypassing paywalls via free archive tools shared in comments.",
        newcomerTip: "Reddit communities often share gift links and archive links to paywalled articles. Browse the comments — you'll find most major news stories are freely accessible."
    },
    "Software & Productivity": {
        freeSites: [
            { rank: 1, icon: "📝", name: "LibreOffice",     desc: "Full Microsoft Office alternative, 100% free", url: "https://www.libreoffice.org" },
            { rank: 2, icon: "🎨", name: "GIMP",            desc: "Professional image editor, free forever", url: "https://www.gimp.org" },
            { rank: 3, icon: "✏️", name: "Canva (Free)",     desc: "Design templates, presentations & graphics", url: "https://www.canva.com" },
            { rank: 4, icon: "📋", name: "Notion (Free)",    desc: "Notes, wikis & project management for personal use", url: "https://www.notion.so" },
            { rank: 5, icon: "🗂️", name: "Google Workspace", desc: "Docs, Sheets, Slides & 15GB Drive — all free", url: "https://workspace.google.com" }
        ],
        subreddit: { name: "r/software", url: "https://www.reddit.com/r/software/" },
        subredditDesc: "Find free, open-source, or one-time-purchase alternatives to expensive subscription software. Also try r/AlternativeTo for crowd-sourced comparisons.",
        newcomerTip: "Search Reddit for 'free alternative to [your software]' — you'll almost always find better options than what you're paying for. No account needed to search."
    },
    "Cloud Storage": {
        freeSites: [
            { rank: 1, icon: "☁️", name: "Google Drive",    desc: "15 GB free — works on all devices", url: "https://drive.google.com" },
            { rank: 2, icon: "🍎", name: "iCloud (Free)",    desc: "5 GB free tier, built into Apple devices", url: "https://www.icloud.com" },
            { rank: 3, icon: "🪟", name: "OneDrive (Free)",  desc: "5 GB free, deep Windows & Office integration", url: "https://onedrive.live.com" },
            { rank: 4, icon: "📦", name: "Mega",             desc: "20 GB free with end-to-end encryption", url: "https://mega.nz" },
            { rank: 5, icon: "🔄", name: "Sync.com (Free)",  desc: "5 GB free with zero-knowledge encryption", url: "https://www.sync.com" }
        ],
        subreddit: { name: "r/DataHoarder", url: "https://www.reddit.com/r/DataHoarder/" },
        subredditDesc: "Enthusiasts who optimize storage, run home NAS servers, and find the best cloud deals. Get advice on stacking free tiers from multiple providers.",
        newcomerTip: "Combine free tiers from multiple providers (Google + OneDrive + Mega) to get 40+ GB free. The DataHoarder community on Reddit explains exactly how."
    },
    "VPN": {
        freeSites: [
            { rank: 1, icon: "🔒", name: "ProtonVPN (Free)", desc: "Truly unlimited free tier — no data cap", url: "https://protonvpn.com/free-vpn" },
            { rank: 2, icon: "🛡️", name: "Windscribe (Free)", desc: "10 GB/month free, strong privacy policy", url: "https://windscribe.com" },
            { rank: 3, icon: "🌐", name: "TunnelBear (Free)", desc: "500 MB/month free, very easy to use", url: "https://www.tunnelbear.com" },
            { rank: 4, icon: "🔐", name: "hide.me (Free)",    desc: "10 GB/month free, no logs policy", url: "https://hide.me/en/vpn/free" },
            { rank: 5, icon: "🦊", name: "Mozilla VPN",       desc: "Trusted brand — check for free trial offers", url: "https://www.mozilla.org/products/vpn/" }
        ],
        subreddit: { name: "r/VPN", url: "https://www.reddit.com/r/VPN/" },
        subredditDesc: "Unbiased VPN advice from privacy enthusiasts. They cut through marketing hype and recommend based on actual audit results and privacy policies — not affiliate commissions.",
        newcomerTip: "VPN review sites are often paid affiliates. Reddit's r/VPN community gives honest, commission-free recommendations based on real-world testing."
    },
    "Fitness & Wellness": {
        freeSites: [
            { rank: 1, icon: "🧘", name: "YouTube Fitness",  desc: "Millions of free workouts for every level", url: "https://www.youtube.com/results?search_query=free+workout" },
            { rank: 2, icon: "👟", name: "Nike Training Club", desc: "Free app with 100+ workout plans", url: "https://www.nike.com/ntc-app" },
            { rank: 3, icon: "🏋️", name: "Darebee.com",      desc: "1,000+ free workout plans, no ads, no account", url: "https://darebee.com" },
            { rank: 4, icon: "🧠", name: "Insight Timer",     desc: "Largest free meditation app — 100k+ sessions", url: "https://insighttimer.com" },
            { rank: 5, icon: "📱", name: "MyFitnessPal (Free)", desc: "Calorie & nutrition tracking, free tier", url: "https://www.myfitnesspal.com" }
        ],
        subreddit: { name: "r/Fitness", url: "https://www.reddit.com/r/Fitness/" },
        subredditDesc: "The definitive fitness community with 10M+ members. Browse the wiki for free beginner programs that outperform most paid apps. Ask questions, get science-backed advice.",
        newcomerTip: "The r/Fitness wiki has free beginner workout programs that are genuinely better than most paid apps. No Reddit account needed — just read the wiki directly."
    },
    "Meal Kits & Food": {
        freeSites: [
            { rank: 1, icon: "🍳", name: "AllRecipes",       desc: "Millions of free recipes with reviews", url: "https://www.allrecipes.com" },
            { rank: 2, icon: "👨‍🍳", name: "Budget Bytes",    desc: "Cheap, delicious recipes with cost-per-serving", url: "https://www.budgetbytes.com" },
            { rank: 3, icon: "🥗", name: "Mealime (Free)",    desc: "Free weekly meal plans with shopping lists", url: "https://www.mealime.com" },
            { rank: 4, icon: "🛒", name: "Supercook",         desc: "Find recipes based on what you already have", url: "https://www.supercook.com" },
            { rank: 5, icon: "📺", name: "YouTube Cooking",   desc: "Pro chefs teaching free — Babish, Joshua Weissman", url: "https://www.youtube.com/results?search_query=meal+prep+beginners" }
        ],
        subreddit: { name: "r/mealprep", url: "https://www.reddit.com/r/mealprep/" },
        subredditDesc: "Learn to batch-cook a week's meals for less than a single meal kit. Budget templates, beginner guides, and recipe ideas shared by the community every day.",
        newcomerTip: "r/mealprep shows you how to cook 10+ meals in 2 hours for under $50 — far cheaper than any meal kit. The community is welcoming to complete beginners."
    },
    "Subscription Boxes": {
        freeSites: [
            { rank: 1, icon: "💄", name: "Sample Society",    desc: "Free beauty samples from major brands", url: "https://www.ulta.com/free-samples" },
            { rank: 2, icon: "🛍️", name: "PINCHme",          desc: "Free product samples in exchange for reviews", url: "https://www.pinchme.com" },
            { rank: 3, icon: "🧴", name: "Sephora Samples",   desc: "3 free samples with any Sephora order", url: "https://www.sephora.com" },
            { rank: 4, icon: "🛒", name: "ThredUp",           desc: "Secondhand clothing — fraction of the price", url: "https://www.thredup.com" },
            { rank: 5, icon: "👗", name: "Poshmark",          desc: "Buy/sell secondhand fashion, huge selection", url: "https://www.poshmark.com" }
        ],
        subreddit: { name: "r/BeautyBoxes", url: "https://www.reddit.com/r/BeautyBoxes/" },
        subredditDesc: "Community that reviews subscription boxes, shares spoilers, and — crucially — tells you which boxes offer one-time purchases instead of subscriptions.",
        newcomerTip: "The community often identifies when boxes go on sale or when you can get the same products cheaper directly. Browse without an account for instant savings tips."
    },
    "Education & Learning": {
        freeSites: [
            { rank: 1, icon: "🎓", name: "Coursera (Audit)",  desc: "Audit 3,000+ university courses for free", url: "https://www.coursera.org" },
            { rank: 2, icon: "📚", name: "edX (Audit)",       desc: "MIT, Harvard & more — free to audit", url: "https://www.edx.org" },
            { rank: 3, icon: "💻", name: "freeCodeCamp",      desc: "Full coding curriculum, 100% free, certifications", url: "https://www.freecodecamp.org" },
            { rank: 4, icon: "🎨", name: "Khan Academy",      desc: "Math, science, history — free for everyone", url: "https://www.khanacademy.org" },
            { rank: 5, icon: "📖", name: "LinkedIn Learning (Library)", desc: "Free access via many public library cards", url: "https://www.linkedin.com/learning/" }
        ],
        subreddit: { name: "r/learnprogramming", url: "https://www.reddit.com/r/learnprogramming/" },
        subredditDesc: "For coding specifically — or try r/YouShouldKnow for general life skills. Members share the best free resources and honest reviews of paid platforms.",
        newcomerTip: "Before paying for any online course, check Reddit first. The community often confirms that the free version of a course platform is sufficient for your goals."
    }
};

// =====================================================
//  SUBSCRIPTION DATABASE
// =====================================================
const subscriptionsData = [
    // -- Streaming Video --
    { category: "Streaming Video", id: 'netflix_ads',    name: "Netflix (Standard with Ads)", alternatives: [ { name: "Tubi", link: "https://tubitv.com" }, { name: "Pluto TV", link: "https://pluto.tv" }, { name: "Peacock Premium", link: "https://peacocktv.com" }, { name: "Paramount+ Essential", link: "https://www.paramountplus.com" } ], tips: ["Bundle options may exist (e.g., Verizon +play).", "Still allows downloads.", "Rotate with other services — cancel during slow periods."] },
    { category: "Streaming Video", id: 'netflix_std',    name: "Netflix (Standard)", alternatives: [ { name: "Hulu (No Ads)", link: "https://hulu.com" }, { name: "Max", link: "https://max.com" }, { name: "Disney+ Premium", link: "https://disneyplus.com" }, { name: "Netflix (Standard w/ Ads)", link: "https://netflix.com" } ], tips: ["Consider 'Basic' if HD/multiple screens aren't needed.", "Share accounts within household per terms.", "Rotate subscriptions rather than maintaining multiple simultaneously."] },
    { category: "Streaming Video", id: 'netflix_prem',   name: "Netflix (Premium)", alternatives: [ { name: "Netflix (Standard)", link: "https://netflix.com" } ], tips: ["Only needed for 4K/UHD and 4+ simultaneous screens.", "Check if you actually use 4K on your current TV setup.", "Share costs by family-sharing within Netflix's paid sharing program."] },
    { category: "Streaming Video", id: 'hulu_ads',       name: "Hulu (with Ads)", alternatives: [ { name: "Netflix (Standard w/ Ads)", link: "https://netflix.com" }, { name: "Peacock Premium", link: "https://peacocktv.com" }, { name: "Tubi (Free)", link: "https://tubitv.com" } ], tips: ["Often bundled with Disney+ and ESPN+.", "Includes next-day access to many network shows.", "Free option: Tubi covers a huge on-demand library."] },
    { category: "Streaming Video", id: 'hulu_noads',     name: "Hulu (No Ads)", alternatives: [ { name: "Netflix (Standard)", link: "https://netflix.com" }, { name: "Max", link: "https://max.com" } ], tips: ["Bundle with Disney+/ESPN+ often provides better value.", "Allows downloads for offline viewing."] },
    { category: "Streaming Video", id: 'disneyplus',     name: "Disney+ Premium", alternatives: [ { name: "Hulu", link: "https://hulu.com" }, { name: "Paramount+", link: "https://paramountplus.com" } ], tips: ["Bundle with Hulu/ESPN+ is often cheaper per service.", "Look for annual payment discounts.", "Great for families — consider who actually uses it."] },
    { category: "Streaming Video", id: 'max',            name: "Max (formerly HBO Max)", alternatives: [ { name: "Netflix", link: "https://netflix.com" }, { name: "Hulu", link: "https://hulu.com" } ], tips: ["Often included with AT&T plans — check eligibility.", "Offers exceptionally high-quality originals.", "Subscribe for a month to binge a specific show, then pause."] },
    { category: "Streaming Video", id: 'primevideo',     name: "Amazon Prime Video", alternatives: [ { name: "Netflix", link: "https://netflix.com" }, { name: "Hulu", link: "https://hulu.com" } ], tips: ["Included with Amazon Prime membership — factor in other Prime benefits.", "Can add channels within Prime Video at an additional cost."] },
    { category: "Streaming Video", id: 'appletvplus',    name: "Apple TV+", alternatives: [ { name: "Netflix", link: "https://netflix.com" }, { name: "Max", link: "https://max.com" } ], tips: ["Often comes free for a period with new Apple devices.", "Included in Apple One bundles.", "Smaller but very high-quality original content library."] },
    { category: "Streaming Video", id: 'paramountplus',  name: "Paramount+ (with Showtime)", alternatives: [ { name: "Max", link: "https://max.com" }, { name: "Peacock", link: "https://peacocktv.com" } ], tips: ["Includes Showtime content.", "Cheaper 'Essential' plan has ads but no Showtime.", "Strong for NFL live sports fans."] },
    { category: "Streaming Video", id: 'peacock',        name: "Peacock Premium/Premium Plus", alternatives: [ { name: "Hulu", link: "https://hulu.com" }, { name: "Paramount+", link: "https://paramountplus.com" } ], tips: ["Often included with Comcast/Xfinity — check your bill.", "Free tier available with limited content.", "Has Premier League live soccer."] },
    { category: "Streaming Video", id: 'crunchyroll',    name: "Crunchyroll", alternatives: [ { name: "HIDIVE", link: "https://hidive.com" } ], tips: ["Leading service for Anime.", "Free tier available with ads and limited catalog.", "Many titles appear on Netflix or Hulu too."] },
    { category: "Streaming Video", id: 'youtubetv',      name: "YouTube TV", alternatives: [ { name: "Sling TV", link: "https://sling.com" }, { name: "FuboTV", link: "https://fubo.tv" } ], tips: ["Comprehensive channel list with unlimited cloud DVR.", "More expensive than competitors — compare channel lists carefully."] },
    { category: "Streaming Video", id: 'video_other',    name: "Other Streaming Video Service", isGeneric: true, alternatives: [ { name: "Tubi (Free)", link: "https://tubitv.com" }, { name: "Pluto TV (Free)", link: "https://pluto.tv" }, { name: "Antenna for local channels", link: null }, { name: "Library streaming (Kanopy, Hoopla)", link: null } ], tips: ["Rotate subscriptions — cancel and resubscribe when needed.", "Look for annual payment discounts (usually 20–30% cheaper).", "Check free tiers before upgrading."] },

    // -- Streaming Music --
    { category: "Streaming Music", id: 'spotify_prem',   name: "Spotify Premium", alternatives: [ { name: "Apple Music", link: "https://music.apple.com" }, { name: "YouTube Music Premium", link: "https://music.youtube.com" }, { name: "Spotify (Free)", link: "https://spotify.com" } ], tips: ["Use Family/Duo plans to split costs.", "Student discounts available (up to 50% off).", "Free tier still gives access to the full library in shuffle mode."] },
    { category: "Streaming Music", id: 'applemusic',     name: "Apple Music", alternatives: [ { name: "Spotify Premium", link: "https://spotify.com" }, { name: "YouTube Music Premium", link: "https://music.youtube.com" } ], tips: ["Included in Apple One bundles.", "Family/Student plans available.", "Lossless audio at no extra cost."] },
    { category: "Streaming Music", id: 'youtubemusic',   name: "YouTube Music Premium", alternatives: [ { name: "Spotify Premium", link: "https://spotify.com" }, { name: "Apple Music", link: "https://music.apple.com" } ], tips: ["Often bundled with YouTube Premium (removes ads from all YouTube).", "Family/Student plans available.", "Unique library includes covers and live performances."] },
    { category: "Streaming Music", id: 'tidal',          name: "Tidal (HiFi/HiFi Plus)", alternatives: [ { name: "Spotify Premium", link: "https://spotify.com" }, { name: "Apple Music (Lossless)", link: null } ], tips: ["Focuses on higher fidelity audio.", "Only worthwhile if you have high-quality headphones/speakers.", "Apple Music now offers lossless for same price as Spotify."] },
    { category: "Streaming Music", id: 'music_other',    name: "Other Music Streaming Service", isGeneric: true, alternatives: [ { name: "Spotify (Free Tier)", link: "https://spotify.com" }, { name: "YouTube Music (Free)", link: "https://music.youtube.com" }, { name: "SoundCloud (Free)", link: "https://soundcloud.com" } ], tips: ["Check family/student plans — often 50% cheaper.", "Free tiers work well for casual listening."] },

    // -- Gaming --
    { category: "Gaming", id: 'gamepass_ultimate', name: "Xbox Game Pass Ultimate",    alternatives: [ { name: "PC Game Pass", link: "https://www.xbox.com/xbox-game-pass" }, { name: "PS Plus Extra", link: "https://www.playstation.com/ps-plus/" }, { name: "Epic Free Games (Free)", link: "https://store.epicgames.com/en-US/free-games" } ], tips: ["Includes PC Game Pass, EA Play, and Cloud Gaming.", "Best value if using multiple platforms (PC + Xbox).", "Subscribe for months with big releases, pause in quiet periods."] },
    { category: "Gaming", id: 'gamepass_pc',       name: "PC Game Pass",               alternatives: [ { name: "Epic Free Games (Free)", link: "https://store.epicgames.com/en-US/free-games" }, { name: "Humble Choice", link: "https://www.humblebundle.com/membership" } ], tips: ["Large PC library including day-one releases.", "EA Play included.", "Compare with buying games on sale — often cheaper for heavy players."] },
    { category: "Gaming", id: 'psplus_extra',      name: "PlayStation Plus Extra",     alternatives: [ { name: "PS Plus Essential", link: "https://www.playstation.com/ps-plus/" }, { name: "Buying games on sale", link: null } ], tips: ["Includes a large game catalog on top of online multiplayer.", "Essential tier is cheaper if you only want online play + monthly games.", "Games rotate — download what interests you before they leave."] },
    { category: "Gaming", id: 'psplus_premium',    name: "PlayStation Plus Premium",   alternatives: [ { name: "PS Plus Extra", link: "https://www.playstation.com/ps-plus/" } ], tips: ["Adds classic PS1/PS2/PSP catalog and cloud streaming.", "Premium is mainly worth it for classic game nostalgia.", "Check if games you want are in Extra first."] },
    { category: "Gaming", id: 'switch_online',     name: "Nintendo Switch Online + Expansion Pack", alternatives: [ { name: "Nintendo Switch Online (Basic)", link: "https://www.nintendo.com/switch/online-service/" } ], tips: ["Basic tier is enough for online multiplayer and NES/SNES games.", "Expansion worth it only if you want N64/Genesis/GBA + DLC.", "Share family plan costs with others."] },
    { category: "Gaming", id: 'gaming_other',      name: "Other Gaming Service",       isGeneric: true, alternatives: [ { name: "Epic Free Games (Free)", link: "https://store.epicgames.com/en-US/free-games" }, { name: "Steam sales", link: "https://store.steampowered.com" }, { name: "itch.io free games", link: "https://itch.io/games/free" } ], tips: ["Epic gives away free games weekly — claim even if not playing immediately.", "Buy games on Steam sales at 70–90% off.", "Subscribe only during months with must-play releases."] },

    // -- News & Magazines --
    { category: "News & Magazines", id: 'nyt',          name: "New York Times (Digital)", alternatives: [ { name: "The Guardian (Free)", link: "https://theguardian.com" }, { name: "BBC News (Free)", link: "https://bbc.com/news" }, { name: "Apple News+", link: "https://apple.com/apple-news/" }, { name: "Libby via Library", link: null } ], tips: ["Look for intro offers (often $1/month for first year).", "Student/Educator discounts available.", "Your public library may provide free digital access."] },
    { category: "News & Magazines", id: 'wapo',         name: "Washington Post (Digital)", alternatives: [ { name: "New York Times", link: "https://nytimes.com" }, { name: "Reuters (Free)", link: "https://reuters.com" } ], tips: ["Often cheaper than NYT.", "Intro offers available.", "Amazon Prime members may get discounted access."] },
    { category: "News & Magazines", id: 'wsj',          name: "Wall Street Journal (Digital)", alternatives: [ { name: "Reuters (Free)", link: "https://reuters.com" }, { name: "Financial Times", link: "https://ft.com" } ], tips: ["Focuses on business/finance.", "Student rates often 50–75% off.", "Bloomberg offers some free articles per month."] },
    { category: "News & Magazines", id: 'applenewsplus', name: "Apple News+",           alternatives: [ { name: "Libby via Library Card (Free)", link: null }, { name: "The Guardian (Free)", link: "https://theguardian.com" } ], tips: ["Bundles many magazines and some newspapers.", "Included in Apple One Premier.", "Check if your library provides PressReader or Libby for free magazine access."] },
    { category: "News & Magazines", id: 'news_other',   name: "Other News/Magazine",    isGeneric: true, alternatives: [ { name: "BBC News (Free)", link: "https://bbc.com/news" }, { name: "NPR News (Free)", link: "https://npr.org" }, { name: "Libby via Library (Free)", link: null } ], tips: ["Your library card unlocks free digital magazines via Libby/PressReader.", "Most major stories are covered free by BBC, Reuters, and The Guardian."] },

    // -- Software & Productivity --
    { category: "Software & Productivity", id: 'm365',          name: "Microsoft 365 (Personal/Family)", alternatives: [ { name: "Google Workspace (Free)", link: "https://workspace.google.com" }, { name: "LibreOffice (Free)", link: "https://libreoffice.org" }, { name: "Office Online (Free)", link: "https://office.com" } ], tips: ["Family plan allows sharing with up to 5 others — split costs.", "Free web versions (Word Online) work for basic tasks.", "LibreOffice is a powerful free desktop alternative."] },
    { category: "Software & Productivity", id: 'adobe_cc',      name: "Adobe Creative Cloud (All Apps)", alternatives: [ { name: "Affinity Suite (One-time purchase)", link: "https://affinity.serif.com" }, { name: "DaVinci Resolve (Free/Paid)", link: "https://www.blackmagicdesign.com/products/davinciresolve" }, { name: "Canva Pro", link: "https://canva.com" }, { name: "GIMP (Free)", link: "https://gimp.org" } ], tips: ["Very expensive — ensure you frequently use 3+ apps.", "Photography plan (Photoshop/Lightroom) is much cheaper.", "Affinity Suite is a one-time purchase that replaces most Adobe apps.", "Student discounts available (up to 65% off)."] },
    { category: "Software & Productivity", id: 'adobe_photo',   name: "Adobe CC (Photography Plan)", alternatives: [ { name: "Affinity Photo (One-time)", link: "https://affinity.serif.com" }, { name: "GIMP (Free)", link: "https://gimp.org" }, { name: "darktable (Free)", link: "https://darktable.org" } ], tips: ["Includes Photoshop & Lightroom.", "If you only use Lightroom, darktable is a free open-source alternative.", "Affinity Photo is a one-time purchase with similar features."] },
    { category: "Software & Productivity", id: 'canva_pro',     name: "Canva Pro",                 alternatives: [ { name: "Canva (Free)", link: "https://canva.com" }, { name: "Adobe Express (Free)", link: "https://express.adobe.com" } ], tips: ["Free tier covers most use cases.", "Only worth upgrading if you need background remover, brand kits, or specific Pro templates."] },
    { category: "Software & Productivity", id: 'software_other', name: "Other SaaS/Software",     isGeneric: true, alternatives: [ { name: "Search 'open source alternative to [software]'", link: null }, { name: "AlternativeTo.net", link: "https://alternativeto.net" }, { name: "Free tiers & trials", link: null } ], tips: ["AlternativeTo.net is excellent for finding free equivalents.", "Many subscriptions have one-time purchase versions (AppSumo, Paddle).", "Lower tier plans often meet 90% of needs at half the cost."] },

    // -- Cloud Storage --
    { category: "Cloud Storage", id: 'icloud',   name: "iCloud+",            alternatives: [ { name: "Google One", link: "https://one.google.com" }, { name: "OneDrive", link: "https://onedrive.live.com" }, { name: "Mega (Free 20GB)", link: "https://mega.nz" } ], tips: ["Integrates seamlessly with Apple devices.", "Included in Apple One bundles.", "Consider if 5GB free tier is enough for iCloud Backup."] },
    { category: "Cloud Storage", id: 'googleone', name: "Google One",        alternatives: [ { name: "iCloud+", link: "https://apple.com/icloud" }, { name: "Mega (Free 20GB)", link: "https://mega.nz" } ], tips: ["Expands Google storage for Gmail, Photos, Drive.", "Family sharing available.", "Check if Google Photos compress mode (free) meets your needs."] },
    { category: "Cloud Storage", id: 'dropbox',   name: "Dropbox",           alternatives: [ { name: "Google Drive (Free 15GB)", link: "https://drive.google.com" }, { name: "OneDrive", link: "https://onedrive.live.com" } ], tips: ["Free tier available (2GB — very limited).", "Google Drive or OneDrive are usually better value.", "Dropbox excels at team collaboration features."] },
    { category: "Cloud Storage", id: 'onedrive',  name: "OneDrive",          alternatives: [ { name: "Google Drive (Free)", link: "https://drive.google.com" }, { name: "iCloud+", link: "https://apple.com/icloud" } ], tips: ["Often included with Microsoft 365 (1TB per user).", "Free 5GB tier available.", "Great value if you already pay for Microsoft 365."] },
    { category: "Cloud Storage", id: 'storage_other', name: "Other Cloud Storage", isGeneric: true, alternatives: [ { name: "Google Drive (15GB Free)", link: "https://drive.google.com" }, { name: "Mega (20GB Free)", link: "https://mega.nz" }, { name: "OneDrive (5GB Free)", link: "https://onedrive.live.com" } ], tips: ["Stack free tiers from multiple providers for 40+ GB free.", "External hard drives cost less per GB long-term."] },

    // -- VPN --
    { category: "VPN", id: 'nordvpn',   name: "NordVPN",     alternatives: [ { name: "ProtonVPN (Free)", link: "https://protonvpn.com/free-vpn" }, { name: "Mullvad VPN", link: "https://mullvad.net" }, { name: "Surfshark", link: "https://surfshark.com" } ], tips: ["Long-term plans (2yr) significantly cheaper per month.", "Often has deals via tech review sites.", "Verify via independent audits — NordVPN has passed multiple."] },
    { category: "VPN", id: 'expressvpn', name: "ExpressVPN", alternatives: [ { name: "NordVPN", link: "https://nordvpn.com" }, { name: "ProtonVPN", link: "https://protonvpn.com" } ], tips: ["Known for speed, but more expensive than alternatives.", "Longer plans are cheaper per month.", "Mullvad and ProtonVPN offer stronger privacy at lower cost."] },
    { category: "VPN", id: 'surfshark',  name: "Surfshark",  alternatives: [ { name: "NordVPN", link: "https://nordvpn.com" }, { name: "ProtonVPN", link: "https://protonvpn.com" } ], tips: ["Unlimited simultaneous connections — great for families.", "Often bundled with antivirus features.", "Long-term plans offer exceptional value."] },
    { category: "VPN", id: 'protonvpn',  name: "ProtonVPN",  alternatives: [ { name: "Mullvad VPN", link: "https://mullvad.net" }, { name: "ProtonVPN Free Tier", link: "https://protonvpn.com/free-vpn" } ], tips: ["Strong privacy focus from Swiss-based company.", "Free tier has no data cap (just speed/server limits).", "Mullvad VPN has strong privacy and accepts cash/crypto."] },
    { category: "VPN", id: 'vpn_other',  name: "Other VPN",  isGeneric: true, alternatives: [ { name: "ProtonVPN (Free Unlimited)", link: "https://protonvpn.com/free-vpn" }, { name: "Windscribe (10GB/mo Free)", link: "https://windscribe.com" } ], tips: ["Never use a truly free VPN (most sell your data).", "ProtonVPN is the only reputable free option with no data cap.", "Check r/VPN for unbiased recommendations."] },

    // -- Fitness & Wellness --
    { category: "Fitness & Wellness", id: 'peloton',     name: "Peloton App",          alternatives: [ { name: "Nike Training Club (Free)", link: "https://nike.com/ntc-app" }, { name: "Darebee (Free)", link: "https://darebee.com" }, { name: "YouTube Fitness", link: null } ], tips: ["Cheaper than All-Access hardware membership.", "YouTube has comparable free workouts from top trainers.", "Nike Training Club is completely free with excellent content."] },
    { category: "Fitness & Wellness", id: 'applefitness', name: "Apple Fitness+",       alternatives: [ { name: "Peloton App", link: "https://www.onepeloton.com/app" }, { name: "Nike Training Club (Free)", link: "https://nike.com/ntc-app" } ], tips: ["Requires Apple Watch.", "Included in Apple One Premier bundle.", "Nike Training Club offers free comparable content."] },
    { category: "Fitness & Wellness", id: 'calm',         name: "Calm Premium",         alternatives: [ { name: "Insight Timer (Free)", link: "https://insighttimer.com" }, { name: "YouTube meditation", link: null } ], tips: ["Insight Timer has 100,000+ free guided meditations.", "Look for annual discounts or lifetime deals.", "YouTube has excellent free guided meditation channels."] },
    { category: "Fitness & Wellness", id: 'headspace',    name: "Headspace",            alternatives: [ { name: "Insight Timer (Free)", link: "https://insighttimer.com" }, { name: "Calm Premium", link: "https://calm.com" } ], tips: ["Guided meditation and mindfulness exercises.", "Student/Family plans available.", "Insight Timer's free tier vastly outclasses Headspace's free version."] },
    { category: "Fitness & Wellness", id: 'strava',       name: "Strava Premium",       alternatives: [ { name: "Strava (Free)", link: "https://strava.com" } ], tips: ["Free tier covers activity tracking and social features.", "Premium adds advanced analytics, route planning.", "MapMyRun/Ride free tier is a solid alternative."] },
    { category: "Fitness & Wellness", id: 'gym_high',     name: "Gym Membership (High-End)", alternatives: [ { name: "Budget gym", link: null }, { name: "Home workout resources", link: null }, { name: "YouTube Fitness", link: null } ], tips: ["Utilize ALL amenities (classes, pool, sauna) to justify the cost.", "Negotiate rates, especially in January and September.", "Look for corporate discount through your employer."] },
    { category: "Fitness & Wellness", id: 'gym_budget',   name: "Gym Membership (Budget)", alternatives: [ { name: "Home workouts (Darebee)", link: "https://darebee.com" }, { name: "Outdoor exercise", link: null } ], tips: ["Ensure location and hours work with your schedule.", "Beware of long contracts and cancellation fees.", "Bodyweight home training can be just as effective."] },
    { category: "Fitness & Wellness", id: 'fitness_other', name: "Other Fitness/Wellness App", isGeneric: true, alternatives: [ { name: "YouTube Fitness (Free)", link: null }, { name: "Nike Training Club (Free)", link: "https://nike.com/ntc-app" }, { name: "Darebee (Free)", link: "https://darebee.com" } ], tips: ["Check for free trials before committing.", "r/Fitness wiki has free beginner programs better than most apps.", "Annual payment usually 20–40% cheaper than monthly."] },

    // -- Meal Kits & Food --
    { category: "Meal Kits & Food", id: 'hellofresh',  name: "HelloFresh",  alternatives: [ { name: "Budget Bytes (Free recipes)", link: "https://budgetbytes.com" }, { name: "Mealime (Free meal plans)", link: "https://mealime.com" }, { name: "EveryPlate (Cheaper)", link: "https://everyplate.com" } ], tips: ["Wide variety of recipes.", "Skip weeks when not needed — easy via app.", "Cost per serving often 2–3x more than cooking from a grocery list."] },
    { category: "Meal Kits & Food", id: 'blueapron',   name: "Blue Apron",  alternatives: [ { name: "HelloFresh", link: "https://hellofresh.com" }, { name: "Budget Bytes (Free recipes)", link: "https://budgetbytes.com" } ], tips: ["Convenient but typically more expensive than groceries.", "Look for introductory offers.", "Supercook.com finds recipes from ingredients you already have."] },
    { category: "Meal Kits & Food", id: 'factor',      name: "Factor_ (Prepared Meals)", alternatives: [ { name: "Frozen meals from grocery", link: null }, { name: "Meal prepping at home", link: null } ], tips: ["Very convenient but expensive per meal.", "Compare cost per serving vs. cooking the same dish at home.", "Batch cooking on weekends can achieve similar convenience."] },
    { category: "Meal Kits & Food", id: 'food_other',  name: "Other Meal Kit/Food Sub",  isGeneric: true, alternatives: [ { name: "Budget Bytes (Free)", link: "https://budgetbytes.com" }, { name: "Supercook.com (Free)", link: "https://supercook.com" }, { name: "r/mealprep guides", link: null } ], tips: ["Compare cost per serving vs. grocery shopping.", "Skip deliveries when traveling or eating out — don't waste.", "r/mealprep community can help you replicate the convenience for a fraction of the cost."] },

    // -- Subscription Boxes --
    { category: "Subscription Boxes", id: 'ipsy',      name: "Ipsy Glam Bag",  alternatives: [ { name: "Sephora samples (with orders)", link: "https://sephora.com" }, { name: "PINCHme free samples", link: "https://pinchme.com" } ], tips: ["Personalized beauty samples.", "Compare cost against buying the products you actually want directly.", "Many boxes let you 'peek' at contents before shipping — skip unfavorable months."] },
    { category: "Subscription Boxes", id: 'dsc',       name: "Dollar Shave Club", alternatives: [ { name: "Buy razors in bulk at Costco", link: null }, { name: "Safety razor (lower ongoing cost)", link: null } ], tips: ["Convenience is the main value here.", "Safety razors have high initial cost but blades are cents each.", "Compare per-blade cost against bulk buying at warehouse stores."] },
    { category: "Subscription Boxes", id: 'box_other', name: "Other Subscription Box",  isGeneric: true, alternatives: [ { name: "PINCHme (Free samples)", link: "https://pinchme.com" }, { name: "ThredUp (Secondhand)", link: "https://thredup.com" }, { name: "Poshmark (Secondhand)", link: "https://poshmark.com" } ], tips: ["Assess if the curation value outweighs just buying what you want.", "Beware of items piling up unused.", "Secondhand platforms offer discovery at much lower cost."] },

    // -- Education & Learning --
    { category: "Education & Learning", id: 'masterclass', name: "MasterClass",     alternatives: [ { name: "Skillshare", link: "https://skillshare.com" }, { name: "Coursera (Free Audit)", link: "https://coursera.org" }, { name: "YouTube educational channels", link: null } ], tips: ["High production value from celebrity instructors.", "Annual subscription — set a goal to complete 12+ classes.", "YouTube channels like YaleCourses offer similar depth for free."] },
    { category: "Education & Learning", id: 'skillshare',  name: "Skillshare",      alternatives: [ { name: "Udemy (Pay per course)", link: "https://udemy.com" }, { name: "freeCodeCamp (Free)", link: "https://freecodecamp.org" } ], tips: ["Best for creative/design skills.", "Courses have no set end date — self-discipline required.", "Udemy sales (often $10–15/course) can be cheaper if you take 3 or fewer courses/year."] },
    { category: "Education & Learning", id: 'courseraplus', name: "Coursera Plus",   alternatives: [ { name: "Coursera (Free Audit)", link: "https://coursera.org" }, { name: "edX (Free Audit)", link: "https://edx.org" }, { name: "Khan Academy (Free)", link: "https://khanacademy.org" } ], tips: ["Only worthwhile if completing 3+ courses/year.", "Auditing courses is free — you lose graded assignments and certificates only.", "Many employers value LinkedIn Learning certs, available free via library."] },
    { category: "Education & Learning", id: 'linkedinlearning', name: "LinkedIn Learning", alternatives: [ { name: "LinkedIn Learning via Library (Free)", link: null }, { name: "freeCodeCamp (Free)", link: "https://freecodecamp.org" } ], tips: ["Many public libraries provide free access with a library card.", "Check your university — alumni often retain access.", "Focuses on business and technology skills relevant to careers."] },
    { category: "Education & Learning", id: 'education_other', name: "Other Education Platform", isGeneric: true, alternatives: [ { name: "Coursera/edX (Free Audit)", link: "https://coursera.org" }, { name: "freeCodeCamp (Free)", link: "https://freecodecamp.org" }, { name: "Khan Academy (Free)", link: "https://khanacademy.org" } ], tips: ["Audit options let you access course content free without a certificate.", "Libraries often provide free LinkedIn Learning, Udemy, and more.", "Buy individual courses on Udemy during sales (up to 90% off)."] }
];

// =====================================================
//  DOM REFERENCES
// =====================================================
const form              = document.getElementById('calculator-form');
const subscriptionSelect= document.getElementById('subscription-select');
const costInput         = document.getElementById('subscription-cost');
const frequencySelect   = document.getElementById('cost-frequency');
const usageInput        = document.getElementById('usage-frequency');
const resultsDiv        = document.getElementById('results');
const errorDiv          = document.getElementById('error-message');
const suggestionsDiv    = document.getElementById('suggestions');
const resourcesInner    = document.getElementById('resources-inner');
const calculateBtn      = document.getElementById('calculate-btn');
const resetBtn          = document.getElementById('reset-btn');
const currentYearSpan   = document.getElementById('current-year');
const usageMinus        = document.getElementById('usage-minus');
const usagePlus         = document.getElementById('usage-plus');

// Result display elements
const meterFill    = document.getElementById('meter-fill');
const meterPointer = document.getElementById('meter-pointer');
const costPerUseEl = document.getElementById('cost-per-use');
const costPerUseSub= document.getElementById('cost-per-use-sub');
const monthlyCostEl= document.getElementById('monthly-cost');
const annualCostEl = document.getElementById('annual-cost');
const dailyCostEl  = document.getElementById('daily-cost');
const verdictBanner= document.getElementById('verdict-banner');
const verdictEmoji = document.getElementById('verdict-emoji');
const verdictText  = document.getElementById('verdict-text');
const verdictDetail= document.getElementById('verdict-detail');
const savingsPrompt= document.getElementById('savings-prompt');
const savingsAmount= document.getElementById('savings-amount');

// =====================================================
//  INITIALISATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    populateDropdown();
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // Usage +/− buttons
    usageMinus.addEventListener('click', () => adjustUsage(-1));
    usagePlus.addEventListener('click',  () => adjustUsage(+1));
});

function adjustUsage(delta) {
    const current = parseInt(usageInput.value) || 0;
    const next = Math.max(0, current + delta);
    usageInput.value = next;
    usageInput.dispatchEvent(new Event('input'));
}

function populateDropdown() {
    const categories = {};
    subscriptionsData.forEach(sub => {
        if (!categories[sub.category]) categories[sub.category] = [];
        categories[sub.category].push(sub);
    });

    Object.keys(categories).sort().forEach(cat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = cat;
        categories[cat]
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(sub => {
                const opt = document.createElement('option');
                opt.value = sub.id;
                opt.textContent = sub.name;
                optgroup.appendChild(opt);
            });
        subscriptionSelect.appendChild(optgroup);
    });
}

// =====================================================
//  FORM EVENTS
// =====================================================
form.addEventListener('submit', e => {
    e.preventDefault();
    setLoadingState(true);
    setTimeout(runCalculation, 30); // tiny delay to let UI update
});

resetBtn.addEventListener('click', () => {
    form.reset();
    hideError();
    hideResults();
    setLoadingState(false);
    subscriptionSelect.focus();
});

// =====================================================
//  CALCULATION PIPELINE
// =====================================================
function runCalculation() {
    hideError();

    const id     = subscriptionSelect.value;
    const cost   = parseFloat(costInput.value);
    const freq   = frequencySelect.value;
    const usage  = parseInt(usageInput.value, 10);

    // Validate
    if (!id)                          { showError("Please select a subscription."); setLoadingState(false); return; }
    if (isNaN(cost) || cost < 0)      { showError("Please enter a valid cost (e.g. 15.99)."); setLoadingState(false); return; }
    if (isNaN(usage) || usage < 0)    { showError("Please enter how many times you use it per month (0 or more)."); setLoadingState(false); return; }

    const sub = subscriptionsData.find(s => s.id === id);
    if (!sub) { showError("Subscription not found. Please refresh the page."); setLoadingState(false); return; }

    // Compute
    const monthlyCost = freq === 'yearly' ? cost / 12 : cost;
    const annualCost  = monthlyCost * 12;
    const dailyCost   = monthlyCost / 30.44;
    const costPerUse  = usage === 0 ? Infinity : monthlyCost / usage;

    displayResult({ monthlyCost, annualCost, dailyCost, costPerUse, usage, sub });
    setLoadingState(false);
}

// =====================================================
//  DISPLAY RESULTS
// =====================================================
function displayResult({ monthlyCost, annualCost, dailyCost, costPerUse, usage, sub }) {
    // --- Store for Save button ---
    _currentResult = null; // reset first

    // --- Verdict logic ---
    let verdict, verdictClass, emoji, detailMsg, meterPct, showSuggestions;

    if (costPerUse === Infinity) {
        verdict       = "Complete Waste";
        verdictClass  = "verdict-wasted";
        emoji         = "🚨";
        detailMsg     = `You're paying ${fmt(monthlyCost)}/month for something you never use. That's ${fmt(annualCost)} a year for nothing.`;
        meterPct      = 2;
        showSuggestions = true;
    } else if (costPerUse <= THRESHOLD_GOOD) {
        verdict       = "Great Value! Worth It.";
        verdictClass  = "verdict-good";
        emoji         = "✅";
        detailMsg     = `At ${fmt(costPerUse)} per use, this subscription is working hard for you. Keep it — or look for a cheaper tier to save even more.`;
        meterPct      = Math.min(98, 65 + (THRESHOLD_GOOD / Math.max(costPerUse, 0.01)) * 10);
        showSuggestions = false;
    } else if (costPerUse <= THRESHOLD_CONSIDER) {
        verdict       = "Worth Reconsidering";
        verdictClass  = "verdict-consider";
        emoji         = "⚠️";
        detailMsg     = `${fmt(costPerUse)} per use is on the expensive side. Using it more, finding a cheaper tier, or exploring free alternatives could save you money.`;
        meterPct      = 40;
        showSuggestions = true;
    } else {
        verdict       = "Likely Wasted Money";
        verdictClass  = "verdict-wasted";
        emoji         = "🔴";
        detailMsg     = `At ${fmt(costPerUse)} per use, you're overpaying significantly. Consider cancelling or using it much more frequently to justify the cost.`;
        meterPct      = Math.max(5, 35 - (costPerUse - THRESHOLD_CONSIDER) * 3);
        showSuggestions = true;
    }

    // --- Update meter ---
    // Gradient: left=wasted(red), right=good(green). meterPct = position of pointer.
    meterFill.style.left    = meterPct + '%';
    meterFill.style.width   = (100 - meterPct) + '%';
    meterPointer.style.left = meterPct + '%';

    // --- Update cards ---
    costPerUseEl.textContent  = costPerUse === Infinity ? '∞' : fmt(costPerUse);
    costPerUseSub.textContent = costPerUse === Infinity
        ? 'You never use it!'
        : `${usage} use${usage === 1 ? '' : 's'} per month`;
    monthlyCostEl.textContent  = fmt(monthlyCost);
    annualCostEl.textContent   = fmt(annualCost);
    dailyCostEl.textContent    = fmt(dailyCost);

    // Color the cost-per-use based on verdict
    costPerUseEl.style.color =
        verdictClass === 'verdict-good'    ? 'var(--emerald)' :
        verdictClass === 'verdict-consider'? 'var(--amber)'   : 'var(--red)';

    // --- Update verdict banner ---
    verdictBanner.className = `verdict-banner ${verdictClass}`;
    verdictEmoji.textContent = emoji;
    verdictText.textContent  = verdict;
    verdictDetail.textContent = detailMsg;

    // Trigger banner transition
    setTimeout(() => verdictBanner.classList.add('visible'), 50);

    // --- Savings prompt ---
    if (showSuggestions && costPerUse !== 0) {
        savingsAmount.textContent = fmt(annualCost);
        savingsPrompt.classList.add('visible');
    } else {
        savingsPrompt.classList.remove('visible');
    }

    // --- Show / hide free resources ---
    if (showSuggestions) {
        buildResourcesSection(sub);
        suggestionsDiv.classList.add('visible');
        suggestionsDiv.style.display = 'block';
        setTimeout(() => suggestionsDiv.classList.add('visible'), 80);
    } else {
        suggestionsDiv.classList.remove('visible');
        suggestionsDiv.style.display = 'none';
        resourcesInner.innerHTML = '';
    }

    // --- Store result for Save button ---
    _currentResult = { monthlyCost, annualCost, dailyCost, costPerUse, usage, sub, verdictClass };

    // --- Show results ---
    resultsDiv.classList.add('visible');
}

function fmt(n) {
    if (!isFinite(n)) return '∞';
    return CURRENCY_SYMBOL + n.toFixed(2);
}

// =====================================================
//  BUILD FREE RESOURCES SECTION (Blog)
// =====================================================
function buildResourcesSection(sub) {
    const catRes = categoryResources[sub.category];
    let html = '';

    // ---- Header ----
    html += `
        <div class="resources-header">
            <h3>Free Alternatives & Resources</h3>
            <span class="resources-tag">Save Money</span>
        </div>
    `;

    if (sub.isGeneric) {
        html += `<p class="category-note">Showing general recommendations for the "${sub.category}" category.</p>`;
    }

    // ---- Alternatives from DB ----
    if (sub.alternatives && sub.alternatives.length > 0) {
        html += `<div class="alts-section"><p class="section-subtitle">🔄 Paid Alternatives to Consider</p><ul class="alts-list">`;
        sub.alternatives.forEach(alt => {
            if (!alt || !alt.name) return;
            const hasLink = alt.link && alt.link !== '#';
            const freeNote = alt.link === null ? '<span class="alt-note">Free</span>' : '';
            if (hasLink) {
                html += `<li>${freeNote}<a href="${alt.link}" target="_blank" rel="noopener noreferrer">${alt.name}</a>${freeNote}</li>`;
            } else {
                html += `<li>${alt.name} ${freeNote}</li>`;
            }
        });
        html += `</ul></div>`;
    }

    // ---- Tips ----
    if (sub.tips && sub.tips.length > 0) {
        html += `<div class="tips-section"><p class="section-subtitle">💡 Money-Saving Tips</p><ul class="tips-list">`;
        sub.tips.forEach(tip => { html += `<li>${tip}</li>`; });
        html += `</ul></div>`;
    }

    // ---- Free Sites Blog Section ----
    if (catRes) {
        html += `
            <hr class="resource-divider">
            <div class="blog-section">
                <div class="blog-header">
                    <h4>🌐 Top 5 Free Legal Alternatives for ${sub.category}</h4>
                    <span class="blog-badge blog-badge--free">100% Free · Legal</span>
                </div>
                <div class="free-sites-grid">
        `;
        catRes.freeSites.forEach(site => {
            html += `
                <a class="free-site-card" href="${site.url}" target="_blank" rel="noopener noreferrer" aria-label="${site.name} — ${site.desc}">
                    <span class="site-rank">#${site.rank}</span>
                    <span class="site-icon">${site.icon}</span>
                    <span class="site-info">
                        <span class="site-name">${site.name}</span>
                        <span class="site-desc">${site.desc}</span>
                    </span>
                    <span class="site-arrow" aria-hidden="true">↗</span>
                </a>
            `;
        });
        html += `</div></div>`;

        // ---- Reddit Section ----
        html += `
            <div class="blog-section">
                <div class="blog-header">
                    <h4>🤝 Community Advice on Reddit</h4>
                    <span class="blog-badge blog-badge--community">Community</span>
                </div>
                <div class="reddit-card">
                    <div class="reddit-intro">
                        <strong>Join ${catRes.subreddit.name}</strong>
                        <p>${catRes.subredditDesc}</p>
                    </div>
                    <div class="reddit-link-row">
                        <a class="reddit-link" href="${catRes.subreddit.url}" target="_blank" rel="noopener noreferrer">
                            <span class="reddit-link-icon">🔗</span>
                            Visit ${catRes.subreddit.name}
                        </a>
                        <p class="reddit-newcomer-note">
                            <strong>New to Reddit?</strong> ${catRes.newcomerTip}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // ---- FMHY Reference ----
    html += `
        <hr class="resource-divider">
        <div class="fmhy-card">
            <span class="fmhy-icon">📚</span>
            <div class="fmhy-content">
                <strong>Looking for even more free resources?</strong>
                <p>
                    The <a href="https://fmhy.net" target="_blank" rel="noopener noreferrer">FMHY Wiki (fmhy.net)</a>
                    is a community-maintained index of free resources across every category. Browse the section
                    relevant to your subscription for comprehensive alternatives.
                    <em>Always exercise caution and understand any legal implications when using third-party resources.</em>
                </p>
            </div>
        </div>
    `;

    resourcesInner.innerHTML = html;
}

// =====================================================
//  UI STATE HELPERS
// =====================================================
function setLoadingState(loading) {
    if (loading) {
        calculateBtn.disabled = true;
        calculateBtn.classList.add('loading');
        calculateBtn.querySelector('.btn-text').textContent = 'Calculating…';
    } else {
        calculateBtn.disabled = false;
        calculateBtn.classList.remove('loading');
        calculateBtn.querySelector('.btn-text').textContent = 'Calculate Value';
    }
}

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'flex';
}

function hideError() {
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
}

function hideResults() {
    resultsDiv.classList.remove('visible');
    verdictBanner.classList.remove('visible');
    savingsPrompt.classList.remove('visible');
    suggestionsDiv.classList.remove('visible');
    suggestionsDiv.style.display = 'none';
    resourcesInner.innerHTML = '';
    // Reset meter
    meterFill.style.width   = '100%';
    meterFill.style.left    = '0';
    meterPointer.style.left = '0%';
    // Reset save button
    _currentResult = null;
    if (saveAction) saveAction.classList.remove('visible');
    if (saveConfirm) saveConfirm.classList.remove('visible');
    if (saveBtn) {
        saveBtn.classList.remove('saved');
        saveBtn.querySelector('.save-btn-text').textContent = 'Save to My List';
    }
}


// =====================================================
//  MY SUBSCRIPTIONS — localStorage Feature
//  Key: "wowi:subscriptions"
//  Each entry: { id, name, category, monthlyCost,
//                annualCost, costPerUse, usage,
//                verdict, savedAt }
// =====================================================

const STORAGE_KEY = 'wowi:subscriptions';

// DOM refs for list feature
const saveBtn        = document.getElementById('save-btn');
const saveAction     = document.getElementById('save-action');
const saveConfirm    = document.getElementById('save-confirm');
const mylistSection  = document.getElementById('mylist-section');
const mylistItems    = document.getElementById('mylist-items');
const mylistEmpty    = document.getElementById('mylist-empty');
const mylistBadge    = document.getElementById('mylist-count-badge');
const mylistClearBtn = document.getElementById('mylist-clear-btn');
const totalMonthlyEl = document.getElementById('total-monthly');
const totalAnnualEl  = document.getElementById('total-annual');
const totalWasteEl   = document.getElementById('total-waste');
const totalGoodEl    = document.getElementById('total-good');
const wasteBarGood   = document.getElementById('waste-bar-good');
const wasteBarMid    = document.getElementById('waste-bar-mid');
const wasteBarWaste  = document.getElementById('waste-bar-waste');

// Current result stored here so Save button can access it
let _currentResult = null;

// ── Load list on page start ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderList();
});

// ── Hook: called from displayResult() ───────────────
// We patch this in — displayResult sets _currentResult and shows Save button
const _originalDisplayResult = displayResult;
// We extend displayResult via the end of the file instead (see below)

// ── Save Button ──────────────────────────────────────
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        if (!_currentResult) return;
        saveEntry(_currentResult);
    });
}

// ── Clear All ────────────────────────────────────────
if (mylistClearBtn) {
    mylistClearBtn.addEventListener('click', () => {
        if (!confirm('Clear all saved subscriptions? This cannot be undone.')) return;
        localStorage.removeItem(STORAGE_KEY);
        renderList();
    });
}

// ── Read / Write helpers ─────────────────────────────
function readList() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
}

function writeList(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
    catch (e) { console.warn('localStorage write failed:', e); }
}

// ── Save entry ───────────────────────────────────────
function saveEntry(result) {
    const list = readList();

    // Prevent exact duplicates (same id + same cost + same usage)
    const exists = list.some(e =>
        e.subId === result.sub.id &&
        Math.abs(e.monthlyCost - result.monthlyCost) < 0.01 &&
        e.usage === result.usage
    );
    if (exists) {
        flashConfirm('Already saved!', false);
        return;
    }

    const entry = {
        entryId:    Date.now(),               // unique key for deletion
        subId:      result.sub.id,
        name:       result.sub.name,
        category:   result.sub.category,
        monthlyCost: result.monthlyCost,
        annualCost:  result.annualCost,
        costPerUse:  result.costPerUse,
        usage:       result.usage,
        verdict:     result.verdictClass,     // 'verdict-good' | 'verdict-consider' | 'verdict-wasted'
        savedAt:     new Date().toISOString()
    };

    list.unshift(entry); // newest first
    writeList(list);
    renderList();
    flashConfirm('Saved! ✓', true);

    // Mark button as saved briefly
    saveBtn.classList.add('saved');
    saveBtn.querySelector('.save-btn-text').textContent = 'Saved ✓';
    setTimeout(() => {
        saveBtn.classList.remove('saved');
        saveBtn.querySelector('.save-btn-text').textContent = 'Save to My List';
    }, 2500);
}

function flashConfirm(msg, isGood) {
    saveConfirm.textContent = msg;
    saveConfirm.style.color = isGood ? 'var(--emerald-dk)' : 'var(--amber-dk)';
    saveConfirm.classList.add('visible');
    setTimeout(() => saveConfirm.classList.remove('visible'), 2500);
}

// ── Delete entry ─────────────────────────────────────
function deleteEntry(entryId) {
    const list = readList().filter(e => e.entryId !== entryId);
    writeList(list);
    renderList();
}

// ── Render full list ─────────────────────────────────
function renderList() {
    const list = readList();

    // Show/hide section
    if (list.length === 0) {
        mylistSection.classList.remove('visible');
        return;
    }
    mylistSection.classList.add('visible');

    // Badge count
    mylistBadge.textContent = list.length;

    // Compute totals
    let totalMonthly = 0, totalWaste = 0, totalGoodAmt = 0, totalMid = 0;
    list.forEach(e => {
        totalMonthly += e.monthlyCost;
        if (e.verdict === 'verdict-wasted')  totalWaste   += e.monthlyCost;
        if (e.verdict === 'verdict-good')    totalGoodAmt += e.monthlyCost;
        if (e.verdict === 'verdict-consider')totalMid     += e.monthlyCost;
    });

    totalMonthlyEl.textContent = fmtAmt(totalMonthly);
    totalAnnualEl.textContent  = fmtAmt(totalMonthly * 12);
    totalWasteEl.textContent   = fmtAmt(totalWaste);
    totalGoodEl.textContent    = fmtAmt(totalGoodAmt);

    // Spend breakdown bar
    if (totalMonthly > 0) {
        wasteBarGood.style.width  = ((totalGoodAmt / totalMonthly) * 100).toFixed(1) + '%';
        wasteBarMid.style.width   = ((totalMid      / totalMonthly) * 100).toFixed(1) + '%';
        wasteBarWaste.style.width = ((totalWaste    / totalMonthly) * 100).toFixed(1) + '%';
    }

    // Empty state
    mylistEmpty.classList.toggle('visible', list.length === 0);

    // Render items
    mylistItems.innerHTML = list.map(e => buildItemHTML(e)).join('');

    // Bind delete buttons
    mylistItems.querySelectorAll('.item-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteEntry(Number(btn.dataset.id)));
    });
}

function buildItemHTML(e) {
    const dotClass = e.verdict === 'verdict-good'
        ? 'item-dot--good'
        : e.verdict === 'verdict-consider'
        ? 'item-dot--consider'
        : 'item-dot--wasted';

    const cpuClass = dotClass.replace('dot', 'cpu');

    const cpuText = !isFinite(e.costPerUse) || e.costPerUse === Infinity
        ? '∞/use — Not Used!'
        : fmtAmt(e.costPerUse) + '/use';

    const verdictLabel = e.verdict === 'verdict-good'
        ? '✅ Worth It'
        : e.verdict === 'verdict-consider'
        ? '⚠️ Consider'
        : '🔴 Wasted';

    const dateStr = new Date(e.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    return `
        <li class="mylist-item" data-entry="${e.entryId}">
            <span class="item-dot ${dotClass}" aria-hidden="true"></span>
            <div class="item-info">
                <span class="item-name" title="${e.name}">${e.name}</span>
                <div class="item-meta">
                    <span>${fmtAmt(e.monthlyCost)}/mo</span>
                    <span>·</span>
                    <span>${e.usage}×/mo</span>
                    <span>·</span>
                    <span>${verdictLabel}</span>
                    <span>·</span>
                    <span>Saved ${dateStr}</span>
                </div>
            </div>
            <span class="item-cpu ${cpuClass}" aria-label="Cost per use: ${cpuText}">${cpuText}</span>
            <button class="item-delete" data-id="${e.entryId}" aria-label="Remove ${e.name} from list" title="Remove">
                ✕
            </button>
        </li>
    `;
}

function fmtAmt(n) {
    if (!isFinite(n)) return '∞';
    return '$' + n.toFixed(2);
}

// ── Patch displayResult to expose _currentResult ────
//    and show the Save button
//    (runs after the main displayResult in the file)
const _originalShowResults = resultsDiv;

// Intercept via MutationObserver on results becoming visible
const _resultObserver = new MutationObserver(() => {
    if (resultsDiv.classList.contains('visible') && _currentResult) {
        saveAction.classList.add('visible');
    } else {
        saveAction.classList.remove('visible');
        saveConfirm.classList.remove('visible');
    }
});
_resultObserver.observe(resultsDiv, { attributes: true, attributeFilter: ['class'] });
