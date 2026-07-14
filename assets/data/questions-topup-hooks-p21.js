/**
 * questions-topup-hooks-p21.js — Phase 21 coverage top-up: Hooks (11 questions).
 * Deepens thin difficulty slices. Registers itself via
 * CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-hooks-p21",
  label: "Hooks — Phase 21 Top-up",
  questions: [
    {
      id: "p21-hok-001",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer has a pre-commit hook installed in their local .git/hooks/ directory that blocks commits containing hardcoded API keys. Why can this protection NOT be considered a real security boundary?",
      question_he:
        "מפתח מתקין hook מסוג pre-commit מקומי בתיקיית .git/hooks/ שחוסם commit-ים המכילים מפתחות API קשיחים בקוד. מדוע לא ניתן לראות בהגנה זו גבול אבטחה אמיתי?",
      options: [
        "The hook only runs on push, not on commit",
        "Because it lives in the local .git/hooks directory, the developer can edit or delete it themselves before it ever reaches a shared server",
        "Git hooks cannot detect secrets at all",
        "Local hooks require an internet connection to function",
      ],
      options_he: [
        "ה-hook רץ רק ב-push, לא ב-commit",
        "מכיוון שהוא נמצא בתיקיית .git/hooks המקומית, המפתח יכול לערוך או למחוק אותו בעצמו לפני שהשינוי מגיע לשרת המשותף",
        "hooks של Git אינם מסוגלים לזהות סודות בכלל",
        "hooks מקומיים דורשים חיבור לאינטרנט כדי לפעול",
      ],
      correctAnswer: 1,
      explanation:
        "Client-side hooks live in the local, unversioned .git/hooks/ folder, so the same person the hook is meant to constrain can modify, disable, or delete it at will — nothing on the server enforces it. Real enforcement requires the check to run somewhere the developer doesn't control, such as a server-side hook or a CI pipeline gate. Option A is wrong because pre-commit runs at commit time, not push; option C is wrong since hooks absolutely can run secret scanners; option D is irrelevant to trust boundaries.",
      explanation_he:
        "hooks מצד הלקוח נמצאים בתיקיית .git/hooks המקומית והלא מנוהלת בגרסאות, כך שאותו אדם שה-hook אמור לרסן יכול לשנות, להשבית או למחוק אותו בכל רגע — שום דבר בצד השרת לא אוכף זאת. אכיפה אמיתית דורשת שהבדיקה תרוץ במקום שהמפתח אינו שולט בו, כמו hook בצד השרת או שער בצינור CI. תשובה א' שגויה כי pre-commit רץ ב-commit ולא ב-push; תשובה ג' שגויה כי hooks בהחלט יכולים להריץ סריקת סודות; תשובה ד' אינה רלוונטית לגבולות אמון.",
      resourceTitle: "githooks Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["client-side hooks", "trust boundary", "secret scanning"],
      tooltipTerms: ["Secret Scanning"],
    },
    {
      id: "p21-hok-002",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "If a repository has three chained pre-commit hook scripts and the first one exits with a non-zero status, Git (or the hook runner) will still run the second and third scripts before deciding whether to allow the commit.",
      question_he:
        "אם למאגר יש שלושה סקריפטים של pre-commit hook המחוברים בשרשרת, וה-hook הראשון מסתיים בסטטוס שאינו אפס, Git (או מריץ ה-hooks) עדיין יריץ את הסקריפט השני והשלישי לפני שיוחלט האם לאשר את ה-commit.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Git treats a hook's non-zero exit as a signal to abort the operation immediately, and hook runners that chain multiple scripts typically stop at the first failure rather than continuing to run the rest. This means hook order matters — a fast, critical check should run before slower ones so failures are caught quickly and later scripts don't waste time or falsely appear to have passed.",
      explanation_he:
        "Git מתייחס לסיום שאינו אפס של hook כאיתות לביטול הפעולה מיידית, ומריצי hooks המשרשרים מספר סקריפטים בדרך כלל עוצרים בכישלון הראשון ולא ממשיכים להריץ את השאר. משמעות הדבר היא שסדר ה-hooks חשוב — בדיקה מהירה וקריטית צריכה לרוץ לפני בדיקות איטיות יותר כדי שכשלים ייתפסו מהר, וסקריפטים מאוחרים לא יבזבזו זמן או ייראו כאילו עברו בהצלחה.",
      resourceTitle: "pre-commit Framework",
      resourceUrl: "https://pre-commit.com/",
      keywords: ["hook chaining", "execution order", "fail-fast"],
      tooltipTerms: ["Pre-commit Hook"],
    },
    {
      id: "p21-hok-003",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team configures a pre-commit hook that automatically reformats code and commits the reformatted version without showing the developer a diff first. What is the main risk of this design?",
      question_he:
        "צוות מגדיר pre-commit hook שמעצב מחדש קוד באופן אוטומטי ומבצע commit לגרסה המעוצבת מחדש בלי להציג למפתח diff קודם. מהו הסיכון העיקרי בעיצוב הזה?",
      options: [
        "The hook will run twice",
        "The developer's original commit message is discarded",
        "Code changes enter the commit history without the author reviewing exactly what was altered",
        "Auto-formatting hooks cannot be disabled",
      ],
      options_he: [
        "ה-hook ירוץ פעמיים",
        "הודעת ה-commit המקורית של המפתח נמחקת",
        "שינויי קוד נכנסים להיסטוריית ה-commit מבלי שהמחבר בדק בדיוק מה שונה",
        "hooks של עיצוב אוטומטי לא ניתנים להשבתה",
      ],
      correctAnswer: 2,
      explanation:
        "When a hook silently rewrites and commits code, the author may push changes they never actually looked at — auto-formatting can occasionally alter whitespace-sensitive areas or interact unexpectedly with other tooling. The safer pattern is to have the hook format the files and stop, requiring the developer to review and re-stage the diff themselves before committing. Options B and D are factually false, and A doesn't describe a real risk in this scenario.",
      explanation_he:
        "כאשר hook כותב מחדש קוד ומבצע לו commit בשקט, המחבר עלול לדחוף שינויים שמעולם לא באמת בדק — עיצוב אוטומטי יכול לעיתים לשנות אזורים רגישים לרווחים או לגרום להתנהגות בלתי צפויה מול כלים אחרים. הדפוס הבטוח יותר הוא שה-hook יעצב את הקבצים ויעצור, ויחייב את המפתח לבדוק ולהוסיף מחדש (stage) את ה-diff בעצמו לפני ה-commit. תשובות ב' ו-ד' שגויות עובדתית, ותשובה א' לא מתארת סיכון אמיתי בתרחיש הזה.",
      resourceTitle: "githooks Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["auto-formatting", "silent commit", "review"],
      tooltipTerms: [],
    },
    {
      id: "p21-hok-004",
      providers: ["neutral"],
      domains: ["hooks", "governance"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A pipeline runs a \"pre-deploy\" validation stage that checks a build artifact before it is released to production. How does this differ fundamentally from a git hook like pre-commit?",
      question_he:
        "צינור (pipeline) מריץ שלב אימות \"pre-deploy\" שבודק חבילת build לפני שהיא משוחררת לסביבת ה-production. במה זה שונה באופן יסודי מ-git hook כמו pre-commit?",
      options: [
        "It is identical to a git hook, just renamed",
        "It only exists in GitHub, not other CI systems",
        "It runs as part of the CI/CD pipeline infrastructure, independent of any individual developer's local Git installation, so it cannot be skipped by local configuration",
        "It requires no configuration file",
      ],
      options_he: [
        "זה זהה לחלוטין ל-git hook, רק בשם אחר",
        "זה קיים רק ב-GitHub ולא במערכות CI אחרות",
        "זה רץ כחלק מתשתית צינור ה-CI/CD, בנפרד מכל התקנת Git מקומית של מפתח כלשהו, ולכן לא ניתן לדלג עליו באמצעות תצורה מקומית",
        "זה לא דורש קובץ תצורה כלל",
      ],
      correctAnswer: 2,
      explanation:
        "A CI/CD pre-deploy gate executes on shared pipeline infrastructure, entirely outside any developer's local machine, so there is no local .git/hooks file a developer could bypass or misconfigure. A git hook such as pre-commit is a local, per-clone script that lives on the developer's own computer. Option B is false — pre-deploy gates exist across CI systems like GitLab CI, Jenkins, and CircleCI, and option D is false since pipelines are defined in configuration files.",
      explanation_he:
        "שער pre-deploy ב-CI/CD רץ על תשתית צינור משותפת, מחוץ לחלוטין למחשב המקומי של כל מפתח, ולכן אין קובץ .git/hooks מקומי שמפתח יכול לעקוף או להגדיר בצורה שגויה. hook כמו pre-commit הוא סקריפט מקומי, פר-שכפול (clone), שנמצא על המחשב של המפתח עצמו. תשובה ב' שגויה — שערי pre-deploy קיימים במערכות CI רבות כמו GitLab CI, Jenkins ו-CircleCI, ותשובה ד' שגויה כי צינורות מוגדרים בקבצי תצורה.",
      resourceTitle: "GitHub Actions Documentation",
      resourceUrl: "https://docs.github.com/en/actions",
      keywords: ["ci/cd gate", "pre-deploy", "pipeline stage"],
      tooltipTerms: ["Guardrails"],
    },
    {
      id: "p21-hok-005",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A pre-commit hook runs a full test suite that takes 6 minutes on every commit. Within a few weeks, most developers on the team start using --no-verify to skip it. What does this scenario best illustrate?",
      question_he:
        "hook מסוג pre-commit מריץ מערך בדיקות מלא שלוקח 6 דקות בכל commit. תוך מספר שבועות, רוב המפתחים בצוות מתחילים להשתמש ב-‎--no-verify כדי לדלג עליו. מה התרחיש הזה ממחיש בצורה הטובה ביותר?",
      options: [
        "Test suites should never run in hooks",
        "Hook design must balance thoroughness against developer workflow cost, or developers will route around slow hooks entirely",
        "The hook is technically broken",
        "--no-verify only works for pre-push, not pre-commit",
      ],
      options_he: [
        "מערכי בדיקות לעולם לא צריכים לרוץ בתוך hooks",
        "עיצוב hooks חייב לאזן בין יסודיות לבין עלות על זרימת העבודה של המפתח, אחרת מפתחים יעקפו hooks איטיים לגמרי",
        "ה-hook תקול מבחינה טכנית",
        "‎--no-verify עובד רק עבור pre-push, לא עבור pre-commit",
      ],
      correctAnswer: 1,
      explanation:
        "A hook that meaningfully disrupts a developer's flow — like a multi-minute wait on every single commit — creates strong pressure to bypass it, which defeats the hook's purpose entirely. Well-designed hooks keep fast, essential checks local (linting, a targeted test subset) and push exhaustive suites to CI where they run asynchronously without blocking the developer. Option D is false — --no-verify works to skip both pre-commit and pre-push hooks.",
      explanation_he:
        "hook שמפריע משמעותית לזרימת העבודה של המפתח — כמו המתנה של דקות ארוכות בכל commit בודד — יוצר לחץ חזק לעקוף אותו, מה שמסכל לחלוטין את מטרת ה-hook. hooks מעוצבים היטב שומרים בדיקות מהירות וחיוניות מקומית (linting, תת-קבוצת בדיקות ממוקדת) ומעבירים מערכי בדיקות מקיפים ל-CI שם הם רצים אסינכרונית מבלי לחסום את המפתח. תשובה ד' שגויה — ‎--no-verify עובד לדילוג הן על pre-commit והן על pre-push.",
      resourceTitle: "pre-commit Framework",
      resourceUrl: "https://pre-commit.com/",
      keywords: ["hook performance", "developer experience", "workflow cost"],
      tooltipTerms: ["Pre-commit Hook"],
    },
    {
      id: "p21-hok-006",
      providers: ["neutral"],
      domains: ["hooks", "governance"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "If different developers on the same team have installed different versions of a shared pre-commit configuration (for example, an outdated hooks setup that hasn't been updated after a rule change), they can end up with inconsistent protection even though they are working on the same repository.",
      question_he:
        "אם מפתחים שונים באותו צוות התקינו גרסאות שונות של תצורת hooks משותפת (למשל, הגדרת hooks מיושנת שלא עודכנה לאחר שינוי בכללים), הם עלולים להסתיים עם הגנה לא עקבית למרות שהם עובדים על אותו מאגר.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Since git hooks (or tools like pre-commit) are typically installed and configured per local clone, a developer who hasn't reinstalled or updated their hook configuration after a rules change will keep running the older checks, or none at all, while teammates enforce the newer rules. This configuration drift means the protection a repository nominally has can depend on each individual's local setup rather than a guaranteed team-wide baseline — one more reason server-side or CI enforcement matters for anything that must apply consistently.",
      explanation_he:
        "מכיוון ש-git hooks (או כלים כמו pre-commit) בדרך כלל מותקנים ומוגדרים פר-שכפול מקומי, מפתח שלא התקין מחדש או עדכן את תצורת ה-hooks שלו לאחר שינוי בכללים ימשיך להריץ בדיקות ישנות, או לא יריץ בכלל, בעוד חבריו לצוות אוכפים את הכללים החדשים. סחיפת תצורה (configuration drift) זו משמעה שההגנה שלמאגר יש נומינלית עשויה להיות תלויה בהגדרה המקומית של כל אדם ולא בבסיס מובטח לכל הצוות — עוד סיבה מדוע אכיפה בצד השרת או ב-CI חשובה לכל דבר שחייב לחול באופן עקבי.",
      resourceTitle: "pre-commit Framework",
      resourceUrl: "https://pre-commit.com/",
      keywords: ["configuration drift", "team consistency", "local setup"],
      tooltipTerms: [],
    },
    {
      id: "p21-hok-007",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team adds a hook that scans commits for suspicious patterns but only prints a warning to the console rather than blocking the commit. What is this \"audit-only\" design a reasonable middle ground for?",
      question_he:
        "צוות מוסיף hook שסורק commit-ים לחיפוש דפוסים חשודים אך רק מדפיס אזהרה במסוף במקום לחסום את ה-commit. עבור מה עיצוב \"audit-only\" זה מהווה פשרה סבירה?",
      options: [
        "It provides zero value compared to a blocking hook",
        "It raises developer awareness and creates a record of flagged events without disrupting workflow, useful when false positives are common or when a team is not yet ready for full enforcement",
        "It is only usable in post-merge hooks",
        "It automatically fixes the flagged issue",
      ],
      options_he: [
        "זה מספק ערך אפסי בהשוואה ל-hook חוסם",
        "זה מעלה את המודעות של המפתחים ויוצר תיעוד של אירועים שסומנו מבלי לשבש את זרימת העבודה, שימושי כאשר positives שגויים נפוצים או כשצוות עדיין לא מוכן לאכיפה מלאה",
        "ניתן להשתמש בזה רק ב-hooks מסוג post-merge",
        "זה מתקן אוטומטית את הבעיה שסומנה",
      ],
      correctAnswer: 1,
      explanation:
        "A non-blocking, warn-only hook lets a team pilot a new check, gauge its false-positive rate, and build developer awareness before flipping it to a hard gate — a common rollout strategy for new rules that might otherwise disrupt work if enforced immediately. It clearly does provide value, contradicting option A; it isn't tied to a specific hook stage, contradicting option C; and it doesn't auto-remediate anything, contradicting option D.",
      explanation_he:
        "hook שאינו חוסם ורק מזהיר מאפשר לצוות להריץ פיילוט לבדיקה חדשה, למדוד את שיעור ה-false positives שלה, ולבנות מודעות בקרב המפתחים לפני הפיכתה לשער חוסם — אסטרטגיית הטמעה נפוצה לכללים חדשים שעלולים לשבש עבודה אם נאכפים מיידית. הוא בהחלט מספק ערך, בניגוד לתשובה א'; הוא אינו קשור לשלב hook ספציפי, בניגוד לתשובה ג'; והוא לא מתקן דבר אוטומטית, בניגוד לתשובה ד'.",
      resourceTitle: "githooks Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["audit-only", "warn mode", "gradual rollout"],
      tooltipTerms: ["Guardrails"],
    },
    {
      id: "p21-hok-008",
      providers: ["neutral"],
      domains: ["hooks", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A pre-commit hook script is meant to reject commits containing AWS secret keys, but a bug in its regular expression means it silently fails to match keys formatted with certain characters, so several real secrets slip through undetected for months. What does this scenario primarily demonstrate?",
      question_he:
        "סקריפט של pre-commit hook אמור לדחות commit-ים המכילים מפתחות סוד של AWS, אבל באג בביטוי הרגולרי (regex) שלו גורם לו להחמיץ בשקט מפתחות המעוצבים עם תווים מסוימים, כך שכמה סודות אמיתיים חומקים ללא זיהוי במשך חודשים. מה התרחיש הזה מדגים בעיקר?",
      options: [
        "Hooks should never be used for secret detection",
        "The hook script itself is code that can contain bugs, and without testing the hook against known-good and known-bad inputs, it can create false confidence while failing at its actual job",
        "Regular expressions cannot be used in any hook",
        "The problem would not occur if the hook were server-side instead of client-side",
      ],
      options_he: [
        "אין להשתמש ב-hooks לזיהוי סודות בכלל",
        "סקריפט ה-hook עצמו הוא קוד שיכול להכיל באגים, וללא בדיקת ה-hook מול קלטים ידועים כתקינים וידועים כבעייתיים, הוא יכול ליצור ביטחון שווא בעוד הוא נכשל במשימתו בפועל",
        "אי אפשר להשתמש בביטויים רגולריים באף hook",
        "הבעיה לא הייתה מתרחשת אילו ה-hook היה בצד השרת במקום בצד הלקוח",
      ],
      correctAnswer: 1,
      explanation:
        "A hook is just a script, and like any script it can have logic errors — an untested pattern-matching bug can leave a security control quietly non-functional while everyone believes it's working. The fix is treating hook scripts as code that needs its own tests and fixtures, not abandoning hooks (option A) or regex (option C). Option D is a distractor: the same regex bug would exist whether the hook ran client-side or server-side — moving enforcement location doesn't fix broken detection logic.",
      explanation_he:
        "hook הוא פשוט סקריפט, וכמו כל סקריפט הוא יכול להכיל שגיאות לוגיות — באג לא נבדק בהתאמת דפוסים יכול להשאיר בקרת אבטחה לא פעילה בשקט בעוד כולם מאמינים שהיא עובדת. הפתרון הוא להתייחס לסקריפטי hooks ככאל קוד שדורש בדיקות ו-fixtures משלו, לא לוותר על hooks (תשובה א') או על regex (תשובה ג'). תשובה ד' היא מסיחה: אותו באג ב-regex היה קיים בין אם ה-hook רץ בצד הלקוח ובין אם בצד השרת — העברת מיקום האכיפה לא מתקנת לוגיקת זיהוי שבורה.",
      resourceTitle: "githooks Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["hook testing", "false confidence", "detection bug"],
      tooltipTerms: ["Secret Scanning", "Secret"],
    },
    {
      id: "p21-hok-009",
      providers: ["neutral"],
      domains: ["hooks", "security"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following statements correctly describe why server-side (or CI-based) enforcement is considered the real trust boundary compared to client-side git hooks? (Select all that apply)",
      question_he:
        "אילו מהמשפטים הבאים מתארים נכון מדוע אכיפה בצד השרת (או מבוססת CI) נחשבת לגבול האמון האמיתי בהשוואה ל-git hooks בצד הלקוח? (בחר את כל התשובות הנכונות)",
      options: [
        "A client-side hook's code lives in the developer's own working copy, so a motivated developer can edit, disable, or uninstall it without anyone else knowing",
        "Server-side checks run on infrastructure the committing developer does not control, so passing them cannot be faked by local configuration changes",
        "Client-side hooks are always slower than server-side checks",
        "Server-side enforcement can reject a push or merge outright, regardless of what happened (or didn't happen) on the contributor's machine",
      ],
      options_he: [
        "קוד ה-hook בצד הלקוח נמצא בעותק העבודה של המפתח עצמו, כך שמפתח מונע יכול לערוך, להשבית או להסיר אותו מבלי שאף אחד אחר ידע",
        "בדיקות בצד השרת רצות על תשתית שהמפתח המבצע commit אינו שולט בה, כך שאי אפשר לזייף את עמידתן על ידי שינויי תצורה מקומיים",
        "hooks בצד הלקוח תמיד איטיים יותר מבדיקות בצד השרת",
        "אכיפה בצד השרת יכולה לדחות push או merge לחלוטין, ללא קשר למה שקרה (או לא קרה) במחשב של התורם",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Because git hook scripts are stored locally and are not part of the versioned, shared repository history, they only bind a developer who chooses to keep them intact — anyone can edit or remove them without leaving a visible trace to others. Server-side or CI checks run independently of the contributor's environment, so they can actually refuse a push or merge no matter what happened locally. Option C is not a defining or reliable distinction between the two — either type of check can be fast or slow depending on what it actually runs.",
      explanation_he:
        "מכיוון שסקריפטי git hooks מאוחסנים באופן מקומי ואינם חלק מהיסטוריית המאגר המשותפת והמנוהלת בגרסאות, הם מחייבים רק מפתח שבוחר להשאיר אותם שלמים — כל אחד יכול לערוך או להסיר אותם מבלי להשאיר עקבות גלויים לאחרים. בדיקות בצד השרת או ב-CI רצות באופן בלתי תלוי בסביבת התורם, ולכן הן יכולות למעשה לדחות push או merge ללא קשר למה שקרה מקומית. תשובה ג' אינה הבחנה מהותית או אמינה בין השניים — כל אחד מסוגי הבדיקות יכול להיות מהיר או איטי בהתאם למה שהוא בפועל מריץ.",
      resourceTitle: "Managing Rulesets in GitHub",
      resourceUrl:
        "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets",
      keywords: ["trust boundary", "server-side enforcement", "client-side hooks"],
      tooltipTerms: ["Guardrails"],
    },
    {
      id: "p21-hok-010",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A repository uses a hook runner that chains three scripts in order: (1) syntax-check, (2) secret-scan, (3) unit-tests. The syntax-check script exits with a non-zero status due to a bug unrelated to real syntax errors. Which of the following are likely consequences of this specific chaining setup? (Select all that apply)",
      question_he:
        "מאגר משתמש במריץ hooks המשרשר שלושה סקריפטים בסדר: (1) בדיקת תחביר, (2) סריקת סודות, (3) בדיקות יחידה. סקריפט בדיקת התחביר מסתיים בסטטוס שאינו אפס בגלל באג שאינו קשור לשגיאות תחביר אמיתיות. אילו מהבאים הן תוצאות סבירות של הגדרת שרשור זו? (בחר את כל התשובות הנכונות)",
      options: [
        "The secret-scan and unit-tests scripts may never run for that commit, because the chain stops at the first failure",
        "Developers may perceive this as the secret-scan failing, when actually a different, unrelated script is the true cause",
        "This proves hooks should never be chained together",
        "Because later checks are skipped, any secret that would have been caught by secret-scan goes undetected in that commit attempt",
      ],
      options_he: [
        "ייתכן שסקריפטי סריקת הסודות ובדיקות היחידה לעולם לא ירוצו עבור אותו commit, כי השרשרת נעצרת בכישלון הראשון",
        "מפתחים עשויים לחשוב שסריקת הסודות היא זו שנכשלה, בעוד שבפועל סקריפט אחר ולא קשור הוא הגורם האמיתי",
        "זה מוכיח שאסור לעולם לשרשר hooks יחד",
        "מכיוון שהבדיקות המאוחרות מדולגות, כל סוד שסריקת הסודות הייתה אמורה לתפוס נשאר לא מזוהה בניסיון ה-commit הזה",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "When hooks are chained with fail-fast behavior, an early script's failure — even one caused by an unrelated bug — prevents downstream checks from ever executing, so their protections aren't applied for that attempt. This can also confuse developers into misdiagnosing which check actually failed if error output isn't clearly attributed to the right script. Option C is an overreach: chaining hooks is a normal and useful pattern, and the real lesson is to design clear failure isolation and reporting, not to avoid chaining altogether.",
      explanation_he:
        "כאשר hooks משורשרים עם התנהגות fail-fast, כישלון של סקריפט מוקדם — אפילו כזה שנגרם מבאג לא קשור — מונע מבדיקות מאוחרות יותר לרוץ בכלל, כך שההגנות שלהן לא מיושמות באותו ניסיון. זה גם עלול לבלבל מפתחים לחשוב שהבדיקה השגויה היא זו שנכשלה, אם פלט השגיאה לא מיוחס בבירור לסקריפט הנכון. תשובה ג' היא הרחקת לכת: שרשור hooks הוא דפוס רגיל ושימושי, והלקח האמיתי הוא לעצב בידוד כשלים ודיווח ברור, לא להימנע משרשור לחלוטין.",
      resourceTitle: "pre-commit Framework",
      resourceUrl: "https://pre-commit.com/",
      keywords: ["hook chaining", "fail-fast", "misdiagnosis"],
      tooltipTerms: [],
    },
    {
      id: "p21-hok-011",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A hook automatically runs a code formatter and commits the reformatted files as part of the same commit, with no separate review step. In a fast-moving team, what is the most likely downstream consequence over time?",
      question_he:
        "hook מריץ באופן אוטומטי כלי עיצוב קוד ומבצע commit לקבצים המעוצבים מחדש כחלק מאותו commit, ללא שלב בדיקה נפרד. בצוות שעובד במהירות, מהי ההשלכה הצפויה ביותר לאורך זמן?",
      options: [
        "Commit history will contain formatting-only changes indistinguishable from intentional edits, making it harder to use tools like git blame to find meaningful logic changes",
        "The repository will stop compiling",
        "Git will refuse to allow any further commits",
        "The formatter hook will automatically disable itself after one use",
      ],
      options_he: [
        "היסטוריית ה-commit תכיל שינויי עיצוב בלבד שלא ניתן להבחין ביניהם לבין עריכות מכוונות, מה שיקשה להשתמש בכלים כמו git blame כדי למצוא שינויי לוגיקה משמעותיים",
        "המאגר יפסיק להתקמפל",
        "Git יסרב לאפשר commit-ים נוספים",
        "hook העיצוב ישבית את עצמו אוטומטית לאחר שימוש אחד",
      ],
      correctAnswer: 0,
      explanation:
        "When a hook silently folds auto-formatting changes into the same commit without visibility, formatting noise gets mixed into the history alongside real logic changes, making tools like git blame or careful diff review less useful for tracing when and why actual behavior changed. This is a genuine cost of convenience-oriented automation, distinct from the transparency concerns raised by silent automation elsewhere — here the specific harm is to the historical record itself. Options B, C, and D describe outcomes with no real basis in this scenario.",
      explanation_he:
        "כאשר hook משלב בשקט שינויי עיצוב אוטומטי לתוך אותו commit ללא שקיפות, רעש עיצובי מתערבב בהיסטוריה יחד עם שינויי לוגיקה אמיתיים, מה שהופך כלים כמו git blame או סקירת diff קפדנית לפחות שימושיים במעקב אחרי מתי ומדוע התנהגות אמיתית השתנתה. זו עלות אמיתית של אוטומציה מוכוונת נוחות, נבדלת מדאגות השקיפות שנדונו במקום אחר לגבי אוטומציה שקטה — כאן הנזק הספציפי הוא לרשומה ההיסטורית עצמה. תשובות ב', ג' ו-ד' מתארות תוצאות ללא בסיס אמיתי בתרחיש הזה.",
      resourceTitle: "githooks Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["auto-commit", "history hygiene", "git blame"],
      tooltipTerms: [],
    },
  ],
});
