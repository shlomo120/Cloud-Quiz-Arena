/**
 * questions-topup-dns-lb-p21.js — Phase 21 coverage top-up: DNS & LB (8 questions).
 * Deepens thin difficulty slices in the dns-lb domain. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-dns-lb-p21",
  label: "DNS & LB — Phase 21 Top-up",
  questions: [
    {
      id: "p21-dns-001",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Your team is about to migrate a public API to a new backend and wants to be able to roll back within seconds if something goes wrong. What should you do to the DNS record's TTL before the migration?",
      question_he:
        "הצוות שלכם עומד להעביר API ציבורי לשרת אחורי חדש ורוצה שתהיה אפשרות לחזור אחורה תוך שניות אם משהו משתבש. מה כדאי לעשות ל-TTL של רשומת ה-DNS לפני ההעברה?",
      options: [
        "Lower the TTL well before the migration so caches expire quickly",
        "Raise the TTL right before the migration to reduce query load",
        "Leave the TTL unchanged; TTL has no effect on rollback speed",
        "Delete the record and recreate it during the migration window",
      ],
      options_he: [
        "להנמיך את ה-TTL זמן מה לפני ההעברה כדי שהמטמונים יפוגו מהר",
        "להעלות את ה-TTL רגע לפני ההעברה כדי להפחית עומס שאילתות",
        "להשאיר את ה-TTL ללא שינוי; ל-TTL אין השפעה על מהירות ה-rollback",
        "למחוק את הרשומה וליצור אותה מחדש בזמן חלון ההעברה",
      ],
      correctAnswer: 0,
      explanation:
        "A low TTL means resolvers and clients re-query DNS more often, so a rollback (pointing the record back to the old backend) propagates to most clients quickly. If the TTL is high, many resolvers will keep caching the old answer long after you change it, delaying both the cutover and any rollback. The tradeoff is more DNS query volume while the TTL is low.",
      explanation_he:
        "TTL נמוך גורם ל-resolvers ולקוחות לשאול את ה-DNS בתדירות גבוהה יותר, כך ש-rollback (החזרת הרשומה לשרת הישן) מתפשט ללקוחות במהירות. TTL גבוה גורם ל-resolvers רבים להמשיך להחזיק את התשובה הישנה במטמון זמן רב אחרי השינוי, מה שמעכב גם את המעבר וגם rollback אפשרי. המחיר הוא נפח שאילתות DNS גבוה יותר בזמן שה-TTL נמוך.",
      resourceTitle: "AWS Route 53 — Choosing a TTL",
      resourceUrl:
        "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html",
      keywords: ["dns", "ttl", "migration", "rollback"],
      tooltipTerms: ["Route 53"],
    },
    {
      id: "p21-dns-002",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A company wants users in Europe to be sent to its Frankfurt datacenter and users in Asia to be sent to its Tokyo datacenter, based purely on where each user is located. Which DNS traffic-routing feature achieves this?",
      question_he:
        "חברה רוצה שמשתמשים באירופה יופנו למרכז הנתונים בפרנקפורט ומשתמשים באסיה יופנו למרכז הנתונים בטוקיו, בהתבסס על מיקום המשתמש בלבד. איזו תכונת ניתוב תעבורה של DNS מבצעת זאת?",
      options: [
        "Geo-routing (geolocation-based routing)",
        "Weighted routing",
        "Simple round-robin routing",
        "Failover routing",
      ],
      options_he: [
        "ניתוב גיאוגרפי (geo-routing)",
        "ניתוב משוקלל (weighted routing)",
        "ניתוב round-robin פשוט",
        "ניתוב failover",
      ],
      correctAnswer: 0,
      explanation:
        "Geo-routing answers DNS queries based on the geographic location of the requester (often derived from resolver IP), so it can deterministically send European users to Frankfurt and Asian users to Tokyo. Weighted routing splits traffic by percentage regardless of location, round-robin cycles through answers without regard to origin, and failover routing only reacts to health status, not geography.",
      explanation_he:
        "ניתוב גיאוגרפי עונה לשאילתות DNS בהתבסס על המיקום הגיאוגרפי של המבקש (לרוב לפי כתובת ה-IP של ה-resolver), ולכן יכול להפנות משתמשים מאירופה לפרנקפורט ומאסיה לטוקיו באופן דטרמיניסטי. ניתוב משוקלל מפצל תעבורה לפי אחוזים ללא קשר למיקום, round-robin מסתובב בין תשובות ללא קשר למקור, וניתוב failover מגיב רק לסטטוס בריאות ולא לגיאוגרפיה.",
      resourceTitle: "AWS Route 53 — Geolocation routing",
      resourceUrl:
        "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html",
      keywords: ["dns", "geo-routing", "traffic steering"],
      tooltipTerms: ["Route 53"],
    },
    {
      id: "p21-dns-003",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "A load balancer's health probe checks the backend instances directly and automatically stops sending traffic to any instance that fails the probe.",
      question_he:
        "בדיקת התקינות (health probe) של מאזן עומסים בודקת את השרתים האחוריים ישירות ומפסיקה אוטומטית לשלוח תעבורה לכל שרת שנכשל בבדיקה.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Load balancers periodically probe each backend instance (typically via HTTP/TCP on a configured path and port) and remove any instance that fails enough consecutive probes from the active rotation, then add it back once it passes again. This is how load balancers avoid routing traffic to unhealthy or unresponsive instances without manual intervention.",
      explanation_he:
        "מאזני עומסים בודקים באופן תקופתי כל שרת אחורי (בדרך כלל דרך HTTP/TCP בנתיב ובפורט מוגדרים) ומסירים מהסבב הפעיל כל שרת שנכשל במספיק בדיקות רצופות, ומחזירים אותו לאחר שהוא עובר שוב. כך מאזני עומסים נמנעים מניתוב תעבורה לשרתים לא תקינים ללא התערבות ידנית.",
      resourceTitle: "Azure Load Balancer — Health probes",
      resourceUrl:
        "https://learn.microsoft.com/azure/load-balancer/load-balancer-custom-probe-overview",
      keywords: ["load balancer", "health probe", "backend pool"],
      tooltipTerms: ["Load Balancer"],
    },
    {
      id: "p21-dns-004",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "After a deployment, all backend instances behind a load balancer are suddenly marked unhealthy even though the application logs show it is running and serving requests normally on its actual port. What is the most likely cause?",
      question_he:
        "לאחר פריסה, כל השרתים האחוריים מאחורי מאזן העומסים מסומנים כלא תקינים בפתאומיות, למרות שיומני האפליקציה מראים שהיא רצה ומגישה בקשות כרגיל בפורט האמיתי שלה. מה הסיבה הסבירה ביותר?",
      options: [
        "The health probe path or port was changed and no longer matches a valid endpoint on the instances",
        "The load balancer's SKU was downgraded from standard to basic",
        "DNS TTL for the load balancer's frontend name expired",
        "The backend pool exceeded its maximum instance count",
      ],
      options_he: [
        "נתיב או פורט בדיקת התקינות שונה ואינו תואם עוד לנקודת קצה תקפה בשרתים",
        "ה-SKU של מאזן העומסים הורד מ-standard ל-basic",
        "ה-TTL של ה-DNS עבור שם ה-frontend של מאזן העומסים פג",
        "מאגר השרתים האחוריים חרג ממספר השרתים המקסימלי",
      ],
      correctAnswer: 0,
      explanation:
        "If a deployment changes the application's health-check path (or the port it listens on) without updating the probe configuration, the probe requests will hit a 404 or get refused even though the app is healthy on its real endpoint — causing every instance to fail simultaneously. DNS TTL and SKU tier don't affect probe results, and a pool-size limit would block new instances from joining, not mark existing ones unhealthy.",
      explanation_he:
        "אם פריסה משנה את נתיב בדיקת התקינות של האפליקציה (או הפורט שהיא מאזינה עליו) בלי לעדכן את הגדרת ה-probe, בקשות ה-probe יקבלו 404 או יידחו למרות שהאפליקציה תקינה בנקודת הקצה האמיתית שלה — מה שגורם לכל השרתים להיכשל בו-זמנית. TTL של DNS ורמת SKU לא משפיעים על תוצאות ה-probe, ומגבלת גודל מאגר הייתה חוסמת הצטרפות שרתים חדשים ולא מסמנת קיימים כלא תקינים.",
      resourceTitle: "Azure Application Gateway — Health probe overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/application-gateway/application-gateway-probe-overview",
      keywords: ["load balancer", "health probe", "misconfiguration", "backend pool"],
      tooltipTerms: ["Load Balancer", "Application Gateway"],
    },
    {
      id: "p21-dns-005",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A stateful web application stores shopping-cart data in the memory of whichever server first handled the user's session, with no shared session store. Which load balancer feature is required to keep the application working correctly, and what does it cost you?",
      question_he:
        "אפליקציית web stateful שומרת נתוני עגלת קניות בזיכרון של השרת שטיפל ראשון בסשן המשתמש, ללא מאגר סשנים משותף. איזו תכונת מאזן עומסים נדרשת כדי שהאפליקציה תמשיך לעבוד כראוי, ומה המחיר?",
      options: [
        "Session affinity (sticky sessions); it reduces even distribution of load across backends",
        "Cross-zone load balancing; it increases cross-region latency",
        "SSL offload; it prevents backend instances from scaling independently",
        "Weighted routing; it requires manual failover configuration",
      ],
      options_he: [
        "session affinity (sticky sessions); היא פוגעת בפיזור אחיד של העומס בין השרתים",
        "cross-zone load balancing; היא מגדילה latency בין אזורים",
        "SSL offload; היא מונעת מהשרתים האחוריים להתרחב באופן עצמאי",
        "ניתוב משוקלל; דורש הגדרת failover ידנית",
      ],
      correctAnswer: 0,
      explanation:
        "Since the cart data only exists on one server's memory, every request from that user must keep landing on the same instance — that's exactly what session affinity (sticky sessions) provides, usually via a cookie or client IP hash. The tradeoff is that traffic can no longer be perfectly balanced: a server holding many long-lived 'sticky' sessions can end up overloaded while others sit idle, and scaling in/out risks dropping active sessions.",
      explanation_he:
        "מכיוון שנתוני העגלה קיימים רק בזיכרון של שרת אחד, כל בקשה מאותו משתמש חייבת להגיע לאותו שרת — וזה בדיוק מה ש-session affinity (sticky sessions) מספק, בדרך כלל דרך cookie או hash של כתובת IP. המחיר הוא שהתעבורה כבר לא יכולה להתפזר באופן מושלם: שרת שמחזיק סשנים 'דביקים' רבים לאורך זמן עלול להיות עמוס בעוד אחרים פנויים, וגם scaling in/out מסכן סשנים פעילים.",
      resourceTitle: "AWS Elastic Load Balancing — Sticky sessions",
      resourceUrl:
        "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/sticky-sessions.html",
      keywords: ["load balancer", "sticky sessions", "session affinity", "scaling"],
      tooltipTerms: ["Load Balancer"],
    },
    {
      id: "p21-dns-006",
      providers: ["neutral"],
      domains: ["dns-lb", "resiliency"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A company runs the same application in two regions and wants requests to automatically stop going to a region if it becomes unreachable, without anyone manually updating DNS. Which approach fits best?",
      question_he:
        "חברה מריצה את אותה אפליקציה בשני אזורים ורוצה שבקשות יפסיקו אוטומטית להגיע לאזור שהופך לבלתי נגיש, בלי שאף אחד יעדכן DNS באופן ידני. איזו גישה מתאימה ביותר?",
      options: [
        "A global/DNS-based load balancing service with health checks and automatic failover routing between regions",
        "A single regional Layer 4 load balancer configured with two backend pools",
        "Increasing the DNS TTL so clients cache the healthy region's IP longer",
        "Configuring both regions with identical weighted routing and no health checks",
      ],
      options_he: [
        "שירות איזון עומסים גלובלי מבוסס DNS עם בדיקות תקינות וניתוב failover אוטומטי בין אזורים",
        "מאזן עומסים אזורי בודד ברמת Layer 4 עם שני backend pools",
        "הגדלת TTL של DNS כדי שלקוחות ישמרו במטמון את ה-IP של האזור התקין זמן רב יותר",
        "הגדרת שני האזורים עם ניתוב משוקלל זהה וללא בדיקות תקינות",
      ],
      correctAnswer: 0,
      explanation:
        "A regional load balancer only sees instances within its own region, so it cannot react to an entire region going down. A global, DNS-based (often anycast-backed) load balancing service continuously health-checks each region's endpoint and updates which region's IP it hands out, giving automatic multi-region failover. Raising TTL would actually slow failover, and weighted routing without health checks would keep sending traffic to a dead region.",
      explanation_he:
        "מאזן עומסים אזורי רואה רק שרתים בתוך האזור שלו, ולכן לא יכול להגיב לנפילה של אזור שלם. שירות איזון עומסים גלובלי מבוסס DNS (לרוב מגובה anycast) בודק ברציפות את התקינות של נקודת הקצה בכל אזור ומעדכן איזה IP נמסר, וכך מספק failover אוטומטי בין אזורים. הגדלת TTL דווקא תאט את ה-failover, וניתוב משוקלל ללא בדיקות תקינות ימשיך לשלוח תעבורה לאזור מת.",
      resourceTitle: "Google Cloud — Global external load balancing overview",
      resourceUrl: "https://cloud.google.com/load-balancing/docs/load-balancing-overview",
      keywords: ["global load balancer", "multi-region", "failover", "dns"],
      tooltipTerms: ["Load Balancer"],
    },
    {
      id: "p21-dns-007",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team changed an A record from the old web server's IP to a new one two hours ago, but some users worldwide are still being sent to the old IP while others reach the new one. Which factors could explain this? (Select all that apply.)",
      question_he:
        "צוות שינה רשומת A מה-IP של שרת ה-web הישן לחדש לפני שעתיים, אך חלק מהמשתמשים בעולם עדיין מופנים ל-IP הישן בעוד אחרים מגיעים לחדש. אילו גורמים יכולים להסביר זאת? (בחרו את כל התשובות הרלוונטיות.)",
      options: [
        "The previous TTL was long, so some resolvers are still serving the cached old answer",
        "Some ISPs or corporate resolvers ignore TTL and cache records longer than specified",
        "The record change has not yet been made at the authoritative name server",
        "DNSSEC signing automatically reverts records to their prior value for one hour",
      ],
      options_he: [
        "ה-TTL הקודם היה ארוך, כך ש-resolvers מסוימים עדיין מגישים את התשובה הישנה מהמטמון",
        "חלק מספקיות האינטרנט או resolvers ארגוניים מתעלמים מ-TTL ושומרים רשומות במטמון זמן ארוך יותר מהמוגדר",
        "השינוי ברשומה עדיין לא בוצע בשרת השמות הסמכותי",
        "חתימת DNSSEC מחזירה רשומות אוטומטית לערכן הקודם למשך שעה",
      ],
      correctAnswer: [0, 1],
      explanation:
        "This is classic DNS propagation lag: resolvers around the world cache the old A record for up to its configured TTL, and in practice some resolvers (especially certain ISPs) hold onto cached answers longer than they should, ignoring the advertised TTL. Once the authoritative server has been updated (which the scenario implies already happened), there's no central 'push' to every cache — each one only refreshes when its own TTL expires. DNSSEC only adds cryptographic signatures for authenticity; it has no mechanism that reverts record values.",
      explanation_he:
        "זהו עיכוב הפצה קלאסי של DNS: resolvers ברחבי העולם שומרים במטמון את רשומת ה-A הישנה עד תום ה-TTL המוגדר, ובפועל חלק מה-resolvers (בעיקר אצל ספקיות מסוימות) מחזיקים תשובות במטמון זמן רב יותר מהנדרש, תוך התעלמות מה-TTL המוצהר. לאחר עדכון השרת הסמכותי (כפי שהתרחיש מרמז שכבר קרה), אין 'דחיפה' מרכזית לכל מטמון — כל אחד מתרענן רק כשה-TTL שלו פג. DNSSEC רק מוסיף חתימות קריפטוגרפיות לאותנטיות; אין לו מנגנון שמחזיר ערכי רשומות אחורה.",
      resourceTitle: "Amazon Route 53 — How DNS works",
      resourceUrl:
        "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html",
      keywords: ["dns propagation", "ttl", "caching", "resolver"],
      tooltipTerms: ["Route 53"],
    },
    {
      id: "p21-dns-008",
      providers: ["neutral"],
      domains: ["dns-lb"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A public-facing application terminates TLS at the load balancer and then forwards plaintext HTTP to backend instances inside a private subnet. A security review flags this configuration. What is the most accurate assessment?",
      question_he:
        "אפליקציה הפונה לציבור מבצעת TLS termination במאזן העומסים ולאחר מכן מעבירה HTTP רגיל (plaintext) לשרתים האחוריים ברשת פרטית. ביקורת אבטחה מסמנת את התצורה הזו. מהי ההערכה המדויקת ביותר?",
      options: [
        "It is acceptable if the private subnet is properly isolated, but re-encrypting traffic to the backend (end-to-end TLS) provides stronger defense-in-depth, especially against threats inside the network",
        "It is always a critical vulnerability because TLS termination at a load balancer is never supported by any cloud provider",
        "It has no security implications since load balancers are inherently trusted components",
        "The certificate must be installed on every backend instance for TLS termination at the load balancer to function at all",
      ],
      options_he: [
        "זה קביל אם הרשת הפרטית מבודדת כראוי, אך הצפנה מחדש של התעבורה לשרת האחורי (TLS מקצה לקצה) מספקת הגנת עומק חזקה יותר, במיוחד מפני איומים בתוך הרשת",
        "זו תמיד פרצת אבטחה קריטית מכיוון ש-TLS termination במאזן עומסים אינו נתמך אף פעם על ידי אף ספק ענן",
        "אין לכך השלכות אבטחה מכיוון שמאזני עומסים הם רכיבים מהימנים מטבעם",
        "התעודה חייבת להיות מותקנת בכל שרת אחורי כדי ש-TLS termination במאזן העומסים יעבוד בכלל",
      ],
      correctAnswer: 0,
      explanation:
        "TLS offload (terminating TLS at the load balancer) is a common, supported pattern that simplifies certificate management and reduces backend CPU load, and traffic within a well-isolated private subnet is a legitimate risk-accepted design in many environments. However, if an attacker gains any foothold inside that network (a compromised instance, a misconfigured route), plaintext HTTP between the load balancer and backends is fully readable — so re-encrypting to the backend (TLS end-to-end, sometimes called SSL bridging) is the stronger option where compliance or threat model demands it. Termination at the LB does not require the certificate on backend instances at all.",
      explanation_he:
        "TLS offload (הפסקת TLS במאזן העומסים) הוא דפוס נפוץ ונתמך שמפשט ניהול תעודות ומפחית עומס CPU על השרתים האחוריים, ותעבורה בתוך רשת פרטית מבודדת היטב היא תכנון שמקובל בהערכת סיכונים בסביבות רבות. עם זאת, אם תוקף משיג דריסת רגל כלשהי בתוך הרשת הזו (שרת שנפרץ, ניתוב שגוי), HTTP רגיל בין מאזן העומסים לשרתים ניתן לקריאה מלאה — לכן הצפנה מחדש לשרת (TLS מקצה לקצה, לעיתים נקרא SSL bridging) היא האפשרות החזקה יותר כשהציות או מודל האיומים דורשים זאת. הפסקה במאזן העומסים לא דורשת בכלל התקנת התעודה על השרתים האחוריים.",
      resourceTitle: "Azure Application Gateway — TLS/SSL termination and end-to-end TLS",
      resourceUrl:
        "https://learn.microsoft.com/azure/application-gateway/ssl-overview",
      keywords: ["tls termination", "ssl offload", "end-to-end encryption", "load balancer"],
      tooltipTerms: ["TLS Termination", "Application Gateway"],
    },
  ],
});
