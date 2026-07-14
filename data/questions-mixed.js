/**
 * questions-mixed.js — Quiz pack: cross-provider comparisons (9 questions).
 * Each question spans two or more providers and compares equivalent
 * concepts. Registers itself via CQA.data.registerPack(). Data only.
 * Phase 15: fully bilingual (question_he/options_he/explanation_he) as
 * part of the foundational core-pack translation set.
 */

CQA.data.registerPack({
  id: "mixed-cross-provider",
  label: "Cross-Provider Comparisons",
  questions: [
    {
      id: "mix-net-001",
      providers: ["azure", "aws"],
      domains: ["networking"],
      difficulty: "beginner",
      type: "multiple-choice",
      question: "Which AWS service is the closest equivalent of an Azure Virtual Network (VNet)?",
      question_he: "איזה שירות ב-AWS הוא המקבילה הקרובה ביותר ל-Azure Virtual Network (VNet)?",
      options: [
        "AWS Direct Connect",
        "Amazon VPC",
        "Amazon Route 53",
        "AWS Transit Gateway",
      ],
      options_he: [
        "AWS Direct Connect",
        "Amazon VPC",
        "Amazon Route 53",
        "AWS Transit Gateway",
      ],
      correctAnswer: 1,
      explanation:
        "VNet and VPC solve the same problem: a private, isolated address space where you place resources, divided into subnets with controlled routing. Both are regional constructs. The other options are adjacent but different: Direct Connect is a private circuit to AWS (like Azure ExpressRoute), Route 53 is DNS (like Azure DNS), and Transit Gateway is a hub for connecting many VPCs (like Azure Virtual WAN).",
      explanation_he:
        "VNet ו-VPC פותרים את אותה הבעיה: מרחב כתובות פרטי ומבודד שבו אתם ממקמים משאבים, מחולק ל-Subnet-ים עם ניתוב מבוקר. שניהם מבנים אזוריים. שאר האפשרויות קרובות אך שונות: Direct Connect הוא מעגל פרטי אל AWS (כמו Azure ExpressRoute), Route 53 הוא DNS (כמו Azure DNS), ו-Transit Gateway הוא רכזת לחיבור VPC-ים רבים (כמו Azure Virtual WAN).",
      resourceTitle: "Amazon VPC — What is Amazon VPC?",
      resourceUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
      keywords: ["vnet", "vpc", "equivalents", "private network"],
      tooltipTerms: ["VNet", "VPC"],
    },
    {
      id: "mix-sto-001",
      providers: ["azure", "aws", "gcp"],
      domains: ["storage"],
      difficulty: "beginner",
      type: "multiple-choice",
      question: "Which row correctly matches each cloud's object storage service?",
      question_he: "איזו שורה מתאימה נכון לשירות אחסון האובייקטים של כל ענן?",
      options: [
        "AWS: EBS — Azure: Azure Files — GCP: Filestore",
        "AWS: S3 — Azure: Blob Storage — GCP: Cloud Storage",
        "AWS: EFS — Azure: Disk Storage — GCP: Persistent Disk",
        "AWS: S3 — Azure: Queue Storage — GCP: Bigtable",
      ],
      options_he: [
        "AWS: EBS — Azure: Azure Files — GCP: Filestore",
        "AWS: S3 — Azure: Blob Storage — GCP: Cloud Storage",
        "AWS: EFS — Azure: Disk Storage — GCP: Persistent Disk",
        "AWS: S3 — Azure: Queue Storage — GCP: Bigtable",
      ],
      correctAnswer: 1,
      explanation:
        "S3, Blob Storage and Cloud Storage are the three object stores: HTTP-accessible objects in buckets/containers, effectively unlimited scale, tiered pricing. The wrong rows mix in block storage (EBS, Disk Storage, Persistent Disk — VM volumes) and file storage (EFS, Azure Files, Filestore — network file shares). Object vs block vs file is the first classification to make in any storage discussion, in every cloud.",
      explanation_he:
        "S3, Blob Storage ו-Cloud Storage הם שלושת אחסוני האובייקטים: אובייקטים נגישים דרך HTTP בתוך buckets/containers, קנה מידה כמעט בלתי מוגבל, תמחור מדורג. השורות השגויות מערבבות אחסון בלוקים (EBS, Disk Storage, Persistent Disk — כרכי מכונה וירטואלית) ואחסון קבצים (EFS, Azure Files, Filestore — שיתופי קבצים ברשת). אובייקט מול בלוק מול קובץ הוא הסיווג הראשון שיש לבצע בכל דיון על אחסון, בכל ענן.",
      resourceTitle: "Compare AWS and Azure storage services",
      resourceUrl: "https://learn.microsoft.com/azure/architecture/aws-professional/storage",
      keywords: ["object storage", "s3", "blob storage", "cloud storage", "equivalents"],
      tooltipTerms: ["S3", "Blob Storage", "Cloud Storage", "Object Storage"],
    },
    {
      id: "mix-idn-001",
      providers: ["aws", "gcp"],
      domains: ["identity"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "AWS IAM roles and GCP service accounts both give workloads an identity with short-lived credentials, avoiding long-lived stored keys.",
      question_he: "גם IAM roles ב-AWS וגם service accounts ב-GCP מעניקים לעומסי עבודה זהות עם פרטי גישה קצרי-מועד, תוך הימנעות ממפתחות מאוחסנים לטווח ארוך.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Both implement the same security pattern: attach an identity to the workload (EC2 instance profile / service account on a VM), and the platform serves short-lived tokens via a metadata endpoint — no secret in code or config. One conceptual difference: a GCP service account is a permanent identity that a VM runs as, while an AWS role is assumed, producing temporary STS credentials for any principal allowed to assume it. Azure's managed identity completes the trio.",
      explanation_he:
        "שניהם מיישמים את אותו דפוס אבטחה: צירוף זהות לעומס העבודה (instance profile ב-EC2 / service account על מכונה וירטואלית), והפלטפורמה מגישה אסימונים קצרי-מועד דרך נקודת קצה של metadata — ללא סוד בקוד או בתצורה. הבדל מושגי אחד: service account ב-GCP הוא זהות קבועה שמכונה וירטואלית רצה תחתיה, בעוד role ב-AWS מאומץ (assumed), ומייצר פרטי גישה זמניים מסוג STS לכל גורם שמורשה לאמץ אותו. Managed Identity של Azure משלים את השלישייה.",
      resourceTitle: "Service accounts overview (GCP)",
      resourceUrl: "https://cloud.google.com/iam/docs/service-account-overview",
      keywords: ["workload identity", "iam role", "service account", "temporary credentials"],
      tooltipTerms: ["IAM Role", "Service Account", "Managed Identity"],
    },
    {
      id: "mix-sec-001",
      providers: ["azure", "aws"],
      domains: ["security", "networking"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question: "Which Azure feature is the closest equivalent of an AWS security group?",
      question_he: "איזו יכולת ב-Azure היא המקבילה הקרובה ביותר ל-security group ב-AWS?",
      options: [
        "Azure Firewall",
        "Network Security Group (NSG)",
        "Azure DDoS Protection",
        "Web Application Firewall (WAF)",
      ],
      options_he: [
        "Azure Firewall",
        "Network Security Group (NSG)",
        "Azure DDoS Protection",
        "Web Application Firewall (WAF)",
      ],
      correctAnswer: 1,
      explanation:
        "Both are the built-in, free packet filters you attach near the workload. Two differences worth knowing: an AWS security group is allow-rules-only and instance-level, while an NSG supports explicit deny rules with priorities and attaches to subnets as well as NICs — so an NSG also covers part of what AWS network ACLs do. Azure Firewall and WAF are separate managed services for centralized egress control and HTTP-layer protection.",
      explanation_he:
        "שניהם הם מסנני החבילות (packet filters) המובנים והחינמיים שמצרפים קרוב לעומס העבודה. שני הבדלים ששווה להכיר: security group ב-AWS הוא כללי-אפשור-בלבד וברמת המופע, בעוד NSG תומך בכללי חסימה מפורשים עם עדיפויות ומצורף גם ל-Subnet-ים וגם ל-NIC-ים — כך ש-NSG מכסה גם חלק ממה ש-network ACLs עושים ב-AWS. Azure Firewall ו-WAF הם שירותים מנוהלים נפרדים לבקרת יציאה (egress) מרכזית והגנה ברמת HTTP.",
      resourceTitle: "Azure and AWS networking comparison",
      resourceUrl: "https://learn.microsoft.com/azure/architecture/aws-professional/networking",
      keywords: ["security group", "nsg", "equivalents", "traffic filtering"],
      tooltipTerms: ["Security Group", "NSG"],
    },
    {
      id: "mix-gov-001",
      providers: ["azure", "gcp"],
      domains: ["governance"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "Azure uses management groups to organize subscriptions. Which GCP concept plays the equivalent role for organizing projects?",
      question_he: "Azure משתמש ב-management groups לארגון מנויים (subscriptions). איזה מושג ב-GCP ממלא תפקיד מקביל לארגון פרויקטים?",
      options: [
        "Billing accounts",
        "Regions",
        "Folders in the resource hierarchy",
        "Labels",
      ],
      options_he: [
        "חשבונות חיוב (Billing accounts)",
        "Regions",
        "Folders בהיררכיית המשאבים",
        "Labels",
      ],
      correctAnswer: 2,
      explanation:
        "Both clouds hang governance on a tree. Azure: management groups → subscriptions → resource groups; GCP: organization → folders → projects. Folders and management groups serve the same purpose — group the billing/isolation units (subscriptions/projects) by team or environment, then apply policy and access at the group so it inherits downward. Labels and tags are metadata for reporting, not hierarchy; billing accounts handle payment, not structure.",
      explanation_he:
        "שני העננים תולים את הממשל שלהם על עץ. Azure: management groups ← מנויים ← קבוצות משאבים; GCP: Organization ← folders ← projects. Folders ו-management groups משרתים את אותה מטרה — קיבוץ יחידות החיוב/הבידוד (מנויים/פרויקטים) לפי צוות או סביבה, ולאחר מכן החלת מדיניות וגישה ברמת הקבוצה כך שהיא עוברת בתורשה כלפי מטה. Labels ו-tags הם מטא-דאטה לדיווח, לא היררכיה; חשבונות חיוב מטפלים בתשלום, לא במבנה.",
      resourceTitle: "GCP resource hierarchy",
      resourceUrl: "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy",
      keywords: ["management groups", "folders", "hierarchy", "governance"],
      tooltipTerms: ["Management Group", "Resource Hierarchy", "Project"],
    },
    {
      id: "mix-cmp-001",
      providers: ["azure", "aws", "gcp"],
      domains: ["compute"],
      difficulty: "beginner",
      type: "multi-select",
      question: "Which of the following are serverless function (FaaS) offerings? (Select all that apply.)",
      question_he: "מה מבין הבאים הן הצעות פונקציות ללא-שרת (FaaS)? (בחרו את כל התשובות הנכונות.)",
      options: [
        "Azure Functions",
        "AWS Lambda",
        "Google Cloud Functions",
        "Amazon EC2",
      ],
      options_he: [
        "Azure Functions",
        "AWS Lambda",
        "Google Cloud Functions",
        "Amazon EC2",
      ],
      correctAnswer: [0, 1, 2],
      explanation:
        "Functions-as-a-Service means you deploy code, the platform runs it per event, scales it (down to zero), and bills per execution — Azure Functions, AWS Lambda and Cloud Functions are the three first-party examples. EC2 is the opposite end of the spectrum: you manage the VM, and it bills while running regardless of activity. The practical FaaS trade-offs are the same everywhere: cold starts, execution time limits, and statelessness.",
      explanation_he:
        "Functions-as-a-Service אומר שאתם פורסים קוד, הפלטפורמה מריצה אותו לפי אירוע, מגמישה אותו (עד לאפס), ומחייבת לפי הרצה — Azure Functions, AWS Lambda ו-Cloud Functions הן שלוש הדוגמאות הרשמיות. EC2 הוא הקצה ההפוך של הספקטרום: אתם מנהלים את המכונה הוירטואלית, והיא מחויבת בזמן ריצה ללא קשר לפעילות. הפשרות ה-FaaS המעשיות זהות בכל מקום: cold starts, מגבלות זמן ריצה, וחוסר שמירת מצב (statelessness).",
      resourceTitle: "Serverless computing on AWS",
      resourceUrl: "https://aws.amazon.com/serverless/",
      keywords: ["faas", "serverless", "functions", "lambda"],
      tooltipTerms: ["Serverless", "Lambda", "EC2"],
    },
    {
      id: "mix-net-002",
      providers: ["aws", "gcp"],
      domains: ["networking"],
      difficulty: "advanced",
      type: "true-false",
      question: "In both AWS and GCP, a VPC is confined to a single region.",
      question_he: "גם ב-AWS וגם ב-GCP, VPC מוגבל ל-Region בודד.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Only half true, which is why it's false: an AWS VPC lives in one region (its subnets span Availability Zones within it), but a GCP VPC network is global, with regional subnets inside one worldwide network. The consequence is architectural: multi-region private connectivity requires inter-region VPC peering or Transit Gateway in AWS, while in GCP two VMs on opposite continents can already share a VPC. Azure sides with AWS here — VNets are regional.",
      explanation_he:
        "רק חצי נכון, ולכן זה לא נכון: VPC ב-AWS חי ב-Region אחד (ה-Subnet-ים שלו משתרעים על פני Availability Zone-ים בתוכו), אך רשת VPC ב-GCP היא גלובלית, עם Subnet-ים אזוריים בתוך רשת עולמית אחת. ההשלכה היא ארכיטקטונית: קישוריות פרטית רב-אזורית דורשת peering בין-אזורי של VPC או Transit Gateway ב-AWS, בעוד ב-GCP שתי מכונות וירטואליות ביבשות מנוגדות יכולות כבר לחלוק VPC. Azure עומד לצד AWS כאן — VNet-ים הם אזוריים.",
      resourceTitle: "VPC networks (GCP)",
      resourceUrl: "https://cloud.google.com/vpc/docs/vpc",
      keywords: ["vpc scope", "global network", "regional", "multi-region"],
      tooltipTerms: ["VPC", "Region"],
    },
    {
      id: "mix-idn-002",
      providers: ["azure", "aws"],
      domains: ["identity", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "An Azure VM uses a managed identity to reach Azure Storage without stored credentials. What is the equivalent AWS pattern for an EC2 instance accessing S3?",
      question_he: "מכונה וירטואלית ב-Azure משתמשת ב-Managed Identity כדי להגיע ל-Azure Storage ללא פרטי גישה מאוחסנים. מהו הדפוס המקביל ב-AWS עבור מופע EC2 שניגש ל-S3?",
      options: [
        "Storing an access key in the instance's environment variables",
        "Attaching an IAM role to the instance via an instance profile",
        "Creating an IAM user per instance",
        "Opening the S3 bucket to public access",
      ],
      options_he: [
        "אחסון access key במשתני הסביבה של המופע",
        "צירוף IAM role למופע דרך instance profile",
        "יצירת IAM user עבור כל מופע",
        "פתיחת ה-S3 bucket לגישה ציבורית",
      ],
      correctAnswer: 1,
      explanation:
        "The matching pattern is an IAM role delivered through an instance profile: the EC2 metadata service hands your code short-lived, auto-rotating credentials for whatever the role allows, exactly as Azure IMDS serves managed identity tokens. The other options recreate the problems this pattern eliminates — long-lived keys that leak (env vars, per-instance users) or no security at all (public bucket). Rule of thumb in any cloud: workloads get platform identities, never stored keys.",
      explanation_he:
        "הדפוס המתאים הוא IAM role שמסופק דרך instance profile: שירות ה-metadata של EC2 מעניק לקוד שלכם פרטי גישה קצרי-מועד ומתחלפים אוטומטית לפי מה שה-role מתיר, בדיוק כפי ש-Azure IMDS מגיש אסימוני Managed Identity. שאר האפשרויות משחזרות את הבעיות שהדפוס הזה מבטל — מפתחות קבועים שדולפים (משתני סביבה, משתמש לכל מופע) או היעדר אבטחה כלל (bucket ציבורי). כלל אצבע בכל ענן: עומסי עבודה מקבלים זהויות פלטפורמה, לעולם לא מפתחות מאוחסנים.",
      resourceTitle: "IAM roles for Amazon EC2",
      resourceUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html",
      keywords: ["managed identity", "instance profile", "credential-less", "equivalents"],
      tooltipTerms: ["Managed Identity", "IAM Role", "EC2", "S3"],
    },
    {
      id: "mix-sto-002",
      providers: ["azure", "aws", "gcp"],
      domains: ["storage"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which archive storage offerings require a restore/rehydration step before the data can be read? (Select all that apply.)",
      question_he: "אילו הצעות אחסון ארכיון דורשות שלב שחזור/הרטבה מחדש (rehydration) לפני שניתן לקרוא את הנתונים? (בחרו את כל התשובות הנכונות.)",
      options: [
        "Azure Blob Storage Archive tier",
        "Amazon S3 Glacier Deep Archive",
        "Google Cloud Storage Archive class",
      ],
      options_he: [
        "Azure Blob Storage Archive tier",
        "Amazon S3 Glacier Deep Archive",
        "Google Cloud Storage Archive class",
      ],
      correctAnswer: [0, 1],
      explanation:
        "Azure Archive and S3 Glacier Deep Archive are offline tiers: cheapest to store, but reading requires rehydration/restore measured in hours. GCP took a different design position — Archive-class objects stay online with millisecond reads, and the cost control comes from a 365-day minimum storage duration plus higher retrieval fees. Practical impact: a 'read the archived file now' requirement is an emergency procedure on Azure/AWS but a non-event on GCP; price that difference into any retention design.",
      explanation_he:
        "Archive של Azure ו-S3 Glacier Deep Archive הן מדרגות לא-מקוונות: הזולות ביותר לאחסון, אך קריאה דורשת הרטבה מחדש/שחזור הנמדדים בשעות. GCP נקטה עמדת עיצוב שונה — אובייקטים במחלקת Archive נשארים מקוונים עם קריאה תוך מילישניות, ובקרת העלות מגיעה ממשך אחסון מינימלי של 365 יום בתוספת עמלות אחזור גבוהות יותר. השפעה מעשית: דרישה של 'קרא את הקובץ המאורכב עכשיו' היא נוהל חירום ב-Azure/AWS אך אירוע שגרתי ב-GCP; יש לתמחר את ההבדל הזה בכל עיצוב שמירה.",
      resourceTitle: "Cloud Storage classes (GCP)",
      resourceUrl: "https://cloud.google.com/storage/docs/storage-classes",
      keywords: ["archive", "rehydration", "glacier", "retrieval latency", "comparison"],
      tooltipTerms: ["Archive Tier", "Blob Storage", "S3", "Cloud Storage"],
    },
  ],
});
