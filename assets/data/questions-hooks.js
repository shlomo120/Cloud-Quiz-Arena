/**
 * questions-hooks.js — Quiz pack: Hooks & Automation (22 questions).
 * Git hooks, CI/CD pipeline hooks, and AI-agent automation hooks: what runs
 * when, secret-scanning guardrails, supply-chain risk, and transparency in
 * automated workflows. Registers itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "hooks-and-automation",
  label: "Hooks",
  questions: [
    {
      id: "hok-001",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question: "What is a pre-commit hook?",
      question_he: "מהו pre-commit hook?",
      options: [
        "A script that runs automatically before a commit is finalized, and can block it",
        "A script that runs after code is deployed to production",
        "A GitHub feature that automatically merges pull requests",
        "A tool that encrypts commit messages",
      ],
      options_he: [
        "סקריפט שרץ באופן אוטומטי לפני שה-commit מסתיים, ויכול לחסום אותו",
        "סקריפט שרץ אחרי שהקוד נפרס (deploy) לסביבת production",
        "פיצ'ר של GitHub שממזג pull requests באופן אוטומטי",
        "כלי שמצפין הודעות commit",
      ],
      correctAnswer: 0,
      explanation:
        "A pre-commit hook fires locally, right before Git finalizes a commit, giving it the chance to inspect the staged changes and reject the commit outright (nonzero exit code) if something is wrong — a failed lint check, a formatting violation, or a detected secret. It runs on the developer's machine before anything reaches a shared remote, which is exactly what makes it useful as an early gate rather than a late one.",
      explanation_he:
        "hook מסוג pre-commit רץ מקומית, ממש לפני שה-commit מסתיים, ומאפשר לו לבדוק את השינויים שנוספו ל-stage ולחסום את ה-commit לחלוטין (exit code שאינו אפס) אם יש בעיה - בדיקת lint שנכשלה, הפרת פורמט, או secret שזוהה. הוא רץ על המחשב של המפתח לפני שמשהו מגיע ל-remote משותף, וזה בדיוק מה שהופך אותו לשער מוקדם ולא מאוחר.",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["pre-commit", "git hooks", "lifecycle"],
      tooltipTerms: ["Pre-commit Hook"],
    },
    {
      id: "hok-002",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "A pre-commit hook that adds a secret-scanning check can prevent a credential from ever reaching a shared remote repository.",
      question_he:
        "hook מסוג pre-commit שמוסיף בדיקת סריקת secrets יכול למנוע מ-credential להגיע אי פעם ל-remote repository משותף.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Because a pre-commit hook runs before the commit is created locally, a secret-scanning check inside it can block the commit before the secret is ever recorded in the repository's history, let alone pushed. This is much cheaper than the alternative: rotating a leaked credential and scrubbing it from history after it has already reached a shared remote.",
      explanation_he:
        "מכיוון ש-hook מסוג pre-commit רץ לפני שה-commit נוצר מקומית, בדיקת סריקת secrets בתוכו יכולה לחסום את ה-commit לפני שה-secret נרשם אי פעם בהיסטוריית ה-repository, שלא לדבר על push. זה הרבה יותר זול מהאלטרנטיבה: לסובב (rotate) credential שדלף ולנקות אותו מההיסטוריה אחרי שכבר הגיע ל-remote משותף.",
      resourceTitle: "pre-commit framework — Supported hooks",
      resourceUrl: "https://pre-commit.com/hooks.html",
      keywords: ["secret scanning", "pre-commit", "prevention"],
      tooltipTerms: ["Pre-commit Hook", "Secret Scanning", "Secret"],
    },
    {
      id: "hok-003",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Which git hook runs immediately after a commit has already been created, and so cannot be used to block it?",
      question_he:
        "איזה git hook רץ מיד אחרי שה-commit כבר נוצר, ולכן לא ניתן להשתמש בו כדי לחסום אותו?",
      options: [
        "post-commit",
        "pre-commit",
        "pre-push",
        "commit-msg",
      ],
      options_he: [
        "post-commit",
        "pre-commit",
        "pre-push",
        "commit-msg",
      ],
      correctAnswer: 0,
      explanation:
        "post-commit fires after the commit object already exists in the repository's history, so it is useful for notifications or triggering follow-up local tasks (like updating a changelog file) but it has no power to reject the commit — that decision window already closed. pre-commit, pre-push, and commit-msg all run before their respective action completes, so they can still abort it.",
      explanation_he:
        "post-commit נורה אחרי שאובייקט ה-commit כבר קיים בהיסטוריית ה-repository, כך שהוא שימושי להתראות או להפעלת משימות מקומיות המשך (כמו עדכון קובץ changelog) אבל אין לו כוח לדחות את ה-commit - חלון ההחלטה כבר נסגר. pre-commit, pre-push ו-commit-msg כולם רצים לפני שהפעולה המתאימה מסתיימת, כך שהם עדיין יכולים לבטל אותה.",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["post-commit", "lifecycle", "hook stages"],
      tooltipTerms: [],
    },
    {
      id: "hok-004",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team wants to catch a credential-shaped string before it ever leaves a developer's laptop, even before it's pushed. Which hook stage is the earliest reasonable place to add that check?",
      question_he:
        "צוות רוצה לתפוס מחרוזת שנראית כמו credential לפני שהיא בכלל עוזבת את המחשב הנייד של המפתח, אפילו לפני שהיא נדחפת (push). מהו שלב ה-hook המוקדם ביותר וההגיוני להוספת הבדיקה?",
      options: [
        "pre-commit",
        "pre-receive on the server",
        "post-push",
        "a CI pipeline step that runs after merge",
      ],
      options_he: [
        "pre-commit",
        "pre-receive בצד השרת",
        "post-push",
        "שלב בצינור CI שרץ אחרי merge",
      ],
      correctAnswer: 0,
      explanation:
        "pre-commit is the earliest local hook available, running before the commit object is even created, so a secret detected there never gets written into history at all. Server-side pre-receive hooks and CI steps are useful defense-in-depth layers, but by the time they run the secret has already been committed locally and often pushed, meaning history already contains it even if the push is ultimately rejected.",
      explanation_he:
        "pre-commit הוא ה-hook המקומי המוקדם ביותר הזמין, רץ לפני שאובייקט ה-commit נוצר בכלל, כך ש-secret שזוהה שם אף פעם לא נכתב להיסטוריה בכלל. hooks מסוג pre-receive בצד השרת ושלבי CI הם שכבות הגנה-לעומק שימושיות, אבל עד שהם רצים ה-secret כבר הוכנס ל-commit מקומית ולעיתים קרובות נדחף, כלומר ההיסטוריה כבר מכילה אותו גם אם ה-push נדחה בסופו של דבר.",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["secret scanning", "earliest gate", "pre-commit"],
      tooltipTerms: ["Pre-commit Hook", "Secret Scanning"],
    },
    {
      id: "hok-005",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Why do many teams add a lint/formatter hook that runs before commit, rather than relying only on the same checks running later in CI?",
      question_he:
        "מדוע צוותים רבים מוסיפים hook של lint/formatter שרץ לפני commit, במקום להסתמך רק על אותן בדיקות שרצות מאוחר יותר ב-CI?",
      options: [
        "It gives fast feedback locally, catching problems in seconds instead of waiting minutes for a CI pipeline to run",
        "CI cannot run linters at all",
        "It permanently disables the linter in CI so it only runs once",
        "It is required by Git itself and cannot be skipped",
      ],
      options_he: [
        "זה נותן משוב מהיר מקומית, ותופס בעיות תוך שניות במקום לחכות דקות לריצת צינור CI",
        "CI לא יכול להריץ linters בכלל",
        "זה מבטל לצמיתות את ה-linter ב-CI כך שהוא רץ רק פעם אחת",
        "זה נדרש על ידי Git עצמו ולא ניתן לדלג עליו",
      ],
      correctAnswer: 0,
      explanation:
        "The value of a local lint/test hook is speed of feedback: a developer finds out about a formatting or syntax problem in seconds, before ever opening a pull request, instead of pushing, waiting for a CI job to queue and run, and only then finding out. CI checks still matter as a backstop, since local hooks can be skipped or bypassed, but the local hook shortens the fix-it loop.",
      explanation_he:
        "הערך של hook מקומי ל-lint/test הוא מהירות המשוב: מפתח מגלה על בעיית פורמט או תחביר תוך שניות, לפני שבכלל פותח pull request, במקום לדחוף (push), לחכות שמשימת CI תיכנס לתור ותרוץ, ורק אז לגלות. בדיקות CI עדיין חשובות כגיבוי, מכיוון שניתן לדלג על hooks מקומיים או לעקוף אותם, אבל ה-hook המקומי מקצר את מעגל התיקון.",
      resourceTitle: "pre-commit framework",
      resourceUrl: "https://pre-commit.com/",
      keywords: ["lint", "fast feedback", "local checks"],
      tooltipTerms: [],
    },
    {
      id: "hok-006",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Hooks that are committed inside a shared repository will automatically run on the machine of anyone who clones that repository, with no extra step required.",
      question_he:
        "hooks שמוכנסים ל-commit בתוך repository משותף ירוצו באופן אוטומטי על המחשב של כל מי שמשכפל (clone) את ה-repository, ללא צורך בשלב נוסף.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Native Git does not auto-install hooks from a cloned .git/hooks-style script on clone; a maintainer or the developer typically needs to run an install step (e.g. a setup script, `pre-commit install`, or a Makefile target) that copies or symlinks the hook into place. Tools built on top of Git, like the pre-commit framework, make this easy, but it is a deliberate opt-in step, not automatic on clone — which is itself a safeguard against silently running unreviewed code.",
      explanation_he:
        "Git הבסיסי לא מתקין באופן אוטומטי hooks מתוך סקריפט בסגנון .git/hooks בעת clone; בדרך כלל צריך מתחזק או המפתח להריץ שלב התקנה (למשל סקריפט setup, `pre-commit install`, או יעד ב-Makefile) שמעתיק או יוצר סימלינק ל-hook. כלים שנבנו מעל Git, כמו framework ה-pre-commit, מקלים על זה, אבל זהו שלב הצטרפות מכוון, לא אוטומטי בעת clone - וזו כשלעצמה הגנה מפני הרצה שקטה של קוד שלא נבדק.",
      resourceTitle: "pre-commit framework — Installation",
      resourceUrl: "https://pre-commit.com/#install",
      keywords: ["hook installation", "clone", "opt-in"],
      tooltipTerms: [],
    },
    {
      id: "hok-007",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "What does a commit-msg hook typically check?",
      question_he:
        "מה בדרך כלל בודק hook מסוג commit-msg?",
      options: [
        "The format or content of the commit message itself, such as requiring a ticket reference or a conventional-commit prefix",
        "Whether the developer has permission to push to the branch",
        "Whether the code compiles",
        "Whether unit tests pass",
      ],
      options_he: [
        "הפורמט או התוכן של הודעת ה-commit עצמה, כמו דרישה להפניה לכרטיס (ticket) או קידומת conventional-commit",
        "האם למפתח יש הרשאה לדחוף (push) לענף",
        "האם הקוד מתקמפל",
        "האם בדיקות היחידה (unit tests) עוברות",
      ],
      correctAnswer: 0,
      explanation:
        "commit-msg receives the path to the drafted commit message and can inspect or reject it based on content rules, like enforcing a JIRA ticket number or a type prefix such as `feat:`/`fix:`. It has nothing to do with code compilation or push permissions — those belong to other stages (pre-commit/CI for compiling, pre-push or server-side hooks for authorization).",
      explanation_he:
        "commit-msg מקבל את הנתיב להודעת ה-commit שנוסחה ויכול לבדוק או לדחות אותה על סמך כללי תוכן, כמו אכיפת מספר כרטיס JIRA או קידומת סוג כמו `feat:`/`fix:`. אין לזה קשר לקימפול קוד או להרשאות push - אלה שייכים לשלבים אחרים (pre-commit/CI לקימפול, pre-push או hooks בצד השרת להרשאה).",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks#_commit_msg",
      keywords: ["commit-msg", "commit message", "hook stages"],
      tooltipTerms: [],
    },
    {
      id: "hok-008",
      providers: ["neutral"],
      domains: ["hooks", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "Your team clones a third-party open-source repository to evaluate it. The repository's package.json contains a `postinstall` script. What is the main security concern with running `npm install` on it without reviewing that script first?",
      question_he:
        "הצוות שלכם משכפל (clone) repository של קוד פתוח מצד שלישי כדי להעריך אותו. קובץ package.json שלו מכיל סקריפט `postinstall`. מהי הדאגה העיקרית מבחינת אבטחה בהרצת `npm install` עליו מבלי לבדוק קודם את הסקריפט הזה?",
      options: [
        "The postinstall script executes arbitrary code with the same privileges as the user running npm install, so a malicious script can act on the developer's behalf",
        "npm install always fails if a postinstall script is present",
        "postinstall scripts can only modify files inside node_modules, so there is no real risk",
        "postinstall scripts require a separate password to run, so they are already safe",
      ],
      options_he: [
        "הסקריפט postinstall מריץ קוד שרירותי באותן הרשאות של המשתמש שמריץ את npm install, כך שסקריפט זדוני יכול לפעול בשם המפתח",
        "npm install תמיד נכשל אם קיים סקריפט postinstall",
        "סקריפטים מסוג postinstall יכולים לשנות קבצים רק בתוך node_modules, כך שאין סיכון אמיתי",
        "סקריפטים מסוג postinstall דורשים סיסמה נפרדת כדי לרוץ, כך שהם כבר בטוחים",
      ],
      correctAnswer: 0,
      explanation:
        "A postinstall script is just arbitrary shell/JS that npm runs automatically as part of installing a dependency, with whatever privileges the invoking user has — it can read SSH keys, exfiltrate environment variables, or modify files anywhere the user can write. This is a well-known supply-chain vector, which is why some teams disable install scripts by default (`npm install --ignore-scripts`) or vet packages before allowing them to run unrestricted.",
      explanation_he:
        "סקריפט postinstall הוא פשוט shell/JS שרירותי ש-npm מריץ אוטומטית כחלק מהתקנת תלות, בכל ההרשאות שיש למשתמש המפעיל - הוא יכול לקרוא מפתחות SSH, לחלץ משתני סביבה, או לשנות קבצים בכל מקום שהמשתמש יכול לכתוב אליו. זהו וקטור תקיפה מוכר בשרשרת האספקה (supply chain), ולכן חלק מהצוותים מבטלים סקריפטי התקנה כברירת מחדל (`npm install --ignore-scripts`) או בודקים חבילות לפני שהן מורשות לרוץ ללא הגבלה.",
      resourceTitle: "npm-install — npm Docs",
      resourceUrl: "https://docs.npmjs.com/cli/v10/commands/npm-install#ignore-scripts",
      keywords: ["postinstall", "supply chain", "arbitrary code execution"],
      tooltipTerms: [],
    },
    {
      id: "hok-009",
      providers: ["neutral"],
      domains: ["hooks", "security"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Because git hooks stored in a repository's own tracked directories only run with the permissions of the person who cloned the repo, letting them auto-execute on clone carries no meaningful risk.",
      question_he:
        "מכיוון ש-git hooks שמאוחסנים בתיקיות עוקבות (tracked) של ה-repository עצמו רצים רק בהרשאות האדם ששכפל (clone) את ה-repo, אין סיכון משמעותי לאפשר להם לרוץ באופן אוטומטי בעת clone.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Running with 'only' the cloning user's own privileges is precisely the problem, not a mitigating factor — that user's privileges typically include reading their SSH keys, cloud credentials, browser cookies, and anything else their account can touch. A malicious hook that auto-runs on clone can silently exfiltrate all of that, which is exactly why cloning an untrusted repository and letting its hooks run unreviewed is considered a real attack vector, not a low-risk convenience.",
      explanation_he:
        "הרצה 'רק' בהרשאות המשתמש המשכפל היא בדיוק הבעיה, לא גורם מקל - ההרשאות של אותו משתמש בדרך כלל כוללות קריאת מפתחות SSH, credentials ענן, עוגיות דפדפן, וכל דבר אחר שהחשבון שלו יכול לגעת בו. hook זדוני שרץ אוטומטית בעת clone יכול לחלץ את כל זה בשקט, וזו בדיוק הסיבה שששכפול repository לא מהימן ומתן אפשרות ל-hooks שלו לרוץ ללא בדיקה נחשב וקטור תקיפה אמיתי, לא נוחות בסיכון נמוך.",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks",
      keywords: ["trust", "shared repo hooks", "attack vector"],
      tooltipTerms: [],
    },
    {
      id: "hok-010",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A pre-commit hook automatically reformats staged files and silently amends the commit with the reformatted version, without showing the developer a diff or asking for confirmation. What is the main problem with this design, independent of whether the formatting itself is correct?",
      question_he:
        "hook מסוג pre-commit מעצב מחדש (reformat) אוטומטית קבצים שנוספו ל-stage ומתקן בשקט את ה-commit עם הגרסה המעוצבת מחדש, מבלי להראות למפתח diff או לבקש אישור. מהי הבעיה העיקרית בעיצוב הזה, ללא קשר לשאלה אם העיצוב עצמו נכון?",
      options: [
        "It hides what actually changed from the developer, making it hard to notice when the auto-formatting introduces an unintended change or masks a real problem",
        "Reformatting code is always technically impossible to automate",
        "Git rejects any commit that is modified by a hook",
        "It makes the commit permanently unmodifiable",
      ],
      options_he: [
        "זה מסתיר מהמפתח מה בעצם השתנה, מה שמקשה להבחין מתי העיצוב האוטומטי מכניס שינוי לא מכוון או מסתיר בעיה אמיתית",
        "עיצוב מחדש של קוד הוא תמיד בלתי אפשרי טכנית לאוטומציה",
        "Git דוחה כל commit שמשתנה על ידי hook",
        "זה הופך את ה-commit לבלתi ניתן לשינוי לצמיתות",
      ],
      correctAnswer: 0,
      explanation:
        "The core issue is transparency, not correctness: a hook that silently rewrites and re-commits code without surfacing a diff turns automation into a black box, so a developer can push a commit whose actual final content they never reviewed. Good hook design shows what it changed (or fails and asks the developer to re-run the formatter and re-stage) rather than acting invisibly on their behalf.",
      explanation_he:
        "הבעיה המרכזית היא שקיפות, לא נכונות: hook ששוכתב קוד בשקט ועושה לו commit מחדש בלי להציג diff הופך את האוטומציה ל'קופסה שחורה', כך שמפתח יכול לדחוף commit שהוא מעולם לא בדק את התוכן הסופי שלו בפועל. עיצוב hook טוב מציג מה השתנה (או נכשל ומבקש מהמפתח להריץ מחדש את הפורמטר ולעשות stage מחדש) במקום לפעול באופן בלתי נראה בשמו.",
      resourceTitle: "pre-commit framework — FAQ",
      resourceUrl: "https://pre-commit.com/#usage",
      keywords: ["transparency", "silent modification", "black box"],
      tooltipTerms: [],
    },
    {
      id: "hok-011",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following are genuine benefits of running a fast test subset in a pre-push hook, compared to relying solely on the full test suite in CI? (Select all that apply.)",
      question_he:
        "אילו מהבאים הם יתרונות אמיתיים בהרצת קבוצת בדיקות מהירה (subset) ב-hook מסוג pre-push, בהשוואה להסתמכות רק על חבילת הבדיקות המלאה ב-CI? (בחרו את כל האפשרויות הרלוונטיות.)",
      options: [
        "Broken code can be caught before it ever reaches the shared remote, saving a wasted CI run",
        "It shortens the feedback loop since results arrive in seconds/minutes rather than after a CI queue and run",
        "It guarantees the code will pass every check in CI as well",
        "It completely eliminates the need to ever run tests in CI",
      ],
      options_he: [
        "ניתן לתפוס קוד שבור לפני שהוא מגיע אי פעם ל-remote המשותף, מה שחוסך ריצת CI מבוזבזת",
        "זה מקצר את מעגל המשוב מכיוון שהתוצאות מגיעות תוך שניות/דקות במקום אחרי תור וריצה של CI",
        "זה מבטיח שהקוד יעבור גם כל בדיקה ב-CI",
        "זה מבטל לחלוטין את הצורך אי פעם להריץ בדיקות ב-CI",
      ],
      correctAnswer: [0, 1],
      explanation:
        "A fast subset in pre-push catches obviously broken code early and gives quick feedback, but it is deliberately a subset — it typically skips slow integration tests, cross-platform matrices, or environment-specific checks that only the full CI suite runs. So it reduces wasted CI cycles without being a substitute for CI; assuming it guarantees a green CI run or replaces CI entirely is the common mistake here.",
      explanation_he:
        "קבוצת בדיקות מהירה ב-pre-push תופסת קוד שבור באופן ברור מוקדם ונותנת משוב מהיר, אבל היא בכוונה subset - היא בדרך כלל מדלגת על בדיקות אינטגרציה איטיות, מטריצות חוצות-פלטפורמות, או בדיקות ספציפיות לסביבה שרק חבילת ה-CI המלאה מריצה. אז היא מפחיתה מחזורי CI מבוזבזים בלי להיות תחליף ל-CI; ההנחה שהיא מבטיחה ריצת CI ירוקה או מחליפה את ה-CI לחלוטין היא הטעות הנפוצה כאן.",
      resourceTitle: "pre-commit framework — Advanced usage",
      resourceUrl: "https://pre-commit.com/#confining-hooks-to-run-at-certain-stages",
      keywords: ["pre-push", "test subset", "ci"],
      tooltipTerms: [],
    },
    {
      id: "hok-012",
      providers: ["neutral"],
      domains: ["hooks", "governance"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A repository's pre-commit hooks are enforced only client-side. A contributor runs `git commit --no-verify` to skip them. What does this imply for a team that relies on pre-commit hooks as its only secret-scanning defense?",
      question_he:
        "hooks מסוג pre-commit ב-repository נאכפים רק בצד הלקוח (client-side). תורם מריץ `git commit --no-verify` כדי לדלג עליהם. מה זה אומר עבור צוות שמסתמך על hooks מסוג pre-commit כהגנת סריקת secrets היחידה שלו?",
      options: [
        "The defense can be bypassed by any developer who chooses to, so it should be paired with server-side or CI-side scanning as a backstop",
        "This is impossible; Git has no way to skip hooks",
        "It has no security implication because --no-verify is disabled by default in every Git installation",
        "It only affects commit messages, not file contents",
      ],
      options_he: [
        "ניתן לעקוף את ההגנה על ידי כל מפתח שבוחר בכך, ולכן יש לשלב אותה עם סריקה בצד השרת או ב-CI כגיבוי",
        "זה בלתי אפשרי; ל-Git אין דרך לדלג על hooks",
        "אין לזה השלכה אבטחתית מכיוון ש-‎--no-verify מבוטל כברירת מחדל בכל התקנת Git",
        "זה משפיע רק על הודעות commit, לא על תוכן הקבצים",
      ],
      correctAnswer: 0,
      explanation:
        "`--no-verify` is a standard, always-available Git flag that skips commit hooks, and there is no client-side way to prevent a local user from using it — client-side hooks are a convenience/early-warning layer, not an enforcement boundary. Any control that must actually be guaranteed (like blocking secrets from ever reaching a shared history) needs a server-side check (pre-receive hook, or a CI/PR gate) that the contributor cannot opt out of.",
      explanation_he:
        "‎`--no-verify` הוא דגל Git סטנדרטי, זמין תמיד, שמדלג על hooks של commit, ואין דרך בצד הלקוח למנוע ממשתמש מקומי להשתמש בו - hooks בצד הלקוח הם שכבת נוחות/אזהרה מוקדמת, לא גבול אכיפה. כל בקרה שחייבת להיות מובטחת בפועל (כמו חסימת secrets מלהגיע אי פעם להיסטוריה משותפת) צריכה בדיקה בצד השרת (hook מסוג pre-receive, או שער CI/PR) שהתורם לא יכול לבחור לוותר עליה.",
      resourceTitle: "git-commit — Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---no-verify",
      keywords: ["no-verify", "bypass", "server-side enforcement"],
      tooltipTerms: ["Secret Scanning"],
    },
    {
      id: "hok-013",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "Which statement best describes a hook in an AI-agent coding tool that runs before the agent executes a shell command?",
      question_he:
        "איזה משפט מתאר בצורה הטובה ביותר hook בכלי קידוד עם סוכן AI שרץ לפני שהסוכן מבצע פקודת shell?",
      options: [
        "It acts as an independent guardrail that can inspect or block the proposed command, without relying on the agent's own judgment about whether the command is safe",
        "It replaces the need for the agent to have any permission system at all",
        "It can only log commands after they have already run, not before",
        "It is identical in purpose to a post-commit git hook",
      ],
      options_he: [
        "הוא פועל כמנגנון הגנה עצמאי (guardrail) שיכול לבדוק או לחסום את הפקודה המוצעת, מבלי להסתמך על שיפוט הסוכן עצמו לגבי אם הפקודה בטוחה",
        "הוא מחליף את הצורך של הסוכן במערכת הרשאות כלשהי",
        "הוא יכול רק לתעד פקודות אחרי שהן כבר רצו, לא לפני",
        "הוא זהה במטרתו ל-git hook מסוג post-commit",
      ],
      correctAnswer: 0,
      explanation:
        "A pre-action hook in an agent tool runs before the proposed action (e.g. a shell command or file write) takes effect, and can validate it against rules — like blocking `rm -rf` on protected paths — regardless of what the agent 'decided' was safe. That is the point: it is an operational guardrail layer that does not depend on trusting the model's own reasoning, which is different from a post-commit git hook that only observes after the fact.",
      explanation_he:
        "hook שרץ לפני פעולה בכלי סוכן רץ לפני שהפעולה המוצעת (למשל פקודת shell או כתיבת קובץ) נכנסת לתוקף, ויכול לאמת אותה מול כללים - כמו חסימת `rm -rf` על נתיבים מוגנים - ללא קשר למה שהסוכן 'החליט' שבטוח. זה בדיוק העניין: זו שכבת הגנה תפעולית (guardrail) שלא תלויה באמון בשיפוט של המודל עצמו, בשונה מ-git hook מסוג post-commit שרק צופה אחרי המעשה.",
      resourceTitle: "Hooks reference — Claude Code Docs",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      keywords: ["agent hooks", "guardrails", "pre-action validation"],
      tooltipTerms: ["Guardrails", "Agent"],
    },
    {
      id: "hok-014",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "In Claude Code's documented hooks feature, a hook configured to run before a tool call can prevent that tool call from executing.",
      question_he:
        "בפיצ'ר ה-hooks המתועד של Claude Code, hook שמוגדר לרוץ לפני קריאת כלי (tool call) יכול למנוע מקריאת הכלי הזו לרוץ.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Claude Code's hooks system lets a configured command run before a tool executes and, based on its exit status/output, block or modify that execution — for example rejecting a proposed edit to a sensitive file. This is what makes it useful as an enforcement layer rather than just a logging mechanism: the check happens before the side effect, not merely alongside or after it.",
      explanation_he:
        "מערכת ה-hooks של Claude Code מאפשרת לפקודה מוגדרת לרוץ לפני שכלי מתבצע ו, בהתבסס על מצב היציאה/פלט שלה, לחסום או לשנות את ההרצה הזו - למשל לדחות שינוי מוצע לקובץ רגיש. זה מה שהופך אותה לשכבת אכיפה שימושית ולא רק מנגנון תיעוד: הבדיקה קורית לפני תופעת הלוואי, לא רק לצדה או אחריה.",
      resourceTitle: "Hooks reference — Claude Code Docs",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      keywords: ["claude code", "pre-tool-use hook", "blocking"],
      tooltipTerms: ["Agent", "Guardrails"],
    },
    {
      id: "hok-015",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A repository ships a `post-merge` hook that automatically runs a dependency install whenever a merge brings in a changed lockfile. What is the most accurate description of what this hook accomplishes?",
      question_he:
        "repository מגיע עם hook מסוג `post-merge` שמריץ אוטומטית התקנת תלויות בכל פעם ש-merge מביא lockfile שהשתנה. מהו התיאור המדויק ביותר של מה שה-hook הזה משיג?",
      options: [
        "It saves developers from forgetting to reinstall dependencies after pulling changes that update the lockfile, since it runs automatically right after the merge completes",
        "It prevents the merge from completing until dependencies are installed",
        "It runs before the merge to decide whether the merge should be allowed",
        "It replaces the need for a lockfile entirely",
      ],
      options_he: [
        "זה חוסך מהמפתחים לשכוח להתקין מחדש תלויות אחרי pull של שינויים שמעדכנים את ה-lockfile, מכיוון שהוא רץ אוטומטית מיד אחרי שה-merge מסתיים",
        "זה מונע מה-merge להסתיים עד שהתלויות מותקנות",
        "זה רץ לפני ה-merge כדי להחליט אם ה-merge צריך להיות מותר",
        "זה מחליף לחלוטין את הצורך ב-lockfile",
      ],
      correctAnswer: 0,
      explanation:
        "post-merge runs after a merge finishes, so it cannot gate or block the merge itself — its role is purely a follow-up convenience, such as noticing the lockfile changed and reinstalling automatically so the developer doesn't hit confusing errors from stale dependencies. Any hook meant to approve or reject the merge would need to run beforehand (e.g. checks on the branch prior to merging), which post-merge structurally cannot do.",
      explanation_he:
        "post-merge רץ אחרי שה-merge מסתיים, ולכן הוא לא יכול לשמש שער או לחסום את ה-merge עצמו - תפקידו הוא נוחות המשך גרידא, כמו לשים לב שה-lockfile השתנה ולהתקין מחדש באופן אוטומטי כדי שהמפתח לא ייתקל בשגיאות מבלבלות מתלויות מיושנות. כל hook שאמור לאשר או לדחות את ה-merge צריך לרוץ לפני כן (למשל בדיקות על הענף לפני המיזוג), דבר ש-post-merge לא יכול לעשות מבחינה מבנית.",
      resourceTitle: "githooks - Git SCM Documentation",
      resourceUrl: "https://git-scm.com/docs/githooks#_post_merge",
      keywords: ["post-merge", "lifecycle", "hook stages"],
      tooltipTerms: [],
    },
    {
      id: "hok-016",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A company enforces secret scanning only through a client-side pre-commit hook distributed via a setup script that developers must run once after cloning. Which gap in this design is most likely to let a secret slip through in practice?",
      question_he:
        "חברה אוכפת סריקת secrets רק דרך hook מסוג pre-commit בצד הלקוח שמופץ באמצעות סקריפט הגדרה (setup script) שהמפתחים צריכים להריץ פעם אחת אחרי clone. איזה פער בעיצוב הזה הכי סביר לאפשר ל-secret לחמוק בפועל?",
      options: [
        "A developer who never ran the setup script, or who commits from a different machine/CI job/IDE plugin, will have no hook installed at all, so nothing scans their commit",
        "Pre-commit hooks cannot detect credential-shaped strings under any circumstances",
        "Client-side hooks run slower than server-side hooks, which is the primary risk",
        "The setup script itself is a security risk because it modifies .git/hooks",
      ],
      options_he: [
        "מפתח שמעולם לא הריץ את סקריפט ה-setup, או שעושה commit ממכונה/משימת CI/plugin של IDE שונה, לא יהיה לו כלל hook מותקן, כך שדבר לא סורק את ה-commit שלו",
        "hooks מסוג pre-commit לא יכולים לזהות מחרוזות שנראות כמו credentials בשום נסיבות",
        "hooks בצד הלקוח רצים לאט יותר מ-hooks בצד השרת, וזה הסיכון העיקרי",
        "סקריפט ה-setup עצמו הוא סיכון אבטחתי מכיוון שהוא משנה את .git/hooks",
      ],
      correctAnswer: 0,
      explanation:
        "The structural weakness is coverage, not detection accuracy: because hook installation is an opt-in step per clone/machine, any workflow that doesn't go through that setup — a fresh clone someone forgot to configure, a CI runner, a different editor's integrated terminal — commits with no scanning at all. This is why teams that are serious about preventing secret leaks add a server-side or CI-side scan as well, since it applies uniformly regardless of what ran locally.",
      explanation_he:
        "החולשה המבנית היא כיסוי, לא דיוק זיהוי: מכיוון שהתקנת ה-hook היא שלב הצטרפות מכוון (opt-in) לכל clone/מכונה, כל workflow שלא עובר דרך אותה הגדרה - clone חדש שמישהו שכח להגדיר, runner של CI, טרמינל משולב של עורך שונה - עושה commit ללא סריקה כלל. זו הסיבה שצוותים שרציניים לגבי מניעת דליפת secrets מוסיפים גם סריקה בצד השרת או ב-CI, מכיוון שהיא חלה באופן אחיד ללא קשר למה שרץ מקומית.",
      resourceTitle: "GitHub Docs — About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning",
      keywords: ["coverage gap", "opt-in hooks", "server-side scanning"],
      tooltipTerms: ["Secret Scanning", "Secret"],
    },
    {
      id: "hok-017",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "Which of the following are legitimate reasons to prefer a server-side (e.g. pre-receive) hook or CI-side gate over relying solely on client-side git hooks for a security-critical control? (Select all that apply.)",
      question_he:
        "אילו מהבאים הן סיבות לגיטימיות להעדיף hook בצד השרת (למשל pre-receive) או שער בצד ה-CI על פני הסתמכות בלעדית על git hooks בצד הלקוח, עבור בקרה קריטית מבחינת אבטחה? (בחרו את כל האפשרויות הרלוונטיות.)",
      options: [
        "Client-side hooks can be skipped with flags like --no-verify or simply never installed",
        "Server-side controls apply uniformly to every contributor and every client, regardless of local configuration",
        "Client-side hooks run inside a fully sandboxed, tamper-proof environment that no developer can alter",
        "Server-side hooks cannot be bypassed by a developer who has push access but not admin access to change the enforcement itself",
      ],
      options_he: [
        "ניתן לדלג על hooks בצד הלקוח עם דגלים כמו ‎--no-verify או פשוט מעולם לא להתקין אותם",
        "בקרות בצד השרת חלות באופן אחיד על כל תורם וכל לקוח, ללא קשר להגדרה המקומית",
        "hooks בצד הלקוח רצים בתוך סביבת sandbox מלאה שאין אפשרות לחבל בה, שאף מפתח לא יכול לשנות",
        "לא ניתן לעקוף hooks בצד השרת על ידי מפתח שיש לו גישת push אך לא גישת admin לשנות את האכיפה עצמה",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "The real advantages of server-side/CI enforcement are that it cannot be skipped by a local flag, it doesn't depend on each developer having installed or kept an up-to-date hook, and a normal contributor lacks the privilege to disable it. Client-side hooks run as ordinary, fully editable scripts on the developer's own machine — there's no sandbox or tamper-proofing involved, which is exactly why they're a convenience layer rather than an enforcement boundary.",
      explanation_he:
        "היתרונות האמיתיים של אכיפה בצד השרת/CI הם שלא ניתן לדלג עליה עם דגל מקומי, היא לא תלויה בכך שכל מפתח התקין או שמר hook מעודכן, ולתורם רגיל אין הרשאה לבטל אותה. hooks בצד הלקוח רצים כסקריפטים רגילים, ניתנים לעריכה מלאה, על המחשב של המפתח עצמו - אין sandbox או הגנה מפני חבלה מעורבים, וזו בדיוק הסיבה שהם שכבת נוחות ולא גבול אכיפה.",
      resourceTitle: "GitHub Docs — Managing rulesets",
      resourceUrl: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets",
      keywords: ["server-side enforcement", "bypass resistance", "rulesets"],
      tooltipTerms: [],
    },
    {
      id: "hok-018",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A CI pipeline hook automatically deploys to production whenever a commit lands on main, with no visible log of which checks passed and no notification to the team. Six months later, a bad deploy goes unnoticed for hours. What design principle was violated here?",
      question_he:
        "hook בצינור CI פורס אוטומטית ל-production בכל פעם שcommit נוחת על main, ללא לוג נראה לעין של אילו בדיקות עברו וללא התראה לצוות. שישה חודשים לאחר מכן, deploy גרוע נשאר בלתי מבחין במשך שעות. איזה עקרון עיצוב הופר כאן?",
      options: [
        "Automation should remain visible and explainable — a hook that takes a significant action silently, without clear evidence of what happened, makes it hard to notice and diagnose problems quickly",
        "CI pipelines should never deploy code automatically under any circumstances",
        "The commit that triggered the deploy must have been made with --no-verify",
        "Hooks should always require manual approval for every single commit, with no automation allowed",
      ],
      options_he: [
        "אוטומציה צריכה להישאר נראית וניתנת להסבר - hook שמבצע פעולה משמעותית בשקט, ללא עדות ברורה למה שקרה, מקשה לשים לב לבעיות ולאבחן אותן במהירות",
        "צינורות CI לעולם לא צריכים לפרוס קוד באופן אוטומטי בשום נסיבות",
        "ה-commit שהפעיל את ה-deploy חייב היה להיעשות עם ‎--no-verify",
        "hooks צריכים תמיד לדרוש אישור ידני לכל commit בודד, ללא אוטומציה מותרת",
      ],
      correctAnswer: 0,
      explanation:
        "The failure isn't automation itself — automated deploys are common and reasonable — it's that this pipeline acted invisibly: no logs of what ran, no notification of the outcome, so a bad deploy could sit undetected for hours. Good hook/pipeline design keeps automated actions observable (structured logs, alerts on failure, deploy notifications) precisely so that when something goes wrong, someone finds out quickly instead of automation quietly hiding the problem.",
      explanation_he:
        "הכשל הוא לא האוטומציה עצמה - deploy אוטומטי הוא נפוץ וסביר - אלא שהצינור הזה פעל באופן בלתי נראה: אין לוגים של מה רץ, אין התראה על התוצאה, כך ש-deploy גרוע יכול היה לשבת בלתי מבחין במשך שעות. עיצוב טוב של hook/pipeline שומר על פעולות אוטומטיות נראות לעין (לוגים מובנים, התראות על כישלון, הודעות deploy) בדיוק כדי שכשמשהו משתבש, מישהו יגלה מהר במקום שהאוטומציה תסתיר את הבעיה בשקט.",
      resourceTitle: "GitHub Actions — Understanding GitHub Actions",
      resourceUrl: "https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions",
      keywords: ["observability", "silent automation", "deploy hooks"],
      tooltipTerms: [],
    },
    {
      id: "hok-019",
      providers: ["neutral"],
      domains: ["hooks", "scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A secret-scanning pre-commit hook uses a regex list to detect credential-shaped strings, and a developer complains it occasionally flags a clearly fake test fixture like `AWS_KEY=AKIAEXAMPLE0000000`. What is the most defensible fix that preserves the hook's protective value?",
      question_he:
        "hook מסוג pre-commit לסריקת secrets משתמש ברשימת regex כדי לזהות מחרוזות שנראות כמו credentials, ומפתח מתלונן שהוא לפעמים מסמן fixture מבחן שברור שהוא מזויף כמו `AWS_KEY=AKIAEXAMPLE0000000`. מהו התיקון הכי ניתן להגנה שמשמר את הערך המגן של ה-hook?",
      options: [
        "Add a narrow, explicit allowlist entry (or an inline suppression comment) for the specific known-fake pattern, rather than disabling the scanner or lowering its sensitivity broadly",
        "Remove the secret-scanning hook entirely since false positives prove it doesn't work",
        "Tell developers to always use --no-verify when committing test fixtures",
        "Replace the regex-based scanner with no scanning at all, since regexes can never be tuned",
      ],
      options_he: [
        "להוסיף רשומת allowlist צרה ומפורשת (או הערת דיכוי inline) עבור התבנית המזויפת הידועה הספציפית, במקום לבטל את הסורק או להוריד את הרגישות שלו באופן גורף",
        "להסיר את ה-hook לסריקת secrets לחלוטין מכיוון שחיוביים כוזבים מוכיחים שהוא לא עובד",
        "להגיד למפתחים תמיד להשתמש ב-‎--no-verify כשעושים commit ל-fixtures של מבחנים",
        "להחליף את הסורק מבוסס ה-regex בלי סריקה בכלל, מכיוון שאי אפשר לכוונן regexes לעולם",
      ],
      correctAnswer: 0,
      explanation:
        "The right fix targets the specific false positive narrowly — an allowlist entry or inline suppression tied to the exact known-fake value — so the scanner keeps catching everything else. Removing the hook, broadly lowering sensitivity, or training developers to routinely bypass checks with --no-verify all destroy the hook's protective value for the sake of one annoyance, which is a worse trade than a small amount of scanner tuning.",
      explanation_he:
        "התיקון הנכון מכוון בצורה צרה לחיובי הכוזב הספציפי - רשומת allowlist או דיכוי inline הקשור לערך המזויף הידוע המדויק - כך שהסורק ממשיך לתפוס כל דבר אחר. הסרת ה-hook, הורדת רגישות באופן גורף, או אימון מפתחים לעקוף כללים באופן שגרתי עם ‎--no-verify כולם הורסים את הערך המגן של ה-hook לטובת מטרד אחד, וזו עסקה גרועה יותר מכוונון קטן של הסורק.",
      resourceTitle: "GitHub Docs — About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning",
      keywords: ["false positive", "allowlist", "scanner tuning"],
      tooltipTerms: ["Secret Scanning", "Secret"],
    },
    {
      id: "hok-020",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "true-false",
      question:
        "A pre-action hook that blocks an AI agent from running a destructive shell command is a substitute for giving the agent least-privilege access in the first place.",
      question_he:
        "hook שרץ לפני פעולה וחוסם מסוכן AI מהרצת פקודת shell הרסנית הוא תחליף לתת לסוכן גישה בעקרון least privilege מלכתחילה.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "A pre-action hook and least-privilege access are complementary layers, not substitutes for each other: the hook can only block the specific patterns it was written to recognize, so an unanticipated dangerous command can slip through if the hook's rules don't cover it. Restricting the agent's actual privileges up front (limited filesystem access, scoped credentials) shrinks the blast radius even when a hook fails to catch something, which is why defense-in-depth uses both rather than treating either as sufficient alone.",
      explanation_he:
        "hook שרץ לפני פעולה וגישה לפי least privilege הן שכבות משלימות, לא תחליפים זו לזו: ה-hook יכול לחסום רק את הדפוסים הספציפיים שנכתב לזהות, כך שפקודה מסוכנת בלתי צפויה יכולה לחמוק אם כללי ה-hook לא מכסים אותה. הגבלת ההרשאות בפועל של הסוכן מראש (גישה מוגבלת למערכת קבצים, credentials מוגדרים בהיקף) מקטינה את רדיוס הנזק גם כשה-hook נכשל לתפוס משהו, וזו הסיבה שהגנה-לעומק (defense-in-depth) משתמשת בשתיהן במקום להתייחס לאחת מהן כמספיקה לבדה.",
      resourceTitle: "Hooks reference — Claude Code Docs",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      keywords: ["least privilege", "defense in depth", "agent guardrails"],
      tooltipTerms: ["Least Privilege", "Guardrails", "Agent"],
    },
    {
      id: "hok-021",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team is designing a hook that automatically blocks an AI coding agent from writing to any file matching `.env*`. Which design choices genuinely improve the safety and transparency of this guardrail? (Select all that apply.)",
      question_he:
        "צוות מעצב hook שחוסם אוטומטית סוכן קידוד AI מכתיבה לכל קובץ שתואם ל-`.env*`. אילו בחירות עיצוב באמת משפרות את הבטיחות והשקיפות של ה-guardrail הזה? (בחרו את כל האפשרויות הרלוונטיות.)",
      options: [
        "Logging every blocked attempt with enough detail (which file, which action) for a human to review later",
        "Returning a clear error to the agent explaining why the write was blocked, so it can adapt its next step instead of retrying blindly",
        "Silently allowing the write to succeed but logging it afterward, so the agent's workflow is never interrupted",
        "Making the block rule pattern-based and reviewable in version control, rather than hardcoded in a way only one engineer understands",
      ],
      options_he: [
        "לתעד כל ניסיון חסום בפירוט מספיק (איזה קובץ, איזו פעולה) כדי שבן אדם יוכל לבדוק מאוחר יותר",
        "להחזיר לסוכן שגיאה ברורה שמסבירה למה הכתיבה נחסמה, כך שהוא יכול להתאים את הצעד הבא שלו במקום לנסות שוב בעיוורון",
        "לאפשר בשקט לכתיבה להצליח אבל לתעד אותה לאחר מעשה, כך שזרימת העבודה של הסוכן לעולם לא תופרע",
        "להפוך את כלל החסימה למבוסס-תבנית וניתן לבדיקה בבקרת גרסאות, במקום מקודד קשיח (hardcoded) בצורה שרק מהנדס אחד מבין",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Good guardrail design blocks before the side effect happens (not after), logs enough detail for a human to audit later, gives the agent actionable feedback so it can course-correct, and keeps the rule itself reviewable rather than a mystery only one person understands. Letting the write succeed and only logging it afterward defeats the entire purpose of a preventive guardrail — by then the secret is already on disk, which is the exact failure mode the hook was meant to avoid.",
      explanation_he:
        "עיצוב guardrail טוב חוסם לפני שתופעת הלוואי קורית (לא אחריה), מתעד פירוט מספיק כדי שבן אדם יבדוק מאוחר יותר, נותן לסוכן משוב שניתן לפעול לפיו כדי שיוכל לתקן כיוון, ושומר על הכלל עצמו ניתן לבדיקה במקום תעלומה שרק אדם אחד מבין. לאפשר לכתיבה להצליח ולתעד אותה רק לאחר מעשה מבטל את כל המטרה של guardrail מונע - עד אז ה-secret כבר על הדיסק, וזה בדיוק מצב הכישלון שה-hook נועד למנוע.",
      resourceTitle: "Hooks reference — Claude Code Docs",
      resourceUrl: "https://docs.anthropic.com/en/docs/claude-code/hooks",
      keywords: ["guardrail design", "agent hooks", "transparency"],
      tooltipTerms: ["Guardrails", "Agent", ".env File"],
    },
    {
      id: "hok-022",
      providers: ["neutral"],
      domains: ["hooks"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A repository's pre-commit hook config runs a secret scanner only against files that were newly added in the commit, not files that were merely modified. Why might this leave a real gap?",
      question_he:
        "הגדרת hook מסוג pre-commit ב-repository מריצה סורק secrets רק על קבצים שנוספו לאחרונה ב-commit, לא על קבצים ששונו בלבד. למה זה עלול להשאיר פער אמיתי?",
      options: [
        "A secret can be introduced by editing an existing tracked file (e.g. appending a credential to an existing config file), which the scanner would never inspect under this scope",
        "Modified files are always scanned twice, so the gap is only theoretical",
        "Git does not allow secrets to be added to existing files, only new ones",
        "This configuration actually scans more files than one that includes modified files",
      ],
      options_he: [
        "ניתן להכניס secret על ידי עריכת קובץ עוקב קיים (למשל הוספת credential לקובץ הגדרות קיים), דבר שהסורק לעולם לא היה בודק תחת ההיקף הזה",
        "קבצים ששונו נסרקים תמיד פעמיים, כך שהפער הוא תיאורטי בלבד",
        "Git לא מאפשר להוסיף secrets לקבצים קיימים, רק לחדשים",
        "התצורה הזו בפועל סורקת יותר קבצים מתצורה שכוללת קבצים ששונו",
      ],
      correctAnswer: 0,
      explanation:
        "Scoping the scan to only newly added files misses the very common case where a secret is added as a line inside an already-tracked file — like appending a new API key to an existing `config.yml` that was already committed before. A correct scope needs to include the diff of modified files (not just wholly new ones), since the scanner needs to see every changed line, not just every changed file's existence.",
      explanation_he:
        "הגבלת הסריקה רק לקבצים שנוספו לאחרונה מפספסת את המקרה הנפוץ מאוד שבו secret מתווסף כשורה בתוך קובץ עוקב קיים - כמו הוספת מפתח API חדש לקובץ `config.yml` קיים שכבר נעשה לו commit קודם לכן. היקף נכון צריך לכלול את ה-diff של קבצים ששונו (לא רק קבצים חדשים לגמרי), מכיוון שהסורק צריך לראות כל שורה ששונתה, לא רק את קיומו של כל קובץ ששונה.",
      resourceTitle: "GitHub Docs — About secret scanning",
      resourceUrl: "https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning",
      keywords: ["scan scope", "modified files", "secret scanning gap"],
      tooltipTerms: ["Secret Scanning", "Secret"],
    },
  ],
});
