/**
 * questions-topup-mcp-p21.js — Phase 21 coverage top-up: MCP (10 questions).
 * Deepens thin difficulty slices. Registers itself via
 * CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-mcp-p21",
  label: "MCP — Phase 21 Top-up",
  questions: [
    {
      id: "p21-mcp-001",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer runs an MCP server as a local process that communicates with the client over standard input/output (stdio), rather than over a network socket. What does this imply about where the server can be used?",
      question_he:
        "מפתח מריץ MCP Server כתהליך מקומי המתקשר עם ה-client דרך standard input/output (stdio), ולא דרך socket רשתי. מה זה אומר על היכן ניתן להשתמש בשרת?",
      options: [
        "It must run on the same machine as the client that launches it, since stdio is a local inter-process channel",
        "It can be reached by any client on the internet, because stdio is automatically tunneled over HTTP",
        "It requires a dedicated port to be opened on the firewall",
        "It can only be used by one user account system-wide, regardless of machine",
      ],
      options_he: [
        "הוא חייב לרוץ על אותו מחשב כמו ה-client שמפעיל אותו, מכיוון ש-stdio הוא ערוץ תקשורת מקומי בין תהליכים",
        "ניתן להגיע אליו מכל client באינטרנט, כי stdio מנותב אוטומטית דרך HTTP",
        "נדרש לפתוח פורט ייעודי בחומת האש",
        "ניתן להשתמש בו רק על ידי חשבון משתמש אחד בכל המערכת, ללא קשר למחשב",
      ],
      correctAnswer: 0,
      explanation:
        "A stdio-based transport ties the server process directly to the client's process on the same host — the client typically spawns the server and pipes its stdin/stdout. That's fundamentally different from a network-based (e.g. HTTP/SSE) transport, which can serve remote clients over a network. Choosing stdio vs. a network transport is a real architectural decision that affects deployment, not just an implementation detail.",
      explanation_he:
        "transport מבוסס stdio קושר את תהליך ה-server ישירות לתהליך ה-client על אותו מארח — ה-client בדרך כלל מפעיל את ה-server ומחבר צנרת (pipe) ל-stdin/stdout שלו. זה שונה מהותית מ-transport רשתי (כגון HTTP/SSE), שיכול לשרת clients מרוחקים דרך הרשת. הבחירה בין stdio ל-transport רשתי היא החלטה ארכיטקטונית אמיתית שמשפיעה על הפריסה, ולא רק פרט מימוש.",
      resourceTitle: "MCP — Architecture",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/architecture",
      keywords: ["transport", "stdio", "local server", "architecture"],
      tooltipTerms: ["MCP", "MCP Server", "MCP Client"],
    },
    {
      id: "p21-mcp-002",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "In MCP, an agent can only ever use tools that were hardcoded into it at development time; it can never learn about new tools from a server while running.",
      question_he:
        "ב-MCP, agent יכול להשתמש רק בכלים (tools) שהוקודדו בו מראש בזמן הפיתוח; הוא אף פעם לא יכול ללמוד על tools חדשים משרת בזמן ריצה.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "MCP supports dynamic discovery: a client can query a connected server to list the tools (and resources/prompts) it currently offers, rather than the integration being fixed at build time. This means a server can add or change its offerings and a well-behaved client will pick that up the next time it asks, instead of requiring the agent's code to be rewritten.",
      explanation_he:
        "MCP תומך בגילוי דינמי: client יכול לשאול server מחובר לקבל רשימה של ה-tools (וגם resources/prompts) שהוא מציע כרגע, במקום שהאינטגרציה תהיה קבועה בזמן הבנייה. המשמעות היא ששרת יכול להוסיף או לשנות את מה שהוא מציע, ו-client תקין יזהה זאת בפעם הבאה שהוא שואל, במקום לדרוש שכתוב של קוד ה-agent.",
      resourceTitle: "MCP — Tools",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/tools",
      keywords: ["discovery", "dynamic", "tools list"],
      tooltipTerms: ["MCP", "MCP Client", "MCP Server"],
    },
    {
      id: "p21-mcp-003",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "An agent is connected to one MCP server for handling calendar events. What happens, in general, if that single connected server becomes unavailable, from the agent framework's perspective?",
      question_he:
        "agent מחובר ל-MCP server אחד לטיפול באירועי לוח שנה. מה קורה באופן כללי אם אותו server מחובר יחיד הופך לבלתי זמין, מנקודת המבט של מסגרת ה-agent?",
      options: [
        "The agent can no longer use the capabilities that server provided, and any request depending on them should fail or be handled gracefully rather than silently succeeding",
        "The MCP protocol automatically restarts the operating system service hosting the server",
        "All other unrelated software on the machine also stops working",
        "The client automatically rewrites the user's original question to avoid needing that server",
      ],
      options_he: [
        "ה-agent כבר לא יכול להשתמש ביכולות שאותו server סיפק, וכל בקשה שתלויה בהן אמורה להיכשל או להיות מטופלת בצורה מבוקרת ולא להצליח בשקט",
        "פרוטוקול MCP מפעיל מחדש אוטומטית את שירות מערכת ההפעלה שמארח את השרת",
        "כל תוכנה אחרת ולא קשורה במחשב מפסיקה לעבוד גם היא",
        "ה-client כותב מחדש אוטומטית את השאלה המקורית של המשתמש כדי להימנע מהצורך באותו server",
      ],
      correctAnswer: 0,
      explanation:
        "When a connected server goes down, the capabilities (tools/resources/prompts) it exposed simply become unavailable to the client. Nothing in MCP itself guarantees automatic recovery of the server process; well-designed agent applications are expected to detect the failure and respond sensibly (error message, fallback, retry) instead of assuming success. Options claiming system-wide effects or auto-restarts describe behavior outside what the protocol provides.",
      explanation_he:
        "כאשר server מחובר נופל, היכולות (tools/resources/prompts) שהוא חשף פשוט הופכות לבלתי זמינות ל-client. שום דבר ב-MCP עצמו לא מבטיח שחזור אוטומטי של תהליך השרת; אפליקציות agent מתוכננות היטב אמורות לזהות את הכשל ולהגיב בצורה הגיונית (הודעת שגיאה, נפילה חזרה, ניסיון חוזר) במקום להניח הצלחה. אפשרויות שטוענות להשפעה כלל-מערכתית או הפעלה מחדש אוטומטית מתארות התנהגות שאינה חלק מהפרוטוקול.",
      resourceTitle: "MCP — Introduction",
      resourceUrl: "https://modelcontextprotocol.io/introduction",
      keywords: ["error handling", "availability", "graceful degradation"],
      tooltipTerms: ["MCP", "MCP Server", "Agent"],
    },
    {
      id: "p21-mcp-004",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "Before an MCP client starts using a server's features, the two sides exchange information about what each supports. Why does this capability negotiation step matter in practice?",
      question_he:
        "לפני שclient של MCP מתחיל להשתמש בתכונות של server, שני הצדדים מחליפים מידע על מה כל אחד תומך בו. למה שלב משא ומתן היכולות (capability negotiation) הזה חשוב בפועל?",
      options: [
        "It lets the client know which optional features (like prompts or sampling) the server actually implements, so it doesn't try to call something the server never offered",
        "It permanently locks the server's tool list so it can never change again",
        "It replaces the need for any authentication between client and server",
        "It guarantees the server's tools will run faster once negotiated",
      ],
      options_he: [
        "זה מאפשר ל-client לדעת אילו תכונות אופציונליות (כמו prompts או sampling) ה-server בפועל מיישם, כך שהוא לא ינסה לקרוא למשהו שהשרת מעולם לא הציע",
        "זה נועל לצמיתות את רשימת ה-tools של השרת כך שהיא לעולם לא תוכל להשתנות שוב",
        "זה מחליף את הצורך באימות (authentication) כלשהו בין client ל-server",
        "זה מבטיח שה-tools של השרת ירוצו מהר יותר לאחר המשא ומתן",
      ],
      correctAnswer: 0,
      explanation:
        "Not every MCP server implements every optional feature (tools, resources, prompts, sampling are all optional building blocks). Capability negotiation at connection time lets the client learn what's actually supported so it avoids invoking unsupported functionality and can adapt its behavior accordingly. It has nothing to do with authentication or performance guarantees, and it doesn't freeze the tool list forever — servers can still change what they expose between sessions.",
      explanation_he:
        "לא כל MCP server מיישם כל תכונה אופציונלית (tools, resources, prompts, sampling הם כולם אבני בניין אופציונליות). משא ומתן יכולות בזמן ההתחברות מאפשר ל-client ללמוד מה נתמך בפועל כך שהוא נמנע מקריאה לפונקציונליות לא נתמכת ויכול להתאים את התנהגותו בהתאם. אין לזה קשר לאימות או להבטחות ביצועים, וזה גם לא קופא את רשימת ה-tools לנצח — שרתים עדיין יכולים לשנות את מה שהם חושפים בין sessions.",
      resourceTitle: "MCP — Architecture",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/architecture",
      keywords: ["capability negotiation", "handshake", "optional features"],
      tooltipTerms: ["MCP", "MCP Client", "MCP Server"],
    },
    {
      id: "p21-mcp-005",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "An MCP server for a code-review tool wants the connected client's LLM to draft a short commit message summarizing a diff, using the LLM's own reasoning rather than the server's logic. Which MCP primitive is designed for exactly this kind of request?",
      question_he:
        "MCP server של כלי code-review רוצה שה-LLM המחובר של ה-client ינסח הודעת commit קצרה שמסכמת diff, תוך שימוש בהיגיון של ה-LLM עצמו ולא בלוגיקה של השרת. איזה primitive של MCP מיועד בדיוק לסוג בקשה כזה?",
      options: [
        "A sampling request, where the server asks the client to have its LLM generate a completion on the server's behalf",
        "A tool call, since generating text is always classified as a tool invocation",
        "A resource read, since the commit message is treated as static file content",
        "A capability negotiation message, since it happens before any content is generated",
      ],
      options_he: [
        "בקשת sampling, שבה השרת מבקש מה-client שה-LLM שלו יפיק completion בשם השרת",
        "קריאת tool, מכיוון שיצירת טקסט תמיד מסווגת כהפעלת tool",
        "קריאת resource, מכיוון שהודעת ה-commit נחשבת כתוכן קובץ סטטי",
        "הודעת capability negotiation, מכיוון שזה קורה לפני יצירת כל תוכן",
      ],
      correctAnswer: 0,
      explanation:
        "Sampling is the MCP primitive that lets a server request that the client's connected LLM generate content on the server's behalf, which is distinct from tools (client-invoked actions on the server), resources (data the server exposes), and prompts (reusable templates). This inverts the usual direction of MCP requests: instead of the client asking the server to do something, the server is asking the client's model to do something.",
      explanation_he:
        "Sampling הוא ה-primitive של MCP שמאפשר ל-server לבקש שה-LLM המחובר של ה-client ייצור תוכן בשם השרת, בשונה מ-tools (פעולות שה-client מפעיל בשרת), resources (נתונים שהשרת חושף) ו-prompts (תבניות לשימוש חוזר). זה הופך את הכיוון הרגיל של בקשות MCP: במקום שה-client יבקש מה-server לעשות משהו, ה-server מבקש מהמודל של ה-client לעשות משהו.",
      resourceTitle: "MCP — Architecture",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/architecture",
      keywords: ["sampling", "server-initiated", "llm generation"],
      tooltipTerms: ["MCP", "MCP Server", "MCP Client"],
    },
    {
      id: "p21-mcp-006",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "intermediate",
      type: "true-false",
      question:
        "If an MCP server silently changes a tool's expected arguments (for example, renaming a required parameter) without any versioning signal, existing clients built against the old argument names can start failing without warning.",
      question_he:
        "אם MCP server משנה בשקט את הארגומנטים הצפויים של tool (למשל, שינוי שם של פרמטר חובה) ללא כל אינדיקציית גרסה (versioning), clients קיימים שנבנו כנגד שמות הארגומנטים הישנים עלולים להתחיל להיכשל ללא אזהרה.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: true,
      explanation:
        "A tool's argument schema is effectively part of its interface contract with every client that calls it. Changing that schema without a versioning or compatibility signal breaks any client still sending the old argument shape, and the failure often shows up as confusing runtime errors rather than an obvious upgrade prompt. This is why interface changes to a widely used MCP server need careful compatibility handling, not silent edits.",
      explanation_he:
        "סכימת הארגומנטים של tool היא למעשה חלק מחוזה הממשק שלו מול כל client שקורא לו. שינוי הסכימה ללא אינדיקציית versioning או תאימות שובר כל client שעדיין שולח את צורת הארגומנטים הישנה, והכשל לרוב מופיע כשגיאות ריצה מבלבלות ולא כהודעת שדרוג ברורה. זו הסיבה ששינויי ממשק ב-MCP server נפוץ דורשים טיפול זהיר בתאימות, ולא עריכות שקטות.",
      resourceTitle: "MCP — Tools",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/tools",
      keywords: ["versioning", "backward compatibility", "breaking change"],
      tooltipTerms: ["MCP", "MCP Server", "MCP Client"],
    },
    {
      id: "p21-mcp-007",
      providers: ["neutral"],
      domains: ["mcp", "ai-security"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "An agent session connects to both a ticketing MCP server and a customer database MCP server at the same time. Which of the following are genuine new risks created by combining these two servers in one session? (Select all that apply.)",
      question_he:
        "session של agent מתחבר גם ל-MCP server של מערכת כרטיסים וגם ל-MCP server של מסד נתוני לקוחות באותו הזמן. אילו מהבאים הם סיכונים חדשים אמיתיים שנוצרים משילוב שני השרתים ב-session אחד? (בחר את כל האפשרויות הרלוונטיות.)",
      options: [
        "Data retrieved from the database server could be forwarded into a ticket via the ticketing server, chaining actions across trust boundaries in ways neither server alone allows",
        "A malicious or buggy instruction reaching the agent could combine both servers' capabilities to exfiltrate sensitive database data through the ticketing system",
        "The two servers will automatically merge into a single unified tool with no risk implications",
        "Reviewing permissions for each server in isolation is no longer sufficient, since the combined capability set matters",
      ],
      options_he: [
        "נתונים שנשלפו משרת מסד הנתונים יכולים להיות מועברים לתוך כרטיס דרך שרת הכרטיסים, ושרשור פעולות בין גבולות אמון בדרכים שאף שרת בנפרד לא מאפשר",
        "הוראה זדונית או באגית שמגיעה ל-agent יכולה לשלב את היכולות של שני השרתים כדי לחלץ נתוני מסד נתונים רגישים דרך מערכת הכרטיסים",
        "שני השרתים יתמזגו אוטומטית ל-tool מאוחד אחד ללא כל השלכות סיכון",
        "בדיקת הרשאות עבור כל server בנפרד כבר אינה מספקת, מכיוון שקבוצת היכולות המשולבת היא זו שחשובה",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Composing multiple MCP servers in one agent session creates a combined capability surface: data read from one server can be piped into an action performed by another, enabling exfiltration or cross-boundary actions that neither server's own permission model anticipated in isolation. This means risk review has to consider the composed session, not just each server's individual permissions. Servers never 'merge' into one tool — they remain distinct connections whose effects can still interact.",
      explanation_he:
        "שילוב מספר MCP servers ב-session אחד של agent יוצר משטח יכולות משולב: נתונים שנקראו משרת אחד יכולים להיות מוזרמים לפעולה שמתבצעת בשרת אחר, מה שמאפשר חילוץ נתונים או פעולות חוצות-גבולות שאף מודל הרשאות של שרת בודד לא צפה בנפרד. המשמעות היא שבדיקת סיכונים צריכה להתייחס ל-session המשולב, לא רק להרשאות של כל server בנפרד. שרתים לעולם לא 'מתמזגים' ל-tool אחד — הם נשארים חיבורים נפרדים שההשפעות שלהם עדיין יכולות להשתלב.",
      resourceTitle: "MCP — Introduction",
      resourceUrl: "https://modelcontextprotocol.io/introduction",
      keywords: ["composition", "combined risk", "multiple servers", "exfiltration"],
      tooltipTerms: ["MCP", "MCP Server", "Least Privilege", "Agent"],
    },
    {
      id: "p21-mcp-008",
      providers: ["neutral"],
      domains: ["mcp", "local-agents"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team deploys an agent that can call an MCP tool for sending outbound emails. A prompt-injection attack causes the agent to enter a loop calling that tool repeatedly. Which of the following are appropriate operational guardrails to address this, beyond MCP's own trust/permission model? (Select all that apply.)",
      question_he:
        "צוות פורס agent שיכול לקרוא ל-MCP tool לשליחת אימיילים יוצאים. התקפת prompt injection גורמת ל-agent להיכנס ללולאה שקוראת לאותו tool שוב ושוב. אילו מהבאים הם guardrails תפעוליים מתאימים לטיפול בכך, מעבר למודל האמון/ההרשאות של MCP עצמו? (בחר את כל האפשרויות הרלוונטיות.)",
      options: [
        "Enforcing a rate limit or maximum call count on that tool per session",
        "Adding monitoring/alerting that flags abnormally repetitive tool invocations",
        "Assuming the MCP specification itself already prevents any tool from being called more than once",
        "Requiring human confirmation before a batch of outbound emails is actually sent",
      ],
      options_he: [
        "אכיפת rate limit או מספר קריאות מקסימלי ל-tool הזה לכל session",
        "הוספת ניטור/התרעות שמסמנות קריאות tool חוזרות באופן חריג",
        "הנחה שהמפרט (specification) של MCP עצמו כבר מונע מכל tool להיקרא יותר מפעם אחת",
        "דרישת אישור אנושי לפני שאצווה של אימיילים יוצאים נשלחת בפועל",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "MCP defines how tools are described and invoked, but it doesn't enforce rate limits, loop detection, or human-in-the-loop review — those are operational safeguards the deploying application must add on top. Rate limiting, anomaly monitoring, and requiring confirmation for high-impact actions all reduce the blast radius of a runaway or manipulated agent regardless of how trustworthy the tool's description looked. Assuming the protocol itself caps call counts is a false sense of security.",
      explanation_he:
        "MCP מגדיר איך tools מתוארים ונקראים, אבל הוא לא אוכף rate limits, זיהוי לולאות, או בקרת human-in-the-loop — אלה הגנות תפעוליות שהאפליקציה הפורסת צריכה להוסיף בעצמה. הגבלת קצב, ניטור אנומליות, ודרישת אישור לפעולות בעלות השפעה גבוהה כולן מצמצמות את רדיוס הנזק של agent שיצא משליטה או מניפולציה, ללא קשר לכמה אמין נראה תיאור ה-tool. ההנחה שהפרוטוקול עצמו מגביל מספר קריאות היא תחושת ביטחון כוזבת.",
      resourceTitle: "MCP — Introduction",
      resourceUrl: "https://modelcontextprotocol.io/introduction",
      keywords: ["rate limiting", "resource exhaustion", "guardrails", "runaway loop"],
      tooltipTerms: ["MCP", "Guardrails", "Prompt Injection", "Agent"],
    },
    {
      id: "p21-mcp-009",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A company wants one MCP server binary to be usable both as a local developer tool over stdio and as a shared internal service reachable over the network by multiple remote clients. What is the most accurate way to think about supporting both scenarios?",
      question_he:
        "חברה רוצה שקובץ ריצה (binary) אחד של MCP server ישמש גם ככלי מפתחים מקומי דרך stdio וגם כשירות פנימי משותף שניתן להגיע אליו דרך הרשת על ידי מספר clients מרוחקים. מהי הדרך המדויקת ביותר לחשוב על תמיכה בשני התרחישים?",
      options: [
        "The server's core logic can stay the same while supporting different transports, since MCP separates the message protocol from the transport that carries it, but the network-facing deployment must additionally address concerns like authentication and multi-client isolation that a single local stdio process didn't need",
        "It's impossible to reuse any server code between the two scenarios; a completely separate implementation is always required",
        "Stdio-based servers automatically become network-accessible once deployed on any server machine",
        "Network transports are only a theoretical concept in MCP and aren't actually used for remote clients",
      ],
      options_he: [
        "הלוגיקה המרכזית של השרת יכולה להישאר זהה תוך תמיכה ב-transports שונים, מכיוון ש-MCP מפריד בין פרוטוקול ההודעות ל-transport שמעביר אותן, אך הפריסה הפונה לרשת חייבת לטפל בנוסף בנושאים כמו אימות ובידוד בין מספר clients שתהליך stdio מקומי בודד לא נזקק להם",
        "בלתי אפשרי לעשות שימוש חוזר בקוד השרת בין שני התרחישים; תמיד נדרש מימוש נפרד לחלוטין",
        "שרתים מבוססי stdio הופכים אוטומטית לנגישים ברשת ברגע שהם נפרסים על מכונת שרת כלשהי",
        "transports רשתיים הם רק מושג תיאורטי ב-MCP ולא בשימוש בפועל עבור clients מרוחקים",
      ],
      correctAnswer: 0,
      explanation:
        "MCP's design separates the protocol messages (tools, resources, prompts, sampling, etc.) from the transport that carries them, which is why the same conceptual server logic can, in principle, be exposed over different transports. But moving from a single local stdio process to a network-reachable service introduces real new concerns — authenticating remote callers and isolating state between concurrently connected clients — that a single-user local process never had to handle. It's not automatic, and it's not impossible either.",
      explanation_he:
        "העיצוב של MCP מפריד בין הודעות הפרוטוקול (tools, resources, prompts, sampling וכו') ל-transport שמעביר אותן, ולכן אותה לוגיקת שרת מושגית יכולה, באופן עקרוני, להיחשף דרך transports שונים. אבל המעבר מתהליך stdio מקומי בודד לשירות נגיש ברשת מכניס דאגות חדשות אמיתיות — אימות קוראים מרוחקים ובידוד מצב בין clients מחוברים במקביל — שתהליך מקומי של משתמש בודד מעולם לא היה צריך לטפל בהן. זה לא אוטומטי, וגם לא בלתי אפשרי.",
      resourceTitle: "MCP — Architecture",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/architecture",
      keywords: ["transport", "network", "multi-client", "authentication"],
      tooltipTerms: ["MCP", "MCP Server", "MCP Client"],
    },
    {
      id: "p21-mcp-010",
      providers: ["neutral"],
      domains: ["mcp"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "An MCP server's tool list can be discovered dynamically at runtime. What is the most accurate implication of this for an agent framework that caches the list of tools it saw at the start of a long-running session?",
      question_he:
        "רשימת ה-tools של MCP server יכולה להתגלות באופן דינמי בזמן ריצה. מהי המשמעות המדויקת ביותר של כך עבור מסגרת agent שמאחסנת במטמון (cache) את רשימת ה-tools שראתה בתחילת session ארוך?",
      options: [
        "The cached list can drift out of sync with what the server actually offers if the server's capabilities change mid-session, so the framework should periodically re-check or handle 'unknown tool' responses gracefully",
        "Dynamic discovery guarantees the cached list is always automatically kept perfectly up to date with no extra work",
        "Tool lists in MCP are fixed for the lifetime of a server process, so caching is always perfectly safe with no drift possible",
        "Caching the tool list is prohibited by the MCP specification",
      ],
      options_he: [
        "הרשימה שבמטמון עלולה להתרחק מסנכרון עם מה שהשרת מציע בפועל אם היכולות של השרת משתנות באמצע ה-session, ולכן על המסגרת לבצע בדיקה חוזרת מעת לעת או לטפל בתגובות 'tool לא ידוע' בצורה מבוקרת",
        "גילוי דינמי מבטיח שהרשימה שבמטמון תמיד תישאר מעודכנת באופן אוטומטי לחלוטין ללא כל עבודה נוספת",
        "רשימות tools ב-MCP קבועות לאורך חיי תהליך השרת, כך שאחסון במטמון תמיד בטוח לחלוטין ללא אפשרות לסטייה",
        "אחסון רשימת ה-tools במטמון אסור על פי מפרט MCP",
      ],
      correctAnswer: 0,
      explanation:
        "Because tool discovery is dynamic, a server is free to add, remove, or change tools during a long-running connection — nothing guarantees the list is frozen. An agent framework that caches the initial list without ever refreshing it risks acting on stale information (trying to call a tool that no longer exists, or missing one that's now available), so it needs a refresh strategy or graceful handling of mismatches, rather than assuming the snapshot stays perpetually accurate.",
      explanation_he:
        "מכיוון שגילוי tools הוא דינמי, server חופשי להוסיף, להסיר או לשנות tools לאורך חיבור ארוך — שום דבר לא מבטיח שהרשימה קפואה. מסגרת agent שמאחסנת במטמון את הרשימה ההתחלתית מבלי לרענן אותה אף פעם מסתכנת בפעולה על מידע מיושן (ניסיון לקרוא ל-tool שכבר לא קיים, או פספוס של tool שזמין כעת), ולכן היא זקוקה לאסטרטגיית רענון או לטיפול מבוקר באי-התאמות, במקום להניח שה-snapshot נשאר מדויק לנצח.",
      resourceTitle: "MCP — Tools",
      resourceUrl: "https://modelcontextprotocol.io/docs/concepts/tools",
      keywords: ["discovery", "caching", "stale state", "long-running session"],
      tooltipTerms: ["MCP", "MCP Server", "MCP Client"],
    },
  ],
});
