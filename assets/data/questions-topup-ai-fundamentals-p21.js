/**
 * questions-topup-ai-fundamentals-p21.js — Phase 21 coverage top-up: AI
 * Fundamentals (12 questions). Deepens thin difficulty slices. Registers
 * itself via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-ai-fundamentals-p21",
  label: "AI Fundamentals — Phase 21 Top-up",
  questions: [
    {
      id: "p21-aif-001",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A chatbot's 'temperature' setting is lowered from 0.9 to 0.1 for a customer-support use case. What is the most likely practical effect on its responses?",
      question_he:
        "הגדרת ה'temperature' של צ'אטבוט מורדת מ-0.9 ל-0.1 עבור שימוש בתמיכת לקוחות. מהי ההשפעה המעשית הסבירה ביותר על התגובות שלו?",
      options: [
        "Responses become more predictable and consistent, with less variation between repeated similar questions",
        "Responses become longer because the model has more room to explore",
        "The model's context window automatically expands to compensate",
        "The model switches to using retrieved documents instead of its own knowledge",
      ],
      options_he: [
        "התגובות הופכות לצפויות ועקביות יותר, עם פחות שונות בין שאלות דומות חוזרות",
        "התגובות הופכות ארוכות יותר כי למודל יש יותר מקום לחקור",
        "חלון ה-context window של המודל מתרחב אוטומטית כדי לפצות",
        "המודל עובר להשתמש במסמכים מאוחזרים במקום בידע שלו",
      ],
      correctAnswer: 0,
      explanation:
        "Lower temperature reduces randomness in how the model samples its next tokens, making outputs more deterministic and repeatable — desirable when consistency matters, like support scripts. Higher temperature increases variety and creativity but not necessarily length. Temperature has nothing to do with context window size or whether retrieval is used; those are separate mechanisms entirely.",
      explanation_he:
        "temperature נמוך יותר מפחית אקראיות באופן שבו המודל דוגם את הטוקן הבא, מה שהופך את הפלט לדטרמיניסטי וחוזר יותר — רצוי כשעקביות חשובה, כמו בתסריטי תמיכה. temperature גבוה מגביר גיוון ויצירתיות אך לא בהכרח אורך. ל-temperature אין קשר לגודל ה-context window או לשימוש ב-retrieval; אלה מנגנונים נפרדים לגמרי.",
      resourceTitle: "OpenAI Platform Docs — Text Generation",
      resourceUrl: "https://platform.openai.com/docs/guides/text-generation",
      keywords: ["temperature", "sampling", "determinism"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-002",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "Setting a model's sampling temperature to 0 guarantees the exact same output every single time, with absolutely no variation, on every API provider.",
      question_he:
        "הגדרת temperature ל-0 מבטיחה את אותו הפלט המדויק בכל פעם, ללא שום שונות, אצל כל ספק API.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "Temperature 0 makes sampling *far* more deterministic by always favoring the highest-probability token, but it does not guarantee perfect reproducibility across all systems. Floating-point computation differences, batching effects, and backend infrastructure changes can still introduce small variations. Treat temperature 0 as 'much more consistent,' not an absolute guarantee.",
      explanation_he:
        "temperature 0 הופך את הדגימה לדטרמיניסטית הרבה יותר על ידי העדפת הטוקן בעל ההסתברות הגבוהה ביותר תמיד, אך זה לא מבטיח שחזוריות מושלמת בכל המערכות. הבדלים בחישובי floating-point, אפקטי batching ושינויי תשתית עשויים עדיין להכניס שונות קטנה. יש להתייחס ל-temperature 0 כ'עקבי הרבה יותר', לא כערבות מוחלטת.",
      resourceTitle: "OpenAI Platform Docs — Text Generation",
      resourceUrl: "https://platform.openai.com/docs/guides/text-generation",
      keywords: ["temperature", "determinism", "reproducibility"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-003",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer writes a prompt that says only 'Classify the sentiment of this review' with no examples. This is best described as which prompting style?",
      question_he:
        "מפתח כותב prompt שאומר רק 'סווג את הרגש בביקורת הזו' ללא דוגמאות. זהו בעיקר איזה סגנון של prompting?",
      options: [
        "Zero-shot prompting",
        "Few-shot prompting",
        "Retrieval-augmented generation",
        "Chain-of-custody prompting",
      ],
      options_he: [
        "Zero-shot prompting",
        "Few-shot prompting",
        "Retrieval-augmented generation (RAG)",
        "Chain-of-custody prompting",
      ],
      correctAnswer: 0,
      explanation:
        "Zero-shot prompting relies entirely on the instruction itself, with no demonstration examples, trusting the model's general training to infer the task. Few-shot prompting would include sample review-to-label pairs in the prompt to guide format and judgment. RAG is unrelated — it concerns pulling in external documents, not example demonstrations; 'chain-of-custody prompting' is not a real technique.",
      explanation_he:
        "Zero-shot prompting מסתמך כולו על ההוראה עצמה, ללא דוגמאות הדגמה, ובוטח באימון הכללי של המודל כדי להסיק את המשימה. Few-shot prompting היה כולל זוגות דוגמה של ביקורת-לתווית ב-prompt כדי להנחות פורמט ושיפוט. RAG לא קשור — הוא עוסק במשיכת מסמכים חיצוניים, לא בדוגמאות הדגמה; 'chain-of-custody prompting' אינה טכניקה אמיתית.",
      resourceTitle: "Anthropic Docs — Use Examples (Multishot Prompting)",
      resourceUrl:
        "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples",
      keywords: ["zero-shot", "few-shot", "prompting-style"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-004",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A team wants a model to output review sentiment in a very specific, unusual label scheme, such as 'delighted', 'neutral-lean-positive', and 'irate'. What is the most effective way to get consistent labels?",
      question_he:
        "צוות רוצה שהמודל יפיק רגש ביקורת בסכמת תוויות ספציפית ולא שגרתית, כמו 'delighted', 'neutral-lean-positive' ו-'irate'. מהי הדרך היעילה ביותר לקבל תוויות עקביות?",
      options: [
        "Provide a few labeled examples showing exactly which review text maps to which custom label (few-shot)",
        "Increase the temperature so the model can be more creative with labels",
        "Shrink the context window so the model focuses only on the label scheme",
        "Ask the model to hallucinate plausible labels based on training data",
      ],
      options_he: [
        "לספק כמה דוגמאות מתויגות שמראות בדיוק אילו טקסט ביקורת ממופה לאיזו תווית מותאמת (few-shot)",
        "להעלות את ה-temperature כדי שהמודל יוכל להיות יצירתי יותר עם התוויות",
        "לצמצם את חלון ה-context כדי שהמודל יתמקד רק בסכמת התוויות",
        "לבקש מהמודל 'להזות' תוויות סבירות בהתבסס על נתוני האימון",
      ],
      correctAnswer: 0,
      explanation:
        "Because the label scheme is unusual and not something the model has necessarily seen in training, showing concrete example mappings (few-shot) teaches the exact format and boundaries expected far more reliably than an instruction alone. Increasing temperature adds randomness, which hurts consistency here. Shrinking the context window removes useful information rather than helping, and 'hallucinate' is the opposite of what's wanted.",
      explanation_he:
        "מכיוון שסכמת התוויות אינה שגרתית ולא בהכרח משהו שהמודל ראה באימון, הצגת מיפויי דוגמה קונקרטיים (few-shot) מלמדת את הפורמט והגבולות המדויקים המצופים באופן אמין הרבה יותר מהוראה בלבד. העלאת temperature מוסיפה אקראיות, מה שפוגע בעקביות כאן. צמצום חלון ה-context מסיר מידע שימושי במקום לעזור, ו'הזיה' היא ההפך ממה שרוצים.",
      resourceTitle: "Anthropic Docs — Use Examples (Multishot Prompting)",
      resourceUrl:
        "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples",
      keywords: ["few-shot", "custom-labels", "prompting"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-005",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A support assistant is upgraded to accept photos of damaged products in addition to typed text descriptions. This is best described as adding what kind of capability?",
      question_he:
        "עוזר תמיכה משודרג כך שיוכל לקבל תמונות של מוצרים פגומים בנוסף לתיאורי טקסט מוקלדים. זה מתואר בצורה הטובה ביותר כהוספת איזו יכולת?",
      options: [
        "Multimodal input",
        "A larger context window",
        "Retrieval-augmented generation",
        "Prompt injection defense",
      ],
      options_he: [
        "קלט מולטימודלי (multimodal)",
        "חלון context גדול יותר",
        "Retrieval-augmented generation (RAG)",
        "הגנה מפני prompt injection",
      ],
      correctAnswer: 0,
      explanation:
        "Accepting more than one type of input — such as both images and text — is what 'multimodal' means; the model can reason across modalities in a single request. A larger context window is about how much text/tokens fit in one request, not what types of media it accepts. RAG concerns pulling external documents into the prompt, and prompt injection defense is a security concern unrelated to input format.",
      explanation_he:
        "קבלת יותר מסוג קלט אחד — כמו גם תמונות וגם טקסט — היא המשמעות של 'multimodal'; המודל יכול לנמק על פני מודליות שונות בבקשה אחת. חלון context גדול יותר עוסק בכמות הטקסט/הטוקנים שנכנסת לבקשה אחת, לא בסוגי המדיה שהיא מקבלת. RAG עוסק במשיכת מסמכים חיצוניים לתוך ה-prompt, והגנת prompt injection היא נושא אבטחה שאינו קשור לפורמט הקלט.",
      resourceTitle: "Google AI for Developers — Gemini Vision",
      resourceUrl: "https://ai.google.dev/gemini-api/docs/vision",
      keywords: ["multimodal", "image-input"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-006",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A search feature returns a document about 'canine health issues' when a user searches for 'my dog seems sick', even though the words 'dog' and 'sick' never literally appear together in that document. Which technology most directly enables this kind of match?",
      question_he:
        "תכונת חיפוש מחזירה מסמך על 'בעיות בריאות כלביות' כשמשתמש מחפש 'הכלב שלי נראה חולה', למרות שהמילים 'כלב' ו'חולה' אף פעם לא מופיעות מילולית יחד במסמך הזה. איזו טכנולוגיה מאפשרת ישירות סוג התאמה כזה?",
      options: [
        "Embeddings-based semantic search, which compares meaning rather than exact keywords",
        "Exact keyword matching with case-insensitive search",
        "A larger system prompt describing veterinary terminology",
        "A higher temperature setting during retrieval",
      ],
      options_he: [
        "חיפוש סמנטי מבוסס embeddings, שמשווה משמעות ולא מילות מפתח מדויקות",
        "התאמת מילות מפתח מדויקת עם חיפוש שאינו תלוי רישיות",
        "system prompt גדול יותר שמתאר טרמינולוגיה וטרינרית",
        "הגדרת temperature גבוהה יותר במהלך retrieval",
      ],
      correctAnswer: 0,
      explanation:
        "Embeddings represent text as vectors positioned by meaning, so 'dog' and 'canine' end up close together in that vector space even though they share no letters. Semantic search then finds documents whose embeddings are near the query's embedding, unlike keyword search which requires literal term overlap. Temperature affects generation randomness, not retrieval matching, and a bigger system prompt wouldn't help a search index find unrelated wording.",
      explanation_he:
        "Embeddings מייצגים טקסט כווקטורים הממוקמים לפי משמעות, כך ש'dog' ו'canine' מסתיימים קרובים זה לזה במרחב הווקטורי הזה למרות שהם לא חולקים אותיות. חיפוש סמנטי מוצא אז מסמכים שה-embeddings שלהם קרובים ל-embedding של השאילתה, בניגוד לחיפוש מילות מפתח שדורש חפיפת מונחים מילולית. temperature משפיע על אקראיות היצירה, לא על התאמת retrieval, ו-system prompt גדול יותר לא היה עוזר לאינדקס חיפוש למצוא ניסוח לא קשור.",
      resourceTitle: "Google AI for Developers — Embeddings Guide",
      resourceUrl: "https://ai.google.dev/gemini-api/docs/embeddings",
      keywords: ["embeddings", "semantic-search", "vector-similarity"],
      tooltipTerms: ["RAG"],
    },
    {
      id: "p21-aif-007",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "intermediate",
      type: "multi-select",
      question:
        "A team is deciding between a large, slower model and a small, faster model for a high-volume customer-facing feature. Which of the following are legitimate factors in that tradeoff? (Select all that apply)",
      question_he:
        "צוות מחליט בין מודל גדול ואיטי יותר לבין מודל קטן ומהיר יותר עבור תכונה בנפח גבוה הפונה ללקוחות. אילו מהבאים הם גורמים לגיטימיים בשיקול הזה? (בחר את כל התשובות הרלוונטיות)",
      options: [
        "Per-request cost, since larger models typically charge more per token",
        "Response latency, since larger models often take longer to generate a reply",
        "Whether the task actually requires deeper reasoning or can be handled with simpler pattern matching",
        "The model's knowledge cutoff date always increases automatically with model size",
      ],
      options_he: [
        "עלות לבקשה, מכיוון שמודלים גדולים בדרך כלל גובים יותר לטוקן",
        "זמן תגובה (latency), מכיוון שמודלים גדולים לרוב לוקחים יותר זמן ליצור תשובה",
        "האם המשימה אכן דורשת נימוק עמוק יותר או שניתן לטפל בה עם התאמת דפוסים פשוטה יותר",
        "תאריך ה-knowledge cutoff של המודל תמיד עולה אוטומטית עם גודל המודל",
      ],
      correctAnswer: [0, 1, 2],
      explanation:
        "Cost, latency, and task difficulty are the classic tradeoffs: bigger models tend to cost more per token and respond more slowly, but they can handle harder reasoning; if the task is simple, a smaller faster model may perform just as well for less. Knowledge cutoff date is set by when a model's training data was collected, not by model size — a larger model isn't guaranteed a more recent cutoff than a smaller one.",
      explanation_he:
        "עלות, latency, וקושי המשימה הם הפשרות הקלאסיות: מודלים גדולים יותר נוטים לעלות יותר לטוקן ולהגיב לאט יותר, אך הם יכולים להתמודד עם נימוק קשה יותר; אם המשימה פשוטה, מודל קטן ומהיר יותר עשוי לבצע באותה איכות תמורת פחות. תאריך ה-knowledge cutoff נקבע על ידי מתי נאספו נתוני האימון של המודל, לא על ידי גודל המודל — מודל גדול יותר אינו מובטח שיהיה לו cutoff עדכני יותר ממודל קטן.",
      resourceTitle: "OpenAI Platform Docs — Models",
      resourceUrl: "https://platform.openai.com/docs/models",
      keywords: ["cost", "latency", "model-selection"],
      tooltipTerms: ["Context Window"],
    },
    {
      id: "p21-aif-008",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "An application asks a model to output data as JSON matching a strict schema (specific field names and types) so the response can be parsed directly by downstream code. Why is enforcing a schema-constrained output format valuable here, beyond just asking politely in the prompt text?",
      question_he:
        "אפליקציה מבקשת מהמודל להפיק נתונים כ-JSON התואם לסכמה קפדנית (שמות שדות וסוגים ספציפיים) כדי שהתשובה תוכל להיות מנותחת ישירות על ידי קוד downstream. מדוע אכיפת פורמט פלט מוגבל לסכמה (schema-constrained) בעל ערך כאן, מעבר לבקשה מנומסת בטקסט ה-prompt?",
      options: [
        "It reduces the chance of malformed output (extra commentary, missing fields, wrong types) that would break a parser expecting exact structure",
        "It guarantees the model will never produce factually incorrect field values",
        "It eliminates the need for any error handling in the downstream code",
        "It automatically increases the model's context window to fit the schema",
      ],
      options_he: [
        "זה מפחית את הסיכוי לפלט פגום (תגובה נוספת, שדות חסרים, סוגים שגויים) שהיה שובר parser המצפה למבנה מדויק",
        "זה מבטיח שהמודל לעולם לא יפיק ערכי שדה שגויים עובדתית",
        "זה מבטל את הצורך בכל טיפול בשגיאות בקוד ה-downstream",
        "זה מגדיל אוטומטית את חלון ה-context של המודל כדי להתאים לסכמה",
      ],
      correctAnswer: 0,
      explanation:
        "Schema-constrained generation (e.g., JSON mode or structured output features) restricts the model's output tokens to conform to a defined structure, dramatically cutting down on parsing failures like stray prose, trailing commentary, or missing keys. It does not guarantee the *content* is factually correct — a well-formed JSON object can still contain a hallucinated value — and downstream code should still validate content, not just structure. It also has nothing to do with context window size.",
      explanation_he:
        "יצירה מוגבלת לסכמה (structured output, למשל JSON mode) מגבילה את טוקני הפלט של המודל להתאים למבנה מוגדר, ומצמצמת דרמטית כשלי parsing כמו טקסט חופשי מיותר, הערות נוספות, או מפתחות חסרים. זה לא מבטיח שה*תוכן* נכון עובדתית — אובייקט JSON תקין יכול עדיין להכיל ערך מוזה — וקוד ה-downstream עדיין צריך לאמת תוכן, לא רק מבנה. זה גם לא קשור לגודל חלון ה-context.",
      resourceTitle: "OpenAI Platform Docs — Structured Outputs",
      resourceUrl: "https://platform.openai.com/docs/guides/structured-outputs",
      keywords: ["structured-output", "json-schema", "parsing"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-009",
      providers: ["neutral"],
      domains: ["ai-fundamentals", "monitoring"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A team asks a model, without any tool access, 'What is today's stock price for Acme Corp?' The model confidently states a specific number. Which explanation of the underlying architecture best describes why this is risky, distinct from calling it simply a 'hallucination'?",
      question_he:
        "צוות שואל מודל, ללא כל גישה לכלים, 'מה מחיר המניה של Acme Corp היום?'. המודל מציין במפורש מספר ספציפי. איזה הסבר של הארכיטקטורה הבסיסית מתאר בצורה הטובה ביותר מדוע זה מסוכן, בנפרד מלכנות זאת סתם 'הזיה'?",
      options: [
        "The model has no live connection to real-time data sources; its knowledge is frozen at training time, so any 'current' figure it states is necessarily reconstructed from patterns, not fetched fresh",
        "The model is deliberately lying to the user because it was trained to deceive on financial topics",
        "The model's context window is too small to hold stock market data",
        "The model always refuses financial questions unless given a system prompt override",
      ],
      options_he: [
        "לאמודל אין חיבור חי למקורות נתונים בזמן אמת; הידע שלו קפוא בזמן האימון, כך שכל נתון 'נוכחי' שהוא מציין הוא בהכרח בנוי מחדש מדפוסים, לא נשלף טרי",
        "המודל משקר בכוונה למשתמש כי הוא אומן להטעות בנושאים פיננסיים",
        "חלון ה-context של המודל קטן מדי מכדי להכיל נתוני שוק המניות",
        "המודל תמיד מסרב לשאלות פיננסיות אלא אם ניתן override של system prompt",
      ],
      correctAnswer: 0,
      explanation:
        "The architectural point is that a base model has no built-in mechanism to reach out and fetch a live value — it can only produce a plausible-sounding answer synthesized from training patterns, which is fundamentally different from a tool call that queries a live API and returns an actual current price. This is an important distinction from generic 'hallucination' framing: the fix here is architectural (give the model a tool to call) rather than purely about prompt wording or error-rate reduction. The model isn't 'lying' with intent, and the failure has nothing to do with context window size.",
      explanation_he:
        "הנקודה הארכיטקטונית היא שלמודל בסיס אין מנגנון מובנה לצאת ולשלוף ערך חי — הוא יכול רק להפיק תשובה שנשמעת סבירה ומורכבת מדפוסי אימון, וזה שונה באופן יסודי מקריאת tool ששואלת API חי ומחזירה מחיר נוכחי אמיתי. זו הבחנה חשובה מהמסגור הגנרי של 'הזיה': התיקון כאן הוא ארכיטקטוני (לתת למודל tool לקרוא לו) ולא רק עניין של ניסוח ה-prompt או הפחתת שיעור שגיאות. המודל לא 'משקר' בכוונה, והכשל אינו קשור לגודל חלון ה-context.",
      resourceTitle: "Anthropic Docs — Tool Use Overview",
      resourceUrl:
        "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview",
      keywords: ["knowledge-cutoff", "tool-use", "live-data", "architecture"],
      tooltipTerms: ["Hallucination", "Agent"],
    },
    {
      id: "p21-aif-010",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "advanced",
      type: "true-false",
      question:
        "Giving a model access to a live web-search tool completely eliminates the possibility of hallucination in its final answers, since it can always verify facts before responding.",
      question_he:
        "מתן גישה למודל לכלי חיפוש רשת חי מבטל לחלוטין את האפשרות של הזיה בתשובותיו הסופיות, מכיוון שהוא תמיד יכול לאמת עובדות לפני שהוא עונה.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "A tool call can supply fresh, grounded information, but the model still has to correctly interpret, select, and synthesize that retrieved content into its final answer — and it can still misread a source, blend it incorrectly with prior assumptions, or generate unsupported claims alongside the grounded ones. Tool access substantially reduces hallucination risk on the specific fact being looked up, but it is not a complete guarantee against all hallucination in the response.",
      explanation_he:
        "קריאת tool יכולה לספק מידע טרי ומבוסס, אך המודל עדיין צריך לפרש, לבחור ולסנתז נכון את התוכן שאוחזר לתוך התשובה הסופית שלו — והוא עדיין יכול לקרוא מקור לא נכון, למזג אותו בצורה שגויה עם הנחות קודמות, או ליצור טענות לא נתמכות לצד אלה המבוססות. גישה ל-tool מפחיתה משמעותית את סיכון ההזיה על העובדה הספציפית שנבדקה, אך היא אינה ערבות מלאה כנגד כל הזיה בתשובה.",
      resourceTitle: "Anthropic Docs — Reduce Hallucinations",
      resourceUrl:
        "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
      keywords: ["hallucination", "tool-use", "grounding-limits"],
      tooltipTerms: ["Hallucination", "Grounding", "Agent"],
    },
    {
      id: "p21-aif-011",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "advanced",
      type: "multi-select",
      question:
        "A team currently edits its production prompt directly whenever an answer looks wrong, with no record of prior versions or measurements. Which practices would improve this toward treating prompts with the discipline of code? (Select all that apply)",
      question_he:
        "צוות כרגע עורך את ה-prompt בפרודקשן ישירות בכל פעם שתשובה נראית שגויה, ללא רישום של גרסאות קודמות או מדידות. אילו פרקטיקות היו משפרות את זה לכיוון התייחסות ל-prompts במשמעת של קוד? (בחר את כל התשובות הרלוונטיות)",
      options: [
        "Keep prompt versions under version control so changes can be reviewed and rolled back",
        "Run a fixed evaluation set of representative inputs before and after any prompt change to measure impact",
        "Only ever change one prompt directly in production and rely on user complaints to detect regressions",
        "Document why each change was made, not just what changed",
      ],
      options_he: [
        "לשמור גרסאות prompt תחת בקרת גרסאות כדי שניתן יהיה לסקור שינויים ולבצע rollback",
        "להריץ מערך הערכה קבוע של קלטים מייצגים לפני ואחרי כל שינוי prompt כדי למדוד השפעה",
        "לשנות תמיד רק prompt אחד ישירות בפרודקשן ולהסתמך על תלונות משתמשים כדי לגלות רגרסיות",
        "לתעד מדוע כל שינוי נעשה, לא רק מה השתנה",
      ],
      correctAnswer: [0, 1, 3],
      explanation:
        "Version control, before/after evaluation against a representative test set, and documenting rationale are exactly the practices that let teams catch regressions and understand impact before they reach users — mirroring how code changes are reviewed and tested. Editing directly in production and waiting for user complaints is the failure mode this discipline is meant to prevent, since by the time complaints arrive, many users have already had a bad experience.",
      explanation_he:
        "בקרת גרסאות, הערכה לפני/אחרי מול מערך בדיקה מייצג, ותיעוד ההיגיון הם בדיוק הפרקטיקות שמאפשרות לצוותים לתפוס רגרסיות ולהבין השפעה לפני שהן מגיעות למשתמשים — במקביל לאופן שבו שינויי קוד נסקרים ונבדקים. עריכה ישירה בפרודקשן והמתנה לתלונות משתמשים היא בדיוק מצב הכשל שהמשמעת הזו נועדה למנוע, מכיוון שעד שהתלונות מגיעות, למשתמשים רבים כבר הייתה חוויה גרועה.",
      resourceTitle: "Anthropic Docs — Prompt Engineering Overview",
      resourceUrl:
        "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
      keywords: ["prompt-versioning", "evaluation", "iteration"],
      tooltipTerms: [],
    },
    {
      id: "p21-aif-012",
      providers: ["neutral"],
      domains: ["ai-fundamentals"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "A code-review assistant handles two request types: quick style-lint checks on small diffs, and deep architectural review of large multi-file changes. A team routes lint checks to a small fast model and architectural reviews to a large model. What is the main engineering justification for this split-routing approach rather than always using the large model?",
      question_he:
        "עוזר code-review מטפל בשני סוגי בקשות: בדיקות style-lint מהירות על diff-ים קטנים, וסקירה ארכיטקטונית עמוקה של שינויים גדולים ורב-קבצים. צוות מנתב בדיקות lint למודל קטן ומהיר וסקירות ארכיטקטוניות למודל גדול. מהי ההצדקה ההנדסית העיקרית לגישת ניתוב מפוצל זו במקום להשתמש תמיד במודל הגדול?",
      options: [
        "It reduces average cost and latency for the high-volume simple task while reserving the larger model's deeper reasoning capacity for tasks that actually need it",
        "Small models are always more accurate than large models regardless of task complexity",
        "Large models cannot process code at all and must be reserved for natural language only",
        "Routing is required because small and large models use incompatible token formats",
      ],
      options_he: [
        "זה מפחית עלות ו-latency ממוצעים עבור המשימה הפשוטה בנפח גבוה, תוך שמירת יכולת הנימוק העמוקה של המודל הגדול למשימות שבאמת זקוקות לה",
        "מודלים קטנים תמיד מדויקים יותר ממודלים גדולים ללא קשר למורכבות המשימה",
        "מודלים גדולים לא יכולים לעבד קוד בכלל וצריכים להישמר לשפה טבעית בלבד",
        "ניתוב נדרש כי מודלים קטנים וגדולים משתמשים בפורמטי טוקן לא תואמים",
      ],
      correctAnswer: 0,
      explanation:
        "This is a classic cost/latency-vs-capability tradeoff: since lint checks are high-volume and relatively simple pattern matching, routing them to a cheaper, faster model saves significant cost and time at scale, while architectural review — which benefits from deeper reasoning — justifies the larger model's expense and slower response. Small models are not universally more accurate; they simply suffice for simpler tasks. Both model sizes can process code, and token formats are compatible across model sizes from the same provider family.",
      explanation_he:
        "זוהי פשרת cost/latency-מול-יכולת קלאסית: מכיוון שבדיקות lint הן בנפח גבוה והתאמת דפוסים יחסית פשוטה, ניתובן למודל זול ומהיר יותר חוסך עלות וזמן משמעותיים בקנה מידה, בעוד שסקירה ארכיטקטונית — שנהנית מנימוק עמוק יותר — מצדיקה את העלות והתגובה האיטית יותר של המודל הגדול. מודלים קטנים אינם מדויקים יותר באופן אוניברסלי; הם פשוט מספיקים למשימות פשוטות יותר. שני גדלי המודל יכולים לעבד קוד, ופורמטי הטוקן תואמים בין גדלי מודלים ממשפחת אותו ספק.",
      resourceTitle: "OpenAI Platform Docs — Models",
      resourceUrl: "https://platform.openai.com/docs/models",
      keywords: ["model-routing", "cost-latency", "reasoning-depth"],
      tooltipTerms: [],
    },
  ],
});
