/**
 * questions-topup-ai-security-p21.js — Phase 21 coverage top-up: AI
 * Security (5 questions). Deepens the Beginner slice. Registers itself
 * via CQA.data.registerPack(). Data only.
 */

CQA.data.registerPack({
  id: "topup-ai-security-p21",
  label: "AI Security — Phase 21 Top-up",
  questions: [
    {
      id: "p21-ais-001",
      providers: ["neutral"],
      domains: ["ai-security"],
      difficulty: "beginner",
      type: "true-false",
      question:
        "An employee asks an AI chatbot for a recommendation on whether to approve a large loan and, without checking any other source, approves the loan because the chatbot said to. This is safe practice as long as the chatbot is a well-known product.",
      question_he:
        "עובד שואל צ'אטבוט AI האם לאשר הלוואה גדולה, ומאשר אותה רק כי הצ'אטבוט אמר לאשר — בלי לבדוק מקור נוסף. זו פרקטיקה בטוחה כל עוד הצ'אטבוט הוא מוצר מוכר ואמין.",
      options: ["True", "False"],
      options_he: ["נכון", "לא נכון"],
      correctAnswer: false,
      explanation:
        "AI-generated output can be confidently wrong even from a reputable product, so high-stakes decisions like loan approvals should never rely on an AI answer alone. The output should be treated as one input to verify against real data and policy, not as a final decision-maker. Popularity or brand recognition of the tool does not guarantee correctness for a specific case.",
      explanation_he:
        "פלט של AI יכול להיות שגוי בביטחון רב גם ממוצר מוכר ואמין, ולכן החלטות קריטיות כמו אישור הלוואות אסור שיסתמכו על תשובת AI בלבד. יש להתייחס לפלט כקלט אחד שיש לאמת מול נתונים ומדיניות אמיתיים, לא כמקבל ההחלטה הסופי. פופולריות הכלי אינה ערובה לנכונות במקרה ספציפי.",
      resourceTitle: "NIST AI Risk Management Framework",
      resourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
      keywords: ["ai-security", "beginner", "verification", "decision-making"],
      tooltipTerms: ["Hallucination"],
    },
    {
      id: "p21-ais-002",
      providers: ["neutral"],
      domains: ["ai-security"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A company plans to connect its AI assistant to more internal systems: email, a customer database, and a file share, in addition to the single knowledge base it already uses. From a basic security standpoint, what is the main concern with this expansion?",
      question_he:
        "חברה מתכננת לחבר את עוזר ה-AI שלה למערכות פנימיות נוספות: מייל, מסד נתוני לקוחות, ושיתוף קבצים, בנוסף למאגר הידע היחיד שבו הוא כבר משתמש כיום. מבחינת אבטחה בסיסית, מהי הדאגה העיקרית בהרחבה הזו?",
      options: [
        "Each additional connected system is one more place where a mistake, bug, or misuse of the AI could cause harm, so the potential impact grows with every connection added",
        "The AI will automatically become slower with more integrations, which is purely a performance issue and not a security one",
        "Users will need to learn new commands for each system, which is a training cost but not a security risk",
        "More integrations always require buying additional software licenses, which is a budgeting concern only",
      ],
      options_he: [
        "כל מערכת מחוברת נוספת היא עוד מקום שבו טעות, באג, או שימוש לרעה ב-AI עלולים לגרום נזק, כך שהפגיעה הפוטנציאלית גדלה עם כל חיבור נוסף",
        "ה-AI יהפוך אוטומטית לאיטי יותר עם יותר אינטגרציות, וזו סוגיית ביצועים בלבד ולא אבטחה",
        "משתמשים יצטרכו ללמוד פקודות חדשות לכל מערכת, וזו עלות הדרכה אך לא סיכון אבטחה",
        "יותר אינטגרציות תמיד דורשות רכישת רישיונות תוכנה נוספים, וזו סוגיה תקציבית בלבד",
      ],
      correctAnswer: 0,
      explanation:
        "Connecting an AI to more data sources and tools increases the attack surface: each connection is a place where bad input, a bug, or a misused permission could turn into real-world harm, such as leaking data or taking an unwanted action. Speed, training cost, and licensing are real considerations but are not the core security reason to think carefully about expanding access. The security answer is about the growing blast radius, not convenience issues.",
      explanation_he:
        "חיבור AI למקורות נתונים וכלים נוספים מגדיל את משטח התקיפה: כל חיבור הוא מקום שבו קלט רע, באג, או הרשאה שנוצלה לרעה עלולים להפוך לנזק ממשי, כמו דליפת מידע או ביצוע פעולה לא רצויה. מהירות, עלות הדרכה ורישוי הן שיקולים אמיתיים אך אינן הסיבה האבטחתית המרכזית לשקול בזהירות הרחבת גישה. התשובה האבטחתית עוסקת בהיקף הפגיעה הגדל, לא בנוחות.",
      resourceTitle: "OWASP Top 10 for Large Language Model Applications",
      resourceUrl:
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["ai-security", "beginner", "attack-surface", "integrations"],
      tooltipTerms: ["Agent"],
    },
    {
      id: "p21-ais-003",
      providers: ["neutral"],
      domains: ["ai-security"],
      difficulty: "beginner",
      type: "multiple-choice",
      question:
        "A developer is debugging an issue and wants to paste a snippet of application config into a public AI chatbot to ask for help. The config snippet includes a live database password. What should the developer do?",
      question_he:
        "מפתח מנסה לאתר תקלה ורוצה להדביק קטע מקובץ קונפיגורציה של האפליקציה לצ'אטבוט AI ציבורי כדי לבקש עזרה. קטע הקונפיגורציה כולל סיסמת מסד נתונים חיה. מה על המפתח לעשות?",
      options: [
        "Remove or replace the real password (and any other real secrets) with a placeholder before pasting the snippet",
        "Paste the snippet as-is, since chatbot conversations are always private and never stored or reviewed",
        "Paste the snippet as-is, since a password by itself is not useful without also knowing the database's network address",
        "Paste the snippet as-is, but only if the chatbot is from a reputable, well-known vendor",
      ],
      options_he: [
        "להסיר או להחליף את הסיסמה האמיתית (וכל סוד אמיתי אחר) בערך placeholder לפני הדבקת הקטע",
        "להדביק את הקטע כמות שהוא, כי שיחות עם צ'אטבוטים תמיד פרטיות ולעולם לא נשמרות או נבדקות",
        "להדביק את הקטע כמות שהוא, כי סיסמה בפני עצמה אינה שימושית בלי לדעת גם את כתובת הרשת של מסד הנתונים",
        "להדביק את הקטע כמות שהוא, אך רק אם הצ'אטבוט הוא של ספק מוכר ואמין",
      ],
      correctAnswer: 0,
      explanation:
        "Real credentials pasted into a third-party AI service can end up logged, retained, or reviewed by that provider, and once shared outside the organization's control they should be treated as compromised. The safe habit is to redact or replace real secrets with placeholders before sharing any snippet, regardless of how trustworthy the vendor seems or whether other details like a hostname are also present. This is basic data-handling hygiene, not something that depends on the specific chatbot's reputation.",
      explanation_he:
        "אישורי גישה אמיתיים שמודבקים לשירות AI צד שלישי עלולים להישמר, להירשם ביומן, או להיבדק על ידי הספק, וברגע שהם שותפו מחוץ לשליטת הארגון יש להתייחס אליהם כאל דלופים. ההרגל הבטוח הוא להסתיר או להחליף סודות אמיתיים בערכי placeholder לפני שיתוף כל קטע קוד, ללא קשר לאמינות הספק או לפרטים נוספים כמו hostname. זו היגיינת טיפול בנתונים בסיסית, לא עניין שתלוי במוניטין הצ'אטבוט הספציפי.",
      resourceTitle: "OWASP GenAI Security Project",
      resourceUrl: "https://genai.owasp.org/",
      keywords: ["ai-security", "beginner", "secrets", "data-hygiene"],
      tooltipTerms: ["Secret"],
    },
    {
      id: "p21-ais-004",
      providers: ["neutral"],
      domains: ["ai-security"],
      difficulty: "intermediate",
      type: "multiple-choice",
      question:
        "A blog post claims 'Product X is officially discontinued' and supports this by embedding a screenshot of an AI chatbot's response saying so. Why should a reader be cautious about accepting this as confirmed fact?",
      question_he:
        "פוסט בבלוג טוען ש'מוצר X הופסק רשמית' ותומך בכך על ידי הטמעת צילום מסך של תשובת צ'אטבוט AI שאומרת זאת. מדוע על קורא להיזהר מלקבל זאת כעובדה מאושרת?",
      options: [
        "AI-generated text can be wrong, outdated, or even edited/fabricated by whoever posted it, so a chatbot quote is not itself an authoritative source and should be checked against the vendor's own statement",
        "AI chatbots are legally prohibited from discussing product discontinuations, so any such screenshot must be fake",
        "Screenshots of chatbot conversations cannot technically be embedded in blog posts, so the image itself proves the claim is false",
        "Chatbots only discuss information from before their training cutoff, so this type of claim is always accurate by definition",
      ],
      options_he: [
        "טקסט שנוצר על ידי AI יכול להיות שגוי, מיושן, או אפילו ערוך/מפוברק על ידי מי שפרסם אותו, כך שציטוט מצ'אטבוט אינו מקור סמכותי כשלעצמו ויש לבדוק אותו מול הצהרה רשמית של היצרן",
        "צ'אטבוטים אסורים חוקית בדיון על הפסקת ייצור מוצרים, ולכן כל צילום מסך כזה חייב להיות מזויף",
        "לא ניתן טכנית להטמיע צילומי מסך של שיחות צ'אטבוט בפוסטים, כך שהתמונה עצמה מוכיחה שהטענה שקרית",
        "צ'אטבוטים דנים רק במידע שקדם למועד סגירת האימונים שלהם, ולכן טענה מסוג זה תמיד מדויקת מעצם הגדרתה",
      ],
      correctAnswer: 0,
      explanation:
        "A chatbot response quoted in a screenshot is not proof of anything on its own: the model could have hallucinated the claim, the information could be outdated, or the screenshot itself could have been edited before posting. Treating AI output as an authoritative citation skips the step of verifying against a primary source, such as the vendor's own announcement. The other options invent fake rules or technical limitations that do not actually apply to chatbots or screenshots.",
      explanation_he:
        "תשובת צ'אטבוט המצוטטת בצילום מסך אינה הוכחה לכשעצמה: המודל יכול היה להזות את הטענה, המידע עשוי להיות מיושן, או שצילום המסך עצמו נערך לפני הפרסום. התייחסות לפלט AI כאל ציטוט סמכותי מדלגת על שלב אימות מול מקור ראשוני, כמו הודעה רשמית של היצרן. האפשרויות האחרות ממציאות חוקים או מגבלות טכניות פיקטיביות שלא באמת חלות על צ'אטבוטים או צילומי מסך.",
      resourceTitle: "OWASP Top 10 for Large Language Model Applications",
      resourceUrl:
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      keywords: ["ai-security", "intermediate", "misinformation", "verification"],
      tooltipTerms: ["Hallucination"],
    },
    {
      id: "p21-ais-005",
      providers: ["neutral"],
      domains: ["ai-security"],
      difficulty: "advanced",
      type: "multiple-choice",
      question:
        "Which statement best describes what the field of 'AI security' is broadly concerned with?",
      question_he:
        "איזה משפט מתאר בצורה הטובה ביותר במה עוסק תחום 'אבטחת AI' באופן כללי?",
      options: [
        "Protecting AI systems, their inputs/outputs, and the data and tools they can access from misuse, manipulation, and unintended harmful behavior, in addition to standard software and network security",
        "Only the process of encrypting the network traffic between a user's browser and an AI provider's servers",
        "Only the legal question of who owns the copyright to content generated by an AI model",
        "Only making sure an AI model's training process finishes without a hardware crash",
      ],
      options_he: [
        "הגנה על מערכות AI, על הקלט/פלט שלהן, ועל הנתונים והכלים שאליהם יש להן גישה, מפני שימוש לרעה, מניפולציה, והתנהגות מזיקה לא מכוונת, בנוסף לאבטחת תוכנה ורשת סטנדרטית",
        "רק תהליך ההצפנה של תעבורת הרשת בין דפדפן המשתמש לשרתי ספק ה-AI",
        "רק השאלה המשפטית של מי מחזיק בזכויות היוצרים על תוכן שנוצר על ידי מודל AI",
        "רק לוודא שתהליך האימון של מודל AI מסתיים בלי קריסת חומרה",
      ],
      correctAnswer: 0,
      explanation:
        "AI security is a broad discipline covering risks specific to how AI systems behave and are used, such as prompt manipulation, unsafe tool access, data leakage through model outputs, and misuse of connected systems, layered on top of ordinary security practice. The other options each isolate one narrow, unrelated technical or legal detail and mistake it for the whole field. Recognizing this breadth is what lets a team apply the right controls at the right layer instead of assuming one fix (like encryption) covers everything.",
      explanation_he:
        "אבטחת AI היא תחום רחב שמכסה סיכונים ייחודיים להתנהגות ושימוש במערכות AI, כמו מניפולציה על prompts, גישה לא בטוחה לכלים, דליפת מידע דרך פלטי המודל, וניצול לרעה של מערכות מחוברות — בנוסף לפרקטיקות אבטחה רגילות. שאר האפשרויות מבודדות פרט טכני או משפטי צר ולא קשור, וטועות לחשוב שהוא מהווה את כל התחום. הכרה ברוחב הזה מאפשרת לצוות ליישם את הבקרות הנכונות בשכבה הנכונה, במקום להניח שפתרון אחד (כמו הצפנה) מכסה הכל.",
      resourceTitle: "Anthropic Research",
      resourceUrl: "https://www.anthropic.com/research",
      keywords: ["ai-security", "advanced", "field-overview", "scope"],
      tooltipTerms: [],
    },
  ],
});
