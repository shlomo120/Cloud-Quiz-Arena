/**
 * questions-topup-hybrid-p21.js — Phase 21 coverage top-up: Hybrid (10 questions).
 * Deepens thin difficulty slices in the hybrid domain. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-hybrid-p21",
  label: "Hybrid Connectivity — Phase 21 Top-up",
  questions: [
    {
      id: "p21-hyb-001",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Compared to a dedicated private connection, a site-to-site VPN over the public internet primarily trades off which characteristic?",
      question_he:
        "בהשוואה לחיבור פרטי ייעודי, VPN מסוג site-to-site דרך האינטרנט הציבורי מוותר בעיקר על איזה מאפיין?",
      options: [
        "Consistent, guaranteed bandwidth and latency",
        "The ability to encrypt traffic at all",
        "The ability to route between networks",
        "Support for more than one subnet on-premises",
      ],
      options_he: [
        "רוחב פס ועיכוב עקביים ומובטחים",
        "היכולת להצפין תעבורה בכלל",
        "היכולת לנתב בין רשתות",
        "תמיכה ביותר מתת-רשת אחת בסביבה המקומית",
      ],
      correctAnswer: 0,
      explanation:
        "A VPN Gateway tunnels traffic over the shared public internet, so bandwidth and latency vary with internet conditions and congestion. A dedicated connection like ExpressRoute or Direct Connect provides a predictable, SLA-backed circuit instead. The VPN still encrypts traffic and can route multiple subnets — those aren't what you give up.",
      explanation_he:
        "VPN Gateway מעביר תעבורה דרך האינטרנט הציבורי המשותף, ולכן רוחב הפס והעיכוב משתנים בהתאם לעומס וברשת. חיבור ייעודי כמו ExpressRoute או Direct Connect מספק מעגל צפוי המגובה ב-SLA. ה-VPN עדיין מצפין תעבורה ויכול לנתב מספר תתי-רשתות — אלה לא מה שמוותרים עליו.",
      resourceTitle: "VPN Gateway overview",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-about-vpngateways",
      keywords: ["vpn", "bandwidth", "latency", "sla"],
      tooltipTerms: ["VPN Gateway"],
    },
    {
      id: "p21-hyb-002",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Using dynamic routing (BGP) between an on-premises router and a cloud VPN gateway allows routes to be learned and updated automatically, without an administrator manually editing route tables during a failover.",
      question_he:
        "שימוש בניתוב דינמי (BGP) בין נתב מקומי לבין שער VPN בענן מאפשר למסלולים להילמד ולהתעדכן אוטומטית, מבלי שמנהל מערכת יערוך ידנית את טבלאות הניתוב בעת מעבר לגיבוי.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "BGP dynamically advertises and withdraws routes as links go up or down, so traffic automatically reroutes to a healthy path during a failover. Static routes require someone to manually change the routing table, which is slower and error-prone when a circuit fails. This is a core reason BGP is preferred for resilient hybrid connectivity.",
      explanation_he:
        "BGP מפרסם ומבטל מסלולים באופן דינמי כאשר קישורים עולים או נופלים, כך שהתעבורה מנותבת מחדש אוטומטית לנתיב תקין בעת כשל. מסלולים סטטיים דורשים שמישהו ישנה ידנית את טבלת הניתוב, מה שאיטי ורגיש לטעויות כשמעגל נכשל. זו סיבה מרכזית להעדפת BGP לחיבוריות היברידית עמידה.",
      resourceTitle: "About BGP with VPN Gateway",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-bgp-overview",
      keywords: ["bgp", "dynamic routing", "failover"],
      tooltipTerms: [],
    },
    {
      id: "p21-hyb-003",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A company plans a hybrid network where the on-premises data center uses 10.0.0.0/16 and a new cloud virtual network is also created as 10.0.0.0/16. What is the most likely consequence?",
      question_he:
        "חברה מתכננת רשת היברידית שבה מרכז הנתונים המקומי משתמש ב-10.0.0.0/16 ורשת וירטואלית חדשה בענן גם היא נוצרת כ-10.0.0.0/16. מה התוצאה הסבירה ביותר?",
      options: [
        "Overlapping address ranges will cause routing conflicts and break hybrid connectivity",
        "Nothing, cloud providers automatically renumber overlapping networks",
        "The VPN Gateway will silently translate all addresses using NAT by default",
        "Only DNS resolution will fail; routing will work normally",
      ],
      options_he: [
        "טווחי הכתובות החופפים יגרמו לקונפליקטים בניתוב וישברו את החיבוריות ההיברידית",
        "שום דבר, ספקי הענן ממספרים מחדש אוטומטית רשתות חופפות",
        "שער ה-VPN יתרגם כתובות בשקט באמצעות NAT כברירת מחדל",
        "רק פענוח DNS ייכשל; הניתוב יעבוד כרגיל",
      ],
      correctAnswer: 0,
      explanation:
        "When on-premises and cloud CIDR ranges overlap, routers cannot determine which network a given address belongs to, so traffic gets misrouted or dropped entirely. This must be fixed by re-addressing one side or using NAT explicitly, but neither happens automatically. Planning non-overlapping IP ranges before building hybrid connectivity avoids this entirely.",
      explanation_he:
        "כאשר טווחי CIDR מקומיים ובענן חופפים, הנתבים אינם יכולים לקבוע לאיזו רשת שייכת כתובת נתונה, ולכן תעבורה מנותבת בטעות או נזרקת לחלוטין. יש לתקן זאת על ידי מיעון מחדש של צד אחד או שימוש מפורש ב-NAT, אך אף אחד מהם לא קורה אוטומטית. תכנון טווחי IP שאינם חופפים מראש מונע זאת לחלוטין.",
      resourceTitle: "Plan virtual networks and address spaces",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-plan-design",
      keywords: ["cidr", "overlap", "ip addressing"],
      tooltipTerms: ["VPN Gateway"],
    },
    {
      id: "p21-hyb-004",
      providers: ["neutral"],
      domains: ["hybrid", "identity"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "An organization wants directory synchronization between its on-premises Active Directory and its cloud identity provider to work reliably. Why does this scenario depend on stable hybrid network connectivity?",
      question_he:
        "ארגון רוצה שסנכרון תיקיות בין Active Directory המקומי לבין ספק הזהויות בענן יעבוד באופן אמין. מדוע תרחיש זה תלוי בחיבוריות רשת היברידית יציבה?",
      options: [
        "The sync agent and authentication traffic must traverse the hybrid link continuously, so an unstable or high-latency connection causes sync failures and delayed logons",
        "Directory synchronization only uses email, so network connectivity is irrelevant",
        "Federation always replaces the need for any hybrid network connection",
        "SSO tokens are issued exclusively by the on-premises domain controller and never need networking",
      ],
      options_he: [
        "סוכן הסנכרון ותעבורת האימות חייבים לעבור דרך הקישור ההיברידי ברציפות, כך שחיבור לא יציב או עם עיכוב גבוה גורם לכשלי סנכרון והתחברות מאוחרת",
        "סנכרון תיקיות משתמש רק בדוא\"ל, כך שחיבוריות רשת אינה רלוונטית",
        "Federation תמיד מחליף את הצורך בכל חיבור רשת היברידי",
        "אסימוני SSO מונפקים אך ורק על ידי בקר הדומיין המקומי ואף פעם לא זקוקים לרשת",
      ],
      correctAnswer: 0,
      explanation:
        "Hybrid identity relies on directory-sync agents and, in federated scenarios, real-time calls back to on-premises infrastructure — both ride over the same hybrid connection used for other workloads. If that link is unstable or slow, sync cycles fail or lag and users may experience login delays or stale group memberships. This is why identity teams and network teams must plan hybrid bandwidth and redundancy together.",
      explanation_he:
        "זהות היברידית מסתמכת על סוכני סנכרון תיקיות, ובתרחישי Federation גם על קריאות בזמן אמת חזרה לתשתית המקומית — שתיהן עוברות דרך אותו קישור היברידי המשמש עומסי עבודה אחרים. אם הקישור לא יציב או איטי, מחזורי הסנכרון נכשלים או מתעכבים והמשתמשים עלולים לחוות עיכובים בהתחברות או חברות קבוצה לא מעודכנת. לכן צוותי זהות ורשת חייבים לתכנן יחד רוחב פס וגיבוי היברידיים.",
      resourceTitle: "Azure AD Connect sync: Understand and customize synchronization",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-plan-design",
      keywords: ["hybrid identity", "directory sync", "federation"],
      tooltipTerms: ["Federation", "SSO"],
    },
    {
      id: "p21-hyb-005",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "On-premises users report that they cannot resolve the hostnames of resources hosted in the cloud virtual network by name, only by IP address. What is the most likely missing configuration?",
      question_he:
        "משתמשים מקומיים מדווחים שאינם יכולים לפענח את שמות המארח של משאבים המתארחים ברשת הווירטואלית בענן לפי שם, אלא רק לפי כתובת IP. מה כנראה החסר בתצורה?",
      options: [
        "Conditional forwarding rules that send queries for the cloud domain to the cloud DNS servers, and vice versa",
        "A second VPN Gateway dedicated solely to DNS traffic",
        "Disabling BGP so DNS queries take a static path",
        "Replacing DNS entirely with the VPN Gateway's public IP address",
      ],
      options_he: [
        "כללי העברה מותנית (conditional forwarding) השולחים שאילתות לדומיין הענן לשרתי ה-DNS בענן, ולהפך",
        "שער VPN שני המיועד אך ורק לתעבורת DNS",
        "השבתת BGP כך ששאילתות DNS יעברו בנתיב סטטי",
        "החלפת DNS לחלוטין בכתובת ה-IP הציבורית של שער ה-VPN",
      ],
      correctAnswer: 0,
      explanation:
        "On-premises DNS servers don't natively know about cloud-hosted domain zones, and cloud-managed DNS doesn't know about on-premises zones. Conditional forwarders tell each DNS server to forward queries for the other environment's domain suffix to the correct DNS servers over the hybrid link. Without this, only IP-based access works because no name resolution path exists between the two environments.",
      explanation_he:
        "שרתי DNS מקומיים אינם מכירים באופן טבעי אזורי דומיין המתארחים בענן, ו-DNS המנוהל בענן אינו מכיר אזורים מקומיים. מעביר מותנה (conditional forwarder) מורה לכל שרת DNS להעביר שאילתות לסיומת הדומיין של הסביבה השנייה לשרתי ה-DNS הנכונים דרך הקישור ההיברידי. ללא זה, רק גישה מבוססת IP עובדת כי אין נתיב פענוח שמות בין שתי הסביבות.",
      resourceTitle: "Name resolution for resources in Azure virtual networks",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-plan-design",
      keywords: ["dns", "conditional forwarding", "hybrid dns"],
      tooltipTerms: ["VPN Gateway"],
    },
    {
      id: "p21-hyb-006",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following are valid reasons to deploy redundant hybrid connectivity (for example, two VPN tunnels or two ExpressRoute/Direct Connect circuits) rather than a single link? (Select all that apply)",
      question_he:
        "אילו מהבאים הם סיבות תקפות לפרוס חיבוריות היברידית מיותרת (לדוגמה, שני מנהרות VPN או שני מעגלי ExpressRoute/Direct Connect) במקום קישור בודד? (בחר את כל התשובות הרלוונטיות)",
      options: [
        "A single circuit or tunnel is a single point of failure that can take down all hybrid connectivity if it fails",
        "Redundant paths allow maintenance on one link without a full outage",
        "Two links guarantee zero latency between on-premises and the cloud",
        "Active-active redundant links can also help distribute load across both paths",
      ],
      options_he: [
        "מעגל או מנהרה בודדים מהווים נקודת כשל יחידה שיכולה להפיל את כל החיבוריות ההיברידית אם היא נכשלת",
        "נתיבים מיותרים מאפשרים תחזוקה על קישור אחד ללא הפסקת שירות מלאה",
        "שני קישורים מבטיחים עיכוב אפס בין הסביבה המקומית לענן",
        "קישורים מיותרים במצב active-active יכולים גם לסייע בפיזור עומס בין שני הנתיבים",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "A single tunnel or circuit is a single point of failure — if it goes down (hardware fault, carrier outage, maintenance) all hybrid traffic stops. Redundant links let you fail over during outages or maintenance windows, and in an active-active design can also share load. No redundancy design guarantees zero latency; physical distance and processing still add delay.",
      explanation_he:
        "מנהרה או מעגל בודדים מהווים נקודת כשל יחידה — אם הם נופלים (תקלת חומרה, הפסקת ספק, תחזוקה) כל התעבורה ההיברידית נעצרת. קישורים מיותרים מאפשרים מעבר לגיבוי בזמן תקלות או חלונות תחזוקה, ובתכנון active-active יכולים גם לחלוק עומס. אף תכנון גיבוי לא מבטיח עיכוב אפס; מרחק פיזי ועיבוד עדיין מוסיפים השהיה.",
      resourceTitle: "Designing for high availability with ExpressRoute",
      resourceUrl: "https://learn.microsoft.com/azure/expressroute/designing-for-high-availability-with-expressroute",
      keywords: ["redundancy", "failover", "active-active", "single point of failure"],
      tooltipTerms: ["ExpressRoute", "Direct Connect"],
    },
    {
      id: "p21-hyb-007",
      providers: ["neutral"],
      domains: ["hybrid", "networking"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A company has five branch offices and one cloud virtual network. Instead of building a separate VPN tunnel from every branch directly into every workload virtual network, the architect proposes routing all hybrid traffic through one central hub virtual network. What is the main architectural benefit of this hub-and-spoke approach?",
      question_he:
        "לחברה חמישה סניפים ורשת וירטואלית אחת בענן. במקום לבנות מנהרת VPN נפרדת מכל סניף ישירות לכל רשת וירטואלית של עומס עבודה, הארכיטקט מציע לנתב את כל התעבורה ההיברידית דרך רשת וירטואלית מרכזית אחת (hub). מה היתרון הארכיטקטוני המרכזי בגישת hub-and-spoke זו?",
      options: [
        "Hybrid connectivity and shared services are centralized in the hub, so spoke networks don't each need their own on-premises connection and policy is managed in one place",
        "It eliminates the need for BGP entirely across the whole topology",
        "It removes the need for encryption on any spoke-to-hub traffic",
        "It guarantees the hub can never become a bottleneck regardless of traffic volume",
      ],
      options_he: [
        "החיבוריות ההיברידית והשירותים המשותפים ממורכזים ב-hub, כך שרשתות ה-spoke אינן זקוקות כל אחת לחיבור מקומי משלה והמדיניות מנוהלת במקום אחד",
        "זה מבטל לחלוטין את הצורך ב-BGP בכל הטופולוגיה",
        "זה מסיר את הצורך בהצפנה על תעבורת spoke-to-hub כלשהי",
        "זה מבטיח שה-hub לעולם לא יהפוך לצוואר בקבוק ללא קשר לנפח התעבורה",
      ],
      correctAnswer: 0,
      explanation:
        "In hub-and-spoke, the hub holds the shared VPN Gateway or ExpressRoute/Direct Connect circuit and shared services, while spoke virtual networks peer with the hub rather than each building their own on-premises connection. This centralizes routing policy, security appliances, and cost. It does not eliminate BGP or encryption needs, and the hub can absolutely become a bottleneck if not sized and monitored properly — that's a tradeoff to plan for, not a guarantee against.",
      explanation_he:
        "בטופולוגיית hub-and-spoke, ה-hub מחזיק את שער ה-VPN המשותף או מעגל ExpressRoute/Direct Connect ואת השירותים המשותפים, בעוד רשתות ה-spoke מתחברות (peering) ל-hub במקום לבנות כל אחת חיבור מקומי משלה. זה ממרכז מדיניות ניתוב, רכיבי אבטחה ועלות. זה לא מבטל את הצורך ב-BGP או הצפנה, וה-hub יכול בהחלט להפוך לצוואר בקבוק אם לא מתוכנן ומנוטר כראוי — זהו פשרה לתכנן ולא ערבות.",
      resourceTitle: "Hub-spoke network topology in Azure",
      resourceUrl: "https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-plan-design",
      keywords: ["hub and spoke", "topology", "transit routing", "peering"],
      tooltipTerms: ["VPN Gateway", "ExpressRoute", "Direct Connect", "Peering"],
    },
    {
      id: "p21-hyb-008",
      providers: ["neutral"],
      domains: ["hybrid", "resiliency"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A retailer relies on a single ExpressRoute circuit for all point-of-sale traffic between stores and a cloud inventory service. During a fiber cut, the circuit goes down and stores lose connectivity entirely because no fallback path exists. Which redesign most directly addresses this failure mode?",
      question_he:
        "קמעונאי מסתמך על מעגל ExpressRoute בודד עבור כל תעבורת נקודות המכירה בין החנויות לשירות המלאי בענן. במהלך חיתוך סיב אופטי, המעגל נופל והחנויות מאבדות חיבוריות לחלוטין כי אין נתיב גיבוי. איזה עיצוב מחדש מטפל בצורה הישירה ביותר במצב כשל זה?",
      options: [
        "Add a secondary connectivity path, such as a site-to-site VPN over the internet, configured with BGP so traffic automatically fails over if the ExpressRoute circuit goes down",
        "Increase the bandwidth of the existing ExpressRoute circuit",
        "Move the inventory service to a different cloud region without changing connectivity",
        "Switch from BGP to static routes so the path is more predictable",
      ],
      options_he: [
        "הוספת נתיב חיבוריות משני, כגון VPN מסוג site-to-site דרך האינטרנט, המוגדר עם BGP כך שהתעבורה עוברת אוטומטית לגיבוי אם מעגל ה-ExpressRoute נופל",
        "הגדלת רוחב הפס של מעגל ה-ExpressRoute הקיים",
        "העברת שירות המלאי לאזור ענן אחר מבלי לשנות את החיבוריות",
        "מעבר מ-BGP למסלולים סטטיים כדי שהנתיב יהיה צפוי יותר",
      ],
      correctAnswer: 0,
      explanation:
        "The root cause is a single point of failure at the physical circuit level; a fiber cut takes down the only path regardless of its bandwidth. Adding a diverse secondary path — a VPN tunnel over the internet — with BGP lets routes automatically shift to the surviving path when the primary fails. Increasing bandwidth or moving regions doesn't address having only one physical path, and static routes would make failover slower, not more reliable.",
      explanation_he:
        "השורש של הבעיה הוא נקודת כשל יחידה ברמת המעגל הפיזי; חיתוך סיב מפיל את הנתיב היחיד ללא קשר לרוחב הפס שלו. הוספת נתיב משני מגוון — מנהרת VPN דרך האינטרנט — עם BGP מאפשרת למסלולים לעבור אוטומטית לנתיב השורד כשהראשי נכשל. הגדלת רוחב פס או מעבר אזורים לא פותרים את בעיית הנתיב הפיזי היחיד, ומסלולים סטטיים היו הופכים את המעבר לגיבוי לאיטי יותר, לא אמין יותר.",
      resourceTitle: "Configure ExpressRoute and site-to-site VPN coexisting connections",
      resourceUrl: "https://learn.microsoft.com/azure/expressroute/expressroute-howto-coexist-resource-manager",
      keywords: ["expressroute", "failover", "resiliency", "single point of failure", "bgp"],
      tooltipTerms: ["ExpressRoute", "VPN Gateway"],
    },
    {
      id: "p21-hyb-009",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A security team insists that traffic sent over the dedicated private circuit (ExpressRoute/Direct Connect/Cloud Interconnect) between on-premises and the cloud must still be encrypted end-to-end, even though the circuit does not traverse the public internet. Which statement best justifies this requirement?",
      question_he:
        "צוות אבטחה מתעקש שתעבורה הנשלחת דרך המעגל הפרטי הייעודי (ExpressRoute/Direct Connect/Cloud Interconnect) בין הסביבה המקומית לענן חייבת עדיין להיות מוצפנת מקצה לקצה, למרות שהמעגל אינו עובר דרך האינטרנט הציבורי. איזה משפט מצדיק בצורה הטובה ביותר דרישה זו?",
      options: [
        "A private circuit isolates traffic from the public internet but does not itself guarantee confidentiality against interception within shared carrier infrastructure, so encryption in transit provides defense in depth",
        "ExpressRoute, Direct Connect, and Cloud Interconnect are technically incapable of carrying encrypted traffic",
        "Private circuits automatically encrypt all traffic, so this requirement is redundant and can be skipped",
        "Encryption is only useful for internet-based VPN tunnels, never for dedicated circuits",
      ],
      options_he: [
        "מעגל פרטי מבודד תעבורה מהאינטרנט הציבורי אך אינו מבטיח כשלעצמו סודיות מפני יירוט בתוך תשתית ספק משותפת, ולכן הצפנה במעבר מספקת הגנה מרובדת",
        "ExpressRoute, Direct Connect ו-Cloud Interconnect אינם מסוגלים טכנית לשאת תעבורה מוצפנת",
        "מעגלים פרטיים מצפינים אוטומטית את כל התעבורה, ולכן דרישה זו מיותרת וניתן לדלג עליה",
        "הצפנה שימושית רק עבור מנהרות VPN מבוססות אינטרנט, לעולם לא עבור מעגלים ייעודיים",
      ],
      correctAnswer: 0,
      explanation:
        "'Private' describes the path (not the shared public internet), not automatic confidentiality — the circuit still traverses carrier-operated infrastructure that the customer doesn't fully control. Encrypting traffic in transit over the dedicated circuit adds defense in depth against interception or misconfiguration at any point along that path. All three named services can carry encrypted traffic (e.g., IPsec over ExpressRoute/Direct Connect), so lack of capability is not the issue.",
      explanation_he:
        "'פרטי' מתאר את הנתיב (לא האינטרנט הציבורי המשותף), לא סודיות אוטומטית — המעגל עדיין עובר דרך תשתית המופעלת על ידי ספק שהלקוח לא שולט בה במלואה. הצפנת תעבורה במעבר על המעגל הייעודי מוסיפה הגנה מרובדת מפני יירוט או תצורה שגויה בכל נקודה לאורך הנתיב. כל שלושת השירותים הנקובים יכולים לשאת תעבורה מוצפנת (למשל IPsec מעל ExpressRoute/Direct Connect), כך שחוסר יכולת אינו הבעיה.",
      resourceTitle: "ExpressRoute encryption for virtual networks",
      resourceUrl: "https://learn.microsoft.com/azure/expressroute/expressroute-about-virtual-network-gateways",
      keywords: ["encryption", "defense in depth", "private circuit", "security"],
      tooltipTerms: ["ExpressRoute", "Direct Connect", "Cloud Interconnect"],
    },
    {
      id: "p21-hyb-010",
      providers: ["neutral"],
      domains: ["hybrid"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Why is a dedicated private connection like ExpressRoute, Direct Connect, or Cloud Interconnect generally more expensive than a site-to-site VPN for the same on-premises-to-cloud link?",
      question_he:
        "מדוע חיבור פרטי ייעודי כמו ExpressRoute, Direct Connect או Cloud Interconnect יקר בדרך כלל יותר מ-VPN מסוג site-to-site עבור אותו קישור בין הסביבה המקומית לענן?",
      options: [
        "It provisions dedicated physical circuit capacity and guaranteed performance instead of sharing the public internet, which carries provider and carrier costs",
        "It requires no networking hardware on either end, unlike VPN",
        "It cannot be shared across multiple departments, unlike a VPN",
        "It only works for a single cloud provider, increasing licensing fees",
      ],
      options_he: [
        "הוא מקצה קיבולת מעגל פיזי ייעודית וביצועים מובטחים במקום לחלוק את האינטרנט הציבורי, מה שכרוך בעלויות ספק ומוביל",
        "הוא אינו דורש כל חומרת רשת בשני הקצוות, בניגוד ל-VPN",
        "לא ניתן לשתף אותו בין מספר מחלקות, בניגוד ל-VPN",
        "הוא עובד רק עבור ספק ענן יחיד, מה שמעלה את דמי הרישוי",
      ],
      correctAnswer: 0,
      explanation:
        "Dedicated circuits require the provider to lease or build physical carrier infrastructure with guaranteed capacity and SLA, which costs more than sending traffic over the internet a VPN Gateway already relies on. Both options need edge networking hardware, both can be shared across teams, and dedicated connections are not limited to one cloud provider by design. The cost premium reflects guaranteed performance, not those factors.",
      explanation_he:
        "מעגלים ייעודיים דורשים מהספק לחכור או לבנות תשתית מוביל פיזית עם קיבולת מובטחת ו-SLA, מה שעולה יותר משליחת תעבורה דרך האינטרנט שעליו כבר מסתמך VPN Gateway. שתי האפשרויות דורשות חומרת רשת קצה, שתיהן ניתנות לשיתוף בין צוותים, וחיבורים ייעודיים אינם מוגבלים מטבעם לספק ענן יחיד. תוספת המחיר משקפת ביצועים מובטחים, לא את הגורמים הללו.",
      resourceTitle: "ExpressRoute pricing overview",
      resourceUrl: "https://learn.microsoft.com/azure/expressroute/expressroute-introduction",
      keywords: ["cost", "expressroute", "vpn", "sla"],
      tooltipTerms: ["ExpressRoute", "VPN Gateway", "Direct Connect", "Cloud Interconnect"],
    },
  ],
});
