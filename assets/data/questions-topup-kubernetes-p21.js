/**
 * questions-topup-kubernetes-p21.js — Phase 21 coverage top-up: Kubernetes (9 questions).
 * Deepens thin difficulty slices in the kubernetes domain. Registers
 * itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-kubernetes-p21",
  label: "Kubernetes — Phase 21 Top-up",
  questions: [
    {
      id: "p21-k8s-001",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A Pod's manifest requests 2 CPU and 4Gi memory, but the cluster's largest available node only has 4 CPU and 8Gi memory total (already running other workloads that consume most of it). What state will the new Pod most likely remain in?",
      question_he:
        "מניפסט של Pod מבקש 2 CPU ו-4Gi זיכרון, אך הצומת (node) הגדול ביותר בקלאסטר כולל רק 4 CPU ו-8Gi זיכרון (וכבר מריץ עומסים אחרים שצורכים את רובם). באיזה מצב סביר שה-Pod החדש יישאר?",
      options: ["Running", "Pending", "CrashLoopBackOff", "Succeeded"],
      options_he: ["Running", "Pending", "CrashLoopBackOff", "Succeeded"],
      correctAnswer: 1,
      explanation:
        "When the scheduler cannot find any node with enough allocatable CPU and memory to satisfy a Pod's resource requests, it leaves the Pod unscheduled in Pending state rather than starting it and risking node overcommit. CrashLoopBackOff only applies once a container has actually started and is repeatedly failing, which never happens here since scheduling never succeeds.",
      explanation_he:
        "כאשר ה-scheduler לא מוצא אף node עם מספיק CPU וזיכרון פנויים (allocatable) כדי לספק את בקשות המשאבים (resource requests) של ה-Pod, הוא משאיר את ה-Pod ללא שיבוץ במצב Pending במקום להריץ אותו ולסכן עומס יתר על ה-node. מצב CrashLoopBackOff רלוונטי רק לאחר שקונטיינר כבר החל לרוץ וממשיך להיכשל שוב ושוב, מה שלא קורה כאן כי השיבוץ מעולם לא הצליח.",
      resourceTitle: "Kubernetes Docs: Assign Memory Resources to Containers",
      resourceUrl:
        "https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/",
      keywords: ["scheduling", "resource requests", "pending"],
      tooltipTerms: ["Pod", "Node"],
    },
    {
      id: "p21-k8s-002",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Secrets in Kubernetes store values as base64-encoded text by default, which is an encoding, not encryption, so anyone who can read the Secret object can trivially decode its contents.",
      question_he:
        "Secrets ב-Kubernetes שומרים ערכים כטקסט מקודד ב-base64 כברירת מחדל, וזהו קידוד (encoding) ולא הצפנה (encryption), כך שכל מי שיכול לקרוא את אובייקט ה-Secret יכול לפענח את תוכנו בקלות.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "Base64 is a reversible encoding scheme with no key, so a Secret's data is only as protected as the RBAC permissions and etcd encryption-at-rest configuration around it. Teams that need real confidentiality must combine Secrets with encryption at rest and tight RBAC, or use an external secrets manager rather than relying on base64 alone.",
      explanation_he:
        "base64 הוא קידוד הפיך שאינו דורש מפתח, כך שהנתונים ב-Secret מוגנים רק במידה שבה מוגדרים הרשאות RBAC והצפנה במנוחה (encryption at rest) ב-etcd סביבם. צוותים שזקוקים לסודיות אמיתית חייבים לשלב Secrets עם הצפנה במנוחה והרשאות RBAC מחמירות, או להשתמש במנהל סודות חיצוני במקום להסתמך על base64 בלבד.",
      resourceTitle: "Kubernetes Docs: Secrets",
      resourceUrl: "https://kubernetes.io/docs/concepts/configuration/secret/",
      keywords: ["secrets", "base64", "encryption"],
      tooltipTerms: [],
    },
    {
      id: "p21-k8s-003",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team wants to store non-sensitive application settings, like a log level and a feature-flag toggle, so that Pods can read them as environment variables. Which object is the appropriate choice?",
      question_he:
        "צוות רוצה לאחסן הגדרות אפליקציה שאינן רגישות, כמו רמת לוגים (log level) ומתג feature-flag, כך שה-Pods יוכלו לקרוא אותן כמשתני סביבה. איזה אובייקט הוא הבחירה המתאימה?",
      options: ["Secret", "ConfigMap", "PersistentVolumeClaim", "Namespace"],
      options_he: ["Secret", "ConfigMap", "PersistentVolumeClaim", "Namespace"],
      correctAnswer: 1,
      explanation:
        "ConfigMaps are designed for non-sensitive configuration data such as flags and settings, and their contents are visible in plain text to anyone who can read the object. Secrets exist for sensitive data and get slightly different handling (like being excluded from some logs), while PersistentVolumeClaim is for storage and Namespace is an isolation boundary, not a configuration store.",
      explanation_he:
        "ConfigMap מיועד לנתוני תצורה שאינם רגישים כמו דגלים והגדרות, ותוכנו גלוי כטקסט רגיל לכל מי שיכול לקרוא את האובייקט. Secret מיועד לנתונים רגישים ומקבל טיפול מעט שונה (כמו הוצאה מלוגים מסוימים), בעוד PersistentVolumeClaim מיועד לאחסון ו-Namespace הוא גבול בידוד ולא מאגר תצורה.",
      resourceTitle: "Kubernetes Docs: ConfigMaps",
      resourceUrl: "https://kubernetes.io/docs/concepts/configuration/configmap/",
      keywords: ["configmap", "configuration", "secrets"],
      tooltipTerms: ["Namespace"],
    },
    {
      id: "p21-k8s-004",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "During a rolling update, the new Pod version passes its liveness probe immediately but its readiness probe never succeeds because the app takes 60 seconds to warm its cache. What is the most likely observable impact?",
      question_he:
        "במהלך rolling update, גרסת ה-Pod החדשה עוברת מיד את בדיקת ה-liveness probe שלה, אך בדיקת ה-readiness probe שלה לעולם לא מצליחה כי לאפליקציה לוקח 60 שניות לחמם את המטמון (cache). מהי ההשפעה הנצפית הסבירה ביותר?",
      options: [
        "The old Pods are terminated immediately, causing a full outage",
        "The new Pods stay out of Service endpoints indefinitely while old Pods are gradually terminated, shrinking capacity until an outage occurs",
        "Kubernetes automatically extends the readiness probe timeout to compensate",
        "The Deployment rolls back to the previous ReplicaSet without any configuration",
      ],
      options_he: [
        "ה-Pods הישנים מסתיימים מיד, מה שגורם להשבתה מלאה",
        "ה-Pods החדשים נשארים מחוץ ל-endpoints של ה-Service ללא הגבלת זמן, בעוד Pods ישנים מסתיימים בהדרגה, מה שמצמצם את הקיבולת עד להשבתה",
        "Kubernetes מאריך אוטומטית את ה-timeout של readiness probe כדי לפצות",
        "ה-Deployment חוזר אוטומטית ל-ReplicaSet הקודם ללא שום תצורה",
      ],
      correctAnswer: 1,
      explanation:
        "Readiness failures never trigger a restart (that's liveness's job), but a Pod that never becomes Ready never receives traffic through the Service. A rolling update keeps terminating old, working Pods to make room for the replacement count, so if the new Pods never pass readiness, total serving capacity keeps shrinking until requests start failing — with no automatic rollback unless one is explicitly configured (e.g., via progressDeadlineSeconds plus external automation).",
      explanation_he:
        "כישלון ב-readiness probe לעולם לא גורם להפעלה מחדש (זה תפקידו של liveness), אבל Pod שלעולם לא הופך ל-Ready לעולם לא מקבל תעבורה דרך ה-Service. rolling update ממשיך לסיים Pods ישנים ותקינים כדי לפנות מקום למספר ההחלפות, כך שאם ה-Pods החדשים לעולם לא עוברים readiness, קיבולת השירות הכוללת ממשיכה להצטמצם עד שבקשות מתחילות להיכשל - ללא rollback אוטומטי אלא אם הוגדר אחד במפורש (למשל דרך progressDeadlineSeconds יחד עם אוטומציה חיצונית).",
      resourceTitle: "Kubernetes Docs: Configure Liveness, Readiness and Startup Probes",
      resourceUrl:
        "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
      keywords: ["readiness probe", "rolling update", "outage"],
      tooltipTerms: ["Pod"],
    },
    {
      id: "p21-k8s-005",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "Which of the following statements correctly describe differences between a Kubernetes Role and a ClusterRole? (Select all that apply)",
      question_he:
        "אילו מהאמירות הבאות מתארות נכון הבדלים בין Role ל-ClusterRole ב-Kubernetes? (בחר את כל הנכונות)",
      options: [
        "A Role's permissions are scoped to a single Namespace when bound with a RoleBinding",
        "A ClusterRole can be bound cluster-wide, or scoped to a single Namespace via a RoleBinding",
        "A Role can grant access to cluster-scoped resources such as Nodes or PersistentVolumes",
        "A ClusterRoleBinding always grants permissions across every Namespace in the cluster",
      ],
      options_he: [
        "ההרשאות של Role מוגבלות ל-Namespace יחיד כאשר הן נקשרות באמצעות RoleBinding",
        "ClusterRole ניתן לקשירה ברמת הקלאסטר כולו, או להגבלה ל-Namespace יחיד באמצעות RoleBinding",
        "Role יכול להעניק גישה למשאבים ברמת הקלאסטר (cluster-scoped) כמו Nodes או PersistentVolumes",
        "ClusterRoleBinding תמיד מעניק הרשאות על פני כל ה-Namespaces בקלאסטר",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "A Role is always namespaced and cannot grant access to cluster-scoped resources like Nodes, so a RoleBinding referencing it only ever applies within one Namespace. A ClusterRole is more flexible: it can be bound cluster-wide with a ClusterRoleBinding (which always grants access across all Namespaces), or reused per-Namespace by binding it with an ordinary RoleBinding, which is a common pattern for reusable permission sets.",
      explanation_he:
        "Role תמיד מוגבל ל-Namespace ואינו יכול להעניק גישה למשאבים ברמת הקלאסטר כמו Nodes, כך ש-RoleBinding שמפנה אליו חל תמיד רק בתוך Namespace אחד. ClusterRole גמיש יותר: ניתן לקשור אותו ברמת הקלאסטר כולו באמצעות ClusterRoleBinding (שתמיד מעניק גישה על פני כל ה-Namespaces), או לעשות בו שימוש חוזר בכל Namespace בנפרד על ידי קשירתו באמצעות RoleBinding רגיל, שהיא תבנית נפוצה לסטים הרשאות שניתנים לשימוש חוזר.",
      resourceTitle: "Kubernetes Docs: Using RBAC Authorization",
      resourceUrl: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
      keywords: ["rbac", "role", "clusterrole", "rolebinding"],
      tooltipTerms: ["Namespace"],
    },
    {
      id: "p21-k8s-006",
      providers: ["neutral"],
      domains: ["kubernetes", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A platform team places each customer's workloads in its own Namespace and assumes this fully isolates tenants from one another. Which statement best explains why this assumption is risky?",
      question_he:
        "צוות פלטפורמה ממקם את עומסי העבודה של כל לקוח ב-Namespace משלו ומניח שזה מבודד לחלוטין את הדיירים (tenants) זה מזה. איזו אמירה מסבירה בצורה הטובה ביותר מדוע הנחה זו מסוכנת?",
      options: [
        "Namespace boundaries automatically encrypt network traffic between Pods in different Namespaces",
        "By default, Pods in different Namespaces can still communicate freely over the network, and cluster-scoped resources plus shared node/kernel resources are not isolated by Namespace at all",
        "Namespaces prevent all resource contention automatically without requiring ResourceQuotas",
        "Each Namespace runs on a dedicated set of Nodes by default, guaranteeing physical isolation",
      ],
      options_he: [
        "גבולות Namespace מצפינים אוטומטית תעבורת רשת בין Pods ב-Namespaces שונים",
        "כברירת מחדל, Pods ב-Namespaces שונים עדיין יכולים לתקשר בחופשיות ברשת, ומשאבים ברמת הקלאסטר (cluster-scoped) יחד עם משאבי node/kernel משותפים אינם מבודדים על ידי Namespace כלל",
        "Namespaces מונעים אוטומטית כל תחרות על משאבים ללא צורך ב-ResourceQuotas",
        "כל Namespace רץ כברירת מחדל על סט ייעודי של Nodes, מה שמבטיח בידוד פיזי",
      ],
      correctAnswer: 1,
      explanation:
        "Namespace is purely an organizational and API-scoping boundary; without a NetworkPolicy, Pods in separate Namespaces can reach each other over the pod network by default, and cluster-scoped objects (Nodes, PersistentVolumes, ClusterRoles, CRDs) are visible cluster-wide regardless of Namespace. Pods from different Namespaces can also still share the same Node's kernel, so true multi-tenant isolation needs NetworkPolicy, ResourceQuotas, and often dedicated node pools or runtime sandboxing, not Namespace alone.",
      explanation_he:
        "Namespace הוא גבול ארגוני ותיחום API בלבד; ללא NetworkPolicy, Pods ב-Namespaces נפרדים יכולים להגיע זה לזה דרך רשת ה-pod כברירת מחדל, ואובייקטים ברמת הקלאסטר (Nodes, PersistentVolumes, ClusterRoles, CRDs) גלויים על פני כל הקלאסטר ללא קשר ל-Namespace. Pods מ-Namespaces שונים יכולים גם לשתף את אותו kernel של Node, כך שבידוד אמיתי בין דיירים (multi-tenant) דורש NetworkPolicy, ResourceQuotas, ולעיתים קרובות node pools ייעודיים או sandboxing של runtime, ולא Namespace לבדו.",
      resourceTitle: "Kubernetes Docs: Network Policies",
      resourceUrl: "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
      keywords: ["namespace", "multi-tenancy", "isolation", "network policy"],
      tooltipTerms: ["Namespace", "Network Policy", "Pod", "Node"],
    },
    {
      id: "p21-k8s-007",
      providers: ["neutral"],
      domains: ["kubernetes"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A team migrates a clustered database from a Deployment to a StatefulSet. Which behavior change should they expect that specifically justifies this migration?",
      question_he:
        "צוות מהגר מסד נתונים מבוזר (clustered) מ-Deployment ל-StatefulSet. איזה שינוי התנהגות עליהם לצפות לו שמצדיק ספציפית את ההגירה הזו?",
      options: [
        "Each replica gets a stable, predictable network identity and its own persistent volume that follows it across rescheduling, with ordered, sequential startup and shutdown",
        "All replicas will now share a single PersistentVolume mounted read-write by every Pod simultaneously",
        "The StatefulSet will automatically shard the database data across replicas without any application-level configuration",
        "Rolling updates become impossible, so every upgrade requires deleting the entire StatefulSet",
      ],
      options_he: [
        "כל replica מקבל זהות רשת יציבה וצפויה, ואת ה-persistent volume שלו שנשאר איתו גם לאחר שיבוץ מחדש (rescheduling), עם עלייה וכיבוי מסודרים ובסדר עוקב",
        "כל ה-replicas ישתפו כעת PersistentVolume יחיד שמורכב (mounted) לקריאה-כתיבה על ידי כל Pod במקביל",
        "ה-StatefulSet יבצע אוטומטית sharding לנתוני מסד הנתונים בין ה-replicas ללא כל תצורה ברמת האפליקציה",
        "rolling updates הופכים לבלתי אפשריים, כך שכל שדרוג דורש מחיקה של כל ה-StatefulSet",
      ],
      correctAnswer: 0,
      explanation:
        "StatefulSets exist specifically to give each replica a stable, ordinal-based network identity (like db-0, db-1) and its own dedicated PersistentVolumeClaim that is reattached to the same replica identity even after rescheduling, plus ordered, sequential pod creation/deletion — properties clustered databases typically need for peer discovery and data consistency. A Deployment's Pods are interchangeable and share no such per-replica identity or dedicated storage binding, which is exactly the gap a StatefulSet closes; it does not imply shared read-write volumes or automatic data sharding.",
      explanation_he:
        "StatefulSets קיימים בדיוק כדי לתת לכל replica זהות רשת יציבה ומבוססת סדר (כמו db-0, db-1) ואת ה-PersistentVolumeClaim הייעודי שלו שמחובר מחדש לאותה זהות replica גם לאחר שיבוץ מחדש, יחד עם יצירה/מחיקה מסודרת ועוקבת של Pods - תכונות שמסדי נתונים מבוזרים בדרך כלל זקוקים להן לצורך גילוי עמיתים (peer discovery) ועקביות נתונים. Pods של Deployment הם ניתנים להחלפה ואינם חולקים זהות per-replica או קישור אחסון ייעודי כזה, וזה בדיוק הפער ש-StatefulSet סוגר; זה לא מרמז על volumes משותפים לקריאה-כתיבה או sharding אוטומטי של נתונים.",
      resourceTitle: "Kubernetes Docs: StatefulSets",
      resourceUrl: "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
      keywords: ["statefulset", "deployment", "persistent storage", "identity"],
      tooltipTerms: ["Pod"],
    },
    {
      id: "p21-k8s-008",
      providers: ["neutral"],
      domains: ["kubernetes", "monitoring"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A cluster has an HPA configured on a Deployment targeting 60% average CPU, and the cluster autoscaler is also enabled on the node pool. During a traffic spike, all nodes reach full CPU and memory allocation and new Pods stay Pending. What happens next, assuming both components are functioning correctly?",
      question_he:
        "בקלאסטר מוגדר HPA על Deployment שמתמקד ב-60% CPU ממוצע, וגם cluster autoscaler מופעל על ה-node pool. במהלך עומס תעבורה, כל ה-nodes מגיעים להקצאת CPU וזיכרון מלאה ו-Pods חדשים נשארים Pending. מה קורה בהמשך, בהנחה ששני הרכיבים פועלים כראוי?",
      options: [
        "The HPA will lower the Deployment's replica count to fit within existing node capacity",
        "The HPA increases replica count based on observed CPU metrics, and separately the cluster autoscaler detects unschedulable Pending Pods and provisions additional nodes to accommodate them",
        "The cluster autoscaler adjusts the HPA's target CPU percentage automatically to prevent further scaling",
        "Nothing changes automatically; both components require manual approval before scaling",
      ],
      options_he: [
        "ה-HPA יוריד את מספר ה-replicas של ה-Deployment כדי להתאים לקיבולת ה-node הקיימת",
        "ה-HPA מגדיל את מספר ה-replicas בהתבסס על מדדי CPU נצפים, ובמקביל cluster autoscaler מזהה Pods במצב Pending שלא ניתנים לשיבוץ ומספק nodes נוספים כדי להכיל אותם",
        "ה-cluster autoscaler מתאים אוטומטית את יעד ה-CPU של ה-HPA כדי למנוע המשך scaling",
        "שום דבר לא משתנה אוטומטית; שני הרכיבים דורשים אישור ידני לפני scaling",
      ],
      correctAnswer: 1,
      explanation:
        "The HPA and cluster autoscaler solve two different problems and react to different signals: the HPA watches Pod-level metrics like CPU/memory utilization and adjusts replica count, while the cluster autoscaler watches for Pods that fail to schedule due to insufficient node capacity and adds nodes (or removes underutilized ones) independently of any HPA metric. They work together during a spike — HPA drives replica count up, which can produce unschedulable Pending Pods, which the cluster autoscaler then resolves by growing the node pool.",
      explanation_he:
        "HPA ו-cluster autoscaler פותרים שתי בעיות שונות ומגיבים לאותות שונים: HPA עוקב אחר מדדים ברמת ה-Pod כמו ניצול CPU/זיכרון ומתאים את מספר ה-replicas, בעוד cluster autoscaler עוקב אחר Pods שנכשלים בשיבוץ בשל קיבולת node לא מספקת ומוסיף nodes (או מסיר כאלה שאינם מנוצלים) ללא תלות במדד כלשהו של HPA. הם פועלים יחד במהלך עומס - HPA מעלה את מספר ה-replicas, מה שעלול ליצור Pods במצב Pending שלא ניתנים לשיבוץ, ואותם פותר לאחר מכן cluster autoscaler על ידי הגדלת ה-node pool.",
      resourceTitle: "Kubernetes Docs: Horizontal Pod Autoscaling",
      resourceUrl:
        "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
      keywords: ["hpa", "cluster autoscaler", "scaling", "pending"],
      tooltipTerms: ["Pod", "Node"],
    },
    {
      id: "p21-k8s-009",
      providers: ["neutral"],
      domains: ["kubernetes", "security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A security team wants to enforce a guardrail that automatically rejects any new Pod manifest requesting privileged containers, cluster-wide, without relying on developers to self-police. Which Kubernetes mechanism is designed exactly for this?",
      question_he:
        "צוות אבטחה רוצה לאכוף חסם הגנה (guardrail) שדוחה אוטומטית כל מניפסט Pod חדש שמבקש קונטיינרים privileged, ברמת הקלאסטר כולו, מבלי להסתמך על מפתחים שישמרו על עצמם. איזה מנגנון של Kubernetes תוכנן בדיוק לצורך זה?",
      options: [
        "A ResourceQuota object scoped to each Namespace",
        "A validating admission webhook (or a built-in Pod Security Admission policy) that intercepts Pod create requests before they are persisted",
        "A LimitRange object attached to the default ServiceAccount",
        "A readiness probe configured on the container spec",
      ],
      options_he: [
        "אובייקט ResourceQuota המוגדר עבור כל Namespace",
        "webhook מסוג validating admission (או מדיניות מובנית של Pod Security Admission) שמיירט בקשות ליצירת Pod לפני שהן נשמרות",
        "אובייקט LimitRange המצורף ל-ServiceAccount ברירת המחדל",
        "readiness probe שמוגדר במפרט (spec) של הקונטיינר",
      ],
      correctAnswer: 1,
      explanation:
        "Admission controllers run in the API request pipeline after authentication/authorization but before an object is persisted to etcd, and a validating admission webhook (or the built-in Pod Security Admission controller) can inspect a Pod spec and reject it outright if it requests privileged mode or other disallowed settings. ResourceQuota and LimitRange govern resource consumption, not security context fields, and a readiness probe only affects traffic routing for an already-running Pod, none of which can block a non-compliant Pod from being created in the first place.",
      explanation_he:
        "בקרי admission (admission controllers) פועלים בצינור בקשות ה-API לאחר אימות (authentication) והרשאה (authorization) אך לפני שהאובייקט נשמר ב-etcd, ו-webhook מסוג validating admission (או בקר Pod Security Admission המובנה) יכול לבדוק spec של Pod ולדחות אותו לחלוטין אם הוא מבקש מצב privileged או הגדרות אסורות אחרות. ResourceQuota ו-LimitRange שולטים בצריכת משאבים ולא בשדות security context, ו-readiness probe משפיע רק על ניתוב תעבורה עבור Pod שכבר רץ - אף אחד מהם אינו יכול לחסום יצירה של Pod לא תואם מלכתחילה.",
      resourceTitle: "Kubernetes Docs: Admission Controllers Reference",
      resourceUrl: "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/",
      keywords: ["admission controller", "webhook", "pod security", "guardrails"],
      tooltipTerms: ["Pod"],
    },
  ],
});
