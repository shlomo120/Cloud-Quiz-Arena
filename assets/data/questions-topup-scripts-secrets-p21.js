/**
 * questions-topup-scripts-secrets-p21.js — Phase 21 coverage top-up:
 * Scripts & Secrets (10 questions). Deepens thin difficulty slices.
 * Registers itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-scripts-secrets-p21",
  label: "Scripts & Secrets — Phase 21 Top-up",
  questions: [
    {
      id: "p21-scs-001",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A Dockerfile does `COPY config-with-secret.txt /app/` in one layer, then a later layer runs `RUN rm /app/config-with-secret.txt` to delete it before the image is published. What is true about the secret?",
      question_he:
        "בקובץ Dockerfile יש שלב `COPY config-with-secret.txt /app/`, ולאחר מכן שלב מאוחר יותר מריץ `RUN rm /app/config-with-secret.txt` כדי למחוק אותו לפני פרסום ה-image. מה נכון לגבי ה-secret?",
      options: [
        "It is still recoverable, because the earlier layer still contains the file and image layers are stored and shareable independently",
        "It is completely gone, because Docker images only expose their final filesystem state",
        "It is safe as long as the final `docker run` container doesn't show the file in `ls`",
        "It is only a risk if the image is pushed to a public registry, never for private registries",
      ],
      options_he: [
        "הוא עדיין ניתן לשחזור, כי השכבה המוקדמת עדיין מכילה את הקובץ ושכבות ה-image נשמרות וניתנות לשיתוף בנפרד",
        "הוא נעלם לגמרי, כי images של Docker חושפים רק את מצב מערכת הקבצים הסופי",
        "זה בטוח כל עוד ב-container הרץ עם `docker run` הקובץ לא מופיע ב-`ls`",
        "זהו סיכון רק אם ה-image נדחף ל-registry ציבורי, ולעולם לא ל-registry פרטי",
      ],
      correctAnswer: 0,
      explanation:
        "Docker images are built as a stack of layers, and each layer is stored on its own — deleting a file in a later layer only hides it in the final merged filesystem, it does not remove it from the earlier layer. Anyone with `docker save`/`docker history` access, or who pulls the image, can extract the intermediate layer and recover the secret. Private registries reduce exposure but do not eliminate this risk, since anyone with pull access to that private registry still gets every layer.",
      explanation_he:
        "images של Docker נבנים כערימת שכבות, וכל שכבה נשמרת בנפרד — מחיקת קובץ בשכבה מאוחרת רק מסתירה אותו במערכת הקבצים הממוזגת הסופית, אך לא מסירה אותו מהשכבה המוקדמת. כל מי שיש לו גישה ל-`docker save`/`docker history`, או שמושך (pull) את ה-image, יכול לחלץ את השכבה הביניים ולשחזר את ה-secret. registry פרטי מצמצם את החשיפה אך לא מבטל את הסיכון, כי כל מי שיש לו הרשאת pull ל-registry הפרטי הזה עדיין מקבל את כל השכבות.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["docker", "container image", "layers", "secret"],
      tooltipTerms: ["Secret"],
    },
    {
      id: "p21-scs-002",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team manages cloud infrastructure with Terraform, including a database whose auto-generated admin password is stored as a resource attribute. Why does the Terraform state file need its own dedicated access control, separate from the source code repository?",
      question_he:
        "צוות מנהל תשתית ענן עם Terraform, כולל מסד נתונים שהסיסמה האוטומטית שלו נשמרת כתכונת משאב (resource attribute). מדוע קובץ ה-state של Terraform זקוק לבקרת גישה ייעודית משלו, נפרדת מריפוזיטורי קוד המקור?",
      options: [
        "The state file often stores resource attributes in plaintext, including secrets like generated passwords, even though the .tf source files themselves contain no literal secret values",
        "Terraform state files are always automatically encrypted by every backend, so no additional control is needed",
        "State files never contain sensitive data, only resource IDs and metadata",
        "State file access control matters only when using the local backend, not remote backends like S3",
      ],
      options_he: [
        "קובץ ה-state לרוב שומר תכונות משאב בטקסט גלוי, כולל secrets כמו סיסמאות שנוצרו אוטומטית, למרות שקבצי ה-.tf עצמם אינם מכילים ערכי secret מפורשים",
        "קבצי state של Terraform תמיד מוצפנים אוטומטית על ידי כל backend, כך שאין צורך בבקרה נוספת",
        "קבצי state לעולם לא מכילים מידע רגיש, רק מזהי משאבים ומטא-דאטה",
        "בקרת גישה לקובץ ה-state חשובה רק כשמשתמשים ב-backend מקומי, ולא ב-backend מרוחקים כמו S3",
      ],
      correctAnswer: 0,
      explanation:
        "Terraform state tracks the full resource attributes it manages, and for many resource types that includes computed sensitive values such as generated passwords, connection strings, or private keys — even though the .tf configuration files that define the resources contain no literal secrets. Not all backends encrypt state by default (a local state file or a misconfigured remote backend can leave it in plaintext), so the state must be protected with its own access control and encryption regardless of whether it's local or remote.",
      explanation_he:
        "ה-state של Terraform עוקב אחר כל תכונות המשאבים שהוא מנהל, ועבור סוגי משאבים רבים זה כולל ערכים רגישים מחושבים כמו סיסמאות שנוצרו, connection strings או מפתחות פרטיים — גם אם קבצי ה-.tf שמגדירים את המשאבים לא מכילים secrets מפורשים. לא כל backend מצפין state כברירת מחדל (קובץ state מקומי או backend מרוחק שהוגדר לא נכון עלולים להשאיר אותו בטקסט גלוי), לכן יש להגן על ה-state עם בקרת גישה והצפנה משלו, בין אם הוא מקומי או מרוחק.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["terraform", "state file", "iac", "secret"],
      tooltipTerms: ["Secret", "Least Privilege"],
    },
    {
      id: "p21-scs-003",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Pasting an API key into a Slack DM or emailing it to a teammate so they can finish a task quickly is just as auditable and revocable as storing it in a secret manager, since both methods still let the team know the key exists.",
      question_he:
        "הדבקת API key בהודעת Slack פרטית או שליחתו במייל לחבר צוות כדי שיוכל לסיים משימה במהירות, ניתנת למעקב ולביטול באותה מידה כמו אחסון ב-secret manager, שכן שתי השיטות עדיין מודיעות לצוות שה-key קיים.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Sharing a secret through chat or email creates an untracked, unmanaged copy that lives outside any system of record — it isn't automatically rotated, isn't covered by access logs tied to the secret's lifecycle, and typically isn't deleted when the recipient no longer needs it or leaves the team. A secret manager centralizes issuance, rotation, and revocation, so revoking access there instantly cuts off every legitimate consumer, whereas a copy pasted into a chat thread can keep working (or sit readable in chat history) long after it should have been retired.",
      explanation_he:
        "שיתוף secret דרך צ'אט או מייל יוצר עותק לא-מנוהל ולא-עוקב שחי מחוץ לכל מערכת רישום — הוא לא מתחלף (rotation) אוטומטית, לא מכוסה על ידי לוגי גישה הקשורים למחזור החיים של ה-secret, ובדרך כלל לא נמחק כשהמקבל כבר לא צריך אותו או עוזב את הצוות. secret manager מרכז הנפקה, rotation וביטול, כך שביטול גישה שם חותך מיידית כל צרכן לגיטימי, בעוד שעותק שהודבק בשרשור צ'אט יכול להמשיך לעבוד (או לשבת קריא בהיסטוריית הצ'אט) הרבה אחרי שהיה צריך לצאת משימוש.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["secret sharing", "chat", "email", "secret manager"],
      tooltipTerms: ["Secret"],
    },
    {
      id: "p21-scs-004",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A service connects to a database using a credential that is generated fresh for each session and automatically expires after 15 minutes, instead of a fixed password that never changes. What is the main security benefit of this approach?",
      question_he:
        "שירות מתחבר למסד נתונים באמצעות credential שנוצר מחדש עבור כל session ופג תוקף אוטומטית לאחר 15 דקות, במקום סיסמה קבועה שלעולם לא משתנה. מהי התועלת האבטחתית העיקרית של הגישה הזו?",
      options: [
        "If the short-lived credential leaks, its usefulness to an attacker is limited to a narrow time window instead of granting indefinite access",
        "Short-lived credentials never need to be transmitted over the network, so they can't be intercepted",
        "It removes the need for the database to enforce any authentication at all",
        "It guarantees the credential is never stored in memory during the session",
      ],
      options_he: [
        "אם ה-credential קצר-החיים דולף, שימושיותו לתוקף מוגבלת לחלון זמן צר במקום להעניק גישה בלתי מוגבלת",
        "credentials קצרי-חיים לעולם לא צריכים להיות מועברים ברשת, ולכן לא ניתן ליירט אותם",
        "זה מבטל את הצורך של מסד הנתונים לאכוף אימות כלשהו",
        "זה מבטיח שה-credential לעולם לא נשמר בזיכרון במהלך ה-session",
      ],
      correctAnswer: 0,
      explanation:
        "A dynamic, per-session credential that auto-expires drastically shrinks the blast radius if it's ever leaked or logged, since it becomes useless once it expires — unlike a static, long-lived password that stays valid until someone manually rotates it, which could be months or years. It still travels over the network like any credential and still gets held in memory while the connection is open; the benefit is entirely about limiting the time window of exposure, not eliminating transmission or storage.",
      explanation_he:
        "credential דינמי לכל session שפג תוקפו אוטומטית מצמצם דרמטית את רדיוס הנזק אם הוא אי פעם דולף או נרשם ללוג, כי הוא הופך לחסר תועלת ברגע שהוא פג — בניגוד לסיסמה סטטית וקבועת חיים שנשארת תקפה עד שמישהו מסובב (rotate) אותה ידנית, מה שיכול לקחת חודשים או שנים. הוא עדיין עובר ברשת כמו כל credential ועדיין מוחזק בזיכרון בזמן שהחיבור פתוח; היתרון הוא לחלוטין בצמצום חלון הזמן של החשיפה, לא בביטול ההעברה או האחסון.",
      resourceTitle: "AWS Secrets Manager Documentation",
      resourceUrl: "https://docs.aws.amazon.com/secretsmanager/",
      keywords: ["dynamic secrets", "short-lived credentials", "rotation"],
      tooltipTerms: ["Secret", "Least Privilege"],
    },
    {
      id: "p21-scs-005",
      providers: ["neutral"],
      domains: ["scripts-secrets", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team stores all application secrets in a cloud secret manager and requires every service to fetch its secrets from there at startup. What practical problem does this create, sometimes called the 'secret zero' problem?",
      question_he:
        "צוות שומר את כל ה-secrets של האפליקציה ב-secret manager בענן ודורש שכל שירות ימשוך את ה-secrets שלו משם בזמן ההפעלה. איזו בעיה מעשית זה יוצר, המכונה לעיתים בעיית 'secret zero'?",
      options: [
        "The service itself still needs some initial credential or identity to authenticate to the secret manager before it can fetch anything, so that bootstrap credential must be secured by a different mechanism",
        "Secret managers cannot store more than one secret per service, forcing constant re-authentication",
        "Cloud secret managers do not support automatic rotation, so 'secret zero' refers to the very first rotation cycle",
        "It means the secret manager itself has no encryption at rest for the first secret ever stored",
      ],
      options_he: [
        "השירות עצמו עדיין זקוק ל-credential או זהות ראשוניים כלשהם כדי להתאמת מול ה-secret manager לפני שיוכל למשוך משהו, ולכן אותו bootstrap credential חייב להיות מאובטח במנגנון שונה",
        "secret managers לא יכולים לאחסן יותר מ-secret אחד לכל שירות, מה שמאלץ אימות מחדש מתמיד",
        "secret managers בענן לא תומכים ב-rotation אוטומטי, ולכן 'secret zero' מתייחס למחזור ה-rotation הראשון אי פעם",
        "זה אומר שלמנהל ה-secret עצמו אין הצפנה במנוחה (encryption at rest) עבור ה-secret הראשון שאי פעם אוחסן",
      ],
      correctAnswer: 0,
      explanation:
        "Moving secrets into a secret manager doesn't eliminate the need for a credential — it relocates the problem to a single initial credential (or identity) the service uses to prove who it is to the secret manager, before it can retrieve anything else. This 'secret zero' is typically solved by binding authentication to something the platform already vouches for, such as a cloud IAM role or workload identity attached to the compute resource, rather than embedding another static key that would just recreate the original problem.",
      explanation_he:
        "העברת secrets ל-secret manager לא מבטלת את הצורך ב-credential — היא מעבירה את הבעיה ל-credential ראשוני יחיד (או זהות) שהשירות משתמש בו כדי להוכיח מי הוא מול ה-secret manager, לפני שהוא יכול לשלוף משהו נוסף. בעיית 'secret zero' הזו נפתרת בדרך כלל על ידי קשירת האימות למשהו שהפלטפורמה כבר מאמתת עבורו, כמו תפקיד IAM בענן או workload identity המחוברים למשאב החישוב, במקום להטמיע מפתח סטטי נוסף שרק ישחזר את הבעיה המקורית.",
      resourceTitle: "Google Cloud Secret Manager Documentation",
      resourceUrl: "https://cloud.google.com/secret-manager/docs",
      keywords: ["secret zero", "bootstrap credential", "identity"],
      tooltipTerms: ["Service Account", "IAM", "Secret"],
    },
    {
      id: "p21-scs-006",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Configuring a secret-scanning tool to flag every configuration value — including non-sensitive items like a public hostname or a feature-flag name — as a potential secret is a good practice because it maximizes coverage with no real downside.",
      question_he:
        "הגדרת כלי סריקת secrets כך שידגל כל ערך קונפיגורציה — כולל פריטים לא-רגישים כמו hostname ציבורי או שם feature-flag — כ-secret פוטנציאלי, היא נוהג טוב כי היא ממקסמת כיסוי ללא חיסרון ממשי.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Flagging genuinely non-sensitive configuration, like a public hostname or a feature-flag name, as a 'secret' causes alert fatigue: engineers start reflexively dismissing scanner warnings once most of them are false positives, which makes them more likely to miss a real signing key or API token buried in the noise. Effective secret scanning depends on distinguishing values that grant access or prove identity (true secrets) from values that are merely configuration, so the tool's signal stays trustworthy.",
      explanation_he:
        "דיגול קונפיגורציה שאינה רגישה כלל, כמו hostname ציבורי או שם feature-flag, כ-'secret' גורם ל-alert fatigue: מהנדסים מתחילים לפטור אזהרות סורק באופן רפלקסיבי ברגע שרוב ההתראות הן false positive, מה שמגדיל את הסיכוי שיפספסו signing key אמיתי או API token שקבור בתוך הרעש. סריקת secrets אפקטיבית תלויה בהבחנה בין ערכים שמעניקים גישה או מוכיחים זהות (secrets אמיתיים) לבין ערכים שהם רק קונפיגורציה, כך שהאות (signal) של הכלי נשאר אמין.",
      resourceTitle: "GitHub Secret Scanning Documentation",
      resourceUrl:
        "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      keywords: ["secret scanning", "alert fatigue", "false positives"],
      tooltipTerms: ["Secret Scanning", "Secret"],
    },
    {
      id: "p21-scs-007",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A team uses the exact same third-party payment API key across their dev, staging, and production environments to 'keep configuration simple'. What is the main risk of this approach?",
      question_he:
        "צוות משתמש באותו API key בדיוק של ספק תשלומים חיצוני בכל סביבות ה-dev, ה-staging וה-production, 'כדי לשמור על קונפיגורציה פשוטה'. מהו הסיכון העיקרי בגישה הזו?",
      options: [
        "A compromise or accidental exposure in the lower-trust dev or staging environment (which typically has looser access controls and more experimentation) immediately grants access to production resources too",
        "Payment API keys are not valid for more than one environment simultaneously, so this configuration would simply fail",
        "It has no real downside as long as the key is stored in a secret manager rather than a plaintext file",
        "It only matters for compliance paperwork, not for actual security exposure",
      ],
      options_he: [
        "פריצה או חשיפה בשוגג בסביבת ה-dev או ה-staging הפחות מהימנה (שבה בדרך כלל יש בקרות גישה רופפות יותר וניסויים רבים יותר) מעניקה מיידית גישה גם למשאבי production",
        "API key של תשלומים אינו תקף ביותר מסביבה אחת בו-זמנית, כך שהקונפיגורציה הזו פשוט תיכשל",
        "אין לזה חיסרון ממשי כל עוד ה-key מאוחסן ב-secret manager ולא בקובץ טקסט גלוי",
        "זה משנה רק לצורכי תיעוד ציות (compliance), ולא לחשיפה אבטחתית ממשית",
      ],
      correctAnswer: 0,
      explanation:
        "Dev and staging environments typically have broader developer access, more experimental code, more debugging/logging enabled, and weaker monitoring than production — making them more likely places for a secret to leak. If the same credential is reused everywhere, a leak in the low-trust environment directly compromises production, whereas per-environment secrets contain the blast radius to just the environment where the leak occurred. Storing the shared key in a secret manager helps with distribution but doesn't fix the underlying problem that one leaked value grants access everywhere.",
      explanation_he:
        "סביבות dev ו-staging בדרך כלל כוללות גישת מפתחים רחבה יותר, קוד ניסיוני יותר, יותר debugging/logging מופעל וניטור חלש יותר מ-production — מה שהופך אותן למקומות סבירים יותר לדליפת secret. אם אותו credential משמש בכל מקום, דליפה בסביבה הפחות מהימנה פוגעת ישירות ב-production, בעוד ש-secrets נפרדים לכל סביבה מגבילים את רדיוס הנזק רק לסביבה שבה אירעה הדליפה. אחסון ה-key המשותף ב-secret manager עוזר בהפצה אך לא פותר את הבעיה הבסיסית שערך אחד שדלף מעניק גישה בכל מקום.",
      resourceTitle: "The Twelve-Factor App: Config",
      resourceUrl: "https://12factor.net/config",
      keywords: ["multi-environment", "blast radius", "isolation"],
      tooltipTerms: ["Secret", "Least Privilege"],
    },
    {
      id: "p21-scs-008",
      providers: ["neutral"],
      domains: ["scripts-secrets", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A CI pipeline installs project dependencies via a package manager, and one of the transitive dependencies includes a post-install script. Why is this a plausible path for secret exfiltration even if no application code is ever executed?",
      question_he:
        "pipeline של CI מתקין תלויות פרויקט דרך package manager, ואחת מהתלויות הטרנזיטיביות כוללת סקריפט post-install. מדוע זהו נתיב סביר לחילוץ (exfiltration) secrets גם אם אף קוד אפליקציה לא מופעל בפועל?",
      options: [
        "Install-time scripts run with the same process privileges as the install step itself, so they can read environment variables (including injected CI secrets) and send them to an external endpoint before the build even finishes",
        "Package managers execute post-install scripts in a fully network-isolated sandbox, so this risk applies only to pre-install scripts",
        "Post-install scripts can only access files explicitly listed in the package's manifest, never environment variables",
        "This risk is eliminated automatically by using a lockfile, since lockfiles prevent any script execution during install",
      ],
      options_he: [
        "סקריפטים בזמן ההתקנה רצים עם אותן הרשאות תהליך כמו שלב ההתקנה עצמו, כך שהם יכולים לקרוא environment variables (כולל secrets של CI שהוזרקו) ולשלוח אותם ליעד חיצוני עוד לפני שה-build אפילו מסתיים",
        "package managers מריצים סקריפטי post-install ב-sandbox מבודד רשת לחלוטין, כך שהסיכון הזה חל רק על סקריפטי pre-install",
        "סקריפטי post-install יכולים לגשת רק לקבצים המפורטים במפורש ב-manifest של החבילה, לעולם לא ל-environment variables",
        "הסיכון הזה מבוטל אוטומטית על ידי שימוש ב-lockfile, כי lockfiles מונעים כל הרצת סקריפט בזמן ההתקנה",
      ],
      correctAnswer: 0,
      explanation:
        "Most package managers execute lifecycle scripts (like post-install) with the same OS-level privileges and environment as the install command itself, meaning a malicious or compromised transitive dependency can read whatever environment variables the CI runner has injected — API keys, cloud credentials, tokens — and exfiltrate them over the network, all before any of the project's own application code runs. Lockfiles pin dependency versions to prevent unexpected upgrades, but they do not disable script execution, and there is no default manifest-only sandbox restricting file or environment access.",
      explanation_he:
        "רוב package managers מריצים סקריפטי מחזור חיים (כמו post-install) עם אותן הרשאות מערכת הפעלה וסביבה כמו פקודת ההתקנה עצמה, כלומר תלות טרנזיטיבית זדונית או פרוצה יכולה לקרוא כל environment variable שה-CI runner הזריק — API keys, credentials בענן, tokens — ולחלץ אותם דרך הרשת, הכל עוד לפני שקוד האפליקציה של הפרויקט עצמו רץ. lockfiles נועלים גרסאות תלויות כדי למנוע שדרוגים בלתי צפויים, אך הם לא משביתים הרצת סקריפטים, ואין sandbox ברירת מחדל המבוסס manifest בלבד שמגביל גישה לקבצים או לסביבה.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["supply chain", "install scripts", "exfiltration", "ci/cd"],
      tooltipTerms: ["Secret", "Least Privilege"],
    },
    {
      id: "p21-scs-009",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team wants to build a Docker image that uses a private registry credential during the build (to pull an internal base dependency) without leaving that credential recoverable in the published image's layers. Which of the following approaches actually achieve this? (Select all that apply)",
      question_he:
        "צוות רוצה לבנות image של Docker שמשתמש ב-credential של registry פרטי במהלך ה-build (כדי למשוך תלות בסיס פנימית) מבלי להשאיר את ה-credential הזה ניתן לשחזור בשכבות ה-image המפורסם. אילו מהגישות הבאות אכן משיגות זאת? (בחר את כל האפשרויות הרלוונטיות)",
      options: [
        "Use BuildKit's `--mount=type=secret` so the credential is mounted only for the duration of a single RUN instruction and never written to any layer",
        "Use a multi-stage build where the credential is only used in an early build stage, and the final published stage is copied from a later stage that never had the credential",
        "COPY the credential file in, use it, then RUN a command to delete the file in the same Dockerfile before the final stage",
        "Pass the credential as a build ARG so it appears in `docker history` output but not in the filesystem",
      ],
      options_he: [
        "שימוש ב-`--mount=type=secret` של BuildKit כך שה-credential מותקן רק למשך הוראת RUN בודדת ולעולם לא נכתב לאף שכבה",
        "שימוש ב-multi-stage build שבו ה-credential משמש רק בשלב build מוקדם, וה-stage הסופי המפורסם מועתק משלב מאוחר יותר שמעולם לא היה בו ה-credential",
        "לבצע COPY לקובץ ה-credential, להשתמש בו, ואז להריץ פקודה שמוחקת את הקובץ באותו Dockerfile לפני ה-stage הסופי",
        "להעביר את ה-credential כ-build ARG כך שהוא יופיע בפלט `docker history` אך לא במערכת הקבצים",
      ],
      correctAnswer: [0, 1],
      explanation:
        "BuildKit's secret-mount feature is purpose-built for this: the secret is available only to the single RUN step that requests it and is never committed to any layer, so it can't be recovered later. A multi-stage build achieves the same goal by isolating the credential to an early stage whose layers are discarded — only files explicitly copied into the final stage survive into the published image. Deleting the file in a later RUN still leaves it recoverable in the earlier layer (the same 'delete doesn't undo a layer' problem), and build ARGs are recorded in image metadata/history, making them just as recoverable as a file — sometimes more visible.",
      explanation_he:
        "פיצ'ר mount-secret של BuildKit נבנה בדיוק לצורך זה: ה-secret זמין רק לצעד ה-RUN הבודד שמבקש אותו ולעולם לא מחויב (commit) לאף שכבה, כך שלא ניתן לשחזר אותו מאוחר יותר. multi-stage build משיג את אותה מטרה על ידי בידוד ה-credential לשלב מוקדם שהשכבות שלו נזרקות — רק קבצים שהועתקו במפורש לשלב הסופי שורדים ל-image המפורסם. מחיקת הקובץ ב-RUN מאוחר יותר עדיין משאירה אותו ניתן לשחזור בשכבה המוקדמת (אותה בעיה של 'מחיקה לא מבטלת שכבה'), ו-build ARGs נרשמים במטא-דאטה/היסטוריה של ה-image, מה שהופך אותם לניתנים לשחזור באותה מידה כמו קובץ — לעיתים אף גלויים יותר.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["docker", "buildkit", "multi-stage build", "secret"],
      tooltipTerms: ["Secret"],
    },
    {
      id: "p21-scs-010",
      providers: ["neutral"],
      domains: ["scripts-secrets"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A platform team stores Terraform state in a remote backend and grants every developer on the infrastructure team read access to the state storage, reasoning that 'they already have access to the source code repository, so this is no different.' What is the flaw in this reasoning?",
      question_he:
        "צוות פלטפורמה שומר את ה-state של Terraform ב-backend מרוחק ומעניק לכל מפתח בצוות התשתית גישת קריאה לאחסון ה-state, מתוך הנחה ש-'יש להם כבר גישה לריפוזיטורי קוד המקור, אז זה לא שונה.' מהו הפגם בטיעון הזה?",
      options: [
        "Access to the source code only exposes the infrastructure definitions (what resources should exist), while access to the state exposes the actual runtime attribute values Terraform computed, which can include plaintext secrets never present in the source code at all",
        "There is no flaw; state files and source code always carry identical sensitivity and should always share the same access list",
        "The only difference is file format, since state is JSON and source code is HCL, which has no security implication",
        "State files are always encrypted client-side before being written to any backend, so read access to storage never exposes plaintext",
      ],
      options_he: [
        "גישה לקוד המקור חושפת רק את הגדרות התשתית (אילו משאבים אמורים להתקיים), בעוד שגישה ל-state חושפת את ערכי התכונות בפועל בזמן ריצה ש-Terraform חישב, שיכולים לכלול secrets בטקסט גלוי שמעולם לא היו נוכחים בקוד המקור",
        "אין פגם; לקובצי state ולקוד מקור תמיד יש אותה רגישות בדיוק ותמיד צריך שיהיה להם אותו רשימת גישה",
        "ההבדל היחיד הוא פורמט הקובץ, כי ה-state הוא JSON וקוד המקור הוא HCL, מה שאין לו משמעות אבטחתית",
        "קובצי state תמיד מוצפנים בצד הלקוח לפני שהם נכתבים לכל backend, כך שגישת קריאה לאחסון לעולם לא חושפת טקסט גלוי",
      ],
      correctAnswer: 0,
      explanation:
        "Source code (the .tf files) describes intent — what resource types and settings should be created — and generally contains no secret values themselves. The state file, by contrast, is a record of the actual provisioned reality, including computed attributes like generated database passwords or private keys that Terraform tracked so it can manage the resource going forward; those values simply do not exist anywhere in the source repository. Treating the two as equivalent ignores that state access grants visibility into live secrets, so it deserves narrower, more tightly audited access than source code — and encryption depends on backend configuration, it is not automatic everywhere.",
      explanation_he:
        "קוד המקור (קבצי ה-.tf) מתאר כוונה — אילו סוגי משאבים והגדרות אמורים להיווצר — ובדרך כלל אינו מכיל ערכי secret בעצמו. קובץ ה-state, לעומת זאת, הוא רישום של המציאות בפועל שסופקה, כולל תכונות מחושבות כמו סיסמאות מסד נתונים שנוצרו או מפתחות פרטיים ש-Terraform עקב אחריהם כדי לנהל את המשאב קדימה; ערכים אלו פשוט לא קיימים בשום מקום בריפוזיטורי המקור. התייחסות לשניים כשווים מתעלמת מכך שגישת state מעניקה נראות ל-secrets חיים, ולכן היא ראויה לגישה צרה יותר ומבוקרת יותר מקוד המקור — וההצפנה תלויה בהגדרת ה-backend, היא לא אוטומטית בכל מקום.",
      resourceTitle: "OWASP Secrets Management Cheat Sheet",
      resourceUrl:
        "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html",
      keywords: ["terraform", "state file", "access control", "iac"],
      tooltipTerms: ["Secret", "Least Privilege"],
    },
  ],
});
