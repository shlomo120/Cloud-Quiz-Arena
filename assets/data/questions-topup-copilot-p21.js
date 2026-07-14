/**
 * questions-topup-copilot-p21.js — Phase 21 coverage top-up: Copilot (12 questions).
 * Deepens thin difficulty slices, especially Advanced. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-copilot-p21",
  label: "Copilot — Phase 21 Top-up",
  questions: [
    {
      id: "p21-cop-001",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer accepts a Copilot-suggested function, and the team's existing unit test suite passes without any failures. What is the most important thing to remember about this result?",
      question_he:
        "מפתח מקבל פונקציה שהוצעה על ידי Copilot, וחבילת ה-unit tests הקיימת של הצוות עוברת ללא כשלים. מהו הדבר החשוב ביותר לזכור לגבי התוצאה הזו?",
      options: [
        "Passing tests prove the code is fully correct and secure in every scenario",
        "Tests only confirm correct behavior for the cases they actually cover — untested edge cases can still hide bugs",
        "If the tests pass, code review of the suggestion can be skipped",
        "Copilot only suggests code that was already designed to match this specific test suite",
      ],
      options_he: [
        "tests עוברים מוכיחים שהקוד נכון ומאובטח לחלוטין בכל תרחיש",
        "tests מאשרים התנהגות נכונה רק עבור המקרים שהם בפועל בודקים — edge cases שלא נבדקו עדיין עלולים להסתיר באגים",
        "אם ה-tests עוברים, אפשר לדלג על code review של ההצעה",
        "Copilot מציע קוד שכבר תוכנן במיוחד כדי להתאים לחבילת ה-tests הזו",
      ],
      correctAnswer: 1,
      explanation:
        "A green test suite only validates the scenarios the tests actually exercise; it says nothing about inputs, edge cases, or conditions the suite never checks. Copilot has no awareness of what the existing tests do or don't cover, so 'tests passed' is a much weaker signal than it feels like. Treating passing tests as proof of overall correctness — rather than as coverage of specific cases — is exactly how coverage gaps slip into production.",
      explanation_he:
        "חבילת tests שעוברת בהצלחה מאמתת רק את התרחישים שה-tests בפועל בודקים; היא לא אומרת דבר על קלטים, edge cases או תנאים שהחבילה מעולם לא בדקה. ל-Copilot אין מודעות למה שה-tests הקיימים בודקים או לא בודקים, ולכן 'ה-tests עברו' הוא סימן חלש בהרבה ממה שהוא נראה. התייחסות ל-tests עוברים כהוכחה לנכונות כללית — במקום ככיסוי של מקרים ספציפיים — היא בדיוק האופן שבו פערי כיסוי מחלחלים לסביבת production.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["testing", "coverage", "code review"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-002",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team consistently wraps every database call in a custom `withRetry()` helper. Copilot suggests a new query that works correctly but does not use `withRetry()`. Why might this happen even though the suggested code runs fine?",
      question_he:
        "צוות עוטף באופן עקבי כל קריאת database ב-helper מותאם אישית בשם `withRetry()`. Copilot מציע query חדש שפועל נכון אך אינו משתמש ב-`withRetry()`. מדוע זה עלול לקרות למרות שהקוד המוצע רץ תקין?",
      options: [
        "Copilot intentionally avoids using project-specific helper functions",
        "Copilot generates suggestions based on common patterns and its visible context, and may not always apply project-specific conventions",
        "The suggestion must contain a hidden bug because it doesn't use withRetry",
        "withRetry is deprecated and Copilot correctly avoided it",
      ],
      options_he: [
        "Copilot נמנע במכוון משימוש ב-helper functions ייעודיים לפרויקט",
        "Copilot מייצר הצעות המבוססות על patterns נפוצים והקונטקסט הגלוי לו, ולא תמיד מיישם conventions ייחודיים לפרויקט",
        "ההצעה חייבת להכיל באג נסתר כי היא לא משתמשת ב-withRetry",
        "withRetry הוא deprecated ו-Copilot נמנע ממנו בצדק",
      ],
      correctAnswer: 1,
      explanation:
        "Copilot's suggestions are shaped by common coding patterns and whatever context is visible, not by a deep understanding of a specific team's internal conventions. A suggestion can be functionally correct and still fail to follow established project patterns like retry wrappers, logging helpers, or error-handling styles. That inconsistency increases maintenance cost even when nothing is technically broken, so reviewers need to check for convention fit, not just correctness.",
      explanation_he:
        "ההצעות של Copilot מעוצבות על ידי patterns נפוצים בקוד וכל מה שגלוי לו כקונטקסט, ולא על ידי הבנה עמוקה של conventions פנימיים ספציפיים לצוות. הצעה יכולה להיות תקינה מבחינה פונקציונלית ועדיין לא לעקוב אחרי patterns מבוססים בפרויקט כמו retry wrappers, helpers ללוגים, או סגנון טיפול בשגיאות. אי-ההתאמה הזו מגדילה את עלות התחזוקה גם כשאין תקלה טכנית, ולכן על הבודקים לבדוק התאמה ל-conventions ולא רק נכונות.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["conventions", "code style", "consistency"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-003",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Copilot can suggest calling a third-party library or API using an outdated or deprecated version, because its training data reflects code written at various points in time, including older releases.",
      question_he:
        "Copilot עלול להציע שימוש בספריית צד שלישי או API בגרסה מיושנת או deprecated, מכיוון שנתוני ה-training שלו משקפים קוד שנכתב בנקודות זמן שונות, כולל גרסאות ישנות.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Because Copilot was trained on a broad snapshot of existing code, it can reproduce patterns that use older, deprecated, or even known-vulnerable versions of a library's API. It has no live awareness of which package versions are currently supported or patched. Developers still need to verify suggested dependency usage against current documentation and vulnerability advisories, the same way they would for any manually written import.",
      explanation_he:
        "מכיוון ש-Copilot אומן על תמונת מצב רחבה של קוד קיים, הוא עלול לשחזר patterns שמשתמשים בגרסאות ישנות, deprecated או אפילו בעלות פגיעויות ידועות של API של ספרייה. אין לו מודעות בזמן אמת לאיזו גרסת חבילה נתמכת או מתוקנת כרגע. מפתחים עדיין צריכים לאמת שימוש מוצע בתלויות מול תיעוד עדכני ו-vulnerability advisories, בדיוק כפי שהיו עושים עבור import שנכתב ידנית.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["dependencies", "supply chain", "deprecated"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-004",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "Copilot suggests input-validation logic for a new endpoint that looks reasonable on its own, but a nearly identical endpoint elsewhere in the same file uses a noticeably different validation approach. What is the most likely explanation?",
      question_he:
        "Copilot מציע לוגיקת input-validation ל-endpoint חדש שנראית סבירה כשלעצמה, אך endpoint כמעט זהה במקום אחר באותו קובץ משתמש בגישת validation שונה בבירור. מהו ההסבר הסביר ביותר?",
      options: [
        "Copilot deliberately introduces inconsistency to encourage developers to review carefully",
        "Copilot's suggestions are generated primarily from the immediately visible context, so it may not 'see' and match a pattern used elsewhere in a large file",
        "This cannot happen, because Copilot always scans the entire repository before suggesting anything",
        "The other endpoint's validation approach must be the one that is wrong",
      ],
      options_he: [
        "Copilot מכניס חוסר עקביות במכוון כדי לעודד בדיקה קפדנית יותר",
        "ההצעות של Copilot נוצרות בעיקר מהקונטקסט הגלוי המיידי, כך שהוא עלול 'לא לראות' ולא להתאים pattern שמשמש במקום אחר בקובץ גדול",
        "זה לא יכול לקרות, כי Copilot תמיד סורק את כל ה-repository לפני שהוא מציע משהו",
        "גישת ה-validation של ה-endpoint האחר היא בהכרח זו שגויה",
      ],
      correctAnswer: 1,
      explanation:
        "Copilot's suggestions are strongly influenced by the context it has visibility into at the moment of suggestion, which in a very large file may not include patterns established far away in the same file. This is a limitation distinct from the code simply being 'wrong' — the suggestion can be locally reasonable while still conflicting with an established codebase convention it never saw. Recognizing this helps explain why suggestions in large files need extra cross-checking against the rest of the codebase.",
      explanation_he:
        "ההצעות של Copilot מושפעות מאוד מהקונטקסט שהוא רואה ברגע ההצעה, שבקובץ גדול מאוד עשוי לא לכלול patterns שנקבעו במקום רחוק באותו קובץ. זו מגבלה שונה מסתם 'קוד שגוי' — ההצעה יכולה להיות סבירה מקומית ובכל זאת לסתור convention מבוסס בקוד שהוא מעולם לא ראה. הבנת זה מסבירה מדוע הצעות בקבצים גדולים דורשות בדיקה צולבת נוספת מול שאר ה-codebase.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["context window", "large files", "consistency"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-005",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A junior developer routinely accepts Copilot's suggestions for algorithms and data structures without reading through them line by line, since the code 'looks right' and compiles. Six months later, they struggle to solve a similar problem unaided. What longer-term risk does this illustrate?",
      question_he:
        "מפתח junior מקבל באופן שגרתי הצעות של Copilot לאלגוריתמים ומבני נתונים בלי לקרוא אותן שורה-שורה, מכיוון שהקוד 'נראה נכון' ומתקמפל. כעבור שישה חודשים, הוא מתקשה לפתור בעיה דומה ללא עזרה. איזה סיכון ארוך-טווח זה ממחיש?",
      options: [
        "That Copilot suggestions are inherently of lower quality for junior developers",
        "That habitually accepting suggestions without understanding them can slow the development of a developer's own problem-solving skills, leaving gaps that surface when unaided work is required",
        "That junior developers should be prohibited from using AI coding assistants entirely",
        "That this risk only applies to security-related code, not general algorithms",
      ],
      options_he: [
        "שהצעות Copilot הן מטבען באיכות נמוכה יותר עבור מפתחי junior",
        "שקבלת הצעות מתוך הרגל בלי להבין אותן עלולה להאט את התפתחות כישורי פתרון הבעיות של המפתח, ולהשאיר פערים שמתגלים כשנדרשת עבודה ללא סיוע",
        "שיש לאסור לחלוטין על מפתחי junior להשתמש בכלי AI לכתיבת קוד",
        "שהסיכון הזה חל רק על קוד הקשור לאבטחה, לא על אלגוריתמים כלליים",
      ],
      correctAnswer: 1,
      explanation:
        "The risk here is a process/skill-development one, not a bug in any single suggestion: accepting code without engaging with why it works trades short-term speed for long-term understanding. Over time this can leave a developer less able to debug, extend, or reason about similar problems independently. The fix isn't banning the tool but ensuring suggestions are actively understood, not just accepted, especially early in a developer's growth.",
      explanation_he:
        "הסיכון כאן הוא סיכון תהליכי/התפתחותי, לא באג בהצעה בודדת: קבלת קוד בלי להתעמק במדוע הוא עובד מחליפה מהירות לטווח קצר בהבנה לטווח ארוך. עם הזמן זה עלול להשאיר מפתח פחות מסוגל לבצע debug, להרחיב או לנתח בעיות דומות באופן עצמאי. הפתרון אינו איסור על הכלי אלא הבטחה שההצעות מובנות באופן פעיל, ולא רק מתקבלות, בייחוד בשלבים המוקדמים של התפתחות המפתח.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["skill development", "over-reliance", "learning"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-006",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Because Copilot can generate a large volume of code quickly, reviewers should apply the same heightened scrutiny to a large AI-assisted pull request that they would give any large, unfamiliar pull request from a human author — rather than skimming it faster on the assumption that 'the AI probably got it right.'",
      question_he:
        "מכיוון ש-Copilot יכול לייצר נפח קוד גדול במהירות, על בודקים להחיל את אותה קפדנות מוגברת על pull request גדול בסיוע AI כפי שהיו מחילים על כל pull request גדול ולא מוכר מאת מחבר אנושי — במקום לעבור עליו במהירות מתוך הנחה ש'ה-AI כנראה עשה את זה נכון'.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Volume and speed of generation don't correlate with correctness, so a large AI-assisted diff carries the same review risks as any large unfamiliar PR: hidden edge cases, inconsistent assumptions across files, and subtle logic errors that are easy to miss on a fast skim. Treating AI-authored size as a reason to review less carefully inverts the correct instinct — a bigger diff, AI-assisted or not, generally warrants more scrutiny, not less. Breaking large AI-assisted changes into smaller reviewable chunks is a practical way to keep that scrutiny effective.",
      explanation_he:
        "נפח ומהירות ייצור אינם מתואמים עם נכונות, ולכן diff גדול בסיוע AI נושא את אותם סיכוני review כמו כל PR גדול ולא מוכר: edge cases נסתרים, הנחות לא עקביות בין קבצים, ושגיאות לוגיקה עדינות שקל לפספס בסקירה מהירה. התייחסות לגודל שנוצר על ידי AI כסיבה לבדוק בפחות קפידה הופכת את האינסטינקט הנכון — diff גדול יותר, בין אם בסיוע AI ובין אם לא, בדרך כלל מצריך יותר קפידה, לא פחות. פירוק שינויים גדולים בסיוע AI לחלקים קטנים יותר הניתנים לביקורת הוא דרך מעשית לשמור על קפידה אפקטיבית.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["pull request review", "large diffs", "process"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-007",
      providers: ["neutral"],
      domains: ["copilot", "security"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following code categories deserve categorically more review scrutiny than average when a Copilot suggestion touches them, because mistakes are both harder to spot by casual reading and more damaging if wrong? (Select all that apply.)",
      question_he:
        "אילו מהקטגוריות הבאות מצריכות קפידה מוגברת באופן קטגורי מהממוצע כאשר הצעה של Copilot נוגעת בהן, מכיוון שטעויות בהן קשות יותר לזיהוי בקריאה שגרתית ומזיקות יותר אם שגויות? (בחר את כל האפשרויות הרלוונטיות.)",
      options: [
        "Authentication logic",
        "Cryptographic operations",
        "Access-control and authorization checks",
        "Console log message formatting strings",
      ],
      options_he: [
        "לוגיקת authentication",
        "פעולות קריפטוגרפיות",
        "בדיקות access-control ו-authorization",
        "מחרוזות פורמט של הודעות console log",
      ],
      correctAnswer: [0, 1, 2],
      explanation:
        "Authentication, cryptography, and authorization are categories where a subtly wrong suggestion can still compile, pass casual functional testing, and even work correctly in the common case, while quietly creating a serious vulnerability that surfaces only under specific attack conditions. Log formatting strings, by contrast, are low-stakes cosmetic code where an error is usually harmless and easy to spot. Concentrating extra review effort on the security-critical categories is a more effective use of limited reviewer attention than treating all suggestions equally.",
      explanation_he:
        "authentication, קריפטוגרפיה ו-authorization הן קטגוריות שבהן הצעה שגויה בעדינות עדיין יכולה להתקמפל, לעבור בדיקה פונקציונלית שגרתית, ואפילו לעבוד נכון במקרה הרגיל, בעוד שהיא יוצרת בשקט פגיעות חמורה שמתגלה רק בתנאי תקיפה ספציפיים. לעומת זאת, מחרוזות פורמט ללוגים הן קוד קוסמטי בסיכון נמוך שבו שגיאה בדרך כלל אינה מזיקה וקלה לזיהוי. ריכוז מאמץ בדיקה נוסף בקטגוריות הקריטיות לאבטחה הוא שימוש יעיל יותר בתשומת הלב המוגבלת של הבודק מאשר התייחסות שווה לכל ההצעות.",
      resourceTitle: "OWASP Top 10 for Large Language Model Applications",
      resourceUrl:
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["security-critical code", "authentication", "authorization"],
      tooltipTerms: ["Least Privilege"],
    },
    {
      id: "p21-cop-008",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A developer accepts a Copilot suggestion that calls `s3Client.deleteObjectsSecurely(bucket, keys)`. The build fails with 'method does not exist' because no such method is defined anywhere in the installed SDK. What does this scenario illustrate about Copilot suggestions?",
      question_he:
        "מפתח מקבל הצעה של Copilot שקוראת ל-`s3Client.deleteObjectsSecurely(bucket, keys)`. ה-build נכשל עם 'method does not exist' מכיוון ששיטה כזו לא מוגדרת בשום מקום ב-SDK המותקן. מה התרחיש הזה ממחיש לגבי הצעות של Copilot?",
      options: [
        "Copilot always verifies API signatures against the exact installed SDK version before suggesting them",
        "Copilot can produce plausible-looking but nonexistent method or parameter names, since it predicts likely-sounding code rather than checking it against real library definitions",
        "The build failure means the developer's SDK version must be out of date",
        "This kind of failure can only happen with obscure, undocumented libraries",
      ],
      options_he: [
        "Copilot תמיד מאמת חתימות API מול גרסת ה-SDK המדויקת שמותקנת לפני שהוא מציע אותן",
        "Copilot עלול לייצר שמות methods או parameters שנראים סבירים אך אינם קיימים, מכיוון שהוא חוזה קוד שנשמע סביר ולא בודק אותו מול הגדרות אמיתיות של הספרייה",
        "כשל ה-build פירושו שגרסת ה-SDK של המפתח בהכרח מיושנת",
        "כשל מסוג זה יכול לקרות רק בספריות נדירות ולא מתועדות",
      ],
      correctAnswer: 1,
      explanation:
        "This is the 'hallucinated API' failure mode: Copilot generates text that statistically resembles plausible code, including method names that sound like something a well-designed SDK would have, even when no such method exists. It has no built-in mechanism to check a suggestion against the actual, currently installed library definitions. This is a distinct risk from suggesting insecure-but-real code — here the suggestion simply refers to something that was never real, and it can affect popular, well-documented libraries just as easily as obscure ones.",
      explanation_he:
        "זהו מצב כשל של 'hallucinated API': Copilot מייצר טקסט שדומה סטטיסטית לקוד סביר, כולל שמות methods שנשמעים כאילו SDK מתוכנן היטב היה כולל, גם כשאין שיטה כזו בפועל. אין לו מנגנון מובנה לבדוק הצעה מול ההגדרות האמיתיות והמותקנות בפועל של הספרייה. זהו סיכון שונה מהצעת קוד לא מאובטח אך אמיתי — כאן ההצעה פשוט מתייחסת למשהו שמעולם לא היה קיים, וזה יכול להשפיע על ספריות פופולריות ומתועדות היטב בדיוק כמו על ספריות נדירות.",
      resourceTitle: "GitHub Copilot Trust Center",
      resourceUrl: "https://docs.github.com/en/copilot/trust-center",
      keywords: ["hallucinated api", "build failure", "sdk"],
      tooltipTerms: ["Hallucination"],
    },
    {
      id: "p21-cop-009",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A Copilot-suggested `parseDiscountCode()` function passes every existing unit test. During a later production incident, the function is found to crash on discount codes containing Unicode characters — a case the test suite never exercised. Which statements accurately describe this situation? (Select all that apply.)",
      question_he:
        "פונקציית `parseDiscountCode()` שהוצעה על ידי Copilot עוברת את כל ה-unit tests הקיימים. במהלך תקרית production מאוחרת יותר מתגלה שהפונקציה קורסת על קודי הנחה המכילים תווי Unicode — מקרה שחבילת ה-tests מעולם לא בדקה. אילו מהאמירות הבאות מתארות נכון את המצב? (בחר את כל האפשרויות הרלוונטיות.)",
      options: [
        "The test suite passing was sufficient evidence the function was ready for production",
        "The gap exists because the tests never included Unicode input, not because Copilot's suggestion was validated against that case and failed anyway",
        "Expanding test coverage for edge cases like encoding, empty strings, and boundary values would have been more likely to catch this before release",
        "Code review of an accepted suggestion should include checking whether its assumptions match cases the existing tests don't cover",
      ],
      options_he: [
        "עצם העברת ה-tests הייתה הוכחה מספקת לכך שהפונקציה מוכנה ל-production",
        "הפער קיים כי ה-tests מעולם לא כללו קלט Unicode, לא כי ההצעה של Copilot נבדקה מול המקרה הזה ונכשלה בכל זאת",
        "הרחבת כיסוי ה-tests למקרי קצה כמו encoding, מחרוזות ריקות וערכי גבול הייתה סבירה יותר לתפוס את זה לפני ה-release",
        "code review על הצעה שהתקבלה צריך לכלול בדיקה האם ההנחות שלה תואמות למקרים שה-tests הקיימים לא מכסים",
      ],
      correctAnswer: [1, 2, 3],
      explanation:
        "This scenario is specifically about a coverage gap, not a code-quality failure that testing should have caught: the suite passing tells you nothing about Unicode input because it never tested Unicode input. The fix is twofold — treating 'tests pass' as coverage-scoped rather than a general correctness guarantee, and expanding coverage for realistic edge cases (encoding, empty/boundary values) before trusting a suggestion in production. Reviewers should actively ask what the accepted code assumes and whether those assumptions are actually exercised by tests.",
      explanation_he:
        "התרחיש הזה עוסק ספציפית בפער כיסוי, ולא בכשל איכות קוד שבדיקות היו אמורות לתפוס: מעבר החבילה לא אומר דבר על קלט Unicode כי היא מעולם לא בדקה קלט Unicode. הפתרון הוא כפול — התייחסות ל-'tests עוברים' כמוגבל לכיסוי ולא כערבות כללית לנכונות, והרחבת הכיסוי למקרי קצה ריאליים (encoding, ערכים ריקים/גבוליים) לפני שסומכים על הצעה ב-production. על בודקים לשאול באופן פעיל מה הקוד המתקבל מניח והאם ההנחות הללו אכן נבדקות על ידי ה-tests.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["test coverage", "edge cases", "incident"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-010",
      providers: ["neutral"],
      domains: ["copilot"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "In a 2,000-line file, a developer accepts a Copilot suggestion for a new caching function near the bottom of the file. The suggestion does not use the `CacheKeyBuilder` utility that every other caching function earlier in the same file uses consistently, because that earlier code fell outside Copilot's immediate context. What is the best way to prevent this class of issue going forward?",
      question_he:
        "בקובץ בן 2,000 שורות, מפתח מקבל הצעה של Copilot לפונקציית caching חדשה קרוב לסוף הקובץ. ההצעה אינה משתמשת ב-utility בשם `CacheKeyBuilder` שבו משתמשות כל שאר פונקציות ה-caching מוקדם יותר באותו קובץ באופן עקבי, מכיוון שהקוד המוקדם ההוא נפל מחוץ לקונטקסט המיידי של Copilot. מהי הדרך הטובה ביותר למנוע סוג בעיה זה בעתיד?",
      options: [
        "Rely on Copilot to eventually learn the whole codebase automatically over time",
        "Deliberately review suggestions against established conventions elsewhere in the file or codebase, especially in very large files where relevant context may fall outside what the model considered",
        "Restrict Copilot usage to files under 50 lines going forward",
        "Disable Copilot specifically for any code related to caching",
      ],
      options_he: [
        "לסמוך על כך ש-Copilot בסופו של דבר ילמד את כל ה-codebase באופן אוטומטי עם הזמן",
        "לבדוק במכוון הצעות מול conventions מבוססים במקומות אחרים בקובץ או ב-codebase, בייחוד בקבצים גדולים מאוד שבהם קונטקסט רלוונטי עלול ליפול מחוץ למה שהמודל שקל",
        "להגביל את השימוש ב-Copilot לקבצים מתחת ל-50 שורות מכאן ואילך",
        "לבטל את Copilot ספציפית לכל קוד הקשור ל-caching",
      ],
      correctAnswer: 1,
      explanation:
        "The root cause here is a context-window limitation, not a defect in the tool that can be 'fixed' by avoiding it entirely — Copilot generates suggestions from what it can see, and very large files mean earlier, relevant conventions may not be in view. The practical mitigation is process, not avoidance: reviewers (and the accepting developer) need to actively cross-check new suggestions against established patterns elsewhere in the file or module, particularly for large or long-lived files where drift is most likely to go unnoticed.",
      explanation_he:
        "הגורם השורשי כאן הוא מגבלת context window, לא פגם בכלי שניתן 'לתקן' על ידי הימנעות מוחלטת ממנו — Copilot מייצר הצעות מתוך מה שהוא רואה, וקבצים גדולים מאוד אומרים ש-conventions מוקדמים ורלוונטיים עלולים לא להיות בטווח הראייה. הפתרון המעשי הוא תהליכי, לא הימנעות: על הבודקים (והמפתח המקבל) לבדוק באופן פעיל הצעות חדשות מול patterns מבוססים במקומות אחרים בקובץ או במודול, בייחוד בקבצים גדולים או ותיקים שבהם סטייה עלולה להישאר בלתי מורגשת.",
      resourceTitle: "Best practices for using GitHub Copilot",
      resourceUrl:
        "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
      keywords: ["context window", "large files", "code review"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-011",
      providers: ["neutral"],
      domains: ["copilot", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "Copilot suggests importing and using a specific version of an XML-parsing library to solve a task. A subsequent security scan flags that exact version as having a known deserialization vulnerability. What does this scenario mainly highlight about accepting AI-suggested dependency usage?",
      question_he:
        "Copilot מציע לייבא ולהשתמש בגרסה ספציפית של ספריית XML-parsing כדי לפתור משימה. סריקת אבטחה מאוחרת יותר מסמנת את אותה גרסה בדיוק כבעלת פגיעות deserialization ידועה. מה התרחיש הזה מדגיש בעיקר לגבי קבלת שימוש בתלויות המוצעות על ידי AI?",
      options: [
        "Copilot's suggestions are guaranteed to always reference the newest, fully patched library version available",
        "Suggested library usage needs to be checked against current vulnerability advisories and supported versions, exactly like any other dependency choice a developer makes manually",
        "This kind of risk is unique to XML-parsing libraries specifically",
        "Dependency scanning tools become unnecessary once a team adopts Copilot",
      ],
      options_he: [
        "ההצעות של Copilot מובטחות תמיד להתייחס לגרסת הספרייה החדשה והמתוקנת ביותר הזמינה",
        "יש לבדוק שימוש מוצע בספרייה מול vulnerability advisories עדכניים וגרסאות נתמכות, בדיוק כמו כל בחירת תלות אחרת שמפתח עושה באופן ידני",
        "סיכון מסוג זה ייחודי לספריות XML-parsing באופן ספציפי",
        "כלי dependency scanning נעשים מיותרים ברגע שצוות מאמץ את Copilot",
      ],
      correctAnswer: 1,
      explanation:
        "This is a supply-chain-adjacent risk distinct from Copilot suggesting insecure logic directly written in the codebase: here the risk lives in a third-party dependency the suggestion happens to reference, and that dependency's security posture can change independently of anything about the suggestion's own code quality. Because Copilot has no live feed of current CVEs or deprecation notices, suggested dependency usage still needs the same vulnerability-advisory and version-support checks a team would run for any manually chosen library. Dependency scanning remains essential regardless of whether a human or an AI assistant proposed the import.",
      explanation_he:
        "זהו סיכון הצמוד ל-supply chain, שונה מהצעת Copilot ללוגיקה לא מאובטחת שנכתבת ישירות ב-codebase: כאן הסיכון טמון בתלות צד שלישי שההצעה מפנה אליה במקרה, ומצב האבטחה של אותה תלות יכול להשתנות באופן בלתי תלוי באיכות הקוד של ההצעה עצמה. מכיוון של-Copilot אין feed חי של CVEs עדכניים או הודעות deprecation, שימוש מוצע בתלויות עדיין דורש את אותן בדיקות vulnerability-advisory ותמיכת גרסה שצוות היה מריץ עבור כל ספרייה שנבחרת ידנית. סריקת תלויות נשארת חיונית בין אם בן אדם ובין אם עוזר AI הציעו את ה-import.",
      resourceTitle: "OWASP Top 10 for Large Language Model Applications",
      resourceUrl:
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["dependencies", "supply chain", "vulnerability scanning"],
      tooltipTerms: ["Copilot"],
    },
    {
      id: "p21-cop-012",
      providers: ["neutral"],
      domains: ["copilot", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A developer accepts a Copilot suggestion that implements password-reset token comparison using standard string equality (`==`) instead of a constant-time comparison function. The code compiles and behaves correctly in all normal functional tests. Why does this specific suggestion deserve more scrutiny than an average accepted suggestion?",
      question_he:
        "מפתח מקבל הצעה של Copilot שמממשת השוואת token של איפוס סיסמה באמצעות שוויון מחרוזות רגיל (`==`) במקום פונקציית השוואה בזמן קבוע (constant-time). הקוד מתקמפל ומתנהג נכון בכל ה-tests הפונקציונליים הרגילים. מדוע ההצעה הספציפית הזו מצריכה יותר קפידה מהצעה ממוצעת שמתקבלת?",
      options: [
        "Because string equality comparisons are always incorrect in any programming context",
        "Because security-critical logic like authentication token comparisons can be functionally correct yet still introduce subtle vulnerabilities, such as timing attacks, that ordinary functional testing will not reveal",
        "Because this scenario is unrealistic — Copilot never generates security-sensitive code",
        "Because constant-time comparison only matters for cryptographic key generation, not for token checks like this one",
      ],
      options_he: [
        "כי השוואות שוויון מחרוזות תמיד שגויות בכל הקשר תכנותי",
        "כי לוגיקה קריטית לאבטחה כמו השוואת tokens של authentication יכולה להיות תקינה מבחינה פונקציונלית ועדיין להכניס פגיעויות עדינות, כמו timing attacks, שבדיקות פונקציונליות רגילות לא יחשפו",
        "כי התרחיש הזה לא ריאלי — Copilot אף פעם לא מייצר קוד רגיש לאבטחה",
        "כי השוואה בזמן קבוע רלוונטית רק ליצירת מפתחות קריפטוגרפיים, לא לבדיקות token כמו זו",
      ],
      correctAnswer: 1,
      explanation:
        "Normal functional tests check whether the comparison returns the right true/false result for given inputs — they don't measure how long the comparison takes for different inputs, so a timing side-channel in `==` string comparison is invisible to typical testing. That gap is exactly why authentication and cryptographic code categories warrant deeper scrutiny than average: the failure mode isn't 'wrong output,' it's an exploitable property that only shows up under adversarial analysis, not standard test runs. Extra review effort for these categories is about looking for a different class of problem, not just re-checking the same functional correctness.",
      explanation_he:
        "בדיקות פונקציונליות רגילות בודקות האם ההשוואה מחזירה תוצאת true/false נכונה עבור קלטים נתונים — הן לא מודדות כמה זמן ההשוואה לוקחת עבור קלטים שונים, כך ש-timing side-channel בהשוואת מחרוזות עם `==` בלתי נראה לבדיקות רגילות. הפער הזה בדיוק ההסבר לכך שקטגוריות קוד של authentication וקריפטוגרפיה מצריכות קפידה עמוקה יותר מהממוצע: מצב הכשל אינו 'פלט שגוי', אלא תכונה הניתנת לניצול שמופיעה רק תחת ניתוח יריבותי, לא בהרצות tests סטנדרטיות. מאמץ בדיקה נוסף לקטגוריות אלו נועד לחפש סוג אחר לגמרי של בעיה, לא רק לבדוק מחדש את אותה נכונות פונקציונלית.",
      resourceTitle: "OWASP Top 10 for Large Language Model Applications",
      resourceUrl:
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["timing attack", "authentication", "security-critical code"],
      tooltipTerms: ["Copilot"],
    },
  ],
});
