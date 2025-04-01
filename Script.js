// === Configuration ===
const CURRENCY_SYMBOL = '$';
const THRESHOLD_GOOD = 2.00; // <= $2.00/use is good value
const THRESHOLD_CONSIDER = 5.00; // > $2.00 and <= $5.00/use needs consideration

// === Subscription Data (Expanded Frontend Database) ===
// NOTE: Links are mostly placeholders (#). Replace with real/affiliate links if desired.
const subscriptionsData = [
    // -- Streaming Video --
    { category: "Streaming Video", id: 'netflix_ads', name: "Netflix (Standard with Ads)", alternatives: [ { name: "Hulu (with Ads)", link: "#" }, { name: "Peacock Premium", link: "#" }, { name: "Paramount+ Essential", link: "#" }, { name: "Freevee", link: null }, { name: "Tubi", link: null } ], tips: ["Bundle options may exist (e.g., Verizon +play).", "Still allows downloads."] },
    { category: "Streaming Video", id: 'netflix_std', name: "Netflix (Standard)", alternatives: [ { name: "Hulu (No Ads)", link: "#" }, { name: "Max", link: "#" }, { name: "Disney+ Premium", link: "#" }, { name: "Netflix (Standard w/ Ads)", link: "#" } ], tips: ["Consider 'Basic' if HD/multiple screens aren't needed.", "Share accounts within household per terms."] },
    { category: "Streaming Video", id: 'netflix_prem', name: "Netflix (Premium)", alternatives: [ { name: "Netflix (Standard)", link: "#" } /* Consider downgrade */ ], tips: ["Only needed for 4K/UHD and 4+ simultaneous screens.", "Share accounts within household per terms."] },
    { category: "Streaming Video", id: 'hulu_ads', name: "Hulu (with Ads)", alternatives: [ { name: "Netflix (Standard w/ Ads)", link: "#" }, { name: "Peacock Premium", link: "#" } ], tips: ["Often bundled with Disney+ and ESPN+.", "Includes next-day access to many network shows."] },
    { category: "Streaming Video", id: 'hulu_noads', name: "Hulu (No Ads)", alternatives: [ { name: "Netflix (Standard)", link: "#" }, { name: "Max", link: "#" } ], tips: ["Bundle with Disney+/ESPN+ often provides value.", "Allows downloads."] },
    { category: "Streaming Video", id: 'disneyplus', name: "Disney+ Premium", alternatives: [ { name: "Hulu", link: "#" }, { name: "Paramount+", link: "#" } /* For kids content */ ], tips: ["Bundle with Hulu/ESPN+ is common.", "Look for annual payment discounts."] },
    { category: "Streaming Video", id: 'max', name: "Max (formerly HBO Max)", alternatives: [ { name: "Netflix", link: "#" }, { name: "Hulu", link: "#" }, { name: "Showtime (via Paramount+)", link: "#" } ], tips: ["Often included with AT&T plans (check eligibility).", "Offers high-quality originals."] },
    { category: "Streaming Video", id: 'primevideo', name: "Amazon Prime Video", alternatives: [ { name: "Netflix", link: "#" }, { name: "Hulu", link: "#" } ], tips: ["Included with Amazon Prime membership.", "Can add channels (like Max, Paramount+) within Prime Video."] },
    { category: "Streaming Video", id: 'appletvplus', name: "Apple TV+", alternatives: [ { name: "Netflix", link: "#" }, { name: "Max", link: "#" } ], tips: ["Often comes free for a period with new Apple devices.", "Included in Apple One bundles.", "Focuses on high-budget originals."] },
    { category: "Streaming Video", id: 'paramountplus', name: "Paramount+ (with Showtime)", alternatives: [ { name: "Max", link: "#" }, { name: "Peacock", link: "#" } ], tips: ["Includes Showtime content.", "'Essential' plan is cheaper but has ads & lacks Showtime.", "Offers live sports (NFL)."] },
    { category: "Streaming Video", id: 'peacock', name: "Peacock Premium/Premium Plus", alternatives: [ { name: "Hulu", link: "#" }, { name: "Paramount+", link: "#" } ], tips: ["Often included with Comcast/Xfinity.", "Free tier available with limited content.", "Has live sports (Premier League)."] },
    { category: "Streaming Video", id: 'crunchyroll', name: "Crunchyroll", alternatives: [ { name: "HIDIVE", link: "#" }, { name: "Netflix (Anime section)", link: "#" } ], tips: ["Leading service for Anime.", "Free tier available with ads."] },
    { category: "Streaming Video", id: 'slingtv', name: "Sling TV (Orange/Blue)", alternatives: [ { name: "YouTube TV", link: "#" }, { name: "Hulu + Live TV", link: "#" }, { name: "FuboTV", link: "#" } ], tips: ["Cheaper live TV option.", "Channel lineup differs between Orange & Blue plans."] },
    { category: "Streaming Video", id: 'youtubetv', name: "YouTube TV", alternatives: [ { name: "Hulu + Live TV", link: "#" }, { name: "Sling TV", link: "#" }, { name: "FuboTV", link: "#" } ], tips: ["Comprehensive channel list.", "Unlimited cloud DVR."] },
    { category: "Streaming Video", id: 'video_other', name: "Other Streaming Video Service", isGeneric: true, alternatives: [ { name: "Check library services (Kanopy, Hoopla)", link: null }, { name: "Free ad-supported services (Tubi, Freevee, Pluto TV)", link: null }, { name: "Antenna for local channels", link: null } ], tips: ["Rotate subscriptions - cancel and resubscribe when needed.", "Look for annual discounts.", "Check if cheaper tiers meet your needs."] },

    // -- Streaming Music --
    { category: "Streaming Music", id: 'spotify_prem', name: "Spotify Premium", alternatives: [ { name: "Apple Music", link: "#" }, { name: "YouTube Music Premium", link: "#" }, { name: "Amazon Music Unlimited", link: "#" }, { name: "Spotify (Free)", link: null } ], tips: ["Use Family/Duo plans.", "Student discounts available.", "Download for offline listening."] },
    { category: "Streaming Music", id: 'applemusic', name: "Apple Music", alternatives: [ { name: "Spotify Premium", link: "#" }, { name: "YouTube Music Premium", link: "#" } ], tips: ["Included in Apple One bundles.", "Family/Student plans available."] },
    { category: "Streaming Music", id: 'youtubemusic', name: "YouTube Music Premium", alternatives: [ { name: "Spotify Premium", link: "#" }, { name: "Apple Music", link: "#" } ], tips: ["Often bundled with YouTube Premium (ad-free YouTube).", "Family/Student plans."] },
    { category: "Streaming Music", id: 'amazonmusic', name: "Amazon Music Unlimited", alternatives: [ { name: "Spotify Premium", link: "#" }, { name: "Apple Music", link: "#" } ], tips: ["Cheaper for Prime members.", "Included (limited version) with Prime."] },
    { category: "Streaming Music", id: 'tidal', name: "Tidal (HiFi/HiFi Plus)", alternatives: [ { name: "Spotify Premium", link: "#" }, { name: "Qobuz", link: "#" }, { name: "Apple Music (Lossless)", link: null } ], tips: ["Focuses on higher fidelity audio.", "Various tiers available."] },
    { category: "Streaming Music", id: 'music_other', name: "Other Music Streaming Service", isGeneric: true, alternatives: [ { name: "Use free tiers (Spotify, Pandora, YouTube Music)", link: null }, { name: "Listen to radio/podcasts", link: null }, { name: "Buy music directly (Bandcamp, iTunes)", link: null } ], tips: ["Check family/student plans.", "Download playlists to save mobile data."] },

    // -- Gaming --
    { category: "Gaming", id: 'gamepass_ultimate', name: "Xbox Game Pass Ultimate", alternatives: [ { name: "PC Game Pass", link: "#" }, { name: "Xbox Game Pass Core", link: "#" }, { name: "PlayStation Plus Extra/Premium", link: "#" } ], tips: ["Includes PC Game Pass, Xbox Live Gold (Core), EA Play, Cloud Gaming.", "Best value if using multiple platforms."] },
    { category: "Gaming", id: 'gamepass_pc', name: "PC Game Pass", alternatives: [ { name: "Xbox Game Pass Ultimate", link: "#" }, { name: "Humble Choice", link: "#" }, { name: "Buying games individually (Steam, GOG)", link: null } ], tips: ["Large library of PC games.", "Includes EA Play."] },
    { category: "Gaming", id: 'psplus_extra', name: "PlayStation Plus Extra", alternatives: [ { name: "PS Plus Premium", link: "#" }, { name: "PS Plus Essential", link: "#" }, { name: "Xbox Game Pass", link: "#" } ], tips: ["Includes game catalog (like Game Pass).", "Essential tier only provides online multiplayer & monthly games."] },
    { category: "Gaming", id: 'psplus_premium', name: "PlayStation Plus Premium", alternatives: [ { name: "PS Plus Extra", link: "#" } ], tips: ["Adds classic game catalog and cloud streaming to Extra tier benefits."] },
    { category: "Gaming", id: 'switch_online', name: "Nintendo Switch Online + Expansion Pack", alternatives: [ { name: "Nintendo Switch Online (Basic)", link: "#" } ], tips: ["Needed for online play.", "Basic tier offers NES/SNES games.", "Expansion adds N64/Genesis/GBA games & DLC."] },
    { category: "Gaming", id: 'humble_choice', name: "Humble Choice", alternatives: [ { name: "PC Game Pass", link: "#" } ], tips: ["Receive a selection of PC games to keep each month.", "Supports charity."] },
    { category: "Gaming", id: 'gaming_other', name: "Other Gaming Service (EA Play, Ubisoft+, etc.)", isGeneric: true, alternatives: [ { name: "Buying games on sale", link: null }, { name: "Free-to-play games", link: null }, { name: "Subscription services covering multiple publishers (Game Pass, PS Plus Extra)", link: "#" } ], tips: ["Check if included in other bundles (e.g., EA Play in Game Pass).", "Subscribe only when playing specific games from the catalog."] },

    // -- News & Magazines --
    { category: "News & Magazines", id: 'nyt', name: "New York Times (Digital)", alternatives: [ { name: "Washington Post", link: "#" }, { name: "Local newspaper", link: "#" }, { name: "Apple News+", link: "#" }, { name: "Library access", link: null } ], tips: ["Look for intro offers.", "Student/Educator discounts.", "Basic Digital vs. All Access."] },
    { category: "News & Magazines", id: 'wapo', name: "Washington Post (Digital)", alternatives: [ { name: "New York Times", link: "#" }, { name: "Local newspaper", link: "#" } ], tips: ["Often cheaper than NYT.", "Intro offers available."] },
    { category: "News & Magazines", id: 'wsj', name: "Wall Street Journal (Digital)", alternatives: [ { name: "Bloomberg", link: "#" }, { name: "Financial Times", link: "#" } ], tips: ["Focuses on business/finance.", "Student rates available."] },
    { category: "News & Magazines", id: 'applenewsplus', name: "Apple News+", alternatives: [ { name: "Subscribing to individual publications", link: null }, { name: "Texture (via library - RBdigital)", link: null } ], tips: ["Bundles many magazines and some newspapers.", "Included in Apple One Premier."] },
    { category: "News & Magazines", id: 'news_other', name: "Other News/Magazine Subscription", isGeneric: true, alternatives: [ { name: "Check library digital access (PressReader, Libby)", link: null }, { name: "Use free news aggregators (Google News, Feedly free tier)", link: null }, { name: "Follow reputable sources on social media/RSS", link: null } ], tips: ["Look for introductory or annual discounts.", "Consider if a bundle like Apple News+ is cheaper."] },

    // -- Software & Productivity --
    { category: "Software & Productivity", id: 'm365', name: "Microsoft 365 (Personal/Family)", alternatives: [ { name: "Google Workspace Individual", link: "#" }, { name: "LibreOffice (Free)", link: null }, { name: "Apple iWork (Free)", link: null }, { name: "Free web versions (Word Online, etc.)", link: null } ], tips: ["Family plan allows sharing with up to 5 others.", "Includes Office apps + OneDrive storage."] },
    { category: "Software & Productivity", id: 'google_workspace', name: "Google Workspace (Individual/Business)", alternatives: [ { name: "Microsoft 365", link: "#" } ], tips: ["Individual plan adds features to free Gmail/Docs.", "Business plans offer more storage/admin features."] },
    { category: "Software & Productivity", id: 'adobe_cc', name: "Adobe Creative Cloud (All Apps)", alternatives: [ { name: "Individual Adobe App subscription", link: "#" }, { name: "Affinity Suite (One-time purchase)", link: "#" }, { name: "DaVinci Resolve (Free/Paid)", link: null }, { name: "Canva Pro", link: "#" } ], tips: ["Very expensive, ensure you use multiple apps frequently.", "Photography plan (Photoshop/Lightroom) is much cheaper.", "Student discounts available."] },
    { category: "Software & Productivity", id: 'adobe_photo', name: "Adobe Creative Cloud (Photography Plan)", alternatives: [ { name: "Affinity Photo", link: "#" }, { name: "Capture One", link: "#" }, { name: "Luminar Neo", link: "#" }, { name: "GIMP (Free)", link: null }, { name: "darktable (Free)", link: null } ], tips: ["Includes Photoshop & Lightroom.", "Much cheaper than full CC All Apps."] },
    { category: "Software & Productivity", id: 'canva_pro', name: "Canva Pro", alternatives: [ { name: "Adobe Express", link: "#" }, { name: "Canva (Free)", link: null }, { name: "Figma (Free/Paid)", link: null } ], tips: ["Adds features like background remover, more templates/stock photos, brand kit."] },
    { category: "Software & Productivity", id: 'grammarly_prem', name: "Grammarly Premium", alternatives: [ { name: "ProWritingAid", link: "#" }, { name: "Built-in checkers (Word, Google Docs)", link: null }, { name: "Grammarly (Free)", link: null } ], tips: ["Adds advanced checks for style, clarity, plagiarism."] },
    { category: "Software & Productivity", id: 'software_other', name: "Other SaaS/Software Subscription", isGeneric: true, alternatives: [ { name: "Look for free alternatives (search 'free alternative to [software]')", link: null }, { name: "Check for one-time purchase options", link: null }, { name: "Utilize free tiers or trials", link: null } ], tips: ["Review usage regularly.", "Check if a lower tier plan is sufficient.", "Look for lifetime deals (AppSumo, etc.) but be cautious."] },

    // -- Cloud Storage --
    { category: "Cloud Storage", id: 'icloud', name: "iCloud+", alternatives: [ { name: "Google One", link: "#" }, { name: "Dropbox", link: "#" }, { name: "OneDrive", link: "#" } ], tips: ["Integrates seamlessly with Apple devices.", "Included in Apple One bundles.", "Free 5GB tier."] },
    { category: "Cloud Storage", id: 'googleone', name: "Google One", alternatives: [ { name: "iCloud+", link: "#" }, { name: "Dropbox", link: "#" }, { name: "OneDrive", link: "#" } ], tips: ["Expands Google account storage (Gmail, Photos, Drive).", "Offers VPN & other perks on higher tiers.", "Family sharing available."] },
    { category: "Cloud Storage", id: 'dropbox', name: "Dropbox (Plus/Family)", alternatives: [ { name: "Google One", link: "#" }, { name: "OneDrive", link: "#" }, { name: "Sync.com", link: "#" } ], tips: ["Focuses on file sync/sharing.", "Free tier available (smaller storage)."] },
    { category: "Cloud Storage", id: 'onedrive', name: "OneDrive (Standalone)", alternatives: [ { name: "Google One", link: "#" }, { name: "Dropbox", link: "#" }, { name: "iCloud+", link: "#" } ], tips: ["Often included with Microsoft 365 (1TB per user).", "Integrates well with Windows."] },
    { category: "Cloud Storage", id: 'storage_other', name: "Other Cloud Storage", isGeneric: true, alternatives: [ { name: "Utilize free tiers from multiple providers", link: null }, { name: "External hard drives / NAS for local backup", link: null } ], tips: ["Regularly clean out unused files.", "Check if storage is bundled with other services you use (M365, Prime)."] },

    // -- VPN --
    { category: "VPN", id: 'nordvpn', name: "NordVPN", alternatives: [ { name: "ExpressVPN", link: "#" }, { name: "Surfshark", link: "#" }, { name: "ProtonVPN", link: "#" } ], tips: ["Look for long-term plan discounts.", "Often has deals via affiliate links/review sites."] },
    { category: "VPN", id: 'expressvpn', name: "ExpressVPN", alternatives: [ { name: "NordVPN", link: "#" }, { name: "Surfshark", link: "#" } ], tips: ["Known for speed and ease of use, often more expensive.", "Longer plans are cheaper per month."] },
    { category: "VPN", id: 'surfshark', name: "Surfshark", alternatives: [ { name: "NordVPN", link: "#" }, { name: "Private Internet Access", link: "#" } ], tips: ["Allows unlimited simultaneous connections.", "Often bundled with other security features."] },
    { category: "VPN", id: 'protonvpn', name: "ProtonVPN", alternatives: [ { name: "Mullvad VPN", link: "#" }, { name: "NordVPN", link: "#" } ], tips: ["Strong privacy focus.", "Free tier available (limited servers/speed)."] },
    { category: "VPN", id: 'vpn_other', name: "Other VPN Service", isGeneric: true, alternatives: [ { name: "Consider free options (ProtonVPN free tier) but be aware of limitations/privacy concerns", link: null } ], tips: ["Choose reputable providers.", "Long-term plans offer significant savings.", "Only needed if you require privacy/geo-unblocking."] },

    // -- Fitness & Wellness --
    { category: "Fitness & Wellness", id: 'peloton', name: "Peloton App Membership", alternatives: [ { name: "Apple Fitness+", link: "#" }, { name: "Nike Training Club (Free/Premium)", link: "#" }, { name: "YouTube Fitness Channels", link: null } ], tips: ["Cheaper than the All-Access membership required for Peloton hardware.", "Wide variety of class types."] },
    { category: "Fitness & Wellness", id: 'applefitness', name: "Apple Fitness+", alternatives: [ { name: "Peloton App", link: "#" }, { name: "Daily Burn", link: "#" } ], tips: ["Requires Apple Watch.", "Included in Apple One Premier bundle."] },
    { category: "Fitness & Wellness", id: 'strava', name: "Strava Premium", alternatives: [ { name: "MapMyRun/Ride (Free/Premium)", link: "#" }, { name: "Strava (Free)", link: null } ], tips: ["Adds advanced analytics, route planning, beacon features."] },
    { category: "Fitness & Wellness", id: 'calm', name: "Calm Premium", alternatives: [ { name: "Headspace", link: "#" }, { name: "Insight Timer (Free/Premium)", link: "#" }, { name: "YouTube meditation videos", link: null } ], tips: ["Meditation, sleep stories, music.", "Look for annual discounts or lifetime options (rare)."] },
    { category: "Fitness & Wellness", id: 'headspace', name: "Headspace", alternatives: [ { name: "Calm", link: "#" }, { name: "Balance", link: "#" } ], tips: ["Guided meditation, mindfulness exercises.", "Student/Family plans."] },
    { category: "Fitness & Wellness", id: 'gym_high', name: "Gym Membership (High-End)", alternatives: [ { name: "Mid-range/Budget Gym", link: "#" }, { name: "ClassPass", link: "#" }, { name: "Home gym setup", link: null } ], tips: ["Utilize all amenities (classes, pool, etc.).", "Negotiate rates or look for corporate discounts."] },
    { category: "Fitness & Wellness", id: 'gym_budget', name: "Gym Membership (Budget)", alternatives: [ { name: "Home workouts", link: null }, { name: "Outdoor exercise", link: null }, { name: "Fitness apps", link: "#" } ], tips: ["Ensure location/hours are convenient.", "Beware of long contracts/cancellation fees."] },
    { category: "Fitness & Wellness", id: 'fitness_other', name: "Other Fitness/Wellness App/Service", isGeneric: true, alternatives: [ { name: "Utilize free workout videos (YouTube)", link: null }, { name: "Bodyweight exercises at home", link: null }, { name: "Outdoor activities (walking, running, hiking)", link: null } ], tips: ["Check for free trials.", "Consider if cheaper apps meet your needs.", "Look for annual payment discounts."] },

    // -- Meal Kits & Food --
    { category: "Meal Kits & Food", id: 'blueapron', name: "Blue Apron", alternatives: [ { name: "HelloFresh", link: "#" }, { name: "Home Chef", link: "#" }, { name: "Grocery shopping + online recipes", link: null } ], tips: ["Convenient but often more expensive than groceries.", "Look for introductory offers."] },
    { category: "Meal Kits & Food", id: 'hellofresh', name: "HelloFresh", alternatives: [ { name: "Blue Apron", link: "#" }, { name: "EveryPlate (Cheaper sibling brand)", link: "#" }, { name: "Meal planning + grocery shopping", link: null } ], tips: ["Wide variety of recipes.", "Skip weeks when not needed."] },
    { category: "Meal Kits & Food", id: 'factor', name: "Factor_ (Prepared Meals)", alternatives: [ { name: "CookUnity", link: "#" }, { name: "Frozen meals from grocery store", link: null }, { name: "Meal prepping at home", link: null } ], tips: ["Pre-cooked, just heat and eat.", "More expensive than meal kits."] },
    { category: "Meal Kits & Food", id: 'food_other', name: "Other Meal Kit/Food Subscription", isGeneric: true, alternatives: [ { name: "Meal planning services (e.g., eMeals) + grocery shopping", link: "#" }, { name: "Grocery delivery services (Instacart, etc.)", link: "#" }, { name: "Cooking at home from scratch", link: null } ], tips: ["Compare cost per serving vs. groceries.", "Take advantage of intro discounts but track renewal price.", "Skip deliveries when traveling or eating out."] },

    // -- Subscription Boxes --
    { category: "Subscription Boxes", id: 'birchbox', name: "Birchbox", alternatives: [ { name: "Ipsy", link: "#" }, { name: "Buying travel-size items", link: null } ], tips: ["Beauty samples.", "Value depends on discovering new products."] },
    { category: "Subscription Boxes", id: 'ipsy', name: "Ipsy Glam Bag", alternatives: [ { name: "Birchbox", link: "#" }, { name: "BoxyCharm", link: "#" } ], tips: ["Personalized beauty samples.", "Different tiers available."] },
    { category: "Subscription Boxes", id: 'dsc', name: "Dollar Shave Club", alternatives: [ { name: "Harry's", link: "#" }, { name: "Buying razors in bulk (Costco, etc.)", link: null }, { name: "Safety razor (higher initial cost, cheap blades)", link: null } ], tips: ["Convenience for razor/grooming supplies.", "Adjust frequency as needed."] },
    { category: "Subscription Boxes", id: 'box_other', name: "Other Subscription Box (Clothing, Snacks, Hobbies)", isGeneric: true, alternatives: [ { name: "Buying items individually as needed", link: null }, { name: "Thrift stores / secondhand for clothing", link: null } ], tips: ["Assess if the value/curation is worth the cost.", "Check cancellation policy.", "Consider if you accumulate unused items."] },

    // -- Education & Learning --
    { category: "Education & Learning", id: 'masterclass', name: "MasterClass", alternatives: [ { name: "Skillshare", link: "#" }, { name: "Coursera", link: "#" }, { name: "YouTube educational channels", link: null }, { name: "Library resources (LinkedIn Learning)", link: null } ], tips: ["High production value classes taught by celebrities/experts.", "Annual subscription."] },
    { category: "Education & Learning", id: 'skillshare', name: "Skillshare", alternatives: [ { name: "Udemy", link: "#" }, { name: "LinkedIn Learning", link: "#" }, { name: "MasterClass", link: "#" } ], tips: ["Focuses on creative skills.", "Project-based learning."] },
    { category: "Education & Learning", id: 'courseraplus', name: "Coursera Plus", alternatives: [ { name: "edX", link: "#" }, { name: "Paying for individual Coursera courses/specializations", link: null } ], tips: ["Access to a large portion of the Coursera catalog.", "Best value if taking multiple courses/year."] },
    { category: "Education & Learning", id: 'linkedinlearning', name: "LinkedIn Learning", alternatives: [ { name: "Skillshare", link: "#" }, { name: "Udemy", link: "#" } ], tips: ["Often available free through libraries or universities.", "Focuses on business/tech skills."] },
    { category: "Education & Learning", id: 'education_other', name: "Other Education/Learning Platform", isGeneric: true, alternatives: [ { name: "Check library for free access (LinkedIn Learning, Kanopy, etc.)", link: null }, { name: "Utilize free courses (Coursera audit, edX audit, YouTube)", link: null }, { name: "Buy individual courses during sales (Udemy)", link: null } ], tips: ["Assess how many courses you realistically complete.", "Check for free trials or audit options."] }
    // --- Add more categories and subscriptions here ---
];

// === DOM Elements ===
const form = document.getElementById('calculator-form');
const subscriptionSelect = document.getElementById('subscription-select');
const costInput = document.getElementById('subscription-cost');
const frequencySelect = document.getElementById('cost-frequency');
const usageInput = document.getElementById('usage-frequency');
const resultsDiv = document.getElementById('results');
const resultContentDiv = document.getElementById('result-content');
const errorMessageDiv = document.getElementById('error-message');
const suggestionsDiv = document.getElementById('suggestions');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn'); // Get reset button
const currencySymbolSpan = document.querySelector('.currency-symbol'); // For label
const currentYearSpan = document.getElementById('current-year');

// === Functions ===

/**
 * Populates the subscription dropdown menu, grouped by category.
 */
function populateSubscriptionDropdown() {
    const categories = {};
    // Group subscriptions by category
    subscriptionsData.forEach(sub => {
        if (!categories[sub.category]) {
            categories[sub.category] = [];
        }
        categories[sub.category].push(sub);
    });

    // Sort categories alphabetically
    const sortedCategories = Object.keys(categories).sort();

    // Create optgroups and options
    sortedCategories.forEach(categoryName => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = categoryName;

        // Sort subscriptions within category alphabetically
        const sortedSubs = categories[categoryName].sort((a, b) => a.name.localeCompare(b.name));

        sortedSubs.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.id; // Use unique ID
            option.textContent = sub.name;
            option.dataset.category = sub.category; // Store category for potential future use
            optgroup.appendChild(option);
        });
        subscriptionSelect.appendChild(optgroup);
    });
}

/**
 * Finds a subscription object by its unique ID.
 * @param {string} id - The ID of the subscription.
 * @returns {object | undefined} The subscription object or undefined if not found.
 */
function getSubscriptionById(id) {
    return subscriptionsData.find(sub => sub.id === id);
}

/**
 * Validates form inputs.
 * @returns {boolean} True if all inputs are valid, false otherwise.
 */
function validateInputs() {
    const selectedSubscriptionId = subscriptionSelect.value;
    const cost = parseFloat(costInput.value);
    const usage = parseInt(usageInput.value, 10); // Use radix 10

    if (!selectedSubscriptionId) {
        showError("Please select a subscription from the list.");
        return false;
    }
    if (isNaN(cost) || cost < 0) {
        showError("Please enter a valid, non-negative number for the cost.");
        costInput.focus(); // Focus the problematic field
        return false;
    }
     if (isNaN(usage) || !Number.isInteger(usage) || usage < 0) { // Ensure integer >= 0
        showError("Please enter a valid whole number (0 or greater) for usage frequency.");
        usageInput.focus(); // Focus the problematic field
        return false;
    }
    return true; // All valid
}

/**
 * Calculates the cost per use and triggers display.
 */
function calculateCostPerUse() {
    hideError(); // Clear previous errors first
    hideResults(); // Hide previous results briefly

    if (!validateInputs()) {
        enableCalculateButton(); // Re-enable button if validation fails
        return; // Stop if validation fails
    }

    // Get validated inputs
    const selectedSubscriptionId = subscriptionSelect.value;
    const cost = parseFloat(costInput.value);
    const frequency = frequencySelect.value;
    const usage = parseInt(usageInput.value, 10);
    const selectedSubscription = getSubscriptionById(selectedSubscriptionId);

    if (!selectedSubscription) {
        showError("Selected subscription data not found. Please refresh and try again.");
        enableCalculateButton();
        return;
    }

    // Calculate monthly cost
    let monthlyCost = frequency === 'yearly' ? cost / 12 : cost;

    // Calculate cost per use (handle zero usage)
    const costPerUse = usage === 0 ? Infinity : monthlyCost / usage;

    // Display the result
    displayResult(monthlyCost, costPerUse, selectedSubscription);
}

/**
 * Displays the calculation results and verdict.
 * @param {number} monthlyCost - The calculated monthly cost.
 * @param {number} costPerUse - The calculated cost per use (can be Infinity).
 * @param {object} subscription - The selected subscription data object.
 */
function displayResult(monthlyCost, costPerUse, subscription) {
    let verdictText = '';
    let verdictClass = '';
    let showSuggestions = false;

    // Dynamic thresholds could be added here based on category if needed
    // let currentThresholdGood = THRESHOLD_GOOD;
    // let currentThresholdConsider = THRESHOLD_CONSIDER;

    let costPerUseFormatted;

    if (costPerUse === Infinity) {
        costPerUseFormatted = "Infinite (not used!)";
        verdictText = "Clear Waste!";
        verdictClass = 'verdict-wasted';
        showSuggestions = true;
    } else {
        costPerUseFormatted = `${CURRENCY_SYMBOL}${costPerUse.toFixed(2)}`;

        if (costPerUse <= THRESHOLD_GOOD) {
            verdictText = "Good Value!";
            verdictClass = 'verdict-good';
            showSuggestions = false; // Typically don't need suggestions if it's good value
        } else if (costPerUse <= THRESHOLD_CONSIDER) {
            verdictText = "Consider Alternatives";
            verdictClass = 'verdict-consider';
            showSuggestions = true;
        } else { // costPerUse > THRESHOLD_CONSIDER
            verdictText = "Likely Wasted!";
            verdictClass = 'verdict-wasted';
            showSuggestions = true;
        }
    }

    // Build result HTML
    resultContentDiv.innerHTML = `
        <p>Subscription: <strong>${subscription.name}</strong></p>
        <p>Estimated Monthly Cost: ${CURRENCY_SYMBOL}${monthlyCost.toFixed(2)}</p>
        <p>Cost Per Use: <span id="cost-per-use">${costPerUseFormatted}</span></p>
        <p>Verdict: <span id="verdict" class="${verdictClass}">${verdictText}</span></p>
    `;

    // Show results section with transition
    resultsDiv.classList.add('visible');

    // Show/hide and populate suggestions
    if (showSuggestions) {
        populateSuggestions(subscription);
        suggestionsDiv.classList.add('visible'); // Use class for transition
    } else {
        suggestionsDiv.classList.remove('visible');
        suggestionsDiv.innerHTML = ''; // Clear content when hiding
    }
    enableCalculateButton(); // Re-enable button after calculation finishes
}

/**
 * Populates the suggestions area based on the selected subscription.
 * @param {object} subscription - The selected subscription data object.
 */
function populateSuggestions(subscription) {
    let suggestionsHTML = `<h3>Alternatives & Tips for ${subscription.name}</h3>`;

    if (subscription.isGeneric) {
        suggestionsHTML += `<p class="category-note">Showing general suggestions for the "${subscription.category}" category:</p>`;
    }

    // Add Alternatives List
    if (subscription.alternatives && subscription.alternatives.length > 0) {
        suggestionsHTML += `<p class="tips-intro">Consider these alternatives:</p><ul>`;
        subscription.alternatives.forEach(alt => {
             // Check if alt is an object and has a name property
            if (typeof alt === 'object' && alt !== null && alt.name) {
                if (alt.link && alt.link !== '#') {
                     // Use 'sponsored' rel for affiliate links if applicable
                     const rel = alt.link.includes('?') ? 'noopener sponsored' : 'noopener noreferrer';
                     suggestionsHTML += `<li><a href="${alt.link}" target="_blank" rel="${rel}">${alt.name}</a></li>`;
                } else {
                    suggestionsHTML += `<li>${alt.name}${alt.link === null ? ' (Free/Check Local)' : ''}</li>`; // Indicate free/local if link is null
                }
            } else if (typeof alt === 'string') { // Handle simple string alternatives (backward compatibility)
                suggestionsHTML += `<li>${alt}</li>`;
            }
        });
        suggestionsHTML += `</ul>`;
    } else if (!subscription.isGeneric) { // Only show if not generic AND no alternatives listed
        suggestionsHTML += `<p><em>No specific alternatives listed for this service.</em></p>`;
    }


    // Add Tips List
    if (subscription.tips && subscription.tips.length > 0) {
        suggestionsHTML += `<p class="tips-intro">Helpful Tips:</p><ul>`;
        subscription.tips.forEach(tip => {
            suggestionsHTML += `<li>${tip}</li>`;
        });
        suggestionsHTML += `</ul>`;
    }

    // Add FREEMEDIAHECKYEAH Wiki Reference (with caution note)
    suggestionsHTML += `
        <div class="fmhy-link-section">
            <p><strong>Looking for more free options?</strong></p>
            <p>
                The <a href="https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index/" target="_blank" rel="noopener noreferrer">FREEMEDIAHECKYEAH Wiki</a>
                on Reddit indexes many free resources. Explore relevant sections for potential alternatives.
            </p>
            <p class="caution">
                Note: Exercise caution and understand potential legal/security risks when using unofficial sources found via external links. This tool does not endorse specific external resources.
            </p>
        </div>
    `;

    suggestionsDiv.innerHTML = suggestionsHTML;
}

/**
 * Displays an error message in the designated area.
 * @param {string} message - The error message to display.
 */
function showError(message) {
    resultContentDiv.innerHTML = ''; // Clear any valid results
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    resultsDiv.classList.add('visible'); // Show the results div to display the error
    suggestionsDiv.classList.remove('visible'); // Hide suggestions on error
    suggestionsDiv.innerHTML = '';
}

/** Hides the error message area. */
function hideError() {
    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';
}

/** Hides the results and suggestions areas. */
function hideResults() {
    resultsDiv.classList.remove('visible');
    suggestionsDiv.classList.remove('visible');
    // Use setTimeout to clear content after transition ends, preventing content jump
     setTimeout(() => {
         if (!resultsDiv.classList.contains('visible')) {
            resultContentDiv.innerHTML = '';
         }
        if (!suggestionsDiv.classList.contains('visible')) {
             suggestionsDiv.innerHTML = '';
        }
     }, 500); // Match transition duration in CSS
}

/** Disables the calculate button and shows a loading state. */
function disableCalculateButton() {
    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';
}

/** Enables the calculate button and restores original text. */
function enableCalculateButton() {
    calculateBtn.disabled = false;
    calculateBtn.textContent = 'Calculate';
}


/** Resets the form and clears results/suggestions. */
function handleReset() {
    form.reset(); // Native form reset
    hideError();
    hideResults();
    enableCalculateButton(); // Ensure button is enabled
    subscriptionSelect.focus(); // Focus the first field
}

// === Event Listeners ===
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    disableCalculateButton(); // Show loading state immediately
    // Use a tiny timeout to allow the UI to update before potential blocking calculation
    setTimeout(calculateCostPerUse, 10);
});

// Add event listener for the reset button
resetBtn.addEventListener('click', handleReset);


// === Initial Setup ===
// Run functions after the DOM is fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    populateSubscriptionDropdown();
    // Set currency symbol in label
    if (currencySymbolSpan) {
        currencySymbolSpan.textContent = CURRENCY_SYMBOL;
    }
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});