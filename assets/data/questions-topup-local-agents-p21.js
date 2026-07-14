/**
 * questions-topup-local-agents-p21.js — Phase 21 coverage top-up: Local
 * Agents (12 questions). Deepens thin difficulty slices. Registers
 * itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-local-agents-p21",
  label: "Local Agents — Phase 21 Top-up",
  questions: [
    {
      id: "p21-lag-001",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A local coding agent can run directly on the developer's host OS, inside a container, or inside a full VM. Which statement about this spectrum is correct?",
      question_he:
        "סוכן קוד מקומי (local agent) יכול לרוץ ישירות על מערכת ההפעלה של המפתח, בתוך container, או בתוך VM מלא. איזו קביעה לגבי הספקטרום הזה נכונה?",
      options: [
        "Running directly on the host gives the weakest isolation but the least overhead; a VM gives the strongest isolation but the most overhead",
        "Containers and VMs provide identical isolation guarantees, so the choice is purely about startup speed",
        "Running on the host is always safer because the agent has full visibility into the system",
        "Isolation strength does not matter for local agents since they never access the network",
      ],
      options_he: [
        "הרצה ישירות על ה-host נותנת את הבידוד החלש ביותר אך את התקורה הנמוכה ביותר; VM נותן את הבידוד החזק ביותר אך את התקורה הגבוהה ביותר",
        "containers ו-VMs מספקים אותן ערבויות בידוד בדיוק, ולכן הבחירה היא רק עניין של מהירות עלייה",
        "הרצה על ה-host תמיד בטוחה יותר כי לסוכן יש נראות מלאה למערכת",
        "חוזק הבידוד לא משנה עבור local agents כי הם אף פעם לא ניגשים לרשת",
      ],
      correctAnswer: 0,
      explanation:
        "The isolation spectrum trades safety for convenience: bare host execution shares the kernel and filesystem fully with the agent (fastest, weakest containment), containers add namespace/cgroup separation, and VMs add a separate kernel and hardware virtualization for the strongest containment at the highest resource cost. Choosing where on this spectrum to run an agent should depend on how much you trust its actions, not just performance.",
      explanation_he:
        "ספקטרום הבידוד מחליף בטיחות בנוחות: הרצה ישירות על ה-host חולקת את ה-kernel וה-filesystem במלואם עם הסוכן (הכי מהיר, הבידוד הכי חלש), containers מוסיפים הפרדת namespace/cgroup, ו-VMs מוסיפים kernel נפרד ווירטואליזציה של חומרה לבידוד החזק ביותר במחיר המשאבים הגבוה ביותר. הבחירה היכן על הספקטרום להריץ סוכן צריכה להתבסס על רמת האמון בפעולותיו, לא רק על ביצועים.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["isolation", "containers", "vm", "sandboxing"],
      tooltipTerms: ["Sandbox"],
    },
    {
      id: "p21-lag-002",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "A 'dry-run' or 'plan' mode, where a local agent shows what changes it would make without actually applying them, is the same thing as asking a human to review the change after it has already been executed.",
      question_he:
        "מצב 'dry-run' או 'plan', שבו local agent מציג אילו שינויים הוא היה מבצע מבלי לבצע אותם בפועל, הוא אותו דבר כמו לבקש מבן אדם לבדוק את השינוי אחרי שהוא כבר בוצע.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Dry-run/plan patterns (like `terraform plan`) compute and display the intended effect before anything is applied, so nothing irreversible has happened yet if the human objects. Reviewing after execution means any damage from a bad action must be manually undone, which may not always be possible (e.g., a sent email or a deleted file without backup). The two patterns look similar but sit at very different points in the risk timeline.",
      explanation_he:
        "דפוסי dry-run/plan (כמו `terraform plan`) מחשבים ומציגים את ההשפעה המיועדת לפני שדבר בוצע בפועל, כך שאם בן אדם מתנגד, שום דבר בלתי הפיך עדיין לא קרה. בדיקה אחרי הביצוע אומרת שכל נזק מפעולה שגויה צריך להיות מבוטל ידנית, וזה לא תמיד אפשרי (למשל אימייל שנשלח או קובץ שנמחק ללא גיבוי). שני הדפוסים נראים דומים אך נמצאים בנקודות שונות מאוד על ציר הסיכון.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["dry-run", "plan", "terraform"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "p21-lag-003",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Instead of letting a local agent reuse the developer's own full-privilege login session, a team issues the agent a short-lived token scoped only to the one repository it works on. What is the primary security benefit of this approach?",
      question_he:
        "במקום לתת ל-local agent להשתמש בסשן ההתחברות המלא-הרשאות של המפתח עצמו, צוות מנפיק לסוכן token קצר-טווח עם היקף מוגבל למאגר (repository) האחד שבו הוא עובד. מה היתרון האבטחתי העיקרי בגישה הזו?",
      options: [
        "If the token is leaked or misused, the damage is limited in both scope (one repo) and time (short expiry), unlike a full personal session",
        "Short-lived tokens run faster than long-lived sessions",
        "It removes the need for any authentication at all",
        "It guarantees the agent's code changes are automatically correct",
      ],
      options_he: [
        "אם ה-token דולף או מנוצל לרעה, הנזק מוגבל גם בהיקף (repo אחד) וגם בזמן (תפוגה קצרה), בניגוד לסשן אישי מלא",
        "tokens קצרי-טווח פועלים מהר יותר מסשנים ארוכי-טווח",
        "זה מסיר את הצורך באימות (authentication) כלשהו",
        "זה מבטיח ששינויי הקוד של הסוכן נכונים באופן אוטומטי",
      ],
      correctAnswer: 0,
      explanation:
        "Credential scoping applies least-privilege specifically to the credential itself: a narrowly scoped, short-lived token limits both what an attacker or a misbehaving agent could do and how long a compromised credential remains useful. Using the developer's full session instead would let a single leaked or misused agent credential act with all of that developer's permissions across every system, not just performance is unrelated to this benefit.",
      explanation_he:
        "היקוף credentials (credential scoping) מיישם least-privilege ספציפית על ה-credential עצמו: token עם היקף מצומצם וטווח קצר מגביל גם מה תוקף או סוכן שמתנהג לא כשורה יכולים לעשות וגם כמה זמן credential שנפרץ נשאר שימושי. שימוש בסשן המלא של המפתח היה מאפשר ל-credential בודד שדלף או נוצל לרעה לפעול עם כל ההרשאות של אותו מפתח בכל המערכות, וביצועים אינם קשורים ליתרון הזה.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["credential scoping", "token", "least privilege"],
      tooltipTerms: ["Least Privilege", "Secret"],
    },
    {
      id: "p21-lag-004",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A local agent is stuck in a loop, repeatedly re-reading a huge log file and re-invoking itself without making progress, consuming all available CPU and memory on the developer's laptop. What kind of problem does this illustrate?",
      question_he:
        "local agent תקוע בלולאה, קורא שוב ושוב קובץ log ענק וקורא לעצמו מחדש בלי להתקדם, וצורך את כל ה-CPU והזיכרון הזמינים על המחשב הנייד של המפתח. איזה סוג בעיה זה ממחיש?",
      options: [
        "A resource-exhaustion / availability problem, not necessarily a data confidentiality or integrity breach",
        "A guaranteed data exfiltration attack",
        "A credential leakage incident",
        "A supply-chain compromise of the agent's dependencies",
      ],
      options_he: [
        "בעיית מיצוי משאבים (resource exhaustion) / זמינות (availability), לא בהכרח פרצת סודיות או שלמות נתונים",
        "התקפת exfiltration ודאית של נתונים",
        "אירוע דליפת credentials",
        "פגיעה בשרשרת האספקה (supply chain) של תלויות הסוכן",
      ],
      correctAnswer: 0,
      explanation:
        "A runaway agent loop consuming unbounded CPU, memory, disk, or time is fundamentally an availability issue: it can make the machine unusable even though no secret was stolen and no file was tampered with. This is why local agents need resource limits (timeouts, memory caps, iteration limits) as a distinct safety control, separate from filesystem or network permission controls.",
      explanation_he:
        "לולאת סוכן שיוצאת משליטה וצורכת CPU, זיכרון, דיסק או זמן ללא הגבלה היא בעיקרה בעיית זמינות: היא יכולה להפוך את המכונה לבלתי שמישה גם אם אף סוד לא נגנב ואף קובץ לא שונה בזדון. לכן local agents זקוקים למגבלות משאבים (timeouts, תקרות זיכרון, מגבלות איטרציות) כפקד בטיחות נפרד מפקדי הרשאות filesystem או רשת.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["resource limits", "availability", "runaway loop"],
      tooltipTerms: ["Agent", "Sandbox"],
    },
    {
      id: "p21-lag-005",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team gives their local coding agent full filesystem access to the project folder but leaves outbound network access completely unrestricted. Why is this an incomplete security posture, even if file access is well controlled?",
      question_he:
        "צוות נותן ל-local coding agent שלו גישה מלאה למערכת הקבצים בתיקיית הפרויקט אך משאיר גישת רשת יוצאת (outbound) ללא הגבלה כלל. מדוע זו עמדת אבטחה חלקית, גם אם הגישה לקבצים מבוקרת היטב?",
      options: [
        "Unrestricted egress lets the agent (or anything it's tricked into running) exfiltrate data or fetch malicious payloads over the network, an entirely separate risk channel from file access",
        "Network access is irrelevant as long as file access is controlled, since agents cannot use the network to move data",
        "Outbound network calls are always slower than filesystem operations, so this only affects performance",
        "Egress control is only a concern for cloud-hosted agents, never for local ones",
      ],
      options_he: [
        "egress ללא הגבלה מאפשר לסוכן (או לכל דבר שהוא מרומה להריץ) להוציא נתונים (exfiltrate) או להביא payloads זדוניים דרך הרשת — ערוץ סיכון נפרד לגמרי מגישת קבצים",
        "גישת רשת לא רלוונטית כל עוד גישת הקבצים מבוקרת, כי סוכנים לא יכולים להשתמש ברשת כדי להעביר נתונים",
        "קריאות רשת יוצאות תמיד איטיות יותר מפעולות filesystem, אז זה משפיע רק על ביצועים",
        "בקרת egress רלוונטית רק לסוכנים המתארחים בענן, אף פעם לא לסוכנים מקומיים",
      ],
      correctAnswer: 0,
      explanation:
        "Filesystem sandboxing controls what the agent can read or write locally, but it says nothing about where data can go once read. If an agent (via a prompt injection, a compromised dependency, or a bug) can make arbitrary outbound connections, it can silently upload sensitive local files to an external server, making network egress control a distinct and necessary layer alongside file permissions.",
      explanation_he:
        "sandboxing של filesystem שולט במה שהסוכן יכול לקרוא או לכתוב באופן מקומי, אך לא אומר דבר על לאן הנתונים יכולים להגיע לאחר שנקראו. אם סוכן (דרך prompt injection, תלות שנפגעה, או באג) יכול לבצע חיבורים יוצאים שרירותיים, הוא יכול להעלות בשקט קבצים מקומיים רגישים לשרת חיצוני, מה שהופך את בקרת ה-egress ברשת לשכבה נפרדת והכרחית לצד הרשאות קבצים.",
      resourceTitle: "OWASP Top 10 for LLM Applications",
      resourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["network egress", "exfiltration", "sandboxing"],
      tooltipTerms: ["Sandbox", "Guardrails"],
    },
    {
      id: "p21-lag-006",
      providers: ["neutral"],
      domains: ["local-agents", "security"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following are genuine benefits of designing local agent actions to be easily undoable (e.g., committing to a feature branch instead of force-pushing to main)? (Select all that apply.)",
      question_he:
        "אילו מהבאים הם יתרונות אמיתיים בתכנון פעולות local agent כך שיהיו ניתנות לביטול בקלות (למשל commit לענף feature במקום force-push ל-main)? (בחר את כל התשובות הנכונות.)",
      options: [
        "A mistaken or overly aggressive agent action can be reversed without permanent loss",
        "It lowers the stakes of granting the agent more autonomy, since errors are recoverable",
        "It eliminates the need for the agent to have any file-write permissions at all",
        "It guarantees the agent will never produce an incorrect suggestion",
      ],
      options_he: [
        "פעולת סוכן שגויה או אגרסיבית מדי ניתנת לביטול ללא אובדן קבוע",
        "זה מוריד את הסיכון במתן לסוכן יותר אוטונומיה, מכיוון שטעויות ניתנות לשחזור",
        "זה מבטל את הצורך שיהיו לסוכן הרשאות כתיבת קבצים בכלל",
        "זה מבטיח שהסוכן לעולם לא יפיק הצעה שגויה",
      ],
      correctAnswer: [0, 1],
      explanation:
        "Reversibility is a risk-mitigation property, not a prevention property: it doesn't stop the agent from writing files or making mistakes, but it changes the consequences of those mistakes from permanent to recoverable, which is why teams often prefer git commits (undoable) over destructive operations like force-push or file deletion without backup (hard or impossible to undo). This lets teams grant more autonomy without accepting unbounded risk.",
      explanation_he:
        "יכולת ביטול (reversibility) היא תכונה של הפחתת סיכון, לא של מניעה: היא לא עוצרת את הסוכן מלכתוב קבצים או לטעות, אבל היא משנה את ההשלכות של הטעויות הללו מקבועות לניתנות-לשחזור, ולכן צוותים לרוב מעדיפים git commits (ניתנים לביטול) על פני פעולות הרסניות כמו force-push או מחיקת קובץ ללא גיבוי (קשה או בלתי אפשרי לבטל). זה מאפשר לצוותים להעניק יותר אוטונומיה בלי לקבל סיכון בלתי מוגבל.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["rollback", "undo", "reversibility", "git"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "p21-lag-007",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A local orchestrator agent spawns three specialized subagents locally, one of which has permission to run shell commands. Compared to a single local agent working alone, what new consideration does this orchestration pattern introduce?",
      question_he:
        "orchestrator agent מקומי מייצר שלושה subagents מתמחים באופן מקומי, כשלאחד מהם יש הרשאה להריץ פקודות shell. בהשוואה לסוכן מקומי בודד שעובד לבד, איזה שיקול חדש דפוס האורקסטרציה הזה מציג?",
      options: [
        "The overall trust and permission surface compounds: a mistake or compromise in one subagent's shell-executing capability can affect work coordinated by the others, so permissions need to be reasoned about across the whole group, not just per agent",
        "Nothing changes, because each subagent is fully isolated from the others by definition",
        "Multi-agent orchestration removes the need for sandboxing since agents check each other's work",
        "Only the orchestrator's permissions matter; subagent permissions are irrelevant",
      ],
      options_he: [
        "משטח האמון וההרשאות הכולל מצטבר: טעות או פריצה ביכולת הרצת ה-shell של subagent אחד יכולה להשפיע על עבודה שמתואמת על ידי האחרים, ולכן יש לחשוב על ההרשאות עבור הקבוצה כולה, לא רק לכל agent בנפרד",
        "שום דבר לא משתנה, כי כל subagent מבודד לחלוטין מהאחרים כברירת מחדל",
        "אורקסטרציה מרובת-agent מבטלת את הצורך ב-sandboxing כי הסוכנים בודקים זה את עבודתו של זה",
        "רק ההרשאות של ה-orchestrator חשובות; הרשאות ה-subagents לא רלוונטיות",
      ],
      correctAnswer: 0,
      explanation:
        "When agents coordinate locally, the effective permission surface is the union of what any participant can do, and a flaw or compromise anywhere in the chain (like a shell-capable subagent) can propagate into decisions or files the other agents rely on. This is a distinct risk from a single agent working alone, where the blast radius is limited to that one agent's own permissions.",
      explanation_he:
        "כאשר סוכנים מתואמים באופן מקומי, משטח ההרשאות האפקטיבי הוא איחוד של מה שכל משתתף יכול לעשות, ופגם או פריצה בכל מקום בשרשרת (כמו subagent בעל יכולת shell) יכולים להתפשט להחלטות או קבצים שהסוכנים האחרים מסתמכים עליהם. זה סיכון שונה מסוכן בודד שעובד לבד, שבו רדיוס הנזק מוגבל להרשאות של אותו agent בלבד.",
      resourceTitle: "Model Context Protocol Introduction",
      resourceUrl: "https://modelcontextprotocol.io/introduction",
      keywords: ["multi-agent", "orchestration", "subagent", "trust surface"],
      tooltipTerms: ["Subagent", "Agent", "Least Privilege"],
    },
    {
      id: "p21-lag-008",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "A local agent that says 'I recommend deleting these 40 unused files' and waits for the developer to run the delete command carries the same practical risk as a local agent that deletes the 40 files automatically and reports it afterward.",
      question_he:
        "local agent שאומר 'אני ממליץ למחוק את 40 הקבצים הלא בשימוש האלה' וממתין שהמפתח יריץ את פקודת המחיקה נושא את אותו סיכון מעשי כמו local agent שמוחק את 40 הקבצים באופן אוטומטי ומדווח על כך אחר כך.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "A recommendation preserves a human decision point before anything happens, so a wrong or hallucinated suggestion costs nothing beyond wasted time if the developer catches it. Automatic execution removes that checkpoint entirely, so an equally wrong suggestion becomes an actual, potentially irreversible action before anyone has a chance to catch the mistake. These are fundamentally different risk tiers even when the underlying suggestion is identical.",
      explanation_he:
        "המלצה שומרת על נקודת החלטה אנושית לפני שקורה משהו, כך שהצעה שגויה או הזויה עולה רק זמן מבוזבז אם המפתח תופס אותה. ביצוע אוטומטי מסיר את נקודת הבקרה הזו לגמרי, כך שהצעה שגויה באותה מידה הופכת לפעולה ממשית, שאולי בלתי הפיכה, לפני שלמישהו יש הזדמנות לתפוס את הטעות. אלה דרגות סיכון שונות מהותית גם כאשר ההצעה הבסיסית זהה.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["autonomy", "recommendation vs execution", "risk tier"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "p21-lag-009",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A team wants a local agent to be able to preview infrastructure changes safely before applying them, similar in spirit to `terraform plan`. Which design best captures the 'plan-then-apply' pattern for a general-purpose local coding agent?",
      question_he:
        "צוות רוצה שסוכן מקומי יוכל להציג תצוגה מקדימה בטוחה של שינויי תשתית לפני החלתם, ברוח דומה ל-`terraform plan`. איזה עיצוב לוכד בצורה הטובה ביותר את דפוס 'plan-then-apply' עבור סוכן קוד מקומי כללי?",
      options: [
        "The agent computes and displays a concrete diff of every intended change (files, commands, network calls) as a distinct step, and only proceeds to a separate 'apply' step after explicit confirmation",
        "The agent silently logs its actions to a file after executing them, which the developer can read later",
        "The agent asks a general yes/no question like 'may I continue?' before starting any work, without describing what it intends to do",
        "The agent runs the change twice, once for testing and once for production, and calls the first run the 'plan'",
      ],
      options_he: [
        "הסוכן מחשב ומציג diff קונקרטי של כל שינוי מיועד (קבצים, פקודות, קריאות רשת) כשלב נפרד, וממשיך לשלב 'apply' נפרד רק לאחר אישור מפורש",
        "הסוכן רושם בשקט את פעולותיו לקובץ אחרי ביצוען, שהמפתח יכול לקרוא מאוחר יותר",
        "הסוכן שואל שאלת כן/לא כללית כמו 'האם אפשר להמשיך?' לפני תחילת כל עבודה, בלי לתאר מה הוא מתכוון לעשות",
        "הסוכן מריץ את השינוי פעמיים, פעם לבדיקה ופעם לייצור, וקורא לריצה הראשונה 'plan'",
      ],
      correctAnswer: 0,
      explanation:
        "The defining feature of plan-then-apply is that the plan step is purely informational and side-effect-free: it must concretely enumerate what would change so the human can evaluate the actual impact, and execution is gated behind a separate, explicit confirmation. Logging after the fact provides no chance to prevent the action, and a vague yes/no prompt without specifics doesn't give the human enough information to meaningfully evaluate the risk.",
      explanation_he:
        "המאפיין המגדיר של plan-then-apply הוא ששלב ה-plan הוא אינפורמטיבי בלבד וללא תופעות לוואי: הוא חייב לפרט באופן קונקרטי מה ישתנה כדי שהאדם יוכל להעריך את ההשפעה בפועל, והביצוע מוגבל מאחורי אישור מפורש ונפרד. רישום לאחר מעשה לא נותן שום סיכוי למנוע את הפעולה, ושאלת כן/לא מעורפלת בלי פרטים לא נותנת לאדם מספיק מידע כדי להעריך את הסיכון בצורה משמעותית.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["plan-then-apply", "dry-run", "terraform plan"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "p21-lag-010",
      providers: ["neutral"],
      domains: ["local-agents", "security"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A local agent is granted a token scoped to read-write access on a single repository, with a 15-minute expiry, instead of the developer's full SSO session. Which of the following are correct implications of this scoping choice? (Select all that apply.)",
      question_he:
        "ל-local agent ניתן token עם היקף גישת קריאה-כתיבה למאגר בודד, עם תפוגה של 15 דקות, במקום סשן ה-SSO המלא של המפתח. אילו מהבאים הם השלכות נכונות של בחירת ההיקוף הזו? (בחר את כל התשובות הנכונות.)",
      options: [
        "If the token is captured by a malicious dependency or a compromised MCP server the agent talks to, the attacker's access is bounded to that one repo and expires quickly",
        "The developer's other repositories and cloud resources remain protected even if this token leaks",
        "The scoped token makes it unnecessary to ever rotate or revoke credentials",
        "This approach has zero operational cost compared to using the developer's session directly",
      ],
      options_he: [
        "אם ה-token נתפס על ידי תלות זדונית או MCP server שנפרץ שהסוכן מתקשר איתו, הגישה של התוקף מוגבלת למאגר האחד הזה ופגה במהירות",
        "המאגרים והמשאבים בענן האחרים של המפתח נשארים מוגנים גם אם ה-token הזה דולף",
        "ה-token המוגבל הופך רוטציה או ביטול של credentials ללא נחוצים בכלל",
        "לגישה הזו אין עלות תפעולית כלל בהשוואה לשימוש ישיר בסשן של המפתח",
      ],
      correctAnswer: [0, 1],
      explanation:
        "Narrow scoping and short expiry directly bound the blast radius of a leaked credential in both dimension (one repo) and time (minutes, not a full session lifetime), which is the core value of credential scoping for agents that talk to potentially untrusted tools like MCP servers or third-party dependencies. It does not eliminate the need for rotation/revocation as defense in depth, and issuing and refreshing scoped tokens does carry real operational overhead compared to reusing an existing session.",
      explanation_he:
        "היקוף מצומצם ותפוגה קצרה מגבילים ישירות את רדיוס הנזק של credential שדלף גם בממד (repo אחד) וגם בזמן (דקות, לא משך חיים של סשן מלא), וזה הערך המרכזי של credential scoping עבור סוכנים שמתקשרים עם כלים שאולי אינם מהימנים כמו MCP servers או תלויות צד-שלישי. זה לא מבטל את הצורך ברוטציה/ביטול כהגנה מעמיקה, והנפקה ורענון של tokens מוגבלים כרוכים בתקורה תפעולית אמיתית בהשוואה לשימוש חוזר בסשן קיים.",
      resourceTitle: "OWASP Top 10 for LLM Applications",
      resourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["credential scoping", "token expiry", "mcp server", "blast radius"],
      tooltipTerms: ["Least Privilege", "Secret", "MCP Server"],
    },
    {
      id: "p21-lag-011",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A local agent is given a hard wall-clock timeout, a memory cap, and a maximum iteration count for its reasoning loop. A developer argues these limits are 'just performance tuning' and unrelated to security. What is the flaw in that argument?",
      question_he:
        "ל-local agent ניתנים timeout קשיח לפי שעון קיר, תקרת זיכרון, ומספר מקסימלי של איטרציות ללולאת ההיגיון שלו. מפתח טוען שהמגבלות האלה הן 'רק כיוונון ביצועים' ולא קשורות לאבטחה. מה הפגם בטענה הזו?",
      options: [
        "Without such bounds, a malfunctioning or manipulated agent loop can consume all local resources indefinitely, denying the developer use of their own machine — an availability impact that is itself a core security property alongside confidentiality and integrity",
        "There is no flaw; resource limits genuinely have no connection to security in any context",
        "Resource limits only matter for cloud-hosted agents billed by compute time, never for local ones",
        "Memory caps prevent all forms of prompt injection, making them a security control for that reason alone",
      ],
      options_he: [
        "ללא מגבלות כאלה, לולאת סוכן שמתפקדת לא כשורה או מנוצלת לרעה יכולה לצרוך את כל המשאבים המקומיים ללא הגבלה, ולשלול מהמפתח שימוש במחשב שלו עצמו — פגיעה בזמינות שהיא בעצמה תכונת אבטחה מרכזית לצד סודיות ושלמות",
        "אין פגם; למגבלות משאבים אין באמת שום קשר לאבטחה בשום הקשר",
        "מגבלות משאבים חשובות רק לסוכנים המתארחים בענן שמחויבים לפי זמן חישוב, אף פעם לא לסוכנים מקומיים",
        "תקרות זיכרון מונעות את כל צורות ה-prompt injection, מה שהופך אותן לפקד אבטחה מסיבה זו בלבד",
      ],
      correctAnswer: 0,
      explanation:
        "Security is commonly framed around confidentiality, integrity, and availability (the CIA triad); a runaway local agent that exhausts CPU, memory, or time denies the developer availability of their own system, which is a genuine security impact even though no data was stolen or altered. Treating resource limits as 'only performance' misses that unbounded consumption is itself an attack or failure category, distinct from — but as important as — access-control style protections.",
      explanation_he:
        "אבטחה מוגדרת בדרך כלל סביב סודיות, שלמות וזמינות (משולש CIA); local agent שיוצא משליטה ומכלה CPU, זיכרון או זמן שולל מהמפתח זמינות של המערכת שלו עצמו, וזו פגיעה אבטחתית אמיתית גם אם שום נתון לא נגנב או שונה. התייחסות למגבלות משאבים כ'רק ביצועים' מפספסת שצריכה בלתי מוגבלת היא בעצמה קטגוריית תקיפה או כשל, נפרדת אך חשובה לא פחות מהגנות בסגנון בקרת גישה.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["resource limits", "availability", "cia triad"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "p21-lag-012",
      providers: ["neutral"],
      domains: ["local-agents"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A security-conscious team runs their local coding agent inside a lightweight container with a read-only mount for most of the filesystem, a writable mount only for the project's working directory, and a plan-then-apply step for any command involving `rm` or `git push --force`. Which statement best describes this design?",
      question_he:
        "צוות מודע לאבטחה מריץ את סוכן הקוד המקומי שלו בתוך container קליל עם mount לקריאה-בלבד לרוב מערכת הקבצים, mount לכתיבה רק לתיקיית העבודה של הפרויקט, ושלב plan-then-apply לכל פקודה שכוללת `rm` או `git push --force`. איזו קביעה מתארת בצורה הטובה ביותר את העיצוב הזה?",
      options: [
        "It layers multiple independent controls — environment isolation, filesystem write scoping, and a preview/confirm gate for irreversible commands — so that a failure in any single control doesn't automatically compromise the whole system",
        "It is redundant, since environment isolation alone already makes the other two controls unnecessary",
        "It is equivalent to giving the agent no permissions at all, since so many restrictions are layered together",
        "The plan-then-apply step for `rm` and `force push` is unnecessary because containerization already makes those commands reversible",
      ],
      options_he: [
        "זה משכב מספר פקדים עצמאיים — בידוד סביבה, היקוף כתיבת filesystem, ושער תצוגה-מקדימה/אישור לפקודות בלתי הפיכות — כך שכשל בפקד בודד לא בהכרח פוגע במערכת כולה",
        "זה מיותר, כי בידוד הסביבה לבדו כבר הופך את שני הפקדים האחרים ללא נחוצים",
        "זה שקול לאי-מתן שום הרשאות לסוכן, כי כל כך הרבה הגבלות מוערמות יחד",
        "שלב plan-then-apply עבור `rm` ו-force push מיותר כי containerization כבר הופך את הפקודות האלה לניתנות לביטול",
      ],
      correctAnswer: 0,
      explanation:
        "This is defense in depth: environment isolation limits what the container can reach on the host, filesystem write scoping limits what can be modified even within the container, and a plan-then-apply gate on destructive commands adds a human checkpoint specifically for actions that are hard or impossible to undo. Containerization does not make `rm` or a force-push reversible on its own — those still destroy data or history within the writable scope — so the extra gate for irreversible commands remains necessary even with strong isolation.",
      explanation_he:
        "זו הגנה בשכבות (defense in depth): בידוד הסביבה מגביל למה ה-container יכול להגיע במארח, היקוף כתיבת filesystem מגביל מה ניתן לשנות אפילו בתוך ה-container, ושער plan-then-apply על פקודות הרסניות מוסיף נקודת בקרה אנושית ספציפית לפעולות שקשה או בלתי אפשרי לבטל. containerization לא הופך `rm` או force-push לניתנים לביטול כשלעצמם — הם עדיין הורסים נתונים או היסטוריה בתוך ההיקף הניתן לכתיבה — כך שהשער הנוסף לפקודות בלתי הפיכות נשאר הכרחי גם עם בידוד חזק.",
      resourceTitle: "Claude Code Security",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/security",
      keywords: ["defense in depth", "isolation", "plan-then-apply", "rollback"],
      tooltipTerms: ["Sandbox", "Guardrails", "Least Privilege"],
    },
  ],
});
