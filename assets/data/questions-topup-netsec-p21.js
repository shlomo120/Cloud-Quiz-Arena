/**
 * questions-topup-netsec-p21.js — Phase 21 coverage top-up: Net Security (16 questions).
 * Deepens the Advanced and Beginner slices of the netsec domain so a
 * Non-Cloud / Net Security / Advanced study session no longer collapses
 * to ~11 questions. Registers itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-netsec-p21",
  label: "Net Security — Phase 21 Top-up",
  questions: [
    {
      id: "p21-net-001",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A security engineer configures a network security group so all inbound traffic is denied by default, but no outbound rules are added beyond the platform's default allow-all egress rule. Which statement best describes the resulting risk?",
      question_he:
        "מהנדס אבטחה מגדיר NSG כך שכל תעבורת ה-inbound חסומה כברירת מחדל, אך לא נוספים כללי outbound מעבר לכלל ברירת המחדל של allow-all ב-egress. מה מתאר בצורה הטובה ביותר את הסיכון הנובע מכך?",
      options: [
        "אין סיכון כי חסימת inbound מגנה על המשאב באופן מלא",
        "A compromised workload could freely send data to any external destination, since egress traffic is not restricted",
        "תעבורת outbound נחסמת אוטומטית בכל פעם שתעבורת inbound חסומה",
        "כללי egress רלוונטיים רק לרשתות on-premises ולא ל-VNet/VPC בענן",
      ],
      options_he: [
        "אין סיכון כי חסימת inbound מגנה על המשאב באופן מלא",
        "עומס עבודה שנפרץ יכול לשלוח מידע באופן חופשי לכל יעד חיצוני, מכיוון שתעבורת ה-egress אינה מוגבלת",
        "תעבורת outbound נחסמת אוטומטית בכל פעם שתעבורת inbound חסומה",
        "כללי egress רלוונטיים רק לרשתות on-premises ולא ל-VNet/VPC בענן",
      ],
      correctAnswer: 1,
      explanation:
        "Ingress rules control what can reach the resource, but egress rules control what the resource itself can reach. If egress is left wide open, a compromised host can exfiltrate data or call out to attacker infrastructure without any network control stopping it. The other options confuse ingress and egress as if they were linked or as if egress control is somehow cloud-irrelevant — in fact cloud egress control is a core defense against data exfiltration.",
      explanation_he:
        "כללי ingress שולטים במי שיכול להגיע למשאב, אך כללי egress שולטים במה שהמשאב עצמו יכול להגיע אליו. אם ה-egress פתוח לחלוטין, מארח שנפרץ יכול להוציא מידע או לתקשר עם תשתית תוקף בלי שום בקרת רשת שתעצור זאת. שאר האפשרויות מבלבלות בין ingress ל-egress כאילו הם קשורים, או מניחות בטעות ש-egress לא רלוונטי בענן — בפועל בקרת egress היא הגנה מרכזית מפני exfiltration.",
      resourceTitle: "Azure Network Security Groups Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["egress", "ingress", "exfiltration", "nsg"],
      tooltipTerms: ["NSG", "Egress", "Ingress"],
    },
    {
      id: "p21-net-002",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Stateful firewalls automatically permit return traffic for an established connection without requiring a separate inbound rule to allow it.",
      question_he:
        "חומות אש stateful מאפשרות אוטומטית תעבורת תשובה (return traffic) עבור חיבור שכבר נוצר, מבלי שנדרש כלל inbound נפרד המתיר זאת.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Stateful devices (like security groups) track the connection state of each session, so once an outbound request is allowed, the matching inbound response is automatically permitted. This is different from stateless filtering (like classic NACLs), where inbound and outbound must each be explicitly permitted, including for return traffic on ephemeral ports.",
      explanation_he:
        "מכשירים stateful (כמו Security Group) עוקבים אחר מצב החיבור של כל session, כך שברגע שבקשת outbound אושרה, תשובת ה-inbound המתאימה מותרת אוטומטית. זה שונה מסינון stateless (כמו NACL קלאסי), שבו יש להתיר במפורש גם inbound וגם outbound, כולל עבור תעבורת תשובה על פורטים אפמריים.",
      resourceTitle: "Amazon VPC Security Groups",
      resourceUrl:
        "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      keywords: ["stateful", "security group", "connection tracking"],
      tooltipTerms: ["Security Group", "NACL"],
    },
    {
      id: "p21-net-003",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Which of the following can a Web Application Firewall (WAF) inspect that a traditional network firewall operating below the application layer typically cannot?",
      question_he:
        "מה מבין הבאים WAF יכול לבדוק בעוד שחומת אש רשתית מסורתית, הפועלת מתחת לשכבת האפליקציה, בדרך כלל אינה יכולה?",
      options: [
        "כתובות IP מקור ויעד",
        "מספרי פורט TCP",
        "HTTP request contents such as headers, cookies, and query strings",
        "סוג הפרוטוקול בכותרת חבילת ה-IP",
      ],
      options_he: [
        "כתובות IP מקור ויעד",
        "מספרי פורט TCP",
        "תוכן בקשות HTTP כגון headers, cookies, ו-query strings",
        "סוג הפרוטוקול בכותרת חבילת ה-IP",
      ],
      correctAnswer: 2,
      explanation:
        "A WAF understands HTTP semantics and can inspect the actual content of a web request — headers, cookies, form fields, query strings — to catch attacks like SQL injection or cross-site scripting. A traditional network firewall filters mostly on IP addresses, ports, and protocols, which it can already see without any WAF; it has no visibility into what is inside an HTTPS payload.",
      explanation_he:
        "WAF מבין את הסמנטיקה של HTTP ויכול לבדוק את התוכן בפועל של בקשת ה-web — headers, cookies, שדות טופס, query strings — כדי לתפוס התקפות כמו SQL injection או XSS. חומת אש רשתית מסורתית מסננת בעיקר לפי כתובות IP, פורטים ופרוטוקולים, דבר שהיא כבר יכולה לראות ללא WAF; אין לה נראות לתוך התוכן שבתוך payload של HTTPS.",
      resourceTitle: "AWS WAF Developer Guide",
      resourceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html",
      keywords: ["waf", "network firewall", "layer 7"],
      tooltipTerms: ["WAF"],
    },
    {
      id: "p21-net-004",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "What is the primary security purpose of deploying a bastion host (jump box) in a cloud network?",
      question_he:
        "מה המטרה העיקרית מבחינת אבטחה בפריסת bastion host (jump box) ברשת ענן?",
      options: [
        "לבצע איזון עומסים (load balancing) בין שרתי אפליקציה",
        "To provide a single, hardened, monitored entry point for administrative access instead of exposing management ports on every instance",
        "להצפין נתונים במנוחה (at rest) בכל המכונות המנוהלות",
        "לשמש כ-DNS resolver עבור subnets פרטיים",
      ],
      options_he: [
        "לבצע איזון עומסים (load balancing) בין שרתי אפליקציה",
        "לספק נקודת כניסה יחידה, מוקשחת ומנוטרת לגישה ניהולית, במקום לחשוף פורטי ניהול בכל instance",
        "להצפין נתונים במנוחה (at rest) בכל המכונות המנוהלות",
        "לשמש כ-DNS resolver עבור subnets פרטיים",
      ],
      correctAnswer: 1,
      explanation:
        "A bastion host consolidates administrative access into one hardened, closely monitored chokepoint, so individual servers never need SSH/RDP exposed directly to administrators' networks or the internet. Load balancing, encryption at rest, and DNS resolution are unrelated functions performed by other dedicated services.",
      explanation_he:
        "bastion host מרכז את הגישה הניהולית לנקודת צוואר בקבוק אחת, מוקשחת ומנוטרת מקרוב, כך שהשרתים הבודדים לא צריכים לחשוף SSH/RDP ישירות לרשתות המנהלים או לאינטרנט. איזון עומסים, הצפנה at rest ופתרון DNS הם פונקציות לא קשורות שמבוצעות על ידי שירותים ייעודיים אחרים.",
      resourceTitle: "Azure Virtual Network — Bastion Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["bastion", "jump host", "administrative access"],
      tooltipTerms: ["Bastion"],
    },
    {
      id: "p21-net-005",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team is designing security group rules for backend application servers that should only be reachable from a specific load balancer. Which approach follows the principle of least exposure?",
      question_he:
        "צוות מתכנן כללי security group עבור שרתי אפליקציה שאמורים להיות נגישים רק מ-load balancer ספציפי. איזו גישה עוקבת אחר עקרון החשיפה המינימלית (least exposure)?",
      options: [
        "לאפשר את כל תעבורת ה-inbound ולסמוך על כך שהאפליקציה תדחה בקשות לא מורשות",
        "לפתוח את פורט האפליקציה לכל טווח ה-CIDR של ה-VPC/VNet לנוחות",
        "Allow inbound traffic on the application port only from the load balancer's security group or specific IP range, and deny everything else",
        "לאפשר תעבורת inbound מ-0.0.0.0/0 אך לדרוש אימות ברמת האפליקציה",
      ],
      options_he: [
        "לאפשר את כל תעבורת ה-inbound ולסמוך על כך שהאפליקציה תדחה בקשות לא מורשות",
        "לפתוח את פורט האפליקציה לכל טווח ה-CIDR של ה-VPC/VNet לנוחות",
        "לאפשר תעבורת inbound בפורט האפליקציה רק מה-security group של ה-load balancer או מטווח IP ספציפי, ולחסום כל השאר",
        "לאפשר תעבורת inbound מ-0.0.0.0/0 אך לדרוש אימות ברמת האפליקציה",
      ],
      correctAnswer: 2,
      explanation:
        "Least exposure means restricting network reachability to exactly what is required — here, only the load balancer's security group or IP range should be allowed, with everything else denied. Relying on application-layer authentication or opening the port broadly still leaves an unnecessary network attack surface that a network-layer control could have eliminated.",
      explanation_he:
        "חשיפה מינימלית משמעה הגבלת הנגישות הרשתית בדיוק למה שנדרש — כאן, יש להתיר גישה רק מה-security group או טווח ה-IP של ה-load balancer, ולחסום את כל השאר. הסתמכות על אימות ברמת האפליקציה או פתיחת הפורט באופן רחב עדיין משאירה משטח תקיפה רשתי מיותר שבקרה ברמת הרשת הייתה יכולה לבטל.",
      resourceTitle: "Amazon VPC Security Groups",
      resourceUrl:
        "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      keywords: ["least exposure", "security group", "default deny"],
      tooltipTerms: ["Security Group", "Load Balancer"],
    },
    {
      id: "p21-net-006",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A retail company places its web tier, application tier, and database tier in a single flat subnet protected by one security group that allows all traffic between them. What is the main security risk of this design compared to a segmented design with per-tier zones?",
      question_he:
        "חברת קמעונאות ממקמת את שכבת ה-web, שכבת האפליקציה ושכבת מסד הנתונים ב-subnet שטוח יחיד המוגן על ידי security group אחד המתיר את כל התעבורה ביניהם. מהו הסיכון העיקרי בעיצוב זה בהשוואה לעיצוב מפולח עם אזורים לכל שכבה?",
      options: [
        "לרשתות שטוחות תמיד יש latency גבוה יותר",
        "If any single tier is compromised, an attacker has unrestricted network access to move laterally into other tiers",
        "רשתות שטוחות אינן יכולות לתמוך ב-load balancers",
        "פילוח רשתי (segmentation) שימושי רק לצורכי compliance ולא לאבטחה",
      ],
      options_he: [
        "לרשתות שטוחות תמיד יש latency גבוה יותר",
        "אם שכבה כלשהי נפרצת, לתוקף יש גישה רשתית בלתי מוגבלת לתנועה רוחבית (lateral movement) אל שכבות אחרות",
        "רשתות שטוחות אינן יכולות לתמוך ב-load balancers",
        "פילוח רשתי (segmentation) שימושי רק לצורכי compliance ולא לאבטחה",
      ],
      correctAnswer: 1,
      explanation:
        "Segmentation into per-tier security zones limits the blast radius of a compromise: even if the web tier is breached, the attacker should not automatically have a direct path to the database tier. A flat network with one permissive security group removes that containment, letting a single foothold escalate into full lateral movement. Latency and load balancer support are unrelated to segmentation.",
      explanation_he:
        "פילוח לאזורי אבטחה נפרדים לכל שכבה מגביל את רדיוס הנזק (blast radius) של פריצה: גם אם שכבת ה-web נפרצת, לתוקף לא אמורה להיות דרך ישירה אוטומטית לשכבת מסד הנתונים. רשת שטוחה עם security group מתיר אחד מבטלת את ההכלה הזו, ומאפשרת לדריסת רגל בודדת להסלים לתנועה רוחבית מלאה. latency ותמיכה ב-load balancer אינם קשורים לפילוח.",
      resourceTitle: "Google Cloud Firewall Rules — Segmentation Guidance",
      resourceUrl: "https://cloud.google.com/firewall/docs/firewalls",
      keywords: ["segmentation", "flat network", "security zones", "lateral movement"],
      tooltipTerms: ["Security Group"],
    },
    {
      id: "p21-net-007",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team needs an application to reach a managed database service without traffic ever traversing the public internet, and without maintaining a list of allowed public IP addresses. Which approach best meets this requirement?",
      question_he:
        "צוות זקוק לכך שאפליקציה תגיע לשירות מסד נתונים מנוהל מבלי שהתעבורה תעבור אי פעם דרך האינטרנט הציבורי, ומבלי לתחזק רשימת כתובות IP ציבוריות מותרות. איזו גישה עונה בצורה הטובה ביותר על הדרישה?",
      options: [
        "להגדיר את נקודת הקצה הציבורית של מסד הנתונים עם allow-list המכיל את כתובות ה-IP היוצאות של האפליקציה",
        "Use a private endpoint / private link so the database is reachable via a private IP within the virtual network",
        "לפתוח את חומת האש של מסד הנתונים ל-0.0.0.0/0 ולהסתמך על סיסמת האפליקציה",
        "להשתמש ב-NAT gateway כדי להסוות את כתובת ה-IP של האפליקציה",
      ],
      options_he: [
        "להגדיר את נקודת הקצה הציבורית של מסד הנתונים עם allow-list המכיל את כתובות ה-IP היוצאות של האפליקציה",
        "להשתמש ב-private endpoint / private link כך שמסד הנתונים יהיה נגיש דרך IP פרטי בתוך הרשת הווירטואלית",
        "לפתוח את חומת האש של מסד הנתונים ל-0.0.0.0/0 ולהסתמך על סיסמת האפליקציה",
        "להשתמש ב-NAT gateway כדי להסוות את כתובת ה-IP של האפליקציה",
      ],
      correctAnswer: 1,
      explanation:
        "A private endpoint (or private link) attaches the managed service to a private IP address inside the consumer's virtual network, so traffic stays on the provider's private backbone and never touches the public internet — with no IP allow-list to maintain. Public endpoint plus IP allow-lists still relies on public exposure and ongoing list maintenance, and opening the firewall to everyone is the opposite of least exposure.",
      explanation_he:
        "private endpoint (או private link) מצמיד את השירות המנוהל לכתובת IP פרטית בתוך הרשת הווירטואלית של הצרכן, כך שהתעבורה נשארת על הגב הפרטי של הספק ולעולם לא נוגעת באינטרנט הציבורי — ללא צורך בתחזוקת allow-list. נקודת קצה ציבורית עם allow-list עדיין מסתמכת על חשיפה ציבורית ותחזוקה שוטפת, ופתיחת חומת האש לכולם היא ההיפך מחשיפה מינימלית.",
      resourceTitle: "Azure Private Link Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["private endpoint", "private link", "public exposure"],
      tooltipTerms: ["Private Endpoint"],
    },
    {
      id: "p21-net-008",
      providers: ["neutral"],
      domains: ["netsec", "monitoring"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following are legitimate uses of network flow logs (e.g., VPC Flow Logs, NSG flow logs)? (Select all that apply)",
      question_he:
        "מה מבין הבאים מהווה שימוש לגיטימי ב-flow logs רשתיים (למשל VPC Flow Logs, NSG flow logs)? (בחר את כל האפשרויות הרלוונטיות)",
      options: [
        "Detecting unexpected traffic patterns that may indicate data exfiltration",
        "Troubleshooting why a security group/NSG rule is unexpectedly blocking traffic",
        "לחסום באופן אוטומטי תעבורה זדונית בזמן אמת ללא שום כלי נוסף",
        "Providing evidence for post-incident forensic analysis",
      ],
      options_he: [
        "לזהות דפוסי תעבורה בלתי צפויים שעשויים להעיד על exfiltration של נתונים",
        "לפתור בעיות של מדוע כלל security group/NSG חוסם תעבורה באופן בלתי צפוי",
        "לחסום באופן אוטומטי תעבורה זדונית בזמן אמת ללא שום כלי נוסף",
        "לספק ראיות לניתוח פורנזי לאחר אירוע אבטחה",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Flow logs are a passive recording mechanism: they capture metadata about accepted and rejected connections, which is invaluable for anomaly detection, rule troubleshooting, and forensic investigation after an incident. They do not themselves block or react to traffic in real time — that requires a separate enforcement or detection system (e.g., an IDS/IPS or SIEM) consuming the logs, which is why logging without analysis provides no active protection.",
      explanation_he:
        "flow logs הם מנגנון תיעוד פסיבי: הם קולטים מטא-דאטה על חיבורים שאושרו ונדחו, מה שבעל ערך רב לאיתור אנומליות, פתרון בעיות בכללים, וחקירה פורנזית לאחר אירוע. הם עצמם אינם חוסמים או מגיבים לתעבורה בזמן אמת — לשם כך נדרשת מערכת אכיפה או זיהוי נפרדת (כמו IDS/IPS או SIEM) שצורכת את הלוגים, ולכן תיעוד ללא ניתוח אינו מספק הגנה אקטיבית.",
      resourceTitle: "Amazon VPC Flow Logs",
      resourceUrl:
        "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      keywords: ["flow logs", "visibility", "forensics", "detection"],
      tooltipTerms: [],
    },
    {
      id: "p21-net-009",
      providers: ["neutral"],
      domains: ["netsec", "networking"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "East-west traffic refers to communication between servers within the same data center or virtual network (e.g., app tier to database tier), whereas north-south traffic refers to traffic entering or leaving the network perimeter.",
      question_he:
        "תעבורת east-west מתייחסת לתקשורת בין שרתים בתוך אותו מרכז נתונים או רשת וירטואלית (למשל שכבת אפליקציה לשכבת מסד נתונים), בעוד תעבורת north-south מתייחסת לתעבורה הנכנסת או יוצאת מהיקף הרשת (perimeter).",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "This is the standard terminology: east-west describes internal, lateral traffic between workloads, while north-south describes traffic crossing the perimeter to/from external clients or the internet. The distinction matters operationally because perimeter (north-south) firewalls alone do nothing to contain an attacker who is already moving east-west inside the network.",
      explanation_he:
        "זו הטרמינולוגיה הסטנדרטית: east-west מתאר תעבורה פנימית ורוחבית בין עומסי עבודה, בעוד north-south מתאר תעבורה החוצה את ה-perimeter אל/מלקוחות חיצוניים או האינטרנט. ההבחנה חשובה תפעולית כי חומות אש בהיקף (north-south) בלבד אינן עוזרות להכיל תוקף שכבר נע east-west בתוך הרשת.",
      resourceTitle: "Google Cloud Armor Documentation",
      resourceUrl: "https://cloud.google.com/armor/docs",
      keywords: ["east-west", "north-south", "traffic direction"],
      tooltipTerms: [],
    },
    {
      id: "p21-net-010",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "An NSG has two rules: Rule 100 denies all inbound traffic from 10.0.0.0/16, and Rule 200 allows inbound traffic from 10.0.1.5 on port 443. Traffic arrives from 10.0.1.5 on port 443. What happens, and why?",
      question_he:
        "ל-NSG יש שני כללים: כלל 100 חוסם את כל תעבורת ה-inbound מ-10.0.0.0/16, וכלל 200 מתיר תעבורת inbound מ-10.0.1.5 בפורט 443. תעבורה מגיעה מ-10.0.1.5 בפורט 443. מה קורה, ומדוע?",
      options: [
        "התעבורה מותרת, כי כלל 200 ספציפי יותר מכלל 100",
        "The traffic is denied, because NSGs evaluate rules in priority order and Rule 100 (lower priority number, evaluated first) matches and denies it before Rule 200 is considered",
        "התעבורה מותרת, כי כללי allow תמיד גוברים על כללי deny",
        "שני הכללים חלים והתעבורה נרשמת בלוג פעמיים אך אינה נחסמת",
      ],
      options_he: [
        "התעבורה מותרת, כי כלל 200 ספציפי יותר מכלל 100",
        "התעבורה נחסמת, כי NSG-ים מעריכים כללים לפי סדר עדיפות (priority), וכלל 100 (מספר עדיפות נמוך יותר, מוערך ראשון) תואם וחוסם אותה לפני שכלל 200 נבדק כלל",
        "התעבורה מותרת, כי כללי allow תמיד גוברים על כללי deny",
        "שני הכללים חלים והתעבורה נרשמת בלוג פעמיים אך אינה נחסמת",
      ],
      correctAnswer: 1,
      explanation:
        "NSGs (and most cloud firewall rule sets) use first-match-wins evaluation by ascending priority number, not most-specific-wins semantics. Because Rule 100 has a lower priority number, it is evaluated first; since it matches the source range, the packet is denied and Rule 200 is never reached, regardless of how specific it is. This is a classic real-world source of rule-ordering bugs when administrators assume specificity determines outcome.",
      explanation_he:
        "NSG-ים (וכמו כן רוב מערכי הכללים של חומות אש בענן) משתמשים בהערכה מסוג first-match-wins לפי מספר priority עולה, ולא בסמנטיקה של most-specific-wins. מכיוון שלכלל 100 יש מספר priority נמוך יותר, הוא מוערך ראשון; מאחר שהוא תואם את טווח המקור, החבילה נחסמת וכלל 200 לעולם לא נבדק, ללא קשר למידת הספציפיות שלו. זהו מקור קלאסי לבאגים בפועל כאשר מנהלים מניחים שספציפיות קובעת את התוצאה.",
      resourceTitle: "Azure Network Security Groups Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["rule ordering", "priority", "nsg evaluation"],
      tooltipTerms: ["NSG"],
    },
    {
      id: "p21-net-011",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A subnet uses a stateless network ACL. An inbound rule allows traffic on port 443 from the internet, but administrators forgot to add an outbound rule permitting traffic to ephemeral ports 1024-65535. What is the likely symptom?",
      question_he:
        "ב-subnet נעשה שימוש ב-network ACL stateless. כלל inbound מתיר תעבורה בפורט 443 מהאינטרנט, אך המנהלים שכחו להוסיף כלל outbound המתיר תעבורה לפורטים אפמריים 1024-65535. מה התסמין הסביר?",
      options: [
        "Inbound connections on port 443 will succeed, but the server won't be able to send return traffic back to clients, causing failed or hanging connections",
        "אין השפעה, כי ACL-ים stateless עוקבים אחר מצב החיבור באופן פנימי בכל זאת",
        "תעבורת inbound בפורט 443 תיחסם לחלוטין",
        "רק תעבורת IPv6 תושפע מכך",
      ],
      options_he: [
        "חיבורי inbound בפורט 443 יצליחו, אך השרת לא יוכל לשלוח תעבורת תשובה חזרה ללקוחות, מה שיגרום לחיבורים כושלים או תקועים",
        "אין השפעה, כי ACL-ים stateless עוקבים אחר מצב החיבור באופן פנימי בכל זאת",
        "תעבורת inbound בפורט 443 תיחסם לחלוטין",
        "רק תעבורת IPv6 תושפע מכך",
      ],
      correctAnswer: 0,
      explanation:
        "Stateless ACLs do not track connection state, so the return leg of any connection is a completely separate packet that must be explicitly permitted. A client connecting on port 443 sends its response traffic to the server's ephemeral source port, so without an outbound rule opening the ephemeral range, the initial SYN can arrive but the response can never leave, producing exactly the kind of one-way-looking, hanging-connection symptom that confuses teams used to stateful security groups.",
      explanation_he:
        "ACL-ים stateless אינם עוקבים אחר מצב חיבור, כך שהתעבורה החוזרת של כל חיבור היא חבילה נפרדת לחלוטין שחייבת להיות מותרת במפורש. לקוח שמתחבר בפורט 443 שולח את תעבורת התשובה שלו אל פורט המקור האפמרי של השרת, כך שללא כלל outbound שפותח את הטווח האפמרי, ה-SYN הראשוני יכול להגיע אך התשובה לעולם לא תוכל לצאת — מה שיוצר בדיוק את תסמין החיבור התקוע-חד-כיווני שמבלבל צוותים הרגילים ל-security groups מסוג stateful.",
      resourceTitle: "Amazon VPC Security Groups — Ephemeral Ports",
      resourceUrl:
        "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      keywords: ["stateless", "nacl", "ephemeral ports"],
      tooltipTerms: ["NACL"],
    },
    {
      id: "p21-net-012",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "An application behind both a network firewall (allowing only port 443) and a WAF is hit with a SQL injection attack embedded in a legitimate-looking HTTPS POST request. The network firewall does not detect anything abnormal. Why is this expected, and what should catch the attack?",
      question_he:
        "אפליקציה שנמצאת מאחורי גם חומת אש רשתית (המתירה רק פורט 443) וגם WAF, נפגעת מהתקפת SQL injection המוטמעת בבקשת HTTPS POST שנראית לגיטימית. חומת האש הרשתית אינה מזהה דבר חריג. מדוע זה צפוי, ומה אמור לתפוס את ההתקפה?",
      options: [
        "חומת האש הרשתית נכשלה כי הייתה אמורה לפענח TLS ולבדוק את ה-payload; ה-WAF מיותר",
        "The network firewall operates below the application layer and only sees permitted ports/protocols, not HTTP payload content — this is precisely what the WAF, which inspects HTTP request bodies and applies rules like SQLi signatures, is designed to catch",
        "SQL injection לא ניתן לזיהוי על ידי אף בקרת היקף ודורש רק validation ברמת האפליקציה",
        "שני ההתקנים היו אמורים לחסום את זה באופן זהה מכיוון שהם בודקים את אותה תעבורה",
      ],
      options_he: [
        "חומת האש הרשתית נכשלה כי הייתה אמורה לפענח TLS ולבדוק את ה-payload; ה-WAF מיותר",
        "חומת האש הרשתית פועלת מתחת לשכבת האפליקציה ורואה רק פורטים/פרוטוקולים מותרים, לא את תוכן ה-payload של HTTP — זה בדיוק מה ש-WAF, הבודק את גוף בקשות ה-HTTP ומחיל חתימות כמו SQLi, נועד לתפוס",
        "SQL injection לא ניתן לזיהוי על ידי אף בקרת היקף ודורש רק validation ברמת האפליקציה",
        "שני ההתקנים היו אמורים לחסום את זה באופן זהה מכיוון שהם בודקים את אותה תעבורה",
      ],
      correctAnswer: 1,
      explanation:
        "This is the fundamental division of labor between the two controls: the network firewall's job ends at verifying the connection is on an allowed port/protocol, with no awareness of what the encrypted-then-decrypted HTTP payload contains. The WAF sits at the application layer specifically to inspect request bodies, headers, and parameters for attack patterns like SQL injection, so it — not the network firewall — is the correct layer to catch this.",
      explanation_he:
        "זהו חלוקת התפקידים הבסיסית בין שתי הבקרות: תפקידה של חומת האש הרשתית מסתיים באימות שהחיבור נמצא על פורט/פרוטוקול מותר, ללא כל מודעות לתוכן ה-payload של HTTP (לאחר פענוח TLS). ה-WAF נמצא בשכבת האפליקציה במיוחד כדי לבדוק גופי בקשות, headers ופרמטרים לדפוסי התקפה כמו SQL injection, ולכן הוא — ולא חומת האש הרשתית — הוא השכבה הנכונה לתפוס זאת.",
      resourceTitle: "Azure Web Application Firewall Overview",
      resourceUrl: "https://learn.microsoft.com/azure/web-application-firewall/overview",
      keywords: ["waf", "sql injection", "layered defense"],
      tooltipTerms: ["WAF"],
    },
    {
      id: "p21-net-013",
      providers: ["neutral"],
      domains: ["netsec", "networking"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following are effective techniques for containing lateral movement (east-west) once an attacker compromises a single host in a segmented environment? (Select all that apply)",
      question_he:
        "מה מבין הבאים מהווה טכניקה יעילה להכלת תנועה רוחבית (lateral movement, east-west) לאחר שתוקף פורץ למארח בודד בסביבה מפולחת? (בחר את כל האפשרויות הרלוונטיות)",
      options: [
        "Applying per-workload security groups so only explicitly required ports/peers are reachable, even within the same subnet",
        "להסתמך אך ורק על חומת האש בהיקף (perimeter) מכיוון שתעבורה פנימית כבר 'מהימנה'",
        "Using network policies (e.g., Kubernetes NetworkPolicy) to restrict pod-to-pod communication to only necessary services",
        "Deploying host-based or micro-segmentation controls that enforce zero-trust rules regardless of network topology",
      ],
      options_he: [
        "החלת security groups לכל workload בנפרד, כך שרק פורטים/עמיתים הנדרשים במפורש נגישים, גם בתוך אותו subnet",
        "להסתמך אך ורק על חומת האש בהיקף (perimeter) מכיוון שתעבורה פנימית כבר 'מהימנה'",
        "שימוש ב-network policies (למשל Kubernetes NetworkPolicy) כדי להגביל תקשורת pod-to-pod רק לשירותים הנחוצים",
        "פריסת בקרות מבוססות-מארח או micro-segmentation שאוכפות כללי zero-trust ללא תלות בטופולוגיית הרשת",
      ],
      correctAnswer: [0, 2, 3],
      explanation:
        "Effective lateral-movement containment applies zero-trust, deny-by-default rules at the workload level — per-instance security groups, Kubernetes NetworkPolicy for pod-to-pod traffic, and micro-segmentation controls that don't assume internal traffic is safe just because it's inside the perimeter. Relying solely on the perimeter firewall is precisely the flat-network mistake that lets a single compromised host reach everything else unimpeded.",
      explanation_he:
        "הכלה יעילה של תנועה רוחבית מחילה כללי zero-trust מסוג deny-by-default ברמת ה-workload — security groups לכל instance בנפרד, Kubernetes NetworkPolicy עבור תעבורת pod-to-pod, ובקרות micro-segmentation שאינן מניחות שתעבורה פנימית בטוחה רק בגלל שהיא בתוך ה-perimeter. הסתמכות אך ורק על חומת האש בהיקף היא בדיוק הטעות של רשת שטוחה, המאפשרת למארח שנפרץ בודד להגיע לכל השאר ללא הפרעה.",
      resourceTitle: "Kubernetes Network Policies",
      resourceUrl:
        "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
      keywords: ["micro-segmentation", "zero trust", "lateral movement"],
      tooltipTerms: ["Network Policy"],
    },
    {
      id: "p21-net-014",
      providers: ["neutral"],
      domains: ["netsec", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A security team notices a compromised VM inside a private subnet sending large volumes of data to an unfamiliar external IP over port 443, disguised as normal HTTPS traffic. Which control, if properly configured beforehand, would have been most effective at preventing this exfiltration?",
      question_he:
        "צוות אבטחה מבחין ש-VM שנפרץ בתוך subnet פרטי שולח כמויות גדולות של נתונים לכתובת IP חיצונית לא מוכרת דרך פורט 443, במסווה של תעבורת HTTPS רגילה. איזו בקרה, אם הוגדרה כראוי מראש, הייתה יעילה ביותר במניעת ה-exfiltration הזו?",
      options: [
        "כלל NSG ל-inbound שחוסם RDP מהאינטרנט",
        "An egress rule/firewall policy restricting outbound traffic to only known, required destinations (e.g., via an explicit allow-list or forced routing through an inspected egress firewall)",
        "הפעלת TLS על ה-API-ים הפנימיים של האפליקציה",
        "WAF המגן על ה-load balancer הפונה החוצה",
      ],
      options_he: [
        "כלל NSG ל-inbound שחוסם RDP מהאינטרנט",
        "כלל egress/מדיניות חומת אש המגבילה תעבורת outbound רק ליעדים ידועים ונדרשים (למשל דרך allow-list מפורש או ניתוב מאולץ דרך חומת אש egress הבודקת את התעבורה)",
        "הפעלת TLS על ה-API-ים הפנימיים של האפליקציה",
        "WAF המגן על ה-load balancer הפונה החוצה",
      ],
      correctAnswer: 1,
      explanation:
        "Since the exfiltration is outbound traffic to an unapproved destination, only an egress control — restricting outbound destinations to a known allow-list or routing through an inspected egress firewall — could have stopped it, regardless of the encryption or port used. Blocking inbound RDP addresses a different attack vector, internal TLS protects data in transit but doesn't restrict destinations, and a WAF only inspects inbound HTTP requests to public-facing services, not outbound traffic from a compromised internal VM.",
      explanation_he:
        "מכיוון שה-exfiltration הוא תעבורת outbound ליעד לא מאושר, רק בקרת egress — המגבילה יעדי outbound ל-allow-list ידוע או מנתבת דרך חומת אש egress הבודקת את התעבורה — הייתה יכולה לעצור זאת, ללא קשר להצפנה או לפורט בהם נעשה שימוש. חסימת RDP inbound מטפלת בווקטור התקפה שונה, TLS פנימי מגן על נתונים בתעבורה אך אינו מגביל יעדים, ו-WAF בודק רק בקשות HTTP inbound לשירותים הפונים החוצה, לא תעבורת outbound מ-VM פנימי שנפרץ.",
      resourceTitle: "AWS WAF Developer Guide",
      resourceUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html",
      keywords: ["egress control", "exfiltration", "allow-list"],
      tooltipTerms: ["Egress"],
    },
    {
      id: "p21-net-015",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "advanced",
      type: "true-false",
      question:
        "Just-in-time (JIT) access, which opens a bastion host's management port only for a brief approved window and specific source IP, provides meaningfully better security than leaving that port permanently open, even though it does not eliminate all risk from a credential compromise during the window.",
      question_he:
        "גישת Just-in-time (JIT), הפותחת את פורט הניהול של bastion host רק לחלון זמן קצר ומאושר ומכתובת IP מקור ספציפית, מספקת אבטחה טובה משמעותית לעומת השארת הפורט פתוח לצמיתות, גם אם היא אינה מבטלת לחלוטין את הסיכון מהתקפת אישורי גישה (credential compromise) בתוך אותו חלון.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "JIT access dramatically shrinks the window an attacker has to discover and exploit an exposed port, defeats automated internet-wide scanning that relies on ports being always-open, and adds an approval/audit trail. It is not a silver bullet — if credentials are compromised during the approved window, JIT alone won't stop that specific access — but that limitation doesn't make it equivalent to a permanently open port; it is still a substantial risk reduction, not a false sense of security.",
      explanation_he:
        "גישת JIT מצמצמת דרמטית את חלון הזמן שיש לתוקף לגלות ולנצל פורט חשוף, מסכלת סריקות אוטומטיות רחבות-אינטרנט המסתמכות על פורטים הפתוחים תמיד, ומוסיפה מסלול אישור וביקורת (audit). זו אינה תרופת פלא — אם אישורי הגישה נפרצים בתוך חלון האישור, JIT לבדו לא יעצור את הגישה הספציפית הזו — אך מגבלה זו אינה הופכת אותה לשקולה לפורט פתוח לצמיתות; עדיין מדובר בהפחתת סיכון משמעותית, לא בתחושת ביטחון כוזבת.",
      resourceTitle: "Azure Network Security Groups Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["just-in-time access", "bastion", "attack window"],
      tooltipTerms: ["Bastion"],
    },
    {
      id: "p21-net-016",
      providers: ["neutral"],
      domains: ["netsec"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following are accurate considerations when adopting private endpoints/private link for a managed service? (Select all that apply)",
      question_he:
        "מה מבין הבאים מהווה שיקול מדויק בעת אימוץ private endpoints/private link עבור שירות מנוהל? (בחר את כל האפשרויות הרלוונטיות)",
      options: [
        "Traffic between the consumer VNet/VPC and the service travels over the provider's private backbone rather than the public internet",
        "Private endpoints eliminate the need for any security group or NSG rules on the consuming resource",
        "DNS configuration often needs updating (e.g., private DNS zones) so that the service's standard hostname resolves to the private IP",
        "Using a private endpoint can reduce exposure to internet-based attacks such as credential stuffing against a public endpoint",
      ],
      options_he: [
        "תעבורה בין ה-VNet/VPC הצרכני לשירות עוברת דרך הגב הפרטי של הספק ולא דרך האינטרנט הציבורי",
        "private endpoints מבטלים את הצורך בכל כלל security group או NSG על המשאב הצרכני",
        "לרוב נדרש עדכון תצורת DNS (למשל private DNS zones) כך ששם המארח הרגיל של השירות יפתר לכתובת ה-IP הפרטית",
        "שימוש ב-private endpoint יכול להפחית חשיפה להתקפות מבוססות-אינטרנט כמו credential stuffing נגד נקודת קצה ציבורית",
      ],
      correctAnswer: [0, 2, 3],
      explanation:
        "Private endpoints route traffic over the cloud provider's private network and typically require DNS updates so applications resolve to the private IP transparently, and they meaningfully shrink the public attack surface. However, they do not replace network security groups or NSGs on the consuming resource — those are still needed to control which internal resources may initiate connections to the private endpoint in the first place, so option two overstates what private endpoints do.",
      explanation_he:
        "private endpoints מנתבים תעבורה על גבי הרשת הפרטית של ספק הענן ולרוב דורשים עדכוני DNS כדי שאפליקציות יפתרו לכתובת ה-IP הפרטית באופן שקוף, והם מצמצמים משמעותית את משטח התקיפה הציבורי. עם זאת, הם אינם מחליפים security groups או NSG-ים על המשאב הצרכני — אלו עדיין נחוצים כדי לשלוט אילו משאבים פנימיים רשאים כלל ליזום חיבורים אל ה-private endpoint, ולכן האפשרות השנייה מפריזה במה ש-private endpoints באמת עושים.",
      resourceTitle: "Azure Private Link Overview",
      resourceUrl:
        "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview",
      keywords: ["private link", "private endpoint", "dns", "attack surface"],
      tooltipTerms: ["Private Endpoint", "NSG"],
    },
  ],
});
