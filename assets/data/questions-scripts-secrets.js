/**
 * questions-scripts-secrets.js — Quiz pack: Scripts & Secrets (22 questions).
 * Practical secret handling in local scripts, CLI tooling and CI/CD:
 * hard-coded credentials, .env hygiene, shell history and log exposure,
 * over-scoped keys, and rotation. Registers itself via CQA.data.registerPack().
 * Data only.
 */

CQA.data.registerPack({
  id: "scripts-and-secrets",
  label: "Scripts & Secrets",
  questions: [
    {
      id: "scs-001",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer writes `API_KEY = \"sk-EXAMPLE_NOT_REAL\"` directly at the top of a Python script so it 'just works' when shared with the team. What is the main problem with this approach?",
      options: [
        "The key becomes part of the source code, so it is committed to version control history and visible to anyone with repo access, forever, even if later deleted",
        "Python cannot parse string literals that start with 'sk-'",
        "It will make the script run slower than reading from an environment variable",
        "It only matters if the repository is public",
      ],
      correctAnswer: 0,
      explanation:
        "Once a secret lands in a commit, it stays in git history even after the line is removed in a later commit — anyone who ever cloned the repo, or who finds the old commit, still has it. The 'only matters if public' distractor is wrong because internal repos are read by many employees, contractors and CI systems, and internal breaches are common; private-repo access is not equivalent to secrecy.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["hard-coded secret", "git history", "source code"],
      tooltipTerms: ["Secret"],
      question_he:
        "מפתח/ת פיתוח כותב/ת `API_KEY = \"sk-EXAMPLE_NOT_REAL\"` ישירות בראש סקריפט ב-Python כדי שזה 'פשוט יעבוד' כשהסקריפט משותף לצוות. מה הבעיה המרכזית בגישה הזו?",
      options_he: [
        "ה-key הופך לחלק מקוד המקור, ולכן נשמר בהיסטוריית ה-version control וגלוי לכל מי שיש לו גישה ל-repo, לתמיד, גם אם השורה נמחקת בהמשך",
        "Python לא יכולה לפרש מחרוזות שמתחילות ב-'sk-'",
        "זה יגרום לסקריפט לרוץ לאט יותר מקריאה ממשתנה סביבה",
        "זה משנה רק אם ה-repository ציבורי",
      ],
      explanation_he:
        "ברגע ש-secret נכנס ל-commit, הוא נשאר בהיסטוריית ה-git גם אחרי שהשורה מוסרת ב-commit מאוחר יותר — כל מי ש-clone-פע את ה-repo פעם אחת, או מי שמוצא את ה-commit הישן, עדיין מחזיק בו. ה-distractor של 'משנה רק אם public' שגוי כי repos פנימיים נקראים על ידי עובדים, קבלנים ומערכות CI רבות, ופריצות פנימיות נפוצות; גישה ל-repo פרטי אינה שקולה לסודיות.",
    },
    {
      id: "scs-002",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Adding `.env` to `.gitignore` after it has already been committed once will fully remove it from the repository's history.",
      options: ["True", "False"],
      correctAnswer: false,
      explanation:
        "`.gitignore` only stops files from being tracked *going forward* — it has no effect on commits that already exist. The `.env` file (and every secret in it) remains readable in the git history and would need a history rewrite (and secret rotation) to actually remediate.",
      resourceTitle: "GitHub Docs: Removing sensitive data from a repository",
      resourceUrl: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository",
      keywords: [".env", "gitignore", "git history"],
      tooltipTerms: [".env File"],
      question_he:
        "הוספת `.env` ל-`.gitignore` אחרי שהוא כבר בוצע לו commit פעם אחת תסיר אותו לחלוטין מהיסטוריית ה-repository.",
      options_he: ["נכון", "לא נכון"],
      explanation_he:
        "`.gitignore` רק מונע מקבצים להיות tracked *מכאן ואילך* — אין לו השפעה על commits שכבר קיימים. קובץ ה-`.env` (וכל secret שבו) נשאר קריא בהיסטוריית ה-git, ויידרש שכתוב היסטוריה (וגם rotation לסודות) כדי לתקן את זה בפועל.",
    },
    {
      id: "scs-003",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "What is the purpose of committing a `.env.example` file alongside a `.gitignore`d `.env`?",
      options: [
        "It documents the required configuration keys with placeholder values, so teammates know what to set without ever committing real secrets",
        "It is a backup copy of the real `.env` in case the original is lost",
        "It lets the CI system read the real secrets from source control",
        "It replaces the need for a secret manager in production",
      ],
      correctAnswer: 0,
      explanation:
        "`.env.example` lists variable names like `DB_PASSWORD=changeme` so new contributors know what to configure locally, while the actual `.env` with real values stays untracked. It is documentation, not a secret store — production still needs a real secret manager or injected environment variables.",
      resourceTitle: "The Twelve-Factor App: Config",
      resourceUrl: "https://12factor.net/config",
      keywords: [".env.example", "configuration", "documentation"],
      tooltipTerms: [".env File"],
      question_he:
        "מה המטרה של commit לקובץ `.env.example` לצד `.env` שנמצא ב-`.gitignore`?",
      options_he: [
        "הוא מתעד את מפתחות ההגדרה הנדרשים עם ערכי placeholder, כך שחברי הצוות יודעים מה להגדיר מבלי לבצע אי פעם commit לסודות אמיתיים",
        "זהו עותק גיבוי של ה-`.env` האמיתי למקרה שהמקור אבד",
        "הוא מאפשר למערכת ה-CI לקרוא את הסודות האמיתיים ממקור הקוד",
        "הוא מייתר את הצורך במנהל secrets בסביבת production",
      ],
      explanation_he:
        "`.env.example` מפרט שמות משתנים כמו `DB_PASSWORD=changeme` כדי שתורמים חדשים ידעו מה להגדיר מקומית, בעוד ה-`.env` האמיתי עם ערכים אמיתיים נשאר untracked. זהו תיעוד, לא מאגר secrets — ל-production עדיין נדרש secret manager אמיתי או משתני סביבה שמוזרקים.",
    },
    {
      id: "scs-004",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A developer runs `curl -H \"Authorization: Bearer sk-EXAMPLE_NOT_REAL\" https://api.example.com` directly in their terminal to test an API. Besides being visible in the terminal output, where else does the key silently end up?",
      options: [
        "In the shell's history file (e.g. `~/.bash_history` or `~/.zsh_history`), which persists across sessions and is often backed up or synced",
        "Nowhere else — terminal output is the only place a command can be observed",
        "It is automatically encrypted by the shell before being stored anywhere",
        "Only in RAM, and is wiped the instant the command finishes",
      ],
      correctAnswer: 0,
      explanation:
        "Interactive shells log every command line to a history file by default, and that file is plain text, often synced to dotfile backups or dumped in support bundles. Command-line arguments can also briefly appear in process listings (`ps aux`) readable by other local users. Environment variables or piped/prompted stdin avoid the history-file exposure, though env vars are still visible via `/proc/<pid>/environ` to sufficiently privileged users.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet — Command line arguments",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["shell history", "command line", "process listing"],
      tooltipTerms: [],
      question_he:
        "מפתח/ת מריץ/ה `curl -H \"Authorization: Bearer sk-EXAMPLE_NOT_REAL\" https://api.example.com` ישירות בטרמינל כדי לבדוק API. חוץ מהיותו גלוי בפלט הטרמינל, איפה עוד ה-key מסתיים בשקט?",
      options_he: [
        "בקובץ ה-history של ה-shell (למשל `~/.bash_history` או `~/.zsh_history`), שנשמר בין sessions ולעיתים קרובות מגובה או מסונכרן",
        "בשום מקום נוסף — פלט הטרמינל הוא המקום היחיד שבו ניתן לצפות בפקודה",
        "הוא מוצפן אוטומטית על ידי ה-shell לפני שהוא נשמר בכל מקום",
        "רק ב-RAM, והוא נמחק ברגע שהפקודה מסתיימת",
      ],
      explanation_he:
        "shells אינטראקטיביים מתעדים כברירת מחדל כל שורת פקודה לקובץ history, וקובץ זה הוא טקסט רגיל, שלעיתים מסונכרן לגיבויי dotfiles או נכלל ב-support bundles. פרמטרים בשורת הפקודה יכולים גם להופיע לזמן קצר ב-process listing (`ps aux`) הקריא למשתמשים מקומיים אחרים. משתני סביבה או stdin (piped או prompted) נמנעים מחשיפת קובץ ה-history, אם כי משתני סביבה עדיין גלויים דרך `/proc/<pid>/environ` למשתמשים בעלי הרשאות מתאימות.",
    },
    {
      id: "scs-005",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following are realistic ways a secret can leak even when it is never hard-coded in source files? (Select all that apply.)",
      options: [
        "A debug logging statement prints the full request headers, including an Authorization header, to a log file",
        "A CI pipeline step runs `env` or `printenv` for debugging and the output is captured in the public build log",
        "The secret is stored only in a password-protected OS keychain entry",
        "A support engineer takes a screenshot of their terminal during a screen share, and an API key is visible in the prompt or output",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Logging frameworks and debug dumps routinely capture more than intended, and `env`/`printenv` output in CI logs is a classic accidental leak because build logs are often more widely readable than the secret itself. Screenshots and recordings during demos or support sessions are an underrated vector because the secret is exposed visually, bypassing any access controls on the underlying system. An OS keychain entry, by contrast, is designed specifically to keep the secret out of plaintext and access-controlled — it is a mitigation, not a leak.",
      resourceTitle: "GitHub Docs: Keeping secrets out of build logs",
      resourceUrl: "https://docs.github.com/en/actions/security-guides/encrypted-secrets",
      keywords: ["log exposure", "ci/cd", "screenshot leak"],
      tooltipTerms: [],
      question_he:
        "אילו מהבאים הן דרכים ריאליות ש-secret יכול לדלוף גם כאשר הוא אף פעם לא hard-coded בקבצי המקור? (בחר/י את כל האפשרויות הרלוונטיות.)",
      options_he: [
        "הצהרת debug logging מדפיסה את כל כותרות הבקשה, כולל כותרת Authorization, לקובץ log",
        "שלב ב-CI pipeline מריץ `env` או `printenv` לצורכי debugging והפלט נלכד ב-build log ציבורי",
        "ה-secret מאוחסן רק בערך keychain מוגן סיסמה במערכת ההפעלה",
        "מהנדס/ת תמיכה מצלם/ת screenshot של הטרמינל שלו/ה במהלך שיתוף מסך, ו-API key גלוי ב-prompt או בפלט",
      ],
      explanation_he:
        "מסגרות logging ו-debug dumps לוכדות באופן שגרתי יותר מהמתוכנן, ופלט `env`/`printenv` ב-build logs של CI הוא דליפה מקרית קלאסית כי build logs לרוב קריאים יותר מאשר ה-secret עצמו. צילומי מסך והקלטות במהלך demo או תמיכה הם וקטור שלא מוערך מספיק כי ה-secret נחשף ויזואלית, תוך עקיפת בקרות הגישה של המערכת שמתחת. לעומת זאת, ערך ב-keychain של מערכת ההפעלה מיועד בדיוק כדי לשמור את ה-secret מחוץ לטקסט רגיל ומוגן גישה — זו הפחתת סיכון, לא דליפה.",
    },
    {
      id: "scs-006",
      providers: ["neutral"],
      domains: ["scripts-secrets", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team uses a single admin-level API key for every internal script: deployment automation, a reporting dashboard, and a Slack bot. What is the main risk of this design?",
      options: [
        "If any one of those three integrations is compromised, the attacker gains the full admin-level access the key carries, not just access scoped to that integration",
        "Admin-level keys are always more expensive to use than scoped keys",
        "Sharing one key across scripts is fine as long as the key is stored in a secret manager",
        "It has no real downside as long as the key is rotated once a year",
      ],
      correctAnswer: 0,
      explanation:
        "A shared broad-scope key means the security of the weakest integration (often the least-monitored one, like a Slack bot) determines the blast radius for everything. Storing it in a secret manager helps against exposure but does nothing to limit what a legitimate-looking compromised caller can do once it has the key — that requires scoping, not just secure storage.",
      resourceTitle: "AWS Secrets Manager: Rotate secrets",
      resourceUrl: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
      keywords: ["least privilege", "key scoping", "blast radius"],
      tooltipTerms: ["Least Privilege"],
      question_he:
        "צוות משתמש ב-API key ברמת admin יחיד עבור כל הסקריפטים הפנימיים: אוטומציית deployment, לוח מחוונים לדיווח, ו-bot של Slack. מה הסיכון המרכזי בעיצוב הזה?",
      options_he: [
        "אם אחת משלוש האינטגרציות הללו נפרצת, התוקף/ת מקבל/ת את מלוא הגישה ברמת admin שה-key נושא, לא רק גישה מוגבלת לאינטגרציה ההיא",
        "מפתחות ברמת admin תמיד יקרים יותר לשימוש ממפתחות מוגבלי-scope",
        "שיתוף key אחד בין סקריפטים זה בסדר כל עוד ה-key מאוחסן ב-secret manager",
        "אין לזה חיסרון אמיתי כל עוד ה-key מתבצע לו rotation פעם בשנה",
      ],
      explanation_he:
        "key משותף עם scope רחב אומר שהאבטחה של האינטגרציה החלשה ביותר (לרוב זו שהכי פחות מנוטרת, כמו bot של Slack) קובעת את רדיוס הנזק לכל השאר. אחסון ב-secret manager עוזר נגד חשיפה אך לא עושה דבר כדי להגביל מה קורא שנראה לגיטימי ונפרץ יכול לעשות ברגע שיש לו את ה-key — זה דורש scoping, לא רק אחסון מאובטח.",
    },
    {
      id: "scs-007",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "true-false",
      question:
        "In a CI/CD platform where a shared secret is configured at the organization level, a workflow in an unrelated public repository under that same organization can, if scoping rules are misconfigured, potentially read or exfiltrate that secret.",
      options: ["True", "False"],
      correctAnswer: true,
      explanation:
        "Organization- or account-level secrets are, by design, available to any pipeline that is allowed to reference them; if repository or environment scoping is left broad (e.g. 'all repositories' instead of an explicit allowlist), a workflow in a lower-trust or public repo can read the secret, and a malicious pull request that modifies workflow files could exfiltrate it via a build log or outbound request. This is a well-documented supply-chain risk class, not a hypothetical edge case.",
      resourceTitle: "GitHub Docs: Encrypted secrets — access and scoping",
      resourceUrl: "https://docs.github.com/en/actions/security-guides/encrypted-secrets",
      keywords: ["ci/cd scoping", "org-level secrets", "supply chain"],
      tooltipTerms: [],
      question_he:
        "בפלטפורמת CI/CD שבה secret משותף מוגדר ברמת הארגון, workflow ב-repository ציבורי לא קשור תחת אותו ארגון יכול, אם כללי ה-scoping מוגדרים לא נכון, לקרוא או לחלץ את ה-secret הזה.",
      options_he: ["נכון", "לא נכון"],
      explanation_he:
        "secrets ברמת ארגון או חשבון זמינים, מטבע עיצובם, לכל pipeline שמורשה להתייחס אליהם; אם ה-scoping של repository או environment נשאר רחב (למשל 'כל ה-repositories' במקום allowlist מפורש), workflow ב-repo עם אמון נמוך יותר או ציבורי יכול לקרוא את ה-secret, ו-pull request זדוני שמשנה קבצי workflow יכול לחלץ אותו דרך build log או בקשה יוצאת. זו קטגוריית סיכון supply-chain מתועדת היטב, לא מקרה קצה היפותטי.",
    },
    {
      id: "scs-008",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A script needs a database password at runtime. Which approach best avoids writing the secret to disk in plaintext?",
      options: [
        "Read the password from an environment variable or a secret manager API call at runtime, rather than storing it in a config file",
        "Store the password in a config file with restrictive file permissions like `chmod 600`",
        "Base64-encode the password and store the encoded string in the config file",
        "Store the password in a comment in the script so it is easy to find later",
      ],
      correctAnswer: 0,
      explanation:
        "Reading at runtime from an environment variable or secret manager means the value never rests as plaintext on disk in a project file. Restrictive file permissions reduce, but do not eliminate, exposure risk (backups, misconfigured permissions, other processes running as the same user), and base64 is encoding, not encryption — it is trivially reversible and provides no real protection.",
      resourceTitle: "Google Cloud Secret Manager overview",
      resourceUrl: "https://cloud.google.com/secret-manager/docs/overview",
      keywords: ["runtime secrets", "environment variable", "plaintext config"],
      tooltipTerms: [".env File"],
      question_he:
        "סקריפט זקוק לסיסמת מסד נתונים בזמן ריצה. איזו גישה הכי טובה מונעת כתיבת ה-secret לדיסק כטקסט רגיל?",
      options_he: [
        "לקרוא את הסיסמה ממשתנה סביבה או מקריאת API של secret manager בזמן ריצה, במקום לאחסן אותה בקובץ config",
        "לאחסן את הסיסמה בקובץ config עם הרשאות קובץ מגבילות כמו `chmod 600`",
        "לקודד את הסיסמה ב-base64 ולאחסן את המחרוזת המקודדת בקובץ config",
        "לאחסן את הסיסמה בהערה בסקריפט כדי שיהיה קל למצוא אותה מאוחר יותר",
      ],
      explanation_he:
        "קריאה בזמן ריצה ממשתנה סביבה או secret manager אומרת שהערך לעולם לא נח כטקסט רגיל על הדיסק בקובץ פרויקט. הרשאות קובץ מגבילות מפחיתות, אך לא מבטלות, את סיכון החשיפה (גיבויים, הרשאות שהוגדרו לא נכון, תהליכים אחרים שרצים כאותו משתמש), ו-base64 הוא קידוד, לא הצפנה — הוא הפיך בקלות ולא מספק הגנה אמיתית.",
    },
    {
      id: "scs-009",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A company's incident response policy says API keys must be rotated 'immediately' after any suspected exposure. In practice, why is this often painful for teams whose secrets are hard-coded across many scripts?",
      options: [
        "Because every place the key is hard-coded must be found and updated individually, and any missed occurrence means the old key is still trusted somewhere",
        "Because rotating a key always requires downtime for the entire company",
        "Because secret managers do not support rotation at all",
        "Because rotation is only a compliance formality with no real security benefit",
      ],
      correctAnswer: 0,
      explanation:
        "When a secret is duplicated across many scripts, config files, and CI variables, rotation means hunting down every copy — a manual, error-prone process where one missed file leaves an active credential live and unmonitored. A centralized secret manager reference (fetching the current value at runtime) makes rotation a single update at the source instead of an environment-wide search.",
      resourceTitle: "Azure Key Vault: About keys, secrets, and certificates",
      resourceUrl: "https://learn.microsoft.com/azure/key-vault/general/about-keys-secrets-certificates",
      keywords: ["rotation", "hard-coded secrets", "secret manager"],
      tooltipTerms: ["Key Vault"],
      question_he:
        "מדיניות תגובה לאירועים של חברה קובעת ש-API keys חייבים לעבור rotation 'מיידית' לאחר חשד לחשיפה. בפועל, מדוע זה לרוב כואב לצוותים שה-secrets שלהם hard-coded בסקריפטים רבים?",
      options_he: [
        "כי כל מקום שבו ה-key מוטמע hard-coded חייב להימצא ולעדכן בנפרד, וכל מופע שמוחמץ אומר שה-key הישן עדיין נחשב מהימן איפשהו",
        "כי rotation תמיד דורש downtime לכל החברה",
        "כי secret managers לא תומכים ב-rotation בכלל",
        "כי rotation היא רק פורמליות של compliance ללא תועלת אבטחתית אמיתית",
      ],
      explanation_he:
        "כאשר secret משוכפל בסקריפטים, קבצי config ומשתני CI רבים, rotation אומר איתור כל עותק — תהליך ידני ורגיש לטעויות שבו קובץ אחד שמוחמץ משאיר credential פעיל ובלתי מנוטר. הפניה ל-secret manager מרכזי (שליפת הערך הנוכחי בזמן ריצה) הופכת את ה-rotation לעדכון בודד במקור במקום חיפוש ברחבי כל הסביבה.",
    },
    {
      id: "scs-010",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A GitHub Actions workflow step runs `echo \"Debug: DB_PASSWORD=$DB_PASSWORD\"` to help troubleshoot a failing deployment. The repository has secret scanning enabled. What is the most accurate outcome?",
      options: [
        "Secret scanning on the repository's source files will not catch this, because the exposure happens in the build log output, not in a committed file — build logs need separate protections",
        "Secret scanning automatically redacts any value printed by `echo` in a workflow run",
        "This is safe because GitHub Actions logs are private by default and never viewable by anyone",
        "Secret scanning would block the workflow from running at all",
      ],
      correctAnswer: 0,
      explanation:
        "Repository secret scanning inspects committed code and history for credential-shaped strings; it does not inspect live log output. Some CI platforms do mask registered secret values in logs automatically, but only for secrets registered as such in the platform's secret store — a value pulled into a plain environment variable and echoed manually may not be masked, and log visibility depends on repository/workflow permission settings, which are not always as private as assumed.",
      resourceTitle: "GitHub Docs: About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      keywords: ["secret scanning", "build logs", "masking"],
      tooltipTerms: ["Secret Scanning"],
      question_he:
        "שלב ב-GitHub Actions workflow מריץ `echo \"Debug: DB_PASSWORD=$DB_PASSWORD\"` כדי לסייע בפתרון תקלת deployment. ל-repository מופעל secret scanning. מה התוצאה המדויקת ביותר?",
      options_he: [
        "secret scanning על קבצי המקור של ה-repository לא יתפוס את זה, כי החשיפה מתרחשת בפלט ה-build log, לא בקובץ שעבר commit — build logs דורשים הגנות נפרדות",
        "secret scanning מבצע redact אוטומטי לכל ערך שמודפס על ידי `echo` ב-workflow run",
        "זה בטוח כי logs של GitHub Actions הם פרטיים כברירת מחדל ואף פעם לא נצפים על ידי אף אחד",
        "secret scanning היה חוסם את ה-workflow מלרוץ בכלל",
      ],
      explanation_he:
        "secret scanning על ה-repository בודק קוד ו-history שעברו commit לחיפוש מחרוזות בצורת credential; הוא לא בודק פלט log חי. חלק מפלטפורמות CI כן מבצעות מסכה אוטומטית לערכי secrets רשומים ב-logs, אך רק עבור secrets שנרשמו ככאלה במאגר ה-secrets של הפלטפורמה — ערך שנשלף למשתנה סביבה רגיל ומודפס ידנית עשוי לא להיות ממוסך, וגישת הצפייה ב-log תלויה בהגדרות הרשאות ה-repository/workflow, שלא תמיד פרטיות כמו שמניחים.",
    },
    {
      id: "scs-011",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Environment variables are inherently invisible to every other process running on the same machine.",
      options: ["True", "False"],
      correctAnswer: false,
      explanation:
        "Environment variables of a process are commonly readable by a sufficiently privileged user or process on the same host, for example via `/proc/<pid>/environ` on Linux, or by a debugger attaching to the process. They are safer than hard-coding secrets in source or passing them as visible command-line arguments, but 'invisible to everyone' overstates the protection.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["environment variable", "process isolation"],
      tooltipTerms: [],
      question_he:
        "משתני סביבה הם באופן מובנה בלתי נראים לכל תהליך אחר שרץ על אותה מכונה.",
      options_he: ["נכון", "לא נכון"],
      explanation_he:
        "משתני הסביבה של תהליך לרוב ניתנים לקריאה על ידי משתמש או תהליך בעל הרשאות מספקות באותו host, לדוגמה דרך `/proc/<pid>/environ` ב-Linux, או על ידי debugger שמתחבר לתהליך. הם בטוחים יותר מ-hard-coding של secrets בקוד המקור או העברתם כפרמטרים גלויים בשורת הפקודה, אך 'בלתי נראה לכולם' מגזים בהגנה בפועל.",
    },
    {
      id: "scs-012",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A script needs to prompt for a database password interactively instead of accepting it as a command-line flag. Which approach best avoids leaving the password in shell history and process listings?",
      options: [
        "Use a library call that reads from stdin without echoing input to the terminal (like Python's `getpass`) and never pass it as a CLI argument",
        "Accept it as `--password=<value>` since command-line flags are cleared automatically after the script finishes",
        "Pipe the password through `echo` into the script's stdin",
        "Store the password as a default value in the script's argument parser",
      ],
      correctAnswer: 0,
      explanation:
        "A non-echoing prompt (`getpass`-style) never appears as a command-line argument, so it is absent from both shell history and `ps` process listings. `--password=value` is exactly the pattern that leaks into history and process listings; piping via `echo` just relocates the plaintext value into a different command that itself gets logged.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet — Command line arguments",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["stdin", "getpass", "shell history"],
      tooltipTerms: [],
      question_he:
        "סקריפט צריך לבקש סיסמת מסד נתונים באופן אינטראקטיבי במקום לקבל אותה כדגל בשורת הפקודה. איזו גישה הכי טובה מונעת השארת הסיסמה ב-shell history וב-process listings?",
      options_he: [
        "להשתמש בקריאת ספרייה שקוראת מ-stdin בלי להציג את הקלט על המסך (כמו `getpass` ב-Python) ולעולם לא להעביר אותה כפרמטר CLI",
        "לקבל אותה כ-`--password=<value>` כי דגלי שורת פקודה נמחקים אוטומטית אחרי סיום הסקריפט",
        "להעביר את הסיסמה דרך `echo` ל-stdin של הסקריפט",
        "לאחסן את הסיסמה כערך ברירת מחדל ב-argument parser של הסקריפט",
      ],
      explanation_he:
        "prompt שלא מציג קלט (בסגנון `getpass`) לעולם לא מופיע כפרמטר בשורת הפקודה, ולכן נעדר גם מ-shell history וגם מ-process listings של `ps`. `--password=value` הוא בדיוק הדפוס שדולף ל-history ו-process listings; העברה דרך `echo` פשוט מעבירה את הערך הגלוי לפקודה אחרת שגם היא נרשמת ב-log.",
    },
    {
      id: "scs-013",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team wants to reduce the blast radius if a CI/CD pipeline secret is ever leaked. Which of the following changes genuinely help? (Select all that apply.)",
      options: [
        "Scope each secret narrowly to the specific job or environment that needs it, instead of exposing it to the entire pipeline",
        "Use short-lived, automatically expiring credentials (e.g. via OIDC federation to the cloud provider) instead of long-lived static keys",
        "Rename the secret's environment variable to something less obvious, like `X1` instead of `DB_PASSWORD`",
        "Grant the CI service account only the specific permissions its jobs require, rather than a broad administrator role",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Narrow job/environment scoping, short-lived federated credentials, and least-privilege service accounts all limit what a leaked credential can actually do or how long it remains valid. Renaming a variable is security through obscurity — it does not change the credential's actual power and does nothing against an attacker who has already captured the value itself.",
      resourceTitle: "AWS Secrets Manager documentation",
      resourceUrl: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
      keywords: ["oidc", "least privilege", "blast radius", "ci/cd"],
      tooltipTerms: ["Least Privilege", "Service Account"],
      question_he:
        "צוות רוצה להקטין את רדיוס הנזק אם secret של CI/CD pipeline אי פעם דולף. אילו מהשינויים הבאים באמת עוזרים? (בחר/י את כל האפשרויות הרלוונטיות.)",
      options_he: [
        "להגביל scope של כל secret באופן צר ל-job או environment הספציפי שזקוק לו, במקום לחשוף אותו לכל ה-pipeline",
        "להשתמש ב-credentials קצרי-חיים שפגים אוטומטית (למשל דרך OIDC federation לספק הענן) במקום מפתחות סטטיים ארוכי-חיים",
        "לשנות את שם משתנה הסביבה של ה-secret לשם פחות ברור, כמו `X1` במקום `DB_PASSWORD`",
        "להעניק ל-service account של ה-CI רק את ההרשאות הספציפיות ש-jobs שלו דורשים, במקום תפקיד admin רחב",
      ],
      explanation_he:
        "scoping צר ברמת job/environment, credentials federated קצרי-חיים, ו-service accounts עם least-privilege כולם מגבילים מה credential שדלף באמת יכול לעשות או כמה זמן הוא נשאר תקף. שינוי שם משתנה הוא security through obscurity — הוא לא משנה את העוצמה האמיתית של ה-credential ולא עוזר נגד תוקף/ת שכבר לכד/ה את הערך עצמו.",
    },
    {
      id: "scs-014",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "During a live coding demo, a presenter's terminal briefly shows a real production API key while running a script. What is the most appropriate immediate response afterward?",
      options: [
        "Treat the key as compromised and rotate it, since it was exposed to anyone watching, recording, or later viewing the recording",
        "No action is needed if the demo audience seemed trustworthy",
        "Only rotate the key if someone in the audience explicitly says they wrote it down",
        "Blur the recording after the fact and consider the exposure resolved",
      ],
      correctAnswer: 0,
      explanation:
        "Once a secret is visible to an audience or captured in a recording, you can't know who paused, screenshotted, or has ongoing access to the video — the safe assumption is that it's exposed and must be rotated. Blurring a recording after the fact doesn't undo the fact that live viewers already saw it, and 'seemed trustworthy' isn't a security control.",
      resourceTitle: "Azure Key Vault: About keys, secrets, and certificates",
      resourceUrl: "https://learn.microsoft.com/azure/key-vault/general/about-keys-secrets-certificates",
      keywords: ["rotation", "screenshare exposure", "incident response"],
      tooltipTerms: ["Secret"],
      question_he:
        "במהלך demo קידוד חי, הטרמינל של המציג/ה מציג לרגע API key אמיתי של production בזמן הרצת סקריפט. מה התגובה המיידית הנכונה ביותר לאחר מכן?",
      options_he: [
        "להתייחס ל-key כאילו נפרץ ולבצע לו rotation, מכיוון שהוא נחשף לכל מי שצפה, הקליט, או צפה מאוחר יותר בהקלטה",
        "אין צורך בפעולה אם קהל ה-demo נראה אמין",
        "לבצע rotation ל-key רק אם מישהו בקהל אומר במפורש שרשם אותו",
        "לטשטש את ההקלטה בדיעבד ולהחשיב את החשיפה כפתורה",
      ],
      explanation_he:
        "ברגע ש-secret נראה לקהל או נלכד בהקלטה, אי אפשר לדעת מי עצר, צילם מסך, או שיש לו גישה מתמשכת לוידאו — ההנחה הבטוחה היא שהוא נחשף וחייב rotation. טשטוש הקלטה בדיעבד לא מבטל את העובדה שצופים חיים כבר ראו אותו, ו'נראה אמין' אינה בקרת אבטחה.",
    },
    {
      id: "scs-015",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A pre-commit hook is configured to run a secret-scanning tool before every commit is accepted locally. What is the main benefit of catching secrets at this stage, compared to relying only on server-side secret scanning after push?",
      options: [
        "It stops the secret from ever entering the repository's history in the first place, avoiding the need for history rewrites and rotation after the fact",
        "It replaces the need for any server-side scanning entirely",
        "It automatically encrypts any secret it detects instead of blocking the commit",
        "It only works for secrets already known to be compromised",
      ],
      correctAnswer: 0,
      explanation:
        "Catching a secret before the commit is created means it never becomes part of git history at all, so there's no history to scrub and often no need to rotate anything (since it never left the developer's machine). Server-side scanning after push is still valuable as a safety net for cases where the hook is skipped or not installed, but it means the secret has already entered history and typically still requires rotation and a history rewrite.",
      resourceTitle: "GitHub Docs: About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      keywords: ["pre-commit hook", "secret scanning", "prevention"],
      tooltipTerms: ["Pre-commit Hook", "Secret Scanning"],
      question_he:
        "hook מסוג pre-commit מוגדר להריץ כלי secret-scanning לפני שכל commit מתקבל מקומית. מה היתרון המרכזי בתפיסת secrets בשלב הזה, בהשוואה להסתמכות רק על secret scanning בצד השרת לאחר push?",
      options_he: [
        "הוא מונע מה-secret להיכנס בכלל להיסטוריית ה-repository, ובכך נחסך הצורך בשכתוב היסטוריה ו-rotation בדיעבד",
        "הוא מייתר לחלוטין את הצורך בסריקה בצד השרת",
        "הוא מצפין אוטומטית כל secret שהוא מזהה במקום לחסום את ה-commit",
        "הוא עובד רק עבור secrets שכבר ידועים כפרוצים",
      ],
      explanation_he:
        "תפיסת secret לפני יצירת ה-commit אומרת שהוא לעולם לא הופך לחלק מהיסטוריית ה-git, כך שאין היסטוריה לנקות ולעיתים קרובות אין צורך ב-rotation (מכיוון שהוא מעולם לא יצא ממחשב המפתח/ת). סריקה בצד שרת לאחר push עדיין בעלת ערך כרשת ביטחון למקרים שבהם ה-hook דולג או לא מותקן, אך היא אומרת שה-secret כבר נכנס להיסטוריה ולרוב עדיין דורש rotation ושכתוב היסטוריה.",
    },
    {
      id: "scs-016",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A CI pipeline job for a public open-source repository runs on pull requests from external forks, and a maintainer's secret is exposed as an environment variable to that job. What is the specific risk here that scoped secrets policies are designed to prevent?",
      options: [
        "An external contributor could open a pull request that modifies the workflow file itself to print or exfiltrate the secret, since fork PRs run attacker-controlled code",
        "External forks cannot trigger CI jobs at all, so there is no risk",
        "The risk only exists if the fork's owner is a known malicious actor",
        "Secrets exposed to fork-triggered jobs are automatically read-only and cannot be exfiltrated",
      ],
      correctAnswer: 0,
      explanation:
        "Fork-based pull requests can include changes to the workflow definition itself, meaning the PR author effectively controls what code runs in that job — if secrets are exposed there, a malicious PR can add a step that echoes or sends the secret externally, no special privileges needed beyond opening a PR. This is why platforms restrict or require approval for secrets on fork-triggered workflows by default; the risk exists regardless of whether the specific contributor is known to be malicious, since anyone can open a PR.",
      resourceTitle: "GitHub Docs: Secrets and fork pull requests",
      resourceUrl: "https://docs.github.com/en/actions/security-guides/encrypted-secrets",
      keywords: ["fork pull requests", "ci/cd", "supply chain"],
      tooltipTerms: [],
      question_he:
        "job ב-CI pipeline עבור repository open-source ציבורי רץ על pull requests מ-forks חיצוניים, ו-secret של מתחזק/ת נחשף כמשתנה סביבה ל-job הזה. מה הסיכון הספציפי שמדיניות secrets מוגבלת scope נועדה למנוע?",
      options_he: [
        "תורם/ת חיצוני/ת יכול/ה לפתוח pull request ששונה את קובץ ה-workflow עצמו כדי להדפיס או לחלץ את ה-secret, מכיוון ש-fork PRs מריצים קוד שנשלט על ידי התוקף/ת",
        "forks חיצוניים לא יכולים להפעיל jobs של CI בכלל, אז אין סיכון",
        "הסיכון קיים רק אם הבעלים של ה-fork ידוע/ה כגורם זדוני",
        "secrets שנחשפים ל-jobs שהופעלו על ידי fork הם אוטומטית read-only ולא ניתנים לחילוץ",
      ],
      explanation_he:
        "pull requests מבוססי fork יכולים לכלול שינויים להגדרת ה-workflow עצמה, כלומר מחבר/ת ה-PR שולט/ת בפועל במה שרץ ב-job ההוא — אם secrets נחשפים שם, PR זדוני יכול להוסיף שלב שמדפיס או שולח את ה-secret החוצה, בלי צורך בהרשאות מיוחדות מעבר לפתיחת PR. זו הסיבה שפלטפורמות מגבילות או דורשות אישור עבור secrets ב-workflows שמופעלים על ידי fork כברירת מחדל; הסיכון קיים ללא תלות אם התורם/ת הספציפי/ת ידוע/ה כזדוני/ת, מכיוון שכל אחד יכול לפתוח PR.",
    },
    {
      id: "scs-017",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multi-select",
      question:
        "Which of the following are appropriate places to store a database password used by a local development script? (Select all that apply.)",
      options: [
        "An OS-level keychain or credential manager accessed via an API call",
        "A `.env` file that is listed in `.gitignore` and never committed",
        "A dedicated secret manager service, referenced at runtime",
        "A plaintext `credentials.txt` file sitting in the project's home directory with no access restrictions",
      ],
      correctAnswer: [0, 1, 2],
      explanation:
        "An OS keychain, a properly git-ignored `.env`, and a secret manager all keep the value out of version control and, in the case of the keychain and secret manager, out of unencrypted disk storage too. A plaintext credentials file with no access restrictions is exactly the anti-pattern being avoided — readable by any process or user with filesystem access and easy to accidentally back up, sync, or commit.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["secret storage", "keychain", ".env"],
      tooltipTerms: [".env File", "Secret"],
      question_he:
        "אילו מהבאים הם מקומות מתאימים לאחסון סיסמת מסד נתונים שמשמשת סקריפט פיתוח מקומי? (בחר/י את כל האפשרויות הרלוונטיות.)",
      options_he: [
        "keychain ברמת מערכת ההפעלה או מנהל credentials שנגיש דרך קריאת API",
        "קובץ `.env` שרשום ב-`.gitignore` ואף פעם לא מבוצע לו commit",
        "שירות secret manager ייעודי, שמופנה אליו בזמן ריצה",
        "קובץ `credentials.txt` בטקסט רגיל שיושב בתיקיית הבית של הפרויקט ללא הגבלות גישה",
      ],
      explanation_he:
        "keychain של מערכת ההפעלה, `.env` שמוגדר כראוי ב-gitignore, ו-secret manager כולם שומרים את הערך מחוץ ל-version control, ובמקרה של keychain ו-secret manager גם מחוץ לאחסון דיסק לא מוצפן. קובץ credentials בטקסט רגיל ללא הגבלות גישה הוא בדיוק ה-anti-pattern שרוצים להימנע ממנו — קריא לכל תהליך או משתמש עם גישת filesystem וקל בטעות לגבות, לסנכרן, או לבצע לו commit.",
    },
    {
      id: "scs-018",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Storing a secret in a cloud provider's dedicated secret manager (such as AWS Secrets Manager, Azure Key Vault, or Google Secret Manager) instead of a scoped narrow-purpose key still leaves risk if the retrieving application or script itself is compromised.",
      options: ["True", "False"],
      correctAnswer: true,
      explanation:
        "A secret manager protects the secret at rest and in transit, and can centralize rotation and auditing, but once an authorized script or process retrieves the plaintext value into memory to use it, a compromise of that process (e.g. via a dependency vulnerability) still exposes the secret. Secret managers reduce exposure surface, they don't eliminate the risk that comes from the consuming application itself being compromised — that's a separate concern addressed by scoping, monitoring, and runtime security.",
      resourceTitle: "Google Cloud Secret Manager overview",
      resourceUrl: "https://cloud.google.com/secret-manager/docs/overview",
      keywords: ["secret manager", "runtime compromise", "defense in depth"],
      tooltipTerms: ["KMS"],
      question_he:
        "אחסון secret ב-secret manager ייעודי של ספק ענן (כמו AWS Secrets Manager, Azure Key Vault, או Google Secret Manager) במקום key מוגבל-scope וממוקד-מטרה עדיין משאיר סיכון אם האפליקציה או הסקריפט השולפים עצמם נפרצים.",
      options_he: ["נכון", "לא נכון"],
      explanation_he:
        "secret manager מגן על ה-secret in rest ו-in transit, ויכול לרכז rotation ו-auditing, אך ברגע שסקריפט או תהליך מורשה שולף את הערך בטקסט רגיל לזיכרון כדי להשתמש בו, פריצה לתהליך ההוא (למשל דרך פגיעות בתלות) עדיין חושפת את ה-secret. secret managers מקטינים את משטח החשיפה, אך לא מבטלים את הסיכון שנובע מפריצה לאפליקציה הצורכת עצמה — זו סוגיה נפרדת שמטופלת על ידי scoping, ניטור, ואבטחת runtime.",
    },
    {
      id: "scs-019",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A developer accidentally commits a real API key, then within two minutes force-pushes a new commit that removes it, before anyone else pulls the branch. Why is 'immediately rotate the key' still the correct next step, rather than considering the fast fix sufficient?",
      options: [
        "Automated systems (bots, scanning services, mirrors) can clone and index a public or shared repository within seconds of a push, faster than a human can react, so the key should be treated as seen regardless of how quickly it was removed",
        "Force-pushing a new commit cryptographically guarantees the old commit's data is destroyed everywhere",
        "It isn't necessary, since the key was only visible for two minutes",
        "Rotation is only needed if the repository is public, not for private or internal repos",
      ],
      correctAnswer: 0,
      explanation:
        "Public (and even many internal) repositories are continuously crawled by automated secret-scanning bots and mirroring services that can capture a commit within seconds — a two-minute window is not a safe margin. Force-pushing rewrites the branch reference but does not guarantee the old commit object is unreachable or unindexed elsewhere (caches, forks, already-cloned copies, third-party scanners); the only reliable remediation is to treat the key as compromised and rotate it.",
      resourceTitle: "GitHub Docs: About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      keywords: ["rotation", "force-push", "exposure window"],
      tooltipTerms: ["Secret Scanning"],
      question_he:
        "מפתח/ת מבצע/ת בטעות commit ל-API key אמיתי, ואז תוך שתי דקות מבצע/ת force-push ל-commit חדש שמסיר אותו, לפני שמישהו אחר מושך את ה-branch. מדוע 'לבצע rotation מיידי ל-key' עדיין הצעד הנכון הבא, במקום להחשיב את התיקון המהיר כמספיק?",
      options_he: [
        "מערכות אוטומטיות (bots, שירותי סריקה, mirrors) יכולות לבצע clone ולאנדקס repository ציבורי או משותף תוך שניות מ-push, מהר יותר ממה שבן אדם יכול להגיב, כך שיש להתייחס ל-key כאילו נראה ללא תלות בכמה מהר הוא הוסר",
        "force-push של commit חדש מבטיח קריפטוגרפית שהנתונים של ה-commit הישן נהרסים בכל מקום",
        "זה לא הכרחי, מכיוון שה-key היה גלוי רק שתי דקות",
        "rotation נחוץ רק אם ה-repository ציבורי, ולא עבור repos פרטיים או פנימיים",
      ],
      explanation_he:
        "repositories ציבוריים (וגם רבים פנימיים) נסרקים ברציפות על ידי bots אוטומטיים של secret-scanning ושירותי mirroring שיכולים ללכוד commit תוך שניות — חלון של שתי דקות אינו מרווח בטוח. force-push כותב מחדש את הפניית ה-branch אך לא מבטיח שאובייקט ה-commit הישן אינו נגיש או לא מאונדקס במקום אחר (caches, forks, עותקים שכבר בוצע להם clone, סורקי צד שלישי); התיקון האמין היחיד הוא להתייחס ל-key כאילו נפרץ ולבצע לו rotation.",
    },
    {
      id: "scs-020",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A build script writes intermediate output to a temporary file that includes a full copy of the resolved configuration, including a database connection string with credentials, then deletes the file at the end of the script. What residual risk remains?",
      options: [
        "If the deletion step is skipped due to an earlier script failure (since cleanup often only runs on success), the plaintext file with credentials is left behind on disk",
        "None, because temporary files are automatically stored in encrypted memory",
        "None, because deleting a file always immediately overwrites its data on disk",
        "The risk only applies to Windows systems, not Linux or macOS",
      ],
      correctAnswer: 0,
      explanation:
        "Cleanup steps placed at the end of a script often don't run if an earlier step throws an error or exits early, which is exactly when a temp file containing credentials can be left behind — a `try/finally` or trap-based cleanup is needed to guarantee it runs regardless of success or failure. Deleting a file typically just removes the directory entry; the underlying disk blocks are not necessarily wiped, so 'deleted' does not mean 'unrecoverable' on most filesystems, and this behavior is not OS-specific.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["temp files", "cleanup", "residual risk"],
      tooltipTerms: [],
      question_he:
        "סקריפט build כותב פלט ביניים לקובץ זמני שכולל עותק מלא של ההגדרה הפתורה, כולל מחרוזת חיבור למסד נתונים עם credentials, ואז מוחק את הקובץ בסוף הסקריפט. איזה סיכון שיורי נשאר?",
      options_he: [
        "אם שלב המחיקה מדולג עקב כשל מוקדם יותר בסקריפט (מכיוון ש-cleanup לרוב רץ רק בהצלחה), הקובץ בטקסט רגיל עם ה-credentials נשאר על הדיסק",
        "אין, מכיוון שקבצים זמניים מאוחסנים אוטומטית בזיכרון מוצפן",
        "אין, מכיוון שמחיקת קובץ תמיד דורסת מיידית את הנתונים שלו על הדיסק",
        "הסיכון חל רק על מערכות Windows, לא על Linux או macOS",
      ],
      explanation_he:
        "שלבי cleanup שממוקמים בסוף סקריפט לרוב לא רצים אם שלב מוקדם יותר זורק שגיאה או יוצא מוקדם, וזה בדיוק המקרה שבו קובץ זמני שמכיל credentials יכול להישאר — נדרש cleanup מבוסס `try/finally` או trap כדי להבטיח שהוא רץ ללא תלות בהצלחה או כישלון. מחיקת קובץ בדרך כלל רק מסירה את רשומת התיקייה; בלוקי הדיסק שמתחת לא בהכרח נדרסים, כך ש'נמחק' לא אומר 'בלתי ניתן לשחזור' ברוב מערכות הקבצים, וההתנהגות הזו אינה ספציפית למערכת הפעלה.",
    },
    {
      id: "scs-021",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "Why is it generally safer to load secrets via a secret manager SDK call at application startup rather than embedding them in a configuration file that is deployed alongside the code?",
      options: [
        "The secret manager centralizes access control and auditing, and updating the secret does not require redeploying the application or config file",
        "SDK calls are always faster than reading a local file",
        "Configuration files are the only place secret scanning tools ever look",
        "Application startup is the only time a script can access environment variables",
      ],
      correctAnswer: 0,
      explanation:
        "A secret manager provides a single point to control who/what can read a secret and to log every access, and rotating the underlying value doesn't require touching or redeploying the application's config or code — the app just fetches the current value next time it starts or refreshes. A deployed config file, by contrast, bakes the secret into every deployed artifact and every environment that has a copy of that file.",
      resourceTitle: "Azure Key Vault: About keys, secrets, and certificates",
      resourceUrl: "https://learn.microsoft.com/azure/key-vault/general/about-keys-secrets-certificates",
      keywords: ["secret manager", "centralized access", "auditing"],
      tooltipTerms: ["Key Vault"],
      question_he:
        "מדוע בדרך כלל בטוח יותר לטעון secrets דרך קריאת SDK של secret manager באתחול האפליקציה במקום להטמיע אותם בקובץ configuration שנפרס יחד עם הקוד?",
      options_he: [
        "ה-secret manager מרכז בקרת גישה ו-auditing, ועדכון ה-secret לא דורש deployment מחדש של האפליקציה או קובץ ה-config",
        "קריאות SDK תמיד מהירות יותר מקריאת קובץ מקומי",
        "קבצי configuration הם המקום היחיד שכלי secret scanning בודקים בו אי פעם",
        "אתחול האפליקציה הוא הזמן היחיד שסקריפט יכול לגשת למשתני סביבה",
      ],
      explanation_he:
        "secret manager מספק נקודה אחת לשליטה במי/מה יכול לקרוא secret ולתעד כל גישה, ו-rotation לערך שמתחת לא דורש נגיעה או deployment מחדש של ה-config או הקוד של האפליקציה — האפליקציה פשוט שולפת את הערך הנוכחי בפעם הבאה שהיא מאתחלת או מרעננת. קובץ config שנפרס, לעומת זאת, מטמיע את ה-secret בכל artifact שנפרס ובכל environment שיש לו עותק של הקובץ ההוא.",
    },
    {
      id: "scs-022",
      providers: ["neutral"],
      domains: ["scripts-secrets", "governance"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A security team is designing an audit process to detect secret exposure across an organization's scripts and pipelines. Which of the following are effective, complementary controls to include? (Select all that apply.)",
      options: [
        "Automated secret-scanning across both current source code and full git history, including forks and mirrors",
        "Alerting when a known secret-shaped pattern (e.g. a recognizable cloud provider key prefix) appears in CI/CD build logs",
        "Relying solely on developers self-reporting when they believe they exposed a secret",
        "Periodic review of secret scope and rotation age, flagging long-lived or overly broad credentials for review",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Scanning both code and history (including forks/mirrors) catches exposures that live entirely outside the current tip of the main branch, log-pattern alerting catches leaks that never touch source control at all, and periodic reviews of scope/age catch structural risk (like the never-rotated admin key) before any single incident. Relying solely on self-reporting misses the exposures nobody notices, which is the majority of real incidents — it's a useful supplement, not a control on its own.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["audit", "secret scanning", "governance", "rotation age"],
      tooltipTerms: ["Secret Scanning"],
      question_he:
        "צוות אבטחה מתכנן תהליך audit לאיתור חשיפת secrets ברחבי הסקריפטים וה-pipelines של הארגון. אילו מהבאים הם בקרות יעילות ומשלימות שכדאי לכלול? (בחר/י את כל האפשרויות הרלוונטיות.)",
      options_he: [
        "secret-scanning אוטומטי הן על קוד המקור הנוכחי והן על מלוא היסטוריית ה-git, כולל forks ו-mirrors",
        "התראה כאשר דפוס בצורת secret ידוע (למשל prefix מזוהה של key של ספק ענן) מופיע ב-build logs של CI/CD",
        "הסתמכות בלעדית על דיווח עצמי של מפתחים כשהם סבורים שחשפו secret",
        "סקירה תקופתית של scope ו-rotation age של secrets, וסימון credentials ארוכי-חיים או רחבי-scope מדי לבדיקה",
      ],
      explanation_he:
        "סריקת קוד והיסטוריה גם יחד (כולל forks/mirrors) תופסת חשיפות שחיות לגמרי מחוץ לקצה הנוכחי של ה-branch הראשי, התראה מבוססת דפוס ב-logs תופסת דליפות שמעולם לא נגעו ב-version control בכלל, וסקירות תקופתיות של scope/age תופסות סיכון מבני (כמו key של admin שמעולם לא עבר rotation) לפני כל אירוע בודד. הסתמכות בלעדית על דיווח עצמי מפספסת חשיפות שאף אחד לא שם לב אליהן, וזה רוב האירועים האמיתיים — זו תוספת שימושית, לא בקרה בפני עצמה.",
    },
  ],
});
