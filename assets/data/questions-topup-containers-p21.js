/**
 * questions-topup-containers-p21.js — Phase 21 coverage top-up: Containers (10 questions).
 * Deepens thin difficulty slices in the containers domain. Registers
 * itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-containers-p21",
  label: "Containers — Phase 21 Top-up",
  questions: [
    {
      id: "p21-ctr-001",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "In a Dockerfile, why does the order of instructions matter for build performance?",
      question_he:
        "מדוע סדר ההוראות ב-Dockerfile משפיע על ביצועי ה-build?",
      options: [
        "Docker caches each layer, so placing rarely-changed instructions (like installing dependencies) before frequently-changed ones (like copying source code) lets later builds reuse cached layers",
        "Docker executes instructions in a random order unless numbered explicitly",
        "The order only affects the image's file listing alphabetically, not build speed",
        "Only the very first instruction in a Dockerfile is ever cached",
      ],
      options_he: [
        "Docker שומר cache לכל layer, כך שהצבת הוראות שמשתנות לעתים רחוקות (כמו התקנת dependencies) לפני הוראות שמשתנות לעיתים קרובות (כמו העתקת קוד המקור) מאפשרת ל-builds הבאים לעשות שימוש חוזר ב-layers שב-cache",
        "Docker מבצע את ההוראות בסדר אקראי אלא אם ממספרים אותן במפורש",
        "הסדר משפיע רק על רשימת הקבצים בסדר אלפביתי, ולא על מהירות ה-build",
        "רק ההוראה הראשונה ב-Dockerfile אי פעם נשמרת ב-cache",
      ],
      correctAnswer: 0,
      explanation:
        "Each Dockerfile instruction creates a layer, and Docker reuses cached layers as long as nothing above them changed. Placing stable steps (installing OS packages or dependencies) before volatile ones (copying application code) means code changes only invalidate the last few layers, not the whole build. Reversing that order forces a full dependency reinstall on every code change.",
      explanation_he:
        "כל הוראה ב-Dockerfile יוצרת layer, ו-Docker עושה שימוש חוזר ב-layers מה-cache כל עוד שום דבר מעליהם לא השתנה. הצבת שלבים יציבים (התקנת חבילות מערכת או dependencies) לפני שלבים משתנים (העתקת קוד האפליקציה) אומרת ששינויים בקוד יבטלו רק את ה-layers האחרונים, ולא את כל ה-build. סדר הפוך מכריח התקנה מחדש של כל ה-dependencies בכל שינוי קוד.",
      resourceTitle: "Docker build cache",
      resourceUrl: "https://docs.docker.com/build/cache/",
      keywords: ["dockerfile", "layers", "build cache"],
      tooltipTerms: [],
    },
    {
      id: "p21-ctr-002",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Using the `:latest` tag when deploying a container image guarantees you always get a reproducible, known version of that image.",
      question_he:
        "שימוש ב-tag בשם `:latest` בעת פריסת image של קונטיינר מבטיח שתמיד תקבל גרסה ידועה וניתנת לשחזור של אותו image.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "`:latest` is just a mutable pointer that can be re-pushed to reference a completely different image at any time. Two deployments referencing `:latest` on different days can pull different underlying content, breaking reproducibility. Pinning to an immutable digest (e.g. `image@sha256:...`) or a specific version tag guarantees the exact same bits every time.",
      explanation_he:
        "ה-tag `:latest` הוא רק מצביע mutable שניתן לדחוף אליו מחדש (push) כך שיצביע על image שונה לגמרי בכל רגע נתון. שתי פריסות שמפנות ל-`:latest` בימים שונים עשויות למשוך תוכן שונה, מה שפוגע ביכולת השחזור. הצמדה ל-digest immutable (למשל `image@sha256:...`) או ל-tag גרסה ספציפי מבטיחה את אותם bits בדיוק בכל פעם.",
      resourceTitle: "Docker image tags and digests",
      resourceUrl: "https://docs.docker.com/engine/reference/commandline/tag/",
      keywords: ["tag", "latest", "immutability"],
      tooltipTerms: ["Image Digest"],
    },
    {
      id: "p21-ctr-003",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "What is the main tradeoff of choosing a minimal or distroless base image over a full OS base image?",
      question_he:
        "מהו הפשרה (tradeoff) העיקרית בבחירת base image מינימלי או distroless לעומת base image של מערכת הפעלה מלאה?",
      options: [
        "A smaller attack surface and image size, at the cost of fewer built-in debugging tools (no shell, no package manager) inside the running container",
        "Minimal images always run faster CPU instructions than full OS images",
        "Distroless images cannot be scanned for vulnerabilities at all",
        "Full OS base images are always more secure because they include more software",
      ],
      options_he: [
        "משטח תקיפה ונפח image קטנים יותר, במחיר של פחות כלי debugging מובנים (אין shell, אין package manager) בתוך הקונטיינר הרץ",
        "images מינימליים תמיד מריצים הוראות CPU מהירות יותר מ-images של מערכת הפעלה מלאה",
        "לא ניתן כלל לסרוק images מסוג distroless לאיתור פגיעויות",
        "base images של מערכת הפעלה מלאה תמיד בטוחים יותר כי הם כוללים יותר תוכנה",
      ],
      correctAnswer: 0,
      explanation:
        "Minimal or distroless images strip out shells, package managers, and unnecessary libraries, shrinking both the image size and the number of exploitable components. The tradeoff is operational: if something breaks in production, you often cannot `exec` into the container to run a shell or install a debugging tool, and must rely on external tooling or ephemeral debug containers instead.",
      explanation_he:
        "images מינימליים או distroless מסירים shells, package managers וספריות מיותרות, מה שמקטין גם את נפח ה-image וגם את מספר הרכיבים הניתנים לניצול. הפשרה היא תפעולית: אם משהו נשבר בפרודקשן, לרוב לא ניתן לבצע `exec` לתוך הקונטיינר כדי להריץ shell או להתקין כלי debugging, ויש להסתמך על כלים חיצוניים או קונטיינרי debug זמניים.",
      resourceTitle: "Docker best practices for building images",
      resourceUrl: "https://docs.docker.com/build/building/best-practices/",
      keywords: ["base image", "distroless", "attack surface"],
      tooltipTerms: [],
    },
    {
      id: "p21-ctr-004",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "What is the primary benefit of using a multi-stage Dockerfile build for a compiled application?",
      question_he:
        "מהי התועלת העיקרית משימוש ב-multi-stage build ב-Dockerfile עבור אפליקציה מקומפלת?",
      options: [
        "The final image can copy only the compiled binary/artifacts from the build stage, excluding compilers, build tools, and source code from the shipped runtime image",
        "It automatically parallelizes the build across multiple CPU cores",
        "It allows the Dockerfile to build images for multiple CPU architectures simultaneously",
        "It removes the need for a base image entirely",
      ],
      options_he: [
        "ה-image הסופי יכול להעתיק רק את הבינארי/הארטיפקטים המקומפלים משלב ה-build, ולהחריג מהדרים, כלי build וקוד מקור מה-image הרץ שנשלח",
        "זה מבצע במקביל אוטומטית את ה-build על פני מספר ליבות CPU",
        "זה מאפשר ל-Dockerfile לבנות images עבור מספר ארכיטקטורות CPU במקביל",
        "זה מבטל לחלוטין את הצורך ב-base image",
      ],
      correctAnswer: 0,
      explanation:
        "In a multi-stage build, an early stage uses a heavy image with compilers and build dependencies to produce the artifact, and a later stage starts from a minimal runtime base image and uses `COPY --from=<stage>` to pull in only the built output. This keeps compilers, source code, and build-time secrets out of the final shipped image, reducing both size and attack surface. Multi-arch builds and CPU parallelism are unrelated Docker features (buildx and BuildKit, respectively).",
      explanation_he:
        "ב-multi-stage build, שלב מוקדם משתמש ב-image כבד עם מהדרים ו-dependencies ל-build כדי לייצר את הארטיפקט, ושלב מאוחר יותר מתחיל מ-base image מינימלי לזמן ריצה ומשתמש ב-`COPY --from=<stage>` כדי למשוך רק את הפלט המקומפל. כך נשארים מהדרים, קוד מקור וסודות מזמן ה-build מחוץ ל-image הסופי הנשלח, מה שמקטין גם נפח וגם משטח תקיפה. builds רב-ארכיטקטוריים ומקביליות CPU הם features נפרדים ב-Docker (buildx ו-BuildKit, בהתאמה).",
      resourceTitle: "Docker multi-stage builds",
      resourceUrl: "https://docs.docker.com/build/building/multi-stage/",
      keywords: ["multi-stage build", "artifact", "image size"],
      tooltipTerms: [],
    },
    {
      id: "p21-ctr-005",
      providers: ["neutral"],
      domains: ["containers", "security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "Why is verifying an image's cryptographic signature (e.g. via Docker Content Trust or Sigstore/cosign) a different security control than vulnerability scanning?",
      question_he:
        "מדוע אימות חתימה קריפטוגרפית של image (למשל דרך Docker Content Trust או Sigstore/cosign) הוא אמצעי אבטחה שונה מסריקת פגיעויות?",
      options: [
        "Signature verification proves the image came from a trusted publisher and was not tampered with in transit or in the registry, whereas scanning only checks the image's contents against known CVE databases",
        "Signature verification replaces the need for any vulnerability scanning going forward",
        "Signatures automatically patch any vulnerabilities found in the image",
        "Vulnerability scanning also confirms the publisher's identity, making signing redundant",
      ],
      options_he: [
        "אימות חתימה מוכיח שה-image הגיע מפרסם מהימן ולא שונה בדרך או ברישום (registry), בעוד שסריקה בודקת רק את תוכן ה-image מול מסדי נתוני CVE ידועים",
        "אימות חתימה מייתר את הצורך בכל סריקת פגיעויות מכאן ואילך",
        "חתימות מתקנות אוטומטית כל פגיעות שנמצאה ב-image",
        "סריקת פגיעויות גם מאמתת את זהות הפרסם, מה שהופך חתימה למיותרת",
      ],
      correctAnswer: 0,
      explanation:
        "Signing addresses supply-chain integrity and provenance: it proves who built the image and that no one altered it after signing, protecting against a compromised registry or a man-in-the-middle swap. Vulnerability scanning is a content check that flags known CVEs in packages inside the image but says nothing about who published it or whether it was tampered with. A secure pipeline typically needs both, not one instead of the other.",
      explanation_he:
        "חתימה מטפלת בשלמות ובמקור (provenance) של שרשרת האספקה: היא מוכיחה מי בנה את ה-image ושאיש לא שינה אותו לאחר החתימה, ומגנה מפני registry שנפרץ או החלפה מסוג man-in-the-middle. סריקת פגיעויות היא בדיקת תוכן שמסמנת CVEs ידועים בחבילות בתוך ה-image אך לא אומרת דבר על מי פרסם אותו או האם הוא שונה. pipeline מאובטח בדרך כלל צריך את שני האמצעים, לא אחד במקום השני.",
      resourceTitle: "Kubernetes container image security",
      resourceUrl: "https://kubernetes.io/docs/concepts/containers/images/",
      keywords: ["image signing", "provenance", "supply chain"],
      tooltipTerms: ["Registry"],
    },
    {
      id: "p21-ctr-006",
      providers: ["neutral"],
      domains: ["containers", "security"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "Running a container's main process as the root user inside the container has no additional security risk compared to running as a non-root user, because containers are already isolated from the host.",
      question_he:
        "הרצת התהליך הראשי של קונטיינר כמשתמש root בתוך הקונטיינר אינה מוסיפה סיכון אבטחה בהשוואה להרצה כמשתמש שאינו root, משום שהקונטיינרים כבר מבודדים מה-host.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Containers share the host kernel, so isolation is not absolute. If an attacker escapes the container (via a kernel vulnerability or a misconfigured mount) while running as root inside the container, they are far more likely to gain root-equivalent access on the host, whereas a non-root process would be constrained even after escape. Running as a non-root user, combined with a read-only root filesystem, meaningfully reduces the blast radius of a compromise.",
      explanation_he:
        "קונטיינרים חולקים את kernel ה-host, כך שהבידוד אינו מוחלט. אם תוקף בורח מהקונטיינר (דרך פגיעות ב-kernel או mount שהוגדר בצורה שגויה) בזמן שהוא רץ כ-root בתוך הקונטיינר, סביר הרבה יותר שהוא ישיג גישה שקולה ל-root על ה-host, בעוד שתהליך שאינו root יהיה מוגבל גם לאחר בריחה. הרצה כמשתמש שאינו root, יחד עם root filesystem לקריאה בלבד (read-only), מצמצמת משמעותית את רדיוס הנזק של פריצה.",
      resourceTitle: "Kubernetes Pod security standards",
      resourceUrl:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/",
      keywords: ["root user", "runtime security", "isolation"],
      tooltipTerms: ["Pod"],
    },
    {
      id: "p21-ctr-007",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following are genuine risks of hosting container images in a registry that allows anonymous pull and push access with no authentication? (Select all that apply)",
      question_he:
        "אילו מהבאים הם סיכונים אמיתיים באחסון images של קונטיינרים ב-registry שמאפשר גישת pull ו-push אנונימית ללא אימות? (בחר את כל האפשרויות הרלוונטיות)",
      options: [
        "An attacker could push a malicious image that overwrites a trusted tag, causing downstream deployments to pull compromised content",
        "Anyone can pull private application code or embedded secrets baked into image layers",
        "The registry's storage costs become mathematically impossible to calculate",
        "TLS encryption in transit becomes technically impossible to configure",
      ],
      options_he: [
        "תוקף יכול לדחוף (push) image זדוני שדורס tag מהימן, מה שגורם לפריסות במורד הזרם למשוך תוכן שנפרץ",
        "כל אחד יכול למשוך קוד אפליקציה פרטי או סודות שהוטמעו בתוך layers של ה-image",
        "עלויות האחסון של ה-registry הופכות לבלתי אפשריות מתמטית לחישוב",
        "הצפנת TLS בהעברה הופכת לבלתי אפשרית טכנית להגדרה",
      ],
      correctAnswer: [0, 1],
      explanation:
        "Without push authentication, anyone can overwrite a tag with a poisoned image, turning the registry into a supply-chain attack vector. Without pull authentication, proprietary code or accidentally embedded secrets/credentials inside layers become publicly readable. Storage cost calculation and TLS configuration are unrelated to authentication and remain unaffected either way.",
      explanation_he:
        "ללא אימות ל-push, כל אחד יכול לדרוס tag עם image מורעל, מה שהופך את ה-registry לוקטור תקיפה בשרשרת האספקה. ללא אימות ל-pull, קוד קנייני או סודות/אישורים שהוטמעו בטעות בתוך layers הופכים לקריאים לכולם. חישוב עלות אחסון והגדרת TLS אינם קשורים לאימות ונשארים ללא שינוי בכל מקרה.",
      resourceTitle: "Amazon ECR repository policies and private registry auth",
      resourceUrl:
        "https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry-auth.html",
      keywords: ["registry access control", "authentication", "supply chain"],
      tooltipTerms: ["Registry"],
    },
    {
      id: "p21-ctr-008",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A team's CI pipeline builds a container image, pushes it to a registry, and only scans for vulnerabilities after deployment to production using a runtime scanner. A critical CVE in a base library is discovered two weeks after release. What is the main drawback of this scan-only-at-runtime approach compared to scanning at build time?",
      question_he:
        "צוות בונה image של קונטיינר ב-pipeline של CI, דוחף אותו ל-registry, וסורק פגיעויות רק לאחר הפריסה לפרודקשן באמצעות סורק runtime. CVE קריטי בספריית base מתגלה שבועיים לאחר השחרור. מהו החיסרון העיקרי בגישת סריקה-רק-ב-runtime הזו לעומת סריקה בזמן ה-build?",
      options: [
        "Vulnerable images can already be running in production before detection, forcing a reactive emergency patch-and-redeploy cycle instead of blocking the flawed image before it ever ships",
        "Runtime scanners cannot detect any vulnerabilities that build-time scanners can detect",
        "Build-time scanning is only possible for interpreted languages, not compiled binaries",
        "Runtime scanning is always slower to execute than build-time scanning",
      ],
      options_he: [
        "images פגיעים עלולים כבר לרוץ בפרודקשן לפני שהתגלו, מה שמכריח מחזור תגובתי דחוף של תיקון ופריסה מחדש במקום לחסום את ה-image הפגום עוד לפני שהוא נשלח כלל",
        "סורקי runtime אינם יכולים לגלות שום פגיעויות שסורקי build-time מסוגלים לגלות",
        "סריקה בזמן ה-build אפשרית רק לשפות מפורשות (interpreted), לא לבינאריים מקומפלים",
        "סריקת runtime תמיד איטית יותר מסריקת build-time",
      ],
      correctAnswer: 0,
      explanation:
        "The core issue is timing: scanning only in production means a vulnerable image has already been running and potentially exposed to attackers before anyone acts on it. Gating the CI pipeline to fail the build on critical CVEs stops the bad image from ever reaching production, shifting the response from reactive incident handling to proactive prevention. Both scan types use the same CVE databases, so detection capability itself is not the differentiator — timing and blast-radius exposure are.",
      explanation_he:
        "הבעיה המרכזית היא תזמון: סריקה רק בפרודקשן אומרת ש-image פגיע כבר רץ וייתכן שהיה חשוף לתוקפים לפני שמישהו פעל בנדון. הגדרת שער (gate) ב-pipeline של CI שנכשל ב-build עבור CVEs קריטיים מונעת מה-image הפגום להגיע לפרודקשן מלכתחילה, ומעבירה את התגובה מטיפול תגובתי באירוע למניעה יזומה. שני סוגי הסריקה משתמשים באותם מסדי נתוני CVE, כך שיכולת הגילוי עצמה אינה הגורם המבדיל — התזמון וחשיפת רדיוס הנזק הם.",
      resourceTitle: "Google Cloud Artifact Registry vulnerability scanning",
      resourceUrl:
        "https://cloud.google.com/artifact-registry/docs/analysis",
      keywords: ["ci scanning", "shift left", "cve"],
      tooltipTerms: [],
    },
    {
      id: "p21-ctr-009",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A security review flags that an application's container is configured with a writable root filesystem even though the application never writes to disk at runtime. What is the most direct security benefit of switching this container to a read-only root filesystem (mounting a small writable volume only where needed, e.g. `/tmp`)?",
      question_he:
        "בבדיקת אבטחה מתגלה שהקונטיינר של אפליקציה מוגדר עם root filesystem הניתן לכתיבה, אף שהאפליקציה מעולם לא כותבת לדיסק בזמן ריצה. מהי התועלת האבטחתית הישירה ביותר במעבר של קונטיינר זה ל-root filesystem לקריאה בלבד (read-only), עם הרכבת volume כתיב קטן רק היכן שנדרש (למשל `/tmp`)?",
      options: [
        "It prevents an attacker who gains code execution inside the container from persisting malware, tampering with binaries, or modifying application files on disk, since the filesystem itself rejects writes",
        "It automatically encrypts all data the application processes in memory",
        "It eliminates the need for the container to share the host kernel",
        "It allows the container to run without a base image at all",
      ],
      options_he: [
        "זה מונע מתוקף שהשיג הרצת קוד בתוך הקונטיינר מלהתמיד עם malware, לשנות בינאריים או לשנות קבצי אפליקציה על הדיסק, מכיוון שה-filesystem עצמו דוחה כתיבות",
        "זה מצפין אוטומטית את כל הנתונים שהאפליקציה מעבדת בזיכרון",
        "זה מבטל את הצורך של הקונטיינר לחלוק את kernel ה-host",
        "זה מאפשר לקונטיינר לרוץ ללא base image כלל",
      ],
      correctAnswer: 0,
      explanation:
        "A read-only root filesystem is a runtime hardening control: even if an attacker achieves code execution inside the container (e.g. via an application vulnerability), they cannot write a webshell, modify existing binaries, or drop persistence artifacts to the container's filesystem, since write attempts are rejected at the OS level. It does not affect kernel sharing (containers always share the host kernel by design) or memory encryption, and a base image is still required to provide the filesystem layout and libraries the application needs.",
      explanation_he:
        "root filesystem לקריאה בלבד הוא אמצעי הקשחה (hardening) בזמן ריצה: גם אם תוקף משיג הרצת קוד בתוך הקונטיינר (למשל דרך פגיעות באפליקציה), הוא לא יכול לכתוב webshell, לשנות בינאריים קיימים, או להטמיע ארטיפקטים של persistence ל-filesystem של הקונטיינר, מכיוון שניסיונות כתיבה נדחים ברמת מערכת ההפעלה. זה לא משפיע על שיתוף ה-kernel (קונטיינרים תמיד חולקים את kernel ה-host מעצם התכנון) או על הצפנת זיכרון, ועדיין נדרש base image שיספק את מבנה ה-filesystem והספריות שהאפליקציה צריכה.",
      resourceTitle: "Kubernetes configure a security context for a Pod",
      resourceUrl:
        "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",
      keywords: ["read-only filesystem", "hardening", "runtime security"],
      tooltipTerms: ["Pod"],
    },
    {
      id: "p21-ctr-010",
      providers: ["neutral"],
      domains: ["containers"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A team assumes their containers provide security isolation equivalent to separate virtual machines, and plans to run untrusted third-party workloads as containers on the same host as sensitive internal services, relying only on default container runtime settings. What is the key architectural flaw in this assumption?",
      question_he:
        "צוות מניח שהקונטיינרים שלהם מספקים בידוד אבטחה שקול למכונות וירטואליות נפרדות, ומתכנן להריץ עומסי עבודה חיצוניים שאינם מהימנים כקונטיינרים על אותו host יחד עם שירותים פנימיים רגישים, תוך הסתמכות רק על הגדרות ברירת המחדל של runtime הקונטיינר. מהו הפגם הארכיטקטוני המרכזי בהנחה זו?",
      options: [
        "Containers on the same host share a single kernel, so a kernel-level exploit or an escape from one container can potentially affect every other container and the host itself, unlike VMs which each run their own isolated kernel via a hypervisor boundary",
        "Containers cannot communicate over a network, so this setup is actually safer than VMs by default",
        "Container runtimes automatically apply full workload isolation equal to a hypervisor with zero extra configuration",
        "This is not a real concern because containers cannot access any host resources under any configuration",
      ],
      options_he: [
        "קונטיינרים על אותו host חולקים kernel יחיד, כך שניצול ברמת kernel או בריחה מקונטיינר אחד עלולים להשפיע על כל קונטיינר אחר ועל ה-host עצמו, בשונה מ-VMs שכל אחת מריצה kernel מבודד משלה דרך גבול hypervisor",
        "קונטיינרים אינם יכולים לתקשר ברשת, כך שההגדרה הזו למעשה בטוחה יותר מ-VMs כברירת מחדל",
        "runtime של קונטיינרים מיישם אוטומטית בידוד עומסים מלא השקול ל-hypervisor ללא כל תצורה נוספת",
        "זו אינה דאגה אמיתית משום שקונטיינרים אינם יכולים לגשת לשום משאב host תחת כל תצורה",
      ],
      correctAnswer: 0,
      explanation:
        "Containers are process-level isolation on a shared kernel, not hardware-level virtualization: a kernel vulnerability, a container escape, or a misconfigured privileged capability can let a workload in one container reach the host or neighboring containers. VMs isolate at the hypervisor layer with each guest running its own kernel, which contains that class of risk. For genuinely untrusted multi-tenant workloads, teams typically add layers like gVisor/Kata Containers (sandboxed runtimes), dedicated node pools, or actual VM-level isolation rather than relying on default container settings alone.",
      explanation_he:
        "קונטיינרים מספקים בידוד ברמת תהליך על kernel משותף, ולא וירטואליזציה ברמת חומרה: פגיעות ב-kernel, בריחה מקונטיינר, או יכולת privileged שהוגדרה בצורה שגויה עלולות לאפשר לעומס עבודה בקונטיינר אחד להגיע ל-host או לקונטיינרים שכנים. VMs מבודדות בשכבת ה-hypervisor כאשר כל guest מריץ kernel משלו, מה שמכיל את סוג הסיכון הזה. עבור עומסי עבודה רב-דיירים שאינם מהימנים באמת, צוותים בדרך כלל מוסיפים שכבות כמו gVisor/Kata Containers (runtimes בסביבת sandbox), pools צמתים ייעודיים, או בידוד אמיתי ברמת VM במקום להסתמך רק על הגדרות ברירת המחדל של הקונטיינר.",
      resourceTitle: "Kubernetes overview of containers",
      resourceUrl: "https://kubernetes.io/docs/concepts/containers/",
      keywords: ["isolation", "shared kernel", "multi-tenancy"],
      tooltipTerms: ["Cluster"],
    },
  ],
});
