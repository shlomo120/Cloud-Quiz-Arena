/**
 * questions-topup-siem-p21.js — Phase 21 coverage top-up: SIEM (6 questions).
 * Deepens the Intermediate slice of the siem domain. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-siem-p21",
  label: "Observability & SIEM — Phase 21 Top-up",
  questions: [
    {
      id: "p21-siem-001",
      providers: ["neutral"],
      domains: ["siem", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A user's failed login attempt and a sign-in from a never-before-seen device each generate low-confidence alerts on their own. Why does a correlation rule that fires only when BOTH occur within a short time window produce a stronger signal than either alert alone?",
      question_he:
        "ניסיון התחברות כושל של משתמש והתחברות ממכשיר שלא נראה בעבר כל אחד מייצר לבדו התראה בביטחון נמוך. מדוע כלל קורלציה שמופעל רק כששניהם קורים בחלון זמן קצר מייצר סיגנל חזק יותר מכל התראה בנפרד?",
      options: [
        "Combining two independently weak indicators that co-occur reduces the false-positive rate, because benign explanations for each individual event are less likely to explain both happening together",
        "The SIEM automatically doubles the severity score of any two alerts that share the same timestamp",
        "Correlation rules are required by compliance frameworks regardless of whether they improve detection quality",
        "A single failed login and a new device are always evidence of compromise, so correlation only adds confirmation, not new information",
      ],
      options_he: [
        "שילוב של שני אינדיקטורים חלשים בפני עצמם שקורים יחד מפחית את שיעור ההתראות השגויות, כי הסברים תמימים לכל אירוע בנפרד פחות סביר שיסבירו את שניהם יחד",
        "ה-SIEM מכפיל אוטומטית את ציון החומרה של כל שתי התראות שחולקות אותו חותם זמן",
        "כללי קורלציה נדרשים על ידי מסגרות ציות ללא קשר לשאלה אם הם משפרים את איכות הזיהוי",
        "כישלון התחברות בודד ומכשיר חדש הם תמיד עדות לפריצה, כך שקורלציה רק מוסיפה אישור ולא מידע חדש",
      ],
      correctAnswer: 0,
      explanation:
        "A single failed login is common (typos, expired passwords) and a new device alone is common too (a new phone, a reinstalled browser). Neither is reliable evidence of compromise by itself. When both occur together in a short window, the set of benign explanations that account for both simultaneously shrinks dramatically, so the combined event is meaningfully more suspicious than the sum of its parts — this is the core reasoning behind correlation rule design, not a scoring gimmick or a compliance checkbox.",
      explanation_he:
        "כישלון התחברות בודד הוא נפוץ (טעויות הקלדה, סיסמה שפגה) וגם מכשיר חדש בפני עצמו נפוץ (טלפון חדש, דפדפן שהותקן מחדש). אף אחד מהם אינו עדות אמינה לפריצה בפני עצמו. כששניהם קורים יחד בחלון זמן קצר, מספר ההסברים התמימים שמסבירים את שניהם בו-זמנית מצטמצם דרמטית, ולכן האירוע המשולב חשוד משמעותית יותר מסכום חלקיו — זהו ההיגיון המרכזי מאחורי עיצוב כללי קורלציה, לא טריק של ניקוד או דרישת ציות.",
      resourceTitle: "Create custom analytics rules in Microsoft Sentinel",
      resourceUrl:
        "https://learn.microsoft.com/azure/sentinel/detect-threats-custom",
      keywords: ["correlation", "detection engineering", "false positives"],
      tooltipTerms: ["SIEM"],
    },
    {
      id: "p21-siem-002",
      providers: ["neutral"],
      domains: ["siem", "monitoring"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "A SIEM ingests logs from a cloud identity provider, a firewall, and a Linux host, each with different field names for concepts like 'source IP' or 'user'. Which statements correctly describe why log normalization matters before writing correlation rules? (Select all that apply.)",
      question_he:
        "SIEM קולט לוגים מספק זהות בענן, חומת אש ומארח Linux, כל אחד עם שמות שדות שונים למושגים כמו 'IP מקור' או 'משתמש'. אילו טענות מתארות נכון מדוע נורמליזציה של לוגים חשובה לפני כתיבת כללי קורלציה? (בחר את כל התשובות הנכונות.)",
      options: [
        "A correlation rule that references a common field like 'user' can only match across sources if each source's raw field has been mapped to that shared schema",
        "Without normalization, a rule author would need to write source-specific matching logic for every combination of log sources, which does not scale",
        "Normalization removes the need to retain raw logs, since only the normalized fields are ever useful",
        "Normalized schemas make it possible to apply the same detection logic even if a log source is swapped for a different vendor's product later",
      ],
      options_he: [
        "כלל קורלציה שמתייחס לשדה משותף כמו 'user' יכול להתאים בין מקורות רק אם השדה הגולמי של כל מקור מופה לסכימה המשותפת",
        "בלי נורמליזציה, כותב הכלל היה צריך לכתוב לוגיקת התאמה ספציפית לכל שילוב של מקורות לוגים, וזה לא ניתן להרחבה",
        "נורמליזציה מבטלת את הצורך לשמר לוגים גולמיים, כי רק השדות המנורמלים אי פעם שימושיים",
        "סכימות מנורמלות מאפשרות להחיל את אותה לוגיקת זיהוי גם אם מקור לוג מוחלף בעתיד במוצר של ספק אחר",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Normalization maps each source's raw fields into a shared schema (a common 'user' or 'src_ip' field), which is what lets a single correlation rule work across heterogeneous sources instead of requiring bespoke logic per source pair — and it keeps working if a vendor is swapped, since the rule targets the normalized field, not the vendor-specific one. Raw logs are still retained for forensic detail, deep investigation, and cases where normalization dropped or simplified information — normalization is an added layer on top of raw data, not a replacement for it.",
      explanation_he:
        "נורמליזציה ממפה את השדות הגולמיים של כל מקור לסכימה משותפת (שדה 'user' או 'src_ip' משותף), וזה מה שמאפשר לכלל קורלציה בודד לעבוד על פני מקורות הטרוגניים במקום לדרוש לוגיקה ייעודית לכל זוג מקורות — וזה ממשיך לעבוד גם אם ספק מוחלף, כי הכלל מכוון לשדה המנורמל ולא לשדה הספציפי לספק. לוגים גולמיים עדיין נשמרים לצורך פרטי חקירה פורנזית, חקירה מעמיקה, ומקרים בהם הנורמליזציה השמיטה או פישטה מידע — נורמליזציה היא שכבה נוספת מעל הנתונים הגולמיים, לא תחליף להם.",
      resourceTitle: "Advanced Security Information Model (ASIM) overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/sentinel/normalization",
      keywords: ["normalization", "schema", "log ingestion"],
      tooltipTerms: ["SIEM"],
    },
    {
      id: "p21-siem-003",
      providers: ["neutral"],
      domains: ["siem", "governance"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A security team maps each of their SIEM detection rules to stages of an attack framework (such as initial access, persistence, exfiltration) to see which stages have no detections at all. What is the main operational benefit of this kind of coverage mapping?",
      question_he:
        "צוות אבטחה ממפה כל אחד מכללי הזיהוי ב-SIEM שלו לשלבים של מסגרת התקפה (כגון גישה ראשונית, התמדה, אקספילטרציה) כדי לראות אילו שלבים חסרי זיהוי לחלוטין. מהי התועלת התפעולית המרכזית של מיפוי כיסוי מסוג זה?",
      options: [
        "It reveals blind spots where an attacker could progress through a stage of an attack without triggering any alert, so the team can prioritize building detections for those gaps",
        "It guarantees that every technique within a mapped stage will be detected once a single rule is tagged to that stage",
        "It replaces the need for periodic detection testing, since a mapped rule is proven to fire correctly",
        "It is primarily a compliance artifact with no bearing on which new detections should be built",
      ],
      options_he: [
        "זה חושף נקודות עיוורון שבהן תוקף יכול להתקדם דרך שלב התקפה מבלי להפעיל אף התראה, כך שהצוות יכול לתעדף בניית זיהויים לפערים האלה",
        "זה מבטיח שכל טכניקה בתוך שלב ממופה תזוהה ברגע שכלל בודד מתויג לאותו שלב",
        "זה מחליף את הצורך בבדיקת זיהוי תקופתית, כי כלל ממופה מוכח כמופעל נכון",
        "זה בעיקר ארטיפקט ציות ללא השפעה על אילו זיהויים חדשים כדאי לבנות",
      ],
      correctAnswer: 0,
      explanation:
        "Mapping detections to attack-framework stages turns a list of individual rules into a visual coverage picture, exposing stages or techniques with zero detections — those are the blind spots attackers could exploit undetected. A rule mapped to a stage does not guarantee every technique within that stage is caught, since one rule usually covers a narrow technique, not an entire stage; testing rules for actual firing behavior is still a separate, necessary activity, and the value of the mapping is prioritization, not compliance paperwork.",
      explanation_he:
        "מיפוי זיהויים לשלבי מסגרת התקפה הופך רשימת כללים בודדים לתמונת כיסוי חזותית, וחושף שלבים או טכניקות ללא אף זיהוי — אלה נקודות העיוורון שתוקפים יכולים לנצל בלי להתגלות. כלל שממופה לשלב לא מבטיח שכל טכניקה בתוך אותו שלב תיתפס, כי כלל בודד בדרך כלל מכסה טכניקה צרה ולא שלב שלם; בדיקת כללים להתנהגות הפעלה בפועל היא עדיין פעילות נפרדת והכרחית, והערך של המיפוי הוא תיעדוף ולא ניירת ציות.",
      resourceTitle: "MITRE ATT&CK mapping in Microsoft Sentinel",
      resourceUrl:
        "https://learn.microsoft.com/azure/sentinel/mitre-coverage",
      keywords: ["detection coverage", "attack framework", "gap analysis"],
      tooltipTerms: ["SIEM"],
    },
    {
      id: "p21-siem-004",
      providers: ["neutral"],
      domains: ["siem", "monitoring"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "A dashboard and an alert provide the same operational guarantee: both ensure that someone will notice a problem in a timely manner.",
      question_he:
        "דשבורד והתראה מספקים את אותה ערבות תפעולית: שניהם מבטיחים שמישהו ישים לב לבעיה בזמן סביר.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "A dashboard is passive: it only surfaces information when a human chooses to look at it, so a problem can sit unnoticed on a dashboard for hours or days. An alert is active: it pushes a notification to a person or system, creating a much stronger guarantee that someone becomes aware of the issue promptly. This is why dashboards suit exploratory review and trend-watching, while time-sensitive conditions need alerting, not just a chart someone might glance at.",
      explanation_he:
        "דשבורד הוא פסיבי: הוא חושף מידע רק כשאדם בוחר להסתכל עליו, כך שבעיה יכולה לשבת בלי לב על דשבורד במשך שעות או ימים. התראה היא אקטיבית: היא דוחפת התראה לאדם או למערכת, ויוצרת ערבות הרבה יותר חזקה שמישהו ייוודע לבעיה במהירות. זו הסיבה שדשבורדים מתאימים לסקירה חקרנית ומעקב אחר מגמות, בעוד שתנאים רגישי-זמן דורשים התראה, לא רק גרף שמישהו אולי יעיף בו מבט.",
      resourceTitle: "Monitor with Azure Monitor alerts",
      resourceUrl: "https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview",
      keywords: ["dashboards", "alerting", "operational guarantees"],
      tooltipTerms: ["Azure Monitor"],
    },
    {
      id: "p21-siem-005",
      providers: ["neutral"],
      domains: ["siem", "governance"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team onboarding new log sources into their SIEM has limited ingestion budget and must choose an order. Why do identity provider logs and audit logs typically get onboarded before verbose application debug logs?",
      question_he:
        "צוות שמכניס מקורות לוגים חדשים ל-SIEM שלו עם תקציב קליטה מוגבל וצריך לבחור סדר. מדוע לוגי ספק זהות ולוגי ביקורת בדרך כלל נכנסים לפני לוגי דיבוג מפורטים של אפליקציה?",
      options: [
        "Identity and audit logs directly capture who did what and when, which is exactly the evidence needed to detect account compromise and unauthorized changes, while debug logs are voluminous and mostly relevant to troubleshooting functional bugs rather than security events",
        "Debug logs are always smaller in volume, so there is no cost reason to prioritize identity logs first",
        "Regulatory frameworks universally forbid ingesting application debug logs into a SIEM at all",
        "Identity logs are onboarded first purely because they are technically easier to parse, with no security relevance to the ordering",
      ],
      options_he: [
        "לוגי זהות וביקורת לוכדים ישירות מי עשה מה ומתי, וזו בדיוק העדות הדרושה לזיהוי פריצה לחשבון ושינויים בלתי מורשים, בעוד שלוגי דיבוג עתירי נפח ורלוונטיים בעיקר לפתרון תקלות פונקציונליות ולא לאירועי אבטחה",
        "לוגי דיבוג תמיד קטנים יותר בנפח, כך שאין סיבת עלות לתעדף לוגי זהות קודם",
        "מסגרות רגולטוריות אוסרות באופן גורף לקלוט לוגי דיבוג של אפליקציה ל-SIEM בכלל",
        "לוגי זהות נקלטים ראשונים אך ורק כי קל יותר טכנית לפרסר אותם, ללא רלוונטיות אבטחתית לסדר",
      ],
      correctAnswer: 0,
      explanation:
        "Onboarding priority is driven by security value per unit of ingestion cost: identity and audit logs record authentication, authorization, and configuration change events — the direct evidence trail for account takeover, privilege escalation, and unauthorized changes. Verbose debug logs are typically high-volume and low-signal for security detection, even though they're valuable for troubleshooting, so they compete poorly for limited ingestion budget in the early phases of SIEM rollout. There is no blanket regulatory ban on ingesting debug logs, and parsing ease is a minor factor compared to security relevance.",
      explanation_he:
        "תעדוף קליטה מונע על ידי ערך אבטחתי ליחידת עלות קליטה: לוגי זהות וביקורת מתעדים אירועי אימות, הרשאה ושינויי תצורה — שובל העדויות הישיר להשתלטות על חשבון, הסלמת הרשאות ושינויים בלתי מורשים. לוגי דיבוג מפורטים בדרך כלל בנפח גבוה וסיגנל נמוך לזיהוי אבטחתי, גם אם הם בעלי ערך לפתרון תקלות, כך שהם מתחרים בצורה גרועה על תקציב קליטה מוגבל בשלבים המוקדמים של פריסת SIEM. אין איסור רגולטורי גורף על קליטת לוגי דיבוג, וקלות הפרסור היא גורם משני לעומת רלוונטיות אבטחתית.",
      resourceTitle: "Best practices for onboarding data sources in Microsoft Sentinel",
      resourceUrl:
        "https://learn.microsoft.com/azure/sentinel/best-practices-data",
      keywords: ["log onboarding", "prioritization", "audit logs"],
      tooltipTerms: ["Cloud Audit Logs"],
    },
    {
      id: "p21-siem-006",
      providers: ["neutral"],
      domains: ["siem", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "An analyst receives three simultaneous alerts of differing severity and immediately begins a deep forensic investigation on the first one opened, without first assessing severity or business impact across all three. What is the main risk of skipping a distinct triage step in this workflow?",
      question_he:
        "אנליסט מקבל שלוש התראות סימולטניות בחומרה שונה ומיד מתחיל חקירה פורנזית מעמיקה בהתראה הראשונה שנפתחה, מבלי להעריך תחילה חומרה או השפעה עסקית על פני שלושתן. מהו הסיכון המרכזי בדילוג על שלב טריאז' נפרד בתהליך העבודה הזה?",
      options: [
        "Time and attention may be spent on the lowest-impact alert first while a higher-severity incident with active business impact goes uninvestigated longer than it should, since ordering was based on arrival rather than assessed priority",
        "Triage has no measurable effect on outcomes as long as every alert is eventually investigated to full depth",
        "Skipping triage only affects reporting metrics, not the actual response timeline for any of the three incidents",
        "Deep forensic investigation is strictly faster when performed before triage, so triage would only add delay",
      ],
      options_he: [
        "זמן וקשב עלולים להיות מושקעים תחילה בהתראה בעלת ההשפעה הנמוכה ביותר בעוד אירוע בחומרה גבוהה יותר עם השפעה עסקית פעילה נותר לא נחקר יותר זמן מהראוי, כי הסדר התבסס על זמן הגעה ולא על עדיפות שהוערכה",
        "לטריאז' אין השפעה מדידה על תוצאות כל עוד כל התראה נחקרת בסופו של דבר לעומק מלא",
        "דילוג על טריאז' משפיע רק על מדדי דיווח ולא על ציר הזמן בפועל של התגובה לכל אחד משלושת האירועים",
        "חקירה פורנזית מעמיקה מהירה יותר באופן מובהק כשמבוצעת לפני טריאז', כך שהטריאז' רק יוסיף עיכוב",
      ],
      correctAnswer: 0,
      explanation:
        "Triage exists as a distinct, deliberately fast step precisely to compare severity and business impact across concurrent alerts before committing time to deep investigation of any single one; skipping it means investigation order is driven by arbitrary factors like which alert happened to be opened first, risking that a genuinely critical incident sits queued behind a lower-priority one. This directly affects response timelines, not just reporting, and a brief triage pass is far cheaper than the time lost when a high-impact incident is delayed — it is not wasted overhead relative to jumping straight into deep analysis.",
      explanation_he:
        "טריאז' קיים כשלב נפרד ומכוון להיות מהיר בדיוק כדי להשוות חומרה והשפעה עסקית בין התראות סימולטניות לפני השקעת זמן בחקירה מעמיקה של אחת מהן; דילוג עליו אומר שסדר החקירה מונע מגורמים שרירותיים כמו איזו התראה נפתחה קודם, מה שמסכן מצב שבו אירוע קריטי אמיתי ממתין בתור מאחורי אירוע בעדיפות נמוכה יותר. זה משפיע ישירות על ציר הזמן של התגובה, לא רק על דיווח, ומעבר טריאז' קצר הרבה יותר זול מהזמן שהולך לאיבוד כשאירוע בעל השפעה גבוהה מתעכב — זה לא תקורה מבוזבזת בהשוואה לקפיצה ישירה לניתוח מעמיק.",
      resourceTitle: "Incident triage workflows in Microsoft Sentinel",
      resourceUrl:
        "https://learn.microsoft.com/azure/sentinel/investigate-cases",
      keywords: ["triage", "incident response", "prioritization"],
      tooltipTerms: ["SIEM"],
    },
  ],
});
